export interface ChromosomeGene {
  name: string;
  position: number; // 0-1 relative position on chromosome
  pathway: string;
  color: string;
  moleculeId?: string;
}

export interface Chromosome {
  id: string;
  name: string;
  lengthMb: number;
  genes: ChromosomeGene[];
}

export interface PlantGenome {
  id: string;
  species: string;
  commonName: string;
  genomeSizeMb: number;
  chromosomeCount: number;
  ploidy: string;
  yearSequenced: number;
  description: string;
  chromosomes: Chromosome[];
  imageColor: string;
}

export const genomes: PlantGenome[] = [
  {
    id: "arabidopsis",
    species: "Arabidopsis thaliana",
    commonName: "Thale Cress",
    genomeSizeMb: 135,
    chromosomeCount: 5,
    ploidy: "Diploid (2n = 10)",
    yearSequenced: 2000,
    description:
      "The first plant genome to be fully sequenced, Arabidopsis is the primary model organism for plant molecular biology. Its small genome (~135 Mb across 5 chromosomes) encodes approximately 27,000 genes, including extensive secondary metabolite gene families.",
    imageColor: "#22C55E",
    chromosomes: [
      {
        id: "at-chr1", name: "Chr 1", lengthMb: 30.4,
        genes: [
          { name: "CHLG", position: 0.35, pathway: "Chlorophyll", color: "#22C55E", moleculeId: "chlorophyll-a" },
          { name: "PAL1", position: 0.65, pathway: "Phenylpropanoid", color: "#EC4899" },
          { name: "4CL1", position: 0.78, pathway: "Phenylpropanoid", color: "#EC4899" },
        ],
      },
      {
        id: "at-chr2", name: "Chr 2", lengthMb: 19.7,
        genes: [
          { name: "DXS", position: 0.25, pathway: "MEP/Terpenoid", color: "#10B981" },
          { name: "PAL2", position: 0.55, pathway: "Phenylpropanoid", color: "#EC4899" },
        ],
      },
      {
        id: "at-chr3", name: "Chr 3", lengthMb: 23.5,
        genes: [
          { name: "LCYB", position: 0.3, pathway: "Carotenoid", color: "#F97316", moleculeId: "beta-carotene" },
          { name: "PDS", position: 0.55, pathway: "Carotenoid", color: "#F97316" },
          { name: "CHS", position: 0.72, pathway: "Flavonoid", color: "#EC4899", moleculeId: "cyanidin" },
        ],
      },
      {
        id: "at-chr4", name: "Chr 4", lengthMb: 18.6,
        genes: [
          { name: "ANS", position: 0.2, pathway: "Anthocyanin", color: "#7C3AED", moleculeId: "cyanidin" },
          { name: "POR", position: 0.45, pathway: "Chlorophyll", color: "#22C55E", moleculeId: "chlorophyll-a" },
          { name: "F3H", position: 0.7, pathway: "Flavonoid", color: "#EC4899" },
        ],
      },
      {
        id: "at-chr5", name: "Chr 5", lengthMb: 26.9,
        genes: [
          { name: "PSY", position: 0.15, pathway: "Carotenoid", color: "#F97316", moleculeId: "beta-carotene" },
          { name: "DFR", position: 0.4, pathway: "Anthocyanin", color: "#7C3AED", moleculeId: "cyanidin" },
          { name: "CHI", position: 0.65, pathway: "Flavonoid", color: "#EC4899" },
          { name: "GGPPS", position: 0.85, pathway: "Terpenoid", color: "#10B981" },
        ],
      },
    ],
  },
  {
    id: "vitis",
    species: "Vitis vinifera",
    commonName: "Grapevine",
    genomeSizeMb: 487,
    chromosomeCount: 19,
    ploidy: "Diploid (2n = 38)",
    yearSequenced: 2007,
    description:
      "The grapevine genome is notable for its massive expansion of stilbene synthase (STS) genes — over 40 copies — reflecting intense evolutionary selection for resveratrol-mediated disease resistance. It also has one of the largest known terpene synthase gene families.",
    imageColor: "#7C3AED",
    chromosomes: [
      { id: "vv-chr1", name: "Chr 1", lengthMb: 23.0, genes: [{ name: "PAL", position: 0.3, pathway: "Phenylpropanoid", color: "#EC4899" }] },
      { id: "vv-chr5", name: "Chr 5", lengthMb: 25.0, genes: [{ name: "CHS", position: 0.5, pathway: "Flavonoid", color: "#EC4899" }] },
      { id: "vv-chr10", name: "Chr 10", lengthMb: 18.1, genes: [{ name: "STS-cluster", position: 0.4, pathway: "Stilbenoid", color: "#EC4899", moleculeId: "resveratrol" }] },
      { id: "vv-chr16", name: "Chr 16", lengthMb: 22.7, genes: [
        { name: "STS1", position: 0.2, pathway: "Stilbenoid", color: "#EC4899", moleculeId: "resveratrol" },
        { name: "STS2", position: 0.22, pathway: "Stilbenoid", color: "#EC4899" },
        { name: "STS3", position: 0.24, pathway: "Stilbenoid", color: "#EC4899" },
        { name: "STS4", position: 0.26, pathway: "Stilbenoid", color: "#EC4899" },
        { name: "STS-cluster-2", position: 0.6, pathway: "Stilbenoid", color: "#EC4899" },
      ]},
    ],
  },
  {
    id: "capsicum",
    species: "Capsicum annuum",
    commonName: "Chili Pepper",
    genomeSizeMb: 3480,
    chromosomeCount: 12,
    ploidy: "Diploid (2n = 24)",
    yearSequenced: 2014,
    description:
      "The chili pepper genome is remarkably large (~3.5 Gb) due to massive transposable element expansion. The capsaicin biosynthetic genes are clustered on chromosomes 2 and 3, with the key CS and pAMT genes controlling the pungency trait.",
    imageColor: "#EF4444",
    chromosomes: [
      { id: "ca-chr2", name: "Chr 2", lengthMb: 175, genes: [
        { name: "CS/AT3", position: 0.35, pathway: "Capsaicinoid", color: "#EF4444", moleculeId: "capsaicin" },
        { name: "KAS", position: 0.55, pathway: "Fatty acid", color: "#EF4444" },
      ]},
      { id: "ca-chr3", name: "Chr 3", lengthMb: 260, genes: [
        { name: "pAMT", position: 0.4, pathway: "Capsaicinoid", color: "#EF4444", moleculeId: "capsaicin" },
      ]},
      { id: "ca-chr6", name: "Chr 6", lengthMb: 230, genes: [
        { name: "CCS", position: 0.3, pathway: "Carotenoid", color: "#F97316" },
      ]},
    ],
  },
  {
    id: "nicotiana",
    species: "Nicotiana tabacum",
    commonName: "Tobacco",
    genomeSizeMb: 4500,
    chromosomeCount: 24,
    ploidy: "Allotetraploid (2n = 48)",
    yearSequenced: 2014,
    description:
      "Tobacco has one of the largest sequenced plant genomes (~4.5 Gb), resulting from an ancient hybridization between two ancestral Nicotiana species. Nicotine biosynthetic genes are expressed specifically in root tissues, with the alkaloid transported to leaves via xylem.",
    imageColor: "#6366F1",
    chromosomes: [
      { id: "nt-chr7", name: "Chr 7", lengthMb: 180, genes: [
        { name: "A622", position: 0.45, pathway: "Nicotine", color: "#6366F1", moleculeId: "nicotine" },
      ]},
      { id: "nt-chr12", name: "Chr 12", lengthMb: 155, genes: [
        { name: "PMT1", position: 0.3, pathway: "Nicotine", color: "#6366F1", moleculeId: "nicotine" },
        { name: "PMT2", position: 0.32, pathway: "Nicotine", color: "#6366F1" },
        { name: "QPT", position: 0.6, pathway: "Nicotine", color: "#6366F1", moleculeId: "nicotine" },
      ]},
      { id: "nt-chr19", name: "Chr 19", lengthMb: 140, genes: [
        { name: "PMT3", position: 0.55, pathway: "Nicotine", color: "#6366F1" },
      ]},
    ],
  },
  {
    id: "rice",
    species: "Oryza sativa",
    commonName: "Rice",
    genomeSizeMb: 430,
    chromosomeCount: 12,
    ploidy: "Diploid (2n = 24)",
    yearSequenced: 2005,
    description:
      "Rice feeds more than half of humanity and was the first crop genome fully sequenced. Its compact ~430 Mb genome across 12 chromosomes is a model for cereal genomics, with well-characterized stress response gene families and the SUB1A submergence tolerance locus that has already transformed flood-prone rice agriculture.",
    imageColor: "#22D3EE",
    chromosomes: [
      { id: "os-chr1", name: "Chr 1", lengthMb: 43.3, genes: [
        { name: "OsNHX1", position: 0.35, pathway: "Vacuolar transport", color: "#2DD4BF" },
        { name: "OsPSY1", position: 0.72, pathway: "Carotenoid", color: "#F97316" },
      ]},
      { id: "os-chr3", name: "Chr 3", lengthMb: 36.4, genes: [
        { name: "OsDREB2A", position: 0.28, pathway: "Drought response", color: "#F59E0B" },
        { name: "OsNAC9", position: 0.65, pathway: "Stress TF", color: "#F59E0B" },
      ]},
      { id: "os-chr4", name: "Chr 4", lengthMb: 35.5, genes: [
        { name: "OsSOS1", position: 0.4, pathway: "Salt tolerance", color: "#2DD4BF" },
        { name: "OsHKT1;5", position: 0.68, pathway: "Na+ transport", color: "#2DD4BF" },
      ]},
      { id: "os-chr7", name: "Chr 7", lengthMb: 29.7, genes: [
        { name: "OsGW7", position: 0.45, pathway: "Grain width", color: "#4ADE80" },
        { name: "OsCBF3", position: 0.72, pathway: "Cold response", color: "#38BDF8" },
      ]},
      { id: "os-chr9", name: "Chr 9", lengthMb: 23.0, genes: [
        { name: "SUB1A", position: 0.33, pathway: "Submergence", color: "#60A5FA" },
        { name: "OsWRKY45", position: 0.6, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "os-chr11", name: "Chr 11", lengthMb: 28.4, genes: [
        { name: "Pi54", position: 0.48, pathway: "Blast resistance", color: "#F472B6" },
      ]},
    ],
  },
  {
    id: "maize",
    species: "Zea mays",
    commonName: "Maize (Corn)",
    genomeSizeMb: 2300,
    chromosomeCount: 10,
    ploidy: "Diploid (2n = 20) — paleotetraploid",
    yearSequenced: 2009,
    description:
      "The most produced grain globally, maize has a large ~2.3 Gb genome shaped by an ancient whole-genome duplication. Its C4 photosynthetic machinery makes it inherently more water-use efficient than C3 crops, but it remains highly sensitive to drought during flowering.",
    imageColor: "#FACC15",
    chromosomes: [
      { id: "zm-chr1", name: "Chr 1", lengthMb: 301, genes: [
        { name: "ZmDREB2A", position: 0.22, pathway: "Drought", color: "#F59E0B" },
        { name: "ZmSOS1", position: 0.55, pathway: "Salt", color: "#2DD4BF" },
        { name: "ZmNAC111", position: 0.78, pathway: "Stress", color: "#F59E0B" },
      ]},
      { id: "zm-chr3", name: "Chr 3", lengthMb: 236, genes: [
        { name: "ZmPSY1", position: 0.35, pathway: "Carotenoid", color: "#F97316" },
        { name: "ZmVP14/NCED", position: 0.6, pathway: "ABA biosynthesis", color: "#F59E0B" },
      ]},
      { id: "zm-chr5", name: "Chr 5", lengthMb: 218, genes: [
        { name: "ZmCBF", position: 0.42, pathway: "Cold", color: "#38BDF8" },
        { name: "ZmNPR1", position: 0.7, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "zm-chr8", name: "Chr 8", lengthMb: 175, genes: [
        { name: "ZmHSP101", position: 0.38, pathway: "Heat shock", color: "#F97316" },
        { name: "ZmLCYB", position: 0.72, pathway: "Carotenoid", color: "#F97316" },
      ]},
      { id: "zm-chr10", name: "Chr 10", lengthMb: 150, genes: [
        { name: "ZmCCT", position: 0.3, pathway: "Flowering", color: "#A78BFA" },
        { name: "ZmNRT1.1B", position: 0.65, pathway: "Nitrogen", color: "#34D399" },
      ]},
    ],
  },
  {
    id: "wheat",
    species: "Triticum aestivum",
    commonName: "Bread Wheat",
    genomeSizeMb: 17000,
    chromosomeCount: 21,
    ploidy: "Allohexaploid (2n = 42, AABBDD)",
    yearSequenced: 2018,
    description:
      "The largest sequenced crop genome at ~17 Gb across 21 chromosomes (7 per subgenome × 3 subgenomes: A, B, D). Its allohexaploid nature means most genes exist in three homeologous copies, requiring simultaneous editing of all three for knockout phenotypes. Wheat feeds 2.5 billion people.",
    imageColor: "#D97706",
    chromosomes: [
      { id: "ta-chr2a", name: "Chr 2A", lengthMb: 780, genes: [
        { name: "TaDREB1-A", position: 0.32, pathway: "Drought", color: "#F59E0B" },
      ]},
      { id: "ta-chr2b", name: "Chr 2B", lengthMb: 801, genes: [
        { name: "TaDREB1-B", position: 0.32, pathway: "Drought", color: "#F59E0B" },
      ]},
      { id: "ta-chr2d", name: "Chr 2D", lengthMb: 651, genes: [
        { name: "TaDREB1-D", position: 0.32, pathway: "Drought", color: "#F59E0B" },
      ]},
      { id: "ta-chr4a", name: "Chr 4A", lengthMb: 741, genes: [
        { name: "TaNAC-A", position: 0.55, pathway: "Stress", color: "#F59E0B" },
        { name: "TaGW2-A", position: 0.75, pathway: "Grain weight", color: "#4ADE80" },
      ]},
      { id: "ta-chr5a", name: "Chr 5A", lengthMb: 710, genes: [
        { name: "TaVRN1-A", position: 0.4, pathway: "Vernalization", color: "#38BDF8" },
        { name: "TaFr1-A", position: 0.62, pathway: "Frost", color: "#38BDF8" },
      ]},
      { id: "ta-chr7a", name: "Chr 7A", lengthMb: 737, genes: [
        { name: "TaPSY-A1", position: 0.35, pathway: "Carotenoid", color: "#F97316" },
        { name: "TaNPR1", position: 0.72, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "ta-chr7d", name: "Chr 7D", lengthMb: 639, genes: [
        { name: "Yr36", position: 0.45, pathway: "Stripe rust R", color: "#F472B6" },
      ]},
    ],
  },
  {
    id: "tomato",
    species: "Solanum lycopersicum",
    commonName: "Tomato",
    genomeSizeMb: 900,
    chromosomeCount: 12,
    ploidy: "Diploid (2n = 24)",
    yearSequenced: 2012,
    description:
      "The tomato genome (~900 Mb, 12 chromosomes) is the reference for Solanaceae fruit crop genomics. Rich in carotenoid and flavonoid pathway genes, tomato has become a model for studying fruit ripening, nutritional enhancement, and disease resistance. Its well-established transformation protocols make it ideal for CRISPR applications.",
    imageColor: "#EF4444",
    chromosomes: [
      { id: "sl-chr1", name: "Chr 1", lengthMb: 90, genes: [
        { name: "SlPSY1", position: 0.35, pathway: "Carotenoid", color: "#F97316" },
        { name: "SlNPR1", position: 0.7, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "sl-chr3", name: "Chr 3", lengthMb: 65, genes: [
        { name: "SlDREB2", position: 0.4, pathway: "Drought", color: "#F59E0B" },
        { name: "SlERF.B3", position: 0.72, pathway: "Ethylene/stress", color: "#F59E0B" },
      ]},
      { id: "sl-chr5", name: "Chr 5", lengthMb: 65, genes: [
        { name: "SlCHS1", position: 0.3, pathway: "Flavonoid", color: "#EC4899" },
        { name: "SlNHX2", position: 0.65, pathway: "Salt", color: "#2DD4BF" },
      ]},
      { id: "sl-chr6", name: "Chr 6", lengthMb: 46, genes: [
        { name: "SlMi-1.2", position: 0.38, pathway: "Nematode R", color: "#F472B6" },
      ]},
      { id: "sl-chr9", name: "Chr 9", lengthMb: 68, genes: [
        { name: "SlTPS", position: 0.45, pathway: "Terpene", color: "#10B981" },
        { name: "SlHSFA1a", position: 0.72, pathway: "Heat shock", color: "#F97316" },
      ]},
      { id: "sl-chr11", name: "Chr 11", lengthMb: 54, genes: [
        { name: "SlLCYB", position: 0.35, pathway: "Carotenoid", color: "#F97316" },
        { name: "SlCBF1", position: 0.65, pathway: "Cold", color: "#38BDF8" },
      ]},
    ],
  },
  {
    id: "coffee",
    species: "Coffea arabica",
    commonName: "Coffee",
    genomeSizeMb: 1100,
    chromosomeCount: 22,
    ploidy: "Allotetraploid (2n = 44)",
    yearSequenced: 2014,
    description:
      "Coffea arabica is the world's most commercially important coffee species, providing ~60% of global production. Its allotetraploid genome (~1.1 Gb) arose from hybridization between C. canephora and C. eugenioides. The genome encodes extensive N-methyltransferase gene families responsible for caffeine biosynthesis, and terpene synthases producing the volatile flavor compounds.",
    imageColor: "#92400E",
    chromosomes: [
      { id: "ca-chr1", name: "Chr 1", lengthMb: 55, genes: [
        { name: "CaXMT", position: 0.35, pathway: "Caffeine biosynthesis", color: "#92400E", moleculeId: "caffeine" },
        { name: "CaCCS1", position: 0.72, pathway: "Caffeoyl-CoA synthase", color: "#92400E" },
      ]},
      { id: "ca-chr4", name: "Chr 4", lengthMb: 48, genes: [
        { name: "CaDXMT", position: 0.3, pathway: "Caffeine biosynthesis", color: "#92400E", moleculeId: "caffeine" },
        { name: "CaPAL", position: 0.65, pathway: "Phenylpropanoid", color: "#EC4899" },
      ]},
      { id: "ca-chr8", name: "Chr 8", lengthMb: 42, genes: [
        { name: "CaCBF", position: 0.4, pathway: "Cold response", color: "#38BDF8" },
        { name: "CaNPR1", position: 0.7, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "ca-chr11", name: "Chr 11", lengthMb: 38, genes: [
        { name: "CaTPS", position: 0.45, pathway: "Terpene/flavor", color: "#10B981" },
        { name: "CaCHS", position: 0.7, pathway: "Flavonoid", color: "#EC4899" },
      ]},
      { id: "ca-chr16", name: "Chr 16", lengthMb: 35, genes: [
        { name: "CaDREB", position: 0.38, pathway: "Drought response", color: "#F59E0B" },
        { name: "CaSOS1", position: 0.65, pathway: "Salt tolerance", color: "#2DD4BF" },
      ]},
    ],
  },
  {
    id: "soybean",
    species: "Glycine max",
    commonName: "Soybean",
    genomeSizeMb: 1150,
    chromosomeCount: 20,
    ploidy: "Paleopolyploid diploid (2n = 40)",
    yearSequenced: 2010,
    description:
      "Soybean is the world's most important source of plant protein and vegetable oil. Its ~1.15 Gb genome reflects an ancient whole-genome duplication, with ~75% of genes present as duplicate pairs. The genome encodes extensive nodulation genes for nitrogen-fixing symbiosis with Bradyrhizobium — a unique advantage among major crops.",
    imageColor: "#84CC16",
    chromosomes: [
      { id: "gm-chr3", name: "Chr 3", lengthMb: 47, genes: [
        { name: "GmDREB1", position: 0.32, pathway: "Drought response", color: "#F59E0B" },
        { name: "GmNARK", position: 0.7, pathway: "Nodulation", color: "#34D399" },
      ]},
      { id: "gm-chr6", name: "Chr 6", lengthMb: 51, genes: [
        { name: "GmSOS1", position: 0.4, pathway: "Salt tolerance", color: "#2DD4BF" },
        { name: "GmNFR1", position: 0.72, pathway: "Nodulation receptor", color: "#34D399" },
      ]},
      { id: "gm-chr10", name: "Chr 10", lengthMb: 51, genes: [
        { name: "GmFAD2", position: 0.35, pathway: "Fatty acid", color: "#FACC15" },
        { name: "GmNPR1", position: 0.68, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "gm-chr13", name: "Chr 13", lengthMb: 44, genes: [
        { name: "GmFT2a", position: 0.45, pathway: "Flowering", color: "#A78BFA" },
        { name: "GmE1", position: 0.7, pathway: "Maturity", color: "#A78BFA" },
      ]},
      { id: "gm-chr20", name: "Chr 20", lengthMb: 47, genes: [
        { name: "GmNHX1", position: 0.38, pathway: "Salt", color: "#2DD4BF" },
        { name: "GmHSP90", position: 0.65, pathway: "Heat shock", color: "#F97316" },
      ]},
    ],
  },
  {
    id: "potato",
    species: "Solanum tuberosum",
    commonName: "Potato",
    genomeSizeMb: 840,
    chromosomeCount: 12,
    ploidy: "Autotetraploid (2n = 48)",
    yearSequenced: 2011,
    description:
      "Potato is the world's fourth largest food crop, with a ~840 Mb genome across 12 chromosomes. Its autotetraploid nature makes conventional breeding extremely difficult — CRISPR editing is transformative for potato improvement. Key targets include reducing glycoalkaloid toxins, improving cold sweetening resistance, and enhancing late blight resistance.",
    imageColor: "#A16207",
    chromosomes: [
      { id: "st-chr1", name: "Chr 1", lengthMb: 89, genes: [
        { name: "StPSY1", position: 0.3, pathway: "Carotenoid", color: "#F97316" },
        { name: "StNPR1", position: 0.72, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "st-chr4", name: "Chr 4", lengthMb: 72, genes: [
        { name: "StCBF", position: 0.38, pathway: "Cold response", color: "#38BDF8" },
        { name: "StSGT1", position: 0.65, pathway: "Glycoalkaloid", color: "#EF4444" },
      ]},
      { id: "st-chr7", name: "Chr 7", lengthMb: 56, genes: [
        { name: "StDREB2", position: 0.4, pathway: "Drought", color: "#F59E0B" },
        { name: "StVInv", position: 0.68, pathway: "Vacuolar invertase", color: "#FACC15" },
      ]},
      { id: "st-chr9", name: "Chr 9", lengthMb: 62, genes: [
        { name: "StR1", position: 0.45, pathway: "Late blight R", color: "#F472B6" },
      ]},
      { id: "st-chr11", name: "Chr 11", lengthMb: 45, genes: [
        { name: "StNHX1", position: 0.35, pathway: "Salt", color: "#2DD4BF" },
        { name: "StBEL5", position: 0.7, pathway: "Tuberization", color: "#A78BFA" },
      ]},
    ],
  },
  {
    id: "cassava",
    species: "Manihot esculenta",
    commonName: "Cassava",
    genomeSizeMb: 770,
    chromosomeCount: 18,
    ploidy: "Diploid (2n = 36)",
    yearSequenced: 2014,
    description:
      "Cassava feeds over 800 million people, primarily in sub-Saharan Africa and Southeast Asia. Its ~770 Mb genome encodes the cyanogenic glucoside biosynthesis pathway (linamarin/lotaustralin) — a key target for CRISPR reduction of toxic cyanide potential. Cassava is remarkably drought-tolerant but susceptible to viral diseases.",
    imageColor: "#D97706",
    chromosomes: [
      { id: "me-chr1", name: "Chr 1", lengthMb: 42, genes: [
        { name: "MeCYP79D1", position: 0.35, pathway: "Cyanogenic glucoside", color: "#EF4444" },
        { name: "MeNPR1", position: 0.7, pathway: "Defense", color: "#F472B6" },
      ]},
      { id: "me-chr5", name: "Chr 5", lengthMb: 38, genes: [
        { name: "MeDREB2", position: 0.4, pathway: "Drought", color: "#F59E0B" },
        { name: "MePSY", position: 0.72, pathway: "Carotenoid/Vit A", color: "#F97316" },
      ]},
      { id: "me-chr12", name: "Chr 12", lengthMb: 33, genes: [
        { name: "MeCmd", position: 0.38, pathway: "Starch synthesis", color: "#FACC15" },
        { name: "MeGBSS", position: 0.65, pathway: "Amylose", color: "#FACC15" },
      ]},
      { id: "me-chr15", name: "Chr 15", lengthMb: 29, genes: [
        { name: "MeHKT1", position: 0.45, pathway: "Salt", color: "#2DD4BF" },
      ]},
      { id: "me-chr16", name: "Chr 16", lengthMb: 28, genes: [
        { name: "MeCMD2", position: 0.5, pathway: "CMD resistance", color: "#F472B6" },
      ]},
    ],
  },
  // ── NEW CROPS ──────────────────────────────────────────
  {
    id: "barley",
    species: "Hordeum vulgare",
    commonName: "Barley",
    genomeSizeMb: 5100,
    chromosomeCount: 7,
    ploidy: "Diploid (2n = 14)",
    yearSequenced: 2012,
    description:
      "Barley has one of the largest diploid cereal genomes (~5.1 Gb across 7 chromosomes). It is the most salt-tolerant cereal and an important model for Triticeae genomics. The genome is rich in nested transposable elements comprising >80% of sequence.",
    imageColor: "#D4A574",
    chromosomes: [
      { id: "hv-chr1h", name: "Chr 1H", lengthMb: 558, genes: [
        { name: "HvCBF14", position: 0.35, pathway: "Cold tolerance", color: "#3B82F6" },
        { name: "HvPHT1", position: 0.65, pathway: "Phosphate transport", color: "#10B981" },
      ]},
      { id: "hv-chr2h", name: "Chr 2H", lengthMb: 768, genes: [
        { name: "HvNAC005", position: 0.28, pathway: "Senescence", color: "#F59E0B" },
        { name: "HvMLA", position: 0.72, pathway: "Disease resistance", color: "#EF4444" },
      ]},
      { id: "hv-chr3h", name: "Chr 3H", lengthMb: 700, genes: [
        { name: "HvDREB1", position: 0.45, pathway: "Drought response", color: "#F59E0B" },
        { name: "HvNAS2", position: 0.78, pathway: "Zinc transport", color: "#10B981" },
      ]},
      { id: "hv-chr5h", name: "Chr 5H", lengthMb: 670, genes: [
        { name: "HvHKT1;5", position: 0.38, pathway: "Salt tolerance", color: "#2DD4BF" },
        { name: "HvICE1", position: 0.62, pathway: "Cold signaling", color: "#3B82F6" },
      ]},
      { id: "hv-chr7h", name: "Chr 7H", lengthMb: 657, genes: [
        { name: "HvGW", position: 0.4, pathway: "Grain weight", color: "#FACC15" },
        { name: "HvUVR8", position: 0.7, pathway: "UV response", color: "#7C3AED" },
      ]},
    ],
  },
  {
    id: "sorghum",
    species: "Sorghum bicolor",
    commonName: "Sorghum",
    genomeSizeMb: 730,
    chromosomeCount: 10,
    ploidy: "Diploid (2n = 20)",
    yearSequenced: 2009,
    description:
      "Sorghum is the most drought-tolerant cereal crop with a compact ~730 Mb genome. Its C4 photosynthesis and waxy cuticle enable survival in semi-arid regions. The stay-green trait has been extensively mapped to multiple QTLs across the genome.",
    imageColor: "#C2410C",
    chromosomes: [
      { id: "sb-chr1", name: "Chr 1", lengthMb: 73, genes: [
        { name: "SbDREB2", position: 0.32, pathway: "Drought response", color: "#F59E0B" },
        { name: "SbPSY1", position: 0.68, pathway: "Carotenoid", color: "#F97316" },
      ]},
      { id: "sb-chr3", name: "Chr 3", lengthMb: 74, genes: [
        { name: "SbStay-Green", position: 0.45, pathway: "Senescence delay", color: "#22C55E" },
        { name: "SbSPS1", position: 0.72, pathway: "Sucrose synthesis", color: "#FACC15" },
      ]},
      { id: "sb-chr6", name: "Chr 6", lengthMb: 62, genes: [
        { name: "SbTAN1", position: 0.35, pathway: "Tannin", color: "#7C3AED" },
        { name: "SbTAN2", position: 0.38, pathway: "Tannin", color: "#7C3AED" },
      ]},
      { id: "sb-chr9", name: "Chr 9", lengthMb: 59, genes: [
        { name: "SbHSFA2", position: 0.4, pathway: "Heat shock", color: "#EF4444" },
        { name: "SbNPR1", position: 0.75, pathway: "Disease resistance", color: "#EF4444" },
      ]},
    ],
  },
  {
    id: "cotton",
    species: "Gossypium hirsutum",
    commonName: "Cotton",
    genomeSizeMb: 2500,
    chromosomeCount: 26,
    ploidy: "Allotetraploid (2n = 52)",
    yearSequenced: 2015,
    description:
      "Upland cotton has a ~2.5 Gb allotetraploid genome (At + Dt subgenomes) from the hybridization of G. arboreum and G. raimondii ~1-2 MYA. The fiber development genes (especially MYB109 and CesA family) are key targets for improving fiber quality and length.",
    imageColor: "#F5F5DC",
    chromosomes: [
      { id: "gh-chr-a05", name: "A05", lengthMb: 109, genes: [
        { name: "GhMYB109", position: 0.35, pathway: "Fiber development", color: "#EC4899" },
      ]},
      { id: "gh-chr-a10", name: "A10", lengthMb: 115, genes: [
        { name: "GhCesA1", position: 0.42, pathway: "Cellulose synthesis", color: "#22C55E" },
        { name: "GhHSP70", position: 0.68, pathway: "Heat shock", color: "#EF4444" },
      ]},
      { id: "gh-chr-d05", name: "D05", lengthMb: 63, genes: [
        { name: "GhDREB", position: 0.38, pathway: "Drought response", color: "#F59E0B" },
        { name: "GhSOS1", position: 0.72, pathway: "Salt tolerance", color: "#2DD4BF" },
      ]},
      { id: "gh-chr-d09", name: "D09", lengthMb: 51, genes: [
        { name: "GhNPR1", position: 0.55, pathway: "Disease resistance", color: "#EF4444" },
      ]},
    ],
  },
  {
    id: "sugarcane",
    species: "Saccharum officinarum",
    commonName: "Sugarcane",
    genomeSizeMb: 10000,
    chromosomeCount: 80,
    ploidy: "Polyploid (2n = 80–120)",
    yearSequenced: 2018,
    description:
      "Sugarcane has one of the most complex genomes in crop biology — a highly polyploid (~10 Gb), aneuploid genome with 80-120 chromosomes from interspecific hybrids of S. officinarum × S. spontaneum. Editing requires targeting 8-12 homeologs simultaneously.",
    imageColor: "#86EFAC",
    chromosomes: [
      { id: "sc-chr1", name: "Chr 1", lengthMb: 140, genes: [
        { name: "ScSPS", position: 0.35, pathway: "Sucrose synthesis", color: "#FACC15" },
        { name: "ScSUT1", position: 0.62, pathway: "Sucrose transport", color: "#FACC15" },
      ]},
      { id: "sc-chr5", name: "Chr 5", lengthMb: 120, genes: [
        { name: "ScDREB", position: 0.4, pathway: "Drought response", color: "#F59E0B" },
        { name: "ScHSP101", position: 0.75, pathway: "Heat shock", color: "#EF4444" },
      ]},
      { id: "sc-chr8", name: "Chr 8", lengthMb: 115, genes: [
        { name: "ScERF", position: 0.45, pathway: "Flood tolerance", color: "#3B82F6" },
      ]},
    ],
  },
  {
    id: "banana",
    species: "Musa acuminata",
    commonName: "Banana",
    genomeSizeMb: 523,
    chromosomeCount: 11,
    ploidy: "Triploid cultivars (2n = 3x = 33)",
    yearSequenced: 2012,
    description:
      "The banana reference genome (A genome, ~523 Mb) underpins the world's most consumed fruit. Commercial Cavendish bananas are triploid and sterile, reproducing only clonally. Fusarium wilt TR4 threatens global production, making disease resistance editing critical.",
    imageColor: "#FDE047",
    chromosomes: [
      { id: "ma-chr3", name: "Chr 3", lengthMb: 53, genes: [
        { name: "MaRGA2", position: 0.38, pathway: "Disease resistance", color: "#EF4444" },
        { name: "MaNHX1", position: 0.72, pathway: "Salt tolerance", color: "#2DD4BF" },
      ]},
      { id: "ma-chr5", name: "Chr 5", lengthMb: 47, genes: [
        { name: "MaPSY", position: 0.35, pathway: "Carotenoid", color: "#F97316" },
        { name: "MaACO1", position: 0.68, pathway: "Ethylene/Ripening", color: "#22C55E" },
      ]},
      { id: "ma-chr8", name: "Chr 8", lengthMb: 46, genes: [
        { name: "MaHSP70", position: 0.42, pathway: "Heat shock", color: "#EF4444" },
        { name: "MaERF", position: 0.75, pathway: "Flood tolerance", color: "#3B82F6" },
      ]},
      { id: "ma-chr10", name: "Chr 10", lengthMb: 34, genes: [
        { name: "MaMADS", position: 0.45, pathway: "Fruit development", color: "#EC4899" },
        { name: "MaMYB", position: 0.7, pathway: "Anthocyanin", color: "#7C3AED" },
      ]},
    ],
  },
  {
    id: "canola",
    species: "Brassica napus",
    commonName: "Canola / Rapeseed",
    genomeSizeMb: 1130,
    chromosomeCount: 19,
    ploidy: "Allotetraploid (2n = 38)",
    yearSequenced: 2014,
    description:
      "Canola is an allotetraploid (AACC genome, ~1.13 Gb) formed from hybridization of B. rapa (A) and B. oleracea (C) ~7,500 years ago. As a Brassicaceae member closely related to Arabidopsis, it benefits enormously from model organism research translation.",
    imageColor: "#FACC15",
    chromosomes: [
      { id: "bn-a03", name: "A03", lengthMb: 59, genes: [
        { name: "BnFAD2-A", position: 0.4, pathway: "Fatty acid", color: "#3B82F6" },
        { name: "BnCBF-A", position: 0.72, pathway: "Cold tolerance", color: "#3B82F6" },
      ]},
      { id: "bn-a08", name: "A08", lengthMb: 55, genes: [
        { name: "BnFAE1-A", position: 0.35, pathway: "Erucic acid", color: "#3B82F6" },
        { name: "BnGSL-A", position: 0.65, pathway: "Glucosinolate", color: "#10B981" },
      ]},
      { id: "bn-c03", name: "C03", lengthMb: 65, genes: [
        { name: "BnFAD2-C", position: 0.42, pathway: "Fatty acid", color: "#3B82F6" },
        { name: "BnRLM", position: 0.78, pathway: "Blackleg resistance", color: "#EF4444" },
      ]},
      { id: "bn-c08", name: "C08", lengthMb: 58, genes: [
        { name: "BnFAE1-C", position: 0.38, pathway: "Erucic acid", color: "#3B82F6" },
        { name: "BnDREB", position: 0.7, pathway: "Drought response", color: "#F59E0B" },
      ]},
    ],
  },
  {
    id: "peanut",
    species: "Arachis hypogaea",
    commonName: "Peanut / Groundnut",
    genomeSizeMb: 2700,
    chromosomeCount: 20,
    ploidy: "Allotetraploid (2n = 40)",
    yearSequenced: 2019,
    description:
      "Peanut is an allotetraploid (AABB, ~2.7 Gb) derived from hybridization of the diploid progenitors A. duranensis (A) and A. ipaensis (B) ~9,400 years ago. The FAD2 gene controlling oleic acid content has been a major CRISPR target for healthier peanut oil.",
    imageColor: "#92400E",
    chromosomes: [
      { id: "ah-a09", name: "A09", lengthMb: 120, genes: [
        { name: "AhFAD2-A", position: 0.38, pathway: "Fatty acid", color: "#3B82F6" },
        { name: "AhDREB1", position: 0.72, pathway: "Drought response", color: "#F59E0B" },
      ]},
      { id: "ah-b09", name: "B09", lengthMb: 148, genes: [
        { name: "AhFAD2-B", position: 0.4, pathway: "Fatty acid", color: "#3B82F6" },
        { name: "AhRES", position: 0.68, pathway: "Stilbenoid", color: "#7C3AED" },
      ]},
      { id: "ah-a03", name: "A03", lengthMb: 135, genes: [
        { name: "AhRRS5", position: 0.45, pathway: "Disease resistance", color: "#EF4444" },
        { name: "AhCBF", position: 0.75, pathway: "Cold tolerance", color: "#3B82F6" },
      ]},
      { id: "ah-b06", name: "B06", lengthMb: 140, genes: [
        { name: "AhHSFA", position: 0.5, pathway: "Heat shock", color: "#EF4444" },
      ]},
    ],
  },
  {
    id: "chickpea",
    species: "Cicer arietinum",
    commonName: "Chickpea",
    genomeSizeMb: 738,
    chromosomeCount: 8,
    ploidy: "Diploid (2n = 16)",
    yearSequenced: 2013,
    description:
      "Chickpea is the world's second most important legume (~738 Mb genome). Its genome encodes extensive symbiotic nitrogen-fixation machinery. Transformation remains notoriously difficult, making it one of the most recalcitrant crops for genome editing.",
    imageColor: "#D97706",
    chromosomes: [
      { id: "ca2-chr1", name: "Chr 1", lengthMb: 113, genes: [
        { name: "CaDREB1", position: 0.35, pathway: "Drought response", color: "#F59E0B" },
        { name: "CaRR", position: 0.72, pathway: "Disease resistance", color: "#EF4444" },
      ]},
      { id: "ca2-chr4", name: "Chr 4", lengthMb: 100, genes: [
        { name: "CaHSP", position: 0.42, pathway: "Heat shock", color: "#EF4444" },
        { name: "CaPOD", position: 0.68, pathway: "Pod development", color: "#EC4899" },
      ]},
      { id: "ca2-chr6", name: "Chr 6", lengthMb: 80, genes: [
        { name: "CaNFR5", position: 0.5, pathway: "Nodulation", color: "#22C55E" },
      ]},
    ],
  },
  {
    id: "pearl-millet",
    species: "Pennisetum glaucum",
    commonName: "Pearl Millet",
    genomeSizeMb: 1800,
    chromosomeCount: 7,
    ploidy: "Diploid (2n = 14)",
    yearSequenced: 2017,
    description:
      "Pearl millet is the hardiest cereal crop, thriving in the Sahel and Thar desert at temperatures exceeding 42°C with <300mm annual rainfall. Its ~1.8 Gb genome encodes exceptional heat and drought tolerance machinery, making it a crucial gene source for climate adaptation.",
    imageColor: "#78716C",
    chromosomes: [
      { id: "pg-chr1", name: "Chr 1", lengthMb: 310, genes: [
        { name: "PgDREB2", position: 0.32, pathway: "Drought/Heat response", color: "#F59E0B" },
        { name: "PgHSF", position: 0.68, pathway: "Heat shock factor", color: "#EF4444" },
      ]},
      { id: "pg-chr3", name: "Chr 3", lengthMb: 280, genes: [
        { name: "PgHKT", position: 0.4, pathway: "Salt tolerance", color: "#2DD4BF" },
        { name: "PgFER", position: 0.75, pathway: "Iron storage", color: "#F97316" },
      ]},
      { id: "pg-chr5", name: "Chr 5", lengthMb: 250, genes: [
        { name: "PgPSTOL", position: 0.45, pathway: "Phosphorus efficiency", color: "#10B981" },
        { name: "PgGW2", position: 0.72, pathway: "Grain weight", color: "#FACC15" },
      ]},
    ],
  },
  {
    id: "quinoa",
    species: "Chenopodium quinoa",
    commonName: "Quinoa",
    genomeSizeMb: 1500,
    chromosomeCount: 18,
    ploidy: "Allotetraploid (2n = 36)",
    yearSequenced: 2017,
    description:
      "Quinoa is a pseudocereal from the Andes with exceptional nutritional profile and remarkable salt tolerance (thrives in soil up to 40 dS/m). Its ~1.5 Gb allotetraploid genome encodes a complete suite of halophyte adaptations including bladder cells and ion compartmentalization.",
    imageColor: "#F87171",
    chromosomes: [
      { id: "cq-chr2a", name: "Chr 2A", lengthMb: 90, genes: [
        { name: "CqSOS1", position: 0.35, pathway: "Salt tolerance", color: "#2DD4BF" },
        { name: "CqDREB", position: 0.7, pathway: "Drought response", color: "#F59E0B" },
      ]},
      { id: "cq-chr5b", name: "Chr 5B", lengthMb: 85, genes: [
        { name: "CqTSC2", position: 0.4, pathway: "Saponin synthesis", color: "#7C3AED" },
        { name: "CqCBF", position: 0.72, pathway: "Cold tolerance", color: "#3B82F6" },
      ]},
      { id: "cq-chr9a", name: "Chr 9A", lengthMb: 78, genes: [
        { name: "CqFT", position: 0.38, pathway: "Flowering time", color: "#EC4899" },
        { name: "CqUVR8", position: 0.68, pathway: "UV response", color: "#7C3AED" },
      ]},
      { id: "cq-chr14b", name: "Chr 14B", lengthMb: 72, genes: [
        { name: "CqBET", position: 0.45, pathway: "Betalain pigment", color: "#EF4444" },
        { name: "CqRR", position: 0.78, pathway: "Disease resistance", color: "#EF4444" },
      ]},
    ],
  },
  {
    id: "sweet-potato",
    species: "Ipomoea batatas",
    commonName: "Sweet Potato",
    genomeSizeMb: 4400,
    chromosomeCount: 15,
    ploidy: "Hexaploid (2n = 6x = 90)",
    yearSequenced: 2017,
    description:
      "Sweet potato is a hexaploid (~4.4 Gb) with complex autopolyploid genetics. The Or gene controlling orange flesh color (beta-carotene accumulation) has made it a flagship biofortification crop, providing vitamin A to millions in sub-Saharan Africa.",
    imageColor: "#EA580C",
    chromosomes: [
      { id: "ib-chr3", name: "Chr 3", lengthMb: 45, genes: [
        { name: "IbOr", position: 0.4, pathway: "Carotenoid/Vitamin A", color: "#F97316" },
        { name: "IbDREB", position: 0.72, pathway: "Drought response", color: "#F59E0B" },
      ]},
      { id: "ib-chr6", name: "Chr 6", lengthMb: 42, genes: [
        { name: "IbMYB1", position: 0.35, pathway: "Anthocyanin", color: "#7C3AED" },
        { name: "IbNHX1", position: 0.68, pathway: "Salt tolerance", color: "#2DD4BF" },
      ]},
      { id: "ib-chr10", name: "Chr 10", lengthMb: 38, genes: [
        { name: "IbERF", position: 0.42, pathway: "Flood tolerance", color: "#3B82F6" },
        { name: "IbRR", position: 0.75, pathway: "Disease resistance", color: "#EF4444" },
      ]},
    ],
  },
  {
    id: "cacao",
    species: "Theobroma cacao",
    commonName: "Cacao",
    genomeSizeMb: 430,
    chromosomeCount: 10,
    ploidy: "Diploid (2n = 20)",
    yearSequenced: 2010,
    description:
      "Cacao has a compact ~430 Mb genome encoding the theobromine biosynthetic pathway unique to Theobroma. The species is highly susceptible to frosty pod (Moniliophthora), black pod (Phytophthora), and witches' broom, making disease resistance a priority target.",
    imageColor: "#78350F",
    chromosomes: [
      { id: "tc-chr4", name: "Chr 4", lengthMb: 44, genes: [
        { name: "TcTCS1", position: 0.38, pathway: "Theobromine synthesis", color: "#7C3AED" },
        { name: "TcNPR1", position: 0.72, pathway: "Disease resistance", color: "#EF4444" },
      ]},
      { id: "tc-chr6", name: "Chr 6", lengthMb: 40, genes: [
        { name: "TcMYB", position: 0.35, pathway: "Flavonoid", color: "#EC4899" },
        { name: "TcHSP", position: 0.68, pathway: "Heat shock", color: "#EF4444" },
      ]},
      { id: "tc-chr9", name: "Chr 9", lengthMb: 42, genes: [
        { name: "TcPHT", position: 0.45, pathway: "Phosphate transport", color: "#10B981" },
      ]},
    ],
  },
  {
    id: "tea",
    species: "Camellia sinensis",
    commonName: "Tea",
    genomeSizeMb: 3100,
    chromosomeCount: 15,
    ploidy: "Diploid (2n = 30)",
    yearSequenced: 2017,
    description:
      "Tea has a large ~3.1 Gb diploid genome with massive tandem duplications in catechin, caffeine, and theanine biosynthetic gene families. The genome encodes >300 terpene synthases for volatile flavor compounds. As a woody perennial, transformation and regeneration remain extremely challenging.",
    imageColor: "#166534",
    chromosomes: [
      { id: "cs-chr1", name: "Chr 1", lengthMb: 250, genes: [
        { name: "CsTS1", position: 0.32, pathway: "Theanine synthesis", color: "#22C55E" },
        { name: "CsCBF1", position: 0.68, pathway: "Cold tolerance", color: "#3B82F6" },
      ]},
      { id: "cs-chr5", name: "Chr 5", lengthMb: 220, genes: [
        { name: "CsFLS", position: 0.38, pathway: "Flavonol/Catechin", color: "#EC4899" },
        { name: "CsNPR1", position: 0.75, pathway: "Disease resistance", color: "#EF4444" },
      ]},
      { id: "cs-chr9", name: "Chr 9", lengthMb: 200, genes: [
        { name: "CsDXR", position: 0.42, pathway: "Terpenoid/Aroma", color: "#10B981" },
        { name: "CsAMT", position: 0.7, pathway: "Ammonium transport", color: "#10B981" },
      ]},
      { id: "cs-chr14", name: "Chr 14", lengthMb: 180, genes: [
        { name: "CsTCS", position: 0.35, pathway: "Caffeine synthesis", color: "#7C3AED" },
        { name: "CsMYB12", position: 0.65, pathway: "UV/Flavonoid", color: "#7C3AED" },
      ]},
    ],
  },
  {
    id: "oil-palm",
    species: "Elaeis guineensis",
    commonName: "Oil Palm",
    genomeSizeMb: 1800,
    chromosomeCount: 16,
    ploidy: "Diploid (2n = 32)",
    yearSequenced: 2013,
    description:
      "Oil palm produces more oil per hectare than any other crop. The ~1.8 Gb genome revealed the SHELL gene controlling fruit form (dura/pisifera/tenera), a key yield determinant. The long generation time (25-year lifespan, 4-5 years to first harvest) makes genome editing particularly valuable.",
    imageColor: "#B45309",
    chromosomes: [
      { id: "eg-chr2", name: "Chr 2", lengthMb: 130, genes: [
        { name: "EgSHELL", position: 0.38, pathway: "Fruit form", color: "#EC4899" },
        { name: "EgFATB", position: 0.72, pathway: "Palmitic acid", color: "#3B82F6" },
      ]},
      { id: "eg-chr5", name: "Chr 5", lengthMb: 120, genes: [
        { name: "EgHSP", position: 0.4, pathway: "Heat shock", color: "#EF4444" },
        { name: "EgNPR1", position: 0.7, pathway: "Disease resistance", color: "#EF4444" },
      ]},
      { id: "eg-chr10", name: "Chr 10", lengthMb: 105, genes: [
        { name: "EgPHT", position: 0.45, pathway: "Phosphate transport", color: "#10B981" },
      ]},
    ],
  },
  {
    id: "lettuce",
    species: "Lactuca sativa",
    commonName: "Lettuce",
    genomeSizeMb: 2700,
    chromosomeCount: 9,
    ploidy: "Diploid (2n = 18)",
    yearSequenced: 2017,
    description:
      "Lettuce has a ~2.7 Gb genome dominated by transposable elements. It is the model species for Asteraceae (the largest flowering plant family). The DMR6 gene knockout for downy mildew resistance was one of the first CRISPR-edited crops to receive US regulatory approval.",
    imageColor: "#4ADE80",
    chromosomes: [
      { id: "ls-chr1", name: "Chr 1", lengthMb: 350, genes: [
        { name: "LsDMR6", position: 0.35, pathway: "Disease resistance", color: "#EF4444" },
        { name: "LsNCED", position: 0.72, pathway: "Seed germination", color: "#22C55E" },
      ]},
      { id: "ls-chr4", name: "Chr 4", lengthMb: 320, genes: [
        { name: "LsMYB12", position: 0.4, pathway: "Flavonoid/UV", color: "#7C3AED" },
        { name: "LsCBF", position: 0.68, pathway: "Cold tolerance", color: "#3B82F6" },
      ]},
      { id: "ls-chr7", name: "Chr 7", lengthMb: 290, genes: [
        { name: "LsMYB", position: 0.38, pathway: "Anthocyanin", color: "#7C3AED" },
        { name: "LsNRT", position: 0.72, pathway: "Nitrate transport", color: "#10B981" },
      ]},
      { id: "ls-chr9", name: "Chr 9", lengthMb: 280, genes: [
        { name: "LsERF", position: 0.45, pathway: "Flood tolerance", color: "#3B82F6" },
      ]},
    ],
  },
];
