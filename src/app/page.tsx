import Link from "next/link";
import { molecules } from "@/data/molecules";
import { pathways } from "@/data/pathways";
import { MoleculeCard } from "@/components/MoleculeCard";
import { StatsBar } from "@/components/StatsBar";
import DNAHelixWrapper from "@/components/DNAHelixWrapper";

const featuredIds = ["caffeine", "resveratrol", "artemisinin", "chlorophyll-a"];
const featuredMolecules = molecules.filter((m) => featuredIds.includes(m.id));

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-24 sm:px-6 lg:px-8">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/3 h-[300px] w-[400px] rounded-full bg-cyan-500/5 blur-3xl" />
        </div>

        {/* Decorative DNA Helix */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 opacity-30 hidden lg:block">
          <DNAHelixWrapper height={300} color="#10B981" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="animate-fade-in-up">
            <p className="mb-4 font-mono text-sm tracking-widest text-emerald-400 uppercase">
              Plant Molecular Genomics
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Explore the Molecular
              </span>
              <br />
              <span className="text-text-primary">Language of Plants</span>
            </h1>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary animate-fade-in-up delay-200">
            Dive into the chemistry that powers the plant kingdom. From the
            caffeine in your morning coffee to the chlorophyll capturing
            sunlight, discover the molecules, biosynthetic pathways, and genes
            that shape plant life.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up delay-300">
            <Link
              href="/molecules"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-500 px-7 font-display text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="5" r="2" />
                <circle cx="12" cy="20" r="2" />
                <line x1="12" y1="9" x2="12" y2="18" />
                <line x1="9.5" y1="10.5" x2="6.5" y2="6.5" />
                <line x1="14.5" y1="10.5" x2="17.5" y2="6.5" />
              </svg>
              Browse Molecules
            </Link>
            <Link
              href="/pathways"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-card-border bg-card px-7 font-display text-sm font-semibold text-text-primary transition-all hover:border-text-secondary hover:bg-white/5 hover:-translate-y-0.5"
            >
              View Pathways
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <StatsBar />

      {/* Featured Molecules */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Featured Molecules
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Key plant metabolites spanning alkaloids, terpenoids,
              phenylpropanoids, and tetrapyrroles.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMolecules.map((molecule, i) => (
              <div
                key={molecule.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <MoleculeCard molecule={molecule} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/molecules"
              className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              View all {molecules.length} molecules
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pathway Preview */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-card-border">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-text-primary">
              Biosynthetic Pathways
            </h2>
            <p className="mt-3 text-text-secondary max-w-xl mx-auto">
              Trace the enzymatic routes that build these molecules from simple
              precursors.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {pathways.map((pathway, i) => (
              <Link
                key={pathway.id}
                href={`/pathways/${pathway.id}`}
                className="group relative rounded-xl border border-card-border bg-card p-6 transition-all duration-300 hover:border-transparent hover:shadow-lg animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `0 0 30px ${pathway.color}15`,
                  }}
                />
                <div className="relative">
                  <div
                    className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${pathway.color}18` }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={pathway.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v18" />
                      <path d="M8 7l4-4 4 4" />
                      <path d="M8 17l4 4 4-4" />
                      <path d="M3 12h4" />
                      <path d="M17 12h4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
                    {pathway.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary line-clamp-3">
                    {pathway.description.slice(0, 150)}...
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
                    <span
                      className="inline-block rounded-full px-2 py-0.5 font-medium"
                      style={{
                        backgroundColor: `${pathway.color}18`,
                        color: pathway.color,
                      }}
                    >
                      {pathway.moleculeIds.length} molecules
                    </span>
                    <span>{pathway.steps.length} steps</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why PlantMol Exists */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-t border-card-border">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <p className="mb-3 font-mono text-xs tracking-widest text-cyan-400 uppercase">
              The Mission
            </p>
            <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
              Why PlantMol Exists
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-card-border bg-card p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v8" /><path d="m4.93 10.93 1.41 1.41" /><path d="M2 18h2" /><path d="M20 18h2" /><path d="m19.07 10.93-1.41 1.41" /><path d="M22 22H2" /><path d="m8 6 4-4 4 4" /><path d="M16 18a4 4 0 0 0-8 0" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  AI Scientist Is Possible
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  PlantMol demonstrates that AI can synthesize complex biological
                  knowledge across molecular biology, genomics, and biochemistry.
                  By connecting molecules to pathways to genomes, we show that an
                  AI Scientist can reason across the full stack of plant
                  biology — from gene to phenotype.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-card-border bg-card p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><path d="M14 2v6h6" /><path d="M8 13h2" /><path d="M8 17h2" /><path d="M14 13h2" /><path d="M14 17h2" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  CRISPR Target Discovery
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  An AI Scientist can accelerate the identification of CRISPR
                  gene-editing targets by mapping biosynthetic genes to desirable
                  traits — drought tolerance, pest resistance, enhanced
                  nutrition. What once took years of wet-lab screening can be
                  narrowed to candidate genes in hours.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-card-border bg-card p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  Feeding Billions More
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  By 2050, the world must feed 10 billion people on increasingly
                  stressed farmland. AI-guided crop engineering — developing
                  plants with higher yields, climate resilience, and enhanced
                  nutritional profiles — is not a luxury. It is a necessity for
                  global food security.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-card-border bg-card/50 p-6 text-center">
            <p className="text-sm text-text-secondary leading-relaxed max-w-3xl mx-auto">
              PlantMol is a proof of concept: AI can understand the molecular
              language of plants deeply enough to accelerate real scientific
              discovery. From identifying which genes control capsaicin
              production in peppers to mapping the terpenoid pathways that
              produce antimalarial artemisinin, this is the kind of knowledge
              synthesis that will power the next generation of crop science.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="rounded-2xl border border-card-border bg-card p-10 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
                Dive into Plant Genomics
              </h2>
              <p className="mt-3 text-text-secondary max-w-lg mx-auto">
                Explore the genomes of Arabidopsis, grapevine, chili pepper, and
                tobacco. See where biosynthetic genes sit on chromosomes.
              </p>
              <Link
                href="/genomes"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-500 px-6 font-display text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
              >
                Explore Genomes
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
