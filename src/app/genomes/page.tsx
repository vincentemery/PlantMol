import { genomes } from "@/data/genomes";
import ChromosomeViewer from "@/components/ChromosomeViewer";
import GenomeViewer3DWrapper from "@/components/GenomeViewer3DWrapper";


export const metadata = {
  title: "Plant Genomes | PlantMol",
  description:
    "Explore plant genomes and the chromosomal locations of biosynthetic genes for secondary metabolites.",
};

export default function GenomesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl">
            Plant Genomes
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            Biosynthetic genes are not randomly distributed across plant
            chromosomes. Many cluster together, reflecting shared regulatory
            elements or ancient duplication events. Explore the genomic
            architecture underlying secondary metabolite production.
          </p>
        </div>

        {/* Genome cards */}
        <div className="space-y-12">
          {genomes.map((genome) => {
            const maxChrLength = Math.max(
              ...genome.chromosomes.map((c) => c.lengthMb)
            );
            const totalGenes = genome.chromosomes.reduce(
              (sum, chr) => sum + chr.genes.length,
              0
            );
            const pathwaysRepresented = new Set(
              genome.chromosomes.flatMap((chr) =>
                chr.genes.map((g) => g.pathway)
              )
            );

            return (
              <div
                key={genome.id}
                className="rounded-xl border border-[#1E293B] bg-[#111827]/60 backdrop-blur-sm overflow-hidden"
              >
                {/* Header bar with accent color */}
                <div
                  className="h-1"
                  style={{ backgroundColor: genome.imageColor }}
                />

                <div className="p-6 lg:p-8">
                  {/* Species info */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-slate-100 tracking-tight">
                        <em>{genome.species}</em>
                      </h2>
                      <p className="mt-1 text-sm font-body text-slate-400">
                        {genome.commonName}
                      </p>
                    </div>

                    {/* Quick stats */}
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

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-400 font-body mb-8 max-w-4xl">
                    {genome.description}
                  </p>

                  {/* Chromosome visualization */}
                  <div className="mb-6">
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

                  {/* 3D Karyotype */}
                  <div className="mb-6">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                      3D Karyotype
                    </h3>
                    <div className="rounded-lg border border-[#1E293B]/50 bg-[#0A0F1E] overflow-hidden" style={{ height: "500px" }}>
                      <GenomeViewer3DWrapper
                        chromosomes={genome.chromosomes}
                        speciesName={genome.species}
                        accentColor={genome.imageColor}
                      />
                    </div>
                    <p className="mt-2 text-[11px] font-mono text-slate-600 text-center">
                      Rotate: drag &nbsp;|&nbsp; Zoom: scroll &nbsp;|&nbsp; Pan: right-drag
                    </p>
                  </div>

                  {/* Stats summary */}
                  <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
                    <span>
                      <span
                        className="font-bold"
                        style={{ color: genome.imageColor }}
                      >
                        {totalGenes}
                      </span>{" "}
                      genes shown
                    </span>
                    <span className="w-px h-3 bg-[#1E293B]" />
                    <span>
                      <span
                        className="font-bold"
                        style={{ color: genome.imageColor }}
                      >
                        {pathwaysRepresented.size}
                      </span>{" "}
                      pathways represented
                    </span>
                    <span className="w-px h-3 bg-[#1E293B]" />
                    <span>
                      <span
                        className="font-bold"
                        style={{ color: genome.imageColor }}
                      >
                        {genome.chromosomes.length}
                      </span>{" "}
                      chromosomes displayed
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

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
