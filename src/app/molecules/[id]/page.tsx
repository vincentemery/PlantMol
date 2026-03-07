import Link from "next/link";
import { notFound } from "next/navigation";
import { molecules, getMolecule } from "@/data/molecules";
import MoleculeViewer3DWrapper from "@/components/MoleculeViewer3DWrapper";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return molecules.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const molecule = getMolecule(id);
  if (!molecule) return { title: "Molecule Not Found" };
  return {
    title: `${molecule.commonName || molecule.name} — PlantMol`,
    description: molecule.description.slice(0, 160),
  };
}

export default async function MoleculeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const molecule = getMolecule(id);
  if (!molecule) notFound();

  const currentIndex = molecules.findIndex((m) => m.id === id);
  const prev = currentIndex > 0 ? molecules[currentIndex - 1] : null;
  const next =
    currentIndex < molecules.length - 1 ? molecules[currentIndex + 1] : null;

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/molecules"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-emerald-400 transition-colors mb-8"
        >
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Library
        </Link>

        {/* Header */}
        <header className="mb-10 animate-fade-in">
          <div className="flex items-start gap-4">
            <div
              className="mt-1 h-3 w-3 rounded-full shrink-0 animate-glow-pulse"
              style={{
                backgroundColor: molecule.color,
                boxShadow: `0 0 12px ${molecule.color}80`,
              }}
            />
            <div className="min-w-0">
              <span
                className="inline-block rounded-full px-3 py-0.5 text-xs font-medium mb-2"
                style={{
                  backgroundColor: `${molecule.color}18`,
                  color: molecule.color,
                }}
              >
                {molecule.categoryLabel}
              </span>
              <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                {molecule.commonName || molecule.name}
              </h1>
              {molecule.commonName && (
                <p className="font-mono text-sm text-text-secondary mt-1">
                  {molecule.name}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                <span className="font-mono">{molecule.formula}</span>
                <span className="text-card-border">|</span>
                <span>MW: {molecule.molecularWeight.toFixed(2)} g/mol</span>
              </div>
            </div>
          </div>
        </header>

        {/* 3D Structure Viewer */}
        <section className="mb-10 animate-fade-in-up">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            3D Structure
          </h2>
          <div className="rounded-xl border border-card-border overflow-hidden" style={{ height: 500 }}>
            <MoleculeViewer3DWrapper pubchemCid={molecule.pubchemCid} color={molecule.color} />
          </div>
          <p className="mt-2 text-xs text-text-secondary font-body">
            Data from PubChem (CID: {molecule.pubchemCid}). Rotate: drag | Zoom: scroll | Pan: right-drag
          </p>
        </section>

        {/* Description */}
        <section className="mb-8 animate-fade-in-up delay-100">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            Description
          </h2>
          <p className="text-text-secondary leading-relaxed">
            {molecule.description}
          </p>
        </section>

        {/* Biological Function */}
        <section className="mb-8 animate-fade-in-up delay-200">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            Biological Function
          </h2>
          <p className="text-text-secondary leading-relaxed">
            {molecule.function}
          </p>
        </section>

        {/* Plant Sources */}
        <section className="mb-8 animate-fade-in-up delay-300">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            Plant Sources
          </h2>
          <div className="overflow-hidden rounded-xl border border-card-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border bg-card">
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">
                    Species
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">
                    Common Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary">
                    Tissue
                  </th>
                </tr>
              </thead>
              <tbody>
                {molecule.plants.map((plant, i) => (
                  <tr
                    key={plant.species}
                    className={
                      i < molecule.plants.length - 1
                        ? "border-b border-card-border"
                        : ""
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs text-text-primary italic">
                      {plant.species}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {plant.commonName}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {plant.tissue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Biosynthetic Genes */}
        <section className="mb-8 animate-fade-in-up delay-400">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            Biosynthetic Genes
          </h2>
          <div className="overflow-x-auto rounded-xl border border-card-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-card-border bg-card">
                  <th className="px-4 py-3 text-left font-medium text-text-secondary whitespace-nowrap">
                    Gene
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary whitespace-nowrap">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary whitespace-nowrap">
                    Enzyme
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary whitespace-nowrap">
                    EC Number
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-text-secondary whitespace-nowrap">
                    Organism
                  </th>
                </tr>
              </thead>
              <tbody>
                {molecule.genes.map((gene, i) => (
                  <tr
                    key={gene.name}
                    className={
                      i < molecule.genes.length - 1
                        ? "border-b border-card-border"
                        : ""
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-emerald-400 whitespace-nowrap">
                      {gene.name}
                    </td>
                    <td className="px-4 py-3 text-text-primary whitespace-nowrap">
                      {gene.fullName}
                    </td>
                    <td className="px-4 py-3 text-text-secondary whitespace-nowrap">
                      {gene.enzyme}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-secondary whitespace-nowrap">
                      {gene.ecNumber || "—"}
                    </td>
                    <td className="px-4 py-3 text-text-secondary italic whitespace-nowrap">
                      {gene.organism || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pathway Link */}
        <section className="mb-8 animate-fade-in-up delay-500">
          <h2 className="font-display text-lg font-semibold text-text-primary mb-3">
            Biosynthetic Pathway
          </h2>
          <Link
            href={`/pathways/${molecule.pathwayId}`}
            className="inline-flex items-center gap-3 rounded-xl border border-card-border bg-card px-5 py-4 transition-all hover:border-emerald-500/30 hover:bg-white/5 group"
          >
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: molecule.color }}
            />
            <div>
              <p className="text-sm font-medium text-text-primary group-hover:text-emerald-400 transition-colors">
                {molecule.pathway}
              </p>
              <p className="text-xs text-text-secondary">
                View full pathway with enzymatic steps
              </p>
            </div>
            <svg
              className="ml-auto text-text-secondary group-hover:text-emerald-400 transition-colors"
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
        </section>

        {/* Fun Fact */}
        <section className="mb-12 animate-fade-in-up delay-600">
          <div
            className="rounded-xl border p-6"
            style={{
              borderColor: `${molecule.color}30`,
              backgroundColor: `${molecule.color}08`,
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">*</span>
              <div>
                <h3
                  className="font-display text-sm font-semibold mb-2"
                  style={{ color: molecule.color }}
                >
                  Fun Fact
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {molecule.funFact}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prev/Next Navigation */}
        <nav className="flex items-center justify-between border-t border-card-border pt-8">
          {prev ? (
            <Link
              href={`/molecules/${prev.id}`}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-emerald-400 transition-colors"
            >
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
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              <span>{prev.commonName || prev.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/molecules/${next.id}`}
              className="group flex items-center gap-2 text-sm text-text-secondary hover:text-emerald-400 transition-colors"
            >
              <span>{next.commonName || next.name}</span>
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
          ) : (
            <div />
          )}
        </nav>
      </div>
    </main>
  );
}
