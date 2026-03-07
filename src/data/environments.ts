// ────────────────────────────────────────────────────────────
//  Genome Architect – Environments, Traits & CRISPR Targets
//  Scientific data based on published plant biology literature
// ────────────────────────────────────────────────────────────

export type EditType =
  | "overexpression"
  | "knockout"
  | "promoter-swap"
  | "point-mutation"
  | "insertion";

export type Confidence = "high" | "medium" | "experimental";
export type RiskLevel = "low" | "medium" | "high";
export type TraitCategory =
  | "stress-tolerance"
  | "nutrition"
  | "yield"
  | "defense"
  | "quality";

// ── Gene Target ──────────────────────────────────────────
export interface GeneTarget {
  geneId: string;
  geneName: string;
  fullName: string;
  genomeId: string; // matches genomes.ts id
  chromosome: string;
  position: number; // 0-1 relative
  editType: EditType;
  editDescription: string;
  mechanism: string;
  confidence: Confidence;
  expectedOutcome: string;
  offTargetRisk: RiskLevel;
  guideRNASequence: string; // representative 20-nt
  pamSite: string;
}

// ── Trait ─────────────────────────────────────────────────
export interface Trait {
  id: string;
  name: string;
  description: string;
  category: TraitCategory;
  icon: string; // SVG path
  color: string;
  geneTargets: GeneTarget[];
}

// ── Environment ──────────────────────────────────────────
export interface Environment {
  id: string;
  name: string;
  description: string;
  color: string;
  gradient: string;
  icon: string; // SVG path
  challenges: string[];
  temperatureRange: string;
  rainfall: string;
  soilType: string;
  requiredTraitIds: string[];
}

// ── Edit Plan (computed) ─────────────────────────────────
export interface PlannedEdit {
  gene: GeneTarget;
  trait: Trait;
  priority: number; // 1 = most critical
}

export interface EditPlan {
  plantId: string;
  plantName: string;
  environmentId: string;
  environmentName: string;
  edits: PlannedEdit[];
  totalEdits: number;
  complexityScore: number; // 1-10
  estimatedGenerations: number;
  successProbability: number; // 0-1
  timelineMonths: number;
  summary: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TRAITS DATABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const traits: Trait[] = [
  // ── DROUGHT TOLERANCE ────────────────────────────────
  {
    id: "drought-tolerance",
    name: "Drought Tolerance",
    description:
      "Enhanced water-use efficiency and survival under water deficit through ABA signaling, stomatal regulation, and osmoprotectant accumulation.",
    category: "stress-tolerance",
    icon: "M12 22c-4.97 0-9-2.24-9-5v-2c0-2.76 4.03-5 9-5s9 2.24 9 5v2c0 2.76-4.03 5-9 5zM12 2L9.5 8.5h5L12 2z",
    color: "#F59E0B",
    geneTargets: [
      {
        geneId: "at-dreb2a",
        geneName: "DREB2A",
        fullName: "Dehydration-Responsive Element Binding 2A",
        genomeId: "arabidopsis",
        chromosome: "Chr 5",
        position: 0.32,
        editType: "point-mutation",
        editDescription:
          "Delete negative regulatory domain (NRD) to create constitutively active DREB2A-CA. The NRD normally targets the protein for ubiquitin-mediated degradation under non-stress conditions.",
        mechanism:
          "Constitutively active DREB2A binds DRE/CRT cis-elements in promoters of drought-responsive genes (RD29A, RD17, LEA proteins), activating the dehydration stress regulon without requiring the stress signal.",
        confidence: "high",
        expectedOutcome:
          "Strong drought tolerance with 40-60% improved survival under severe water deficit. Minor growth penalty under well-watered conditions.",
        offTargetRisk: "low",
        guideRNASequence: "AGCTGATTCGAATCCGTTAG",
        pamSite: "TGG",
      },
      {
        geneId: "at-era1",
        geneName: "ERA1",
        fullName: "Enhanced Response to ABA 1 (Farnesyltransferase β)",
        genomeId: "arabidopsis",
        chromosome: "Chr 5",
        position: 0.58,
        editType: "knockout",
        editDescription:
          "Disrupt ERA1 farnesyltransferase to enhance ABA sensitivity. ERA1 negatively regulates ABA signaling by farnesylating and activating ABA-negative regulators.",
        mechanism:
          "ERA1 knockout prevents farnesylation of ABI1/ABI2 phosphatases, keeping ABA signaling constitutively sensitized. Plants close stomata more readily, reducing transpirational water loss.",
        confidence: "high",
        expectedOutcome:
          "30-50% reduction in water loss through enhanced stomatal closure. Some ABA hypersensitivity in seed germination.",
        offTargetRisk: "medium",
        guideRNASequence: "TCGAAGTCCATGCTAACGGT",
        pamSite: "AGG",
      },
      {
        geneId: "at-nced3",
        geneName: "NCED3",
        fullName: "9-cis-Epoxycarotenoid Dioxygenase 3",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.42,
        editType: "promoter-swap",
        editDescription:
          "Replace native NCED3 promoter with stress-inducible RD29A promoter for enhanced ABA biosynthesis under drought without constitutive overproduction.",
        mechanism:
          "NCED3 catalyzes the rate-limiting step in ABA biosynthesis (cleavage of 9-cis-violaxanthin). Stress-inducible overexpression amplifies the drought signal through increased ABA accumulation.",
        confidence: "high",
        expectedOutcome:
          "2-3x faster ABA accumulation during drought onset. Faster stomatal closure response without growth penalty under normal conditions.",
        offTargetRisk: "low",
        guideRNASequence: "GCCATTGACCTAAGTCCGAT",
        pamSite: "CGG",
      },
      // Capsicum drought
      {
        geneId: "ca-cadreb3",
        geneName: "CaDREB3",
        fullName: "Capsicum Dehydration-Responsive Element Binding 3",
        genomeId: "capsicum",
        chromosome: "Chr 6",
        position: 0.52,
        editType: "overexpression",
        editDescription:
          "Overexpress CaDREB3 under constitutive CaMV 35S promoter to activate drought-responsive gene network in pepper.",
        mechanism:
          "CaDREB3 activates downstream LEA and dehydrin genes that stabilize cellular membranes and proteins during dehydration stress.",
        confidence: "medium",
        expectedOutcome:
          "Enhanced drought survival in field conditions. Maintains fruit set under moderate water stress.",
        offTargetRisk: "low",
        guideRNASequence: "ATCGATCCGTAAGCTTGCCA",
        pamSite: "TGG",
      },
      // Vitis drought
      {
        geneId: "vv-vvnced1",
        geneName: "VvNCED1",
        fullName: "Vitis 9-cis-Epoxycarotenoid Dioxygenase 1",
        genomeId: "vitis",
        chromosome: "Chr 5",
        position: 0.65,
        editType: "promoter-swap",
        editDescription:
          "Swap VvNCED1 promoter to a root-specific drought-responsive promoter for enhanced ABA production from roots during soil drying.",
        mechanism:
          "Root-sourced ABA signals to shoots via xylem, triggering stomatal closure before leaf dehydration occurs. This 'early warning' system improves water conservation.",
        confidence: "medium",
        expectedOutcome:
          "Earlier stomatal closure during soil drying. Improved water-use efficiency without compromising berry quality.",
        offTargetRisk: "low",
        guideRNASequence: "CCGAATTCGACTGGAATCCA",
        pamSite: "AGG",
      },
      // Tobacco drought
      {
        geneId: "nt-ntlea5",
        geneName: "NtLEA5",
        fullName: "Nicotiana Late Embryogenesis Abundant 5",
        genomeId: "nicotiana",
        chromosome: "Chr 7",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress NtLEA5 under stress-inducible promoter for cellular dehydration protection.",
        mechanism:
          "LEA proteins act as molecular shields, preventing protein aggregation and membrane fusion during cellular dehydration.",
        confidence: "medium",
        expectedOutcome:
          "Improved cellular survival during drought stress. Faster recovery after re-watering.",
        offTargetRisk: "low",
        guideRNASequence: "GATTCCGAATCGTTACGGAC",
        pamSite: "TGG",
      },
    ],
  },

  // ── COLD TOLERANCE ────────────────────────────────────
  {
    id: "cold-tolerance",
    name: "Cold / Frost Tolerance",
    description:
      "Survival at sub-zero temperatures through membrane stabilization, cryoprotectant accumulation, and cold-regulated gene expression.",
    category: "stress-tolerance",
    icon: "M12 2L8 8h8L12 2zm0 20l4-6H8l4 6zm-7-9l6-4v8l-6-4zm14 0l-6 4V9l6 4z",
    color: "#38BDF8",
    geneTargets: [
      {
        geneId: "at-cbf1",
        geneName: "CBF1/DREB1B",
        fullName: "C-repeat Binding Factor 1",
        genomeId: "arabidopsis",
        chromosome: "Chr 4",
        position: 0.55,
        editType: "overexpression",
        editDescription:
          "Overexpress CBF1 under its native promoter with enhanced translation initiation sequence for stronger cold acclimation response.",
        mechanism:
          "CBF1 binds CRT/DRE elements in promoters of COR (Cold-Regulated) genes, inducing synthesis of cryoprotective proteins, compatible solutes (proline, raffinose), and membrane-stabilizing lipid modifications.",
        confidence: "high",
        expectedOutcome:
          "Freezing tolerance improved by 3-5°C. Plants survive at -8°C after acclimation vs -5°C wild-type.",
        offTargetRisk: "low",
        guideRNASequence: "TGCCAATCGGATCCTTAAGG",
        pamSite: "CGG",
      },
      {
        geneId: "at-ice1",
        geneName: "ICE1",
        fullName: "Inducer of CBF Expression 1",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.18,
        editType: "point-mutation",
        editDescription:
          "Mutate K393R to prevent sumoylation-mediated degradation, creating a stabilized ICE1 that sustains CBF activation.",
        mechanism:
          "ICE1 is a MYC-like bHLH transcription factor that activates CBF3/DREB1A. The K393R mutation prevents HOS1-mediated ubiquitination, stabilizing the protein during cold stress.",
        confidence: "high",
        expectedOutcome:
          "Sustained CBF expression during prolonged cold. Enhanced cold acclimation capacity.",
        offTargetRisk: "low",
        guideRNASequence: "CCGATTTCAAGGCTAACGTA",
        pamSite: "AGG",
      },
      {
        geneId: "at-cor15a",
        geneName: "COR15A",
        fullName: "Cold-Regulated 15A",
        genomeId: "arabidopsis",
        chromosome: "Chr 2",
        position: 0.68,
        editType: "overexpression",
        editDescription:
          "Overexpress COR15A under cold-inducible promoter for enhanced chloroplast membrane protection during freezing.",
        mechanism:
          "COR15A localizes to chloroplast stroma and prevents lamellar-to-hexagonal II phase transition of membrane lipids during freeze-induced dehydration.",
        confidence: "high",
        expectedOutcome:
          "Chloroplast membranes remain intact at 2°C lower temperatures. Photosynthetic recovery faster after frost events.",
        offTargetRisk: "low",
        guideRNASequence: "AATCGGATCCTTAGGCCAAT",
        pamSite: "TGG",
      },
      // Vitis cold
      {
        geneId: "vv-vvcbf4",
        geneName: "VvCBF4",
        fullName: "Vitis C-repeat Binding Factor 4",
        genomeId: "vitis",
        chromosome: "Chr 1",
        position: 0.55,
        editType: "overexpression",
        editDescription:
          "Overexpress grapevine-specific CBF4 for improved frost tolerance in spring buds.",
        mechanism:
          "VvCBF4 activates grapevine COR genes. Critical for protecting buds during late spring frosts that devastate vineyards.",
        confidence: "medium",
        expectedOutcome:
          "Bud survival improved at temperatures 2-3°C lower. Reduced spring frost losses.",
        offTargetRisk: "low",
        guideRNASequence: "GCCTAAGGATTCGATCCGAT",
        pamSite: "CGG",
      },
    ],
  },

  // ── SALT TOLERANCE ────────────────────────────────────
  {
    id: "salt-tolerance",
    name: "Salinity Tolerance",
    description:
      "Survival in saline soils through Na+ exclusion, vacuolar sequestration, osmotic adjustment, and ion homeostasis maintenance.",
    category: "stress-tolerance",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    color: "#2DD4BF",
    geneTargets: [
      {
        geneId: "at-sos1",
        geneName: "SOS1",
        fullName: "Salt Overly Sensitive 1 (Na+/H+ Antiporter)",
        genomeId: "arabidopsis",
        chromosome: "Chr 2",
        position: 0.38,
        editType: "overexpression",
        editDescription:
          "Overexpress plasma membrane Na+/H+ antiporter SOS1 to enhance sodium efflux from root cells.",
        mechanism:
          "SOS1 exports Na+ from the cytoplasm to the apoplast using the proton gradient. Overexpression reduces cytoplasmic Na+ toxicity and limits Na+ loading into the xylem.",
        confidence: "high",
        expectedOutcome:
          "Survival at 200mM NaCl (vs 150mM wild-type). 40% reduction in shoot Na+ accumulation.",
        offTargetRisk: "low",
        guideRNASequence: "CGATCCGAATTCAAGCTGAT",
        pamSite: "AGG",
      },
      {
        geneId: "at-nhx1",
        geneName: "NHX1",
        fullName: "Na+/H+ Exchanger 1 (Vacuolar)",
        genomeId: "arabidopsis",
        chromosome: "Chr 5",
        position: 0.48,
        editType: "overexpression",
        editDescription:
          "Overexpress vacuolar Na+/H+ antiporter for Na+ compartmentalization into the vacuole.",
        mechanism:
          "NHX1 sequesters toxic Na+ into the vacuole, simultaneously serving as an osmoticum for turgor maintenance. This 'tissue tolerance' strategy allows growth despite high total Na+.",
        confidence: "high",
        expectedOutcome:
          "Continued growth at 200mM NaCl. Vacuolar Na+ increases 3-fold while cytoplasmic Na+ remains low.",
        offTargetRisk: "low",
        guideRNASequence: "TTCGAATCCGATGCTAACGG",
        pamSite: "TGG",
      },
      {
        geneId: "at-hkt1",
        geneName: "HKT1;1",
        fullName: "High-affinity K+ Transporter 1",
        genomeId: "arabidopsis",
        chromosome: "Chr 4",
        position: 0.33,
        editType: "promoter-swap",
        editDescription:
          "Enhance HKT1;1 expression specifically in root stelar cells to increase Na+ retrieval from xylem sap before it reaches shoots.",
        mechanism:
          "HKT1;1 in xylem parenchyma cells retrieves Na+ from the xylem transpiration stream, preventing Na+ accumulation in photosynthetically active shoot tissues.",
        confidence: "high",
        expectedOutcome:
          "50% reduction in shoot Na+ concentration. Maintained K+/Na+ ratio in leaves under salt stress.",
        offTargetRisk: "medium",
        guideRNASequence: "GCTAACGGATCCGAATTCGA",
        pamSite: "CGG",
      },
      // Capsicum salt
      {
        geneId: "ca-canhx2",
        geneName: "CaNHX2",
        fullName: "Capsicum Na+/H+ Exchanger 2",
        genomeId: "capsicum",
        chromosome: "Chr 3",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress CaNHX2 for vacuolar sodium sequestration in pepper under saline irrigation.",
        mechanism:
          "Vacuolar Na+ sequestration protects cytoplasmic enzymes and maintains fruit development under salinity stress.",
        confidence: "medium",
        expectedOutcome:
          "Maintained fruit yield under moderate salinity (100mM NaCl). Improved fruit quality metrics.",
        offTargetRisk: "low",
        guideRNASequence: "TCCGATGCTAACGGATCCGA",
        pamSite: "AGG",
      },
    ],
  },

  // ── UV RESISTANCE ─────────────────────────────────────
  {
    id: "uv-resistance",
    name: "UV-B Radiation Resistance",
    description:
      "Protection against ultraviolet radiation damage through enhanced flavonoid sunscreens, DNA repair, and ROS scavenging.",
    category: "stress-tolerance",
    icon: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83",
    color: "#A78BFA",
    geneTargets: [
      {
        geneId: "at-uvr8",
        geneName: "UVR8",
        fullName: "UV Resistance Locus 8",
        genomeId: "arabidopsis",
        chromosome: "Chr 5",
        position: 0.22,
        editType: "overexpression",
        editDescription:
          "Overexpress UV-B photoreceptor UVR8 for enhanced UV-B perception and protective response activation.",
        mechanism:
          "UVR8 homodimer monomerizes upon UV-B absorption, interacts with COP1, and activates HY5 transcription factor to induce flavonoid biosynthesis and DNA repair genes.",
        confidence: "high",
        expectedOutcome:
          "2-3x higher UV-absorbing flavonoid levels in epidermal cells. Reduced UV-B-induced DNA damage (cyclobutane pyrimidine dimers).",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGTTAAGCTGATTCGA",
        pamSite: "TGG",
      },
      {
        geneId: "at-chs-uv",
        geneName: "CHS",
        fullName: "Chalcone Synthase (UV-screening)",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.72,
        editType: "promoter-swap",
        editDescription:
          "Replace CHS promoter with UV-B-responsive elements for rapid flavonoid sunscreen production upon UV exposure.",
        mechanism:
          "CHS catalyzes the first committed step in flavonoid biosynthesis. UV-responsive expression produces UV-absorbing flavonols (kaempferol, quercetin) in epidermal cells.",
        confidence: "high",
        expectedOutcome:
          "Faster UV-screen deployment. Epidermal flavonoid accumulation within 2h of UV exposure vs 6h wild-type.",
        offTargetRisk: "low",
        guideRNASequence: "AGTCCGATTCGAATCCGTTA",
        pamSite: "CGG",
      },
    ],
  },

  // ── HEAT TOLERANCE ────────────────────────────────────
  {
    id: "heat-tolerance",
    name: "Heat Stress Tolerance",
    description:
      "Survival at elevated temperatures through heat shock protein accumulation, membrane lipid remodeling, and thermotolerance signaling.",
    category: "stress-tolerance",
    icon: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z",
    color: "#F97316",
    geneTargets: [
      {
        geneId: "at-hsfa1",
        geneName: "HSFA1a",
        fullName: "Heat Shock Factor A1a",
        genomeId: "arabidopsis",
        chromosome: "Chr 4",
        position: 0.82,
        editType: "overexpression",
        editDescription:
          "Overexpress master heat stress regulator HSFA1a for enhanced thermotolerance.",
        mechanism:
          "HSFA1a is the master regulator of the heat stress response, activating HSP70, HSP90, HSP101 and small HSPs that prevent protein aggregation at high temperatures.",
        confidence: "high",
        expectedOutcome:
          "Thermotolerance at 45°C for 2h (vs 30min wild-type lethal exposure). Maintained photosynthesis at 40°C.",
        offTargetRisk: "low",
        guideRNASequence: "CGAATTCGGATCCGTTAAGG",
        pamSite: "AGG",
      },
      {
        geneId: "at-fad7-ko",
        geneName: "FAD7",
        fullName: "Fatty Acid Desaturase 7",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.85,
        editType: "knockout",
        editDescription:
          "Knockout chloroplast omega-3 fatty acid desaturase to reduce trienoic fatty acids and increase membrane thermal stability.",
        mechanism:
          "FAD7 converts dienoic to trienoic fatty acids in chloroplast membranes. Knockout reduces membrane fluidity at high temperatures, maintaining thylakoid integrity.",
        confidence: "medium",
        expectedOutcome:
          "Chloroplast membranes stable at 5°C higher temperatures. Slight cold sensitivity trade-off.",
        offTargetRisk: "medium",
        guideRNASequence: "TTAAGCTGATTCGAATCCGG",
        pamSite: "TGG",
      },
      // Capsicum heat
      {
        geneId: "ca-cahsp70",
        geneName: "CaHSP70-2",
        fullName: "Capsicum Heat Shock Protein 70-2",
        genomeId: "capsicum",
        chromosome: "Chr 2",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress CaHSP70-2 under heat-inducible HSE promoter for enhanced protein protection during heat waves.",
        mechanism:
          "HSP70 chaperones prevent irreversible protein aggregation and assist refolding of heat-damaged proteins, maintaining cellular proteostasis.",
        confidence: "medium",
        expectedOutcome:
          "Maintained pollen viability at 38°C. Improved fruit set during heat waves. Critical for pepper production in warming climates.",
        offTargetRisk: "low",
        guideRNASequence: "CCGGATCCGAATTCAAGGCT",
        pamSite: "CGG",
      },
    ],
  },

  // ── NUTRIENT USE EFFICIENCY ───────────────────────────
  {
    id: "nutrient-efficiency",
    name: "Nutrient Use Efficiency",
    description:
      "Enhanced nitrogen and phosphorus acquisition and utilization, reducing fertilizer requirements while maintaining yield.",
    category: "yield",
    icon: "M12 19V5m-7 7l7-7 7 7",
    color: "#34D399",
    geneTargets: [
      {
        geneId: "at-nrt1",
        geneName: "NRT1.1/CHL1",
        fullName: "Nitrate Transporter 1.1",
        genomeId: "arabidopsis",
        chromosome: "Chr 1",
        position: 0.52,
        editType: "point-mutation",
        editDescription:
          "T101A phospho-mimetic mutation to enhance high-affinity nitrate uptake under low-nitrogen conditions.",
        mechanism:
          "NRT1.1 is a dual-affinity nitrate transporter. The T101A mutation locks it in high-affinity mode (Km ~50μM vs ~4mM), dramatically improving nitrate scavenging from depleted soils.",
        confidence: "high",
        expectedOutcome:
          "30-50% improved nitrogen uptake at low soil N. Maintained biomass with 40% less fertilizer input.",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGTCGAATCCGATC",
        pamSite: "AGG",
      },
      {
        geneId: "at-nlp7",
        geneName: "NLP7",
        fullName: "NIN-like Protein 7",
        genomeId: "arabidopsis",
        chromosome: "Chr 4",
        position: 0.62,
        editType: "overexpression",
        editDescription:
          "Overexpress master nitrogen-response transcription factor NLP7 for enhanced nitrate assimilation efficiency.",
        mechanism:
          "NLP7 activates the entire nitrate assimilation pathway: NRT2.1 (transport), NIA1/NIA2 (nitrate reductase), NIR1 (nitrite reductase), and GS/GOGAT (ammonium assimilation).",
        confidence: "high",
        expectedOutcome:
          "20-30% increase in nitrogen assimilation rate. Higher amino acid content in edible tissues.",
        offTargetRisk: "low",
        guideRNASequence: "TCCGAATCGATGCTAACGGA",
        pamSite: "TGG",
      },
    ],
  },

  // ── DISEASE RESISTANCE ────────────────────────────────
  {
    id: "disease-resistance",
    name: "Broad-Spectrum Pathogen Defense",
    description:
      "Enhanced innate immunity through constitutive defense priming, phytoalexin production, and systemic acquired resistance.",
    category: "defense",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    color: "#F472B6",
    geneTargets: [
      {
        geneId: "at-npr1",
        geneName: "NPR1",
        fullName: "Nonexpresser of PR Genes 1",
        genomeId: "arabidopsis",
        chromosome: "Chr 1",
        position: 0.88,
        editType: "overexpression",
        editDescription:
          "Overexpress master immune regulator NPR1 for constitutive defense priming (not activation) against broad-spectrum pathogens.",
        mechanism:
          "NPR1 is the central regulator of salicylic acid (SA) signaling and systemic acquired resistance (SAR). Overexpression primes defense genes for faster activation upon pathogen detection, without constitutive immune activation.",
        confidence: "high",
        expectedOutcome:
          "Resistance to bacterial (Pseudomonas), fungal (Botrytis, powdery mildew), and oomycete (Phytophthora) pathogens. 60-80% reduced disease severity.",
        offTargetRisk: "medium",
        guideRNASequence: "AACGGATCCGAATTCAAGCT",
        pamSite: "CGG",
      },
      // Vitis disease
      {
        geneId: "vv-sts-up",
        geneName: "VvSTS29",
        fullName: "Stilbene Synthase 29 (Resveratrol)",
        genomeId: "vitis",
        chromosome: "Chr 16",
        position: 0.35,
        editType: "promoter-swap",
        editDescription:
          "Replace VvSTS29 promoter with pathogen-inducible PR1 promoter for rapid resveratrol production upon pathogen attack.",
        mechanism:
          "Stilbene synthases produce resveratrol, a potent phytoalexin that inhibits fungal spore germination and hyphal growth. Pathogen-inducible expression provides localized chemical defense.",
        confidence: "high",
        expectedOutcome:
          "3-5x faster resveratrol accumulation at infection sites. Strong resistance against Botrytis cinerea (gray mold) and Plasmopara viticola (downy mildew).",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGAATTCGAATCCGTT",
        pamSite: "AGG",
      },
      // Capsicum defense
      {
        geneId: "ca-capr1",
        geneName: "CaPR1",
        fullName: "Capsicum Pathogenesis-Related 1",
        genomeId: "capsicum",
        chromosome: "Chr 6",
        position: 0.58,
        editType: "overexpression",
        editDescription:
          "Overexpress CaPR1 under dual pathogen-inducible and wound-responsive promoter.",
        mechanism:
          "PR1 proteins have direct antimicrobial activity and amplify the SA signaling cascade for systemic defense activation.",
        confidence: "medium",
        expectedOutcome:
          "Reduced severity of Phytophthora capsici infection. Enhanced resistance to bacterial spot (Xanthomonas).",
        offTargetRisk: "low",
        guideRNASequence: "CGAATCCGTTAAGCTGATCC",
        pamSite: "TGG",
      },
    ],
  },

  // ── ENHANCED NUTRITION ────────────────────────────────
  {
    id: "enhanced-nutrition",
    name: "Biofortification",
    description:
      "Increased levels of essential vitamins, minerals, and antioxidants in edible plant tissues for improved human nutrition.",
    category: "nutrition",
    icon: "M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3",
    color: "#FBBF24",
    geneTargets: [
      {
        geneId: "at-psy-bio",
        geneName: "PSY",
        fullName: "Phytoene Synthase (β-carotene / Vitamin A)",
        genomeId: "arabidopsis",
        chromosome: "Chr 5",
        position: 0.15,
        editType: "overexpression",
        editDescription:
          "Overexpress rate-limiting carotenoid enzyme PSY for enhanced provitamin A (β-carotene) accumulation — the same approach as Golden Rice.",
        mechanism:
          "PSY catalyzes the first committed step from GGPP to phytoene. Overexpression pulls flux through the entire carotenoid pathway, increasing β-carotene in edible tissues.",
        confidence: "high",
        expectedOutcome:
          "5-20x increase in β-carotene content. Golden coloration of tissues. Addresses vitamin A deficiency affecting 250 million children globally.",
        offTargetRisk: "low",
        guideRNASequence: "TCGATCCGAATTCAAGGCTA",
        pamSite: "AGG",
      },
      {
        geneId: "at-lcyb-bio",
        geneName: "LCYB",
        fullName: "Lycopene β-Cyclase",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.3,
        editType: "overexpression",
        editDescription:
          "Co-overexpress LCYB with PSY to convert lycopene to β-carotene, maximizing provitamin A accumulation.",
        mechanism:
          "LCYB cyclizes lycopene to β-carotene. Without co-overexpression, PSY overexpression can lead to lycopene accumulation rather than β-carotene.",
        confidence: "high",
        expectedOutcome:
          "Near-complete conversion of lycopene to β-carotene. Maximum provitamin A content in edible tissues.",
        offTargetRisk: "low",
        guideRNASequence: "AAGCTGATTCGAATCCGATC",
        pamSite: "TGG",
      },
      // Capsicum nutrition
      {
        geneId: "ca-caccs",
        geneName: "CCS",
        fullName: "Capsanthin-Capsorubin Synthase",
        genomeId: "capsicum",
        chromosome: "Chr 6",
        position: 0.3,
        editType: "overexpression",
        editDescription:
          "Overexpress CCS for enhanced capsanthin (red carotenoid) production, increasing antioxidant content of peppers.",
        mechanism:
          "CCS converts antheraxanthin and violaxanthin to capsanthin and capsorubin. These ketocarotenoids are powerful antioxidants unique to Capsicum.",
        confidence: "medium",
        expectedOutcome:
          "2-3x higher capsanthin content. Deeper red coloration. Enhanced antioxidant capacity of fruits.",
        offTargetRisk: "low",
        guideRNASequence: "GATTCGAATCCGGATCCGTT",
        pamSite: "CGG",
      },
    ],
  },

  // ── YIELD ENHANCEMENT ─────────────────────────────────
  {
    id: "yield-boost",
    name: "Photosynthetic Yield Enhancement",
    description:
      "Improved carbon fixation efficiency through Rubisco engineering, photorespiration bypass, and enhanced light harvesting.",
    category: "yield",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    color: "#4ADE80",
    geneTargets: [
      {
        geneId: "at-sedp",
        geneName: "SBPase",
        fullName: "Sedoheptulose-1,7-Bisphosphatase",
        genomeId: "arabidopsis",
        chromosome: "Chr 3",
        position: 0.62,
        editType: "overexpression",
        editDescription:
          "Overexpress Calvin cycle enzyme SBPase to relieve the rate-limiting step in carbon fixation regeneration phase.",
        mechanism:
          "SBPase catalyzes a rate-limiting step in the regeneration phase of the Calvin cycle. Overexpression increases RuBP regeneration capacity, allowing Rubisco to operate closer to Vmax.",
        confidence: "high",
        expectedOutcome:
          "15-30% increase in photosynthetic carbon fixation. Translates to 10-20% biomass increase in field conditions.",
        offTargetRisk: "low",
        guideRNASequence: "CCGAATCGATGCTAACGGAT",
        pamSite: "AGG",
      },
      {
        geneId: "at-plgg1-ko",
        geneName: "PLGG1",
        fullName: "Plastidic Glycolate/Glycerate Transporter",
        genomeId: "arabidopsis",
        chromosome: "Chr 1",
        position: 0.42,
        editType: "insertion",
        editDescription:
          "Insert synthetic glycolate metabolism bypass pathway (GlcDH + TSR) to convert glycolate to glycerate in the chloroplast, bypassing energy-expensive photorespiration.",
        mechanism:
          "Photorespiration wastes 25-30% of fixed carbon. The synthetic bypass converts 2-phosphoglycolate directly to 3-phosphoglycerate within the chloroplast, releasing CO₂ that Rubisco refixes.",
        confidence: "experimental",
        expectedOutcome:
          "20-40% increase in photosynthetic efficiency in C3 plants. Field trials show 20% biomass increase in tobacco.",
        offTargetRisk: "medium",
        guideRNASequence: "TGATTCGAATCCGGATCCGA",
        pamSite: "TGG",
      },
    ],
  },

  // ── FLOOD TOLERANCE ───────────────────────────────────
  {
    id: "flood-tolerance",
    name: "Submergence / Waterlogging Tolerance",
    description:
      "Survival under flooded conditions through enhanced aerenchyma formation, anaerobic metabolism, and ethylene-mediated growth responses.",
    category: "stress-tolerance",
    icon: "M3 17h4l2-4 4 8 4-12 2 4h4",
    color: "#60A5FA",
    geneTargets: [
      {
        geneId: "at-erfvii",
        geneName: "RAP2.12",
        fullName: "ERF-VII Transcription Factor RAP2.12",
        genomeId: "arabidopsis",
        chromosome: "Chr 1",
        position: 0.28,
        editType: "point-mutation",
        editDescription:
          "Mutate the N-terminal MC- motif (C2A) to prevent N-degron pathway degradation, stabilizing RAP2.12 under normoxic conditions for flood preparedness.",
        mechanism:
          "RAP2.12 is normally degraded by the N-degron pathway in the presence of oxygen. Stabilization pre-activates anaerobic response genes (ADH1, PDC1) before flooding occurs.",
        confidence: "medium",
        expectedOutcome:
          "Survival of complete submergence for 7 days (vs 3 days wild-type). Pre-activated fermentation pathways maintain energy supply.",
        offTargetRisk: "medium",
        guideRNASequence: "CCGTTAAGCTGATTCGAATC",
        pamSite: "CGG",
      },
      {
        geneId: "at-lsd1-ko",
        geneName: "LSD1",
        fullName: "Lesion Simulating Disease 1",
        genomeId: "arabidopsis",
        chromosome: "Chr 4",
        position: 0.15,
        editType: "knockout",
        editDescription:
          "Knockout LSD1 to enhance lysigenous aerenchyma formation in roots for improved oxygen transport under waterlogging.",
        mechanism:
          "LSD1 negatively regulates programmed cell death. Knockout enhances constitutive aerenchyma formation in root cortex, creating gas channels for oxygen diffusion from shoots to submerged roots.",
        confidence: "experimental",
        expectedOutcome:
          "Enhanced aerenchyma in root cortex. Improved root oxygen supply under waterlogged conditions.",
        offTargetRisk: "high",
        guideRNASequence: "GCTGATTCGAATCCGGATCC",
        pamSite: "AGG",
      },
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ENVIRONMENTS DATABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const environments: Environment[] = [
  {
    id: "arid-desert",
    name: "Arid Desert",
    description:
      "Extreme heat, minimal rainfall, sandy soils with low organic matter. Plants must survive prolonged drought, intense solar radiation, and wide diurnal temperature swings.",
    color: "#F59E0B",
    gradient: "from-amber-600 to-orange-500",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    challenges: [
      "Chronic water deficit (< 250mm annual rainfall)",
      "Extreme daytime temperatures (40-55°C)",
      "Intense UV-B radiation (high altitude deserts)",
      "Nutrient-poor sandy soils with low water-holding capacity",
    ],
    temperatureRange: "5°C – 55°C",
    rainfall: "< 250mm/year",
    soilType: "Sandy, low organic matter, alkaline",
    requiredTraitIds: [
      "drought-tolerance",
      "heat-tolerance",
      "uv-resistance",
      "nutrient-efficiency",
    ],
  },
  {
    id: "arctic-alpine",
    name: "Arctic / Alpine",
    description:
      "Extreme cold, short growing seasons, permafrost soils, and intense UV at altitude. Plants must complete lifecycle rapidly and survive prolonged freezing.",
    color: "#38BDF8",
    gradient: "from-sky-500 to-blue-400",
    icon: "M12 2L8 8h8L12 2zm0 20l4-6H8l4 6zm-7-9l6-4v8l-6-4zm14 0l-6 4V9l6 4z",
    challenges: [
      "Prolonged freezing (-30°C to -50°C in winter)",
      "Very short growing season (60-90 days)",
      "Intense UV-B at high altitude",
      "Permafrost limiting root depth",
    ],
    temperatureRange: "-50°C – 15°C",
    rainfall: "150-500mm/year",
    soilType: "Thin, acidic, permafrost substrate",
    requiredTraitIds: [
      "cold-tolerance",
      "uv-resistance",
      "nutrient-efficiency",
      "yield-boost",
    ],
  },
  {
    id: "saline-coastal",
    name: "Saline Coastal",
    description:
      "Salt-affected soils from seawater intrusion or irrigation. Plants must manage sodium toxicity while maintaining potassium nutrition and osmotic balance.",
    color: "#2DD4BF",
    gradient: "from-teal-500 to-cyan-400",
    icon: "M3 17h4l2-4 4 8 4-12 2 4h4",
    challenges: [
      "Soil salinity (200-400mM NaCl equivalent)",
      "Osmotic stress reducing water uptake",
      "Na+ toxicity disrupting K+/Na+ ratio",
      "Periodic flooding with saline water",
    ],
    temperatureRange: "10°C – 35°C",
    rainfall: "300-1200mm/year",
    soilType: "Saline, sodic, clay-rich",
    requiredTraitIds: [
      "salt-tolerance",
      "flood-tolerance",
      "nutrient-efficiency",
    ],
  },
  {
    id: "tropical-humid",
    name: "Tropical Humid",
    description:
      "High temperature, high humidity, heavy rainfall, and intense pathogen pressure. Year-round growing but constant disease and waterlogging challenges.",
    color: "#4ADE80",
    gradient: "from-green-500 to-emerald-400",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    challenges: [
      "Intense fungal and bacterial pathogen pressure",
      "Periodic waterlogging from heavy rainfall",
      "High humidity promoting foliar disease",
      "Nutrient leaching from heavy rainfall",
    ],
    temperatureRange: "22°C – 35°C",
    rainfall: "> 2000mm/year",
    soilType: "Laterite, acidic, nutrient-leached",
    requiredTraitIds: [
      "disease-resistance",
      "flood-tolerance",
      "heat-tolerance",
      "nutrient-efficiency",
    ],
  },
  {
    id: "high-altitude",
    name: "High-Altitude Plateau",
    description:
      "Thin atmosphere, intense UV radiation, cold nights, and low CO₂ partial pressure. Plants must photosynthesize efficiently with less atmospheric CO₂.",
    color: "#A78BFA",
    gradient: "from-violet-500 to-purple-400",
    icon: "M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4",
    challenges: [
      "Intense UV-B (50-100% higher than sea level)",
      "Low CO₂ partial pressure reducing photosynthesis",
      "Large diurnal temperature swings (30°C range)",
      "Thin, rocky soils with low nutrient availability",
    ],
    temperatureRange: "-10°C – 25°C",
    rainfall: "400-800mm/year",
    soilType: "Thin, rocky, volcanic",
    requiredTraitIds: [
      "uv-resistance",
      "cold-tolerance",
      "yield-boost",
      "nutrient-efficiency",
    ],
  },
  {
    id: "nutrient-depleted",
    name: "Nutrient-Depleted Farmland",
    description:
      "Over-farmed soils with depleted nitrogen, phosphorus, and micronutrients. Must produce nutritious food from degraded land without expensive fertilizer inputs.",
    color: "#FBBF24",
    gradient: "from-yellow-500 to-amber-400",
    icon: "M12 19V5m-7 7l7-7 7 7",
    challenges: [
      "Severely depleted soil nitrogen and phosphorus",
      "Low organic matter reducing water retention",
      "Micronutrient deficiencies (Fe, Zn, Se)",
      "Cannot afford synthetic fertilizer inputs",
    ],
    temperatureRange: "15°C – 35°C",
    rainfall: "500-1000mm/year",
    soilType: "Degraded, low organic matter, compacted",
    requiredTraitIds: [
      "nutrient-efficiency",
      "yield-boost",
      "enhanced-nutrition",
      "drought-tolerance",
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EDIT PLAN GENERATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const plantNames: Record<string, string> = {
  arabidopsis: "Arabidopsis thaliana",
  vitis: "Vitis vinifera (Grapevine)",
  capsicum: "Capsicum annuum (Chili Pepper)",
  nicotiana: "Nicotiana tabacum (Tobacco)",
};

const summaries: Record<string, string> = {
  "arid-desert":
    "This edit plan engineers comprehensive desert adaptation by targeting water conservation (ABA signaling, stomatal regulation), heat shock response (HSP network), UV protection (flavonoid sunscreens), and nutrient scavenging from poor soils.",
  "arctic-alpine":
    "This plan confers cold hardiness through CBF/COR cold acclimation, membrane stabilization, UV-B protection for high-altitude exposure, and enhanced photosynthetic efficiency to maximize the short growing season.",
  "saline-coastal":
    "Edits target the three pillars of salt tolerance: Na+ exclusion from roots (SOS1), vacuolar sequestration (NHX1), and shoot protection (HKT1 xylem retrieval), complemented by flood survival mechanisms.",
  "tropical-humid":
    "This plan prioritizes broad-spectrum disease resistance (NPR1/SAR pathway) alongside flood tolerance and heat stability, addressing the major production constraints in tropical agriculture.",
  "high-altitude":
    "Engineering focuses on UV damage mitigation, cold night survival, and photosynthetic enhancement to compensate for reduced CO₂ partial pressure at altitude.",
  "nutrient-depleted":
    "Edits improve nutrient acquisition (high-affinity transporters), photosynthetic efficiency, and biofortification to produce more nutritious food from degraded soils with minimal inputs.",
};

export function getEditPlan(
  plantId: string,
  environmentId: string
): EditPlan | null {
  const env = environments.find((e) => e.id === environmentId);
  if (!env) return null;

  const plantName = plantNames[plantId];
  if (!plantName) return null;

  const requiredTraits = env.requiredTraitIds
    .map((tid) => traits.find((t) => t.id === tid))
    .filter((t): t is Trait => t !== undefined);

  const edits: PlannedEdit[] = [];
  let priority = 1;

  for (const trait of requiredTraits) {
    const relevantTargets = trait.geneTargets.filter(
      (g) => g.genomeId === plantId
    );
    for (const gene of relevantTargets) {
      edits.push({ gene, trait, priority: priority++ });
    }
  }

  if (edits.length === 0) return null;

  const totalEdits = edits.length;
  const highConfidence = edits.filter(
    (e) => e.gene.confidence === "high"
  ).length;
  const experimentalCount = edits.filter(
    (e) => e.gene.confidence === "experimental"
  ).length;

  const complexityScore = Math.min(
    10,
    Math.round(
      totalEdits * 1.2 + experimentalCount * 2 - highConfidence * 0.3
    )
  );
  const successProbability = Math.max(
    0.15,
    Math.min(
      0.95,
      0.95 - totalEdits * 0.06 - experimentalCount * 0.12 + highConfidence * 0.04
    )
  );
  const estimatedGenerations = Math.max(2, Math.ceil(totalEdits / 2) + 1);
  const timelineMonths = estimatedGenerations * 4 + totalEdits * 2;

  return {
    plantId,
    plantName,
    environmentId,
    environmentName: env.name,
    edits,
    totalEdits,
    complexityScore,
    estimatedGenerations,
    successProbability,
    timelineMonths,
    summary:
      summaries[environmentId] ??
      "Comprehensive genome engineering plan targeting key adaptive traits for the target environment.",
  };
}

// Utility: get all environments that have edits for a given plant
export function getAvailableEnvironments(plantId: string): Environment[] {
  return environments.filter((env) => {
    const plan = getEditPlan(plantId, env.id);
    return plan !== null && plan.edits.length > 0;
  });
}

// Utility: get trait by id
export function getTrait(id: string): Trait | undefined {
  return traits.find((t) => t.id === id);
}
