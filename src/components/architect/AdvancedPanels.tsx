"use client";

import type {
  PloidyInfo,
  EditingToolInfo,
  MultiplexStrategy,
  MorphogenicRegulator,
  OrthologGroup,
} from "@/data/advanced-genomics";

// ── Helpers ─────────────────────────────────────────────────

function complexityBadge(c: PloidyInfo["editingComplexity"]): string {
  switch (c) {
    case "standard":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "complex":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "very-complex":
      return "bg-red-500/15 text-red-400 border-red-500/30";
  }
}

function conservationBadge(c: OrthologGroup["conservationLevel"]): string {
  switch (c) {
    case "highly-conserved":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
    case "moderately-conserved":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30";
    case "divergent":
      return "bg-red-500/15 text-red-400 border-red-500/30";
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PLOIDY PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function PloidyPanel({ ploidy }: { ploidy: PloidyInfo }) {
  const subgenomeColors = [
    "bg-emerald-500", "bg-blue-500", "bg-purple-500",
    "bg-amber-500", "bg-rose-500", "bg-cyan-500",
    "bg-orange-500", "bg-pink-500", "bg-teal-500",
    "bg-indigo-500", "bg-lime-500", "bg-fuchsia-500",
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          Ploidy-Aware Editing
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${complexityBadge(ploidy.editingComplexity)}`}
        >
          {ploidy.editingComplexity === "very-complex"
            ? "Very Complex"
            : ploidy.editingComplexity === "complex"
              ? "Complex"
              : "Standard"}
        </span>
      </div>

      {/* Ploidy Level Visual */}
      <div className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="text-3xl font-bold text-white font-mono">
            {ploidy.ploidyLevel}x
          </div>
          <div>
            <p className="text-sm text-slate-300">Ploidy Level</p>
            <p className="text-xs text-slate-500">
              {ploidy.ploidyLevel === 2
                ? "Diploid"
                : ploidy.ploidyLevel === 3
                  ? "Triploid"
                  : ploidy.ploidyLevel === 4
                    ? "Tetraploid"
                    : ploidy.ploidyLevel === 6
                      ? "Hexaploid"
                      : `${ploidy.ploidyLevel}-ploid`}
            </p>
          </div>
        </div>

        {/* Subgenome Visualization */}
        {ploidy.subgenomes.length > 0 && (
          <div className="mt-3">
            <p className="text-xs text-slate-400 mb-2">Subgenomes</p>
            <div className="flex flex-wrap gap-2">
              {ploidy.subgenomes.map((sg, i) => (
                <div
                  key={sg}
                  className="flex items-center gap-1.5"
                >
                  <div
                    className={`w-3 h-3 rounded-sm ${subgenomeColors[i % subgenomeColors.length]}`}
                  />
                  <span className="text-xs font-mono text-slate-300">
                    {sg}
                  </span>
                </div>
              ))}
            </div>
            {/* Visual bar showing relative subgenome copies */}
            <div className="mt-2 flex h-6 rounded-md overflow-hidden border border-[#1E293B]">
              {ploidy.subgenomes.map((sg, i) => (
                <div
                  key={sg}
                  className={`flex-1 ${subgenomeColors[i % subgenomeColors.length]} opacity-40 flex items-center justify-center`}
                >
                  <span className="text-[10px] font-bold text-white/80">
                    {sg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {ploidy.homeologGroups > 0 && (
          <div className="mt-3 text-xs text-slate-400">
            <span className="text-slate-300 font-medium">
              {ploidy.homeologGroups}
            </span>{" "}
            homeolog groups — each gene target exists in{" "}
            <span className="text-amber-400 font-medium">
              {ploidy.ploidyLevel} copies
            </span>
          </div>
        )}
      </div>

      {/* Warning for complex genomes */}
      {ploidy.editingComplexity !== "standard" && (
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <p className="text-xs font-medium text-amber-400">
                Polyploid Editing Required
              </p>
              <p className="text-xs text-amber-300/70 mt-1">
                {ploidy.notes}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Strategy */}
      <div className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4">
        <p className="text-xs text-slate-400 mb-1">Homeolog Editing Strategy</p>
        <p className="text-xs text-slate-300 leading-relaxed">
          {ploidy.homeologEditingStrategy}
        </p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EDITING TOOLS PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function EditingToolsPanel({
  tools,
  recommendedIds,
}: {
  tools: EditingToolInfo[];
  recommendedIds: string[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
        Modern Editing Technologies
      </h3>

      <div className="grid gap-3">
        {tools.map((tool) => {
          const isRecommended = recommendedIds.includes(tool.id);
          return (
            <div
              key={tool.id}
              className={`bg-[#0D1425] rounded-lg border p-4 transition-all ${
                isRecommended
                  ? "border-emerald-500/40 ring-1 ring-emerald-500/20"
                  : "border-[#1E293B]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white font-mono">
                    {tool.id}
                  </span>
                  {isRecommended && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 font-mono">
                  {tool.pamRequirement}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {tool.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div>
                  <p className="text-slate-500 mb-1 font-medium">Advantages</p>
                  <ul className="space-y-0.5">
                    {tool.advantages.slice(0, 3).map((a, i) => (
                      <li
                        key={i}
                        className="text-emerald-400/80 flex items-start gap-1"
                      >
                        <span className="text-emerald-500 mt-0.5">+</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 font-medium">
                    Limitations
                  </p>
                  <ul className="space-y-0.5">
                    {tool.limitations.slice(0, 3).map((l, i) => (
                      <li
                        key={i}
                        className="text-red-400/70 flex items-start gap-1"
                      >
                        <span className="text-red-500 mt-0.5">-</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-3 flex gap-4 text-[10px] text-slate-500">
                <span>
                  Size: <span className="text-slate-400">{tool.deliverySize}</span>
                </span>
                <span>
                  Efficiency:{" "}
                  <span className="text-slate-400">{tool.efficiency}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MULTIPLEX PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function MultiplexPanel({
  recommended,
  allStrategies,
  numTargets,
  ploidyLevel,
}: {
  recommended: MultiplexStrategy;
  allStrategies: MultiplexStrategy[];
  numTargets: number;
  ploidyLevel: number;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
        Multiplexing Strategy
      </h3>

      {/* Recommended Strategy */}
      <div className="bg-[#0D1425] rounded-lg border border-emerald-500/30 p-4 ring-1 ring-emerald-500/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
            RECOMMENDED
          </span>
          <span className="text-sm font-semibold text-white">
            {recommended.name}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-3 leading-relaxed">
          {recommended.description}
        </p>

        <div className="bg-[#080C1A] rounded-md p-3 mb-3">
          <p className="text-[10px] text-slate-500 mb-1 font-medium">
            MECHANISM
          </p>
          <p className="text-xs text-slate-300 leading-relaxed font-mono">
            {recommended.mechanism}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-[#080C1A] rounded-md p-2">
            <p className="text-lg font-bold text-emerald-400">
              {numTargets}
            </p>
            <p className="text-[10px] text-slate-500">Your Targets</p>
          </div>
          <div className="bg-[#080C1A] rounded-md p-2">
            <p className="text-lg font-bold text-blue-400">
              {recommended.maxTargets}
            </p>
            <p className="text-[10px] text-slate-500">Max Capacity</p>
          </div>
          <div className="bg-[#080C1A] rounded-md p-2">
            <p className="text-lg font-bold text-amber-400">{ploidyLevel}x</p>
            <p className="text-[10px] text-slate-500">Ploidy</p>
          </div>
        </div>
      </div>

      {/* Other Strategies Comparison */}
      <div className="space-y-2">
        <p className="text-xs text-slate-500 font-medium">
          All Available Strategies
        </p>
        {allStrategies.map((s) => (
          <div
            key={s.id}
            className={`bg-[#0D1425] rounded-lg border p-3 ${
              s.id === recommended.id
                ? "border-emerald-500/20 opacity-60"
                : "border-[#1E293B]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">
                {s.name}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                max {s.maxTargets} targets
              </span>
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {s.bestForPloidy.map((p) => (
                <span
                  key={p}
                  className="text-[9px] px-1 py-0.5 rounded bg-slate-700/50 text-slate-400"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MORPHOGENIC PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function MorphogenicPanel({
  regulators,
  genomeId,
}: {
  regulators: MorphogenicRegulator[];
  genomeId: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          Morphogenic Regulators
        </h3>
        {regulators.length > 0 && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            {regulators.length} available
          </span>
        )}
      </div>

      {regulators.length === 0 ? (
        <div className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4 text-center">
          <p className="text-xs text-slate-500">
            No morphogenic regulators specifically validated for this species.
            Standard regeneration protocols apply.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {regulators.map((reg) => (
            <div
              key={reg.id}
              className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-white font-mono">
                  {reg.name}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {reg.year}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{reg.fullName}</p>

              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {reg.mechanism}
              </p>

              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-md p-2 mb-2">
                <p className="text-[10px] text-emerald-400">
                  <span className="font-medium">Efficiency Gain:</span>{" "}
                  {reg.efficiencyGain}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {reg.cropsUnlocked.map((crop) => (
                  <span
                    key={crop}
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
                      crop === genomeId
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium"
                        : "bg-slate-700/50 text-slate-400"
                    }`}
                  >
                    {crop}
                  </span>
                ))}
              </div>

              <p className="text-[10px] text-slate-500 italic">
                {reg.reference}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ORTHOLOG PANEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function OrthologPanel({
  orthologGroups,
  highlightGenomeId,
}: {
  orthologGroups: OrthologGroup[];
  highlightGenomeId: string;
}) {
  if (orthologGroups.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
          Ortholog Conservation
        </h3>
        <div className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4 text-center">
          <p className="text-xs text-slate-500">
            No ortholog data available for genes in this edit plan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
        Ortholog Conservation
      </h3>

      {orthologGroups.map((group) => (
        <div
          key={group.groupId}
          className="bg-[#0D1425] rounded-lg border border-[#1E293B] p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-semibold text-white">
                {group.geneName}
              </span>
              <span className="text-xs text-slate-500 ml-2">
                {group.pathway}
              </span>
            </div>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full border ${conservationBadge(group.conservationLevel)}`}
            >
              {group.conservationLevel.replace("-", " ")}
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            {group.notes}
          </p>

          {/* Conservation Bar */}
          <div className="space-y-1">
            {group.members
              .sort((a, b) => b.similarity - a.similarity)
              .map((member) => (
                <div
                  key={member.geneId}
                  className="flex items-center gap-2"
                >
                  <span
                    className={`text-[10px] w-20 truncate font-mono ${
                      member.genomeId === highlightGenomeId
                        ? "text-emerald-400 font-medium"
                        : "text-slate-500"
                    }`}
                  >
                    {member.geneName}
                  </span>
                  <div className="flex-1 h-3 bg-[#080C1A] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        member.genomeId === highlightGenomeId
                          ? "bg-emerald-500"
                          : member.similarity >= 0.7
                            ? "bg-blue-500/60"
                            : member.similarity >= 0.5
                              ? "bg-amber-500/60"
                              : "bg-red-500/60"
                      }`}
                      style={{ width: `${member.similarity * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 w-10 text-right font-mono">
                    {Math.round(member.similarity * 100)}%
                  </span>
                  <span
                    className={`text-[9px] w-16 truncate ${
                      member.genomeId === highlightGenomeId
                        ? "text-emerald-400"
                        : "text-slate-600"
                    }`}
                  >
                    {member.genomeId}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
