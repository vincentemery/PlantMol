import { molecules } from "@/data/molecules";
import { pathways } from "@/data/pathways";
import { genomes } from "@/data/genomes";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About | PlantMol",
  description:
    "Learn about PlantMol, a molecular genomics demonstration exploring plant secondary metabolites.",
};

const keyConcepts = [
  {
    title: "Secondary Metabolites",
    description:
      "Unlike primary metabolites (amino acids, sugars, nucleotides) required for basic cellular function, secondary metabolites are not essential for growth and reproduction. Instead, they mediate ecological interactions: defending against herbivores and pathogens, attracting pollinators, protecting against UV radiation, and inhibiting competing plants. Despite being 'secondary,' these compounds are the source of most pharmaceuticals, agricultural chemicals, and industrial natural products.",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5",
  },
  {
    title: "Biosynthetic Gene Clusters",
    description:
      "In many plant species, the genes encoding enzymes for a specific metabolic pathway are physically co-localized on the same chromosome. These biosynthetic gene clusters (BGCs) can be co-regulated by shared transcription factors and chromatin states, ensuring coordinated expression. BGCs are particularly common in terpenoid and alkaloid pathways and may have evolved through gene duplication and neofunctionalization.",
    icon: "M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3",
  },
  {
    title: "Convergent Evolution",
    description:
      "One of the most remarkable phenomena in plant biochemistry is the independent evolution of identical molecules in unrelated lineages. Caffeine, for example, evolved at least five separate times in coffee, tea, cacao, citrus, and guarana. Each lineage recruited different ancestral methyltransferases and arrived at the same end product through distinct enzymatic routes. This convergent evolution reflects strong selective pressure for these particular chemical solutions to ecological challenges.",
    icon: "M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5",
  },
  {
    title: "Terpene Synthases",
    description:
      "The terpene synthase (TPS) superfamily is the largest enzyme family in the plant kingdom, with some species encoding over 100 TPS genes. These enzymes catalyze the cyclization and rearrangement of linear prenyl diphosphate precursors (GPP, FPP, GGPP) into an astonishing diversity of cyclic and polycyclic terpenoid scaffolds. A single amino acid change in the active site can redirect the reaction to produce an entirely different product, explaining the explosive diversification of terpenoid structures across plant lineages.",
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z",
  },
];

export default function AboutPage() {
  // Compute stats from data
  const totalMolecules = molecules.length;
  const totalGenes = new Set(
    molecules.flatMap((m) => m.genes.map((g) => g.name))
  ).size;
  const totalPathways = pathways.length;
  const totalGenomes = genomes.length;

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl">
            About PlantMol
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            Where bioinformatics meets molecular biology.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <SectionHeading color="#10B981">Overview</SectionHeading>
          <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 lg:p-8 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-slate-300 font-body mb-4">
              PlantMol is a demonstration of how bioinformatics and molecular
              biology intersect to illuminate the chemistry of plants. Every
              flower, fruit, leaf, and root is a miniature chemical factory,
              synthesizing thousands of specialized compounds through genetically
              encoded enzymatic pathways.
            </p>
            <p className="text-sm leading-relaxed text-slate-400 font-body mb-4">
              Plant secondary metabolites represent one of nature&apos;s greatest
              treasure troves of bioactive chemistry. From the antimalarial
              artemisinin extracted from sweet wormwood to the anticancer agent
              taxol found in yew bark, these molecules have shaped human medicine,
              agriculture, and industry. Understanding the genes, enzymes, and
              pathways that produce them is central to modern plant science and
              biotechnology.
            </p>
            <p className="text-sm leading-relaxed text-slate-400 font-body">
              This platform connects three layers of information: the{" "}
              <span className="text-emerald-400 font-medium">molecules</span>{" "}
              themselves, the{" "}
              <span className="text-pink-400 font-medium">
                biosynthetic pathways
              </span>{" "}
              that assemble them, and the{" "}
              <span className="text-purple-400 font-medium">
                genomic architecture
              </span>{" "}
              encoding the necessary enzymes.
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="mb-16">
          <SectionHeading color="#EC4899">Methodology</SectionHeading>
          <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 lg:p-8 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-slate-300 font-body mb-4">
              The data presented in PlantMol is drawn from established public
              databases and curated scientific literature:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <DataSourceCard
                name="NCBI / Ensembl Plants"
                description="Gene annotations, genomic coordinates, chromosome assemblies, and sequence data for all referenced plant species."
                color="#8B5CF6"
              />
              <DataSourceCard
                name="KEGG / PlantCyc"
                description="Metabolic pathway maps, enzyme commission numbers, reaction stoichiometry, and pathway classification hierarchies."
                color="#10B981"
              />
              <DataSourceCard
                name="PubChem"
                description="Molecular structures (SMILES), physicochemical properties, molecular weights, and chemical classification data."
                color="#F97316"
              />
            </div>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-16">
          <SectionHeading color="#8B5CF6">Key Concepts</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyConcepts.map((concept) => (
              <div
                key={concept.title}
                className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-[#0A0F1E] border border-[#1E293B] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-slate-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={concept.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-base font-display font-semibold text-slate-100">
                    {concept.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-400 font-body">
                  {concept.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Why PlantMol Exists */}
        <section className="mb-16">
          <SectionHeading color="#06B6D4">Why PlantMol Exists</SectionHeading>
          <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 lg:p-8 backdrop-blur-sm">
            <p className="text-sm leading-relaxed text-slate-300 font-body mb-4">
              PlantMol exists to demonstrate a transformative idea:{" "}
              <span className="text-cyan-400 font-medium">
                an AI Scientist is not only possible, but urgently needed
              </span>
              . By synthesizing molecular structures, biosynthetic pathways, and
              genomic architecture into a single coherent platform, PlantMol
              shows that artificial intelligence can reason across the full
              complexity of plant biology — from nucleotide sequence to
              whole-organism phenotype.
            </p>
            <p className="text-sm leading-relaxed text-slate-400 font-body mb-6">
              The implications are profound. An AI Scientist capable of this kind
              of cross-domain reasoning can dramatically accelerate the
              identification of{" "}
              <span className="text-emerald-400 font-medium">
                CRISPR gene-editing targets
              </span>{" "}
              for developing new plant traits. Rather than years of painstaking
              wet-lab screening, AI can narrow candidate genes for drought
              tolerance, pest resistance, enhanced nutrition, or increased yield
              in hours — mapping from desired phenotype back through metabolic
              pathways to the specific genomic loci that encode the relevant
              enzymes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4">
                <p className="text-2xl font-display font-bold text-emerald-400 mb-1">
                  10B+
                </p>
                <p className="text-xs text-slate-400 font-body">
                  People to feed by 2050 on increasingly stressed agricultural
                  land
                </p>
              </div>
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                <p className="text-2xl font-display font-bold text-cyan-400 mb-1">
                  100x
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Potential acceleration in CRISPR target identification with
                  AI-guided discovery
                </p>
              </div>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-2xl font-display font-bold text-amber-400 mb-1">
                  1000s
                </p>
                <p className="text-xs text-slate-400 font-body">
                  Of secondary metabolite pathways across the plant kingdom
                  waiting to be mapped
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 font-body mb-4">
              The challenge is existential:{" "}
              <span className="text-amber-400 font-medium">
                feeding billions more people
              </span>{" "}
              on a warming planet with shrinking arable land. Traditional
              breeding cycles are too slow. Conventional genetic engineering is
              too narrow in scope. What we need is the ability to engineer entire
              metabolic programs — designing crops that produce more nutritious
              food, resist emerging pathogens, tolerate drought and salinity, and
              sequester more carbon.
            </p>
            <p className="text-sm leading-relaxed text-slate-400 font-body">
              PlantMol is a proof of concept. It shows that AI can already
              understand plant molecular biology at a depth that enables
              meaningful scientific reasoning — from identifying which terpene
              synthases control flavor compounds in mint, to mapping the gene
              clusters responsible for capsaicin biosynthesis in chili peppers.
              Scale this capability, and you have an AI Scientist that can design
              the crops humanity needs to survive the 21st century.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <SectionHeading color="#F97316">Database Statistics</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Molecules" value={totalMolecules} color="#10B981" />
            <StatCard label="Genes" value={totalGenes} color="#EC4899" />
            <StatCard label="Pathways" value={totalPathways} color="#8B5CF6" />
            <StatCard
              label="Plant Genomes"
              value={totalGenomes}
              color="#F97316"
            />
          </div>
        </section>

        {/* Credits / footer section */}
        <section>
          <div className="rounded-xl border border-[#1E293B] bg-[#111827]/40 p-6 lg:p-8 text-center">
            <p className="text-sm text-slate-400 font-body mb-2">
              PlantMol is a research demonstration built with{" "}
              <span className="text-slate-300 font-medium font-mono">
                Next.js
              </span>
              ,{" "}
              <span className="text-slate-300 font-medium font-mono">
                TypeScript
              </span>
              , and{" "}
              <span className="text-slate-300 font-medium font-mono">
                Tailwind CSS
              </span>
              .
            </p>
            <p className="text-xs text-slate-600 font-mono">
              Molecular data is representative and simplified for educational
              purposes. Not intended for clinical or regulatory use.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionHeading({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="w-1 h-6 rounded-full"
        style={{ backgroundColor: color }}
      />
      <h2 className="text-xl font-display font-bold text-slate-100 tracking-tight sm:text-2xl">
        {children}
      </h2>
    </div>
  );
}

function DataSourceCard({
  name,
  description,
  color,
}: {
  name: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className="rounded-lg border p-4"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `${color}05`,
      }}
    >
      <p className="text-sm font-display font-semibold mb-1" style={{ color }}>
        {name}
      </p>
      <p className="text-xs leading-relaxed text-slate-500 font-body">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-5 text-center backdrop-blur-sm">
      <p
        className="text-3xl font-display font-bold tracking-tight"
        style={{ color }}
      >
        {value}
      </p>
      <p className="mt-1 text-xs font-mono uppercase tracking-widest text-slate-500">
        {label}
      </p>
    </div>
  );
}
