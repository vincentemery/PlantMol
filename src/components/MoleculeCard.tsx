import Link from "next/link";
import type { Molecule } from "@/data/molecules";

export function MoleculeCard({ molecule }: { molecule: Molecule }) {
  return (
    <Link
      href={`/molecules/${molecule.id}`}
      className="group relative block rounded-xl border border-card-border bg-card p-5 transition-all duration-300 hover:border-transparent hover:shadow-lg"
      style={
        {
          "--accent": molecule.color,
        } as React.CSSProperties
      }
    >
      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 1px 0 0 ${molecule.color}40, 0 0 20px ${molecule.color}15`,
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full"
        style={{ backgroundColor: molecule.color }}
      />

      <div className="relative">
        {/* Category badge */}
        <span
          className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium mb-3"
          style={{
            backgroundColor: `${molecule.color}18`,
            color: molecule.color,
          }}
        >
          {molecule.categoryLabel}
        </span>

        {/* Molecule name */}
        <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-white transition-colors">
          {molecule.commonName || molecule.name}
        </h3>

        {/* Formula */}
        <p className="font-mono text-sm text-text-secondary mt-1">
          {molecule.formula}
        </p>

        {/* Molecular weight */}
        <p className="text-xs text-text-secondary mt-1">
          MW: {molecule.molecularWeight.toFixed(2)} g/mol
        </p>

        {/* Plant sources */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {molecule.plants.slice(0, 2).map((plant) => (
            <span
              key={plant.species}
              className="inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-text-secondary"
            >
              {plant.commonName}
            </span>
          ))}
          {molecule.plants.length > 2 && (
            <span className="inline-block rounded-md bg-white/5 px-2 py-0.5 text-xs text-text-secondary">
              +{molecule.plants.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
