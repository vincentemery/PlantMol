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
    moleculeIds: ["resveratrol", "cyanidin", "quercetin", "kaempferol", "epigallocatechin-gallate", "curcumin", "rosmarinic-acid", "genistein"],
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
      { fromStep: "ipp", toPathway: "mevalonate", label: "IPP ↔ DMAPP shared with cytosolic MVA pathway" },
    ],
    endProducts: ["Monoterpenes", "Sesquiterpenes", "Diterpenes", "Carotenoids", "Chlorophyll"],
    moleculeIds: ["menthol", "artemisinin", "taxol", "beta-carotene", "chlorophyll-a", "limonene", "linalool", "steviol", "cannabidiol", "thymol"],
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
      { fromStep: "amino", toPathway: "bia", label: "Tyrosine → BIA pathway (Morphine, Berberine)" },
      { fromStep: "amino", toPathway: "mia", label: "Tryptophan → MIA pathway (Vinblastine, Quinine)" },
    ],
    endProducts: ["Caffeine", "Nicotine", "Capsaicin", "Morphine", "Berberine"],
    moleculeIds: ["caffeine", "nicotine", "capsaicin", "theobromine", "colchicine"],
  },
  {
    id: "shikimate",
    name: "Shikimate Pathway",
    description:
      "The shikimate pathway produces aromatic amino acids (phenylalanine, tyrosine, tryptophan) that feed into phenylpropanoid, alkaloid, and other secondary metabolite pathways. Present in plants but absent in animals, making it a key herbicide target (glyphosate).",
    color: "#0EA5E9",
    steps: [
      { id: "pep-e4p", compound: "PEP + E4P" },
      { id: "dahp", compound: "DAHP", enzyme: "DAHPS", gene: "DAHPS", ecNumber: "2.5.1.54", arrow: true },
      { id: "dhq", compound: "3-Dehydroquinate", enzyme: "DHQ synthase", gene: "DHQS", ecNumber: "4.2.3.4", arrow: true },
      { id: "dhs", compound: "3-Dehydroshikimate", enzyme: "DHQ dehydratase", gene: "DHD", ecNumber: "4.2.1.10", arrow: true },
      { id: "shikimate-step", compound: "Shikimate", enzyme: "Shikimate DH", gene: "SDH", ecNumber: "1.1.1.25", arrow: true },
      { id: "s3p", compound: "Shikimate-3-phosphate", enzyme: "Shikimate kinase", gene: "SK", ecNumber: "2.7.1.71", arrow: true },
      { id: "epsp", compound: "EPSP", enzyme: "EPSPS", gene: "EPSPS", ecNumber: "2.5.1.19", arrow: true },
      { id: "chorismate", compound: "Chorismate", enzyme: "Chorismate synthase", gene: "CS", ecNumber: "4.2.3.5", arrow: true },
    ],
    branchPoints: [
      { fromStep: "chorismate", toPathway: "phenylpropanoid", label: "Chorismate → Phenylalanine (to phenylpropanoid pathway)" },
      { fromStep: "chorismate", toPathway: "mia", label: "Chorismate → Tryptophan (to MIA pathway)" },
      { fromStep: "chorismate", toPathway: "bia", label: "Chorismate → Tyrosine (to BIA pathway)" },
      { fromStep: "dhs", toPathway: "tannin", label: "3-Dehydroshikimate → Gallic acid (to tannins)" },
    ],
    endProducts: ["Phenylalanine", "Tyrosine", "Tryptophan", "Gallic acid", "Folate"],
    moleculeIds: [],
  },
  {
    id: "bia",
    name: "Benzylisoquinoline Alkaloid (BIA) Pathway",
    description:
      "The BIA pathway produces over 2,500 structurally diverse alkaloids from tyrosine, including the opiates (morphine, codeine), antimicrobials (berberine), and muscle relaxants (tubocurarine). The pathway begins with the condensation of dopamine and 4-hydroxyphenylacetaldehyde by norcoclaurine synthase.",
    color: "#DC2626",
    steps: [
      { id: "tyrosine", compound: "L-Tyrosine" },
      { id: "dopamine-4hpaa", compound: "Dopamine + 4-HPAA", enzyme: "TYDC", gene: "TYDC", ecNumber: "4.1.1.25", arrow: true },
      { id: "norcoclaurine", compound: "(S)-Norcoclaurine", enzyme: "NCS", gene: "NCS", ecNumber: "4.2.1.78", arrow: true },
      { id: "coclaurine", compound: "(S)-Coclaurine", enzyme: "6OMT", gene: "6OMT", ecNumber: "2.1.1.-", arrow: true },
      { id: "n-methylcoclaurine", compound: "(S)-N-Methylcoclaurine", enzyme: "CNMT", gene: "CNMT", arrow: true },
      { id: "3h-n-methylcoclaurine", compound: "(S)-3'-Hydroxy-N-methylcoclaurine", enzyme: "CYP80B1", gene: "CYP80B1", arrow: true },
      { id: "reticuline", compound: "(S)-Reticuline", enzyme: "4'OMT", gene: "4OMT", arrow: true },
    ],
    branchPoints: [
      { fromStep: "reticuline", toPathway: "morphine-branch", label: "SalSyn/CYP719B1 → Morphine branch" },
      { fromStep: "reticuline", toPathway: "berberine-branch", label: "BBE → Berberine branch" },
      { fromStep: "reticuline", toPathway: "sanguinarine-branch", label: "Reticuline → Sanguinarine branch" },
    ],
    endProducts: ["Morphine", "Codeine", "Berberine", "Sanguinarine", "Papaverine"],
    moleculeIds: ["morphine", "berberine"],
  },
  {
    id: "mia",
    name: "Monoterpene Indole Alkaloid (MIA) Pathway",
    description:
      "The MIA pathway combines the shikimate-derived tryptamine with the MEP-derived iridoid secologanin to produce over 3,000 structurally complex alkaloids. This includes some of the most valuable pharmaceutical compounds: the anticancer drugs vinblastine and vincristine, the antimalarial quinine, and the antihypertensive ajmaline.",
    color: "#7C3AED",
    steps: [
      { id: "tryptophan", compound: "Tryptophan" },
      { id: "tryptamine", compound: "Tryptamine", enzyme: "TDC", gene: "TDC", ecNumber: "4.1.1.28", arrow: true },
      { id: "strictosidine", compound: "Strictosidine", enzyme: "STR", gene: "STR", ecNumber: "4.3.3.2", arrow: true },
      { id: "cathenamine", compound: "Cathenamine", enzyme: "SGD", gene: "SGD", arrow: true },
      { id: "ajmalicine", compound: "Ajmalicine", arrow: true },
      { id: "tabersonine", compound: "Tabersonine", enzyme: "Various CYPs", arrow: true },
      { id: "vindoline", compound: "Vindoline", arrow: true },
      { id: "vinblastine-step", compound: "Vinblastine", enzyme: "PRX1", gene: "PRX1", arrow: true },
    ],
    branchPoints: [
      { fromStep: "strictosidine", toPathway: "ajmalicine-branch", label: "Strictosidine → Ajmalicine branch" },
      { fromStep: "strictosidine", toPathway: "catharanthine-branch", label: "Strictosidine → Catharanthine branch" },
      { fromStep: "tryptamine", toPathway: "terpenoid", label: "Geraniol → Secologanin (iridoid sub-pathway from MEP/terpenoid)" },
    ],
    endProducts: ["Vinblastine", "Vincristine", "Quinine", "Ajmaline", "Camptothecin"],
    moleculeIds: ["vinblastine", "quinine"],
  },
  {
    id: "carotenoid-pathway",
    name: "Carotenoid Pathway",
    description:
      "The carotenoid pathway branches from GGPP (C40) to produce over 750 natural carotenoids that serve as photosynthetic accessory pigments, photoprotectors, and precursors of signaling molecules (ABA, strigolactones). Carotenoids are synthesized in plastids via head-to-head condensation of two GGPP molecules.",
    color: "#F97316",
    steps: [
      { id: "ggpp-x2", compound: "2x GGPP" },
      { id: "phytoene", compound: "Phytoene", enzyme: "PSY", gene: "PSY", ecNumber: "2.5.1.32", arrow: true },
      { id: "zeta-carotene", compound: "\u03B6-Carotene", enzyme: "PDS", gene: "PDS", ecNumber: "1.3.5.5", arrow: true },
      { id: "lycopene", compound: "Lycopene", enzyme: "ZDS + CRTISO", gene: "ZDS", ecNumber: "1.3.5.6", arrow: true },
      { id: "beta-carotene-step", compound: "\u03B2-Carotene", enzyme: "LCYB", gene: "LCYB", ecNumber: "5.5.1.19", arrow: true },
      { id: "zeaxanthin", compound: "Zeaxanthin", enzyme: "BCH", gene: "BCH", ecNumber: "1.14.15.24", arrow: true },
      { id: "violaxanthin", compound: "Violaxanthin", enzyme: "ZEP", gene: "ZEP", ecNumber: "1.14.15.21", arrow: true },
    ],
    branchPoints: [
      { fromStep: "lycopene", toPathway: "alpha-carotene-branch", label: "LCYE → \u03B1-Carotene → Lutein" },
      { fromStep: "beta-carotene-step", toPathway: "cryptoxanthin-branch", label: "\u03B2-Carotene → \u03B2-Cryptoxanthin" },
      { fromStep: "violaxanthin", toPathway: "aba-branch", label: "Violaxanthin → Neoxanthin → ABA" },
      { fromStep: "zeaxanthin", toPathway: "xanthophyll-cycle", label: "Zeaxanthin \u2194 Violaxanthin (xanthophyll cycle)" },
    ],
    endProducts: ["\u03B2-Carotene", "Lycopene", "Lutein", "Zeaxanthin", "ABA"],
    moleculeIds: ["beta-carotene", "lycopene"],
  },
  {
    id: "glucosinolate",
    name: "Glucosinolate Pathway",
    description:
      "Glucosinolates are sulfur- and nitrogen-containing defense compounds found almost exclusively in the order Brassicales. The \"mustard oil bomb\" system releases toxic isothiocyanates when plant tissue is damaged and the enzyme myrosinase contacts glucosinolate substrates. Over 130 glucosinolates are known.",
    color: "#EAB308",
    steps: [
      { id: "amino-acid-precursor", compound: "Amino acid (Met/Trp/Phe)" },
      { id: "chain-elongated", compound: "Chain-elongated amino acid", enzyme: "MAM", gene: "MAM", arrow: true },
      { id: "n-hydroxy", compound: "N-Hydroxyamino acid", enzyme: "CYP79", gene: "CYP79", ecNumber: "1.14.14.43", arrow: true },
      { id: "aldoxime", compound: "Aldoxime", arrow: true },
      { id: "aci-nitro", compound: "aci-Nitro compound", enzyme: "CYP83", gene: "CYP83", arrow: true },
      { id: "thiohydroximate", compound: "Thiohydroximate", enzyme: "SUR1 (C-S lyase)", gene: "SUR1", arrow: true },
      { id: "desulfoglucosinolate", compound: "Desulfoglucosinolate", enzyme: "UGT74B1", gene: "UGT74B1", arrow: true },
      { id: "glucosinolate-product", compound: "Glucosinolate", enzyme: "SOT (sulfotransferase)", gene: "SOT", arrow: true },
    ],
    branchPoints: [
      { fromStep: "glucosinolate-product", toPathway: "isothiocyanate-branch", label: "Glucosinolate + Myrosinase → Isothiocyanates (sulforaphane)" },
      { fromStep: "glucosinolate-product", toPathway: "nitrile-branch", label: "Glucosinolate + Myrosinase → Nitriles" },
      { fromStep: "glucosinolate-product", toPathway: "thiocyanate-branch", label: "Glucosinolate + Myrosinase → Thiocyanates" },
    ],
    endProducts: ["Sulforaphane", "Allyl isothiocyanate", "Indole-3-carbinol", "Erucin", "Sinigrin"],
    moleculeIds: ["sulforaphane", "sinigrin"],
  },
  {
    id: "mevalonate",
    name: "Mevalonate (MVA) Pathway",
    description:
      "The cytosolic mevalonate pathway is the animal/fungal equivalent to the plastidial MEP pathway, producing IPP/DMAPP for sesquiterpene, sterol, and triterpene biosynthesis. In plants, both pathways coexist with limited metabolic crosstalk. The MVA pathway is the primary source of sterols (membrane components) and sesquiterpenes (defense volatiles).",
    color: "#84CC16",
    steps: [
      { id: "acetyl-coa", compound: "Acetyl-CoA" },
      { id: "acetoacetyl-coa", compound: "Acetoacetyl-CoA", enzyme: "AACT", gene: "AACT", ecNumber: "2.3.1.9", arrow: true },
      { id: "hmg-coa", compound: "HMG-CoA", enzyme: "HMGS", gene: "HMGS", ecNumber: "2.3.3.10", arrow: true },
      { id: "mevalonate-step", compound: "Mevalonate", enzyme: "HMGR", gene: "HMGR", ecNumber: "1.1.1.34", arrow: true },
      { id: "mevalonate-5p", compound: "Mevalonate-5-P", enzyme: "MK", gene: "MK", ecNumber: "2.7.1.36", arrow: true },
      { id: "mevalonate-5pp", compound: "Mevalonate-5-PP", enzyme: "PMK", gene: "PMK", ecNumber: "2.7.4.2", arrow: true },
      { id: "ipp-mva", compound: "IPP", enzyme: "MVD", gene: "MVD", ecNumber: "4.1.1.33", arrow: true },
      { id: "fpp-mva", compound: "FPP", enzyme: "FPPS", gene: "FPPS", arrow: true },
    ],
    branchPoints: [
      { fromStep: "fpp-mva", toPathway: "sterol-branch", label: "FPP → Squalene → Sterols/Triterpenes" },
      { fromStep: "fpp-mva", toPathway: "sesquiterpene-branch", label: "FPP → Sesquiterpenes (artemisinin)" },
      { fromStep: "ipp-mva", toPathway: "terpenoid", label: "IPP \u2194 DMAPP (IDI isomerase)" },
      { fromStep: "fpp-mva", toPathway: "ubiquinone-branch", label: "FPP → Ubiquinone" },
    ],
    endProducts: ["Sterols", "Sesquiterpenes", "Triterpenes", "Ubiquinone", "Dolichol"],
    moleculeIds: ["artemisinin"],
  },
];
