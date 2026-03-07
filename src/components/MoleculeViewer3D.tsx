"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import {
  parseSDF,
  centerMolecule,
  getElementData,
  type ParsedMolecule,
  type ParsedAtom,
} from "@/lib/sdf-parser";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ViewStyle = "ball-and-stick" | "space-fill" | "wireframe" | "stick";

interface MoleculeViewer3DProps {
  pubchemCid: number;
  color: string;
}

// ---------------------------------------------------------------------------
// Atom component
// ---------------------------------------------------------------------------

function Atom({
  atom,
  style,
  showLabel,
  showHydrogen,
  onHover,
  onUnhover,
}: {
  atom: ParsedAtom;
  style: ViewStyle;
  showLabel: boolean;
  showHydrogen: boolean;
  onHover: (atom: ParsedAtom) => void;
  onUnhover: () => void;
}) {
  const elData = getElementData(atom.element);

  if (!showHydrogen && atom.element === "H") return null;

  let radius: number;
  switch (style) {
    case "ball-and-stick":
      radius = elData.radius;
      break;
    case "space-fill":
      radius = elData.radius * 2;
      break;
    case "wireframe":
      radius = 0.08;
      break;
    case "stick":
      radius = 0.15;
      break;
  }

  return (
    <group position={[atom.x, atom.y, atom.z]}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(atom);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onUnhover();
        }}
      >
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial
          color={elData.color}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      {showLabel && (
        <Text
          position={[0, radius + 0.25, 0]}
          fontSize={0.22}
          color="#F1F5F9"
          anchorX="center"
          anchorY="bottom"
          font={undefined}
        >
          {atom.element}
        </Text>
      )}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Bond component
// ---------------------------------------------------------------------------

function Bond({
  atom1,
  atom2,
  order,
  style,
  showHydrogen,
}: {
  atom1: ParsedAtom;
  atom2: ParsedAtom;
  order: number;
  style: ViewStyle;
  showHydrogen: boolean;
}) {
  if (!showHydrogen && (atom1.element === "H" || atom2.element === "H"))
    return null;
  if (style === "space-fill") return null;

  const start = new THREE.Vector3(atom1.x, atom1.y, atom1.z);
  const end = new THREE.Vector3(atom2.x, atom2.y, atom2.z);
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  direction.normalize();

  const quaternion = new THREE.Quaternion();
  quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const isWireframe = style === "wireframe";
  const radius = style === "stick" ? 0.08 : isWireframe ? 0.02 : 0.05;

  if (order <= 1) {
    return (
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[radius, radius, length, 8]} />
        <meshStandardMaterial
          color="#94A3B8"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    );
  }

  // Multiple bonds: offset cylinders perpendicular to bond axis
  const bonds: React.ReactNode[] = [];
  const perp = new THREE.Vector3();
  if (Math.abs(direction.x) < 0.9) {
    perp.crossVectors(direction, new THREE.Vector3(1, 0, 0)).normalize();
  } else {
    perp.crossVectors(direction, new THREE.Vector3(0, 1, 0)).normalize();
  }

  const gap = isWireframe ? 0.06 : 0.08;
  const thinRadius = radius * 0.7;

  for (let i = 0; i < order; i++) {
    const offset = (i - (order - 1) / 2) * gap;
    const pos = mid.clone().add(perp.clone().multiplyScalar(offset));

    bonds.push(
      <mesh key={i} position={pos} quaternion={quaternion}>
        <cylinderGeometry args={[thinRadius, thinRadius, length, 8]} />
        <meshStandardMaterial
          color="#94A3B8"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    );
  }

  return <>{bonds}</>;
}

// ---------------------------------------------------------------------------
// Scene (auto-rotate + camera reset)
// ---------------------------------------------------------------------------

function Scene({
  molecule,
  style,
  showLabels,
  spin,
  showHydrogen,
  onHoverAtom,
  onUnhoverAtom,
  resetKey,
}: {
  molecule: ParsedMolecule;
  style: ViewStyle;
  showLabels: boolean;
  spin: boolean;
  showHydrogen: boolean;
  onHoverAtom: (atom: ParsedAtom) => void;
  onUnhoverAtom: () => void;
  resetKey: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();

  useFrame((_state, delta) => {
    if (spin && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  useEffect(() => {
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);
    if (controlsRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (controlsRef.current as any).reset?.();
    }
  }, [resetKey, camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <directionalLight position={[-5, -5, 5]} intensity={0.3} />
      <OrbitControls ref={controlsRef} enableDamping dampingFactor={0.1} />
      <group ref={groupRef}>
        {molecule.atoms.map((atom) => (
          <Atom
            key={atom.index}
            atom={atom}
            style={style}
            showLabel={showLabels}
            showHydrogen={showHydrogen}
            onHover={onHoverAtom}
            onUnhover={onUnhoverAtom}
          />
        ))}
        {molecule.bonds.map((bond, i) => (
          <Bond
            key={i}
            atom1={molecule.atoms[bond.atom1]}
            atom2={molecule.atoms[bond.atom2]}
            order={bond.order}
            style={style}
            showHydrogen={showHydrogen}
          />
        ))}
      </group>
    </>
  );
}

// ---------------------------------------------------------------------------
// Tooltip overlay
// ---------------------------------------------------------------------------

function Tooltip({
  atom,
  containerRef,
}: {
  atom: ParsedAtom | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [containerRef]);

  if (!atom) return null;

  return (
    <div
      className="pointer-events-none absolute z-20 rounded-lg bg-[#111827] border border-[#1E293B] px-3 py-1.5 text-xs shadow-lg"
      style={{ left: pos.x + 14, top: pos.y - 10 }}
    >
      <span className="font-mono text-slate-100 font-semibold">
        {atom.element}
      </span>
      <span className="text-slate-400 ml-1.5">#{atom.index + 1}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Controls panel
// ---------------------------------------------------------------------------

const STYLE_OPTIONS: { value: ViewStyle; label: string }[] = [
  { value: "ball-and-stick", label: "Ball & Stick" },
  { value: "space-fill", label: "Space Fill" },
  { value: "wireframe", label: "Wireframe" },
  { value: "stick", label: "Stick" },
];

function ControlsPanel({
  style,
  setStyle,
  showLabels,
  setShowLabels,
  spin,
  setSpin,
  showHydrogen,
  setShowHydrogen,
  onReset,
  accentColor,
}: {
  style: ViewStyle;
  setStyle: (s: ViewStyle) => void;
  showLabels: boolean;
  setShowLabels: (v: boolean) => void;
  spin: boolean;
  setSpin: (v: boolean) => void;
  showHydrogen: boolean;
  setShowHydrogen: (v: boolean) => void;
  onReset: () => void;
  accentColor: string;
}) {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center gap-2 rounded-xl bg-[#111827]/90 backdrop-blur-md border border-[#1E293B] px-4 py-3">
      {/* Style selector */}
      <div className="flex rounded-lg border border-[#1E293B] overflow-hidden">
        {STYLE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setStyle(opt.value)}
            className="px-3 py-1.5 text-xs font-medium transition-colors"
            style={
              style === opt.value
                ? { backgroundColor: accentColor, color: "#0A0F1E" }
                : { color: "#94A3B8" }
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="h-5 w-px bg-[#1E293B] mx-1" />

      {/* Toggles */}
      <ToggleButton
        label="Labels"
        active={showLabels}
        onToggle={() => setShowLabels(!showLabels)}
        accentColor={accentColor}
      />
      <ToggleButton
        label="Spin"
        active={spin}
        onToggle={() => setSpin(!spin)}
        accentColor={accentColor}
      />
      <ToggleButton
        label="Hydrogen"
        active={showHydrogen}
        onToggle={() => setShowHydrogen(!showHydrogen)}
        accentColor={accentColor}
      />

      <div className="h-5 w-px bg-[#1E293B] mx-1" />

      {/* Reset */}
      <button
        onClick={onReset}
        className="rounded-lg border border-[#1E293B] px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors"
      >
        Reset View
      </button>
    </div>
  );
}

function ToggleButton({
  label,
  active,
  onToggle,
  accentColor,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  accentColor: string;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
      style={
        active
          ? { backgroundColor: `${accentColor}20`, color: accentColor }
          : { color: "#94A3B8" }
      }
    >
      <span
        className="inline-block h-2 w-2 rounded-full transition-colors"
        style={{
          backgroundColor: active ? accentColor : "#374151",
        }}
      />
      {label}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function MoleculeViewer3D({
  pubchemCid,
  color,
}: MoleculeViewer3DProps) {
  const [molecule, setMolecule] = useState<ParsedMolecule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [style, setStyle] = useState<ViewStyle>("ball-and-stick");
  const [showLabels, setShowLabels] = useState(false);
  const [spin, setSpin] = useState(false);
  const [showHydrogen, setShowHydrogen] = useState(true);
  const [hoveredAtom, setHoveredAtom] = useState<ParsedAtom | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((atom: ParsedAtom) => setHoveredAtom(atom), []);
  const handleUnhover = useCallback(() => setHoveredAtom(null), []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setMolecule(null);

    fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${pubchemCid}/SDF?record_type=3d`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Fetch failed");
        return res.text();
      })
      .then((sdf) => {
        if (cancelled) return;
        const parsed = parseSDF(sdf);
        const centered = centerMolecule(parsed);
        setMolecule(centered);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pubchemCid]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0A0F1E] rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <div
            className="h-3 w-3 rounded-full animate-pulse"
            style={{ backgroundColor: color }}
          />
          <p className="text-sm text-slate-400 font-body">
            Loading 3D structure from PubChem...
          </p>
        </div>
      </div>
    );
  }

  if (error || !molecule) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0A0F1E] rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6M9 9l6 6" />
          </svg>
          <p className="text-sm text-slate-400 font-body">
            3D structure unavailable for this molecule.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ background: "#0A0F1E" }}
        className="rounded-xl"
      >
        <Scene
          molecule={molecule}
          style={style}
          showLabels={showLabels}
          spin={spin}
          showHydrogen={showHydrogen}
          onHoverAtom={handleHover}
          onUnhoverAtom={handleUnhover}
          resetKey={resetKey}
        />
      </Canvas>
      <Tooltip atom={hoveredAtom} containerRef={containerRef} />
      <ControlsPanel
        style={style}
        setStyle={setStyle}
        showLabels={showLabels}
        setShowLabels={setShowLabels}
        spin={spin}
        setSpin={setSpin}
        showHydrogen={showHydrogen}
        setShowHydrogen={setShowHydrogen}
        onReset={() => setResetKey((k) => k + 1)}
        accentColor={color}
      />
    </div>
  );
}
