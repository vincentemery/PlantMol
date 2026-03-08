import { molecules } from "@/data/molecules";
import { pathways } from "@/data/pathways";
import { genomes } from "@/data/genomes";
import Link from "next/link";

export const metadata = {
  title: "Learn | PlantMol",
  description:
    "A beginner-friendly guide to plant biology, DNA, biosynthetic pathways, and CRISPR gene editing. No prior knowledge required.",
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

function Callout({
  children,
  color = "#10B981",
  label,
}: {
  children: React.ReactNode;
  color?: string;
  label?: string;
}) {
  return (
    <div
      className="rounded-lg border-l-4 px-5 py-4 my-4"
      style={{ borderColor: color, backgroundColor: `${color}08` }}
    >
      {label && (
        <p className="text-[10px] font-mono uppercase tracking-wider mb-1" style={{ color }}>
          {label}
        </p>
      )}
      <div className="text-sm text-slate-300 font-body leading-relaxed">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Plant Cell Diagram                                         */
/* ------------------------------------------------------------------ */

function PlantCellDiagram() {
  const organelles = [
    {
      name: "Cell Wall",
      desc: "Rigid outer layer made of cellulose. Gives the cell its shape and structure.",
      color: "#A3E635",
      position: "col-span-3 row-start-1",
      isOuter: true,
    },
    {
      name: "Chloroplast",
      desc: "Captures sunlight and converts it into chemical energy (sugar). Contains chlorophyll — the green pigment.",
      color: "#22C55E",
      position: "col-start-1 row-start-2",
    },
    {
      name: "Nucleus",
      desc: "The control center. Contains DNA — the instructions for building every protein the cell needs.",
      color: "#3B82F6",
      position: "col-start-2 row-start-2",
    },
    {
      name: "Vacuole",
      desc: "A large storage compartment. Stores water, nutrients, and secondary metabolites like pigments and toxins.",
      color: "#8B5CF6",
      position: "col-start-3 row-start-2",
    },
    {
      name: "Mitochondria",
      desc: "The powerhouse. Burns sugar to release energy (ATP) that powers all cell activities.",
      color: "#EF4444",
      position: "col-start-1 row-start-3",
    },
    {
      name: "Endoplasmic Reticulum",
      desc: "A folded membrane network where proteins are assembled and modified.",
      color: "#F59E0B",
      position: "col-start-2 row-start-3",
    },
    {
      name: "Cell Membrane",
      desc: "A thin, flexible barrier that controls what enters and leaves the cell.",
      color: "#06B6D4",
      position: "col-start-3 row-start-3",
    },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
        Inside a Plant Cell
      </p>
      <div className="grid grid-cols-3 gap-3">
        {organelles.map((org) => (
          <div
            key={org.name}
            className={`rounded-lg border p-3 ${org.position}`}
            style={{
              borderColor: `${org.color}30`,
              backgroundColor: `${org.color}06`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: org.color }}
              />
              <p className="text-xs font-mono font-bold" style={{ color: org.color }}>
                {org.name}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 font-body leading-relaxed">
              {org.desc}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-600 font-mono mt-3 text-center">
        Plant cells have chloroplasts and cell walls — animal cells do not
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Photosynthesis Equation                                    */
/* ------------------------------------------------------------------ */

function PhotosynthesisEquation() {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-5">
        Photosynthesis — How Plants Make Food
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 px-4 py-3">
          <p className="text-2xl mb-1">CO&#x2082;</p>
          <p className="text-[10px] font-mono text-slate-500">Carbon dioxide</p>
          <p className="text-[9px] font-mono text-slate-600">(from the air)</p>
        </div>
        <span className="text-xl text-slate-500 font-mono">+</span>
        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
          <p className="text-2xl mb-1">H&#x2082;O</p>
          <p className="text-[10px] font-mono text-slate-500">Water</p>
          <p className="text-[9px] font-mono text-slate-600">(from roots)</p>
        </div>
        <span className="text-xl text-slate-500 font-mono">+</span>
        <div className="rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-4 py-3">
          <p className="text-2xl mb-1">&#x2600;</p>
          <p className="text-[10px] font-mono text-slate-500">Sunlight</p>
          <p className="text-[9px] font-mono text-slate-600">(energy source)</p>
        </div>
        <div className="flex items-center mx-2">
          <svg width="40" height="16" viewBox="0 0 40 16" className="text-emerald-500/60">
            <line x1="0" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="2" />
            <polygon points="32,3 40,8 32,13" fill="currentColor" />
          </svg>
        </div>
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3">
          <p className="text-2xl mb-1">C&#x2086;H&#x2081;&#x2082;O&#x2086;</p>
          <p className="text-[10px] font-mono text-emerald-400">Sugar (glucose)</p>
          <p className="text-[9px] font-mono text-slate-600">(food/energy)</p>
        </div>
        <span className="text-xl text-slate-500 font-mono">+</span>
        <div className="rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3">
          <p className="text-2xl mb-1">O&#x2082;</p>
          <p className="text-[10px] font-mono text-slate-500">Oxygen</p>
          <p className="text-[9px] font-mono text-slate-600">(released)</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 font-body text-center mt-4 max-w-xl mx-auto">
        This single reaction sustains nearly all life on Earth. Plants capture light energy
        and store it as chemical energy in sugar molecules.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Plant Anatomy                                              */
/* ------------------------------------------------------------------ */

function PlantAnatomyDiagram() {
  const parts = [
    {
      name: "Flowers",
      role: "Reproduction. Attract pollinators. Produce seeds and fruit.",
      color: "#EC4899",
      icon: "&#x1F33A;",
    },
    {
      name: "Leaves",
      role: "Photosynthesis. Capture sunlight and CO\u2082. Exchange gases through stomata.",
      color: "#22C55E",
      icon: "&#x1F33F;",
    },
    {
      name: "Stems",
      role: "Transport. Carry water up (xylem) and sugars down (phloem). Provide structural support.",
      color: "#A3E635",
      icon: "&#x1F331;",
    },
    {
      name: "Roots",
      role: "Absorption. Take up water and minerals from soil. Anchor the plant. Some store food.",
      color: "#D97706",
      icon: "&#x1FAB4;",
    },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
        Parts of a Plant
      </p>
      <div className="space-y-0">
        {parts.map((part, i) => (
          <div key={part.name} className="flex items-start gap-4 relative">
            <div className="flex flex-col items-center shrink-0 w-8">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base border"
                style={{ borderColor: `${part.color}40`, backgroundColor: `${part.color}10` }}
                dangerouslySetInnerHTML={{ __html: part.icon }}
              />
              {i < parts.length - 1 && (
                <div className="w-px h-8" style={{ backgroundColor: `${part.color}20` }} />
              )}
            </div>
            <div className="pb-4">
              <p className="text-sm font-display font-semibold" style={{ color: part.color }}>
                {part.name}
              </p>
              <p className="text-xs text-slate-400 font-body">{part.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-400" />
          <span>Xylem (water up)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-10 h-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400" />
          <span>Phloem (sugars down)</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Central Dogma                                              */
/* ------------------------------------------------------------------ */

function CentralDogmaDiagram() {
  const steps = [
    {
      label: "DNA",
      desc: "The master blueprint stored safely in the nucleus. Two strands wound in a double helix.",
      color: "#3B82F6",
      detail: "...ATCGGCTAACGT...",
    },
    {
      label: "mRNA",
      desc: "A temporary copy of one gene. Carries the instructions from the nucleus to the ribosome.",
      color: "#8B5CF6",
      detail: "...AUCGGCUAACGU...",
      arrow: "Transcription",
    },
    {
      label: "Protein",
      desc: "The final product. A chain of amino acids that folds into a specific 3D shape to do a job.",
      color: "#10B981",
      detail: "...Ile-Gly-Asn-Val...",
      arrow: "Translation",
    },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-5">
        The Central Dogma of Molecular Biology
      </p>
      <div className="flex flex-col sm:flex-row items-stretch gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col sm:flex-row items-center gap-0 flex-1">
            {/* Arrow label */}
            {step.arrow && (
              <div className="flex flex-col sm:flex-col items-center justify-center sm:mx-2 my-2 sm:my-0">
                <span className="text-[9px] font-mono text-slate-500 whitespace-nowrap mb-1">
                  {step.arrow}
                </span>
                {/* Horizontal arrow (desktop) */}
                <svg width="32" height="12" viewBox="0 0 32 12" className="text-slate-600 hidden sm:block">
                  <line x1="0" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="24,2 32,6 24,10" fill="currentColor" />
                </svg>
                {/* Vertical arrow (mobile) */}
                <svg width="12" height="24" viewBox="0 0 12 24" className="text-slate-600 sm:hidden">
                  <line x1="6" y1="0" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <polygon points="2,16 6,24 10,16" fill="currentColor" />
                </svg>
              </div>
            )}
            {/* Box */}
            <div
              className="rounded-xl border p-4 flex-1 w-full"
              style={{ borderColor: `${step.color}30`, backgroundColor: `${step.color}06` }}
            >
              <p className="text-sm font-display font-bold mb-1" style={{ color: step.color }}>
                {step.label}
              </p>
              <p className="text-[11px] text-slate-400 font-body leading-relaxed mb-2">
                {step.desc}
              </p>
              <p
                className="text-[10px] font-mono px-2 py-1 rounded inline-block"
                style={{ backgroundColor: `${step.color}10`, color: `${step.color}CC` }}
              >
                {step.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 font-body text-center mt-4 max-w-lg mx-auto">
        This is the fundamental flow of genetic information in all living things:
        DNA is copied to RNA, and RNA is read to build proteins.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Enzyme Analogy                                             */
/* ------------------------------------------------------------------ */

function EnzymeDiagram() {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
        How Enzymes Work — Lock and Key
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        {/* Substrate */}
        <div className="text-center">
          <div className="w-16 h-16 rounded-lg border-2 border-dashed border-amber-500/40 bg-amber-500/5 flex items-center justify-center mx-auto mb-2">
            <span className="text-xs font-mono text-amber-400">A</span>
          </div>
          <p className="text-xs font-mono text-slate-500">Substrate</p>
          <p className="text-[10px] text-slate-600">(starting molecule)</p>
        </div>

        <span className="text-xl text-slate-500 font-mono">+</span>

        {/* Enzyme */}
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-mono text-emerald-400">Enzyme</span>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-4 border-2 border-b-0 border-emerald-500/30 bg-[#0A0F1E] rounded-t-lg" />
          </div>
          <p className="text-xs font-mono text-slate-500 mt-2">Active Site</p>
          <p className="text-[10px] text-slate-600">(fits substrate exactly)</p>
        </div>

        {/* Arrow */}
        <div className="flex items-center">
          <svg width="40" height="16" viewBox="0 0 40 16" className="text-emerald-500/60">
            <line x1="0" y1="8" x2="34" y2="8" stroke="currentColor" strokeWidth="2" />
            <polygon points="32,3 40,8 32,13" fill="currentColor" />
          </svg>
        </div>

        {/* Product */}
        <div className="text-center">
          <div className="flex gap-1 mx-auto mb-2 justify-center">
            <div className="w-10 h-10 rounded-lg border-2 border-sky-500/40 bg-sky-500/5 flex items-center justify-center">
              <span className="text-xs font-mono text-sky-400">B</span>
            </div>
            <div className="w-10 h-10 rounded-lg border-2 border-rose-500/40 bg-rose-500/5 flex items-center justify-center">
              <span className="text-xs font-mono text-rose-400">C</span>
            </div>
          </div>
          <p className="text-xs font-mono text-slate-500">Products</p>
          <p className="text-[10px] text-slate-600">(new molecules)</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 font-body text-center mt-5 max-w-md mx-auto">
        Each enzyme has a uniquely shaped active site that fits only its specific substrate &mdash;
        like a lock and key. The enzyme speeds up the reaction without being consumed.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Primary vs Secondary Metabolism                            */
/* ------------------------------------------------------------------ */

function MetabolismComparison() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <h4 className="text-sm font-display font-semibold text-emerald-400">
            Primary Metabolism
          </h4>
        </div>
        <p className="text-sm text-slate-400 font-body leading-relaxed mb-3">
          The essential chemistry of life. Every plant needs these processes to survive.
        </p>
        <div className="space-y-1.5 text-xs font-body text-slate-400">
          <p><span className="text-emerald-400/70 font-mono mr-2">&bull;</span> Photosynthesis &mdash; converting light to sugar</p>
          <p><span className="text-emerald-400/70 font-mono mr-2">&bull;</span> Respiration &mdash; burning sugar for energy</p>
          <p><span className="text-emerald-400/70 font-mono mr-2">&bull;</span> Amino acids &mdash; building blocks for proteins</p>
          <p><span className="text-emerald-400/70 font-mono mr-2">&bull;</span> Nucleic acids &mdash; DNA and RNA</p>
          <p><span className="text-emerald-400/70 font-mono mr-2">&bull;</span> Lipids &mdash; cell membranes and energy storage</p>
        </div>
        <div className="mt-3 text-[10px] font-mono text-emerald-500/50 border-t border-emerald-500/10 pt-2">
          Universal to all plants. Absolutely essential.
        </div>
      </div>
      <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-violet-500" />
          <h4 className="text-sm font-display font-semibold text-violet-400">
            Secondary Metabolism
          </h4>
        </div>
        <p className="text-sm text-slate-400 font-body leading-relaxed mb-3">
          Specialized chemistry. Not required for basic survival, but crucial for thriving in the wild.
        </p>
        <div className="space-y-1.5 text-xs font-body text-slate-400">
          <p><span className="text-violet-400/70 font-mono mr-2">&bull;</span> Alkaloids &mdash; toxins that poison herbivores</p>
          <p><span className="text-violet-400/70 font-mono mr-2">&bull;</span> Terpenoids &mdash; scents that attract or repel</p>
          <p><span className="text-violet-400/70 font-mono mr-2">&bull;</span> Flavonoids &mdash; pigments and UV shields</p>
          <p><span className="text-violet-400/70 font-mono mr-2">&bull;</span> Phytoalexins &mdash; antimicrobial compounds</p>
          <p><span className="text-violet-400/70 font-mono mr-2">&bull;</span> Volatile oils &mdash; signals to other organisms</p>
        </div>
        <div className="mt-3 text-[10px] font-mono text-violet-500/50 border-t border-violet-500/10 pt-2">
          Species-specific. The source of most drugs and flavors.
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual: Base Pair Diagram                                          */
/* ------------------------------------------------------------------ */

function BasePairDiagram() {
  const pairs: [string, string, string, string][] = [
    ["A", "T", "#EF4444", "#3B82F6"],
    ["T", "A", "#3B82F6", "#EF4444"],
    ["G", "C", "#FACC15", "#10B981"],
    ["C", "G", "#10B981", "#FACC15"],
    ["A", "T", "#EF4444", "#3B82F6"],
    ["G", "C", "#FACC15", "#10B981"],
    ["T", "A", "#3B82F6", "#EF4444"],
    ["C", "G", "#10B981", "#FACC15"],
    ["G", "C", "#FACC15", "#10B981"],
    ["A", "T", "#EF4444", "#3B82F6"],
    ["T", "A", "#3B82F6", "#EF4444"],
    ["G", "C", "#FACC15", "#10B981"],
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
        DNA Base Pairing Rules
      </p>

      <div className="flex items-center justify-center mb-4">
        <div className="flex flex-col items-center">
          <p className="text-[9px] font-mono text-slate-500 mb-2">5&apos; &rarr; 3&apos; strand</p>
          <div className="flex gap-0.5">
            {pairs.map(([b1, , c1], i) => (
              <div key={`t-${i}`} className="flex flex-col items-center">
                <span className="text-sm font-mono font-bold w-5 text-center" style={{ color: c1 }}>
                  {b1}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-0.5 my-1">
            {pairs.map((_, i) => (
              <span key={`h-${i}`} className="text-[8px] text-slate-600 w-5 text-center">
                {i % 3 === 0 ? "|||" : i % 3 === 1 ? "||" : "|||"}
              </span>
            ))}
          </div>
          <div className="flex gap-0.5">
            {pairs.map(([, b2, , c2], i) => (
              <div key={`b-${i}`} className="flex flex-col items-center">
                <span className="text-sm font-mono font-bold w-5 text-center" style={{ color: c2 }}>
                  {b2}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[9px] font-mono text-slate-500 mt-2">3&apos; &rarr; 5&apos; strand</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: "#EF4444" }}>A</span>
          <span className="text-slate-600">pairs with</span>
          <span className="font-bold" style={{ color: "#3B82F6" }}>T</span>
          <span className="text-slate-600">(2 hydrogen bonds)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: "#FACC15" }}>G</span>
          <span className="text-slate-600">pairs with</span>
          <span className="font-bold" style={{ color: "#10B981" }}>C</span>
          <span className="text-slate-600">(3 hydrogen bonds)</span>
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
      <div className="pb-8">
        <h4 className="text-sm font-display font-semibold text-slate-200 mb-1">{title}</h4>
        <p className="text-sm text-slate-400 font-body leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DNA Visualization                                                  */
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
        <p><span className="text-slate-500 font-mono">Mechanism:</span> {mechanism}</p>
        <p><span className="text-slate-500 font-mono">Result:</span> {result}</p>
        <p><span className="text-slate-500 font-mono">Example:</span> {example}</p>
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
              <div className="flex flex-col items-center mx-1">
                <span className="text-[9px] font-mono text-emerald-400/70 whitespace-nowrap">
                  {step.enzyme}
                </span>
                <svg width="24" height="10" viewBox="0 0 24 10" className="text-slate-600">
                  <line x1="0" y1="5" x2="20" y2="5" stroke="currentColor" strokeWidth="1" />
                  <polygon points="18,2 24,5 18,8" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hierarchy Diagram: Base Pairs -> Gene -> Chromosome -> Genome      */
/* ------------------------------------------------------------------ */

function HierarchyDiagram() {
  const levels = [
    { label: "Base Pairs", desc: "A, T, G, C nucleotides encode genetic information", color: "#EF4444", size: "text-[10px]", visual: "...ATCGGCTAACGT..." },
    { label: "Gene", desc: "A sequence of ~1,000-100,000 bp encoding one protein (enzyme)", color: "#FACC15", size: "text-xs", visual: "PAL gene (2,100 bp)" },
    { label: "Chromosome", desc: "Millions of base pairs organized into a single DNA molecule", color: "#3B82F6", size: "text-sm", visual: "Chromosome 2 (43 Mb)" },
    { label: "Genome", desc: "The complete set of chromosomes in an organism", color: "#10B981", size: "text-base", visual: "A. thaliana (135 Mb, 5 chromosomes)" },
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
              <div className="flex flex-col items-center shrink-0 w-8">
                <div
                  className="w-4 h-4 rounded-sm flex items-center justify-center"
                  style={{ backgroundColor: `${level.color}20`, border: `1px solid ${level.color}40` }}
                >
                  <span className="text-[8px] font-mono font-bold" style={{ color: level.color }}>{i + 1}</span>
                </div>
                {i < levels.length - 1 && (
                  <div className="w-px h-6" style={{ backgroundColor: `${level.color}20` }} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <h4 className={`font-display font-bold ${level.size}`} style={{ color: level.color }}>{level.label}</h4>
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
/*  Connection Diagram                                                 */
/* ------------------------------------------------------------------ */

function ConnectionDiagram() {
  const nodes = [
    { label: "Genome", sublabel: `${genomes.length} species`, color: "#10B981", href: "/genomes" },
    { label: "Genes", sublabel: "79+ enzymes", color: "#3B82F6", href: "/genomes" },
    { label: "Pathways", sublabel: `${pathways.length} routes`, color: "#EC4899", href: "/pathways" },
    { label: "Molecules", sublabel: `${molecules.length} compounds`, color: "#F97316", href: "/molecules" },
  ];

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center gap-0">
            <Link
              href={node.href}
              className="rounded-xl border px-5 py-3 text-center transition-all hover:scale-105 group"
              style={{ borderColor: `${node.color}30`, backgroundColor: `${node.color}08` }}
            >
              <p className="text-sm font-display font-bold group-hover:underline" style={{ color: node.color }}>{node.label}</p>
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
/*  Table of Contents                                                  */
/* ------------------------------------------------------------------ */

function TableOfContents() {
  const sections = [
    { id: "plants", label: "What is a Plant?" },
    { id: "cells", label: "Plant Cells" },
    { id: "dna", label: "DNA & Genes" },
    { id: "enzymes", label: "Proteins & Enzymes" },
    { id: "metabolism", label: "Primary vs Secondary" },
    { id: "metabolites", label: "Secondary Metabolites" },
    { id: "pathways", label: "Biosynthetic Pathways" },
    { id: "genomes", label: "Genomes" },
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
            Start Here &mdash; No Prior Knowledge Required
          </p>
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl lg:text-6xl max-w-4xl">
            Understanding Plants, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              DNA, and Gene Editing
            </span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            This guide will take you from the very basics &mdash; what a plant is, how it grows,
            what DNA does &mdash; all the way to how scientists use CRISPR to precisely edit
            crop genomes for better food, medicine, and sustainability. No biology background needed.
          </p>
        </div>

        <div className="flex gap-12">
          <TableOfContents />

          <div className="flex-1 min-w-0 space-y-24">

            {/* ============================================= */}
            {/* SECTION 1: What is a Plant?                     */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={1}
                id="plants"
                title="What is a Plant?"
                subtitle="Plants are living organisms that make their own food from sunlight, water, and carbon dioxide. They are the foundation of nearly all life on Earth — providing oxygen, food, medicine, and materials for everything from clothing to construction."
              />

              <div className="space-y-6">
                <PlantAnatomyDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Plants are chemical factories" accentColor="#22C55E">
                    <p>
                      Every plant is a miniature chemical factory. Using just sunlight, water,
                      and carbon dioxide, plants synthesize thousands of different molecules &mdash;
                      from the sugar that fuels their growth to the caffeine in your morning
                      coffee and the aspirin in your medicine cabinet.
                    </p>
                  </InfoCard>
                  <InfoCard title="Plants can't run away" accentColor="#EF4444">
                    <p>
                      Unlike animals, plants are rooted in place. They can&apos;t flee from
                      insects, hide from the sun, or migrate to find water. Instead, they evolved
                      an incredible arsenal of chemical compounds to defend themselves, attract
                      helpers, and survive extreme conditions.
                    </p>
                  </InfoCard>
                </div>

                <Callout color="#F59E0B" label="Did you know?">
                  There are approximately 380,000 known plant species on Earth. They produce
                  over 200,000 different chemical compounds &mdash; and we&apos;ve only begun
                  to understand what most of them do.
                </Callout>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 2: Plant Cells                          */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={2}
                id="cells"
                title="Inside a Plant Cell"
                subtitle="Every plant is made of tiny building blocks called cells. A single leaf contains millions of cells, each one a self-contained unit with its own set of instructions (DNA), its own energy production (mitochondria), and its own food factory (chloroplasts)."
              />

              <div className="space-y-6">
                <PlantCellDiagram />

                <PhotosynthesisEquation />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="The nucleus is the brain" accentColor="#3B82F6">
                    <p>
                      The nucleus contains the plant&apos;s entire genome &mdash; all of its
                      DNA. These instructions tell the cell which proteins to build, when to
                      divide, and how to respond to the environment. When we edit genes with
                      CRISPR, this is where the changes happen.
                    </p>
                  </InfoCard>
                  <InfoCard title="Chloroplasts are unique to plants" accentColor="#22C55E">
                    <p>
                      Animal cells don&apos;t have chloroplasts. These organelles contain
                      chlorophyll &mdash; the green pigment that captures light energy.
                      Chloroplasts were once free-living bacteria that were engulfed by
                      an ancient cell over a billion years ago (endosymbiosis).
                    </p>
                  </InfoCard>
                  <InfoCard title="Vacuoles store chemistry" accentColor="#8B5CF6">
                    <p>
                      Plant vacuoles can occupy up to 90% of a cell&apos;s volume. They store
                      water, nutrients, and many secondary metabolites &mdash; including the
                      anthocyanin pigments that make flowers red, purple, and blue.
                    </p>
                  </InfoCard>
                </div>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 3: DNA & Genes                          */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={3}
                id="dna"
                title="DNA &mdash; The Blueprint of Life"
                subtitle="Inside every cell nucleus is a long, twisted molecule called DNA (deoxyribonucleic acid). DNA contains all the instructions needed to build and operate the organism — like a recipe book with thousands of recipes."
              />

              <div className="space-y-6">
                <InfoCard title="DNA is a code written in four letters" accentColor="#3B82F6">
                  <p>
                    DNA is made of just four chemical &quot;bases&quot; &mdash; <strong className="text-red-400">Adenine (A)</strong>,{" "}
                    <strong className="text-blue-400">Thymine (T)</strong>,{" "}
                    <strong className="text-yellow-400">Guanine (G)</strong>, and{" "}
                    <strong className="text-emerald-400">Cytosine (C)</strong>. These four letters
                    spell out every instruction the cell needs, like an alphabet with only 4 characters
                    that can write an entire encyclopedia.
                  </p>
                </InfoCard>

                <BasePairDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="The double helix" accentColor="#8B5CF6">
                    <p>
                      DNA consists of two strands wound around each other in a spiral called a
                      <strong className="text-slate-300"> double helix</strong> &mdash; discovered
                      by Watson and Crick in 1953. The bases on one strand always pair with specific
                      bases on the other: A pairs with T, and G pairs with C. This
                      &quot;complementary base pairing&quot; is what allows DNA to be copied faithfully.
                    </p>
                  </InfoCard>
                  <InfoCard title="What is a gene?" accentColor="#FACC15">
                    <p>
                      A <strong className="text-slate-300">gene</strong> is a specific section of
                      DNA that contains the instructions for building one protein. Humans have about
                      20,000 genes; Arabidopsis (a small plant) has about 27,000. Genes typically
                      range from 1,000 to 100,000 base pairs long.
                    </p>
                  </InfoCard>
                </div>

                <CentralDogmaDiagram />

                <Callout color="#3B82F6" label="Key concept">
                  The &quot;Central Dogma&quot; is the most important idea in molecular biology:
                  DNA is transcribed into mRNA, and mRNA is translated into protein. When we talk about
                  &quot;editing a gene,&quot; we mean changing the DNA sequence &mdash; which changes
                  the mRNA &mdash; which changes the protein the cell produces.
                </Callout>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 4: Proteins & Enzymes                   */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={4}
                id="enzymes"
                title="Proteins and Enzymes"
                subtitle="Genes are just instructions — it's proteins that do all the actual work in a cell. Proteins build structures, send signals, defend against invaders, and catalyze chemical reactions. A special class of proteins called enzymes are the molecular machines that build every molecule a plant produces."
              />

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="What is a protein?" accentColor="#10B981">
                    <p>
                      A protein is a chain of smaller building blocks called <strong className="text-slate-300">amino acids</strong>,
                      linked together in a specific order determined by a gene. There are 20
                      different amino acids. The order of amino acids determines how the chain
                      folds into a unique 3D shape &mdash; and the shape determines what the
                      protein does.
                    </p>
                  </InfoCard>
                  <InfoCard title="What is an enzyme?" accentColor="#F59E0B">
                    <p>
                      An <strong className="text-slate-300">enzyme</strong> is a protein that
                      speeds up a specific chemical reaction. Without enzymes, the reactions that
                      sustain life would take thousands of years. With enzymes, they happen in
                      milliseconds. Each enzyme does exactly one job &mdash; like a specialized
                      tool in a factory.
                    </p>
                  </InfoCard>
                </div>

                <EnzymeDiagram />

                <InfoCard title="One gene, one enzyme, one reaction" accentColor="#EC4899">
                  <p>
                    This is the key connection that makes gene editing so powerful:
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      PAL gene
                    </span>
                    <span className="text-slate-600">&rarr;</span>
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      PAL enzyme
                    </span>
                    <span className="text-slate-600">&rarr;</span>
                    <span className="px-2 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      Converts phenylalanine to cinnamic acid
                    </span>
                  </div>
                  <p className="mt-2">
                    If you change the PAL gene, you change the PAL enzyme, which changes
                    how much cinnamic acid (and all downstream products like flavonoids) the
                    plant produces. This is exactly what CRISPR allows us to do.
                  </p>
                </InfoCard>

                <Callout color="#10B981" label="Think of it this way">
                  DNA is the recipe book. Genes are individual recipes. Enzymes are the
                  chefs that follow the recipes. And molecules are the dishes they produce.
                  CRISPR lets you rewrite specific recipes to change the dishes.
                </Callout>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 5: Primary vs Secondary Metabolism      */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={5}
                id="metabolism"
                title="Two Kinds of Chemistry"
                subtitle="Plants run two types of chemical programs. Primary metabolism handles the basics: growth, energy, reproduction. Secondary metabolism produces the specialized compounds that help plants survive in the real world — and that humans use as drugs, flavors, fragrances, and dyes."
              />

              <div className="space-y-6">
                <MetabolismComparison />

                <InfoCard title="Why 'secondary' doesn't mean 'unimportant'" accentColor="#8B5CF6">
                  <p>
                    The term &quot;secondary metabolite&quot; is a historical misnomer. Scientists
                    originally thought these compounds were waste products because plants could
                    grow without them in the lab. But in nature, secondary metabolites are
                    <strong className="text-slate-300"> essential for survival</strong>: without
                    caffeine, coffee plants would be devoured by insects; without anthocyanins,
                    flowers couldn&apos;t attract pollinators; without phytoalexins, crops would
                    succumb to fungal diseases.
                  </p>
                </InfoCard>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InfoCard title="Medicine" accentColor="#EF4444" icon={<span>Rx</span>}>
                    <p>
                      Over 50% of all approved drugs come from or were inspired by plant
                      compounds. Aspirin (willow bark), morphine (opium poppy), taxol (yew tree),
                      artemisinin (wormwood).
                    </p>
                  </InfoCard>
                  <InfoCard title="Agriculture" accentColor="#22C55E" icon={<span>Ag</span>}>
                    <p>
                      Crop plants have been bred for millennia to increase desirable metabolites
                      (lycopene in tomatoes, beta-carotene in carrots) or decrease toxic ones
                      (glycoalkaloids in potatoes).
                    </p>
                  </InfoCard>
                  <InfoCard title="Industry" accentColor="#3B82F6" icon={<span>In</span>}>
                    <p>
                      Plant metabolites drive billion-dollar industries: natural rubber, essential
                      oils, dyes, flavors (vanilla, menthol), and increasingly biofuels and
                      bio-based materials.
                    </p>
                  </InfoCard>
                </div>

                <Callout color="#8B5CF6" label="This is where PlantMol begins">
                  Everything from here forward on this site is about secondary metabolites:
                  how plants make them (pathways), where the instructions are stored (genomes),
                  and how we can modify the instructions (CRISPR).
                </Callout>
              </div>
            </section>

            {/* ============================================= */}
            {/* SECTION 6: Secondary Metabolites               */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={6}
                id="metabolites"
                title="Plant Secondary Metabolites"
                subtitle="Now that you understand how plants work at the cellular level, let's look at the three major families of secondary metabolites — each with its own biosynthetic origin and ecological role."
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <InfoCard title="Alkaloids" accentColor="#8B5CF6" icon={<span>N</span>}>
                  <p>
                    Nitrogen-containing compounds derived from amino acids. Often bitter-tasting
                    and toxic to herbivores. Many have powerful effects on the human nervous system.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: caffeine, morphine, nicotine, vinblastine, quinine
                  </p>
                </InfoCard>
                <InfoCard title="Terpenoids" accentColor="#10B981" icon={<span>C5</span>}>
                  <p>
                    Built from 5-carbon isoprene units. The largest class of plant natural products
                    with over 80,000 known structures. Includes essential oils, pigments, and hormones.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: menthol, artemisinin, taxol, limonene, cannabidiol
                  </p>
                </InfoCard>
                <InfoCard title="Phenylpropanoids" accentColor="#EC4899" icon={<span>Ph</span>}>
                  <p>
                    Derived from phenylalanine via the phenylpropanoid pathway. Includes flavonoids,
                    stilbenes, lignin, and the anthocyanin pigments that color flowers and fruit.
                  </p>
                  <p className="text-xs text-slate-500">
                    Examples: resveratrol, quercetin, curcumin, EGCG, cyanidin
                  </p>
                </InfoCard>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Why do plants make these?" accentColor="#F59E0B">
                  <p>
                    Defense! Caffeine poisons insect neurons, capsaicin burns mammalian mouths
                    (but not birds, which disperse seeds), and resveratrol kills fungal pathogens.
                    Other metabolites attract pollinators, protect against UV, or signal to
                    neighboring plants.
                  </p>
                </InfoCard>
                <InfoCard title="Why do we care?" accentColor="#06B6D4">
                  <p>
                    Artemisinin treats malaria (Nobel Prize 2015), taxol fights cancer, morphine
                    manages pain, and caffeine keeps us awake. Understanding how plants make these
                    molecules lets us engineer crops to produce more &mdash; or create entirely
                    new compounds.
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
            {/* SECTION 7: Biosynthetic Pathways               */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={7}
                id="pathways"
                title="Biosynthetic Pathways"
                subtitle="Remember enzymes — the specialized molecular machines? Secondary metabolites aren't made by a single enzyme. They're assembled by entire teams of enzymes working in sequence, like an assembly line in a factory. These assembly lines are called biosynthetic pathways."
              />

              <div className="space-y-6 mb-8">
                <InfoCard title="How a pathway works" accentColor="#EC4899">
                  <p>
                    Each enzyme in the pathway takes a molecule, makes a small chemical change,
                    and passes the result to the next enzyme. The starting molecule (substrate)
                    is transformed step by step into the final product.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-mono">
                    <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">Gene</span>
                    <span className="text-slate-600">&rarr;</span>
                    <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Enzyme</span>
                    <span className="text-slate-600">&rarr;</span>
                    <span className="px-2 py-1 rounded bg-pink-500/10 text-pink-400 border border-pink-500/20">Reaction</span>
                    <span className="text-slate-600">&rarr;</span>
                    <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">Product</span>
                  </div>
                </InfoCard>

                <PathwayFlowDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Branch points create diversity" accentColor="#FACC15">
                    <p>
                      Pathways aren&apos;t always linear. At branch points, one intermediate
                      can be routed to different end products by different enzymes. This is how
                      a single pathway can produce both red anthocyanins and tough lignin wood.
                    </p>
                  </InfoCard>
                  <InfoCard title="Pathways connect to each other" accentColor="#7C3AED">
                    <p>
                      The shikimate pathway feeds amino acids to phenylpropanoid and alkaloid
                      pathways. The MEP pathway provides terpenoid building blocks for everything
                      from menthol to chlorophyll. Understanding this network is key to
                      metabolic engineering.
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
            {/* SECTION 8: Genomes                             */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={8}
                id="genomes"
                title="From Genes to Genomes"
                subtitle="Every enzyme in a biosynthetic pathway is encoded by a gene — a stretch of DNA on a chromosome. A genome is the complete collection of all chromosomes in an organism. Understanding genomes tells us where to look when we want to find and edit specific genes."
              />

              <div className="space-y-6 mb-8">
                <HierarchyDiagram />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoCard title="Gene clusters" accentColor="#3B82F6">
                    <p>
                      Biosynthetic genes sometimes cluster together on the same chromosome.
                      These <strong className="text-slate-300">Biosynthetic Gene Clusters (BGCs)</strong>{" "}
                      allow coordinated regulation &mdash; when one gene turns on, its neighbors do too.
                    </p>
                  </InfoCard>
                  <InfoCard title="Polyploidy complicates editing" accentColor="#F97316">
                    <p>
                      Many crops have multiple copies of each chromosome. Wheat has 6 copies
                      (hexaploid), sugarcane has 8-12. CRISPR must edit <em>all</em> copies
                      simultaneously for a full effect &mdash; making some crops much harder
                      to engineer.
                    </p>
                  </InfoCard>
                </div>

                {/* Genome size comparison */}
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
                            style={{ width: `${(g.size / 17000) * 100}%`, backgroundColor: g.color, minWidth: "4px" }}
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
            {/* SECTION 9: How CRISPR Works                    */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={9}
                id="crispr"
                title="How CRISPR Gene Editing Works"
                subtitle="Now you understand: genes encode enzymes, enzymes run pathways, pathways produce molecules. So if you could change a gene, you could change what a plant produces. That's exactly what CRISPR lets us do — with surgical precision."
              />

              {/* Origin story */}
              <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 mb-8">
                <h3 className="text-sm font-display font-semibold text-slate-200 mb-3">
                  A bacterial immune system, repurposed
                </h3>
                <p className="text-sm text-slate-400 font-body leading-relaxed mb-4">
                  Bacteria use CRISPR as an immune system against viruses. When a virus attacks,
                  the bacterium stores a snippet of the viral DNA. If the same virus returns, the
                  bacterium creates a guide RNA from that snippet and uses the Cas9 protein to
                  find and destroy the matching viral DNA.
                </p>
                <p className="text-sm text-slate-400 font-body leading-relaxed">
                  In 2012, Jennifer Doudna and Emmanuelle Charpentier showed this system could be
                  reprogrammed: by designing a custom guide RNA, scientists can direct Cas9 to cut
                  <em> any</em> DNA sequence in <em>any</em> organism. This earned them the 2020
                  Nobel Prize in Chemistry.
                </p>
              </div>

              {/* Simple analogy */}
              <Callout color="#10B981" label="Simple analogy">
                Think of CRISPR as a &quot;Find and Replace&quot; tool for DNA. The guide RNA
                is the &quot;Find&quot; term &mdash; it searches through billions of base pairs
                to locate one specific 20-letter sequence. Cas9 is the &quot;cursor&quot; that
                makes the cut at that exact spot. Then the cell&apos;s own repair machinery
                handles the &quot;Replace.&quot;
              </Callout>

              {/* Step-by-step */}
              <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6 mb-8 mt-8">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-6">
                  The CRISPR-Cas9 Mechanism — Step by Step
                </p>
                <CrisprStep
                  step={1}
                  title="Design the Guide RNA"
                  description="Scientists design a short RNA sequence (20 letters) that matches the gene they want to edit. This guide RNA will lead Cas9 to the exact right spot in the genome. The target must be next to a 'PAM' sequence (NGG) — a short marker that Cas9 needs to land on the DNA."
                  color="#10B981"
                />
                <CrisprStep
                  step={2}
                  title="Cas9 + Guide RNA pair up"
                  description="The Cas9 protein loads the guide RNA to form a search-and-cut complex. This molecular machine then scans along the DNA, checking every PAM site for a match to the guide RNA. It's like a spell-checker scanning through a book looking for one specific word."
                  color="#3B82F6"
                />
                <CrisprStep
                  step={3}
                  title="Target found — DNA unwinds"
                  description="When the guide RNA finds its matching 20-letter sequence, it base-pairs with the DNA strand, unzipping the double helix at that location. Cas9 locks on and undergoes a shape change, activating its two cutting domains."
                  color="#8B5CF6"
                />
                <CrisprStep
                  step={4}
                  title="Cas9 cuts both DNA strands"
                  description="Cas9 snips both strands of the DNA double helix, creating a 'double-strand break' (DSB). This is a serious event for the cell — a broken chromosome that must be repaired immediately."
                  color="#EF4444"
                />
                <CrisprStep
                  step={5}
                  title="The cell repairs the break"
                  description="The cell has two main repair options: NHEJ (fast but sloppy — often disables the gene) and HDR (slow but precise — can insert a new sequence). Which repair path the cell uses determines what kind of edit results."
                  color="#F59E0B"
                  isLast
                />
              </div>

              {/* DNA visualization */}
              <div className="rounded-xl border border-[#1E293B] bg-[#0A0F1E] p-6 mb-8">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-4">
                  Guide RNA Finds its Target
                </p>
                <div className="flex flex-col gap-4">
                  <DnaSnippet
                    sequence="ATCGATCGGCTAACGTCCAG"
                    highlight={[4, 16]}
                    label="Genomic DNA (target strand)"
                    color="#10B981"
                  />
                  <div className="ml-4">
                    <p className="text-[10px] font-mono text-slate-600 mb-1">
                      <span className="text-emerald-400/50">&darr;</span> Guide RNA binds to complementary sequence
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
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-2">
                  Three Types of CRISPR Edits
                </h3>
                <p className="text-sm text-slate-400 font-body mb-4">
                  What happens after Cas9 cuts depends on what repair template (if any) is provided:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SdnCard
                    type="SDN-1"
                    title="Gene Knockout"
                    mechanism="Cas9 cuts. Cell repairs sloppily (NHEJ), scrambling the gene so it no longer works."
                    result="Gene disabled. No foreign DNA added. Like erasing a word from the recipe."
                    example="Disabling MLO in wheat to block powdery mildew infection."
                    color="#10B981"
                    regulation="Least regulated — many countries treat this like a natural mutation"
                  />
                  <SdnCard
                    type="SDN-2"
                    title="Precise Letter Change"
                    mechanism="Cas9 cuts. A short DNA template is provided. Cell copies the template precisely (HDR), changing specific letters."
                    result="One or a few DNA letters changed. Like correcting a typo in the recipe."
                    example="Changing one amino acid in ALS to make crops herbicide-tolerant."
                    color="#3B82F6"
                    regulation="Moderately regulated — varies by country"
                  />
                  <SdnCard
                    type="SDN-3"
                    title="Gene Insertion"
                    mechanism="Cas9 cuts. A large DNA template with a whole new gene is provided. Cell inserts it at the cut site."
                    result="New gene added. Like pasting a whole new recipe into the book."
                    example="Inserting PSY + CRTI into rice for Golden Rice (vitamin A)."
                    color="#F59E0B"
                    regulation="Most regulated — classified as GMO in most countries"
                  />
                </div>
              </div>

              {/* Modern tools */}
              <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 mb-8">
                <h3 className="text-sm font-display font-semibold text-slate-200 mb-4">
                  Beyond Cas9: Newer, Gentler Tools
                </h3>
                <p className="text-sm text-slate-400 font-body mb-4">
                  Scientists have developed tools that can edit DNA without cutting both strands &mdash; reducing unwanted side effects:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { tool: "Base Editors", desc: "Change a single DNA letter (C to T, or A to G) without cutting the DNA at all. Like using a pencil eraser on one letter.", color: "#06B6D4" },
                    { tool: "Prime Editing", desc: "A 'search and replace' that can make any small edit — insertions, deletions, or swaps — without double-strand breaks.", color: "#8B5CF6" },
                    { tool: "CRISPRi / CRISPRa", desc: "Turn genes down (interference) or up (activation) without changing the DNA sequence at all. Fully reversible.", color: "#EC4899" },
                    { tool: "Cas12a", desc: "An alternative to Cas9 that can process multiple guide RNAs at once — editing several genes simultaneously.", color: "#F97316" },
                  ].map((t) => (
                    <div
                      key={t.tool}
                      className="rounded-lg border px-4 py-3"
                      style={{ borderColor: `${t.color}20`, backgroundColor: `${t.color}05` }}
                    >
                      <p className="text-xs font-mono font-bold mb-1" style={{ color: t.color }}>{t.tool}</p>
                      <p className="text-xs text-slate-400 font-body leading-relaxed">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real applications */}
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                Real-World CRISPR Crop Applications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard title="Disease Resistance" accentColor="#EF4444">
                  <p>
                    Knocking out <strong className="text-slate-300">MLO</strong> genes in wheat
                    creates broad-spectrum powdery mildew resistance. All three copies must be
                    edited simultaneously in this hexaploid crop.
                  </p>
                </InfoCard>
                <InfoCard title="Better Nutrition" accentColor="#F97316">
                  <p>
                    Golden Rice produces <strong className="text-slate-300">beta-carotene</strong>{" "}
                    (vitamin A) in rice endosperm, addressing deficiency that causes blindness
                    in 250,000 children annually.
                  </p>
                </InfoCard>
                <InfoCard title="Higher Yields" accentColor="#10B981">
                  <p>
                    Editing <strong className="text-slate-300">GW2</strong> in rice increases
                    grain size 10-15%. Orthologous edits in wheat and maize show similar gains.
                  </p>
                </InfoCard>
                <InfoCard title="Climate Adaptation" accentColor="#3B82F6">
                  <p>
                    Activating <strong className="text-slate-300">DREB/CBF</strong> transcription
                    factors enhances drought and cold tolerance. SUB1A editing gives rice flood
                    survival.
                  </p>
                </InfoCard>
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
            {/* SECTION 10: Putting It All Together             */}
            {/* ============================================= */}
            <section>
              <SectionHeading
                number={10}
                id="together"
                title="Putting It All Together"
                subtitle="You've now traveled from the basics of plant biology all the way to genome engineering. Here's how every concept connects — and how PlantMol lets you explore these connections."
              />

              <ConnectionDiagram />

              <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
                <h3 className="text-sm font-display font-semibold text-emerald-400 mb-3">
                  The Complete Pipeline
                </h3>
                <div className="space-y-3 text-sm text-slate-400 font-body leading-relaxed">
                  <p>
                    <strong className="text-slate-300">1. Start with a molecule</strong> &mdash;
                    Browse {moleculeCount} secondary metabolites. Want to increase lycopene in tomatoes
                    for better nutrition? Or boost artemisinin in wormwood for malaria treatment?
                  </p>
                  <p>
                    <strong className="text-slate-300">2. Trace the pathway</strong> &mdash;
                    Follow the biosynthetic pathway to find the rate-limiting enzyme. Which gene
                    controls production? Where are the branch points?
                  </p>
                  <p>
                    <strong className="text-slate-300">3. Find the gene in the genome</strong> &mdash;
                    Locate the target gene on its chromosome. Check for duplicate copies in
                    polyploid crops. Identify regulatory elements.
                  </p>
                  <p>
                    <strong className="text-slate-300">4. Design the CRISPR edit</strong> &mdash;
                    Use the Genome Architect to choose the editing tool, design guide RNAs,
                    assess off-target risks, and navigate regulations.
                  </p>
                  <p>
                    <strong className="text-slate-300">5. Predict the outcome</strong> &mdash;
                    Model phenotypic effects, check gene interactions, and assess pathway
                    flux changes — all before going to the lab.
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <p className="text-sm text-slate-500 font-body mb-6">
                  Ready to explore?
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link href="/molecules" className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all">
                    Browse Molecules
                  </Link>
                  <Link href="/pathways" className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all">
                    Explore Pathways
                  </Link>
                  <Link href="/genomes" className="rounded-lg bg-[#111827] border border-[#1E293B] px-5 py-2.5 text-sm font-display font-semibold text-slate-300 hover:text-white hover:border-[#334155] transition-all">
                    View Genomes
                  </Link>
                  <Link href="/architect" className="rounded-lg bg-emerald-600 border border-emerald-500 px-5 py-2.5 text-sm font-display font-semibold text-white hover:bg-emerald-500 transition-all">
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
