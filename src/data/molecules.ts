export interface Molecule {
  id: string;
  name: string;
  commonName?: string;
  formula: string;
  molecularWeight: number;
  smiles: string;
  pubchemCid: number;
  category: "alkaloid" | "terpenoid" | "phenylpropanoid" | "carotenoid" | "tetrapyrrole" | "glucosinolate";
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
  {
    id: "quercetin",
    name: "2-(3,4-Dihydroxyphenyl)-3,5,7-trihydroxychromen-4-one",
    commonName: "Quercetin",
    formula: "C₁₅H₁₀O₇",
    molecularWeight: 302.24,
    smiles: "OC1=CC(O)=C2C(=O)C(O)=C(OC2=C1)C3=CC(O)=C(O)C=C3",
    pubchemCid: 5280343,
    category: "phenylpropanoid",
    categoryLabel: "Flavonol",
    color: "#D97706",
    description:
      "The most abundant dietary flavonoid, synthesized via the flavonoid branch of the phenylpropanoid pathway. Quercetin is produced from dihydroquercetin by flavonol synthase (FLS), a 2-oxoglutarate-dependent dioxygenase that introduces the C2-C3 double bond characteristic of flavonols.",
    function:
      "UV-B absorbing sunscreen pigment that accumulates in epidermal cells to protect underlying photosynthetic tissues. Also acts as an antioxidant scavenging reactive oxygen species, and modulates auxin transport to regulate plant development.",
    plants: [
      { species: "Allium cepa", commonName: "Onion", tissue: "Bulb scales (outer skin)" },
      { species: "Malus domestica", commonName: "Apple", tissue: "Fruit skin" },
      { species: "Camellia sinensis", commonName: "Tea", tissue: "Leaves" },
    ],
    genes: [
      { name: "FLS", fullName: "Flavonol Synthase", enzyme: "Flavonol synthase", ecNumber: "1.14.20.6", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "CHS", fullName: "Chalcone Synthase", enzyme: "Chalcone synthase", ecNumber: "2.3.1.74", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "F3H", fullName: "Flavanone 3-Hydroxylase", enzyme: "Flavanone 3-hydroxylase", ecNumber: "1.14.11.9", chromosome: "Chr3", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Flavonoid / Flavonol Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Quercetin glycosides give onion skins their golden-brown color and were historically used as a natural dye — the compound is so prevalent in the human diet that average daily intake is estimated at 10-100 mg.",
  },
  {
    id: "kaempferol",
    name: "3,5,7-Trihydroxy-2-(4-hydroxyphenyl)chromen-4-one",
    commonName: "Kaempferol",
    formula: "C₁₅H₁₀O₆",
    molecularWeight: 286.24,
    smiles: "OC1=CC=C(C=C1)C2=C(O)C(=O)C3=C(O)C=C(O)C=C3O2",
    pubchemCid: 5280863,
    category: "phenylpropanoid",
    categoryLabel: "Flavonol",
    color: "#FBBF24",
    description:
      "A flavonol aglycone differing from quercetin by lacking the 3'-hydroxyl group on the B-ring. Kaempferol is synthesized by flavonol synthase from dihydrokaempferol, the same 2-oxoglutarate-dependent dioxygenase that produces quercetin from a different substrate.",
    function:
      "UV-protective pigment that accumulates in epidermal and subepidermal cells. Kaempferol glycosides serve as co-pigments that stabilize anthocyanin coloration in flowers, and the compound also functions as an auxin transport inhibitor influencing root gravitropism.",
    plants: [
      { species: "Brassica oleracea var. sabellica", commonName: "Kale", tissue: "Leaves" },
      { species: "Brassica oleracea var. italica", commonName: "Broccoli", tissue: "Florets" },
      { species: "Camellia sinensis", commonName: "Tea", tissue: "Leaves, buds" },
    ],
    genes: [
      { name: "FLS", fullName: "Flavonol Synthase", enzyme: "Flavonol synthase", ecNumber: "1.14.20.6", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "F3H", fullName: "Flavanone 3-Hydroxylase", enzyme: "Flavanone 3-hydroxylase", ecNumber: "1.14.11.9", organism: "Arabidopsis thaliana" },
      { name: "CHS", fullName: "Chalcone Synthase", enzyme: "Chalcone synthase", ecNumber: "2.3.1.74", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Flavonoid / Flavonol Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Arabidopsis thaliana mutants lacking kaempferol show impaired pollen tube growth and male fertility — the flavonol acts as an endogenous regulator of pollen germination and is essential for successful fertilization.",
  },
  {
    id: "epigallocatechin-gallate",
    name: "[(2R,3R)-5,7-Dihydroxy-2-(3,4,5-trihydroxyphenyl)chroman-3-yl] 3,4,5-trihydroxybenzoate",
    commonName: "EGCG",
    formula: "C₂₂H₁₈O₁₁",
    molecularWeight: 458.37,
    smiles: "OC1=CC2=C(C=C1O)OC(C3=CC(O)=C(O)C(O)=C3)C(OC(=O)C4=CC(O)=C(O)C(O)=C4)C2",
    pubchemCid: 65064,
    category: "phenylpropanoid",
    categoryLabel: "Flavanol / Catechin",
    color: "#059669",
    description:
      "The most abundant catechin in green tea, comprising up to 50-80% of total catechins. EGCG is a flavan-3-ol esterified with gallic acid, synthesized via the flavonoid pathway through leucoanthocyanidin reductase (LAR) or anthocyanidin reductase (ANR) producing the catechin scaffold.",
    function:
      "Potent astringent defense compound that binds and precipitates proteins in herbivore digestive systems, reducing nutrient absorption. Also provides strong antioxidant protection against UV damage and oxidative stress in tea leaves.",
    plants: [
      { species: "Camellia sinensis", commonName: "Green Tea", tissue: "Young leaves, buds" },
    ],
    genes: [
      { name: "ANR", fullName: "Anthocyanidin Reductase", enzyme: "Anthocyanidin reductase", ecNumber: "1.3.1.159", organism: "Camellia sinensis" },
      { name: "LAR", fullName: "Leucoanthocyanidin Reductase", enzyme: "Leucoanthocyanidin reductase", ecNumber: "1.17.1.3", organism: "Camellia sinensis" },
      { name: "F3'5'H", fullName: "Flavonoid 3',5'-Hydroxylase", enzyme: "Flavonoid 3',5'-hydroxylase", ecNumber: "1.14.14.159", organism: "Camellia sinensis" },
    ],
    pathway: "Flavonoid / Proanthocyanidin Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Green tea retains EGCG because the leaves are steamed immediately after harvest, inactivating polyphenol oxidase — black tea processing allows this enzyme to oxidize catechins into theaflavins and thearubigins, which is why black tea has far less EGCG.",
  },
  {
    id: "curcumin",
    name: "(1E,6E)-1,7-Bis(4-hydroxy-3-methoxyphenyl)hepta-1,6-diene-3,5-dione",
    commonName: "Curcumin",
    formula: "C₂₁H₂₀O₆",
    molecularWeight: 368.38,
    smiles: "COC1=CC(/C=C/C(=O)CC(=O)/C=C/C2=CC(OC)=C(O)C=C2)=CC=C1O",
    pubchemCid: 969516,
    category: "phenylpropanoid",
    categoryLabel: "Diarylheptanoid",
    color: "#F59E0B",
    description:
      "A diarylheptanoid responsible for the bright yellow color of turmeric rhizomes. Curcumin is biosynthesized by type III polyketide synthases: diketide-CoA synthase (DCS) generates a diketide-CoA intermediate from feruloyl-CoA and malonyl-CoA, which curcumin synthase (CURS) then condenses with another feruloyl-CoA.",
    function:
      "Antimicrobial defense compound in turmeric rhizomes, providing broad-spectrum protection against soil-borne fungi and bacteria. The intense yellow pigmentation may also deter root herbivores. Curcumin exhibits well-documented anti-inflammatory properties by inhibiting NF-kB signaling.",
    plants: [
      { species: "Curcuma longa", commonName: "Turmeric", tissue: "Rhizomes" },
      { species: "Curcuma zedoaria", commonName: "White Turmeric", tissue: "Rhizomes" },
    ],
    genes: [
      { name: "CURS", fullName: "Curcumin Synthase", enzyme: "Curcumin synthase (type III PKS)", organism: "Curcuma longa" },
      { name: "DCS", fullName: "Diketide-CoA Synthase", enzyme: "Diketide-CoA synthase (type III PKS)", organism: "Curcuma longa" },
      { name: "C4H", fullName: "Cinnamate 4-Hydroxylase", enzyme: "Cinnamate 4-hydroxylase", ecNumber: "1.14.14.91", organism: "Curcuma longa" },
    ],
    pathway: "Phenylpropanoid / Diarylheptanoid Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Curcumin's biosynthesis was a mystery until 2009, when Katsuyuki Katsuyama's group discovered that two separate type III polyketide synthases (DCS and CURS) work in tandem — a unique enzymatic relay not seen in other plant natural products.",
  },
  {
    id: "rosmarinic-acid",
    name: "(R)-3-(3,4-Dihydroxyphenyl)-2-[(E)-3-(3,4-dihydroxyphenyl)prop-2-enoyloxy]propanoic acid",
    commonName: "Rosmarinic Acid",
    formula: "C₁₈H₁₆O₈",
    molecularWeight: 360.31,
    smiles: "OC(=O)C(CC1=CC=C(O)C(O)=C1)OC(=O)/C=C/C2=CC=C(O)C(O)=C2",
    pubchemCid: 5281792,
    category: "phenylpropanoid",
    categoryLabel: "Hydroxycinnamic Acid Ester",
    color: "#4ADE80",
    description:
      "An ester of caffeic acid and 3,4-dihydroxyphenyllactic acid, widely distributed in the Lamiaceae family. Rosmarinic acid is synthesized at the convergence of two phenylpropanoid-derived pathways: one branch provides caffeoyl-CoA via PAL/C4H/4CL, and the other provides 4-hydroxyphenyllactic acid via TAT and HPPR.",
    function:
      "Potent antioxidant defense compound that protects photosynthetic tissues from UV-B radiation and oxidative stress. Also exhibits antimicrobial activity against phytopathogenic fungi and bacteria, contributing to the resistance of rosemary and basil to foliar diseases.",
    plants: [
      { species: "Rosmarinus officinalis", commonName: "Rosemary", tissue: "Leaves" },
      { species: "Ocimum basilicum", commonName: "Sweet Basil", tissue: "Leaves, glandular trichomes" },
      { species: "Melissa officinalis", commonName: "Lemon Balm", tissue: "Leaves" },
    ],
    genes: [
      { name: "RAS", fullName: "Rosmarinic Acid Synthase", enzyme: "Hydroxycinnamoyl-CoA:hydroxyphenyllactate hydroxycinnamoyltransferase", ecNumber: "2.3.1.140", organism: "Coleus blumei" },
      { name: "TAT", fullName: "Tyrosine Aminotransferase", enzyme: "Tyrosine aminotransferase", ecNumber: "2.6.1.5", organism: "Coleus blumei" },
      { name: "HPPR", fullName: "Hydroxyphenylpyruvate Reductase", enzyme: "Hydroxyphenylpyruvate reductase", ecNumber: "1.1.1.237", organism: "Coleus blumei" },
    ],
    pathway: "Phenylpropanoid / Rosmarinic Acid Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Rosmarinic acid is so abundant in the Lamiaceae (mint family) that it can constitute up to 5% of dry leaf weight in rosemary — this extraordinary accumulation makes it one of the most concentrated phenolic defense compounds in any plant family.",
  },
  {
    id: "genistein",
    name: "5,7-Dihydroxy-3-(4-hydroxyphenyl)chromen-4-one",
    commonName: "Genistein",
    formula: "C₁₅H₁₀O₅",
    molecularWeight: 270.24,
    smiles: "OC1=CC=C(C=C1)C2=COC3=CC(O)=CC(O)=C3C2=O",
    pubchemCid: 5280961,
    category: "phenylpropanoid",
    categoryLabel: "Isoflavone",
    color: "#E879F9",
    description:
      "The principal isoflavone in soybeans, formed by the 2,3-migration of the B-ring from the 2-position (as in flavanones) to the 3-position. This unique rearrangement is catalyzed by isoflavone synthase (IFS/CYP93C), a cytochrome P450 enzyme almost exclusively found in legumes.",
    function:
      "Key signaling molecule in legume-rhizobium symbiosis: genistein is secreted from soybean roots to activate nod gene expression in Bradyrhizobium japonicum, initiating nitrogen-fixing root nodule formation. Also functions as a phytoestrogen due to structural similarity to 17-beta-estradiol.",
    plants: [
      { species: "Glycine max", commonName: "Soybean", tissue: "Seeds, roots" },
      { species: "Trifolium pratense", commonName: "Red Clover", tissue: "Flowers, leaves" },
      { species: "Lupinus albus", commonName: "White Lupin", tissue: "Seeds" },
    ],
    genes: [
      { name: "IFS", fullName: "Isoflavone Synthase (CYP93C)", enzyme: "2-hydroxyisoflavanone synthase", ecNumber: "1.14.14.87", organism: "Glycine max" },
      { name: "CHS", fullName: "Chalcone Synthase", enzyme: "Chalcone synthase", ecNumber: "2.3.1.74", organism: "Glycine max" },
      { name: "CHI", fullName: "Chalcone Isomerase", enzyme: "Chalcone isomerase", ecNumber: "5.5.1.6", organism: "Glycine max" },
    ],
    pathway: "Phenylpropanoid / Isoflavonoid Pathway",
    pathwayId: "phenylpropanoid",
    funFact:
      "Isoflavone synthase (IFS) performs one of the rarest reactions in plant metabolism — a 1,2-aryl migration that moves an entire aromatic ring. This enzyme evolved almost exclusively in legumes, which is why isoflavones are virtually absent from non-legume plants.",
  },
  {
    id: "morphine",
    name: "(4R,4aR,7S,7aR,12bS)-3-Methyl-2,3,4,4a,7,7a-hexahydro-1H-4,12-methanobenzofuro[3,2-e]isoquinoline-7,9-diol",
    commonName: "Morphine",
    formula: "C₁₇H₁₉NO₃",
    molecularWeight: 285.34,
    smiles: "CN1CCC23C4=C(C=C(O)C4OC2C(O)C=C3)C1C5CC=CC25",
    pubchemCid: 5288826,
    category: "alkaloid",
    categoryLabel: "Benzylisoquinoline Alkaloid",
    color: "#7E22CE",
    description:
      "The prototypical opioid analgesic and the most pharmacologically significant benzylisoquinoline alkaloid. Morphine is biosynthesized from two molecules of L-tyrosine through a complex pathway involving over 15 enzymatic steps, passing through key intermediates including (S)-reticuline, salutaridine, and thebaine.",
    function:
      "Chemical defense compound concentrated in the latex of opium poppy seed capsules, deterring herbivores through its potent neurotoxic effects. In mammals, morphine binds mu-opioid receptors, producing profound analgesia — making it the gold standard for pain management since antiquity.",
    plants: [
      { species: "Papaver somniferum", commonName: "Opium Poppy", tissue: "Latex (seed capsule)" },
      { species: "Papaver setigerum", commonName: "Poppy of Troy", tissue: "Latex" },
    ],
    genes: [
      { name: "SalSyn", fullName: "Salutaridine Synthase (CYP719B1)", enzyme: "Salutaridine synthase", ecNumber: "1.14.21.4", organism: "Papaver somniferum" },
      { name: "SalR", fullName: "Salutaridine Reductase", enzyme: "Salutaridine reductase", ecNumber: "1.1.1.248", organism: "Papaver somniferum" },
      { name: "CODM", fullName: "Codeine O-Demethylase", enzyme: "Codeine 3-O-demethylase", ecNumber: "1.14.11.32", organism: "Papaver somniferum" },
    ],
    pathway: "Benzylisoquinoline Alkaloid Pathway",
    pathwayId: "bia",
    funFact:
      "In 2015, scientists at Stanford reconstructed the entire 23-step morphine biosynthetic pathway in yeast (Saccharomyces cerevisiae) — converting simple sugar into hydrocodone, demonstrating that microbial opioid production is technically feasible from scratch.",
  },
  {
    id: "berberine",
    name: "5,6-Dihydro-9,10-dimethoxybenzo[g]-1,3-benzodioxolo[5,6-a]quinolizinium",
    commonName: "Berberine",
    formula: "C₂₀H₁₈NO₄⁺",
    molecularWeight: 336.36,
    smiles: "COC1=CC=C2C=C3C=CC4=CC5=C(OCO5)C=C4C(=C3C=C2C1OC)[N+]6=CCCC6",
    pubchemCid: 2353,
    category: "alkaloid",
    categoryLabel: "Benzylisoquinoline Alkaloid",
    color: "#CA8A04",
    description:
      "A protoberberine alkaloid with a distinctive bright yellow color, biosynthesized from (S)-reticuline through the action of berberine bridge enzyme (BBE), which catalyzes the oxidative formation of the methylenedioxy bridge — one of the most unusual reactions in alkaloid metabolism.",
    function:
      "Broad-spectrum antimicrobial defense compound effective against bacteria, fungi, and protozoa. Berberine intercalates into DNA and inhibits topoisomerase, protein synthesis, and cell division in pathogens, providing root and rhizome tissues with powerful chemical protection.",
    plants: [
      { species: "Coptis chinensis", commonName: "Goldthread", tissue: "Roots, rhizomes" },
      { species: "Berberis vulgaris", commonName: "Barberry", tissue: "Root bark, stem bark" },
      { species: "Hydrastis canadensis", commonName: "Goldenseal", tissue: "Roots, rhizomes" },
    ],
    genes: [
      { name: "BBE", fullName: "Berberine Bridge Enzyme", enzyme: "Reticuline oxidase", ecNumber: "1.21.3.3", organism: "Eschscholzia californica" },
      { name: "SMT", fullName: "Scoulerine 9-O-Methyltransferase", enzyme: "(S)-scoulerine 9-O-methyltransferase", ecNumber: "2.1.1.117", organism: "Coptis japonica" },
      { name: "CYP719A", fullName: "Canadine Synthase (CYP719A1)", enzyme: "Canadine synthase", ecNumber: "1.14.21.5", organism: "Coptis japonica" },
    ],
    pathway: "Benzylisoquinoline Alkaloid / Protoberberine Pathway",
    pathwayId: "bia",
    funFact:
      "Berberine bridge enzyme (BBE) catalyzes one of the most unusual reactions in biochemistry — it oxidatively converts an N-methyl group into a methylene bridge connecting two ring systems, a reaction with no parallel in mammalian metabolism.",
  },
  {
    id: "vinblastine",
    name: "Vinblastine",
    commonName: "Vinblastine",
    formula: "C₄₆H₅₈N₄O₉",
    molecularWeight: 810.97,
    smiles: "CCC1(O)CC2CC(C1)N(C)C3=CC(=C(OC)C=C23)C(=O)OC.CCC4=C5CC6(CC(OC(C)=O)C7(CC)C=CCN8CCC67)C(O)(C(OC)=O)C5=C(C9=CC=CC=C9N4)C%10CCCN%10",
    pubchemCid: 241903,
    category: "alkaloid",
    categoryLabel: "Monoterpene Indole Alkaloid",
    color: "#BE185D",
    description:
      "A bisindole alkaloid formed by the coupling of catharanthine and vindoline — two monomeric monoterpene indole alkaloids. This dimerization is catalyzed by the peroxidase PRX1 in the vacuole. The complete pathway from tryptophan and geraniol to vinblastine involves over 30 enzymatic steps.",
    function:
      "Potent antimitotic compound that binds tubulin and prevents microtubule polymerization, arresting cell division at metaphase. This mechanism makes vinblastine an essential chemotherapy drug for Hodgkin lymphoma and testicular cancer, with cure rates exceeding 90%.",
    plants: [
      { species: "Catharanthus roseus", commonName: "Madagascar Periwinkle", tissue: "Leaves, stems" },
    ],
    genes: [
      { name: "STR", fullName: "Strictosidine Synthase", enzyme: "Strictosidine synthase", ecNumber: "4.3.3.2", organism: "Catharanthus roseus" },
      { name: "TDC", fullName: "Tryptophan Decarboxylase", enzyme: "Aromatic-L-amino-acid decarboxylase", ecNumber: "4.1.1.28", organism: "Catharanthus roseus" },
      { name: "PRX1", fullName: "Peroxidase 1", enzyme: "Alpha-3',4'-anhydrovinblastine synthase", ecNumber: "1.11.1.21", organism: "Catharanthus roseus" },
    ],
    pathway: "Monoterpene Indole Alkaloid / Secologanin Pathway",
    pathwayId: "mia",
    funFact:
      "It takes approximately 500 kg of dried Catharanthus roseus leaves to produce just 1 gram of vinblastine — the extreme scarcity and the 30+ biosynthetic steps have made it one of the most valuable plant-derived pharmaceuticals, driving intense efforts to engineer microbial production.",
  },
  {
    id: "quinine",
    name: "(R)-(6-Methoxyquinolin-4-yl)((2S,4S,8R)-8-vinylquinuclidin-2-yl)methanol",
    commonName: "Quinine",
    formula: "C₂₀H₂₄N₂O₂",
    molecularWeight: 324.42,
    smiles: "COC1=CC2=C(C=CN=C2C=C1)C(O)C3CC4CCN3CC4C=C",
    pubchemCid: 3034034,
    category: "alkaloid",
    categoryLabel: "Quinoline Alkaloid",
    color: "#3B82F6",
    description:
      "A quinoline alkaloid biosynthesized from tryptophan and the monoterpene secologanin via strictosidine, placing it in the broader monoterpene indole alkaloid family. The pathway from strictosidine to quinine involves extensive skeletal rearrangements that remain only partially characterized at the enzymatic level.",
    function:
      "Bitter-tasting defense alkaloid concentrated in Cinchona bark, deterring herbivores and pathogenic microorganisms. Quinine's antimalarial activity results from its accumulation in Plasmodium food vacuoles, where it inhibits heme polymerization and causes toxic free heme buildup.",
    plants: [
      { species: "Cinchona officinalis", commonName: "Quinine Tree", tissue: "Bark" },
      { species: "Cinchona pubescens", commonName: "Red Cinchona", tissue: "Bark" },
    ],
    genes: [
      { name: "STR", fullName: "Strictosidine Synthase", enzyme: "Strictosidine synthase", ecNumber: "4.3.3.2", organism: "Cinchona ledgeriana" },
      { name: "TDC", fullName: "Tryptophan Decarboxylase", enzyme: "Aromatic-L-amino-acid decarboxylase", ecNumber: "4.1.1.28", organism: "Cinchona ledgeriana" },
      { name: "SLS", fullName: "Secologanin Synthase (CYP76A26)", enzyme: "Secologanin synthase", ecNumber: "1.3.3.9", organism: "Cinchona ledgeriana" },
    ],
    pathway: "Monoterpene Indole Alkaloid Pathway",
    pathwayId: "mia",
    funFact:
      "The quest for quinine shaped colonial history: the British Empire's ability to colonize malaria-endemic regions depended on Cinchona bark, and the Dutch monopoly on Cinchona plantations in Java made them a geopolitical superpower in tropical medicine until World War II.",
  },
  {
    id: "theobromine",
    name: "3,7-Dimethylxanthine",
    commonName: "Theobromine",
    formula: "C₇H₈N₄O₂",
    molecularWeight: 180.16,
    smiles: "CN1C=NC2=C1C(=O)NC(=O)N2C",
    pubchemCid: 5429,
    category: "alkaloid",
    categoryLabel: "Purine Alkaloid",
    color: "#78350F",
    description:
      "A dimethylxanthine and the principal alkaloid of cacao, differing from caffeine by lacking the 1-N-methyl group. Theobromine is synthesized from xanthosine through sequential N-methylations: xanthosine to 7-methylxanthine to theobromine, catalyzed by N-methyltransferases including BTS1/CsTCS.",
    function:
      "Insecticidal defense compound that acts as a competitive phosphodiesterase inhibitor, disrupting cAMP signaling in insect nervous systems. Theobromine also has mild diuretic, vasodilator, and cardiac stimulant effects in mammals, though it is a weaker CNS stimulant than caffeine.",
    plants: [
      { species: "Theobroma cacao", commonName: "Cacao", tissue: "Seeds (cacao beans)" },
      { species: "Camellia sinensis", commonName: "Tea", tissue: "Leaves" },
      { species: "Ilex paraguariensis", commonName: "Yerba Mate", tissue: "Leaves" },
    ],
    genes: [
      { name: "BTS1", fullName: "Theobromine Synthase 1 (CsTCS)", enzyme: "Caffeine synthase / theobromine synthase", ecNumber: "2.1.1.160", organism: "Theobroma cacao" },
      { name: "XMT", fullName: "Xanthosine Methyltransferase", enzyme: "7-Methylxanthosine synthase", ecNumber: "2.1.1.158", organism: "Theobroma cacao" },
      { name: "IMPDH", fullName: "Inosine Monophosphate Dehydrogenase", enzyme: "IMP dehydrogenase", ecNumber: "1.1.1.205", organism: "Theobroma cacao" },
    ],
    pathway: "Purine Alkaloid Pathway",
    pathwayId: "alkaloid",
    funFact:
      "Theobromine is the reason chocolate is toxic to dogs — canines metabolize theobromine far more slowly than humans (half-life of ~17.5 hours vs. ~6 hours), allowing it to accumulate to cardiotoxic levels from doses that are harmless to people.",
  },
  {
    id: "colchicine",
    name: "N-[(7S)-1,2,3,10-Tetramethoxy-9-oxo-5,6,7,9-tetrahydrobenzo[a]heptalen-7-yl]acetamide",
    commonName: "Colchicine",
    formula: "C₂₂H₂₅NO₆",
    molecularWeight: 399.44,
    smiles: "COC1=CC2=C(C(OC)=C1OC)C(CC=C3C(=CC(=O)C(OC)=C23)NC(C)=O)=O",
    pubchemCid: 6167,
    category: "alkaloid",
    categoryLabel: "Tropolone Alkaloid",
    color: "#A855F7",
    description:
      "A tropolone alkaloid containing an unusual seven-membered ring (tropolone ring C), biosynthesized from the amino acids phenylalanine and tyrosine. The pathway involves oxidative phenol coupling and ring expansion steps catalyzed by cytochrome P450 enzymes including CYP71FB1.",
    function:
      "Potent antimitotic toxin that binds tubulin and prevents microtubule assembly, blocking cell division. In medicine, colchicine is used to treat gout and familial Mediterranean fever. In plant science, it is invaluable for inducing polyploidy by blocking chromosome segregation during mitosis.",
    plants: [
      { species: "Colchicum autumnale", commonName: "Autumn Crocus", tissue: "Corms, seeds" },
      { species: "Gloriosa superba", commonName: "Flame Lily", tissue: "Tubers, seeds" },
    ],
    genes: [
      { name: "NMT", fullName: "N-Methyltransferase", enzyme: "Autumnaline N-methyltransferase", organism: "Colchicum autumnale" },
      { name: "CYP71FB1", fullName: "Cytochrome P450 71FB1", enzyme: "Para-para phenol coupling oxidase", organism: "Colchicum autumnale" },
      { name: "3-OAT", fullName: "3-O-Acetyltransferase", enzyme: "Demecolcine 3-O-acetyltransferase", organism: "Colchicum autumnale" },
    ],
    pathway: "Tropolone Alkaloid Pathway",
    pathwayId: "alkaloid",
    funFact:
      "Colchicine is the single most important chemical tool in plant breeding — by blocking spindle fiber formation, it doubles chromosome numbers, creating polyploid crops with larger fruits, seeds, and flowers. Seedless watermelons are made using colchicine-induced tetraploidy.",
  },
  {
    id: "limonene",
    name: "(4R)-1-Methyl-4-(prop-1-en-2-yl)cyclohex-1-ene",
    commonName: "(R)-Limonene",
    formula: "C₁₀H₁₆",
    molecularWeight: 136.23,
    smiles: "CC1=CCC(CC1)C(=C)C",
    pubchemCid: 22311,
    category: "terpenoid",
    categoryLabel: "Monoterpene",
    color: "#FCD34D",
    description:
      "The most abundant monocyclic monoterpene in nature, produced by cyclization of geranyl diphosphate (GPP) catalyzed by limonene synthase. (R)-Limonene (d-limonene) is the dominant enantiomer in citrus, comprising over 90% of orange peel essential oil.",
    function:
      "Volatile defense compound that deters herbivorous insects and attracts predatory parasitoid wasps (indirect defense). Limonene also has antifungal properties against citrus pathogens. The compound is a major component of citrus fruit aroma and flavor.",
    plants: [
      { species: "Citrus sinensis", commonName: "Sweet Orange", tissue: "Fruit peel (oil glands)" },
      { species: "Citrus limon", commonName: "Lemon", tissue: "Fruit peel" },
      { species: "Mentha spicata", commonName: "Spearmint", tissue: "Glandular trichomes" },
    ],
    genes: [
      { name: "LS", fullName: "d-Limonene Synthase", enzyme: "(4S)-limonene synthase", ecNumber: "4.2.3.16", organism: "Citrus sinensis" },
      { name: "GPPS", fullName: "Geranyl Diphosphate Synthase", enzyme: "Geranyl diphosphate synthase", ecNumber: "2.5.1.1", organism: "Citrus sinensis" },
      { name: "DXS", fullName: "1-Deoxy-D-xylulose-5-phosphate Synthase", enzyme: "DXP synthase", ecNumber: "2.2.1.7", organism: "Citrus sinensis" },
    ],
    pathway: "Monoterpene / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Orange peel contains so much limonene (up to 97% of peel oil) that squeezing a citrus peel near a candle flame produces a dramatic burst of fire — the fine mist of limonene is highly flammable with a flash point of only 48 degrees C.",
  },
  {
    id: "lycopene",
    name: "psi,psi-Carotene",
    commonName: "Lycopene",
    formula: "C₄₀H₅₆",
    molecularWeight: 536.87,
    smiles: "CC(=C/C=C/C=C(C)/C=C/C=C(C)/C=C/C=C(C)/C=C/C=C(\\C)C=CC=C(\\C)C=CC=C(C)C)\\C",
    pubchemCid: 446925,
    category: "carotenoid",
    categoryLabel: "Carotenoid",
    color: "#DC2626",
    description:
      "An acyclic C40 carotenoid and the direct biosynthetic precursor to beta-carotene. Lycopene is synthesized from phytoene through four sequential desaturation reactions (by PDS and ZDS) and two isomerization steps (by Z-ISO and CRTISO), generating the fully conjugated system of 11 double bonds responsible for its intense red color.",
    function:
      "Accessory photosynthetic pigment and powerful singlet oxygen quencher — lycopene is one of the most efficient biological quenchers of singlet oxygen known. In ripe tomato fruit, lycopene accumulates massively in chromoplasts, producing the red color that attracts seed-dispersing animals.",
    plants: [
      { species: "Solanum lycopersicum", commonName: "Tomato", tissue: "Ripe fruit" },
      { species: "Citrullus lanatus", commonName: "Watermelon", tissue: "Fruit flesh" },
      { species: "Momordica charantia", commonName: "Gac Fruit", tissue: "Aril" },
    ],
    genes: [
      { name: "PSY1", fullName: "Phytoene Synthase 1", enzyme: "Phytoene synthase", ecNumber: "2.5.1.32", chromosome: "Chr3", organism: "Solanum lycopersicum" },
      { name: "PDS", fullName: "Phytoene Desaturase", enzyme: "Phytoene desaturase", ecNumber: "1.3.5.5", organism: "Solanum lycopersicum" },
      { name: "ZDS", fullName: "Zeta-Carotene Desaturase", enzyme: "Zeta-carotene desaturase", ecNumber: "1.3.5.6", organism: "Solanum lycopersicum" },
    ],
    pathway: "MEP / Carotenoid Pathway",
    pathwayId: "carotenoid-pathway",
    funFact:
      "The tomato mutation 'tangerine' (t) disrupts CRTISO, causing accumulation of poly-cis-lycopene isomers instead of all-trans-lycopene — turning the fruit orange. This single gene explains why some heirloom tomatoes are orange rather than red.",
  },
  {
    id: "linalool",
    name: "3,7-Dimethylocta-1,6-dien-3-ol",
    commonName: "Linalool",
    formula: "C₁₀H₁₈O",
    molecularWeight: 154.25,
    smiles: "CC(=CCCC(C)(O)C=C)C",
    pubchemCid: 6549,
    category: "terpenoid",
    categoryLabel: "Monoterpene Alcohol",
    color: "#C084FC",
    description:
      "An acyclic monoterpene alcohol produced by linalool synthase from geranyl diphosphate. Linalool exists as two enantiomers: (R)-(-)-linalool (licareol) predominates in lavender and sweet basil, while (S)-(+)-linalool (coriandrol) is found in coriander and sweet orange.",
    function:
      "Volatile signal molecule with dual ecological roles: attracts pollinators (especially bees and moths) to flowers, and repels herbivorous insects from vegetative tissues. Linalool emission increases dramatically upon herbivore attack, recruiting parasitoid wasps as an indirect defense.",
    plants: [
      { species: "Lavandula angustifolia", commonName: "Lavender", tissue: "Flowers, glandular trichomes" },
      { species: "Ocimum basilicum", commonName: "Sweet Basil", tissue: "Leaves, flowers" },
      { species: "Coriandrum sativum", commonName: "Coriander", tissue: "Seeds, leaves" },
    ],
    genes: [
      { name: "LIS", fullName: "Linalool Synthase", enzyme: "(3S)-linalool synthase", ecNumber: "4.2.3.25", organism: "Clarkia breweri" },
      { name: "GPPS", fullName: "Geranyl Diphosphate Synthase", enzyme: "Geranyl diphosphate synthase", ecNumber: "2.5.1.1", organism: "Lavandula angustifolia" },
      { name: "DXR", fullName: "1-Deoxy-D-xylulose 5-Phosphate Reductoisomerase", enzyme: "DXP reductoisomerase", ecNumber: "1.1.1.267", organism: "Lavandula angustifolia" },
    ],
    pathway: "Monoterpene / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Linalool is one of the most widespread floral scent compounds in nature — it is produced by over 200 plant families and is detected by virtually every pollinator species studied. Its ubiquity suggests it may have been one of the earliest volatile signals to evolve for pollinator attraction.",
  },
  {
    id: "steviol",
    name: "ent-13-Hydroxykaur-16-en-19-oic acid",
    commonName: "Steviol",
    formula: "C₂₀H₃₀O₃",
    molecularWeight: 318.45,
    smiles: "OC(=O)C12CCC3C(CC=C4CC(O)(CCC34C)C)C1CCC2",
    pubchemCid: 442089,
    category: "terpenoid",
    categoryLabel: "Diterpene",
    color: "#86EFAC",
    description:
      "The aglycone backbone of steviol glycosides (stevioside and rebaudioside A), biosynthesized via the MEP pathway through geranylgeranyl diphosphate and ent-kaurene. Kaurene synthase cyclizes GGPP to ent-kaurene, which kaurene oxidase (CYP701A) then hydroxylates to produce steviol.",
    function:
      "The steviol glycosides derived from this scaffold are intensely sweet (200-300x sweeter than sucrose), possibly serving as insect deterrents in Stevia rebaudiana. The glycosylated forms are non-caloric natural sweeteners approved as food additives worldwide.",
    plants: [
      { species: "Stevia rebaudiana", commonName: "Stevia", tissue: "Leaves" },
    ],
    genes: [
      { name: "KS", fullName: "ent-Kaurene Synthase", enzyme: "ent-kaurene synthase", ecNumber: "4.2.3.19", organism: "Stevia rebaudiana" },
      { name: "KO", fullName: "ent-Kaurene Oxidase (CYP701A)", enzyme: "ent-kaurene oxidase", ecNumber: "1.14.14.86", organism: "Stevia rebaudiana" },
      { name: "UGT76G1", fullName: "UDP-Glycosyltransferase 76G1", enzyme: "Steviol-13-O-glucoside glucosyltransferase", ecNumber: "2.4.1.-", organism: "Stevia rebaudiana" },
    ],
    pathway: "Diterpenoid / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Stevia rebaudiana was used by the Guarani people of Paraguay for over 1,500 years to sweeten yerba mate tea — but steviol glycosides were not commercially approved as food sweeteners in the US and EU until 2008-2011, despite decades of safe use in Japan since the 1970s.",
  },
  {
    id: "cannabidiol",
    name: "2-[(1R,6R)-3-Methyl-6-(prop-1-en-2-yl)cyclohex-2-en-1-yl]-5-pentylbenzene-1,3-diol",
    commonName: "CBD",
    formula: "C₂₁H₃₀O₂",
    molecularWeight: 314.46,
    smiles: "CCCCCC1=CC(O)=C(C2C=C(C)CCC2C(=C)C)C(O)=C1",
    pubchemCid: 644019,
    category: "terpenoid",
    categoryLabel: "Terpenophenolic",
    color: "#16A34A",
    description:
      "A terpenophenolic compound derived from the condensation of olivetolic acid (a polyketide) with geranyl diphosphate by an aromatic prenyltransferase (GOT). The prenylated intermediate cannabigerolic acid (CBGA) is then oxidatively cyclized by CBDAS to form cannabidiolic acid, which decarboxylates to CBD.",
    function:
      "Defense compound produced in glandular trichomes of Cannabis, likely deterring herbivores and providing UV-B protection. Unlike THC, cannabidiol does not produce psychoactive effects — it modulates the endocannabinoid system without directly activating CB1 receptors.",
    plants: [
      { species: "Cannabis sativa", commonName: "Hemp / Cannabis", tissue: "Glandular trichomes (flowers, leaves)" },
    ],
    genes: [
      { name: "CBDAS", fullName: "Cannabidiolic Acid Synthase", enzyme: "Cannabidiolic acid synthase", ecNumber: "1.21.3.8", organism: "Cannabis sativa" },
      { name: "OLS", fullName: "Olivetol Synthase", enzyme: "Olivetol synthase (type III PKS)", ecNumber: "2.3.1.206", organism: "Cannabis sativa" },
      { name: "GOT", fullName: "Geranylpyrophosphate:Olivetolate Geranyltransferase", enzyme: "Aromatic prenyltransferase", ecNumber: "2.5.1.102", organism: "Cannabis sativa" },
    ],
    pathway: "Terpenophenolic / Cannabinoid Pathway",
    pathwayId: "terpenoid",
    funFact:
      "CBDAS and THCAS (which makes THC) are homologous enzymes encoded at the same genetic locus — whether a Cannabis plant produces CBD or THC is largely determined by which allele it carries at this single locus, making the chemical difference between hemp and marijuana essentially a one-gene trait.",
  },
  {
    id: "thymol",
    name: "2-Isopropyl-5-methylphenol",
    commonName: "Thymol",
    formula: "C₁₀H₁₄O",
    molecularWeight: 150.22,
    smiles: "CC1=CC(O)=C(C(C)C)C=C1",
    pubchemCid: 6989,
    category: "terpenoid",
    categoryLabel: "Monoterpene Phenol",
    color: "#65A30D",
    description:
      "A monoterpene phenol biosynthesized from gamma-terpinene through aromatization and hydroxylation by cytochrome P450 enzymes CYP71D178 and CYP71D180. Thymol is the principal component of thyme essential oil, comprising 20-55% of the volatile fraction.",
    function:
      "Broad-spectrum antimicrobial compound effective against bacteria, fungi, and parasites. Thymol disrupts cell membranes by interacting with membrane lipids, increasing permeability and causing leakage of cellular contents. Also serves as an insect deterrent in thyme and oregano leaves.",
    plants: [
      { species: "Thymus vulgaris", commonName: "Thyme", tissue: "Leaves, glandular trichomes" },
      { species: "Origanum vulgare", commonName: "Oregano", tissue: "Leaves" },
      { species: "Trachyspermum ammi", commonName: "Ajwain", tissue: "Seeds" },
    ],
    genes: [
      { name: "TPS2", fullName: "Gamma-Terpinene Synthase", enzyme: "Gamma-terpinene synthase", ecNumber: "4.2.3.114", organism: "Thymus vulgaris" },
      { name: "CYP71D178", fullName: "Cytochrome P450 71D178", enzyme: "Gamma-terpinene hydroxylase", organism: "Thymus vulgaris" },
      { name: "CYP71D180", fullName: "Cytochrome P450 71D180", enzyme: "p-Cymene hydroxylase", organism: "Thymus vulgaris" },
    ],
    pathway: "Monoterpene / MEP Pathway",
    pathwayId: "terpenoid",
    funFact:
      "Thymol is the active ingredient in Listerine mouthwash (since 1879) and is used by beekeepers to control Varroa mites — it is one of only a few plant monoterpenes approved as a veterinary medicine, demonstrating how a 400-million-year-old plant defense compound became modern medicine.",
  },
  {
    id: "sulforaphane",
    name: "1-Isothiocyanato-4-(methylsulfinyl)butane",
    commonName: "Sulforaphane",
    formula: "C₆H₁₁NOS₂",
    molecularWeight: 177.29,
    smiles: "CS(=O)CCCCN=C=S",
    pubchemCid: 5350,
    category: "glucosinolate",
    categoryLabel: "Isothiocyanate (Glucosinolate-derived)",
    color: "#EAB308",
    description:
      "An isothiocyanate produced by myrosinase-catalyzed hydrolysis of glucoraphanin (4-methylsulfinylbutyl glucosinolate). The parent glucosinolate is biosynthesized from methionine through chain elongation (MAM), CYP79F1-mediated aldoxime formation, and CYP83A1-catalyzed oxidation, followed by conjugation to a glucose-thiohydroximate scaffold.",
    function:
      "Part of the 'mustard oil bomb' defense system: glucoraphanin and myrosinase are stored in separate cellular compartments, and upon tissue damage by herbivores, they mix to release toxic sulforaphane. This compound is also a potent inducer of mammalian phase II detoxification enzymes via the Nrf2-Keap1 pathway, making it one of the most studied cancer chemopreventive agents.",
    plants: [
      { species: "Brassica oleracea var. italica", commonName: "Broccoli", tissue: "Sprouts, florets" },
      { species: "Brassica oleracea var. gemmifera", commonName: "Brussels Sprouts", tissue: "Buds" },
      { species: "Brassica oleracea var. botrytis", commonName: "Cauliflower", tissue: "Florets" },
    ],
    genes: [
      { name: "MAM", fullName: "Methylthioalkylmalate Synthase", enzyme: "Methylthioalkylmalate synthase", ecNumber: "2.3.3.17", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
      { name: "CYP79F1", fullName: "Cytochrome P450 79F1", enzyme: "Dihomomethionine N-monooxygenase", ecNumber: "1.14.14.45", chromosome: "Chr1", organism: "Arabidopsis thaliana" },
      { name: "MYR", fullName: "Myrosinase (TGG1)", enzyme: "Thioglucoside glucohydrolase", ecNumber: "3.2.1.147", chromosome: "Chr5", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Aliphatic Glucosinolate Pathway",
    pathwayId: "glucosinolate",
    funFact:
      "Three-day-old broccoli sprouts contain 20-50 times more glucoraphanin than mature broccoli heads — this discovery by Paul Talalay's lab at Johns Hopkins in 1997 launched a global broccoli sprout industry and made sulforaphane one of the most intensively studied dietary bioactive compounds.",
  },
  {
    id: "sinigrin",
    name: "Potassium [(E)-2-(prop-2-en-1-ylsulfanyl)-1-(sulfonatooxy)ethylidene]azanide 1-(beta-D-glucopyranosylthio)-N-(sulfonatooxy)but-3-enimidoate",
    commonName: "Sinigrin",
    formula: "C₁₀H₁₆KNO₉S₂",
    molecularWeight: 397.46,
    smiles: "OCC1OC(SC(/CC=C)=N/OS(O)(=O)=O)C(O)C(O)C1O",
    pubchemCid: 6911854,
    category: "glucosinolate",
    categoryLabel: "Glucosinolate",
    color: "#A3E635",
    description:
      "An alkenyl glucosinolate (allyl glucosinolate) and one of the most abundant glucosinolates in Brassicaceae. Sinigrin is biosynthesized from methionine via chain elongation and the core glucosinolate pathway: CYP79B2 converts the amino acid to an aldoxime, CYP83B1 oxidizes it, and subsequent steps attach the glucose-thiohydroximate moiety.",
    function:
      "Central component of the glucosinolate-myrosinase 'mustard oil bomb' defense system. Upon tissue damage, myrosinase cleaves sinigrin to release allyl isothiocyanate (AITC) — the pungent compound in mustard and horseradish. AITC is toxic to generalist herbivores but paradoxically attracts specialist feeders like Pieris rapae (cabbage white butterfly).",
    plants: [
      { species: "Brassica nigra", commonName: "Black Mustard", tissue: "Seeds, leaves" },
      { species: "Armoracia rusticana", commonName: "Horseradish", tissue: "Roots" },
      { species: "Brassica juncea", commonName: "Brown Mustard", tissue: "Seeds" },
    ],
    genes: [
      { name: "CYP79B2", fullName: "Cytochrome P450 79B2", enzyme: "Tryptophan N-monooxygenase", ecNumber: "1.14.14.156", chromosome: "Chr4", organism: "Arabidopsis thaliana" },
      { name: "CYP83B1", fullName: "Cytochrome P450 83B1", enzyme: "Oxime-oxidizing enzyme", ecNumber: "1.14.14.44", chromosome: "Chr4", organism: "Arabidopsis thaliana" },
      { name: "UGT74B1", fullName: "UDP-Glucosyltransferase 74B1", enzyme: "Thiohydroximate S-glucosyltransferase", ecNumber: "2.4.1.-", chromosome: "Chr1", organism: "Arabidopsis thaliana" },
    ],
    pathway: "Glucosinolate Pathway",
    pathwayId: "glucosinolate",
    funFact:
      "The 'wasabi' served in most restaurants outside Japan is actually horseradish and mustard dyed green — both derive their pungency from allyl isothiocyanate released from sinigrin, the same molecule that gives black mustard its bite. Real wasabi (Wasabia japonica) uses a different glucosinolate but releases a similar isothiocyanate.",
  },
];

export const categories = [
  { id: "all", label: "All Molecules", color: "#94A3B8" },
  { id: "alkaloid", label: "Alkaloids", color: "#8B5CF6" },
  { id: "terpenoid", label: "Terpenoids", color: "#10B981" },
  { id: "phenylpropanoid", label: "Phenylpropanoids", color: "#EC4899" },
  { id: "carotenoid", label: "Carotenoids", color: "#F97316" },
  { id: "tetrapyrrole", label: "Tetrapyrroles", color: "#22C55E" },
  { id: "glucosinolate", label: "Glucosinolates", color: "#EAB308" },
];

export function getMolecule(id: string): Molecule | undefined {
  return molecules.find((m) => m.id === id);
}
