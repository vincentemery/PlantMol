export interface Molecule {
  id: string;
  name: string;
  commonName?: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  pubchemCid: number;
  category: "alkaloid" | "terpenoid" | "phenylpropanoid" | "carotenoid" | "tetrapyrrole";
  categoryLabel: string;
  color: string; // accent color for UI
  description: string;
  function: string;
  plants: PlantSource[];
  genes: Gene[];
  pathway: string;
  pathwayId: string;
  funFact: string;
}

export interface PlantSource {
  species: string;
  commonName: string;
  tissue: string;
}

export interface Gene {
  name: string;
  fullName: string;
  enzyme: string;
  ecNumber?: string;
  chromosome?: string;
  organism?: string;
}

export const molecules: Molecule[] = [
  {
    id: "caffeine",
    name: "1,3,7-Trimethylxanthine",
    commonName: "Caffeine",
    formula: "C₈H₁₀N₄O₂",
    molecularWeight: 194.19,
    smiles: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
    pubchemCid: 2519,
    category: "alkaloid",
    categoryLabel: "Purine Alkaloid",
    color: "#8B5CF6",
    description:
      "A purine alkaloid synthesized from xanthosine via a series of N-methylation reactions. Caffeine is one of the most widely consumed psychoactive compounds, produced by over 60 plant species as a chemical defense mechanism.",
    function:
      "Defense against herbivorous insects via neurotoxic effects. Also inhibits seed germination of competing plants (allelopathy) and enhances pollinator memory, increasing return visits.",
    plants: [
      { species: "Coffea arabica", commonName: "Arabica Coffee", tissue: "Seeds, leaves" },
      { species: "Camellia sinensis", commonName: "Tea", tissue: "Leaves, buds" },
      { species: "Theobroma cacao", commonName: "Cacao", tissue: "Seeds" },
      { species: "Ilex paraguariensis", commonName: "Yerba Mate", tissue: "Leaves" },
    ],
    genes: [
      { name: "TCS1", fullName: "Tea Caffeine Synthase 1", enzyme: "Caffeine synthase", ecNumber: "2.1.1.160", chromosome: "Chr4", organism: "Camellia sinensis" },
      { name: "XMT", fullName: "Xanthosine Methyltransferase", enzyme: "7-methylxanthosine synthase", ecNumber: "2.1.1.158", organism: "Coffea arabica" },
      { name: "DXMT", fullName: "3,7-Dimethylxanthine Methyltransferase", enzyme: "Caffeine synthase", ecNumber: "2.1.1.160", organism: "Coffea arabica" },
    ],
    pathway: "Purine Alkaloid Pathway",
    pathwayId: "alkaloid",
    funFact:
      "Caffeine has convergently evolved at least 5 independent times in plant lineages — coffee, tea, cacao, citrus, and guarana all invented caffeine synthesis separately.",
  },
  {
    id: "resveratrol",
    name: "3,5,4'-Trihydroxystilbene",
    commonName: "Resveratrol",
    formula: "C₁₄H₁₂O₃",
    molecularWeight: 228.24,
    smiles: "OC1=CC=C(/C=C/C2=CC(O)=CC(O)=C2)C=C1",
    pubchemCid: 445154,
    category: "phenylpropanoid",
    categoryLabel: "Stilbenoid",
    color: "#EC4899",
    description:
      "A stilbenoid phytoalexin produced in response to pathogen infection or UV irradiation. Resveratrol is synthesized from p-coumaroyl-CoA and malonyl-CoA by stilbene synthase, a key branch point enzyme in the phenylpropanoid pathway.",
    function:
      "Phytoalexin defense against fungal pathogens (especially Botrytis cinerea). Also provides UV-B protection and has documented antioxidant activity in vitro.",
    plants: [
      { species: "Vitis vinifera", commonName: "Grape", tissue: "Berry skin, leaves" },
      { species: "Arachis hypogaea", commonName: "Peanut", tissue: "Seeds, roots" },
      { species: "Polygonum cuspidatum", commonName: "Japanese Knotweed", tissue: "Roots" },
    ],
    genes: [
      { name: "STS", fullName: "Stilbene Synthase", enzyme: "Stilbene synthase", ecNumber: "2.3.1.95", chromosome: "Chr16", organism: "Vitis vinifera" },
      { name: "PAL", fullName: "Phenylalanine Ammonia-Lyase", enzyme: "PAL", ecNumber: "4.3.1.24", organism: "Vitis vinifera" },
      { name: "4CL", fullName: "4-Coumarate:CoA Ligase", enzyme: "4CL", ecNumber: "6.2.1.12", organism: "Vitis vinifera" },
    ],
    pathway: "Phenylpropanoid / Stilbenoid Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Grapevines dramatically upregulate STS expression within hours of Botrytis infection — a single vine can have over 40 copies of the STS gene, reflecting intense evolutionary selection for disease resistance.",
  },
  {
    id: "capsaicin",
    name: "8-Methyl-N-vanillyl-6-nonenamide",
    commonName: "Capsaicin",
    formula: "C₁₈H₂₇NO₃",
    molecularWeight: 305.41,
    smiles: "COC1=C(O)C=CC(CNC(=O)CCCC/C=C/C(C)C)=C1",
    pubchemCid: 1548943,
    category: "alkaloid",
    categoryLabel: "Capsaicinoid",
    color: "#EF4444",
    description:
      "The principal capsaicinoid responsible for the pungency of chili peppers. Capsaicin is synthesized at the junction of the phenylpropanoid and branched-chain fatty acid pathways, specifically in the placental tissue of the fruit.",
    function:
      "Selective mammalian deterrent — activates TRPV1 pain receptors in mammals but not birds, ensuring seed dispersal by avian vectors while deterring mammalian seed predators that would destroy seeds by mastication.",
    plants: [
      { species: "Capsicum annuum", commonName: "Chili Pepper", tissue: "Fruit placenta" },
      { species: "Capsicum chinense", commonName: "Habanero", tissue: "Fruit placenta" },
      { species: "Capsicum frutescens", commonName: "Tabasco Pepper", tissue: "Fruit placenta" },
    ],
    genes: [
      { name: "CS", fullName: "Capsaicin Synthase", enzyme: "Capsaicin synthase (AT3)", ecNumber: "2.3.1.-", chromosome: "Chr2", organism: "Capsicum annuum" },
      { name: "pAMT", fullName: "Putative Aminotransferase", enzyme: "Aminotransferase", chromosome: "Chr3", organism: "Capsicum annuum" },
      { name: "KAS", fullName: "β-Ketoacyl-ACP Synthase", enzyme: "KAS", ecNumber: "2.3.1.41", organism: "Capsicum annuum" },
    ],
    pathway: "Capsaicinoid Pathway",
    pathwayId: "alkaloid",
    funFact:
      "The 'heat' of capsaicin is an evolutionary masterpiece: birds (which disperse pepper seeds intact) are completely immune to it, while mammals (which grind seeds) find it intensely painful.",
  },
  {
    id: "beta-carotene",
    name: "β,β-Carotene",
    commonName: "β-Carotene",
    formula: "C₄₀H₅₆",
    molecularWeight: 536.87,
    smiles: "CC(=C/C=C/C=C(C)/C=C/C1=C(C)CCCC1(C)C)\\C=C\\C=C(C)\\C=C\\C2=C(C)CCCC2(C)C",
    pubchemCid: 5280489,
    category: "carotenoid",
    categoryLabel: "Carotenoid",
    color: "#F97316",
    description:
      "A C40 tetraterpenoid pigment synthesized via the MEP (methylerythritol phosphate) pathway in plastids. β-Carotene consists of two retinyl groups and is the most abundant provitamin A carotenoid in plants.",
    function:
      "Accessory photosynthetic pigment that harvests blue-green light (450–490 nm) and transfers energy to chlorophyll. Also serves as a critical photoprotective agent, quenching singlet oxygen and triplet chlorophyll to prevent photooxidative damage.",
    plants: [
      { species: "Daucus carota", commonName: "Carrot", tissue: "Taproot" },
      { species: "Ipomoea batatas", commonName: "Sweet Potato", tissue: "Storage root" },
      { species: "Cucurbita maxima", commonName: "Pumpkin", tissue: "Fruit flesh" },
      { species: "Spinacia oleracea", commonName: "Spinach", tissue: "Leaves" },
    ],
    genes: [
      { name: "PSY", fullName: "Phytoene Synthase", enzyme: "Phytoene synthase", ecNumber: "2.5.1.32", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "LCYB", fullName: "Lycopene β-Cyclase", enzyme: "Lycopene cyclase", ecNumber: "5.5.1.19", chromosome: "Chr3", organism: "Arabidopsis thaliana" },
      { name: "PDS", fullName: "Phytoene Desaturase", enzyme: "Phytoene desaturase", ecNumber: "1.3.5.5", organism: "Arabidopsis thaliana" },
    ],
    pathway: "MEP / Carotenoid Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Golden Rice was engineered by inserting just two genes (PSY from daffodil and CRTI from bacteria) to produce β-carotene in rice endosperm — addressing vitamin A deficiency affecting 250 million children worldwide.",
  },
  {
    id: "cyanidin",
    name: "Cyanidin",
    commonName: "Cyanidin",
    formula: "C₁₅H₁₁O₆⁺",
    molecularWeight: 287.24,
    smiles: "OC1=CC2=C(C=C1O)[O+]=C(C3=CC(O)=C(O)C=C3)C=C2O",
    pubchemCid: 128861,
    category: "phenylpropanoid",
    categoryLabel: "Anthocyanidin",
    color: "#7C3AED",
    description:
      "The most common anthocyanidin in flowering plants, responsible for red, purple, and blue pigmentation. Cyanidin is synthesized through the flavonoid branch of the phenylpropanoid pathway and accumulates as glycosylated forms (anthocyanins) in vacuoles.",
    function:
      "Visual signal for pollinator attraction and seed dispersal. Provides UV-B photoprotection for photosynthetic tissues. Functions as an antioxidant scavenging reactive oxygen species. Color varies with pH: red in acidic, purple at neutral, blue in alkaline conditions.",
    plants: [
      { species: "Vaccinium corymbosum", commonName: "Blueberry", tissue: "Berry skin" },
      { species: "Prunus avium", commonName: "Sweet Cherry", tissue: "Fruit skin" },
      { species: "Rosa spp.", commonName: "Rose", tissue: "Petals" },
      { species: "Zea mays", commonName: "Purple Corn", tissue: "Kernel pericarp" },
    ],
    genes: [
      { name: "ANS", fullName: "Anthocyanidin Synthase", enzyme: "ANS/LDOX", ecNumber: "1.14.20.4", chromosome: "Chr4", organism: "Arabidopsis thaliana" },
      { name: "DFR", fullName: "Dihydroflavonol 4-Reductase", enzyme: "DFR", ecNumber: "1.1.1.219", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "CHS", fullName: "Chalcone Synthase", enzyme: "Chalcone synthase", ecNumber: "2.3.1.74", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Flavonoid / Anthocyanin Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Autumn leaf color change occurs because chlorophyll degrades revealing hidden carotenoids (yellows), while anthocyanins like cyanidin are actively synthesized (reds/purples) — possibly as a sunscreen protecting nutrient recovery.",
  },
  {
    id: "artemisinin",
    name: "Artemisinin",
    commonName: "Artemisinin",
    formula: "C₁₅H₂₂O₅",
    molecularWeight: 282.33,
    smiles: "CC1CCC2C(C)C(=O)OC3OC4(C)CCC1C23OO4",
    pubchemCid: 68827,
    category: "terpenoid",
    categoryLabel: "Sesquiterpene Lactone",
    color: "#10B981",
    description:
      "A sesquiterpene lactone containing an unusual endoperoxide bridge essential for its antimalarial activity. Produced in glandular trichomes of Artemisia annua, artemisinin's biosynthesis proceeds from farnesyl diphosphate through amorpha-4,11-diene.",
    function:
      "Natural defense compound in Artemisia annua, likely providing protection against herbivores and pathogens. Its endoperoxide bridge generates free radicals upon contact with heme iron in Plasmodium parasites, making it the most important antimalarial drug discovered from plants.",
    plants: [
      { species: "Artemisia annua", commonName: "Sweet Wormwood", tissue: "Glandular trichomes" },
    ],
    genes: [
      { name: "ADS", fullName: "Amorpha-4,11-diene Synthase", enzyme: "Sesquiterpene synthase", ecNumber: "4.2.3.24", organism: "Artemisia annua" },
      { name: "CYP71AV1", fullName: "Cytochrome P450 71AV1", enzyme: "Amorphadiene oxidase", ecNumber: "1.14.14.51", organism: "Artemisia annua" },
      { name: "DBR2", fullName: "Artemisinic Aldehyde Δ11(13) Reductase", enzyme: "Double-bond reductase", ecNumber: "1.3.1.77", organism: "Artemisia annua" },
    ],
    pathway: "Sesquiterpene / MVA Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Tu Youyou won the 2015 Nobel Prize in Physiology or Medicine for discovering artemisinin, inspired by a 1,700-year-old Chinese medical text by Ge Hong that described soaking wormwood in cold water to treat fevers.",
  },
  {
    id: "nicotine",
    name: "3-(1-Methylpyrrolidin-2-yl)pyridine",
    commonName: "Nicotine",
    formula: "C₁₀H₁₄N₂",
    molecularWeight: 162.23,
    smiles: "CN1CCCC1C2=CN=CC=C2",
    pubchemCid: 89594,
    category: "alkaloid",
    categoryLabel: "Pyridine Alkaloid",
    color: "#6366F1",
    description:
      "A pyridine alkaloid synthesized from nicotinic acid and putrescine in root tissues, then transported to leaves via the xylem. Nicotine is one of the most potent plant-derived insecticides, acting as an acetylcholine receptor agonist in insect nervous systems.",
    function:
      "Primary chemical defense against herbivorous insects. Nicotine mimics the neurotransmitter acetylcholine, binding to nicotinic acetylcholine receptors and causing paralysis and death in insects at concentrations found in plant tissues.",
    plants: [
      { species: "Nicotiana tabacum", commonName: "Tobacco", tissue: "Leaves (synthesized in roots)" },
      { species: "Nicotiana rustica", commonName: "Aztec Tobacco", tissue: "Leaves" },
    ],
    genes: [
      { name: "PMT", fullName: "Putrescine N-Methyltransferase", enzyme: "PMT", ecNumber: "2.1.1.53", chromosome: "Chr12", organism: "Nicotiana tabacum" },
      { name: "QPT", fullName: "Quinolinate Phosphoribosyltransferase", enzyme: "QPT", ecNumber: "2.4.2.19", organism: "Nicotiana tabacum" },
      { name: "A622", fullName: "Isoflavone Reductase-like Protein", enzyme: "Nicotine reductase", organism: "Nicotiana tabacum" },
    ],
    pathway: "Pyridine Alkaloid Pathway",
    pathwayId: "alkaloid",
    funFact:
      "When hornworms attack tobacco plants, the damaged leaves send a jasmonate signal to the roots, which ramp up nicotine production within hours — the alkaloid then travels up to the leaves via xylem transport.",
  },
  {
    id: "taxol",
    name: "Paclitaxel",
    commonName: "Taxol",
    formula: "C₄₇H₅₁NO₁₄",
    molecularWeight: 853.91,
    smiles: "CC(=O)OC1C(=O)C2(C)CCCC(C)(C2C(OC(=O)C3=CC=CC=C3)C4(CO4)OC(C)=O)C1CC(O)C(=CC5=CC=CC=C5)NC(=O)C6=CC=CC=C6",
    pubchemCid: 36314,
    category: "terpenoid",
    categoryLabel: "Diterpenoid",
    color: "#14B8A6",
    description:
      "A complex diterpenoid with a taxane ring system, requiring approximately 19 enzymatic steps for its biosynthesis from geranylgeranyl diphosphate. Taxol's extreme structural complexity has made its complete chemical synthesis one of the most celebrated achievements in organic chemistry.",
    function:
      "Defense compound that stabilizes microtubule polymers, preventing cell division. This mechanism of action makes it an extraordinarily effective anticancer drug, particularly for ovarian, breast, and lung cancers.",
    plants: [
      { species: "Taxus brevifolia", commonName: "Pacific Yew", tissue: "Bark" },
      { species: "Taxus baccata", commonName: "European Yew", tissue: "Needles, bark" },
    ],
    genes: [
      { name: "TS", fullName: "Taxadiene Synthase", enzyme: "Taxadiene synthase", ecNumber: "4.2.3.17", organism: "Taxus brevifolia" },
      { name: "DBAT", fullName: "10-Deacetylbaccatin III-10-O-acetyltransferase", enzyme: "Acyltransferase", ecNumber: "2.3.1.167", organism: "Taxus brevifolia" },
      { name: "BAPT", fullName: "Baccatin III-3-amino-13-phenylpropanoyl-CoA transferase", enzyme: "Acyltransferase", organism: "Taxus brevifolia" },
    ],
    pathway: "Diterpenoid / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "It takes approximately 6 mature Pacific yew trees (each 100+ years old) to produce enough taxol to treat a single cancer patient — this ecological crisis drove the development of semi-synthetic production from yew needles and cell culture.",
  },
  {
    id: "menthol",
    name: "(-)-Menthol",
    commonName: "Menthol",
    formula: "C₁₀H₂₀O",
    molecularWeight: 156.27,
    smiles: "CC(C)C1CCC(C)CC1O",
    pubchemCid: 16666,
    category: "terpenoid",
    categoryLabel: "Monoterpenoid",
    color: "#06B6D4",
    description:
      "A cyclic monoterpenoid alcohol produced in the glandular trichomes of peppermint. Its biosynthesis involves eight enzymatic steps from geranyl diphosphate, proceeding through (-)-limonene, (-)-trans-isopiperitenol, and several intermediates.",
    function:
      "Deterrent against herbivorous insects and grazing mammals. Activates the cold-sensing TRPM8 receptor in mammals, producing the characteristic cooling sensation. Also possesses antimicrobial properties against plant pathogens.",
    plants: [
      { species: "Mentha × piperita", commonName: "Peppermint", tissue: "Glandular trichomes" },
      { species: "Mentha arvensis", commonName: "Corn Mint", tissue: "Glandular trichomes" },
    ],
    genes: [
      { name: "LS", fullName: "(-)-Limonene Synthase", enzyme: "Limonene synthase", ecNumber: "4.2.3.16", organism: "Mentha × piperita" },
      { name: "MR", fullName: "(-)-Menthone:(-)-(3R)-Menthol Reductase", enzyme: "Menthol reductase", ecNumber: "1.1.1.208", organism: "Mentha × piperita" },
      { name: "ISPR", fullName: "(-)-Isopiperitenone Reductase", enzyme: "Isopiperitenone reductase", ecNumber: "1.3.1.82", organism: "Mentha × piperita" },
    ],
    pathway: "Monoterpenoid / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Peppermint glandular trichomes are specialized chemical factories — each one functions as a single-cell terpenoid production facility, synthesizing and storing menthol in a subcuticular cavity until the trichome ruptures upon contact.",
  },
  {
    id: "chlorophyll-a",
    name: "Chlorophyll a",
    commonName: "Chlorophyll a",
    formula: "C₅₅H₇₂MgN₄O₅",
    molecularWeight: 893.49,
    smiles: "CCC1=C(C)C2=CC3=C(C=C)C(C)=C(N3)C=C4C(C)=C(CCC(=O)OC/C=C(C)/CCCC(C)CCCC(C)CCCC(C)C)C(=N4)C=C5C(=O)C(C)=C1N25",
    pubchemCid: 12085802,
    category: "tetrapyrrole",
    categoryLabel: "Chlorin / Tetrapyrrole",
    color: "#22C55E",
    description:
      "The primary photosynthetic pigment in all oxygenic phototrophs. Chlorophyll a is a chlorin — a reduced porphyrin ring chelating a central magnesium ion, with a phytol tail anchoring it in the thylakoid membrane. It absorbs red (680 nm) and blue (430 nm) light.",
    function:
      "The essential pigment in both photosystem I (P700) and photosystem II (P680) reaction centers. Chlorophyll a is the only pigment that can directly participate in the light reactions by donating an excited electron to the electron transport chain, driving the conversion of light energy to chemical energy.",
    plants: [
      { species: "All photosynthetic plants", commonName: "Universal", tissue: "Chloroplasts (thylakoid membranes)" },
    ],
    genes: [
      { name: "CHLG", fullName: "Chlorophyll Synthase", enzyme: "Chlorophyll synthase", ecNumber: "2.5.1.62", chromosome: "Chr1", organism: "Arabidopsis thaliana" },
      { name: "POR", fullName: "Protochlorophyllide Oxidoreductase", enzyme: "POR", ecNumber: "1.3.1.33", chromosome: "Chr4", organism: "Arabidopsis thaliana" },
      { name: "CHLM", fullName: "Mg-Protoporphyrin IX Methyltransferase", enzyme: "Methyltransferase", ecNumber: "2.1.1.11", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Tetrapyrrole / Chlorophyll Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Chlorophyll is why plants are green — but it's actually a terrible light absorber in the green wavelengths (500-565 nm). Plants reflect green light because chlorophyll evolved to absorb the most energetically useful red and blue photons.",
  },
];

export const categories = [
  { id: "all", label: "All Molecules", color: "#94A3B8" },
  { id: "alkaloid", label: "Alkaloids", color: "#8B5CF6" },
  { id: "terpenoid", label: "Terpenoids", color: "#10B981" },
  { id: "phenylpropanoid", label: "Phenylpropanoids", color: "#EC4899" },
  { id: "carotenoid", label: "Carotenoids", color: "#F97316" },
  { id: "tetrapyrrole", label: "Tetrapyrroles", color: "#22C55E" },
];

export function getMolecule(id: string): Molecule | undefined {
  return molecules.find((m) => m.id === id);
}
