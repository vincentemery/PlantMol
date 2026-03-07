"use client";

import dynamic from "next/dynamic";

const GenomeViewer3D = dynamic(
  () => import("@/components/GenomeViewer3D"),
  { ssr: false }
);

interface GenomeViewer3DWrapperProps {
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
  speciesName: string;
  accentColor: string;
}

export default function GenomeViewer3DWrapper(props: GenomeViewer3DWrapperProps) {
  return <GenomeViewer3D {...props} />;
}
