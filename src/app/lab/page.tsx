"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { molecules } from "@/data/molecules";

const MoleculeViewer3D = dynamic(
  () => import("@/components/MoleculeViewer3D"),
  { ssr: false }
);

export default function LabPage() {
  const [selectedId, setSelectedId] = useState(molecules[0].id);
  const [compareMode, setCompareMode] = useState(false);
  const [compareId, setCompareId] = useState(molecules[1].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const selected = molecules.find((m) => m.id === selectedId) ?? molecules[0];
  const compared = molecules.find((m) => m.id === compareId) ?? molecules[1];

  return (
    <main className="min-h-screen bg-[#0A0F1E]">
      {/* Header */}
      <div className="border-b border-[#1E293B] px-4 sm:px-6 lg:px-8 py-6">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-100">
              Virtual Lab
            </h1>
            <p className="text-sm text-slate-400 font-body mt-1">
              Explore plant molecules in 3D
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Compare toggle */}
            <button
              onClick={() => setCompareMode(!compareMode)}
              className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              style={
                compareMode
                  ? {
                      borderColor: selected.color,
                      backgroundColor: `${selected.color}15`,
                      color: selected.color,
                    }
                  : {
                      borderColor: "#1E293B",
                      color: "#94A3B8",
                    }
              }
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="8" height="18" rx="1" />
                <rect x="14" y="3" width="8" height="18" rx="1" />
              </svg>
              Compare
            </button>

            {/* Sidebar toggle (mobile) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg border border-[#1E293B] px-3 py-2 text-sm text-slate-400 hover:text-slate-100 transition-colors lg:hidden"
            >
              {sidebarOpen ? "Hide Info" : "Show Info"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main viewer area */}
          <div className="flex-1 min-w-0">
            {/* Molecule selectors */}
            <div className={`flex gap-4 mb-4 ${compareMode ? "flex-col sm:flex-row" : ""}`}>
              <div className="flex-1">
                <label className="block text-xs text-slate-400 mb-1.5 font-body">
                  {compareMode ? "Molecule A" : "Select Molecule"}
                </label>
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full rounded-lg border border-[#1E293B] bg-[#111827] px-3 py-2 text-sm text-slate-100 font-body focus:outline-none focus:border-emerald-500"
                >
                  {molecules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.commonName || m.name}
                    </option>
                  ))}
                </select>
              </div>
              {compareMode && (
                <div className="flex-1">
                  <label className="block text-xs text-slate-400 mb-1.5 font-body">
                    Molecule B
                  </label>
                  <select
                    value={compareId}
                    onChange={(e) => setCompareId(e.target.value)}
                    className="w-full rounded-lg border border-[#1E293B] bg-[#111827] px-3 py-2 text-sm text-slate-100 font-body focus:outline-none focus:border-emerald-500"
                  >
                    {molecules.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.commonName || m.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Viewer(s) */}
            {compareMode ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#1E293B] overflow-hidden" style={{ height: "calc(80vh - 160px)", minHeight: 400 }}>
                  <MoleculeViewer3D pubchemCid={selected.pubchemCid} color={selected.color} />
                </div>
                <div className="rounded-xl border border-[#1E293B] overflow-hidden" style={{ height: "calc(80vh - 160px)", minHeight: 400 }}>
                  <MoleculeViewer3D pubchemCid={compared.pubchemCid} color={compared.color} />
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-[#1E293B] overflow-hidden" style={{ height: "calc(80vh - 120px)", minHeight: 500 }}>
                <MoleculeViewer3D pubchemCid={selected.pubchemCid} color={selected.color} />
              </div>
            )}
          </div>

          {/* Info sidebar */}
          {sidebarOpen && (
            <aside className="w-full lg:w-80 shrink-0">
              <MoleculeInfoCard molecule={selected} label={compareMode ? "Molecule A" : undefined} />
              {compareMode && (
                <div className="mt-4">
                  <MoleculeInfoCard molecule={compared} label="Molecule B" />
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}

function MoleculeInfoCard({
  molecule,
  label,
}: {
  molecule: (typeof molecules)[number];
  label?: string;
}) {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#111827] p-5">
      {label && (
        <p className="text-xs text-slate-400 font-body mb-2">{label}</p>
      )}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: molecule.color }}
        />
        <h3 className="font-display text-base font-semibold text-slate-100">
          {molecule.commonName || molecule.name}
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Formula</span>
          <span className="font-mono text-slate-100">{molecule.formula}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">MW</span>
          <span className="text-slate-100">
            {molecule.molecularWeight.toFixed(2)} g/mol
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Category</span>
          <span
            className="text-xs rounded-full px-2 py-0.5"
            style={{
              backgroundColor: `${molecule.color}18`,
              color: molecule.color,
            }}
          >
            {molecule.categoryLabel}
          </span>
        </div>
      </div>

      <div className="border-t border-[#1E293B] mt-4 pt-4">
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-4 font-body">
          {molecule.description}
        </p>
      </div>

      {/* Plant sources (first 2) */}
      {molecule.plants.length > 0 && (
        <div className="border-t border-[#1E293B] mt-4 pt-4">
          <p className="text-xs text-slate-400 font-medium mb-2">
            Plant Sources
          </p>
          <div className="space-y-1.5">
            {molecule.plants.slice(0, 2).map((plant) => (
              <div key={plant.species} className="text-xs">
                <span className="text-slate-100 italic">{plant.species}</span>
                <span className="text-slate-400 ml-1">
                  ({plant.commonName})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/molecules/${molecule.id}`}
        className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-[#1E293B] px-3 py-2 text-xs font-medium text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
      >
        View Full Details
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
