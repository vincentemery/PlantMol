import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/molecules", label: "Molecules" },
  { href: "/pathways", label: "Pathways" },
  { href: "/genomes", label: "Genomes" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1E293B] bg-[#070B14]">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Branding */}
          <div>
            <Link href="/" className="group flex items-center gap-2">
              <span className="text-xl font-display font-bold text-slate-100 tracking-tight">
                Plant<span className="text-emerald-400">Mol</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 font-body max-w-xs">
              Exploring the molecular genomics of plant secondary metabolites
              &#8212; from gene to molecule to function.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-slate-100 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-500 mb-4">
              Disclaimer
            </h3>
            <p className="text-sm leading-relaxed text-slate-500 font-body">
              Built for research demonstration purposes. Molecular structures,
              genomic coordinates, and pathway data are representative and
              simplified for educational use.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-[#1E293B] pt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-600 font-mono">
            &copy; {new Date().getFullYear()} PlantMol. Built with Next.js.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            A molecular genomics demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
