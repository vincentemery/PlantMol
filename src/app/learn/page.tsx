import { molecules } from "@/data/molecules";
import { pathways } from "@/data/pathways";
import { genomes } from "@/data/genomes";
import Link from "next/link";

export const metadata = {
  title: "Learn | PlantMol",
  description:
    "Understand how plant molecules, biosynthetic pathways, and genomes connect — and how CRISPR gene editing enables precision crop improvement.",
};

/* ------------------------------------------------------------------ */
/*  Reusable pieces                                                    */
/* ------------------------------------------------------------------ */

function SectionNumber({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold shrink-0">
      {n}
    </span>
  );
}

function SectionHeading({
  number,
  title,
  subtitle,
  id,
}: {
  number: number;
  title: string;
  subtitle: string;
  id: string;
}) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <div className="flex items-center gap-3 mb-2">
        <SectionNumber n={number} />
        <p className="text-xs font-mono uppercase tracking-widest text-slate-500">
          Section {number}
        </p>
      </div>
      <h2 className="text-3xl font-display font-bold text-slate-100 tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base text-slate-400 font-body max-w-3xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

function InfoCard({
  title,
  children,
  accentColor = "#10B981",
  icon,
}: {
  title: string;
  children: React.ReactNode;
  accentColor?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 backdrop-blur-sm">
      <div className="h-0.5 w-12 rounded-full mb-4" style={{ backgroundColor: accentColor }} />
      <div className="flex items-start gap-3">
        {icon && (
          <div
            className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
            style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
          >
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-display font-semibold text-slate-200 mb-2">{title}</h3>
          <div className="text-sm text-slate-400 font-body leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CRISPR Step Diagram                                                */
/* ------------------------------------------------------------------ */

function CrisprStep({
  step,
  title,
  description,
  color,
  isLast = false,
}: {
  step: number;
  title: string;
  description: string;
  color: string;
  isLast?: boolean;
}) {
  return (
    <div className="relative flex gap-4">
      {/* Vertical connector line */}
      <div className="flex flex-col items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-mono font-bold border-2 shrink-0"
          style={{ borderColor: color, color, backgroundColor: `${color}10` }}
        >
          {step}
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-8" style={{ backgroundColor: `${color}30` }} />
        )}
      </div>
      {/* Content */}
      <div className="pb-8">
        <h4 className="text-sm font-display font-semibold text-slate-200 mb-1">{title}</h4>
        <p className="text-sm text-slate-400 font-body leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DNA Visualization (CSS only)                                       */
/* ------------------------------------------------------------------ */

function DnaSnippet({
  sequence,
  highlight,
  label,
  color = "#10B981",
}: {
  sequence: string;
  highlight?: [number, number];
  label?: string;
  color?: string;
}) {
  const complement: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  const bases = sequence.split("");

  return (
    <div className="font-mono text-xs">
      {label && (
        <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      )}
      <div className="flex gap-0">
        {bases.map((base, i) => {
          const isHighlighted = highlight && i >= highlight[0] && i < highlight[1];
          const baseColor =
            base === "A"
              ? "#EF4444"
              : base === "T"
                ? "#3B82F6"
                : base === "G"
                  ? "#FACC15"
                  : "#10B981";
          return (
            <div key={i} className="flex flex-col items-center w-5">
              <span
                className="font-bold"
                style={{
                  color: isHighlighted ? color : baseColor,
                  textShadow: isHighlighted ? `0 0 8px ${color}60` : "none",
                }}
              >
                {base}
              </span>
              <span
                className="text-[8px] my-0.5"
                style={{ color: isHighlighted ? `${color}60` : "#334155" }}
              >
                |
              </span>
              <span
                className="font-bold"
                style={{
                  color: isHighlighted ? color : baseColor === "#EF4444" ? "#3B82F6" : baseColor === "#3B82F6" ? "#EF4444" : baseColor === "#FACC15" ? "#10B981" : "#FACC15",
                  textShadow: isHighlighted ? `0 0 8px ${color}60` : "none",
                }}
              >
                {complement[base] || base}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SDN Type Cards                                                     */
/* ------------------------------------------------------------------ */

function SdnCard({
  type,
  title,
  mechanism,
  result,
  example,
  color,
  regulation,
}: {
  type: string;
  title: string;
  mechanism: string;
  result: string;
  example: string;
  color: string;
  regulation: string;
}) {
  return (
    <div
      className="rounded-xl border p-5 relative overflow-hidden"
      style={{ borderColor: `${color}30`, backgroundColor: `${color}05` }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-10" style={{ backgroundColor: color }} />
      <div
        className="inline-block px-2 py-0.5 rounded text-xs font-mono font-bold mb-3"
        style={{ backgroundColor: `${color}20`, color }}
      >
        {type}
      </div>
      <h4 className="text-sm font-display font-semibold text-slate-200 mb-2">{title}</h4>
      <div className="space-y-2 text-xs text-slate-400 font-body leading-relaxed">
        <p>
          <span className="text-slate-500 font-mono">Mechanism:</span> {mechanism}
        </p>
        <p>
          <span className="text-slate-500 font-mono">Result:</span> {result}
        </p>
        <p>
          <span className="text-slate-500 font-mono">Example:</span> {example}
        </p>
        <p>
          <span className="text-slate-500 font-mono">Regulation:</span>{" "}
          <span style={{ color }}>{regulation}</span>
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pathway Flow Mini Diagram                                          */
/* ------------------------------------------------------------------ */

function PathwayFlowDiagram() {
  const steps = [
    { compound: "L-Phenylalanine", enzyme: "PAL", color: "#EC4899" },
    { compound: "Cinnamic acid", enzyme: "C4H", color: "#EC4899" },
    { compound: "p-Coumaric acid", enzyme: "4CL", color: "#EC4899" },
    { compound: "p-Coumaroyl-CoA", enzyme: "CHS", color: "#EC4899" },
    { compound: "Naringenin chalcone", enzyme: "CHI", color: "#EC4899" },
    { compound: "Flavonoids", enzyme: null, color: "#EC4899" },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6 overflow-x-auto">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
        Example: Phenylpropanoid Pathway
      </p>
      <div className="flex items-center gap-1 min-w-max">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className="px-3 py-2 rounded-lg border text-xs font-mono text-center whitespace-nowrap"
              style={{
                borderColor: `${step.color}30`,
                backgroundColor: `${step.color}08`,
                color: i === steps.length - 1 ? step.color : "#CBD5E1",
              }}
            >
              {step.compound}
            </div>
            {step.enzyme && (
              <>
                <div className="flex flex-col items-center mx-1">
                  <span className="text-[9px] font-mono text-emerald-400/70 whitespace-nowrap">
                    {step.enzyme}
                  </span>
                  <svg
                    width="24"
                    height="10"
                    viewBox="0 0 24 10"
                    className="text-slate-600"
                  >
                    <line
                      x1="0"
                      y1="5"
                      x2="20"
                      y2="5"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                    <polygon
                      points="18,2 24,5 18,8"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hierarchy Diagram: Base Pairs → Gene → Chromosome → Genome        */
/* ------------------------------------------------------------------ */

function HierarchyDiagram() {
  const levels = [
    {
      label: "Base Pairs",
      desc: "A, T, G, C nucleotides encode genetic information",
      color: "#EF4444",
      size: "text-[10px]",
      visual: "...ATCGGCTAACGT...",
    },
    {
      label: "Gene",
      desc: "A sequence of ~1,000-100,000 bp encoding one protein (enzyme)",
      color: "#FACC15",
      size: "text-xs",
      visual: "PAL gene (2,100 bp)",
    },
    {
      label: "Chromosome",
      desc: "Millions of base pairs organized into a single DNA molecule",
      color: "#3B82F6",
      size: "text-sm",
      visual: "Chromosome 2 (43 Mb)",
    },
    {
      label: "Genome",
      desc: "The complete set of chromosomes in an organism",
      color: "#10B981",
      size: "text-base",
      visual: "A. thaliana (135 Mb, 5 chromosomes)",
    },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-6">
        Levels of Genomic Organization
      </p>
      <div className="space-y-0">
        {levels.map((level, i) => (
          <div key={i} className="relative">
            <div className="flex items-start gap-4 py-3">
              {/* Zoom indicator */}
              <div className="flex flex-col items-center shrink-0 w-8">
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: `${level.color}20`, border: `1px solid ${level.color}40` }}
                >
                  <span className="text-[8px] font-mono font-bold" style={{ color: level.color }}>
                    {i + 1}
                  </span>
                </div>
                {i < levels.length - 1 && (
                  <div className="w-px h-6" style={{ backgroundColor: `${level.color}20` }} />
                )}
              </div>
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h4 className={`font-display font-bold ${level.size}`} style={{ color: level.color }}>
                    {level.label}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-600">{level.visual}</span>
                </div>
                <p className="text-xs text-slate-400 font-body mt-0.5">{level.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connection Diagram: How it all fits together                       */
/* ------------------------------------------------------------------ */

function ConnectionDiagram() {
  const nodes = [
    { label: "Genome", sublabel: "27 species", color: "#10B981", href: "/genomes" },
    { label: "Genes", sublabel: "79+ enzymes", color: "#3B82F6", href: "/genomes" },
    { label: "Pathways", sublabel: "9 routes", color: "#EC4899", href: "/pathways" },
    { label: "Molecules", sublabel: "30 compounds", color: "#F97316", href: "/molecules" },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-0">
            <Link
              href={node.href}
              className="rounded-xl border px-5 py-3 text-center transition-all hover:scale-105 group"
              style={{
                borderColor: `${node.color}30`,
                backgroundColor: `${node.color}08`,
              }}
            >
              <p className="text-sm font-display font-bold group-hover:underline" style={{ color: node.color }}>
                {node.label}
              </p>
              <p className="text-[10px] font-mono text-slate-500">{node.sublabel}</p>
            </Link>
            {i < nodes.length - 1 && (
              <div className="hidden sm:flex items-center mx-1">
                <svg width="40" height="16" viewBox="0 0 40 16" className="text-slate-600">
                  <line x1="0" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="1" />
                  <polygon points="32,4 40,8 32,12" fill="currentColor" />
                </svg>
              </div>
            )}
            {i < nodes.length - 1 && (
              <div className="sm:hidden flex items-center my-1">
                <svg width="16" height="24" viewBox="0 0 16 24" className="text-slate-600">
                  <line x1="8" y1="0" x2="8" y2="18" stroke="currentColor" strokeWidth="1" />
                  <polygon points="4,16 8,24 12,16" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] font-mono text-slate-600 mt-4">
        Genomes encode genes &rarr; Genes produce enzymes &rarr; Enzymes catalyze pathways &rarr; Pathways produce molecules
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Table of Contents sidebar                                          */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  const sections = [
    { id: "metabolites", label: "Secondary Metabolites" },
    { id: "pathways", label: "Biosynthetic Pathways" },
    { id: "genomes", label: "Genomes & Genes" },
    { id: "crispr", label: "How CRISPR Works" },
    { id: "together", label: "Putting It Together" },
  ];

  return (
    <nav className="hidden xl:block sticky top-24 w-48 shrink-0">
      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-600 mb-3">
        On this page
      </p>
      <div className="space-y-1">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="block text-xs font-body text-slate-500 hover:text-emerald-400 transition-colors py-1 border-l-2 border-[#1E293B] pl-3 hover:border-emerald-500/50"
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LearnPage() {
  const moleculeCount = molecules.length;
  const pathwayCount = pathways.length;
  const genomeCount = genomes.length;

  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Hero */}
        <div className="mb-20">
          <p className="text-xs font-mono uppercase tracking-widest text-emerald-400/70 mb-3">
            Educational Guide
          </p>
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl lg:text-6xl max-w-4xl">
            From Molecules to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Genome Engineering
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            Plants produce an astonishing diversity of chemical compounds to defend themselves,
            attract pollinators, and survive harsh environments. Understanding how these molecules
            are made &mdash; from DNA blueprint to final product &mdash; is the foundation of
            modern crop improvement through CRISPR gene editing.
          </p>
        </div>

        <div className="flex gap-12">
          <TableOfContents />

          <div className="flex-1 min-w-0 space-y-24">
            {/* ============================================= */}
            {/* SECTION 1: Secondary Metabolites               */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={1}
                id="metabolites"
                title="Plant Secondary Metabolites"
                subtitle="Beyond the basics of growth and reproduction, plants synthesize thousands of specialized chemicals. These 'secondary metabolites' aren't essential for survival in the lab — but in nature, they're the difference between life and death."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <InfoCard
                  title="Alkaloids"
                  accentColor="#8B5CF6"
                  icon={<span>N</span>}
                >
                  <p>
                    Nitrogen-containing compounds derived from amino acids. Often toxic to
                    herbivores, many have potent pharmacological effects in humans.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: caffeine, morphine, nicotine, vinblastine, quinine
                  </p>
                </InfoCard>

                <InfoCard
                  title="Terpenoids"
                  accentColor="#10B981"
                  icon={<span>C5</span>}
                >
                  <p>
                    Built from 5-carbon isoprene units (IPP/DMAPP). The largest class of
                    plant natural products with over 80,000 known structures.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: menthol, artemisinin, taxol, limonene, cannabidiol
                  </p>
                </InfoCard>

                <InfoCard
                  title="Phenylpropanoids"
                  accentColor="#EC4899"
                  icon={<span>Ph</span>}
                >
                  <p>
                    Derived from phenylalanine via the phenylpropanoid pathway. Includes
                    flavonoids, stilbenes, lignin, and anthocyanins responsible for flower color.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: resveratrol, quercetin, curcumin, EGCG, cyanidin
                  </p>
                </InfoCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Why do plants make these?" accentColor="#F59E0B">
                  <p>
                    Plants can&apos;t run away from threats. Instead, they evolved chemical
                    arsenals: caffeine poisons insect neurons, capsaicin burns mammalian mouths
                    (but not birds, which disperse seeds), and resveratrol kills fungal pathogens.
                  </p>
                </InfoCard>
                <InfoCard title="Why do we care?" accentColor="#06B6D4">
                  <p>
                    Over 50% of approved drugs derive from natural products. Artemisinin treats
                    malaria, taxol fights cancer, morphine manages pain. Understanding how
                    plants make these molecules lets us engineer crops to produce more &mdash;
                    or create entirely new compounds.
                  </p>
                </InfoCard>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/molecules"
                  className="inline-flex items-center gap-2 text-sm font-body text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Explore all {moleculeCount} molecules in our database &rarr;
                </Link>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 2: Biosynthetic Pathways               */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={2}
                id="pathways"
                title="Biosynthetic Pathways"
                subtitle="Secondary metabolites aren't made in a single step. They're assembled through enzymatic assembly lines — each enzyme modifies a molecule and passes it to the next. These assembly lines are called biosynthetic pathways."
              />

              <div className="space-y-6 mb-8">
                <InfoCard title="How a pathway works" accentColor="#EC4899">
                  <p>
                    A pathway is a series of chemical reactions, each catalyzed by a specific
                    enzyme. The enzyme is encoded by a gene. Changing the gene changes the
                    enzyme, which changes the product.
                  </p>
                  <p>
                    <strong className="text-slate-300">Gene</strong> &rarr;{" "}
                    <strong className="text-slate-300">Enzyme</strong> &rarr;{" "}
                    <strong className="text-slate-300">Chemical reaction</strong> &rarr;{" "}
                    <strong className="text-slate-300">Product</strong>
                  </p>
                </InfoCard>

                <PathwayFlowDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Branch points" accentColor="#FACC15">
                    <p>
                      Pathways aren&apos;t always linear. At branch points, one intermediate
                      can be routed to different end products by different enzymes. This is
                      how a single pathway produces diverse compounds: the phenylpropanoid
                      pathway makes both red anthocyanins and tough lignin.
                    </p>
                  </InfoCard>
                  <InfoCard title="Pathway crosstalk" accentColor="#7C3AED">
                    <p>
                      Pathways don&apos;t operate in isolation. The shikimate pathway feeds
                      phenylalanine to phenylpropanoids and tryptophan to indole alkaloids.
                      The MEP pathway provides terpenoid building blocks used in everything
                      from menthol to chlorophyll to carotenoids.
                    </p>
                  </InfoCard>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/pathways"
                  className="inline-flex items-center gap-2 text-sm font-body text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Explore all {pathwayCount} pathways in detail &rarr;
                </Link>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 3: Genomes & Genes                     */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={3}
                id="genomes"
                title="From Genes to Genomes"
                subtitle="Every enzyme in a biosynthetic pathway is encoded by a gene — a stretch of DNA on a chromosome. Understanding where these genes sit in the genome is essential for editing them with precision."
              />

              <div className="space-y-6 mb-8">
                <HierarchyDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Gene clusters" accentColor="#3B82F6">
                    <p>
                      Biosynthetic genes sometimes cluster together on the same chromosome.
                      These <strong className="text-slate-300">Biosynthetic Gene Clusters (BGCs)</strong>{" "}
                      allow coordinated regulation — when one gene turns on, its neighbors do too.
                      This is common in terpenoid and alkaloid pathways.
                    </p>
                  </InfoCard>
                  <InfoCard title="Polyploidy" accentColor="#F97316">
                    <p>
                      Many crops are polyploid — they have multiple copies of each chromosome.
                      Wheat has 6 copies (hexaploid), sugarcane has 8-12. This means CRISPR
                      must edit all copies (homeologs) simultaneously for a phenotypic effect,
                      making some crops much harder to engineer.
                    </p>
                  </InfoCard>
                </div>

                <InfoCard title="Genome sizes vary enormously" accentColor="#10B981">
                  <p>
                    Arabidopsis (thale cress) has a tiny 135 Mb genome — ideal for lab work.
                    Wheat has a massive 17 Gb genome, 125x larger, filled with repetitive DNA.
                    Sugarcane&apos;s polyploid genome reaches 10 Gb with 80 chromosomes. Size
                    doesn&apos;t correlate with complexity — it reflects evolutionary history,
                    transposon activity, and whole-genome duplication events.
                  </p>
                </InfoCard>

                <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-3">
                    Genome Size Comparison
                  </p>
                  <div className="space-y-2">
                    {[
                      { name: "Arabidopsis", size: 135, color: "#22C55E" },
                      { name: "Rice", size: 430, color: "#22D3EE" },
                      { name: "Tomato", size: 900, color: "#EF4444" },
                      { name: "Maize", size: 2300, color: "#FACC15" },
                      { name: "Barley", size: 5100, color: "#D4A574" },
                      { name: "Sugarcane", size: 10000, color: "#86EFAC" },
                      { name: "Wheat", size: 17000, color: "#D97706" },
                    ].map((g) => (
                      <div key={g.name} className="flex items-center gap-3">
                        <span className="text-xs font-mono text-slate-400 w-24 text-right">{g.name}</span>
                        <div className="flex-1 h-3 rounded-full bg-[#1E293B] overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${(g.size / 17000) * 100}%`,
                              backgroundColor: g.color,
                              minWidth: "4px",
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 w-16">
                          {g.size >= 1000 ? `${(g.size / 1000).toFixed(1)} Gb` : `${g.size} Mb`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/genomes"
                  className="inline-flex items-center gap-2 text-sm font-body text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Explore all {genomeCount} genomes &rarr;
                </Link>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 4: How CRISPR Works                    */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={4}
                id="crispr"
                title="How CRISPR Gene Editing Works"
                subtitle="CRISPR-Cas9 is a molecular scissors system borrowed from bacteria. It lets scientists make precise changes to any gene in any organism — including the biosynthetic genes that produce plant secondary metabolites."
              />

              {/* Origin story */}
              <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 mb-8">
                <h3 className="text-sm font-display font-semibold text-slate-200 mb-3">
                  A bacterial immune system, repurposed
                </h3>
                <p className="text-sm text-slate-400 font-body leading-relaxed mb-4">
                  Bacteria use CRISPR as an immune system against viruses. When a virus infects a
                  bacterium, the cell stores a snippet of the viral DNA in its own genome (a &quot;spacer&quot;).
                  If the same virus returns, the bacterium transcribes the spacer into a guide RNA
                  that directs the Cas9 protein to find and cut the matching viral DNA, destroying it.
                </p>
                <p className="text-sm text-slate-400 font-body leading-relaxed">
                  In 2012, Jennifer Doudna and Emmanuelle Charpentier showed this system could be
                  reprogrammed: by designing a custom guide RNA, scientists can direct Cas9 to cut
                  <em> any</em> DNA sequence in <em>any</em> organism. This earned them the 2020
                  Nobel Prize in Chemistry.
                </p>
              </div>

              {/* Step-by-step mechanism */}
              <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6 mb-8">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-6">
                  The CRISPR-Cas9 Mechanism
                </p>

                <CrisprStep
                  step={1}
                  title="Design the Guide RNA"
                  description="A 20-nucleotide RNA sequence is designed to match the target gene. This guide RNA (gRNA) will direct Cas9 to the exact location in the genome. The target site must be adjacent to a PAM sequence (NGG for SpCas9) — a short motif that Cas9 uses to recognize where to bind."
                  color="#10B981"
                />
                <CrisprStep
                  step={2}
                  title="Cas9 + Guide RNA form a complex"
                  description="The Cas9 protein loads the guide RNA to form a ribonucleoprotein (RNP) complex. This complex then scans along the genome, checking for sequences complementary to the guide RNA. It unwinds the DNA double helix one PAM at a time."
                  color="#3B82F6"
                />
                <CrisprStep
                  step={3}
                  title="Target recognition and binding"
                  description="When the guide RNA finds its complementary 20-nt sequence adjacent to a PAM, it base-pairs with the target strand, forming an R-loop. Cas9 undergoes a conformational change, activating its two nuclease domains (RuvC and HNH)."
                  color="#8B5CF6"
                />
                <CrisprStep
                  step={4}
                  title="Double-strand break (DSB)"
                  description="Cas9 cuts both strands of the DNA at the target site, creating a clean double-strand break approximately 3 base pairs upstream of the PAM. This is the critical event — the cell must now repair this break."
                  color="#EF4444"
                />
                <CrisprStep
                  step={5}
                  title="Cell repair determines the outcome"
                  description="The cell has two main repair pathways: NHEJ (error-prone, creates knockouts) and HDR (precise, allows insertions). The choice of repair pathway determines what kind of edit results — this is where the three types of site-directed nuclease edits (SDN-1, SDN-2, SDN-3) come in."
                  color="#F59E0B"
                  isLast
                />
              </div>

              {/* DNA visualization */}
              <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6 mb-8">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
                  Guide RNA Target Recognition
                </p>
                <div className="flex flex-col gap-4">
                  <div>
                    <DnaSnippet
                      sequence="ATCGATCGGCTAACGTCCAG"
                      highlight={[4, 16]}
                      label="Genomic DNA (target strand)"
                      color="#10B981"
                    />
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] font-mono text-slate-600 mb-1">
                      <span className="text-emerald-400/50">&darr;</span> Guide RNA binds to
                      complementary sequence
                    </p>
                    <p className="text-[10px] font-mono text-emerald-400/80">
                      &nbsp;&nbsp;&nbsp;&nbsp;{'|||||||||||'}
                      <span className="text-yellow-400/50">&nbsp;NGG</span>
                      <span className="text-[9px] text-slate-600">&nbsp;&larr; PAM</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-red-500/30" />
                    <span className="text-[9px] font-mono text-red-400">Cas9 cuts here</span>
                    <div className="flex-1 h-px bg-red-500/30" />
                  </div>
                </div>
              </div>

              {/* SDN Types */}
              <div className="mb-8">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                  Three Types of CRISPR Edits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SdnCard
                    type="SDN-1"
                    title="Gene Knockout"
                    mechanism="Cas9 cuts DNA. Cell repairs via NHEJ (Non-Homologous End Joining), introducing random insertions or deletions that disrupt the gene."
                    result="Gene is disabled. No foreign DNA introduced."
                    example="Knocking out MLO in wheat to confer powdery mildew resistance."
                    color="#10B981"
                    regulation="Least regulated — equivalent to natural mutation in many countries"
                  />
                  <SdnCard
                    type="SDN-2"
                    title="Precise Base Change"
                    mechanism="Cas9 cuts DNA. A short DNA template is provided. Cell uses HDR (Homology-Directed Repair) to copy the template, introducing a specific point mutation."
                    result="One or a few nucleotides changed. Like a natural SNP."
                    example="Changing a single amino acid in ALS gene to confer herbicide tolerance."
                    color="#3B82F6"
                    regulation="Moderately regulated — varies by country"
                  />
                  <SdnCard
                    type="SDN-3"
                    title="Gene Insertion"
                    mechanism="Cas9 cuts DNA. A large DNA template with a new gene is provided. HDR inserts the entire new sequence at the cut site."
                    result="New gene inserted at a precise location. Foreign DNA present."
                    example="Inserting PSY + CRTI genes into rice endosperm for Golden Rice."
                    color="#F59E0B"
                    regulation="Most regulated — classified as GMO in most jurisdictions"
                  />
                </div>
              </div>

              {/* Modern CRISPR tools */}
              <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 mb-8">
                <h3 className="text-sm font-display font-semibold text-slate-200 mb-4">
                  Beyond Cas9: Modern Editing Tools
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      tool: "Base Editors (CBE/ABE)",
                      desc: "Change single bases (C→T or A→G) without cutting DNA. No double-strand break needed.",
                      color: "#06B6D4",
                    },
                    {
                      tool: "Prime Editing",
                      desc: "Search-and-replace: any small edit without DSBs or donor template. Most versatile but lowest efficiency.",
                      color: "#8B5CF6",
                    },
                    {
                      tool: "CRISPRi / CRISPRa",
                      desc: "Turn genes down (interference) or up (activation) without changing DNA sequence. Reversible.",
                      color: "#EC4899",
                    },
                    {
                      tool: "Cas12a (Cpf1)",
                      desc: "Alternative nuclease with built-in gRNA processing for multiplexing. TTTV PAM opens different target sites.",
                      color: "#F97316",
                    },
                  ].map((t) => (
                    <div
                      key={t.tool}
                      className="rounded-lg border px-4 py-3"
                      style={{ borderColor: `${t.color}20`, backgroundColor: `${t.color}05` }}
                    >
                      <p className="text-xs font-mono font-bold mb-1" style={{ color: t.color }}>
                        {t.tool}
                      </p>
                      <p className="text-xs text-slate-400 font-body leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-world applications */}
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                  Real-World CRISPR Crop Applications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Disease Resistance" accentColor="#EF4444">
                    <p>
                      Knocking out <strong className="text-slate-300">MLO</strong> genes in wheat
                      creates broad-spectrum powdery mildew resistance. All three homeologs
                      (TaMLO-A1, B1, D1) must be edited simultaneously in this hexaploid crop.
                    </p>
                  </InfoCard>
                  <InfoCard title="Nutrition Enhancement" accentColor="#F97316">
                    <p>
                      Golden Rice expresses <strong className="text-slate-300">PSY</strong> and
                      CRTI to produce beta-carotene (provitamin A) in rice endosperm, addressing
                      vitamin A deficiency that causes blindness in 250,000 children annually.
                    </p>
                  </InfoCard>
                  <InfoCard title="Yield Improvement" accentColor="#10B981">
                    <p>
                      Editing <strong className="text-slate-300">GW2</strong> (a grain weight
                      regulator) in rice increases grain size by 10-15%. Similar edits in wheat
                      and maize target orthologous genes for yield gains.
                    </p>
                  </InfoCard>
                  <InfoCard title="Climate Adaptation" accentColor="#3B82F6">
                    <p>
                      Overexpressing <strong className="text-slate-300">DREB/CBF</strong>{" "}
                      transcription factors via CRISPRa enhances drought and cold tolerance.
                      SUB1A editing gives rice submergence tolerance for flood-prone regions.
                    </p>
                  </InfoCard>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  href="/architect"
                  className="inline-flex items-center gap-2 text-sm font-body text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Design your own CRISPR edits in the Genome Architect &rarr;
                </Link>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 5: Putting It All Together              */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={5}
                id="together"
                title="Putting It All Together"
                subtitle="PlantMol connects molecules, pathways, genomes, and gene editing into a single integrated platform. Here's how the pieces fit."
              />

              <ConnectionDiagram />

              <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <h3 className="text-sm font-display font-semibold text-emerald-400 mb-3">
                  The PlantMol Pipeline
                </h3>
                <div className="space-y-3 text-sm text-slate-400 font-body leading-relaxed">
                  <p>
                    <strong className="text-slate-300">1. Identify the target molecule</strong> &mdash;
                    Browse our database of {moleculeCount} secondary metabolites to find a compound of interest
                    (e.g., increase lycopene in tomato for better nutrition).
                  </p>
                  <p>
                    <strong className="text-slate-300">2. Trace the pathway</strong> &mdash;
                    Follow the biosynthetic pathway to identify which enzymes (and therefore
                    which genes) control production of that molecule. Find rate-limiting steps
                    and branch points.
                  </p>
                  <p>
                    <strong className="text-slate-300">3. Locate the genes</strong> &mdash;
                    Find where the target genes sit in the genome. Check for homeologs in
                    polyploid crops. Identify nearby regulatory elements.
                  </p>
                  <p>
                    <strong className="text-slate-300">4. Design the CRISPR edit</strong> &mdash;
                    Use the Genome Architect to plan your editing strategy: choose the right
                    Cas tool, design guide RNAs, assess off-target risks, plan delivery, and
                    navigate regulatory requirements.
                  </p>
                  <p>
                    <strong className="text-slate-300">5. Predict the outcome</strong> &mdash;
                    Model the phenotypic effects of your edits, check for epistatic interactions
                    with other genes, and assess pathway flux changes before going to the lab.
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-12 text-center">
                <p className="text-sm text-slate-500 font-body mb-6">
                  Ready to explore?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/molecules"
                    className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all"
                  >
                    Browse Molecules
                  </Link>
                  <Link
                    href="/pathways"
                    className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all"
                  >
                    Explore Pathways
                  </Link>
                  <Link
                    href="/genomes"
                    className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all"
                  >
                    View Genomes
                  </Link>
                  <Link
                    href="/architect"
                    className="rounded-lg bg-emerald-600 border border-emerald-500 px-5 py-2.5 text-sm font-display font-semibold text-white hover:bg-emerald-500 transition-all"
                  >
                    Open Genome Architect
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
