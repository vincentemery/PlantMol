// SDF/MOL V2000 format parser for molecular structure data

export interface ParsedAtom {
  x: number;
  y: number;
  z: number;
  element: string;
  index: number;
}

export interface ParsedBond {
  atom1: number;
  atom2: number;
  order: number;
}

export interface ParsedMolecule {
  atoms: ParsedAtom[];
  bonds: ParsedBond[];
}

export interface ElementData {
  color: string;
  radius: number;
}

export const ELEMENT_DATA: Record<string, ElementData> = {
  H:  { color: "#FFFFFF", radius: 0.25 },
  C:  { color: "#909090", radius: 0.35 },
  N:  { color: "#3050F8", radius: 0.35 },
  O:  { color: "#FF0D0D", radius: 0.33 },
  S:  { color: "#FFFF30", radius: 0.40 },
  P:  { color: "#FF8000", radius: 0.40 },
  Cl: { color: "#1FF01F", radius: 0.38 },
  Mg: { color: "#22C55E", radius: 0.35 },
  F:  { color: "#90E050", radius: 0.30 },
  Br: { color: "#A62929", radius: 0.42 },
};

const DEFAULT_ELEMENT: ElementData = { color: "#FF69B4", radius: 0.35 };

export function getElementData(element: string): ElementData {
  return ELEMENT_DATA[element] ?? DEFAULT_ELEMENT;
}

export function parseSDF(sdfText: string): ParsedMolecule {
  const lines = sdfText.split("\n");

  // Header is first 3 lines (indices 0, 1, 2)
  // Counts line is index 3
  if (lines.length < 4) {
    throw new Error("Invalid SDF: file too short");
  }

  const countsLine = lines[3];
  const numAtoms = parseInt(countsLine.substring(0, 3).trim(), 10);
  const numBonds = parseInt(countsLine.substring(3, 6).trim(), 10);

  if (isNaN(numAtoms) || isNaN(numBonds)) {
    throw new Error("Invalid SDF: could not parse atom/bond counts");
  }

  const atoms: ParsedAtom[] = [];
  const bonds: ParsedBond[] = [];

  // Parse atom block (starts at line 4)
  for (let i = 0; i < numAtoms; i++) {
    const line = lines[4 + i];
    if (!line) continue;

    // V2000 format: x(10.4) y(10.4) z(10.4) symbol(3 chars) ...
    const x = parseFloat(line.substring(0, 10).trim());
    const y = parseFloat(line.substring(10, 20).trim());
    const z = parseFloat(line.substring(20, 30).trim());
    const element = line.substring(31, 34).trim();

    atoms.push({ x, y, z, element, index: i });
  }

  // Parse bond block (starts after atom block)
  const bondStart = 4 + numAtoms;
  for (let i = 0; i < numBonds; i++) {
    const line = lines[bondStart + i];
    if (!line) continue;

    // V2000 format: atom1(3) atom2(3) bondOrder(3) ...
    const atom1 = parseInt(line.substring(0, 3).trim(), 10) - 1; // 1-indexed to 0-indexed
    const atom2 = parseInt(line.substring(3, 6).trim(), 10) - 1;
    const order = parseInt(line.substring(6, 9).trim(), 10);

    bonds.push({ atom1, atom2, order });
  }

  return { atoms, bonds };
}

/** Center the molecule at the origin by subtracting the centroid from all atom coordinates. */
export function centerMolecule(molecule: ParsedMolecule): ParsedMolecule {
  if (molecule.atoms.length === 0) return molecule;

  const cx = molecule.atoms.reduce((sum, a) => sum + a.x, 0) / molecule.atoms.length;
  const cy = molecule.atoms.reduce((sum, a) => sum + a.y, 0) / molecule.atoms.length;
  const cz = molecule.atoms.reduce((sum, a) => sum + a.z, 0) / molecule.atoms.length;

  return {
    atoms: molecule.atoms.map((a) => ({
      ...a,
      x: a.x - cx,
      y: a.y - cy,
      z: a.z - cz,
    })),
    bonds: molecule.bonds,
  };
}
