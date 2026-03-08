import GenomeBrowser from "@/components/GenomeBrowser";

export const metadata = {
  title: "Plant Genomes | PlantMol",
  description:
    "Explore plant genomes and the chromosomal locations of biosynthetic genes for secondary metabolites.",
};

export default function GenomesPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl">
            Plant Genomes
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            Biosynthetic genes are not randomly distributed across plant
            chromosomes. Many cluster together, reflecting shared regulatory
            elements or ancient duplication events. Explore the genomic
            architecture underlying secondary metabolite production across{" "}
            <span className="text-emerald-400 font-semibold">27 species</span>.
          </p>
        </div>

        <GenomeBrowser />
      </main>
    </div>
  );
}
