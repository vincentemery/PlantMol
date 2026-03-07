"use client";

import { useState } from "react";
import type { Chromosome, ChromosomeGene } from "@/data/genomes";

interface ChromosomeViewerProps {
  chromosomes: Chromosome[];
  maxLengthMb: number;
}

function GeneMarker({ gene, chromosomeName }: { gene: ChromosomeGene; chromosomeName: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 z-10 group"
      style={{ left: `${gene.position * 100}%` }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Marker tick */}
      <div
        className="relative w-2.5 h-2.5 rounded-full cursor-pointer ring-2 ring-[#0A0F1E] transition-transform hover:scale-150"
        style={{ backgroundColor: gene.color }}
      />

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none">
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg px-3 py-2 shadow-xl shadow-black/40 whitespace-nowrap">
            <p className="text-xs font-mono font-bold text-slate-100">
              {gene.name}
            </p>
            <div className="mt-1 space-y-0.5">
              <p className="text-[10px] text-slate-400 font-body">
                <span className="text-slate-500">Pathway:</span>{" "}
                <span style={{ color: gene.color }}>{gene.pathway}</span>
              </p>
              <p className="text-[10px] text-slate-400 font-body">
                <span className="text-slate-500">Location:</span>{" "}
                {chromosomeName} &middot; {(gene.position * 100).toFixed(0)}%
              </p>
              {gene.moleculeId && (
                <p className="text-[10px] text-slate-400 font-body">
                  <span className="text-slate-500">Molecule:</span>{" "}
                  {gene.moleculeId}
                </p>
              )}
            </div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-[#1E293B]" />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChromosomeViewer({ chromosomes, maxLengthMb }: ChromosomeViewerProps) {
  return (
    <div className="space-y-3">
      {chromosomes.map((chr) => {
        const widthPercent = (chr.lengthMb / maxLengthMb) * 100;

        return (
          <div key={chr.id} className="flex items-center gap-3">
            {/* Chromosome label */}
            <div className="w-14 shrink-0 text-right">
              <span className="text-xs font-mono text-slate-500">
                {chr.name}
              </span>
            </div>

            {/* Chromosome bar container */}
            <div className="flex-1 relative">
              <div
                className="relative h-6 rounded-full overflow-visible"
                style={{ width: `${Math.max(widthPercent, 15)}%` }}
              >
                {/* Chromosome body */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-[#334155]/50" />

                {/* Centromere pinch effect */}
                <div className="absolute top-0 left-[45%] w-[10%] h-full rounded-full bg-[#0A0F1E]/60" />

                {/* Banding pattern (subtle) */}
                <div className="absolute top-0.5 left-[10%] w-[15%] h-[calc(100%-4px)] rounded-full bg-[#334155]/20" />
                <div className="absolute top-0.5 left-[60%] w-[12%] h-[calc(100%-4px)] rounded-full bg-[#334155]/20" />
                <div className="absolute top-0.5 left-[80%] w-[8%] h-[calc(100%-4px)] rounded-full bg-[#334155]/15" />

                {/* Gene markers */}
                {chr.genes.map((gene, idx) => (
                  <GeneMarker
                    key={`${chr.id}-${gene.name}-${idx}`}
                    gene={gene}
                    chromosomeName={chr.name}
                  />
                ))}
              </div>

              {/* Length label */}
              <span className="absolute top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-600 ml-2"
                style={{ left: `${Math.max(widthPercent, 15)}%` }}
              >
                {chr.lengthMb} Mb
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
