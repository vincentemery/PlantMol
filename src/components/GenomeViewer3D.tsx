"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

interface GeneData {
  name: string;
  position: number;
  pathway: string;
  color: string;
  moleculeId?: string;
}

interface ChromosomeData {
  id: string;
  name: string;
  lengthMb: number;
  genes: GeneData[];
}

interface GenomeViewer3DProps {
  chromosomes: ChromosomeData[];
  speciesName: string;
  accentColor: string;
}

/* ------------------------------------------------------------------ */
/*  DNA Helix (background decorative element)                         */
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
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -3]} scale={0.6}>
      <mesh>
        <tubeGeometry args={[curve1, 80, 0.04, 6, false]} />
        <meshStandardMaterial
          color={threeColor}
          transparent
          opacity={0.25}
          emissive={threeColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve2, 80, 0.04, 6, false]} />
        <meshStandardMaterial
          color={complementColor}
          transparent
          opacity={0.25}
          emissive={complementColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      {basePairs.map((pair, i) => (
        <mesh key={i} position={pair.mid} quaternion={pair.quaternion}>
          <cylinderGeometry args={[0.015, 0.015, pair.length, 4]} />
          <meshStandardMaterial
            color={threeColor}
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Gene Marker                                                       */
/* ------------------------------------------------------------------ */

function GeneMarker({
  gene,
  position,
  chromosomeName,
}: {
  gene: GeneData;
  position: [number, number, number];
  chromosomeName: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const geneColor = useMemo(() => new THREE.Color(gene.color), [gene.color]);

  const handleClick = useCallback(() => {
    if (gene.moleculeId) {
      window.open(`/molecules/${gene.moleculeId}`, "_blank");
    }
  }, [gene.moleculeId]);

  return (
    <group position={position}>
      {/* Glow sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = gene.moleculeId ? "pointer" : "default";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
        scale={hovered ? 1.4 : 1}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={geneColor}
          emissive={geneColor}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Tooltip */}
      {hovered && (
        <Html
          distanceFactor={10}
          position={[0.3, 0.3, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div
            style={{
              background: "rgba(17, 24, 39, 0.95)",
              border: `1px solid ${gene.color}50`,
              borderRadius: "8px",
              padding: "8px 12px",
              minWidth: "140px",
              boxShadow: `0 4px 20px ${gene.color}20`,
              backdropFilter: "blur(8px)",
            }}
          >
            <p
              style={{
                color: "#F1F5F9",
                fontWeight: 700,
                fontSize: "13px",
                margin: 0,
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {gene.name}
            </p>
            <p
              style={{
                color: gene.color,
                fontSize: "11px",
                margin: "3px 0 0",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {gene.pathway}
            </p>
            <p
              style={{
                color: "#94A3B8",
                fontSize: "10px",
                margin: "3px 0 0",
                fontFamily: "monospace",
              }}
            >
              {chromosomeName} @ {(gene.position * 100).toFixed(0)}%
            </p>
            {gene.moleculeId && (
              <p
                style={{
                  color: "#10B981",
                  fontSize: "10px",
                  margin: "4px 0 0",
                  fontFamily: "system-ui, sans-serif",
                  textDecoration: "underline",
                }}
              >
                View molecule &rarr;
              </p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Single Chromosome                                                 */
/* ------------------------------------------------------------------ */

function ChromosomeModel({
  chromosome,
  xPosition,
  normalizedHeight,
}: {
  chromosome: ChromosomeData;
  xPosition: number;
  normalizedHeight: number;
}) {
  const baseColor = useMemo(() => new THREE.Color("#2D3748"), []);
  const capsuleHeight = normalizedHeight;
  const capsuleRadius = 0.2;

  return (
    <group position={[xPosition, capsuleHeight / 2, 0]}>
      {/* Chromosome body */}
      <mesh>
        <capsuleGeometry args={[capsuleRadius, capsuleHeight, 8, 16]} />
        <meshStandardMaterial
          color={baseColor}
          roughness={0.6}
          metalness={0.15}
        />
      </mesh>

      {/* Subtle accent stripe */}
      <mesh position={[0, 0, capsuleRadius + 0.005]}>
        <planeGeometry args={[0.06, capsuleHeight * 0.85]} />
        <meshStandardMaterial
          color={
            chromosome.genes[0]
              ? new THREE.Color(chromosome.genes[0].color)
              : baseColor
          }
          transparent
          opacity={0.3}
          emissive={
            chromosome.genes[0]
              ? new THREE.Color(chromosome.genes[0].color)
              : baseColor
          }
          emissiveIntensity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Gene markers */}
      {chromosome.genes.map((gene) => {
        const geneY =
          gene.position * capsuleHeight - capsuleHeight / 2;
        const angle = Math.random() * Math.PI * 0.5 + Math.PI * 0.25;
        const geneX = Math.cos(angle) * (capsuleRadius + 0.1);
        const geneZ = Math.sin(angle) * (capsuleRadius + 0.1);

        return (
          <GeneMarker
            key={gene.name}
            gene={gene}
            position={[geneX, geneY, geneZ]}
            chromosomeName={chromosome.name}
          />
        );
      })}

      {/* Chromosome label */}
      <Html
        position={[0, -(capsuleHeight / 2) - 0.5, 0]}
        center
        style={{ pointerEvents: "none" }}
      >
        <p
          style={{
            color: "#94A3B8",
            fontSize: "11px",
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            textAlign: "center",
            margin: 0,
          }}
        >
          {chromosome.name}
        </p>
      </Html>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Scene (all chromosomes + helix)                                   */
/* ------------------------------------------------------------------ */

function GenomeScene({
  chromosomes,
  accentColor,
}: {
  chromosomes: ChromosomeData[];
  accentColor: string;
}) {
  const maxLength = Math.max(...chromosomes.map((c) => c.lengthMb));
  const maxHeight = 6;

  const totalWidth = chromosomes.length * 1.2;
  const startX = -(totalWidth - 1.2) / 2;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={0.7} />
      <directionalLight position={[-3, 4, -2]} intensity={0.3} />

      {/* Background Helix */}
      <BackgroundHelix color={accentColor} />

      {/* Chromosomes */}
      {chromosomes.map((chr, i) => {
        const normalizedHeight = (chr.lengthMb / maxLength) * maxHeight;
        const xPos = startX + i * 1.2;

        return (
          <ChromosomeModel
            key={chr.id}
            chromosome={chr}
            xPosition={xPos}
            normalizedHeight={normalizedHeight}
          />
        );
      })}

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
/*  Main exported component                                           */
/* ------------------------------------------------------------------ */

export default function GenomeViewer3D({
  chromosomes,
  speciesName,
  accentColor,
}: GenomeViewer3DProps) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 3, 12], fov: 45 }}
        style={{ background: "#0A0F1E" }}
      >
        <color attach="background" args={["#0A0F1E"]} />
        <GenomeScene
          chromosomes={chromosomes}
          accentColor={accentColor}
        />
      </Canvas>
    </div>
  );
}
