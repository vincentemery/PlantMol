"use client";

import { useState, useMemo } from "react";
import { molecules, categories } from "@/data/molecules";
import { MoleculeCard } from "@/components/MoleculeCard";

export default function MoleculesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return molecules.filter((m) => {
      const matchCategory =
        activeCategory === "all" || m.category === activeCategory;
      const matchSearch =
        search === "" ||
        (m.commonName || m.name).toLowerCase().includes(search.toLowerCase()) ||
        m.formula.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="font-display text-4xl font-bold text-text-primary">
            Molecule Library
          </h1>
          <p className="mt-2 text-text-secondary max-w-xl">
            Browse plant secondary metabolites by category. Each molecule links
            to its biosynthetic pathway and genomic context.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 animate-fade-in delay-100">
          <div className="relative max-w-md">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search molecules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-card-border bg-card pl-10 pr-4 text-sm text-text-primary placeholder-text-secondary outline-none transition-colors focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2 animate-fade-in delay-200">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow-lg"
                    : "border border-card-border bg-card text-text-secondary hover:text-text-primary hover:border-text-secondary"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: cat.color,
                        boxShadow: `0 4px 14px ${cat.color}40`,
                      }
                    : undefined
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-text-secondary">
          Showing {filtered.length} molecule{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((molecule, i) => (
              <div
                key={molecule.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <MoleculeCard molecule={molecule} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-card-border bg-card p-16 text-center">
            <p className="text-text-secondary">
              No molecules match your search.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
