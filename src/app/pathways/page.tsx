import Link from "next/link";
import { pathways } from "@/data/pathways";
import { getMolecule } from "@/data/molecules";


export const metadata = {
  title: "Biosynthetic Pathways | PlantMol",
  description:
    "Interactive biosynthetic pathway visualizations for plant secondary metabolites.",
};

function PathwayStep({
  compound,
  enzyme,
  gene,
  ecNumber,
  showArrow,
  color,
}: {
  compound: string;
  enzyme?: string;
  gene?: string;
  ecNumber?: string;
  showArrow: boolean;
  color: string;
}) {
  return (
    <>
      {/* Arrow + enzyme label between steps */}
      {showArrow && (
        <div className="flex flex-col items-center gap-0.5 py-1">
          {/* Enzyme / gene label */}
          <div className="flex items-center gap-1.5">
            {enzyme && (
              <span
                className="text-[11px] font-mono font-semibold"
                style={{ color }}
              >
                {enzyme}
              </span>
            )}
            {gene && gene !== enzyme && (
              <span className="text-[10px] font-mono text-slate-500">
                ({gene})
              </span>
            )}
          </div>
          {ecNumber && (
            <span className="text-[9px] font-mono text-slate-600">
              EC {ecNumber}
            </span>
          )}
          {/* Arrow line */}
          <div className="flex flex-col items-center">
            <div className="w-px h-4" style={{ backgroundColor: color }} />
            <div
              className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px]"
              style={{ borderTopColor: color }}
            />
          </div>
        </div>
      )}

      {/* Compound box */}
      <div
        className="relative rounded-lg border px-4 py-2.5 text-center bg-[#111827] transition-colors hover:bg-[#1a2235]"
        style={{ borderColor: `${color}40` }}
      >
        <span className="text-sm font-body text-slate-200">{compound}</span>
      </div>
    </>
  );
}

function BranchArrow({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 ml-6 my-1">
      {/* Horizontal branch line */}
      <div className="flex items-center gap-0">
        <div className="w-6 h-px" style={{ backgroundColor: `${color}50` }} />
        <div
          className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[5px]"
          style={{ borderLeftColor: `${color}50` }}
        />
      </div>
      <span className="text-[11px] font-mono text-slate-500 italic">
        {label}
      </span>
    </div>
  );
}

export default function PathwaysPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E]">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Page header */}
        <div className="mb-16">
          <h1 className="text-4xl font-display font-bold text-slate-100 tracking-tight sm:text-5xl">
            Biosynthetic Pathways
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-400 font-body">
            Plant secondary metabolites are assembled through elaborate enzymatic
            cascades. Each pathway converts simple precursors into structurally
            complex molecules through a series of precisely ordered reactions
            catalyzed by specific enzymes encoded in the plant genome.
          </p>
        </div>

        {/* Pathway sections */}
        <div className="space-y-20">
          {pathways.map((pathway) => {
            const linkedMolecules = pathway.moleculeIds
              .map((id) => getMolecule(id))
              .filter(Boolean);

            // Build a lookup of which steps have branches
            const branchLookup: Record<string, typeof pathway.branchPoints> = {};
            for (const bp of pathway.branchPoints) {
              if (!branchLookup[bp.fromStep]) branchLookup[bp.fromStep] = [];
              branchLookup[bp.fromStep].push(bp);
            }

            return (
              <section key={pathway.id} id={pathway.id}>
                {/* Pathway title */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-1 h-8 rounded-full"
                      style={{ backgroundColor: pathway.color }}
                    />
                    <h2
                      className="text-2xl font-display font-bold tracking-tight sm:text-3xl"
                      style={{ color: pathway.color }}
                    >
                      {pathway.name}
                    </h2>
                  </div>
                  <p className="max-w-4xl text-sm leading-relaxed text-slate-400 font-body">
                    {pathway.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Pathway flow diagram */}
                  <div className="lg:col-span-2 rounded-xl border border-[#1E293B] bg-[#111827]/60 p-6 backdrop-blur-sm">
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-6">
                      Reaction Flow
                    </h3>

                    <div className="flex flex-col items-start max-w-md mx-auto">
                      {pathway.steps.map((step, idx) => (
                        <div key={step.id} className="w-full">
                          <PathwayStep
                            compound={step.compound}
                            enzyme={step.enzyme}
                            gene={step.gene}
                            ecNumber={step.ecNumber}
                            showArrow={idx > 0 && !!step.arrow}
                            color={pathway.color}
                          />

                          {/* Render branch points that originate from this step */}
                          {branchLookup[step.id]?.map((bp, bpIdx) => (
                            <BranchArrow
                              key={`${step.id}-branch-${bpIdx}`}
                              label={bp.label}
                              color={pathway.color}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sidebar: end products + linked molecules */}
                  <div className="space-y-6">
                    {/* End products */}
                    <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-5">
                      <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                        End Products
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {pathway.endProducts.map((product) => (
                          <span
                            key={product}
                            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-mono font-medium"
                            style={{
                              backgroundColor: `${pathway.color}15`,
                              color: pathway.color,
                              border: `1px solid ${pathway.color}30`,
                            }}
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Linked molecules */}
                    {linkedMolecules.length > 0 && (
                      <div className="rounded-xl border border-[#1E293B] bg-[#111827]/60 p-5">
                        <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
                          Molecules in Our Database
                        </h3>
                        <div className="space-y-3">
                          {linkedMolecules.map((mol) =>
                            mol ? (
                              <Link
                                key={mol.id}
                                href={`/molecules/${mol.id}`}
                                className="group block rounded-lg border border-[#1E293B] bg-[#0A0F1E] p-3 transition-all hover:border-[#334155] hover:bg-[#111827]"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <p
                                      className="text-sm font-display font-semibold transition-colors"
                                      style={{ color: mol.color }}
                                    >
                                      {mol.commonName || mol.name}
                                    </p>
                                    <p className="mt-0.5 text-[11px] font-mono text-slate-500">
                                      {mol.formula} &middot;{" "}
                                      {mol.molecularWeight.toFixed(1)} Da
                                    </p>
                                  </div>
                                  <span
                                    className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-mono"
                                    style={{
                                      backgroundColor: `${mol.color}15`,
                                      color: mol.color,
                                    }}
                                  >
                                    {mol.categoryLabel}
                                  </span>
                                </div>
                                <p className="mt-2 text-xs text-slate-500 font-body line-clamp-2 group-hover:text-slate-400 transition-colors">
                                  {mol.description}
                                </p>
                              </Link>
                            ) : null
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

    </div>
  );
}
