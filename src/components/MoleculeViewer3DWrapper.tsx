"use client";

import dynamic from "next/dynamic";

const MoleculeViewer3D = dynamic(
  () => import("@/components/MoleculeViewer3D"),
  { ssr: false }
);

interface MoleculeViewer3DWrapperProps {
  pubchemCid: number;
  color: string;
}

export default function MoleculeViewer3DWrapper(props: MoleculeViewer3DWrapperProps) {
  return <MoleculeViewer3D {...props} />;
}
