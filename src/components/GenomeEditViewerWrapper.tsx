"use client";

import dynamic from "next/dynamic";
import type { PlannedEdit } from "@/data/environments";

interface GenomeEditViewerWrapperProps {
  plantId: string;
  edits: PlannedEdit[];
  accentColor: string;
}

const GenomeEditViewer3D = dynamic(() => import("./GenomeEditViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0A0F1E] rounded-xl border border-[#1E293B]">
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-2 border-emerald-400 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-slate-400 font-mono">
          Loading 3D Genome Editor...
        </p>
      </div>
    </div>
  ),
});

export default function GenomeEditViewerWrapper(
  props: GenomeEditViewerWrapperProps
) {
  return <GenomeEditViewer3D {...props} />;
}
