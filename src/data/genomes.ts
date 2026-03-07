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
];
