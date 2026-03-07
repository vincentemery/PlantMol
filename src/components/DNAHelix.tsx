"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DNAHelixProps {
  height?: number;
  color?: string;
}

function HelixStrands({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null!);
  const threeColor = useMemo(() => new THREE.Color(color), [color]);
  const complementColor = useMemo(
    () => new THREE.Color(color).offsetHSL(0.15, 0, -0.1),
    [color]
  );

  const helixRadius = 0.6;
  const helixHeight = 6;
  const turns = 3;
  const pointsPerStrand = 120;
  const basePairCount = 24;

  const { strand1Points, strand2Points } = useMemo(() => {
    const s1: THREE.Vector3[] = [];
    const s2: THREE.Vector3[] = [];

    for (let i = 0; i < pointsPerStrand; i++) {
      const t = i / (pointsPerStrand - 1);
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
      strand1Points: s1,
      strand2Points: s2,
    };
  }, []);

  const strand1Curve = useMemo(
    () => new THREE.CatmullRomCurve3(strand1Points),
    [strand1Points]
  );
  const strand2Curve = useMemo(
    () => new THREE.CatmullRomCurve3(strand2Points),
    [strand2Points]
  );

  const basePairs = useMemo(() => {
    const pairs: Array<{
      start: THREE.Vector3;
      end: THREE.Vector3;
      mid: THREE.Vector3;
      length: number;
      quaternion: THREE.Quaternion;
    }> = [];

    for (let i = 0; i < basePairCount; i++) {
      const t = (i + 0.5) / basePairCount;
      const start = strand1Curve.getPointAt(t);
      const end = strand2Curve.getPointAt(t);
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(end, start);
      const length = dir.length();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.normalize()
      );

      pairs.push({ start, end, mid, length, quaternion });
    }

    return pairs;
  }, [strand1Curve, strand2Curve]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[strand1Curve, 100, 0.06, 8, false]} />
        <meshStandardMaterial
          color={threeColor}
          transparent
          opacity={0.7}
          emissive={threeColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[strand2Curve, 100, 0.06, 8, false]} />
        <meshStandardMaterial
          color={complementColor}
          transparent
          opacity={0.7}
          emissive={complementColor}
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Base pair rungs */}
      {basePairs.map((pair, i) => (
        <mesh key={i} position={pair.mid} quaternion={pair.quaternion}>
          <cylinderGeometry args={[0.02, 0.02, pair.length, 4]} />
          <meshStandardMaterial
            color={threeColor}
            transparent
            opacity={0.35}
            emissive={threeColor}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function DNAHelix({
  height = 300,
  color = "#10B981",
}: DNAHelixProps) {
  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <HelixStrands color={color} />
      </Canvas>
    </div>
  );
}
