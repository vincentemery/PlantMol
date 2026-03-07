"use client";

import type {
  EpistaticInteraction,
  TissueExpression,
  DeliveryStrategy,
  RegulatoryClassification,
  StackingPlan,
  WildRelativeInfo,
  PhenotypePrediction,
  PathwayImpact,
  LiteratureRef,
} from "@/data/analysis";

// ── Helpers ─────────────────────────────────────────────────

function interactionBg(type: string): string {
  switch (type) {
    case "synergistic":
      return "bg-emerald-500/10 border-emerald-500/20";
    case "antagonistic":
      return "bg-red-500/10 border-red-500/20";
    case "conditional":
      return "bg-amber-500/10 border-amber-500/20";
    default:
      return "bg-slate-500/10 border-slate-500/20";
  }
}

function interactionColor(type: string): string {
  switch (type) {
    case "synergistic":
      return "text-emerald-400";
    case "antagonistic":
      return "text-red-400";
    case "conditional":
      return "text-amber-400";
    default:
      return "text-slate-400";
  }
}

function fluxColor(change: string): string {
  switch (change) {
    case "increased":
      return "text-emerald-400 bg-emerald-500/10";
    case "decreased":
      return "text-red-400 bg-red-500/10";
    case "redirected":
      return "text-amber-400 bg-amber-500/10";
    case "blocked":
      return "text-red-500 bg-red-500/15";
    default:
      return "text-slate-400 bg-slate-500/10";
  }
}

function difficultyColor(d: string): string {
  switch (d) {
    case "easy":
      return "text-green-400 bg-green-500/10";
    case "moderate":
      return "text-yellow-400 bg-yellow-500/10";
    case "difficult":
      return "text-orange-400 bg-orange-500/10";
    case "very-difficult":
      return "text-red-400 bg-red-500/10";
    default:
      return "text-slate-400";
  }
}

function validationColor(status: string): string {
  switch (status) {
    case "confirmed":
      return "text-green-400 bg-green-500/10";
    case "putative":
      return "text-amber-400 bg-amber-500/10";
    case "ortholog-identified":
      return "text-sky-400 bg-sky-500/10";
    default:
      return "text-slate-400 bg-slate-500/10";
  }
}

function riskScoreColor(score: number): string {
  if (score <= 3) return "text-green-400";
  if (score <= 6) return "text-yellow-400";
  return "text-red-400";
}

function riskScoreBg(score: number): string {
  if (score <= 3) return "bg-green-500/10 border-green-500/20";
  if (score <= 6) return "bg-yellow-500/10 border-yellow-500/20";
  return "bg-red-500/10 border-red-500/20";
}

// ── Section wrapper ─────────────────────────────────────────

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 sm:p-6 mb-6">
      <h4 className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-4">
        {title}
      </h4>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  INTERACTION MATRIX
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function InteractionMatrix({
  interactions,
  geneNames,
}: {
  interactions: EpistaticInteraction[];
  geneNames: Map<string, string>;
}) {
  if (interactions.length === 0) {
    return (
      <SectionCard title="Epistatic Interactions">
        <p className="text-sm text-slate-500 font-body">
          No epistatic interactions detected between the selected gene edits.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Epistatic Interactions">
      <div className="space-y-4">
        {interactions.map((ix, i) => (
          <div
            key={i}
            className={`border rounded-lg p-4 ${interactionBg(ix.type)}`}
          >
            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="font-mono text-sm font-semibold text-slate-200">
                {geneNames.get(ix.geneA) ?? ix.geneA}
              </span>
              <svg
                className="w-4 h-4 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
              <span className="font-mono text-sm font-semibold text-slate-200">
                {geneNames.get(ix.geneB) ?? ix.geneB}
              </span>
              <span
                className={`ml-auto text-[10px] font-mono px-2 py-0.5 rounded-full ${interactionColor(
                  ix.type
                )} bg-black/20`}
              >
                {ix.type}
              </span>
            </div>

            {/* Strength bar */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-slate-600 w-16 shrink-0">
                Strength
              </span>
              <div className="flex-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    ix.strength >= 0 ? "bg-emerald-500/60" : "bg-red-500/60"
                  }`}
                  style={{ width: `${Math.abs(ix.strength) * 100}%` }}
                />
              </div>
              <span
                className={`text-xs font-mono ${
                  ix.strength >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {ix.strength > 0 ? "+" : ""}
                {ix.strength.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-400 font-body leading-relaxed mb-2">
              {ix.description}
            </p>

            {/* Mechanism detail */}
            <details className="group">
              <summary className="text-[11px] font-body text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                Mechanism detail
              </summary>
              <p className="text-xs text-slate-500 font-body leading-relaxed mt-2 pl-2 border-l border-slate-700">
                {ix.mechanismDetail}
              </p>
            </details>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EXPRESSION PROFILE PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TISSUES = ["root", "stem", "leaf", "flower", "fruit", "seed"] as const;

export function ExpressionProfilePanel({
  profiles,
  geneNames,
}: {
  profiles: TissueExpression[];
  geneNames: Map<string, string>;
}) {
  if (profiles.length === 0) {
    return (
      <SectionCard title="Tissue Expression Profiles">
        <p className="text-sm text-slate-500 font-body">
          No expression profile data available.
        </p>
      </SectionCard>
    );
  }

  const tissueBarColor: Record<string, string> = {
    root: "#d97706",
    stem: "#84cc16",
    leaf: "#22c55e",
    flower: "#ec4899",
    fruit: "#f97316",
    seed: "#eab308",
  };

  return (
    <SectionCard title="Tissue Expression Profiles">
      <div className="space-y-6">
        {profiles.map((p) => (
          <div key={p.geneId}>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-sm font-semibold text-slate-200">
                {geneNames.get(p.geneId) ?? p.geneId}
              </span>
              <span className="text-[10px] font-mono text-slate-600 px-2 py-0.5 rounded-full bg-white/5">
                dominant: {p.dominantTissue}
              </span>
            </div>

            {/* Tissue bars */}
            <div className="grid grid-cols-6 gap-2 mb-2">
              {TISSUES.map((t) => (
                <div key={t} className="flex flex-col items-center">
                  <div className="w-full h-20 bg-black/20 rounded relative flex items-end">
                    <div
                      className="w-full rounded transition-all"
                      style={{
                        height: `${p.tissues[t] * 100}%`,
                        minHeight: "2px",
                        backgroundColor: tissueBarColor[t] + "66",
                      }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 mt-1 capitalize">
                    {t}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">
                    {(p.tissues[t] * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 font-body leading-relaxed">
              {p.expressionNotes}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DELIVERY PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function DeliveryPanel({
  strategy,
}: {
  strategy: DeliveryStrategy | null;
}) {
  if (!strategy) {
    return (
      <SectionCard title="Delivery Strategy">
        <p className="text-sm text-slate-500 font-body">
          No delivery data available for this species.
        </p>
      </SectionCard>
    );
  }

  const rows = [
    { label: "Primary Method", value: strategy.primaryMethod },
    { label: "Alternative", value: strategy.alternativeMethod },
    { label: "Explant Type", value: strategy.explantType },
    { label: "Transformation Efficiency", value: strategy.transformationEfficiency },
    { label: "Time to T0", value: strategy.timeToT0 },
    { label: "Genotype Dependence", value: strategy.genotypeDependence },
  ];

  return (
    <SectionCard title="Delivery Strategy">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm font-body text-slate-300">
          {strategy.species}
        </span>
        <span
          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${difficultyColor(
            strategy.difficulty
          )}`}
        >
          {strategy.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {rows.map((r) => (
          <div key={r.label} className="bg-[#0A0F1E]/60 rounded-lg px-3 py-2.5">
            <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider mb-1">
              {r.label}
            </p>
            <p className="text-xs text-slate-300 font-body">{r.value}</p>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 font-body leading-relaxed">
        {strategy.notes}
      </p>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  REGULATORY PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function sdnColor(sdn: string): string {
  switch (sdn) {
    case "SDN-1":
      return "text-green-400 bg-green-500/10 border-green-500/20";
    case "SDN-2":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    case "SDN-3":
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
    case "Transgenic":
      return "text-red-400 bg-red-500/10 border-red-500/20";
    default:
      return "text-slate-400 bg-slate-500/10 border-slate-500/20";
  }
}

export function RegulatoryPanel({
  classifications,
}: {
  classifications: RegulatoryClassification[];
}) {
  if (classifications.length === 0) {
    return (
      <SectionCard title="Regulatory Classification">
        <p className="text-sm text-slate-500 font-body">
          No regulatory data available.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Regulatory Classification">
      <div className="space-y-4">
        {classifications.map((c, i) => (
          <div
            key={i}
            className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-mono text-slate-300 capitalize">
                {c.editType.replace("-", " ")}
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${sdnColor(
                  c.sdnCategory
                )}`}
              >
                {c.sdnCategory}
              </span>
              {c.foreignDNA && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Foreign DNA
                </span>
              )}
            </div>

            <p className="text-[11px] text-slate-400 font-body leading-relaxed mb-3">
              {c.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-black/20 rounded px-3 py-2">
                <p className="text-[9px] font-mono text-slate-600 uppercase mb-0.5">US</p>
                <p className="text-[11px] text-slate-400 font-body">{c.usRegulation}</p>
              </div>
              <div className="bg-black/20 rounded px-3 py-2">
                <p className="text-[9px] font-mono text-slate-600 uppercase mb-0.5">EU</p>
                <p className="text-[11px] text-slate-400 font-body">{c.euRegulation}</p>
              </div>
              <div className="bg-black/20 rounded px-3 py-2">
                <p className="text-[9px] font-mono text-slate-600 uppercase mb-0.5">Japan</p>
                <p className="text-[11px] text-slate-400 font-body">{c.japanRegulation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STACKING PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function StackingPanel({ plan }: { plan: StackingPlan | null }) {
  if (!plan) {
    return (
      <SectionCard title="Gene Stacking Plan">
        <p className="text-sm text-slate-500 font-body">
          No stacking plan generated.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Gene Stacking Plan">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">
          {plan.totalGenerations} generation{plan.totalGenerations > 1 ? "s" : ""}
        </span>
      </div>

      <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
        {plan.strategy}
      </p>

      {/* Timeline steps */}
      <div className="relative ml-4 border-l border-[#1E293B]">
        {plan.steps.map((s, i) => (
          <div key={i} className="relative pl-6 pb-6 last:pb-0">
            <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#111827] border-2 border-emerald-500/50" />

            <div className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-3">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-emerald-400">
                  Gen {s.generation}
                </span>
                <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-1.5 py-0.5 rounded">
                  {s.method}
                </span>
                <span className="text-[10px] font-mono text-slate-600 ml-auto">
                  {s.expectedDuration}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {s.geneNames.map((g, j) => (
                  <span
                    key={j}
                    className="text-[10px] font-mono text-slate-300 bg-white/5 px-1.5 py-0.5 rounded"
                  >
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-[11px] text-slate-500 font-body leading-relaxed">
                {s.rationale}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 font-body leading-relaxed mt-4 italic">
        {plan.notes}
      </p>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WILD RELATIVES PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function WildRelativesPanel({
  relatives,
}: {
  relatives: WildRelativeInfo[];
}) {
  if (relatives.length === 0) {
    return (
      <SectionCard title="Wild Relative Comparisons">
        <p className="text-sm text-slate-500 font-body">
          No wild relative data available for these traits and species.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Wild Relative Comparisons">
      <div className="space-y-4">
        {relatives.map((r, i) => (
          <div
            key={i}
            className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-sm font-body italic text-slate-300">
                {r.relativeSpecies}
              </span>
              {r.commonName && (
                <span className="text-xs font-body text-slate-500">
                  ({r.commonName})
                </span>
              )}
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ml-auto ${validationColor(
                  r.validationStatus
                )}`}
              >
                {r.validationStatus}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-body leading-relaxed mb-2">
              {r.naturalMechanism}
            </p>

            <p className="text-[11px] text-slate-500 font-body leading-relaxed">
              <span className="text-slate-600 font-mono text-[10px]">Introgression:</span>{" "}
              {r.potentialForIntrogression}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PHENOTYPE PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PhenotypePanel({
  predictions,
  traitNames,
}: {
  predictions: PhenotypePrediction[];
  traitNames: Map<string, string>;
}) {
  if (predictions.length === 0) {
    return (
      <SectionCard title="Phenotype Predictions">
        <p className="text-sm text-slate-500 font-body">
          No phenotype predictions available.
        </p>
      </SectionCard>
    );
  }

  const categories = [
    { key: "morphological" as const, label: "Morphological", dotColor: "#38bdf8" },
    { key: "physiological" as const, label: "Physiological", dotColor: "#34d399" },
    { key: "metabolic" as const, label: "Metabolic", dotColor: "#a78bfa" },
    { key: "tradeoffs" as const, label: "Trade-offs", dotColor: "#fbbf24" },
  ];

  return (
    <SectionCard title="Phenotype Predictions">
      <div className="space-y-6">
        {predictions.map((p, i) => (
          <div key={i}>
            <h5 className="text-sm font-display font-semibold text-slate-200 mb-3">
              {traitNames.get(p.traitId) ?? p.traitId}
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => {
                const items = p[cat.key];
                if (items.length === 0) return null;
                return (
                  <div
                    key={cat.key}
                    className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-3"
                  >
                    <p
                      className="text-[10px] font-mono tracking-wider uppercase mb-2"
                      style={{ color: cat.dotColor }}
                    >
                      {cat.label}
                    </p>
                    <ul className="space-y-1.5">
                      {items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-1.5 text-[11px] text-slate-400 font-body"
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: cat.dotColor + "80" }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PATHWAY IMPACT PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PathwayImpactPanel({
  impacts,
  geneNames,
}: {
  impacts: PathwayImpact[];
  geneNames: Map<string, string>;
}) {
  if (impacts.length === 0) {
    return (
      <SectionCard title="Pathway Impact Analysis">
        <p className="text-sm text-slate-500 font-body">
          No pathway impact data available.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Pathway Impact Analysis">
      <div className="space-y-4">
        {impacts.map((p, i) => (
          <div
            key={i}
            className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-4"
          >
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-sm font-semibold text-slate-200">
                {geneNames.get(p.geneId) ?? p.geneId}
              </span>
              <svg
                className="w-3 h-3 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
              <span className="text-xs font-body text-slate-300">{p.pathway}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ml-auto ${fluxColor(
                  p.fluxChange
                )}`}
              >
                {p.fluxChange} ({p.magnitude > 1 ? "+" : ""}{p.magnitude.toFixed(1)}x)
              </span>
            </div>

            <p className="text-xs text-slate-400 font-body leading-relaxed mb-2">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {p.affectedMetabolites.map((m, j) => (
                <span
                  key={j}
                  className="text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LITERATURE PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function LiteraturePanel({
  refs,
  geneNames,
}: {
  refs: LiteratureRef[];
  geneNames: Map<string, string>;
}) {
  if (refs.length === 0) {
    return (
      <SectionCard title="Literature References">
        <p className="text-sm text-slate-500 font-body">
          No literature references available.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Literature References">
      <div className="space-y-3">
        {refs.map((r, i) => (
          <div
            key={i}
            className="bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg p-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-[10px] font-mono text-slate-600 bg-white/5 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                {geneNames.get(r.geneId) ?? r.geneId}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 font-body font-medium mb-1">
                  {r.title}
                </p>
                <p className="text-[11px] text-slate-500 font-body">
                  {r.authors} ({r.year}). <em>{r.journal}</em>
                </p>
                <p className="text-[11px] text-slate-400 font-body leading-relaxed mt-1.5">
                  {r.finding}
                </p>
                <a
                  href={`https://doi.org/${r.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono text-sky-500 hover:text-sky-400 transition-colors mt-1 inline-block"
                >
                  doi:{r.doi}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  BIOSAFETY SUMMARY
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function BiosafetySummary({
  riskScore,
  concerns,
}: {
  riskScore: number;
  concerns: string[];
}) {
  return (
    <SectionCard title="Biosafety Assessment">
      {/* Risk score display */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-16 h-16 rounded-xl border flex items-center justify-center ${riskScoreBg(
            riskScore
          )}`}
        >
          <span
            className={`text-2xl font-display font-bold ${riskScoreColor(
              riskScore
            )}`}
          >
            {riskScore}
          </span>
        </div>
        <div>
          <p className="text-sm font-display font-semibold text-slate-200">
            Overall Risk Score
          </p>
          <p className="text-xs text-slate-500 font-body">
            Scale of 1 (minimal) to 10 (high concern)
          </p>
        </div>
      </div>

      {/* Concerns list */}
      {concerns.length > 0 ? (
        <div className="space-y-2">
          {concerns.map((c, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 bg-[#0A0F1E]/40 border border-[#1E293B]/60 rounded-lg px-4 py-3"
            >
              <svg
                className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-xs text-slate-400 font-body leading-relaxed">
                {c}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500 font-body">
          No specific biosafety concerns identified.
        </p>
      )}
    </SectionCard>
  );
}
