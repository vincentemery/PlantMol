"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { genomes } from "@/data/genomes";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

import type { PlannedEdit, EditType, Confidence } from "@/data/environments";

interface GenomeEditViewer3DProps {
  plantId: string;
  edits: PlannedEdit[];
  accentColor: string;
}

/* ------------------------------------------------------------------ */
/*  Edit type visual config                                            */
/* ------------------------------------------------------------------ */

const EDIT_COLORS: Record<EditType, string> = {
  overexpression: "#22C55E",
  knockout: "#EF4444",
  "promoter-swap": "#3B82F6",
  "point-mutation": "#A855F7",
  insertion: "#EAB308",
};

const EDIT_LABELS: Record<EditType, string> = {
  overexpression: "OE",
  knockout: "KO",
  "promoter-swap": "PS",
  "point-mutation": "PM",
  insertion: "IN",
};

const CONFIDENCE_COLORS: Record<Confidence, string> = {
  high: "#22C55E",
  medium: "#EAB308",
  experimental: "#EF4444",
};

/* ------------------------------------------------------------------ */
/*  Background DNA Helix (reused from GenomeViewer3D)                  */
/* ------------------------------------------------------------------ */

function BackgroundHelix({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  const complementColor = useMemo(
    () => new THREE.Color(color).offsetHSL(0.15, 0, -0.1),
    [color]
  );

  const helixRadius = 0.35;
  const helixHeight = 8;
  const turns = 4;
  const strandPoints = 100;
  const basePairCount = 28;

  const { curve1, curve2 } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];
    for (let i = 0; i < strandPoints; i++) {
      const t = i / (strandPoints - 1);
      const angle = t * Math.PI * 2 * turns;
      const y = t * helixHeight - helixHeight / 2;
      s1.push(
        new THREE.Vector3(
          Math.cos(angle) * helixRadius,
          y,
          Math.sin(angle) * helixRadius
        )
      );
      s2.push(
        new THREE.Vector3(
          Math.cos(angle + Math.PI) * helixRadius,
          y,
          Math.sin(angle + Math.PI) * helixRadius
        )
      );
    }
    return {
      curve1: new THREE.CatmullRomCurve3(s1),
      curve2: new THREE.CatmullRomCurve3(s2),
    };
  }, []);

  const basePairs = useMemo(() => {
    const pairs: Array<{
      mid: THREE.Vector3;
      length: number;
      quaternion: THREE.Quaternion;
    }> = [];
    for (let i = 0; i < basePairCount; i++) {
      const t = (i + 0.5) / basePairCount;
      const start = curve1.getPointAt(t);
      const end = curve2.getPointAt(t);
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      );
      pairs.push({ mid, length, quaternion });
    }
    return pairs;
  }, [curve1, curve2]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -4]} scale={0.55}>
      <mesh>
        <tubeGeometry args={[curve1, 80, 0.04, 6, false]} />
        <meshStandardMaterial
          color={threeColor}
          transparent
          opacity={0.18}
          emissive={threeColor}
          emissiveIntensity={0.15}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 80, 0.04, 6, false]} />
        <meshStandardMaterial
          color={complementColor}
          transparent
          opacity={0.18}
          emissive={complementColor}
          emissiveIntensity={0.15}
        />
      </mesh>
      {basePairs.map((pair, i) => (
        <mesh key={i} position={pair.mid} quaternion={pair.quaternion}>
          <cylinderGeometry args={[0.015, 0.015, pair.length, 4]} />
          <meshStandardMaterial
            color={threeColor}
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Dim Gene Marker (existing genes shown faintly)                     */
/* ------------------------------------------------------------------ */

function DimGeneMarker({
  position,
  color,
  name,
  chromosomeName,
  pathway,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  chromosomeName: string;
  pathway: string;
}) {
  const [hovered, setHovered] = useState(false);
  const geneColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <sphereGeometry args={[0.07, 10, 10]} />
        <meshStandardMaterial
          color={geneColor}
          emissive={geneColor}
          emissiveIntensity={hovered ? 0.4 : 0.15}
          transparent
          opacity={hovered ? 0.7 : 0.35}
        />
      </mesh>
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0.25, 0.25, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(17, 24, 39, 0.9)",
              border: `1px solid ${color}40`,
              borderRadius: "6px",
              padding: "6px 10px",
              minWidth: "100px",
            }}
          >
            <p
              style={{
                color: "#94A3B8",
                fontWeight: 600,
                fontSize: "11px",
                margin: 0,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {name}
            </p>
            <p
              style={{
                color: color,
                fontSize: "10px",
                margin: "2px 0 0",
                fontFamily: "system-ui, sans-serif",
                opacity: 0.7,
              }}
            >
              {pathway}
            </p>
            <p
              style={{
                color: "#64748B",
                fontSize: "9px",
                margin: "2px 0 0",
                fontFamily: "monospace",
              }}
            >
              {chromosomeName}
            </p>
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Edit Marker Shape — geometry based on editType                     */
/* ------------------------------------------------------------------ */

function EditMarkerShape({ editType }: { editType: EditType }) {
  switch (editType) {
    case "overexpression":
      // Upward arrow — cone
      return <coneGeometry args={[0.12, 0.28, 6]} />;
    case "knockout":
      // X — octahedron
      return <octahedronGeometry args={[0.14, 0]} />;
    case "promoter-swap":
      // Diamond — octahedron stretched
      return <octahedronGeometry args={[0.13, 0]} />;
    case "point-mutation":
      // Star — dodecahedron
      return <dodecahedronGeometry args={[0.12, 0]} />;
    case "insertion":
      // Plus — box
      return <boxGeometry args={[0.2, 0.2, 0.2]} />;
  }
}

/* ------------------------------------------------------------------ */
/*  Edit Marker (animated + tooltip)                                   */
/* ------------------------------------------------------------------ */

function EditMarker({
  edit,
  position,
  legendAnchor,
}: {
  edit: PlannedEdit;
  position: [number, number, number];
  legendAnchor: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const editColor = EDIT_COLORS[edit.gene.editType];
  const threeColor = useMemo(() => new THREE.Color(editColor), [editColor]);

  // Unique phase per marker so they don't all pulse in sync
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 2.5 + phase) * 0.5 + 0.5;

    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + pulse * 1.2;
      meshRef.current.rotation.y = t * 0.8;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.0 + pulse * 0.4);
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.08 + pulse * 0.12;
    }
  });

  const linePoints = useMemo(
    () => [
      new THREE.Vector3(...position),
      new THREE.Vector3(...legendAnchor),
    ],
    [position, legendAnchor]
  );

  return (
    <group>
      {/* Connecting line to legend area */}
      <Line
        points={linePoints}
        color={editColor}
        lineWidth={1}
        transparent
        opacity={0.2}
        dashed
        dashScale={8}
        dashSize={1}
        gapSize={1}
      />

      <group position={position}>
        {/* Outer glow sphere */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[0.28, 16, 16]} />
          <meshStandardMaterial
            color={threeColor}
            emissive={threeColor}
            emissiveIntensity={0.3}
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Main edit marker */}
        <mesh
          ref={meshRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "default";
          }}
          scale={hovered ? 1.5 : 1.0}
        >
          <EditMarkerShape editType={edit.gene.editType} />
          <meshStandardMaterial
            color={threeColor}
            emissive={threeColor}
            emissiveIntensity={0.8}
            transparent
            opacity={0.95}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Ring indicator */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.015, 8, 32]} />
          <meshStandardMaterial
            color={threeColor}
            emissive={threeColor}
            emissiveIntensity={0.5}
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Tooltip on hover */}
        {hovered && (
          <Html
            distanceFactor={10}
            position={[0.4, 0.4, 0]}
            style={{ pointerEvents: "none" }}
          >
            <div
              style={{
                background: "rgba(10, 15, 30, 0.97)",
                border: `1px solid ${editColor}60`,
                borderRadius: "10px",
                padding: "10px 14px",
                minWidth: "180px",
                boxShadow: `0 4px 24px ${editColor}30, inset 0 1px 0 rgba(255,255,255,0.05)`,
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: editColor,
                    boxShadow: `0 0 6px ${editColor}`,
                  }}
                />
                <span
                  style={{
                    color: "#F1F5F9",
                    fontWeight: 700,
                    fontSize: "13px",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  {edit.gene.geneName}
                </span>
              </div>
              <p
                style={{
                  color: "#CBD5E1",
                  fontSize: "11px",
                  margin: "0 0 4px",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                {edit.gene.fullName}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  alignItems: "center",
                  marginBottom: "4px",
                }}
              >
                <span
                  style={{
                    background: `${editColor}20`,
                    color: editColor,
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                    textTransform: "uppercase",
                  }}
                >
                  {edit.gene.editType}
                </span>
                <span
                  style={{
                    background: `${CONFIDENCE_COLORS[edit.gene.confidence]}15`,
                    color: CONFIDENCE_COLORS[edit.gene.confidence],
                    fontSize: "10px",
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  {edit.gene.confidence}
                </span>
              </div>
              <p
                style={{
                  color: edit.trait.color,
                  fontSize: "11px",
                  margin: "4px 0 0",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Trait: {edit.trait.name}
              </p>
              <p
                style={{
                  color: "#64748B",
                  fontSize: "10px",
                  margin: "3px 0 0",
                  fontFamily: "monospace",
                }}
              >
                {edit.gene.chromosome} @ {(edit.gene.position * 100).toFixed(0)}
                %
              </p>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Chromosome with edit markers                                       */
/* ------------------------------------------------------------------ */

function ChromosomeWithEdits({
  chromosome,
  xPosition,
  normalizedHeight,
  editsOnChromosome,
  legendX,
}: {
  chromosome: { id: string; name: string; lengthMb: number; genes: Array<{ name: string; position: number; pathway: string; color: string; moleculeId?: string }> };
  xPosition: number;
  normalizedHeight: number;
  editsOnChromosome: PlannedEdit[];
  legendX: number;
}) {
  const baseColor = useMemo(() => new THREE.Color("#1E293B"), []);
  const capsuleHeight = normalizedHeight;
  const capsuleRadius = 0.2;

  // Deterministic angles for gene markers
  const geneAngles = useMemo(() => {
    return chromosome.genes.map((_, i) => {
      const seed = (i * 137.508 + 42) % 360;
      return (seed / 360) * Math.PI * 0.5 + Math.PI * 0.25;
    });
  }, [chromosome.genes]);

  return (
    <group position={[xPosition, capsuleHeight / 2, 0]}>
      {/* Chromosome body */}
      <mesh>
        <capsuleGeometry args={[capsuleRadius, capsuleHeight, 8, 16]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.7}
          metalness={0.1}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Center line / banding stripe */}
      <mesh position={[0, 0, capsuleRadius + 0.005]}>
        <planeGeometry args={[0.04, capsuleHeight * 0.85]} />
        <meshStandardMaterial
          color="#334155"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Existing gene markers (dim) */}
      {chromosome.genes.map((gene, i) => {
        const geneY = gene.position * capsuleHeight - capsuleHeight / 2;
        const angle = geneAngles[i];
        const geneX = Math.cos(angle) * (capsuleRadius + 0.08);
        const geneZ = Math.sin(angle) * (capsuleRadius + 0.08);

        return (
          <DimGeneMarker
            key={gene.name}
            position={[geneX, geneY, geneZ]}
            color={gene.color}
            name={gene.name}
            chromosomeName={chromosome.name}
            pathway={gene.pathway}
          />
        );
      })}

      {/* Edit markers */}
      {editsOnChromosome.map((edit, i) => {
        const editY =
          edit.gene.position * capsuleHeight - capsuleHeight / 2;
        // Place edit markers on the opposite side from genes for visibility
        const editAngle = -(Math.PI * 0.35) - i * 0.3;
        const editX = Math.cos(editAngle) * (capsuleRadius + 0.22);
        const editZ = Math.sin(editAngle) * (capsuleRadius + 0.22);

        const worldPos: [number, number, number] = [
          editX,
          editY,
          editZ,
        ];
        const legendAnchorWorld: [number, number, number] = [
          legendX - xPosition,
          editY,
          0,
        ];

        return (
          <EditMarker
            key={`${edit.gene.geneId}-${i}`}
            edit={edit}
            position={worldPos}
            legendAnchor={legendAnchorWorld}
          />
        );
      })}

      {/* Chromosome label */}
      <Html
        position={[0, -(capsuleHeight / 2) - 0.55, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <p
          style={{
            color: editsOnChromosome.length > 0 ? "#E2E8F0" : "#64748B",
            fontSize: "11px",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            textAlign: "center",
            margin: 0,
            fontWeight: editsOnChromosome.length > 0 ? 700 : 400,
          }}
        >
          {chromosome.name}
          {editsOnChromosome.length > 0 && (
            <span style={{ color: "#EAB308", marginLeft: "4px" }}>
              ({editsOnChromosome.length})
            </span>
          )}
        </p>
      </Html>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Legend Panel (HTML overlay at edge)                                 */
/* ------------------------------------------------------------------ */

function EditLegend({ edits }: { edits: PlannedEdit[] }) {
  // Group edits by type
  const editTypes = useMemo(() => {
    const types = new Set(edits.map((e) => e.gene.editType));
    return Array.from(types);
  }, [edits]);

  return (
    <Html position={[0, -4.5, 0]} center style={{ pointerEvents: "none" }}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {editTypes.map((type) => (
          <div
            key={type}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              background: "rgba(10, 15, 30, 0.85)",
              border: `1px solid ${EDIT_COLORS[type]}30`,
              borderRadius: "6px",
              padding: "3px 8px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: type === "knockout" ? "0" : "50%",
                backgroundColor: EDIT_COLORS[type],
                boxShadow: `0 0 4px ${EDIT_COLORS[type]}80`,
                transform:
                  type === "knockout" ? "rotate(45deg)" : undefined,
              }}
            />
            <span
              style={{
                color: "#CBD5E1",
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {EDIT_LABELS[type]}
            </span>
            <span
              style={{
                color: "#64748B",
                fontSize: "9px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {type}
            </span>
          </div>
        ))}
      </div>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function GenomeEditScene({
  genome,
  edits,
  accentColor,
}: {
  genome: {
    chromosomes: Array<{
      id: string;
      name: string;
      lengthMb: number;
      genes: Array<{
        name: string;
        position: number;
        pathway: string;
        color: string;
        moleculeId?: string;
      }>;
    }>;
  };
  edits: PlannedEdit[];
  accentColor: string;
}) {
  const chromosomes = genome.chromosomes;
  const maxLength = Math.max(...chromosomes.map((c) => c.lengthMb));
  const maxHeight = 6;

  const totalWidth = chromosomes.length * 1.2;
  const startX = -(totalWidth - 1.2) / 2;
  const legendX = startX + totalWidth + 0.8;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 5]} intensity={0.6} />
      <directionalLight position={[-3, 4, -2]} intensity={0.25} />
      <pointLight position={[0, 3, 6]} intensity={0.3} color="#334155" />

      {/* Background Helix */}
      <BackgroundHelix color={accentColor} />

      {/* Chromosomes with edits */}
      {chromosomes.map((chr, i) => {
        const normalizedHeight = (chr.lengthMb / maxLength) * maxHeight;
        const xPos = startX + i * 1.2;

        const chrEdits = edits.filter(
          (e) => e.gene.chromosome === chr.name
        );

        return (
          <ChromosomeWithEdits
            key={chr.id}
            chromosome={chr}
            xPosition={xPos}
            normalizedHeight={normalizedHeight}
            editsOnChromosome={chrEdits}
            legendX={legendX}
          />
        );
      })}

      {/* Edit Legend */}
      {edits.length > 0 && <EditLegend edits={edits} />}

      {/* Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={4}
        maxDistance={25}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main exported component                                            */
/* ------------------------------------------------------------------ */

export default function GenomeEditViewer3D({
  plantId,
  edits,
  accentColor,
}: GenomeEditViewer3DProps) {
  const genome = useMemo(
    () => genomes.find((g) => g.id === plantId),
    [plantId]
  );

  if (!genome) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0F1E",
          borderRadius: "12px",
          border: "1px solid #1E293B",
        }}
      >
        <p
          style={{
            color: "#94A3B8",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        >
          Genome not found: {plantId}
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* Header overlay */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          left: "16px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "#94A3B8",
            fontSize: "10px",
            fontFamily: "monospace",
            margin: 0,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          CRISPR Edit Map
        </p>
        <p
          style={{
            color: "#E2E8F0",
            fontSize: "14px",
            fontWeight: 700,
            fontFamily: "system-ui, sans-serif",
            margin: "2px 0 0",
          }}
        >
          {genome.species}
        </p>
        <p
          style={{
            color: accentColor,
            fontSize: "11px",
            fontFamily: "monospace",
            margin: "2px 0 0",
          }}
        >
          {edits.length} planned edit{edits.length !== 1 ? "s" : ""} across{" "}
          {new Set(edits.map((e) => e.gene.chromosome)).size} chromosome
          {new Set(edits.map((e) => e.gene.chromosome)).size !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Edit count badge */}
      <div
        style={{
          position: "absolute",
          top: "12px",
          right: "16px",
          zIndex: 10,
          pointerEvents: "none",
          background: "rgba(10, 15, 30, 0.8)",
          border: `1px solid ${accentColor}40`,
          borderRadius: "8px",
          padding: "6px 12px",
          backdropFilter: "blur(8px)",
        }}
      >
        <span
          style={{
            color: accentColor,
            fontWeight: 700,
            fontSize: "18px",
            fontFamily: "monospace",
          }}
        >
          {edits.length}
        </span>
        <span
          style={{
            color: "#64748B",
            fontSize: "10px",
            fontFamily: "monospace",
            marginLeft: "6px",
          }}
        >
          edits
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 3, 12], fov: 45 }}
        style={{ background: "#0A0F1E" }}
      >
        <color attach="background" args={["#0A0F1E"]} />
        <GenomeEditScene
          genome={genome}
          edits={edits}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
}
