export interface PathwayStep {
  id: string;
  compound: string;
  enzyme?: string;
  gene?: string;
  ecNumber?: string;
  arrow?: boolean;
}

export interface Pathway {
  id: string;
  name: string;
  description: string;
  color: string;
  steps: PathwayStep[];
  branchPoints: { fromStep: string; toPathway: string; label: string }[];
  endProducts: string[];
  moleculeIds: string[]; // links to molecules in our database
}

export const pathways: Pathway[] = [
  {
    id: "phenylpropanoid",
    name: "Phenylpropanoid Pathway",
    description:
      "The phenylpropanoid pathway is one of the most important metabolic pathways in plants, converting phenylalanine into a vast array of secondary metabolites including flavonoids, anthocyanins, stilbenes, and lignins. It begins with the deamination of L-phenylalanine by PAL and produces compounds essential for UV protection, pigmentation, pathogen defense, and structural support.",
    color: "#EC4899",
    steps: [
      { id: "phe", compound: "L-Phenylalanine" },
      { id: "ca", compound: "trans-Cinnamic acid", enzyme: "PAL", gene: "PAL", ecNumber: "4.3.1.24", arrow: true },
      { id: "pca", compound: "p-Coumaric acid", enzyme: "C4H", gene: "C4H", ecNumber: "1.14.14.91", arrow: true },
      { id: "pcoa", compound: "p-Coumaroyl-CoA", enzyme: "4CL", gene: "4CL", ecNumber: "6.2.1.12", arrow: true },
      { id: "chalcone", compound: "Naringenin chalcone", enzyme: "CHS", gene: "CHS", ecNumber: "2.3.1.74", arrow: true },
      { id: "naringenin", compound: "Naringenin", enzyme: "CHI", gene: "CHI", ecNumber: "5.5.1.6", arrow: true },
      { id: "dhk", compound: "Dihydrokaempferol", enzyme: "F3H", gene: "F3H", ecNumber: "1.14.11.9", arrow: true },
      { id: "dhq", compound: "Dihydroquercetin", enzyme: "F3'H", gene: "F3'H", ecNumber: "1.14.14.82", arrow: true },
      { id: "leuco", compound: "Leucocyanidin", enzyme: "DFR", gene: "DFR", ecNumber: "1.1.1.219", arrow: true },
      { id: "cyanidin", compound: "Cyanidin", enzyme: "ANS/LDOX", gene: "ANS", ecNumber: "1.14.20.4", arrow: true },
      { id: "c3g", compound: "Cyanidin-3-glucoside", enzyme: "UFGT", gene: "3GT", ecNumber: "2.4.1.115", arrow: true },
    ],
    branchPoints: [
      { fromStep: "pcoa", toPathway: "stilbenoid", label: "STS → Stilbenes (Resveratrol)" },
      { fromStep: "pcoa", toPathway: "lignin", label: "CCR/CAD → Lignin biosynthesis" },
      { fromStep: "naringenin", toPathway: "flavone", label: "FNS → Flavones" },
      { fromStep: "dhk", toPathway: "flavonol", label: "FLS → Flavonols (Kaempferol, Quercetin)" },
    ],
    endProducts: ["Anthocyanins", "Flavonoids", "Stilbenes", "Lignin", "Flavonols"],
    moleculeIds: ["resveratrol", "cyanidin"],
  },
  {
    id: "terpenoid",
    name: "Terpenoid / Isoprenoid Pathway",
    description:
      "Terpenoids are the largest class of plant natural products, with over 80,000 known structures. They are built from C5 isoprene units (IPP and DMAPP) produced by two independent pathways: the cytosolic MVA (mevalonate) pathway and the plastidial MEP (methylerythritol phosphate) pathway. These precursors are assembled into monoterpenes (C10), sesquiterpenes (C15), diterpenes (C20), and tetraterpenes (C40).",
    color: "#10B981",
    steps: [
      { id: "pyruvate", compound: "Pyruvate + G3P" },
      { id: "dxp", compound: "1-Deoxy-D-xylulose 5-phosphate", enzyme: "DXS", gene: "DXS", ecNumber: "2.2.1.7", arrow: true },
      { id: "mep", compound: "2-C-Methyl-D-erythritol 4-phosphate", enzyme: "DXR", gene: "DXR", ecNumber: "1.1.1.267", arrow: true },
      { id: "ipp", compound: "IPP / DMAPP (C5 units)", enzyme: "HDR", gene: "HDR", ecNumber: "1.17.7.4", arrow: true },
      { id: "gpp", compound: "Geranyl diphosphate (GPP, C10)", enzyme: "GPPS", gene: "GPPS", ecNumber: "2.5.1.1", arrow: true },
      { id: "fpp", compound: "Farnesyl diphosphate (FPP, C15)", enzyme: "FPPS", gene: "FPPS", ecNumber: "2.5.1.10", arrow: true },
      { id: "ggpp", compound: "Geranylgeranyl diphosphate (GGPP, C20)", enzyme: "GGPPS", gene: "GGPPS", ecNumber: "2.5.1.29", arrow: true },
    ],
    branchPoints: [
      { fromStep: "gpp", toPathway: "monoterpene", label: "TPS → Monoterpenes (Menthol, Linalool)" },
      { fromStep: "fpp", toPathway: "sesquiterpene", label: "TPS → Sesquiterpenes (Artemisinin)" },
      { fromStep: "ggpp", toPathway: "diterpene", label: "TPS → Diterpenes (Taxol)" },
      { fromStep: "ggpp", toPathway: "carotenoid", label: "PSY → Carotenoids (β-Carotene)" },
      { fromStep: "ggpp", toPathway: "chlorophyll", label: "CHLG → Chlorophyll" },
    ],
    endProducts: ["Monoterpenes", "Sesquiterpenes", "Diterpenes", "Carotenoids", "Chlorophyll"],
    moleculeIds: ["menthol", "artemisinin", "taxol", "beta-carotene", "chlorophyll-a"],
  },
  {
    id: "alkaloid",
    name: "Alkaloid Biosynthesis Pathways",
    description:
      "Alkaloids are nitrogen-containing secondary metabolites derived from amino acid precursors. Unlike terpenoids and phenylpropanoids, alkaloids do not share a single unified pathway — instead, they arise from diverse amino acid starting points. The three major routes are: purine alkaloids (from xanthosine → caffeine), pyridine alkaloids (from nicotinic acid + putrescine → nicotine), and capsaicinoids (from phenylpropanoid + fatty acid junction → capsaicin).",
    color: "#8B5CF6",
    steps: [
      { id: "amino", compound: "Amino Acid Precursors" },
      { id: "xanthosine", compound: "Xanthosine (purine path)", arrow: true },
      { id: "7mx", compound: "7-Methylxanthine", enzyme: "XMT", gene: "XMT", ecNumber: "2.1.1.158", arrow: true },
      { id: "theobromine", compound: "Theobromine", enzyme: "MXMT", gene: "MXMT", ecNumber: "2.1.1.159", arrow: true },
      { id: "caffeine-step", compound: "Caffeine", enzyme: "DXMT", gene: "TCS1", ecNumber: "2.1.1.160", arrow: true },
    ],
    branchPoints: [
      { fromStep: "amino", toPathway: "nicotine-path", label: "Putrescine + Nicotinic acid → Nicotine" },
      { fromStep: "amino", toPathway: "capsaicin-path", label: "Vanillylamine + Fatty acyl-CoA → Capsaicin" },
    ],
    endProducts: ["Caffeine", "Nicotine", "Capsaicin", "Morphine", "Berberine"],
    moleculeIds: ["caffeine", "nicotine", "capsaicin"],
  },
];
