"use client";

import { useState, useMemo, useEffect } from "react";
import { genomes } from "@/data/genomes";
import type { PlantGenome } from "@/data/genomes";
import {
  environments,
  getEditPlan,
  getAvailableEnvironments,
} from "@/data/environments";
import type {
  Environment,
  EditPlan,
  PlannedEdit,
  EditType,
  Confidence,
  RiskLevel,
} from "@/data/environments";
import GenomeEditViewerWrapper from "@/components/GenomeEditViewerWrapper";
import { generateFullAnalysis } from "@/data/analysis";
import type { FullAnalysis } from "@/data/analysis";
import {
  InteractionMatrix,
  ExpressionProfilePanel,
  DeliveryPanel,
  RegulatoryPanel,
  StackingPanel,
  WildRelativesPanel,
  PhenotypePanel,
  PathwayImpactPanel,
  LiteraturePanel,
  BiosafetySummary,
} from "@/components/architect/AnalysisPanels";

// ── Helpers ────────────────────────────────────────────────

function editTypeColor(t: EditType): string {
  switch (t) {
    case "overexpression":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "knockout":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "promoter-swap":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "point-mutation":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "insertion":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  }
}

function editTypeLabel(t: EditType): string {
  switch (t) {
    case "overexpression":
      return "Overexpression";
    case "knockout":
      return "Knockout";
    case "promoter-swap":
      return "Promoter Swap";
    case "point-mutation":
      return "Point Mutation";
    case "insertion":
      return "Insertion";
  }
}

function confidenceColor(c: Confidence): string {
  switch (c) {
    case "high":
      return "bg-green-500/20 text-green-400 border-green-500/40";
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
    case "experimental":
      return "bg-orange-500/20 text-orange-400 border-orange-500/40";
  }
}

function riskColor(r: RiskLevel): string {
  switch (r) {
    case "low":
      return "text-green-400";
    case "medium":
      return "text-yellow-400";
    case "high":
      return "text-red-400";
  }
}

function riskBg(r: RiskLevel): string {
  switch (r) {
    case "low":
      return "bg-green-500/10";
    case "medium":
      return "bg-yellow-500/10";
    case "high":
      return "bg-red-500/10";
  }
}

function complexityColor(score: number): string {
  if (score < 4) return "text-green-400";
  if (score <= 7) return "text-yellow-400";
  return "text-red-400";
}

function complexityBg(score: number): string {
  if (score < 4) return "bg-green-500/10 border-green-500/20";
  if (score <= 7) return "bg-yellow-500/10 border-yellow-500/20";
  return "bg-red-500/10 border-red-500/20";
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

// ── Tab definitions ────────────────────────────────────────

interface TabDef {
  id: string;
  label: string;
  icon: string; // SVG path
  badge?: number;
}

// ── Step Indicator ─────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { num: 1, label: "Select Species" },
    { num: 2, label: "Environment" },
    { num: 3, label: "Edit Plan" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {steps.map((step, i) => {
        const completed = current > step.num;
        const active = current === step.num;
        return (
          <div key={step.num} className="flex items-center gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-body font-semibold transition-all duration-300 ${
                  completed
                    ? "bg-emerald-500 text-white"
                    : active
                    ? "bg-white/10 text-white border-2 border-white/40"
                    : "bg-white/5 text-slate-500 border border-white/10"
                }`}
              >
                {completed ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  step.num
                )}
              </div>
              <span
                className={`text-sm font-body hidden sm:inline ${
                  active ? "text-slate-100" : "text-slate-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-px mx-1 ${
                  current > step.num ? "bg-emerald-500" : "bg-white/10"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────

export default function GenomeArchitectPage() {
  const [step, setStep] = useState(1);
  const [selectedPlant, setSelectedPlant] = useState<PlantGenome | null>(null);
  const [selectedEnv, setSelectedEnv] = useState<Environment | null>(null);
  const [expandedMechanisms, setExpandedMechanisms] = useState<Set<string>>(
    new Set()
  );
  const [activeTab, setActiveTab] = useState("plan");

  useEffect(() => {
    document.title = "Genome Architect | PlantMol";
  }, []);

  const availableEnvIds = useMemo(() => {
    if (!selectedPlant) return new Set<string>();
    const avail = getAvailableEnvironments(selectedPlant.id);
    return new Set(avail.map((e) => e.id));
  }, [selectedPlant]);

  const editPlan = useMemo<EditPlan | null>(() => {
    if (!selectedPlant || !selectedEnv) return null;
    return getEditPlan(selectedPlant.id, selectedEnv.id);
  }, [selectedPlant, selectedEnv]);

  const analysis = useMemo<FullAnalysis | null>(() => {
    if (!editPlan) return null;
    return generateFullAnalysis(editPlan);
  }, [editPlan]);

  const geneNameMap = useMemo(() => {
    const map = new Map<string, string>();
    if (editPlan) {
      editPlan.edits.forEach((e) => map.set(e.gene.geneId, e.gene.geneName));
    }
    return map;
  }, [editPlan]);

  const traitNameMap = useMemo(() => {
    const map = new Map<string, string>();
    if (editPlan) {
      editPlan.edits.forEach((e) => map.set(e.trait.id, e.trait.name));
    }
    return map;
  }, [editPlan]);

  const tabs = useMemo<TabDef[]>(() => {
    if (!analysis) return [];
    const synCount = analysis.interactions.filter(
      (i) => i.type === "synergistic"
    ).length;
    const antCount = analysis.interactions.filter(
      (i) => i.type === "antagonistic"
    ).length;
    return [
      {
        id: "plan",
        label: "Edit Plan",
        icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
      },
      {
        id: "interactions",
        label: "Interactions",
        icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
        badge: analysis.interactions.length,
      },
      {
        id: "implementation",
        label: "Implementation",
        icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
      },
      {
        id: "phenotype",
        label: "Phenotype",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        badge: analysis.wildRelatives.length > 0
          ? analysis.wildRelatives.length
          : undefined,
      },
      {
        id: "pathways",
        label: "Pathways",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        badge: analysis.pathwayImpacts.length > 0
          ? analysis.pathwayImpacts.length
          : undefined,
      },
      {
        id: "risk",
        label: "Risk & Safety",
        icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
        badge: analysis.biosafetyConcerns.length > 0
          ? analysis.biosafetyConcerns.length
          : undefined,
      },
    ];
  }, [analysis]);

  function handleSelectPlant(plant: PlantGenome) {
    setSelectedPlant(plant);
    setSelectedEnv(null);
    setExpandedMechanisms(new Set());
    setActiveTab("plan");
    setStep(2);
  }

  function handleSelectEnv(env: Environment) {
    if (!availableEnvIds.has(env.id)) return;
    setSelectedEnv(env);
    setExpandedMechanisms(new Set());
    setActiveTab("plan");
    setStep(3);
  }

  function toggleMechanism(geneId: string) {
    setExpandedMechanisms((prev) => {
      const next = new Set(prev);
      if (next.has(geneId)) next.delete(geneId);
      else next.add(geneId);
      return next;
    });
  }

  function goBack() {
    if (step === 3) {
      setSelectedEnv(null);
      setStep(2);
    } else if (step === 2) {
      setSelectedPlant(null);
      setStep(1);
    }
  }

  function startOver() {
    setSelectedPlant(null);
    setSelectedEnv(null);
    setExpandedMechanisms(new Set());
    setActiveTab("plan");
    setStep(1);
  }

  return (
    <main className="min-h-screen bg-[#0A0F1E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="text-center mb-8 animate-fade-in">
          <p className="text-xs font-mono tracking-[0.3em] text-emerald-400 uppercase mb-3">
            CRISPR Edit Planner
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-slate-100 mb-3">
            Genome Architect
          </h1>
          <p className="text-slate-400 font-body max-w-2xl mx-auto text-base leading-relaxed">
            Engineer plants for target environments. Select a species, choose an
            environment, and generate a comprehensive CRISPR edit plan with
            guide RNA sequences, confidence scores, and risk assessments.
          </p>
        </div>

        {/* ── Step Indicator ──────────────────────────────── */}
        <StepIndicator current={step} />

        {/* ── Step 1: Select Plant ────────────────────────── */}
        {step === 1 && (
          <div className="animate-fade-in-up">
            <h2 className="text-xl font-display font-semibold text-slate-100 mb-6 text-center">
              Select a Plant Species
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {genomes.map((plant) => (
                <button
                  key={plant.id}
                  onClick={() => handleSelectPlant(plant)}
                  className="group relative bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-left transition-all duration-300 hover:border-white/20 hover:bg-[#111827]/90 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30"
                >
                  {/* Colored left border accent */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                    style={{ backgroundColor: plant.imageColor }}
                  />
                  <div className="pl-4">
                    <p
                      className="text-lg font-display font-semibold text-slate-100 group-hover:text-white transition-colors"
                      style={{
                        color: plant.imageColor,
                      }}
                    >
                      {plant.commonName}
                    </p>
                    <p className="text-sm italic text-slate-400 font-body mt-0.5">
                      {plant.species}
                    </p>
                    <p className="text-xs text-slate-500 font-body mt-2 line-clamp-2 leading-relaxed">
                      {plant.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-500 font-mono">
                      <span>
                        <span className="text-slate-400">
                          {plant.genomeSizeMb.toLocaleString()}
                        </span>{" "}
                        Mb
                      </span>
                      <span>
                        <span className="text-slate-400">
                          {plant.chromosomeCount}
                        </span>{" "}
                        chr
                      </span>
                      <span className="text-slate-400">{plant.ploidy}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Step 2: Select Environment ──────────────────── */}
        {step === 2 && selectedPlant && (
          <div className="animate-fade-in-up">
            {/* Plant banner */}
            <div className="flex items-center gap-4 bg-[#111827]/60 border border-[#1E293B] rounded-xl px-5 py-3 mb-8 max-w-4xl mx-auto">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selectedPlant.imageColor }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-sm font-display font-semibold text-slate-100">
                  {selectedPlant.commonName}
                </span>
                <span className="text-sm italic text-slate-500 font-body ml-2">
                  {selectedPlant.species}
                </span>
              </div>
              <button
                onClick={goBack}
                className="text-xs text-slate-500 hover:text-slate-300 font-body transition-colors"
              >
                Change
              </button>
            </div>

            <h2 className="text-xl font-display font-semibold text-slate-100 mb-6 text-center">
              Select Target Environment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {environments.map((env) => {
                const available = availableEnvIds.has(env.id);
                return (
                  <button
                    key={env.id}
                    onClick={() => handleSelectEnv(env)}
                    disabled={!available}
                    className={`group relative bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-left transition-all duration-300 ${
                      available
                        ? "hover:border-white/20 hover:bg-[#111827]/90 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 cursor-pointer"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {/* Env color accent top bar */}
                    <div
                      className="absolute top-0 left-4 right-4 h-0.5 rounded-b"
                      style={{
                        backgroundColor: available ? env.color : "#334155",
                      }}
                    />
                    <div className="flex items-start justify-between mb-2 mt-1">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                          backgroundColor: available
                            ? env.color + "15"
                            : "#1E293B",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke={available ? env.color : "#475569"}
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d={env.icon} />
                        </svg>
                      </div>
                      {!available && (
                        <span className="text-[10px] font-mono bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full border border-slate-700">
                          No data
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-sm font-display font-semibold mb-1.5"
                      style={{ color: available ? env.color : "#64748B" }}
                    >
                      {env.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-body line-clamp-2 leading-relaxed mb-3">
                      {env.description}
                    </p>
                    {/* Challenges */}
                    <div className="space-y-1 mb-3">
                      {env.challenges.slice(0, 2).map((c, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-slate-500 font-body"
                        >
                          <span
                            className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                            style={{
                              backgroundColor: available
                                ? env.color
                                : "#475569",
                            }}
                          />
                          <span className="line-clamp-1">{c}</span>
                        </div>
                      ))}
                    </div>
                    {/* Temp + Rainfall */}
                    <div className="flex items-center gap-3 text-[10px] font-mono text-slate-600">
                      <span>{env.temperatureRange}</span>
                      <span className="w-px h-3 bg-slate-700" />
                      <span>{env.rainfall}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={goBack}
                className="text-sm text-slate-500 hover:text-slate-300 font-body transition-colors flex items-center gap-2 mx-auto"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to species selection
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Edit Plan Results ───────────────────── */}
        {step === 3 && selectedPlant && selectedEnv && editPlan && analysis && (
          <div className="animate-fade-in-up">
            {/* Context banner */}
            <div className="flex flex-wrap items-center gap-3 bg-[#111827]/60 border border-[#1E293B] rounded-xl px-5 py-3 mb-8">
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selectedPlant.imageColor }}
              />
              <span className="text-sm font-display font-semibold text-slate-100">
                {selectedPlant.commonName}
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: selectedEnv.color }}
              />
              <span
                className="text-sm font-display font-semibold"
                style={{ color: selectedEnv.color }}
              >
                {selectedEnv.name}
              </span>
            </div>

            {/* ── Summary Dashboard (3x2 grid) ──────────────── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Total Edits */}
              <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-center">
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Total Edits
                </p>
                <p
                  className="text-3xl font-display font-bold"
                  style={{ color: selectedPlant.imageColor }}
                >
                  {editPlan.totalEdits}
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  gene targets
                </p>
              </div>

              {/* Complexity */}
              <div
                className={`bg-[#111827]/60 border rounded-xl p-5 text-center ${complexityBg(
                  editPlan.complexityScore
                )}`}
              >
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Complexity
                </p>
                <p
                  className={`text-3xl font-display font-bold ${complexityColor(
                    editPlan.complexityScore
                  )}`}
                >
                  {editPlan.complexityScore}
                  <span className="text-sm text-slate-600">/10</span>
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  engineering difficulty
                </p>
              </div>

              {/* Success Probability */}
              <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-center">
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Success Rate
                </p>
                <p className="text-3xl font-display font-bold text-emerald-400">
                  {Math.round(editPlan.successProbability * 100)}
                  <span className="text-sm text-slate-600">%</span>
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  estimated probability
                </p>
              </div>

              {/* Timeline */}
              <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-center">
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Timeline
                </p>
                <p className="text-3xl font-display font-bold text-sky-400">
                  {editPlan.timelineMonths}
                  <span className="text-sm text-slate-600"> mo</span>
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  {editPlan.estimatedGenerations} generations
                </p>
              </div>

              {/* Risk Score */}
              <div
                className={`bg-[#111827]/60 border rounded-xl p-5 text-center ${riskScoreBg(
                  analysis.overallRiskScore
                )}`}
              >
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Risk Score
                </p>
                <p
                  className={`text-3xl font-display font-bold ${riskScoreColor(
                    analysis.overallRiskScore
                  )}`}
                >
                  {analysis.overallRiskScore}
                  <span className="text-sm text-slate-600">/10</span>
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  overall biosafety
                </p>
              </div>

              {/* Interactions */}
              <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl p-5 text-center">
                <p className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-2">
                  Interactions
                </p>
                <p className="text-3xl font-display font-bold text-purple-400">
                  {analysis.interactions.length}
                </p>
                <p className="text-[11px] text-slate-600 font-body mt-1">
                  {analysis.interactions.filter((i) => i.type === "synergistic").length} synergistic
                  {" / "}
                  {analysis.interactions.filter((i) => i.type === "antagonistic").length} antagonistic
                </p>
              </div>
            </div>

            {/* Summary text */}
            <div className="bg-[#111827]/40 border border-[#1E293B] rounded-xl p-6 mb-8">
              <h3 className="text-xs font-mono tracking-wider text-slate-500 uppercase mb-3">
                Plan Summary
              </h3>
              <p className="text-sm text-slate-300 font-body leading-relaxed">
                {editPlan.summary}
              </p>
            </div>

            {/* ── Tab Bar ───────────────────────────────────── */}
            <div className="mb-8 overflow-x-auto scrollbar-hide">
              <div className="flex gap-1 border-b border-[#1E293B] min-w-max">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-4 py-3 text-sm font-body transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "text-slate-100"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d={tab.icon} />
                      </svg>
                      <span>{tab.label}</span>
                      {tab.badge !== undefined && tab.badge > 0 && (
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0 rounded-full ${
                            isActive
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-white/5 text-slate-600"
                          }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                      {/* Active underline */}
                      <div
                        className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? "bg-emerald-500 opacity-100"
                            : "bg-transparent opacity-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Tab Content ───────────────────────────────── */}

            {/* Plan tab — existing edit cards + genome viewer + CRISPR table */}
            {activeTab === "plan" && (
              <div className="animate-fade-in">
                {/* ── Edit Cards ──────────────────────────────── */}
                <h3 className="text-lg font-display font-semibold text-slate-100 mb-5">
                  Planned Edits
                </h3>
                <div className="space-y-4 mb-10">
                  {editPlan.edits.map((edit) => {
                    const { gene, trait, priority } = edit;
                    const mechOpen = expandedMechanisms.has(gene.geneId);
                    return (
                      <div
                        key={gene.geneId}
                        className="bg-[#111827]/60 border border-[#1E293B] rounded-xl overflow-hidden transition-all duration-300 hover:border-white/10"
                      >
                        <div className="p-5 sm:p-6">
                          {/* Top row: priority + gene + edit type */}
                          <div className="flex flex-wrap items-start gap-3 mb-4">
                            {/* Priority badge */}
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-mono font-bold text-white shrink-0"
                              style={{
                                backgroundColor:
                                  selectedPlant.imageColor + "25",
                                color: selectedPlant.imageColor,
                              }}
                            >
                              {priority}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-lg font-mono font-bold text-slate-100">
                                  {gene.geneName}
                                </span>
                                <span
                                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${editTypeColor(
                                    gene.editType
                                  )}`}
                                >
                                  {editTypeLabel(gene.editType)}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 font-body mt-0.5">
                                {gene.fullName}
                              </p>
                            </div>
                            {/* Confidence + Risk on right */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${confidenceColor(
                                  gene.confidence
                                )}`}
                              >
                                {gene.confidence}
                              </span>
                              <div
                                className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${riskBg(
                                  gene.offTargetRisk
                                )} ${riskColor(gene.offTargetRisk)}`}
                              >
                                <svg
                                  className="w-3 h-3"
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
                                OT: {gene.offTargetRisk}
                              </div>
                            </div>
                          </div>

                          {/* Trait + Chromosome row */}
                          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs">
                            <div className="flex items-center gap-1.5 font-body text-slate-400">
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: trait.color }}
                              />
                              {trait.name}
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-slate-500">
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                />
                              </svg>
                              {gene.chromosome} @ {Math.round(gene.position * 100)}%
                            </div>
                          </div>

                          {/* Edit description */}
                          <p className="text-xs text-slate-400 font-body leading-relaxed mb-4">
                            {gene.editDescription}
                          </p>

                          {/* Expected Outcome */}
                          <div className="bg-[#0A0F1E]/60 rounded-lg px-4 py-3 mb-4">
                            <p className="text-[10px] font-mono tracking-wider text-slate-600 uppercase mb-1">
                              Expected Outcome
                            </p>
                            <p className="text-xs text-slate-300 font-body leading-relaxed">
                              {gene.expectedOutcome}
                            </p>
                          </div>

                          {/* Mechanism expandable */}
                          <button
                            onClick={() => toggleMechanism(gene.geneId)}
                            className="flex items-center gap-2 text-xs font-body text-slate-500 hover:text-slate-300 transition-colors mb-3"
                          >
                            <svg
                              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                mechOpen ? "rotate-90" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                            Mechanism
                          </button>
                          {mechOpen && (
                            <div className="bg-[#0A0F1E]/60 rounded-lg px-4 py-3 mb-4 animate-fade-in">
                              <p className="text-xs text-slate-400 font-body leading-relaxed">
                                {gene.mechanism}
                              </p>
                            </div>
                          )}

                          {/* Guide RNA */}
                          <div className="bg-[#070B14] rounded-lg px-4 py-3 border border-[#1E293B]/60">
                            <p className="text-[10px] font-mono tracking-wider text-slate-600 uppercase mb-2">
                              Guide RNA + PAM
                            </p>
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="font-mono text-sm text-emerald-400 tracking-widest">
                                {gene.guideRNASequence}
                              </span>
                              <span className="font-mono text-sm text-red-400 tracking-widest bg-red-500/10 px-1.5 py-0.5 rounded">
                                {gene.pamSite}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ── Genome Edit Visualization ────────────────── */}
                <div className="mb-10">
                  <h3 className="text-lg font-display font-semibold text-slate-100 mb-5">
                    Genome Edit Visualization
                  </h3>
                  <div className="h-[500px] bg-[#111827]/60 border border-[#1E293B] rounded-xl overflow-hidden">
                    <GenomeEditViewerWrapper
                      plantId={selectedPlant.id}
                      edits={editPlan.edits as unknown as Parameters<typeof GenomeEditViewerWrapper>[0]["edits"]}
                      accentColor={selectedPlant.imageColor}
                    />
                  </div>
                </div>

                {/* ── CRISPR Guide Summary Table ───────────────── */}
                <div className="mb-10">
                  <h3 className="text-lg font-display font-semibold text-slate-100 mb-5">
                    CRISPR Guide Summary
                  </h3>
                  <div className="bg-[#111827]/60 border border-[#1E293B] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs font-mono">
                        <thead>
                          <tr className="border-b border-[#1E293B]">
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              #
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              Gene
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              Edit
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              Locus
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              Guide RNA (5&apos; &rarr; 3&apos;)
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              PAM
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              Conf.
                            </th>
                            <th className="px-4 py-3 text-left text-[10px] tracking-wider text-slate-600 uppercase font-semibold">
                              OT Risk
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {editPlan.edits.map((edit) => (
                            <tr
                              key={edit.gene.geneId}
                              className="border-b border-[#1E293B]/50 hover:bg-white/[0.02] transition-colors"
                            >
                              <td className="px-4 py-3 text-slate-600">
                                {edit.priority}
                              </td>
                              <td className="px-4 py-3 text-slate-200 font-semibold">
                                {edit.gene.geneName}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] border ${editTypeColor(
                                    edit.gene.editType
                                  )}`}
                                >
                                  {editTypeLabel(edit.gene.editType)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-slate-500">
                                {edit.gene.chromosome}:{Math.round(edit.gene.position * 100)}%
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-emerald-400 tracking-wider bg-[#070B14] px-2 py-1 rounded">
                                  {edit.gene.guideRNASequence}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                                  {edit.gene.pamSite}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`${
                                    edit.gene.confidence === "high"
                                      ? "text-green-400"
                                      : edit.gene.confidence === "medium"
                                      ? "text-yellow-400"
                                      : "text-orange-400"
                                  }`}
                                >
                                  {edit.gene.confidence}
                                </span>
                              </td>
                              <td className="px-4 py-3">
                                <span className={riskColor(edit.gene.offTargetRisk)}>
                                  {edit.gene.offTargetRisk}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Interactions tab */}
            {activeTab === "interactions" && (
              <div className="animate-fade-in">
                <InteractionMatrix
                  interactions={analysis.interactions}
                  geneNames={geneNameMap}
                />
              </div>
            )}

            {/* Implementation tab */}
            {activeTab === "implementation" && (
              <div className="animate-fade-in">
                <DeliveryPanel strategy={analysis.deliveryStrategy} />
                <StackingPanel plan={analysis.stackingPlan} />
                <RegulatoryPanel
                  classifications={analysis.regulatoryClassifications}
                />
              </div>
            )}

            {/* Phenotype tab */}
            {activeTab === "phenotype" && (
              <div className="animate-fade-in">
                <PhenotypePanel
                  predictions={analysis.phenotypePredictions}
                  traitNames={traitNameMap}
                />
                <ExpressionProfilePanel
                  profiles={analysis.expressionProfiles}
                  geneNames={geneNameMap}
                />
                <WildRelativesPanel relatives={analysis.wildRelatives} />
              </div>
            )}

            {/* Pathways tab */}
            {activeTab === "pathways" && (
              <div className="animate-fade-in">
                <PathwayImpactPanel
                  impacts={analysis.pathwayImpacts}
                  geneNames={geneNameMap}
                />
              </div>
            )}

            {/* Risk & Safety tab */}
            {activeTab === "risk" && (
              <div className="animate-fade-in">
                <BiosafetySummary
                  riskScore={analysis.overallRiskScore}
                  concerns={analysis.biosafetyConcerns}
                />
                <LiteraturePanel
                  refs={analysis.literatureRefs}
                  geneNames={geneNameMap}
                />
              </div>
            )}

            {/* ── Navigation buttons ──────────────────────── */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={goBack}
                className="text-sm text-slate-500 hover:text-slate-300 font-body transition-colors flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to environments
              </button>
              <button
                onClick={startOver}
                className="text-sm font-body px-4 py-2 rounded-lg border border-[#1E293B] text-slate-400 hover:text-slate-200 hover:border-white/20 transition-all"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
