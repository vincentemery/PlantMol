"use client";

import { useState, useMemo } from "react";
import { genomes } from "@/data/genomes";
import type { PlantGenome } from "@/data/genomes";
import ChromosomeViewer from "@/components/ChromosomeViewer";
import GenomeViewer3DWrapper from "@/components/GenomeViewer3DWrapper";

const genomeGroups: { label: string; ids: string[] }[] = [
  { label: "Cereals", ids: ["rice", "maize", "wheat", "barley", "sorghum", "pearl-millet"] },
  { label: "Legumes", ids: ["soybean", "peanut", "chickpea"] },
  { label: "Fruits & Vegetables", ids: ["tomato", "potato", "lettuce", "capsicum", "sweet-potato", "banana"] },
  { label: "Beverages", ids: ["coffee", "tea", "cacao"] },
  { label: "Industrial", ids: ["cotton", "sugarcane", "canola", "oil-palm"] },
  { label: "Model & Other", ids: ["arabidopsis", "nicotiana", "cassava", "vitis", "quinoa"] },
];

const genomeMap = new Map(genomes.map((g) => [g.id, g]));

function GenomeCard({
  genome,
  isSelected,
  onClick,
}: {
  genome: PlantGenome;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-lg border px-3 py-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? "border-emerald-500/50 bg-emerald-500/10 ring-1 ring-emerald-500/30"
          : "border-[#1E293B] bg-[#111827]/40 hover:border-[#334155] hover:bg-[#111827]/80"
      }`}
    >
      <p
        className="text-xs font-display font-semibold truncate"
        style={{ color: isSelected ? "#10B981" : "#E2E8F0" }}
      >
        {genome.commonName.split("(")[0].trim()}
      </p>
      <p className="text-[10px] font-mono text-slate-500 truncate italic">
        {genome.species.split(" ").slice(0, 2).join(" ")}
      </p>
      <div className="mt-1 flex items-center gap-2 text-[9px] font-mono text-slate-600">
        <span>{genome.chromosomeCount}n</span>
        <span className="w-px h-2.5 bg-[#1E293B]" />
        <span>{genome.ploidy.split(" ")[0]}</span>
      </div>
    </button>
  );
}

function PathwayDistribution({ genome }: { genome: PlantGenome }) {
  const distribution = useMemo(() => {
    const counts: Record<string, { count: number; color: string }> = {};
    genome.chromosomes.forEach((chr) =>
      chr.genes.forEach((gene) => {
        if (!counts[gene.pathway]) counts[gene.pathway] = { count: 0, color: gene.color };
        counts[gene.pathway].count++;
      })
    );
    return Object.entries(counts).sort((a, b) => b[1].count - a[1].count);
  }, [genome]);

  const totalGenes = distribution.reduce((sum, [, v]) => sum + v.count, 0);

  return (
    <div className="space-y-2">
      {distribution.map(([pathway, { count, color }]) => (
        <div key={pathway} className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <span className="text-xs text-slate-400 font-body flex-1 truncate">{pathway}</span>
          <div className="w-24 h-1.5 rounded-full bg-[#1E293B] overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(count / totalGenes) * 100}%`, backgroundColor: color }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-500 w-4 text-right">{count}</span>
        </div>
      ))}
    </div>
  );
}

export default function GenomeBrowser() {
  const [selectedId, setSelectedId] = useState("arabidopsis");
  const [search, setSearch] = useState("");
  const [show3D, setShow3D] = useState(false);

  const genome = genomeMap.get(selectedId)!;

  const filteredGroups = useMemo(() => {
    if (!search) return genomeGroups;
    const q = search.toLowerCase();
    return genomeGroups
      .map((group) => ({
        ...group,
        ids: group.ids.filter((id) => {
          const g = genomeMap.get(id);
          return (
            g &&
            (g.species.toLowerCase().includes(q) ||
              g.commonName.toLowerCase().includes(q) ||
              id.includes(q))
          );
        }),
      }))
      .filter((group) => group.ids.length > 0);
  }, [search]);

  const maxChrLength = Math.max(...genome.chromosomes.map((c) => c.lengthMb));
  const totalGenes = genome.chromosomes.reduce((sum, chr) => sum + chr.genes.length, 0);
  const pathwaysRepresented = new Set(
    genome.chromosomes.flatMap((chr) => chr.genes.map((g) => g.pathway))
  );

  return (
    <div className="space-y-8">
      {/* Genome selector */}
      <div className="rounded-xl border border-[#1E293B] bg-[#111827]/40 p-5">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500">
            Select Genome
          </h2>
          <div className="flex-1" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search species..."
            className="rounded-lg border border-[#1E293B] bg-[#0A0F1E] px-3 py-1.5 text-xs text-slate-300 font-mono placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/40 w-48"
          />
        </div>

        {filteredGroups.map((group) => (
          <div key={group.label} className="mb-3 last:mb-0">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-600 mb-1.5 pl-0.5">
              {group.label}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
              {group.ids.map((id) => {
                const g = genomeMap.get(id);
                if (!g) return null;
                return (
                  <GenomeCard
                    key={id}
                    genome={g}
                    isSelected={selectedId === id}
                    onClick={() => {
                      setSelectedId(id);
                      setShow3D(false);
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Selected genome detail */}
      <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 backdrop-blur-sm overflow-hidden">
        <div className="h-1" style={{ backgroundColor: genome.imageColor }} />

        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-100 tracking-tight">
                <em>{genome.species}</em>
              </h2>
              <p className="mt-1 text-sm font-body text-slate-400">
                {genome.commonName}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <StatBadge
                label="Genome"
                value={
                  genome.genomeSizeMb >= 1000
                    ? `${(genome.genomeSizeMb / 1000).toFixed(1)} Gb`
                    : `${genome.genomeSizeMb} Mb`
                }
                color={genome.imageColor}
              />
              <StatBadge
                label="Chromosomes"
                value={String(genome.chromosomeCount)}
                color={genome.imageColor}
              />
              <StatBadge
                label="Ploidy"
                value={genome.ploidy.split(" ")[0]}
                color={genome.imageColor}
              />
              <StatBadge
                label="Sequenced"
                value={String(genome.yearSequenced)}
                color={genome.imageColor}
              />
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-400 font-body mb-8 max-w-4xl">
            {genome.description}
          </p>

          {/* Two-column layout: chromosome map + pathway distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Chromosome Map - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Chromosome Map &mdash; Biosynthetic Gene Locations
              </h3>
              <div className="rounded-lg border border-[#1E293B]/50 bg-[#0A0F1E] p-4 sm:p-6">
                <ChromosomeViewer
                  chromosomes={genome.chromosomes}
                  maxLengthMb={maxChrLength}
                />
              </div>
            </div>

            {/* Pathway Distribution - 1 col */}
            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Pathway Distribution
              </h3>
              <div className="rounded-lg border border-[#1E293B]/50 bg-[#0A0F1E] p-4 sm:p-6">
                <PathwayDistribution genome={genome} />
              </div>

              {/* Stats summary */}
              <div className="mt-4 rounded-lg border border-[#1E293B]/50 bg-[#0A0F1E] p-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-mono font-bold" style={{ color: genome.imageColor }}>
                      {totalGenes}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Genes</p>
                  </div>
                  <div>
                    <p className="text-lg font-mono font-bold" style={{ color: genome.imageColor }}>
                      {pathwaysRepresented.size}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Pathways</p>
                  </div>
                  <div>
                    <p className="text-lg font-mono font-bold" style={{ color: genome.imageColor }}>
                      {genome.chromosomes.length}
                    </p>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Shown</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Karyotype - collapsible */}
          <div className="mb-2">
            <button
              onClick={() => setShow3D(!show3D)}
              className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors mb-4 cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform duration-200 ${show3D ? "rotate-90" : ""}`}
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              3D Karyotype Viewer
            </button>

            {show3D && (
              <div className="rounded-lg border border-[#1E293B]/50 bg-[#0A0F1E] overflow-hidden animate-in slide-in-from-top-2 duration-300" style={{ height: "500px" }}>
                <GenomeViewer3DWrapper
                  chromosomes={genome.chromosomes}
                  speciesName={genome.species}
                  accentColor={genome.imageColor}
                />
              </div>
            )}
            {show3D && (
              <p className="mt-2 text-[11px] font-mono text-slate-600 text-center">
                Rotate: drag &nbsp;|&nbsp; Zoom: scroll &nbsp;|&nbsp; Pan: right-drag
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      className="rounded-lg border px-3 py-1.5 text-center"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `${color}08`,
      }}
    >
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="text-sm font-mono font-bold" style={{ color }}>
        {value}
      </p>
    </div>
  );
}
