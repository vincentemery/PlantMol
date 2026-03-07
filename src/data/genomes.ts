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
];
