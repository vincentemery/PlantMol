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
      // Rice drought
      {
        geneId: "os-osdreb2a",
        geneName: "OsDREB2A",
        fullName: "Oryza sativa Dehydration-Responsive Element Binding 2A",
        genomeId: "rice",
        chromosome: "Chr 3",
        position: 0.28,
        editType: "point-mutation",
        editDescription:
          "Delete NRD to create constitutively active OsDREB2A-CA, analogous to Arabidopsis DREB2A strategy.",
        mechanism:
          "Activates DRE/CRT-containing drought-responsive genes including OsLEA3, OsP5CS (proline synthesis), and OsNAC transcription factors. Critical for maintaining grain fill under terminal drought.",
        confidence: "high",
        expectedOutcome:
          "30-50% yield maintenance under moderate drought stress. Improved grain fill under terminal drought conditions common in rainfed rice.",
        offTargetRisk: "low",
        guideRNASequence: "ATCGATCCGTAAGCTTGCCA",
        pamSite: "TGG",
      },
      {
        geneId: "os-osnac9",
        geneName: "OsNAC9/SNAC1",
        fullName: "Stress-responsive NAC Transcription Factor",
        genomeId: "rice",
        chromosome: "Chr 3",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress OsNAC9 under root-specific RCc3 promoter for enhanced root depth without shoot growth penalty.",
        mechanism:
          "OsNAC9 activates root-specific gene network increasing root depth, lateral root number, and root diameter. Root-specific expression avoids the dwarf phenotype seen with constitutive overexpression.",
        confidence: "high",
        expectedOutcome:
          "20% deeper root system. Enhanced water uptake from deeper soil layers. Yield maintained under moderate drought in field trials (Redillas et al., 2012).",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGATCCGAATTCGA",
        pamSite: "AGG",
      },
      // Maize drought
      {
        geneId: "zm-zmnac111",
        geneName: "ZmNAC111",
        fullName: "Zea mays NAC Domain Transcription Factor 111",
        genomeId: "maize",
        chromosome: "Chr 1",
        position: 0.78,
        editType: "overexpression",
        editDescription:
          "Overexpress ZmNAC111 under drought-inducible promoter to enhance drought-responsive gene expression.",
        mechanism:
          "ZmNAC111 is a natural variation drought tolerance gene identified through GWAS. It activates downstream drought-responsive genes and is silenced by a MITE transposon insertion in drought-sensitive lines.",
        confidence: "high",
        expectedOutcome:
          "Improved drought tolerance equivalent to donor lines. Natural allele — strong evolutionary validation.",
        offTargetRisk: "low",
        guideRNASequence: "CCGAATTCGACTGGAATCCA",
        pamSite: "TGG",
      },
      // Wheat drought
      {
        geneId: "tw-tadreb1",
        geneName: "TaDREB1",
        fullName: "Triticum aestivum DREB1 (all 3 homeologs)",
        genomeId: "wheat",
        chromosome: "Chr 2A",
        position: 0.32,
        editType: "overexpression",
        editDescription:
          "Overexpress TaDREB1 under stress-inducible RD29A promoter for enhanced drought/cold tolerance.",
        mechanism:
          "TaDREB1 activates COR/LEA gene expression across all three subgenomes. Stress-inducible promoter avoids constitutive growth penalty.",
        confidence: "medium",
        expectedOutcome:
          "Enhanced drought and cold tolerance. Must be carefully titrated to avoid yield penalty from constitutive activation.",
        offTargetRisk: "low",
        guideRNASequence: "TGCCAATCGGATCCTTAAGG",
        pamSite: "CGG",
      },
      // Tomato drought
      {
        geneId: "sl-sldreb2",
        geneName: "SlDREB2",
        fullName: "Solanum lycopersicum DREB2",
        genomeId: "tomato",
        chromosome: "Chr 3",
        position: 0.4,
        editType: "overexpression",
        editDescription:
          "Overexpress SlDREB2 under drought-inducible promoter for enhanced water-use efficiency in tomato.",
        mechanism:
          "SlDREB2 activates drought-responsive genes including LEA, P5CS, and aquaporin genes. Critical for maintaining fruit quality under deficit irrigation.",
        confidence: "medium",
        expectedOutcome:
          "Maintained fruit yield and quality under 50% reduced irrigation. Important for water-scarce tomato production regions.",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGTTAAGCTGATTCGA",
        pamSite: "AGG",
      },
      // Coffee drought
      {
        geneId: "co-cadreb",
        geneName: "CaDREB",
        fullName: "Coffea arabica Dehydration-Responsive Element Binding",
        genomeId: "coffee",
        chromosome: "Chr 16",
        position: 0.38,
        editType: "overexpression",
        editDescription:
          "Overexpress CaDREB under drought-inducible promoter for enhanced water-use efficiency in coffee plantations.",
        mechanism:
          "CaDREB activates LEA and dehydrin genes critical for cell survival during the 3-6 month dry season in coffee-growing regions. Coffee is a perennial crop — drought tolerance directly impacts multi-year productivity.",
        confidence: "medium",
        expectedOutcome:
          "Maintained cherry yield during dry season. Reduced irrigation requirements by 30%. Critical for smallholder coffee farmers facing climate-driven drought.",
        offTargetRisk: "low",
        guideRNASequence: "CCGAATTCGACTGGAATCCA",
        pamSite: "TGG",
      },
      // Soybean drought
      {
        geneId: "gm-gmdreb1",
        geneName: "GmDREB1",
        fullName: "Glycine max DREB1 Transcription Factor",
        genomeId: "soybean",
        chromosome: "Chr 3",
        position: 0.32,
        editType: "overexpression",
        editDescription:
          "Overexpress GmDREB1 under stress-inducible promoter for enhanced drought tolerance in soybean.",
        mechanism:
          "GmDREB1 activates drought-responsive gene network. Soybean is the most water-sensitive major crop — drought during R1-R6 stages can reduce yield by 40%.",
        confidence: "high",
        expectedOutcome:
          "20-30% yield maintenance under moderate drought. Improved pod retention during flowering-stage water deficit.",
        offTargetRisk: "low",
        guideRNASequence: "ATCGATCCGTAAGCTTGCCA",
        pamSite: "AGG",
      },
      // Potato drought
      {
        geneId: "st-stdreb2",
        geneName: "StDREB2",
        fullName: "Solanum tuberosum DREB2",
        genomeId: "potato",
        chromosome: "Chr 7",
        position: 0.4,
        editType: "overexpression",
        editDescription:
          "Overexpress StDREB2 for drought tolerance in potato — the most water-intensive major food crop per calorie.",
        mechanism:
          "StDREB2 activates protective gene network in tuber-forming tissues. Potato's shallow root system makes it extremely drought-susceptible.",
        confidence: "medium",
        expectedOutcome:
          "Maintained tuber yield under 50% reduced irrigation. Critical for potato production in water-scarce regions.",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGATCCGAATTCGA",
        pamSite: "TGG",
      },
      // Cassava drought
      {
        geneId: "me-medreb2",
        geneName: "MeDREB2A",
        fullName: "Manihot esculenta DREB2A",
        genomeId: "cassava",
        chromosome: "Chr 5",
        position: 0.4,
        editType: "overexpression",
        editDescription:
          "Enhance the already drought-tolerant cassava's stress response for even harsher conditions in expanding Sahel production zones.",
        mechanism:
          "Cassava is naturally drought-tolerant via stomatal control and starch reserve mobilization. MeDREB2A overexpression enhances these existing mechanisms.",
        confidence: "medium",
        expectedOutcome:
          "Extended drought survival from 4 to 6 months without rain. Critical for food security in sub-Saharan Africa's expanding dry zones.",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGTTAAGCTGATTCGA",
        pamSite: "CGG",
      },
      // ── New crop drought targets ──
      { geneId: "hv-dreb1", geneName: "HvDREB1", fullName: "Hordeum vulgare Dehydration-Responsive Element Binding 1", genomeId: "barley", chromosome: "Chr 3H", position: 0.45, editType: "overexpression", editDescription: "Overexpress HvDREB1 to enhance drought tolerance in barley — already among the most drought-tolerant cereals.", mechanism: "HvDREB1 activates DRE/CRT-containing drought-responsive genes. Barley's natural drought tolerance makes this enhancement highly effective.", confidence: "high", expectedOutcome: "30-40% improved yield under drought stress. Barley's existing drought architecture provides strong baseline.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "TGG" },
      { geneId: "sb-dreb2", geneName: "SbDREB2", fullName: "Sorghum bicolor Dehydration-Responsive Element Binding 2", genomeId: "sorghum", chromosome: "Chr 1", position: 0.32, editType: "overexpression", editDescription: "Enhance sorghum's already exceptional drought tolerance for extreme arid conditions.", mechanism: "SbDREB2 activates drought-responsive genes. Sorghum is naturally the most drought-tolerant cereal due to C4 photosynthesis and waxy cuticle.", confidence: "high", expectedOutcome: "Survival extended from 30 to 45+ days without rain. Enhanced stay-green trait.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "AGG" },
      { geneId: "sb-staygreen", geneName: "SbStay-Green", fullName: "Sorghum bicolor Stay-Green (SbSGR)", genomeId: "sorghum", chromosome: "Chr 3", position: 0.45, editType: "point-mutation", editDescription: "Introduce stay-green mutation to delay senescence during terminal drought.", mechanism: "Point mutation in SbSGR reduces chlorophyll degradation rate, maintaining photosynthetic capacity during grain fill under drought.", confidence: "high", expectedOutcome: "30-day delay in leaf senescence. 15-20% yield improvement under terminal drought.", offTargetRisk: "low", guideRNASequence: "TGCAATCGGATCCTTAAGCG", pamSite: "NGG" },
      { geneId: "gh-dreb", geneName: "GhDREB", fullName: "Gossypium hirsutum DREB Transcription Factor", genomeId: "cotton", chromosome: "D05", position: 0.38, editType: "overexpression", editDescription: "Overexpress GhDREB for drought tolerance in rain-fed cotton production.", mechanism: "GhDREB activates dehydration-responsive genes. Cotton is moderately drought-sensitive — lint yield drops 50%+ under water deficit.", confidence: "medium", expectedOutcome: "20-30% yield protection under moderate drought. Critical for dryland cotton.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "ca2-dreb1", geneName: "CaDREB1", fullName: "Cicer arietinum DREB1 Transcription Factor", genomeId: "chickpea", chromosome: "Chr 1", position: 0.35, editType: "overexpression", editDescription: "Overexpress CaDREB1 for terminal drought tolerance — the #1 constraint on chickpea production.", mechanism: "CaDREB1 activates drought-responsive genes. Chickpea is typically grown on residual soil moisture with no irrigation.", confidence: "medium", expectedOutcome: "25-35% yield improvement under terminal drought. Critical for rainfed South Asian chickpea.", offTargetRisk: "low", guideRNASequence: "AGTCGATCGAATTCCGGATC", pamSite: "NGG" },
      { geneId: "pg-dreb2", geneName: "PgDREB2", fullName: "Pennisetum glaucum DREB2 (Drought/Heat Responsive)", genomeId: "pearl-millet", chromosome: "Chr 1", position: 0.32, editType: "overexpression", editDescription: "Enhance pearl millet's extreme drought tolerance for the harshest Sahelian conditions.", mechanism: "PgDREB2 activates combined drought and heat responsive genes unique to pearl millet. This species thrives with <300mm annual rainfall.", confidence: "high", expectedOutcome: "Survival with <200mm annual rainfall. Pearl millet feeds 90 million people in the Sahel.", offTargetRisk: "low", guideRNASequence: "GCGATCAATTCGGATCCGTA", pamSite: "TGG" },
      { geneId: "cq-dreb", geneName: "CqDREB", fullName: "Chenopodium quinoa DREB Transcription Factor", genomeId: "quinoa", chromosome: "Chr 2A", position: 0.7, editType: "overexpression", editDescription: "Enhance quinoa's drought response for lowland cultivation outside its Andean native range.", mechanism: "CqDREB activates osmolyte biosynthesis and stomatal regulation genes. Quinoa is naturally adapted to Altiplano drought.", confidence: "medium", expectedOutcome: "Improved performance in new dryland environments — enabling quinoa expansion beyond the Andes.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "ib-dreb", geneName: "IbDREB", fullName: "Ipomoea batatas DREB Transcription Factor", genomeId: "sweet-potato", chromosome: "Chr 3", position: 0.72, editType: "overexpression", editDescription: "Overexpress IbDREB for drought tolerance in rainfed sweet potato production in sub-Saharan Africa.", mechanism: "IbDREB activates drought stress response genes in this hexaploid crop. Sweet potato is a key food security crop in drought-prone regions.", confidence: "medium", expectedOutcome: "Extended drought survival. Critical for food security in eastern and southern Africa.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "ah-dreb1", geneName: "AhDREB1", fullName: "Arachis hypogaea DREB1 Transcription Factor", genomeId: "peanut", chromosome: "A09", position: 0.72, editType: "overexpression", editDescription: "Overexpress AhDREB1 for drought tolerance in rainfed peanut.", mechanism: "AhDREB1 activates drought-responsive genes. Peanut is grown predominantly rainfed in semi-arid tropics.", confidence: "medium", expectedOutcome: "20-30% pod yield protection under drought. Important for smallholder farmers in India and West Africa.", offTargetRisk: "low", guideRNASequence: "GCTTAACCGGATCGATCGAA", pamSite: "NGG" },
      { geneId: "bn-dreb", geneName: "BnDREB", fullName: "Brassica napus DREB Transcription Factor", genomeId: "canola", chromosome: "C08", position: 0.7, editType: "overexpression", editDescription: "Enhance canola drought tolerance for expanding dryland production in Australian and Canadian prairies.", mechanism: "BnDREB activates dehydration-responsive genes. Close relationship to Arabidopsis enables direct translation of DREB biology.", confidence: "medium", expectedOutcome: "15-25% seed yield protection under spring drought. Critical for dryland canola economics.", offTargetRisk: "low", guideRNASequence: "CCGATCGAATTCGGATCCGT", pamSite: "TGG" },
      { geneId: "sc-dreb", geneName: "ScDREB", fullName: "Saccharum officinarum DREB Transcription Factor", genomeId: "sugarcane", chromosome: "Chr 5", position: 0.4, editType: "overexpression", editDescription: "Improve sugarcane drought tolerance for rain-fed production in expanding tropical dry zones.", mechanism: "ScDREB activates drought-responsive genes. Sugarcane is a heavy water user — drought reduces sucrose yield dramatically.", confidence: "medium", expectedOutcome: "15-25% sucrose yield protection under moderate drought. Multiple homeologs require multiplex editing.", offTargetRisk: "medium", guideRNASequence: "ATCGATCCGTTAAGCGATTC", pamSite: "NGG" },
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
      // Rice cold
      {
        geneId: "os-oscbf3",
        geneName: "OsCBF3/OsDREB1A",
        fullName: "Oryza sativa C-repeat Binding Factor 3",
        genomeId: "rice",
        chromosome: "Chr 7",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress OsCBF3 under cold-inducible OsCOR15 promoter for cold tolerance at seedling stage.",
        mechanism:
          "OsCBF3 activates cold-regulated genes in rice. Seedling-stage cold damage is the primary constraint for temperate rice expansion.",
        confidence: "medium",
        expectedOutcome:
          "Survival of seedling-stage cold snaps (10°C for 5 days). Critical for direct-seeded rice in temperate regions.",
        offTargetRisk: "low",
        guideRNASequence: "CCGATTTCAAGGCTAACGTA",
        pamSite: "TGG",
      },
      // Tomato cold
      {
        geneId: "sl-slcbf1",
        geneName: "SlCBF1",
        fullName: "Solanum lycopersicum CBF1",
        genomeId: "tomato",
        chromosome: "Chr 11",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress SlCBF1 for chilling tolerance during early transplant season.",
        mechanism:
          "SlCBF1 induces cold-responsive genes. Tomato is extremely chilling-sensitive — even 4°C causes irreversible damage.",
        confidence: "medium",
        expectedOutcome:
          "Chilling tolerance at 4°C for 48h (vs damage at 10°C in WT). Earlier transplanting season.",
        offTargetRisk: "low",
        guideRNASequence: "AATCGGATCCTTAGGCCAAT",
        pamSite: "CGG",
      },
      // Coffee cold
      {
        geneId: "co-cacbf",
        geneName: "CaCBF",
        fullName: "Coffea arabica C-repeat Binding Factor",
        genomeId: "coffee",
        chromosome: "Chr 8",
        position: 0.4,
        editType: "overexpression",
        editDescription:
          "Overexpress CaCBF for frost tolerance in highland arabica production areas where occasional frosts destroy crops.",
        mechanism:
          "CaCBF activates cold-responsive genes. Brazilian coffee production is periodically devastated by frost events — the 1994 frost destroyed 1 billion coffee trees.",
        confidence: "medium",
        expectedOutcome:
          "Survival of brief frost events (-2°C for 4h). Critical for Brazilian Cerrado and Colombian highland production.",
        offTargetRisk: "low",
        guideRNASequence: "TGCCAATCGGATCCTTAAGG",
        pamSite: "AGG",
      },
      // Potato cold
      {
        geneId: "st-stcbf",
        geneName: "StCBF1",
        fullName: "Solanum tuberosum C-repeat Binding Factor 1",
        genomeId: "potato",
        chromosome: "Chr 4",
        position: 0.38,
        editType: "overexpression",
        editDescription:
          "Overexpress StCBF1 for frost tolerance in high-altitude potato production in the Andes.",
        mechanism:
          "StCBF1 activates COR genes. Andean potato farming (4000m+) faces frequent frost damage. Wild relative S. acaule tolerates -8°C.",
        confidence: "medium",
        expectedOutcome:
          "Improved frost survival at -4°C. Extended growing season in highland production zones.",
        offTargetRisk: "low",
        guideRNASequence: "CCGATTTCAAGGCTAACGTA",
        pamSite: "CGG",
      },
      // ── New crop cold targets ──
      { geneId: "hv-cbf14", geneName: "HvCBF14", fullName: "Hordeum vulgare C-repeat Binding Factor 14", genomeId: "barley", chromosome: "Chr 5H", position: 0.62, editType: "overexpression", editDescription: "Overexpress HvCBF14, the key frost tolerance gene in winter barley.", mechanism: "HvCBF14 is the most effective CBF paralog in barley — activates COR14b, DHN5, and other cold-responsive genes. Copy number variation at Fr-H2 locus controls natural frost tolerance.", confidence: "high", expectedOutcome: "Improved frost survival to -12°C. Critical for winter barley expansion into colder climates.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGAA", pamSite: "NGG" },
      { geneId: "hv-ice1", geneName: "HvICE1", fullName: "Hordeum vulgare Inducer of CBF Expression 1", genomeId: "barley", chromosome: "Chr 5H", position: 0.38, editType: "overexpression", editDescription: "Overexpress HvICE1, the upstream master regulator of the CBF cold acclimation cascade.", mechanism: "HvICE1 binds MYC elements in CBF promoters, activating the entire CBF regulon. Synergizes with HvCBF14 overexpression.", confidence: "medium", expectedOutcome: "Enhanced cold acclimation speed — full hardiness achieved in 3 days vs 7 days in wild type.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "bn-cbf", geneName: "BnCBF", fullName: "Brassica napus C-repeat Binding Factor", genomeId: "canola", chromosome: "A03", position: 0.72, editType: "overexpression", editDescription: "Enhance winter hardiness in canola for northern Canadian and Scandinavian production.", mechanism: "BnCBF activates cold-responsive genes. Winter canola yields 20% more than spring canola but requires robust frost tolerance.", confidence: "high", expectedOutcome: "Improved winter survival rate from 70% to >90% in zone 3 climates.", offTargetRisk: "low", guideRNASequence: "ATCGGATCAATTCGGATCCG", pamSite: "NGG" },
      { geneId: "cq-cbf", geneName: "CqCBF", fullName: "Chenopodium quinoa C-repeat Binding Factor", genomeId: "quinoa", chromosome: "Chr 5B", position: 0.72, editType: "overexpression", editDescription: "Enhance quinoa cold tolerance for high-altitude and northern latitude cultivation.", mechanism: "CqCBF activates cold-responsive genes. Quinoa naturally tolerates frost at 4000m+ in the Andes.", confidence: "medium", expectedOutcome: "Frost tolerance to -6°C. Enables quinoa cultivation in temperate continental climates.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "AGG" },
      { geneId: "ls-cbf", geneName: "LsCBF", fullName: "Lactuca sativa C-repeat Binding Factor", genomeId: "lettuce", chromosome: "Chr 4", position: 0.68, editType: "overexpression", editDescription: "Improve cold tolerance for extended-season lettuce production.", mechanism: "LsCBF activates cold-responsive genes enabling bolting resistance and frost survival for winter lettuce production.", confidence: "medium", expectedOutcome: "Survival at -3°C without bolting. Extended harvest season by 4-6 weeks.", offTargetRisk: "low", guideRNASequence: "GATCCGAATTCGATCGCCGA", pamSite: "NGG" },
      { geneId: "cs-cbf1", geneName: "CsCBF1", fullName: "Camellia sinensis C-repeat Binding Factor 1", genomeId: "tea", chromosome: "Chr 1", position: 0.68, editType: "overexpression", editDescription: "Enhance cold hardiness in tea for northward expansion of cultivation.", mechanism: "CsCBF1 activates COR genes for frost protection. Tea is damaged below -5°C — northern production zones face winter kill risk.", confidence: "medium", expectedOutcome: "Improved winter survival in marginal tea production zones (Georgia, Turkey, northern Japan).", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
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
      // Rice salt
      {
        geneId: "os-oshkt1-5",
        geneName: "OsHKT1;5",
        fullName: "Oryza sativa High-affinity K+ Transporter 1;5",
        genomeId: "rice",
        chromosome: "Chr 4",
        position: 0.68,
        editType: "promoter-swap",
        editDescription:
          "Enhance OsHKT1;5 expression in root stele for improved Na+ retrieval from xylem — the Saltol QTL mechanism.",
        mechanism:
          "OsHKT1;5 underlies the Saltol QTL from rice landrace 'Pokkali'. Enhanced expression retrieves Na+ from xylem before it reaches shoots.",
        confidence: "high",
        expectedOutcome:
          "50% reduction in shoot Na+. Major component of salt tolerance already validated in millions of hectares of Saltol-introgressed varieties.",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGATCCGAATTCGA",
        pamSite: "TGG",
      },
      {
        geneId: "os-osnhx1",
        geneName: "OsNHX1",
        fullName: "Oryza sativa Vacuolar Na+/H+ Antiporter",
        genomeId: "rice",
        chromosome: "Chr 1",
        position: 0.35,
        editType: "overexpression",
        editDescription:
          "Overexpress OsNHX1 for enhanced vacuolar Na+ compartmentalization in rice.",
        mechanism:
          "Vacuolar Na+ sequestration in rice leaf cells, maintaining low cytoplasmic Na+ for continued photosynthesis.",
        confidence: "high",
        expectedOutcome:
          "Continued growth at 150mM NaCl in hydroponic and soil conditions.",
        offTargetRisk: "low",
        guideRNASequence: "TCGAAGTCCATGCTAACGGT",
        pamSite: "AGG",
      },
      // Tomato salt
      {
        geneId: "sl-slnhx2",
        geneName: "SlNHX2",
        fullName: "Solanum lycopersicum Vacuolar Na+/H+ Exchanger 2",
        genomeId: "tomato",
        chromosome: "Chr 5",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress SlNHX2 for salt tolerance in tomato under saline irrigation.",
        mechanism:
          "Vacuolar Na+ sequestration in tomato maintains fruit quality under salinity.",
        confidence: "medium",
        expectedOutcome:
          "Maintained fruit yield at 100mM NaCl. Improved fruit flavor (controlled salt stress enhances sugar/acid balance).",
        offTargetRisk: "low",
        guideRNASequence: "CGATCCGAATTCAAGCTGAT",
        pamSite: "TGG",
      },
      // Coffee salt
      {
        geneId: "co-casos1",
        geneName: "CaSOS1",
        fullName: "Coffea arabica Salt Overly Sensitive 1",
        genomeId: "coffee",
        chromosome: "Chr 16",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress CaSOS1 for salt tolerance in coffee grown in coastal/lowland areas with saline groundwater.",
        mechanism:
          "Na+ exclusion via plasma membrane antiporter. Coffee is extremely salt-sensitive — saline irrigation water causes leaf necrosis and yield loss.",
        confidence: "medium",
        expectedOutcome:
          "Tolerance to irrigation water up to 50mM NaCl. Expanded growing regions to include coastal lowlands.",
        offTargetRisk: "low",
        guideRNASequence: "CGATCCGAATTCAAGCTGAT",
        pamSite: "AGG",
      },
      // Soybean salt
      {
        geneId: "gm-gmnhx1",
        geneName: "GmNHX1",
        fullName: "Glycine max Vacuolar Na+/H+ Exchanger",
        genomeId: "soybean",
        chromosome: "Chr 20",
        position: 0.38,
        editType: "overexpression",
        editDescription:
          "Overexpress GmNHX1 for vacuolar Na+ sequestration in soybean grown on salinized irrigated land.",
        mechanism:
          "Vacuolar Na+ compartmentalization protects cytoplasmic N-fixation symbiosis machinery — Bradyrhizobium nodules are extremely salt-sensitive.",
        confidence: "high",
        expectedOutcome:
          "Maintained nodulation and N-fixation at 100mM NaCl. Protected symbiotic nitrogen fixation under salt stress.",
        offTargetRisk: "low",
        guideRNASequence: "TCGAAGTCCATGCTAACGGT",
        pamSite: "TGG",
      },
      // Potato salt
      {
        geneId: "st-stnhx1",
        geneName: "StNHX1",
        fullName: "Solanum tuberosum Vacuolar Na+/H+ Antiporter",
        genomeId: "potato",
        chromosome: "Chr 11",
        position: 0.35,
        editType: "overexpression",
        editDescription:
          "Overexpress StNHX1 for salt tolerance in potato production on increasingly salinized irrigated farmland.",
        mechanism:
          "Vacuolar Na+ sequestration in potato leaf and tuber cells. Potato is moderately salt-sensitive with yield decline above 2.5 dS/m.",
        confidence: "medium",
        expectedOutcome:
          "Maintained tuber yield at up to 4 dS/m soil salinity. Important for irrigated production in arid zones.",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGATCCGAATTCGA",
        pamSite: "CGG",
      },
      // ── New crop salt targets ──
      { geneId: "hv-hkt1-5", geneName: "HvHKT1;5", fullName: "Hordeum vulgare High-affinity K+ Transporter 1;5", genomeId: "barley", chromosome: "Chr 5H", position: 0.38, editType: "point-mutation", editDescription: "Engineer HvHKT1;5 for enhanced Na+ exclusion — barley is already the most salt-tolerant cereal.", mechanism: "HvHKT1;5 retrieves Na+ from the xylem, preventing shoot accumulation. Point mutations enhance Na+ selectivity over K+.", confidence: "high", expectedOutcome: "Salt tolerance to 250 mM NaCl (vs 150 mM in wild type). Barley's natural salt tolerance makes this highly effective.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "sb-sos1", geneName: "SbSOS1", fullName: "Sorghum bicolor Salt Overly Sensitive 1", genomeId: "sorghum", chromosome: "Chr 9", position: 0.55, editType: "overexpression", editDescription: "Overexpress SbSOS1 for Na+ exclusion in sorghum under saline irrigation.", mechanism: "SbSOS1 is a plasma membrane Na+/H+ antiporter exporting Na+ from root cells. Sorghum is moderately salt-tolerant.", confidence: "medium", expectedOutcome: "Improved growth at 100 mM NaCl. Critical for irrigated sorghum in semi-arid regions.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATT", pamSite: "TGG" },
      { geneId: "cq-sos1", geneName: "CqSOS1", fullName: "Chenopodium quinoa Salt Overly Sensitive 1", genomeId: "quinoa", chromosome: "Chr 2A", position: 0.35, editType: "overexpression", editDescription: "Enhance quinoa's exceptional natural salt tolerance — quinoa grows at 40 dS/m soil salinity.", mechanism: "CqSOS1 drives Na+ exclusion. Quinoa is a true halophyte with salt bladder cells on leaf surfaces. Engineering enhances existing mechanisms.", confidence: "high", expectedOutcome: "Quinoa growth at seawater salinity levels. Enables coastal and salt-flat agriculture.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "AGG" },
      { geneId: "pg-hkt", geneName: "PgHKT", fullName: "Pennisetum glaucum High-affinity K+ Transporter", genomeId: "pearl-millet", chromosome: "Chr 3", position: 0.4, editType: "point-mutation", editDescription: "Engineer PgHKT for enhanced Na+ retrieval in pearl millet.", mechanism: "PgHKT controls Na+ loading/unloading in xylem. Pearl millet has moderate salt tolerance — enhancement needed for Sahelian saline soils.", confidence: "medium", expectedOutcome: "Maintained yield at 100 mM NaCl. Important for West African saline soils.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "ma-nhx1", geneName: "MaNHX1", fullName: "Musa acuminata Vacuolar Na+/H+ Antiporter 1", genomeId: "banana", chromosome: "Chr 3", position: 0.72, editType: "overexpression", editDescription: "Overexpress MaNHX1 for salt tolerance in coastal banana production zones.", mechanism: "MaNHX1 sequesters Na+ in vacuoles, protecting cytoplasmic enzymes. Banana is salt-sensitive — yield declines above 1.5 dS/m.", confidence: "medium", expectedOutcome: "Maintained yield at 3 dS/m. Important for typhoon-prone coastal plantations with saltwater intrusion.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "TGG" },
      { geneId: "gh-sos1", geneName: "GhSOS1", fullName: "Gossypium hirsutum Salt Overly Sensitive 1", genomeId: "cotton", chromosome: "D05", position: 0.72, editType: "overexpression", editDescription: "Overexpress GhSOS1 for salt tolerance in irrigated cotton on salinized land.", mechanism: "GhSOS1 exports Na+ from root cells. Cotton is moderately salt-tolerant but yield declines significantly above 7 dS/m.", confidence: "medium", expectedOutcome: "Maintained lint yield at 10 dS/m. Critical for Central Asian and Australian irrigated cotton.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "NGG" },
      { geneId: "bn-hkt1", geneName: "BnHKT1", fullName: "Brassica napus High-affinity K+ Transporter 1", genomeId: "canola", chromosome: "A03", position: 0.55, editType: "point-mutation", editDescription: "Engineer BnHKT1 for enhanced Na+ retrieval in canola on saline soils.", mechanism: "BnHKT1 retrieves Na+ from xylem, reducing shoot Na+ accumulation. Canola is moderately salt-sensitive.", confidence: "medium", expectedOutcome: "Improved seed yield at 100 mM NaCl. Important for dryland canola on salinized Australian soils.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "TGG" },
      { geneId: "ib-nhx1", geneName: "IbNHX1", fullName: "Ipomoea batatas Vacuolar Na+/H+ Antiporter 1", genomeId: "sweet-potato", chromosome: "Chr 6", position: 0.68, editType: "overexpression", editDescription: "Overexpress IbNHX1 for salt tolerance in coastal sweet potato production.", mechanism: "IbNHX1 sequesters Na+ in vacuoles. Sweet potato is salt-sensitive but a critical food security crop in Pacific island and coastal communities.", confidence: "medium", expectedOutcome: "Maintained storage root yield at moderate salinity. Important for Pacific island food security.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
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
      // ── New crop UV targets ──
      { geneId: "hv-uvr8", geneName: "HvUVR8", fullName: "Hordeum vulgare UV RESISTANCE LOCUS 8", genomeId: "barley", chromosome: "Chr 7H", position: 0.7, editType: "overexpression", editDescription: "Overexpress HvUVR8 for UV-B protection in high-latitude barley exposed to ozone-depleted skies.", mechanism: "HvUVR8 is the UV-B photoreceptor triggering flavonoid sunscreen biosynthesis and DNA repair gene expression.", confidence: "medium", expectedOutcome: "Enhanced UV-B acclimation. Reduced DNA damage in high-latitude spring barley.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "cq-uvr8", geneName: "CqUVR8", fullName: "Chenopodium quinoa UV RESISTANCE LOCUS 8", genomeId: "quinoa", chromosome: "Chr 9A", position: 0.68, editType: "overexpression", editDescription: "Enhance quinoa's UV-B protection — quinoa naturally grows at 4000m+ with extreme UV flux.", mechanism: "CqUVR8 triggers UV-protective flavonoid accumulation. Quinoa's natural UV tolerance at altitude makes this enhancement additive.", confidence: "medium", expectedOutcome: "Enhanced UV protection for lowland and high-altitude cultivation. Reduced UV-induced yield loss.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "cs-fls", geneName: "CsFLS", fullName: "Camellia sinensis Flavonol Synthase", genomeId: "tea", chromosome: "Chr 5", position: 0.38, editType: "overexpression", editDescription: "Overexpress CsFLS to boost catechin and flavonol production — UV stress increases tea quality.", mechanism: "CsFLS catalyzes flavonol biosynthesis. UV exposure enhances catechin production, improving tea flavor and antioxidant content.", confidence: "high", expectedOutcome: "2-3x increase in epigallocatechin gallate (EGCG). Higher-quality tea with enhanced health benefits.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "ls-myb12", geneName: "LsMYB12", fullName: "Lactuca sativa MYB12 Transcription Factor", genomeId: "lettuce", chromosome: "Chr 4", position: 0.4, editType: "overexpression", editDescription: "Overexpress LsMYB12 for UV protection and enhanced antioxidant content in lettuce.", mechanism: "LsMYB12 activates flavonol synthase and chalcone synthase genes. Increases both UV protection and nutritional value.", confidence: "medium", expectedOutcome: "Enhanced anthocyanin and flavonol content. Dual benefit: UV protection + nutritional enhancement.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
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
      // Rice heat
      {
        geneId: "os-oshsfa2d",
        geneName: "OsHSFA2d",
        fullName: "Oryza sativa Heat Shock Factor A2d",
        genomeId: "rice",
        chromosome: "Chr 3",
        position: 0.5,
        editType: "overexpression",
        editDescription:
          "Overexpress OsHSFA2d for enhanced thermotolerance during flowering — the critical heat-sensitive stage in rice.",
        mechanism:
          "OsHSFA2d activates HSP network in anthers and pollen. Heat during flowering causes pollen sterility (>35°C), the primary cause of heat-induced yield loss in rice.",
        confidence: "medium",
        expectedOutcome:
          "Maintained pollen fertility at 38°C (vs sterility at 35°C in WT). Critical adaptation for rice in warming tropics.",
        offTargetRisk: "low",
        guideRNASequence: "CGAATTCGGATCCGTTAAGG",
        pamSite: "TGG",
      },
      // Tomato heat
      {
        geneId: "sl-slhsfa1a",
        geneName: "SlHSFA1a",
        fullName: "Solanum lycopersicum Heat Shock Factor A1a",
        genomeId: "tomato",
        chromosome: "Chr 9",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress the master heat stress regulator SlHSFA1a for enhanced fruit set under heat waves.",
        mechanism:
          "SlHSFA1a is the master regulator of heat shock response in tomato (Mishra et al., 2002). Controls HSP network essential for pollen development at high temperatures.",
        confidence: "high",
        expectedOutcome:
          "Maintained fruit set at 38°C during heat waves. Reduced blossom drop. Critical for summer tomato production.",
        offTargetRisk: "low",
        guideRNASequence: "TTAAGCTGATTCGAATCCGG",
        pamSite: "AGG",
      },
      // Maize heat
      {
        geneId: "zm-zmhsp101",
        geneName: "ZmHSP101",
        fullName: "Zea mays Heat Shock Protein 101 (ClpB chaperone)",
        genomeId: "maize",
        chromosome: "Chr 8",
        position: 0.38,
        editType: "overexpression",
        editDescription:
          "Overexpress ZmHSP101 disaggregase for enhanced acquired thermotolerance in maize.",
        mechanism:
          "ZmHSP101 is a ClpB-type AAA+ ATPase that disaggregates heat-damaged protein aggregates, enabling refolding by HSP70/HSP40. Essential for acquired thermotolerance.",
        confidence: "high",
        expectedOutcome:
          "Enhanced recovery from heat shock events. Maintained tassel fertility at 40°C.",
        offTargetRisk: "low",
        guideRNASequence: "GCTGATTCGAATCCGGATCC",
        pamSite: "CGG",
      },
      // Coffee heat
      {
        geneId: "co-cahsp70",
        geneName: "CaHSP70",
        fullName: "Coffea arabica Heat Shock Protein 70",
        genomeId: "coffee",
        chromosome: "Chr 8",
        position: 0.55,
        editType: "overexpression",
        editDescription:
          "Overexpress CaHSP70 to protect coffee from rising temperatures that threaten arabica production — arabica is extremely heat-sensitive.",
        mechanism:
          "CaHSP70 prevents protein aggregation during heat stress. Arabica coffee optimal range is 18-22°C — even 25°C sustained reduces quality. Climate models predict 50% of current arabica-suitable land will be lost by 2050.",
        confidence: "medium",
        expectedOutcome:
          "Extended viable temperature range to 25-27°C. Critical for the survival of arabica coffee production as temperatures rise.",
        offTargetRisk: "low",
        guideRNASequence: "CCGGATCCGAATTCAAGGCT",
        pamSite: "TGG",
      },
      // Soybean heat
      {
        geneId: "gm-gmhsp90",
        geneName: "GmHSP90",
        fullName: "Glycine max Heat Shock Protein 90",
        genomeId: "soybean",
        chromosome: "Chr 20",
        position: 0.65,
        editType: "overexpression",
        editDescription:
          "Overexpress GmHSP90 for maintained pod set during heat waves that increasingly affect Midwest US and Brazilian soybean production.",
        mechanism:
          "GmHSP90 maintains protein homeostasis during heat. Heat-induced flower abortion is the primary cause of soybean yield loss at temperatures >35°C.",
        confidence: "medium",
        expectedOutcome:
          "Maintained pod set at 38°C. Reduced yield loss during increasingly frequent summer heat waves.",
        offTargetRisk: "low",
        guideRNASequence: "CGAATTCGGATCCGTTAAGG",
        pamSite: "AGG",
      },
      // ── New crop heat targets ──
      { geneId: "sb-hsfa2", geneName: "SbHSFA2", fullName: "Sorghum bicolor Heat Shock Factor A2", genomeId: "sorghum", chromosome: "Chr 9", position: 0.4, editType: "overexpression", editDescription: "Overexpress SbHSFA2 for enhanced heat tolerance in sorghum — already among the most heat-tolerant cereals.", mechanism: "SbHSFA2 activates HSP70/HSP90/HSP101 chaperone network. Sorghum's C4 photosynthesis is heat-stable but grain fill is still sensitive to >38°C.", confidence: "high", expectedOutcome: "Maintained grain fill at 42°C. Sorghum's natural heat tolerance provides strong baseline.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "TGG" },
      { geneId: "gh-hsp70", geneName: "GhHSP70", fullName: "Gossypium hirsutum Heat Shock Protein 70", genomeId: "cotton", chromosome: "A10", position: 0.68, editType: "overexpression", editDescription: "Overexpress GhHSP70 for heat tolerance — cotton boll shedding at >35°C is a major yield constraint.", mechanism: "GhHSP70 chaperone prevents protein aggregation during heat stress. Cotton is grown in hot climates but fiber development is sensitive.", confidence: "high", expectedOutcome: "Reduced boll shedding at 38°C. 15-25% lint yield improvement under heat stress.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "NGG" },
      { geneId: "pg-hsf", geneName: "PgHSF", fullName: "Pennisetum glaucum Heat Shock Factor", genomeId: "pearl-millet", chromosome: "Chr 1", position: 0.68, editType: "overexpression", editDescription: "Enhance pearl millet's extreme heat tolerance — pearl millet thrives at 42°C+ in the Sahel.", mechanism: "PgHSF activates the most heat-stable chaperone network among cereals. Pearl millet sets grain at temperatures lethal to other crops.", confidence: "high", expectedOutcome: "Maintained yield at 45°C. Critical for Sahel food security under climate change.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "ca2-hsp", geneName: "CaHSP", fullName: "Cicer arietinum Heat Shock Protein", genomeId: "chickpea", chromosome: "Chr 4", position: 0.42, editType: "overexpression", editDescription: "Overexpress CaHSP for heat tolerance — terminal heat is the #2 constraint after drought for chickpea.", mechanism: "CaHSP chaperones protect reproductive development. Chickpea flowers abort at >35°C, devastating yield.", confidence: "medium", expectedOutcome: "Maintained pod set at 38°C. Critical for South Asian chickpea production under warming.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "ah-hsfa", geneName: "AhHSFA", fullName: "Arachis hypogaea Heat Shock Factor A", genomeId: "peanut", chromosome: "B06", position: 0.5, editType: "overexpression", editDescription: "Overexpress AhHSFA for heat tolerance in peanut — heat stress reduces aflatoxin resistance.", mechanism: "AhHSFA activates chaperone network. Heat-stressed peanut is more susceptible to Aspergillus invasion and aflatoxin contamination.", confidence: "medium", expectedOutcome: "Maintained pod yield and reduced aflatoxin susceptibility at 38°C.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "sc-hsp101", geneName: "ScHSP101", fullName: "Saccharum officinarum Heat Shock Protein 101", genomeId: "sugarcane", chromosome: "Chr 5", position: 0.75, editType: "overexpression", editDescription: "Overexpress ScHSP101 for enhanced heat tolerance in tropical sugarcane under warming.", mechanism: "ScHSP101 is a AAA+ ATPase chaperone that resolves protein aggregates. Sugarcane photosynthesis declines above 38°C.", confidence: "medium", expectedOutcome: "Maintained photosynthetic rate at 40°C. Important for tropical sugarcane under climate change.", offTargetRisk: "medium", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "NGG" },
      { geneId: "ma-hsp70", geneName: "MaHSP70", fullName: "Musa acuminata Heat Shock Protein 70", genomeId: "banana", chromosome: "Chr 8", position: 0.42, editType: "overexpression", editDescription: "Overexpress MaHSP70 for heat tolerance in banana — Cavendish fruit quality declines above 34°C.", mechanism: "MaHSP70 protects cellular proteins from heat-induced aggregation. Banana fruit development is temperature-sensitive.", confidence: "medium", expectedOutcome: "Maintained fruit quality at 36°C. Important for lowland tropical banana production under warming.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
      { geneId: "tc-hsp", geneName: "TcHSP", fullName: "Theobroma cacao Heat Shock Protein", genomeId: "cacao", chromosome: "Chr 6", position: 0.68, editType: "overexpression", editDescription: "Overexpress TcHSP — cacao is extremely heat-sensitive and production zones are contracting.", mechanism: "TcHSP protects photosynthesis and flower development. Cacao thrives at 21-23°C — yield crashes above 28°C.", confidence: "medium", expectedOutcome: "Extended upper temperature limit by 2-3°C. Critical for West African cacao under climate change.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "NGG" },
      { geneId: "eg-hsp", geneName: "EgHSP", fullName: "Elaeis guineensis Heat Shock Protein", genomeId: "oil-palm", chromosome: "Chr 5", position: 0.4, editType: "overexpression", editDescription: "Overexpress EgHSP for heat tolerance in oil palm under tropical warming.", mechanism: "EgHSP protects pollen viability and fruit set. Oil palm yield declines with increasing temperature trends.", confidence: "medium", expectedOutcome: "Maintained pollen viability at 38°C. 25-year plantation lifespan makes climate adaptation critical.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "TGG" },
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
      // Rice nutrient efficiency
      {
        geneId: "os-osnrt1-1b",
        geneName: "OsNRT1.1B",
        fullName: "Oryza sativa Nitrate Transporter 1.1B",
        genomeId: "rice",
        chromosome: "Chr 10",
        position: 0.65,
        editType: "point-mutation",
        editDescription:
          "Introduce indica-type OsNRT1.1B allele (Met327 variant) for enhanced nitrate uptake and nitrogen use efficiency.",
        mechanism:
          "Natural indica/japonica variation: indica OsNRT1.1B (Met327) has higher nitrate transport activity than japonica (Thr327). This single amino acid change explains ~20% of indica-japonica NUE difference.",
        confidence: "high",
        expectedOutcome:
          "15-20% improved nitrogen use efficiency. Maintains yield with 20% less fertilizer — crucial for reducing agricultural nitrogen pollution.",
        offTargetRisk: "low",
        guideRNASequence: "TCCGAATCGATGCTAACGGA",
        pamSite: "AGG",
      },
      // Maize nutrient efficiency
      {
        geneId: "zm-zmnrt1-1b",
        geneName: "ZmNRT1.1B",
        fullName: "Zea mays Nitrate Transporter 1.1B",
        genomeId: "maize",
        chromosome: "Chr 10",
        position: 0.65,
        editType: "point-mutation",
        editDescription:
          "Enhance ZmNRT1.1B nitrate transport activity via targeted amino acid substitution.",
        mechanism:
          "Analogous to rice NRT1.1B enhancement. Maize is the largest consumer of nitrogen fertilizer — even modest NUE improvements have enormous environmental impact.",
        confidence: "medium",
        expectedOutcome:
          "10-15% improved NUE. Reduced nitrogen fertilizer requirement for maize production.",
        offTargetRisk: "low",
        guideRNASequence: "GCTAACGGTCGAATCCGATC",
        pamSite: "TGG",
      },
      // Soybean nutrient efficiency
      {
        geneId: "gm-gmnark",
        geneName: "GmNARK",
        fullName: "Glycine max Nodule Autoregulation Receptor Kinase",
        genomeId: "soybean",
        chromosome: "Chr 3",
        position: 0.7,
        editType: "point-mutation",
        editDescription:
          "Modify GmNARK to relax autoregulation of nodulation, allowing more root nodules and enhanced biological nitrogen fixation.",
        mechanism:
          "GmNARK negatively regulates nodule number through systemic shoot-root signaling. Partial loss-of-function allows 2-3x more nodules, increasing biological N-fixation from the Bradyrhizobium symbiosis.",
        confidence: "experimental",
        expectedOutcome:
          "50-100% increase in biological nitrogen fixation. Reduced dependence on synthetic N fertilizer for soybean production.",
        offTargetRisk: "medium",
        guideRNASequence: "TCCGAATCGATGCTAACGGA",
        pamSite: "TGG",
      },
      // ── New crop nutrient targets ──
      { geneId: "hv-pht1", geneName: "HvPHT1", fullName: "Hordeum vulgare Phosphate Transporter 1", genomeId: "barley", chromosome: "Chr 1H", position: 0.65, editType: "overexpression", editDescription: "Overexpress HvPHT1 for enhanced phosphorus uptake in barley on P-deficient soils.", mechanism: "HvPHT1 is a high-affinity phosphate transporter in root epidermal cells. Enhanced expression increases P foraging capacity.", confidence: "high", expectedOutcome: "30-50% increase in P uptake from low-P soils. Reduced fertilizer dependence.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "sb-pstol1", geneName: "SbPSTOL1", fullName: "Sorghum bicolor Phosphorus Starvation Tolerance 1", genomeId: "sorghum", chromosome: "Chr 3", position: 0.6, editType: "overexpression", editDescription: "Overexpress SbPSTOL1 — the PSTOL1 kinase enhances root growth for P foraging.", mechanism: "SbPSTOL1 is a protein kinase that enhances root surface area under P starvation. Originally discovered in rice aus variety Kasalath.", confidence: "high", expectedOutcome: "40-60% more root biomass under P deficiency. 20-30% higher grain yield on low-P soils.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "pg-pstol", geneName: "PgPSTOL", fullName: "Pennisetum glaucum Phosphorus Starvation Tolerance", genomeId: "pearl-millet", chromosome: "Chr 5", position: 0.45, editType: "overexpression", editDescription: "Enhance P acquisition in pearl millet on nutrient-depleted Sahelian soils.", mechanism: "PgPSTOL enhances root architecture for P foraging in the extremely P-deficient sandy soils of the Sahel.", confidence: "medium", expectedOutcome: "Improved root exploration of P-poor soils. 20-30% yield improvement without fertilizer.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "bn-pht1", geneName: "BnPHT1", fullName: "Brassica napus Phosphate Transporter 1", genomeId: "canola", chromosome: "A08", position: 0.5, editType: "overexpression", editDescription: "Overexpress BnPHT1 for improved canola production on low-P soils.", mechanism: "BnPHT1 increases high-affinity P uptake. Canola is a heavy P user — seed P demand for oil synthesis is high.", confidence: "medium", expectedOutcome: "15-25% seed yield improvement on P-deficient soils.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "cs-amt", geneName: "CsAMT", fullName: "Camellia sinensis Ammonium Transporter", genomeId: "tea", chromosome: "Chr 9", position: 0.7, editType: "overexpression", editDescription: "Overexpress CsAMT for enhanced N acquisition — tea preferentially absorbs NH4+ for theanine biosynthesis.", mechanism: "CsAMT is a high-affinity ammonium transporter. Tea uniquely prefers NH4+ over NO3-, which is channeled into theanine (the amino acid defining tea flavor).", confidence: "medium", expectedOutcome: "Enhanced theanine production via improved NH4+ uptake. Better tea quality and nitrogen use efficiency.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "tc-pht", geneName: "TcPHT", fullName: "Theobroma cacao Phosphate Transporter", genomeId: "cacao", chromosome: "Chr 9", position: 0.45, editType: "overexpression", editDescription: "Overexpress TcPHT for P uptake in cacao on weathered tropical soils.", mechanism: "TcPHT enhances P acquisition from P-locked oxisol soils where cacao is predominantly grown.", confidence: "medium", expectedOutcome: "Improved cacao tree vigor and pod production on low-fertility soils.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "NGG" },
      { geneId: "eg-pht", geneName: "EgPHT", fullName: "Elaeis guineensis Phosphate Transporter", genomeId: "oil-palm", chromosome: "Chr 10", position: 0.45, editType: "overexpression", editDescription: "Overexpress EgPHT for nutrient efficiency in oil palm on tropical soils.", mechanism: "EgPHT enhances P acquisition. Oil palm plantations on peat and mineral soils often face P limitation.", confidence: "medium", expectedOutcome: "Reduced fertilizer input costs over 25-year palm lifespan.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
      { geneId: "ls-nrt", geneName: "LsNRT", fullName: "Lactuca sativa Nitrate Transporter", genomeId: "lettuce", chromosome: "Chr 7", position: 0.72, editType: "overexpression", editDescription: "Overexpress LsNRT for improved nitrogen use efficiency in lettuce.", mechanism: "LsNRT enhances nitrate uptake and assimilation. Lettuce is a heavy N user — reducing fertilizer needs benefits both economics and environment.", confidence: "medium", expectedOutcome: "Same yield with 30% less N fertilizer. Reduced nitrate runoff from lettuce fields.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "NGG" },
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
      // Rice disease
      {
        geneId: "os-oswr45",
        geneName: "OsWRKY45",
        fullName: "Oryza sativa WRKY Transcription Factor 45",
        genomeId: "rice",
        chromosome: "Chr 9",
        position: 0.6,
        editType: "overexpression",
        editDescription:
          "Overexpress OsWRKY45 under pathogen-inducible promoter for broad-spectrum blast and bacterial blight resistance.",
        mechanism:
          "OsWRKY45 is the central regulator of SA-dependent defense in rice (analogous to NPR1 in Arabidopsis but functionally distinct). Activates defense genes against Magnaporthe oryzae (blast) and Xanthomonas oryzae (blight).",
        confidence: "high",
        expectedOutcome:
          "Strong resistance to rice blast and bacterial leaf blight — the two most devastating rice diseases worldwide.",
        offTargetRisk: "low",
        guideRNASequence: "AACGGATCCGAATTCAAGCT",
        pamSite: "TGG",
      },
      // Wheat disease
      {
        geneId: "tw-tanpr1",
        geneName: "TaNPR1",
        fullName: "Triticum aestivum NPR1",
        genomeId: "wheat",
        chromosome: "Chr 7A",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress TaNPR1 for enhanced systemic acquired resistance against rust and Fusarium.",
        mechanism:
          "TaNPR1 primes SA signaling for faster defense activation against biotrophic pathogens (rusts) and hemibiotrophic pathogens (Fusarium head blight).",
        confidence: "medium",
        expectedOutcome:
          "Reduced severity of stripe rust and Fusarium head blight. Must be combined with R-genes for full resistance.",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGAATTCGAATCCGTT",
        pamSite: "AGG",
      },
      // Tomato disease
      {
        geneId: "sl-slnpr1",
        geneName: "SlNPR1",
        fullName: "Solanum lycopersicum NPR1",
        genomeId: "tomato",
        chromosome: "Chr 1",
        position: 0.7,
        editType: "overexpression",
        editDescription:
          "Overexpress SlNPR1 for broad-spectrum resistance against bacterial speck, early blight, and powdery mildew.",
        mechanism:
          "SlNPR1 enhances SA-mediated defense priming in tomato. Broad-spectrum efficacy against multiple pathogen classes.",
        confidence: "high",
        expectedOutcome:
          "60-80% reduced disease severity. Reduced fungicide application. Important for organic tomato production.",
        offTargetRisk: "medium",
        guideRNASequence: "CGAATCCGTTAAGCTGATCC",
        pamSite: "CGG",
      },
      // Coffee disease
      {
        geneId: "co-canpr1",
        geneName: "CaNPR1",
        fullName: "Coffea arabica NPR1",
        genomeId: "coffee",
        chromosome: "Chr 8",
        position: 0.7,
        editType: "overexpression",
        editDescription:
          "Overexpress CaNPR1 for broad-spectrum resistance against coffee leaf rust (Hemileia vastatrix) — the most devastating coffee disease.",
        mechanism:
          "CaNPR1 primes SA-mediated defense. Coffee leaf rust has devastated plantations worldwide — the 2012 Central American outbreak destroyed 50% of production.",
        confidence: "medium",
        expectedOutcome:
          "Reduced coffee leaf rust severity by 50-70%. Complements existing SH-gene resistance. Critical for arabica which has narrow genetic base for disease resistance.",
        offTargetRisk: "low",
        guideRNASequence: "AACGGATCCGAATTCAAGCT",
        pamSite: "CGG",
      },
      // Potato disease
      {
        geneId: "st-str1",
        geneName: "StR1/Rpi-blb1",
        fullName: "Solanum tuberosum Late Blight Resistance Gene",
        genomeId: "potato",
        chromosome: "Chr 9",
        position: 0.45,
        editType: "insertion",
        editDescription:
          "Introduce Rpi-blb1 from wild relative S. bulbocastanum for durable late blight resistance — the disease that caused the Irish Famine.",
        mechanism:
          "Rpi-blb1 encodes a CC-NBS-LRR protein recognizing Phytophthora infestans effector IpiO. Provides race-non-specific resistance unlike the rapidly-overcome R1-R11 genes.",
        confidence: "high",
        expectedOutcome:
          "Near-complete late blight resistance. Eliminates need for 10-15 fungicide sprays per season. Already demonstrated in Wageningen 'DuRPh' potatoes.",
        offTargetRisk: "low",
        guideRNASequence: "GATCCGAATTCGAATCCGTT",
        pamSite: "TGG",
      },
      // Cassava disease
      {
        geneId: "me-mecmd2",
        geneName: "MeCMD2",
        fullName: "Manihot esculenta Cassava Mosaic Disease Resistance 2",
        genomeId: "cassava",
        chromosome: "Chr 16",
        position: 0.5,
        editType: "overexpression",
        editDescription:
          "Enhance CMD2-mediated resistance against cassava mosaic disease — the most yield-limiting disease in Africa.",
        mechanism:
          "CMD2 confers dominant resistance to cassava mosaic geminiviruses. Cassava mosaic disease causes 20-80% yield loss in sub-Saharan Africa.",
        confidence: "high",
        expectedOutcome:
          "Strong resistance to all cassava mosaic virus strains. Critical for the 500+ million people dependent on cassava in Africa.",
        offTargetRisk: "low",
        guideRNASequence: "CGAATCCGTTAAGCTGATCC",
        pamSite: "AGG",
      },
      // Soybean disease
      {
        geneId: "gm-gmnpr1",
        geneName: "GmNPR1",
        fullName: "Glycine max NPR1",
        genomeId: "soybean",
        chromosome: "Chr 10",
        position: 0.68,
        editType: "overexpression",
        editDescription:
          "Overexpress GmNPR1 for broad-spectrum resistance against soybean rust (Phakopsora pachyrhizi) and Phytophthora root rot.",
        mechanism:
          "GmNPR1 enhances SA-mediated defense in soybean. Asian soybean rust has devastated production in South America since 2001.",
        confidence: "medium",
        expectedOutcome:
          "Reduced soybean rust severity. Lower fungicide costs for Brazilian/Argentinian producers.",
        offTargetRisk: "low",
        guideRNASequence: "CGAATCCGTTAAGCTGATCC",
        pamSite: "TGG",
      },
      // ── New crop disease targets ──
      { geneId: "hv-mla", geneName: "HvMLA", fullName: "Hordeum vulgare Mildew Locus A", genomeId: "barley", chromosome: "Chr 2H", position: 0.72, editType: "point-mutation", editDescription: "Engineer HvMLA allele specificity for broad-spectrum powdery mildew resistance.", mechanism: "HvMLA is an NLR immune receptor — single amino acid changes in the LRR domain switch pathogen race recognition. The MLA locus contains multiple allelic specificities.", confidence: "high", expectedOutcome: "Broad-spectrum resistance to multiple Blumeria graminis f.sp. hordei races.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "sb-npr1", geneName: "SbNPR1", fullName: "Sorghum bicolor Non-expressor of PR genes 1", genomeId: "sorghum", chromosome: "Chr 9", position: 0.75, editType: "overexpression", editDescription: "Overexpress SbNPR1 for broad-spectrum disease resistance in sorghum.", mechanism: "SbNPR1 is the master regulator of salicylic acid-mediated systemic acquired resistance (SAR).", confidence: "medium", expectedOutcome: "Enhanced resistance to anthracnose, grain mold, and downy mildew.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "ma-rga2", geneName: "MaRGA2", fullName: "Musa acuminata Resistance Gene Analog 2", genomeId: "banana", chromosome: "Chr 3", position: 0.38, editType: "overexpression", editDescription: "Overexpress MaRGA2 for Fusarium wilt TR4 resistance — the existential threat to banana production.", mechanism: "MaRGA2 from wild banana M. acuminata ssp. malaccensis recognizes Fusarium oxysporum f.sp. cubense TR4 effectors. Dale et al. showed 67% of transgenic lines resist TR4 in field trials.", confidence: "high", expectedOutcome: "Resistance to Fusarium wilt TR4 — saving the Cavendish banana from the pathogen that destroyed Gros Michel.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "bn-rlm", geneName: "BnRLM", fullName: "Brassica napus Resistance to Leptosphaeria maculans", genomeId: "canola", chromosome: "C03", position: 0.78, editType: "point-mutation", editDescription: "Engineer BnRLM for durable blackleg resistance in canola.", mechanism: "BnRLM is an R-gene conferring race-specific resistance to blackleg (L. maculans). Point mutations in LRR domain can broaden recognition.", confidence: "high", expectedOutcome: "Durable blackleg resistance across multiple L. maculans races.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "ca2-rr", geneName: "CaRR", fullName: "Cicer arietinum Resistance Regulator", genomeId: "chickpea", chromosome: "Chr 1", position: 0.72, editType: "overexpression", editDescription: "Overexpress CaRR for ascochyta blight resistance — the #1 disease of chickpea globally.", mechanism: "CaRR activates defense-related genes against Ascochyta rabiei. Ascochyta blight can cause 100% yield loss in wet conditions.", confidence: "medium", expectedOutcome: "60-80% reduction in ascochyta blight severity. Critical for Mediterranean and South Asian chickpea.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "tc-npr1", geneName: "TcNPR1", fullName: "Theobroma cacao Non-expressor of PR genes 1", genomeId: "cacao", chromosome: "Chr 4", position: 0.72, editType: "overexpression", editDescription: "Overexpress TcNPR1 for broad-spectrum disease resistance — frosty pod, black pod, and witches' broom devastate cacao.", mechanism: "TcNPR1 primes SA-mediated defense. Cacao loses 30-40% of global production to Moniliophthora (frosty pod), Phytophthora (black pod), and witches' broom.", confidence: "high", expectedOutcome: "30-50% reduction in pod loss from combined disease pressure. Transformative for West African cacao farmers.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "NGG" },
      { geneId: "gh-npr1", geneName: "GhNPR1", fullName: "Gossypium hirsutum Non-expressor of PR genes 1", genomeId: "cotton", chromosome: "D09", position: 0.55, editType: "overexpression", editDescription: "Overexpress GhNPR1 for broad-spectrum disease resistance in cotton.", mechanism: "GhNPR1 activates systemic acquired resistance. Cotton faces Verticillium wilt, Fusarium wilt, and bacterial blight.", confidence: "medium", expectedOutcome: "Enhanced resistance to multiple pathogens without yield penalty.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
      { geneId: "ls-dmr6", geneName: "LsDMR6", fullName: "Lactuca sativa Downy Mildew Resistance 6", genomeId: "lettuce", chromosome: "Chr 1", position: 0.35, editType: "knockout", editDescription: "Knockout LsDMR6 for downy mildew resistance — one of the first CRISPR crops to receive USDA regulatory exemption.", mechanism: "DMR6 is a negative regulator of defense — it hydroxylates SA, reducing defense signaling. Knockout increases SA levels, conferring broad-spectrum resistance.", confidence: "high", expectedOutcome: "Near-complete resistance to Bremia lactucae (downy mildew). USDA non-regulated status already granted.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "NGG" },
      { geneId: "cs-npr1", geneName: "CsNPR1", fullName: "Camellia sinensis Non-expressor of PR genes 1", genomeId: "tea", chromosome: "Chr 5", position: 0.75, editType: "overexpression", editDescription: "Overexpress CsNPR1 for disease resistance in tea — blister blight and grey blight cause major losses.", mechanism: "CsNPR1 activates systemic acquired resistance in this woody perennial.", confidence: "medium", expectedOutcome: "Reduced fungicide application in tea production. Better for both farmer health and tea quality.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "TGG" },
      { geneId: "eg-npr1", geneName: "EgNPR1", fullName: "Elaeis guineensis Non-expressor of PR genes 1", genomeId: "oil-palm", chromosome: "Chr 5", position: 0.7, editType: "overexpression", editDescription: "Overexpress EgNPR1 for Ganoderma basal stem rot resistance — the #1 disease of oil palm.", mechanism: "EgNPR1 activates defense against Ganoderma boninense, which kills 50-80% of palms in Southeast Asian plantations by age 15.", confidence: "medium", expectedOutcome: "Extended productive palm lifespan from 15 to 25 years. Massive economic impact given 4-5 year replanting delay.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "NGG" },
      { geneId: "ah-rrs5", geneName: "AhRRS5", fullName: "Arachis hypogaea Rust Resistance 5", genomeId: "peanut", chromosome: "A03", position: 0.45, editType: "overexpression", editDescription: "Overexpress AhRRS5 for rust and late leaf spot resistance in peanut.", mechanism: "AhRRS5 is an NBS-LRR gene from wild Arachis progenitors conferring resistance to Puccinia arachidis (rust).", confidence: "medium", expectedOutcome: "70-90% reduction in peanut rust severity. Reduced fungicide use.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "AGG" },
      { geneId: "ib-rr", geneName: "IbRR", fullName: "Ipomoea batatas Resistance Regulator", genomeId: "sweet-potato", chromosome: "Chr 10", position: 0.75, editType: "overexpression", editDescription: "Overexpress IbRR for sweet potato virus disease (SPVD) resistance.", mechanism: "IbRR enhances resistance to the devastating SPVD complex (co-infection of SPCSV + SPFMV). SPVD causes near-total yield loss.", confidence: "medium", expectedOutcome: "Reduced SPVD severity. Critical for sub-Saharan African food security.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "NGG" },
      { geneId: "cq-rr", geneName: "CqRR", fullName: "Chenopodium quinoa Resistance Regulator", genomeId: "quinoa", chromosome: "Chr 14B", position: 0.78, editType: "overexpression", editDescription: "Overexpress CqRR for downy mildew resistance — the main disease of quinoa.", mechanism: "CqRR enhances defense against Peronospora variabilis, which can cause 30-50% yield loss.", confidence: "experimental", expectedOutcome: "Improved downy mildew resistance as quinoa expands to new humid environments.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "TGG" },
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
      // Rice nutrition
      {
        geneId: "os-ospsy1",
        geneName: "OsPSY1",
        fullName: "Oryza sativa Phytoene Synthase 1 (Golden Rice)",
        genomeId: "rice",
        chromosome: "Chr 1",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress OsPSY1 (from maize ZmPSY1) under endosperm-specific Gt1 promoter — the Golden Rice strategy for provitamin A biofortification.",
        mechanism:
          "ZmPSY1 expression in rice endosperm, combined with bacterial CrtI (phytoene desaturase), produces β-carotene in normally carotenoid-free white rice endosperm. This is Golden Rice 2 (GR2) technology.",
        confidence: "high",
        expectedOutcome:
          "37 μg/g β-carotene in polished rice (GR2). Addresses vitamin A deficiency affecting 250M children. Approved in Philippines, Australia, New Zealand, USA.",
        offTargetRisk: "low",
        guideRNASequence: "TCGATCCGAATTCAAGGCTA",
        pamSite: "TGG",
      },
      // Maize nutrition
      {
        geneId: "zm-zmlcyb",
        geneName: "ZmLCYB",
        fullName: "Zea mays Lycopene β-Cyclase",
        genomeId: "maize",
        chromosome: "Chr 8",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress ZmLCYB to convert lycopene to β-carotene, enhancing provitamin A content in orange maize varieties.",
        mechanism:
          "ZmLCYB catalyzes lycopene cyclization. Natural variation in ZmLCYB underlies the difference between yellow (high β-carotene) and white (low β-carotene) maize kernel color.",
        confidence: "high",
        expectedOutcome:
          "5-10x increased β-carotene in maize kernels. Biofortified orange maize already reaching millions through HarvestPlus program.",
        offTargetRisk: "low",
        guideRNASequence: "AAGCTGATTCGAATCCGATC",
        pamSite: "AGG",
      },
      // Tomato nutrition
      {
        geneId: "sl-slpsy1",
        geneName: "SlPSY1",
        fullName: "Solanum lycopersicum Phytoene Synthase 1",
        genomeId: "tomato",
        chromosome: "Chr 1",
        position: 0.35,
        editType: "overexpression",
        editDescription:
          "Overexpress fruit-specific SlPSY1 for enhanced lycopene and β-carotene content in tomato fruit.",
        mechanism:
          "SlPSY1 is the rate-limiting enzyme for carotenoid accumulation during tomato fruit ripening. Overexpression enhances both lycopene (antioxidant) and β-carotene (provitamin A).",
        confidence: "high",
        expectedOutcome:
          "2-3x higher lycopene content. Enhanced red coloration and antioxidant capacity.",
        offTargetRisk: "low",
        guideRNASequence: "GATTCGAATCCGGATCCGTT",
        pamSite: "TGG",
      },
      // Potato nutrition
      {
        geneId: "st-stpsy1",
        geneName: "StPSY1",
        fullName: "Solanum tuberosum Phytoene Synthase 1",
        genomeId: "potato",
        chromosome: "Chr 1",
        position: 0.3,
        editType: "overexpression",
        editDescription:
          "Overexpress StPSY1 for β-carotene biofortification in potato flesh — 'Orange-fleshed' potato for vitamin A.",
        mechanism:
          "PSY overexpression in potato tubers produces β-carotene in normally white flesh. Analogous to Golden Rice but in potato — a staple for 1.3 billion people.",
        confidence: "high",
        expectedOutcome:
          "Orange-fleshed potato with 5-10x higher β-carotene. Addresses vitamin A deficiency in potato-dependent populations in Andes, Africa, and South Asia.",
        offTargetRisk: "low",
        guideRNASequence: "TCGATCCGAATTCAAGGCTA",
        pamSite: "AGG",
      },
      // Cassava nutrition
      {
        geneId: "me-mepsy",
        geneName: "MePSY2",
        fullName: "Manihot esculenta Phytoene Synthase 2",
        genomeId: "cassava",
        chromosome: "Chr 5",
        position: 0.72,
        editType: "overexpression",
        editDescription:
          "Overexpress MePSY2 for provitamin A biofortification in cassava roots — BioCassava Plus strategy.",
        mechanism:
          "MePSY2 drives carotenoid accumulation in cassava storage roots. Yellow-fleshed cassava varieties have naturally higher PSY expression. Engineering amplifies this trait.",
        confidence: "high",
        expectedOutcome:
          "8-10 μg/g β-carotene in cassava roots (vs <1 μg/g in white varieties). Addresses vitamin A deficiency for 250M+ cassava-dependent people in Africa.",
        offTargetRisk: "low",
        guideRNASequence: "GATTCGAATCCGGATCCGTT",
        pamSite: "CGG",
      },
      // ── New crop nutrition targets ──
      { geneId: "ib-or", geneName: "IbOr", fullName: "Ipomoea batatas Orange (Or) Gene", genomeId: "sweet-potato", chromosome: "Chr 3", position: 0.4, editType: "overexpression", editDescription: "Overexpress IbOr for beta-carotene biofortification — the Orange gene is THE biofortification success story.", mechanism: "IbOr encodes a DnaJ-like chaperone that triggers chromoplast differentiation, creating carotenoid-sequestering sink organelles. This is the basis of orange-fleshed sweet potato (OFSP) feeding millions.", confidence: "high", expectedOutcome: "300% RDA vitamin A per serving. OFSP already reduces vitamin A deficiency in 10+ African countries.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "ma-psy", geneName: "MaPSY", fullName: "Musa acuminata Phytoene Synthase 2", genomeId: "banana", chromosome: "Chr 5", position: 0.35, editType: "overexpression", editDescription: "Overexpress MaPSY2 for provitamin A banana — addressing vitamin A deficiency in East Africa.", mechanism: "MaPSY catalyzes the first committed step of carotenoid biosynthesis (GGPP → phytoene). Paul et al. showed 4-6x increase in fruit β-carotene.", confidence: "high", expectedOutcome: "4-6x increase in fruit β-carotene. Golden banana for vitamin A biofortification in Uganda and surrounding countries.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "sb-psy1", geneName: "SbPSY1", fullName: "Sorghum bicolor Phytoene Synthase 1", genomeId: "sorghum", chromosome: "Chr 1", position: 0.68, editType: "overexpression", editDescription: "Overexpress SbPSY1 for provitamin A sorghum — addressing micronutrient deficiency in Africa.", mechanism: "SbPSY1 drives carotenoid biosynthesis in sorghum grain. Yellow endosperm varieties have higher natural PSY expression.", confidence: "medium", expectedOutcome: "10-20 μg/g β-carotene in sorghum grain. Biofortified sorghum for the Sahel.", offTargetRisk: "low", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "pg-fer", geneName: "PgFER", fullName: "Pennisetum glaucum Ferritin", genomeId: "pearl-millet", chromosome: "Chr 3", position: 0.75, editType: "overexpression", editDescription: "Overexpress PgFER for iron biofortification in pearl millet.", mechanism: "PgFER stores iron in a bioavailable form. Pearl millet is already the most iron-dense cereal — enhancement targets 80+ mg/kg Fe.", confidence: "medium", expectedOutcome: "Iron-biofortified pearl millet with 80+ mg/kg Fe. HarvestPlus target level for reducing iron deficiency anemia.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "hv-nas2", geneName: "HvNAS2", fullName: "Hordeum vulgare Nicotianamine Synthase 2", genomeId: "barley", chromosome: "Chr 3H", position: 0.78, editType: "overexpression", editDescription: "Overexpress HvNAS2 for zinc biofortification in barley grain.", mechanism: "HvNAS2 synthesizes nicotianamine, which chelates zinc for phloem loading into grain. Ramesh et al. showed 2-3x Zn increase.", confidence: "medium", expectedOutcome: "2-3x increase in grain Zn content. Zinc-biofortified barley for combating zinc deficiency.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "ah-fad2", geneName: "AhFAD2", fullName: "Arachis hypogaea Fatty Acid Desaturase 2", genomeId: "peanut", chromosome: "A09", position: 0.38, editType: "point-mutation", editDescription: "Knockout AhFAD2 for high oleic peanut — healthier oil with extended shelf life.", mechanism: "AhFAD2 converts oleic (18:1) to linoleic acid (18:2). Knockout in both A and B homeologs increases oleic from 50% to >80%.", confidence: "high", expectedOutcome: "High oleic peanut (>80% oleic acid). Healthier oil profile, 10x extended shelf life, better frying stability.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "NGG" },
      { geneId: "bn-fad2", geneName: "BnFAD2", fullName: "Brassica napus Fatty Acid Desaturase 2", genomeId: "canola", chromosome: "A03", position: 0.4, editType: "point-mutation", editDescription: "Knockout BnFAD2 for high oleic canola — the most important canola quality trait.", mechanism: "BnFAD2 knockout blocks oleic→linoleic conversion. Both A and C homeologs must be edited. High oleic canola is already commercial.", confidence: "high", expectedOutcome: "Oleic acid >75% (vs 60% in standard canola). Premium commodity pricing for high oleic oil.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
      { geneId: "eg-fatb", geneName: "EgFATB", fullName: "Elaeis guineensis Fatty Acid Thioesterase B", genomeId: "oil-palm", chromosome: "Chr 2", position: 0.72, editType: "knockout", editDescription: "Knockout EgFATB to reduce palmitic acid — making palm oil healthier.", mechanism: "EgFATB releases palmitic acid (16:0) from fatty acid synthase. Knockout reduces saturated fat content, addressing health concerns about palm oil.", confidence: "high", expectedOutcome: "40-60% reduction in palmitic acid content. Healthier palm oil without trans fats.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "NGG" },
      { geneId: "ls-myb", geneName: "LsMYB", fullName: "Lactuca sativa MYB Transcription Factor", genomeId: "lettuce", chromosome: "Chr 7", position: 0.38, editType: "overexpression", editDescription: "Overexpress LsMYB for enhanced anthocyanin content in lettuce.", mechanism: "LsMYB activates the anthocyanin biosynthetic pathway, increasing antioxidant content in lettuce leaves.", confidence: "medium", expectedOutcome: "2-3x anthocyanin content. Enhanced visual appeal and nutritional value.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "TGG" },
      { geneId: "cq-bet", geneName: "CqBET", fullName: "Chenopodium quinoa Betalain Biosynthesis Gene", genomeId: "quinoa", chromosome: "Chr 14B", position: 0.45, editType: "overexpression", editDescription: "Enhance betalain pigment production for antioxidant-rich quinoa.", mechanism: "CqBET controls betalain biosynthesis — unique pigments with potent antioxidant activity found only in Caryophyllales.", confidence: "medium", expectedOutcome: "Enhanced antioxidant capacity. Novel deep-red quinoa varieties with premium market appeal.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "NGG" },
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
      // Rice yield
      {
        geneId: "os-osgw7",
        geneName: "OsGW7/GL7",
        fullName: "Oryza sativa Grain Width 7 / Grain Length 7",
        genomeId: "rice",
        chromosome: "Chr 7",
        position: 0.45,
        editType: "promoter-swap",
        editDescription:
          "Modify OsGW7 promoter to enhance expression for longer, slender grains with higher grain weight.",
        mechanism:
          "OsGW7 encodes a TONNEAU1-recruiting motif protein that controls cell division orientation in the spikelet hull. Enhanced expression produces longer grains with higher filling rate.",
        confidence: "high",
        expectedOutcome:
          "10-15% increase in grain weight. Slender grain shape preferred in many Asian markets.",
        offTargetRisk: "low",
        guideRNASequence: "CCGAATCGATGCTAACGGAT",
        pamSite: "CGG",
      },
      // Wheat yield
      {
        geneId: "tw-tagw2-ko",
        geneName: "TaGW2",
        fullName: "Triticum aestivum Grain Weight 2 (knockout all homeologs)",
        genomeId: "wheat",
        chromosome: "Chr 4A",
        position: 0.75,
        editType: "knockout",
        editDescription:
          "Knockout TaGW2 across all three homeologs (A, B, D) using multiplex CRISPR to increase grain size and yield.",
        mechanism:
          "TaGW2 encodes an E3 ubiquitin ligase that negatively regulates grain width. Knockout removes this negative regulation, allowing larger endosperm cell size. All three homeologs must be knocked out in hexaploid wheat.",
        confidence: "high",
        expectedOutcome:
          "10-20% increase in grain weight. Demonstrated in Chinese wheat varieties (Zhang et al., 2018).",
        offTargetRisk: "medium",
        guideRNASequence: "TGATTCGAATCCGGATCCGA",
        pamSite: "AGG",
      },
      // ── New crop yield targets ──
      { geneId: "hv-gw", geneName: "HvGW", fullName: "Hordeum vulgare Grain Weight QTL", genomeId: "barley", chromosome: "Chr 7H", position: 0.4, editType: "point-mutation", editDescription: "Engineer HvGW for increased grain weight in barley.", mechanism: "HvGW is a grain weight regulator — point mutations increase grain fill rate and thousand kernel weight.", confidence: "medium", expectedOutcome: "10-15% increase in grain weight. Enhanced malting barley quality.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "sb-gw2", geneName: "SbGW2", fullName: "Sorghum bicolor Grain Weight 2", genomeId: "sorghum", chromosome: "Chr 6", position: 0.5, editType: "knockout", editDescription: "Knockout SbGW2 (negative regulator) to increase grain size in sorghum.", mechanism: "SbGW2 is a RING-type E3 ubiquitin ligase that negatively regulates grain size. Loss-of-function increases grain width and weight.", confidence: "medium", expectedOutcome: "15-20% increase in grain weight. Improved sorghum as food and feed crop.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "sc-sps", geneName: "ScSPS", fullName: "Saccharum officinarum Sucrose Phosphate Synthase", genomeId: "sugarcane", chromosome: "Chr 1", position: 0.35, editType: "overexpression", editDescription: "Overexpress ScSPS to increase sucrose accumulation — the primary yield component in sugarcane.", mechanism: "ScSPS catalyzes the rate-limiting step of sucrose synthesis. Enhanced expression increases sucrose loading into stem storage parenchyma.", confidence: "high", expectedOutcome: "10-15% increase in stem sucrose content. Direct economic benefit at sugar mill.", offTargetRisk: "medium", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "ma-mads", geneName: "MaMADS", fullName: "Musa acuminata MADS-box Transcription Factor", genomeId: "banana", chromosome: "Chr 10", position: 0.45, editType: "promoter-swap", editDescription: "Swap MaMADS promoter for enhanced fruit development in banana.", mechanism: "MaMADS controls fruit size and development. Promoter engineering can increase bunch weight without affecting fruit quality.", confidence: "medium", expectedOutcome: "15-25% increase in bunch weight. Higher yield per plant per cycle.", offTargetRisk: "medium", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "bn-clv3", geneName: "BnCLV3", fullName: "Brassica napus CLAVATA3", genomeId: "canola", chromosome: "A03", position: 0.6, editType: "point-mutation", editDescription: "Engineer BnCLV3 for increased silique number — analogous to maize fasciated ear QTL.", mechanism: "BnCLV3 controls shoot apical meristem size. Weak alleles increase inflorescence meristem activity and silique number.", confidence: "medium", expectedOutcome: "10-15% more siliques per plant. Higher seed yield without increasing plant density.", offTargetRisk: "medium", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "pg-gw2", geneName: "PgGW2", fullName: "Pennisetum glaucum Grain Weight 2", genomeId: "pearl-millet", chromosome: "Chr 5", position: 0.72, editType: "knockout", editDescription: "Knockout PgGW2 to increase grain size in pearl millet.", mechanism: "PgGW2 negatively regulates grain size. Knockout increases grain weight — critical for making pearl millet more competitive with larger-grained cereals.", confidence: "medium", expectedOutcome: "15-25% increase in grain weight. Improved acceptability and food processing quality.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "NGG" },
      { geneId: "eg-shell", geneName: "EgSHELL", fullName: "Elaeis guineensis SHELL (Fruit Form)", genomeId: "oil-palm", chromosome: "Chr 2", position: 0.38, editType: "point-mutation", editDescription: "Engineer EgSHELL for tenera fruit form — 30% more oil yield than dura.", mechanism: "EgSHELL is a MADS-box gene. Heterozygous Sh/sh (tenera) has thin endocarp and 30% more mesocarp (oil-bearing tissue) than homozygous Sh/Sh (dura).", confidence: "high", expectedOutcome: "All palms produce tenera fruit form. 30% more oil per palm over 25-year lifespan.", offTargetRisk: "low", guideRNASequence: "TCCGGATCGATCGAATTCGA", pamSite: "AGG" },
      { geneId: "ca2-pod", geneName: "CaPOD", fullName: "Cicer arietinum Pod Development Gene", genomeId: "chickpea", chromosome: "Chr 4", position: 0.68, editType: "overexpression", editDescription: "Enhance pod number and seed size in chickpea.", mechanism: "CaPOD regulates pod set and seed filling. Chickpea yield is limited by pod number per plant and seeds per pod.", confidence: "medium", expectedOutcome: "15-20% increase in pod number. Higher harvest index.", offTargetRisk: "low", guideRNASequence: "ATCGATCGAATTCCGGATCA", pamSite: "NGG" },
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
      // Rice flood
      {
        geneId: "os-sub1a",
        geneName: "SUB1A",
        fullName: "Submergence Tolerance 1A (ERF-VII transcription factor)",
        genomeId: "rice",
        chromosome: "Chr 9",
        position: 0.33,
        editType: "insertion",
        editDescription:
          "Introduce SUB1A from submergence-tolerant landrace 'FR13A' into modern high-yielding varieties lacking the SUB1A allele.",
        mechanism:
          "SUB1A confers 'quiescence strategy': represses gibberellin-mediated elongation during submergence, conserving carbohydrate reserves for survival and rapid recovery after water recedes. Already deployed in millions of hectares via conventional breeding (SUB1 mega-varieties).",
        confidence: "high",
        expectedOutcome:
          "Survival of 14 days complete submergence (vs 3-4 days in non-SUB1 varieties). No yield penalty under normal conditions. Already feeding 6 million farming families in South/Southeast Asia.",
        offTargetRisk: "low",
        guideRNASequence: "CCGTTAAGCTGATTCGAATC",
        pamSite: "AGG",
      },
      // ── New crop flood targets ──
      { geneId: "hv-erf", geneName: "HvERF-VII", fullName: "Hordeum vulgare ERF-VII Transcription Factor", genomeId: "barley", chromosome: "Chr 2H", position: 0.5, editType: "overexpression", editDescription: "Overexpress HvERF-VII for waterlogging tolerance in barley.", mechanism: "HvERF-VII activates anaerobic metabolism genes and aerenchyma formation. Barley is one of the most waterlogging-sensitive cereals.", confidence: "medium", expectedOutcome: "Survival of 7-10 days waterlogging (vs 3-4 days wild type). Critical for wet spring conditions.", offTargetRisk: "low", guideRNASequence: "GCTAGCTTAACCGGATCGTA", pamSite: "NGG" },
      { geneId: "sb-sub1", geneName: "SbSUB1-like", fullName: "Sorghum bicolor SUB1-like ERF Transcription Factor", genomeId: "sorghum", chromosome: "Chr 3", position: 0.55, editType: "overexpression", editDescription: "Overexpress SbSUB1-like for flood tolerance in lowland sorghum.", mechanism: "SbSUB1-like is orthologous to rice SUB1A. Activates quiescence response during submergence.", confidence: "medium", expectedOutcome: "5-7 days submergence tolerance. Important for sorghum in flood-prone West African lowlands.", offTargetRisk: "low", guideRNASequence: "TCCGATCGAATTCGATCCGA", pamSite: "TGG" },
      { geneId: "sc-erf", geneName: "ScERF-VII", fullName: "Saccharum officinarum ERF-VII Transcription Factor", genomeId: "sugarcane", chromosome: "Chr 8", position: 0.45, editType: "overexpression", editDescription: "Overexpress ScERF-VII for waterlogging tolerance in sugarcane.", mechanism: "ScERF-VII activates anaerobic metabolism. Sugarcane in tropical lowlands faces periodic waterlogging during monsoon.", confidence: "medium", expectedOutcome: "Improved survival during 2-3 week waterlogging events.", offTargetRisk: "medium", guideRNASequence: "ATCGGATCCGTTAAGCGATC", pamSite: "AGG" },
      { geneId: "ma-erf", geneName: "MaERF-VII", fullName: "Musa acuminata ERF-VII Transcription Factor", genomeId: "banana", chromosome: "Chr 8", position: 0.75, editType: "overexpression", editDescription: "Overexpress MaERF-VII for flood tolerance in banana — critical for tropical flood-prone plantations.", mechanism: "MaERF-VII activates aerenchyma formation and anaerobic metabolism. Banana roots are sensitive to waterlogging — prolonged flooding causes root rot.", confidence: "medium", expectedOutcome: "Improved root survival during seasonal flooding. Important for monsoon-belt banana production.", offTargetRisk: "low", guideRNASequence: "GCCGATCGAATTCGATCCGT", pamSite: "NGG" },
      { geneId: "ib-erf", geneName: "IbERF", fullName: "Ipomoea batatas ERF Transcription Factor", genomeId: "sweet-potato", chromosome: "Chr 10", position: 0.42, editType: "overexpression", editDescription: "Overexpress IbERF for waterlogging tolerance in sweet potato.", mechanism: "IbERF activates aerenchyma formation in storage roots. Sweet potato in tropical lowlands faces waterlogging during rainy season.", confidence: "medium", expectedOutcome: "Reduced storage root rot during waterlogging. Important for tropical production.", offTargetRisk: "low", guideRNASequence: "CCGAATTCGATCCGTTAAGC", pamSite: "TGG" },
      { geneId: "ls-erf", geneName: "LsERF", fullName: "Lactuca sativa ERF Transcription Factor", genomeId: "lettuce", chromosome: "Chr 9", position: 0.45, editType: "overexpression", editDescription: "Overexpress LsERF for waterlogging tolerance in lettuce.", mechanism: "LsERF activates hypoxia-responsive genes. Lettuce roots are extremely sensitive to waterlogging — common in poorly drained fields.", confidence: "experimental", expectedOutcome: "Improved survival in waterlogged soils. Beneficial for heavy clay field production.", offTargetRisk: "low", guideRNASequence: "GATCCGTTAAGCGATCGAAT", pamSite: "AGG" },
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
  // ── NEW ENVIRONMENTS ──────────────────────────────────
  {
    id: "mediterranean",
    name: "Mediterranean Climate",
    description:
      "Hot, dry summers and mild, wet winters. Fire risk and seasonal drought stress dominate. The transition zone where many temperate crops face increasing heat and aridity due to climate change.",
    color: "#F97316",
    gradient: "from-orange-500 to-amber-500",
    icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    challenges: [
      "Prolonged summer drought (3-5 months without rain)",
      "Fire risk from dry biomass accumulation",
      "Heat waves exceeding 40°C becoming more frequent",
      "Soil salinization from irrigation in summer",
    ],
    temperatureRange: "5°C – 42°C (high diurnal/seasonal range)",
    rainfall: "400-800mm/year (concentrated in winter)",
    soilType: "Terra rossa, calcareous, often alkaline",
    requiredTraitIds: [
      "drought-tolerance",
      "heat-tolerance",
      "uv-resistance",
      "yield-boost",
    ],
  },
  {
    id: "temperate-continental",
    name: "Temperate Continental",
    description:
      "Harsh winters with freeze-thaw cycles, warm summers, and a short but intense growing season. The world's major breadbasket regions — US Midwest, Ukrainian steppe, North China Plain.",
    color: "#6366F1",
    gradient: "from-indigo-500 to-blue-500",
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    challenges: [
      "Winter temperatures below -20°C with freeze-thaw cycles",
      "Short growing season (120-180 frost-free days)",
      "Late spring frosts damaging emerging crops",
      "Rapid temperature fluctuations in spring/autumn",
    ],
    temperatureRange: "-25°C – 35°C (extreme range)",
    rainfall: "400-800mm/year (summer-dominant)",
    soilType: "Chernozem, mollisol (deep, fertile)",
    requiredTraitIds: [
      "cold-tolerance",
      "yield-boost",
      "disease-resistance",
      "drought-tolerance",
    ],
  },
  {
    id: "monsoon-floodplain",
    name: "Monsoon Floodplain",
    description:
      "Seasonal monsoon flooding submerges crops for days to weeks. Bangladesh, Myanmar, eastern India, Mekong Delta — where hundreds of millions depend on flood-prone rice and other staples.",
    color: "#0EA5E9",
    gradient: "from-sky-500 to-cyan-500",
    icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    challenges: [
      "Complete submergence for 7-21 days during monsoon",
      "Stagnant flooding with anaerobic soil conditions",
      "Post-flood disease pressure from humid conditions",
      "Sudden flash flooding with strong water current",
    ],
    temperatureRange: "20°C – 38°C",
    rainfall: "1500-3000mm/year (80% in monsoon season)",
    soilType: "Alluvial, waterlogged, anaerobic",
    requiredTraitIds: [
      "flood-tolerance",
      "disease-resistance",
      "yield-boost",
      "salt-tolerance",
    ],
  },
  {
    id: "acidic-tropical",
    name: "Acidic Tropical Soil",
    description:
      "Highly weathered tropical soils with pH < 5.0 and toxic levels of aluminum and manganese. Over 50% of tropical arable land is acidic — a massive constraint on food production in Africa and South America.",
    color: "#A3E635",
    gradient: "from-lime-400 to-green-500",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    challenges: [
      "Aluminum toxicity inhibiting root growth (Al³⁺ > 50% CEC)",
      "Phosphorus lockup in Fe/Al oxides — unavailable to plants",
      "Manganese toxicity in waterlogged acid soils",
      "Very low cation exchange capacity and nutrient retention",
    ],
    temperatureRange: "22°C – 35°C",
    rainfall: "1200-2500mm/year",
    soilType: "Oxisol, ultisol, ferralsol (pH 3.5-5.0)",
    requiredTraitIds: [
      "nutrient-efficiency",
      "disease-resistance",
      "yield-boost",
      "enhanced-nutrition",
    ],
  },
  {
    id: "heavy-metal",
    name: "Heavy Metal Contaminated",
    description:
      "Soils contaminated with cadmium, arsenic, lead, or zinc from mining, industrial activity, or phosphate fertilizer use. A growing food safety crisis — crops must exclude toxic metals from edible parts.",
    color: "#71717A",
    gradient: "from-zinc-500 to-slate-600",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
    challenges: [
      "Cadmium accumulation in grain exceeding Codex limits",
      "Arsenic in rice from paddy irrigation water",
      "Lead contamination near roads and smelters",
      "Zinc/copper excess from mine tailings",
    ],
    temperatureRange: "Variable (10°C – 35°C)",
    rainfall: "Variable",
    soilType: "Contaminated — various types with heavy metal burden",
    requiredTraitIds: [
      "nutrient-efficiency",
      "enhanced-nutrition",
      "yield-boost",
      "disease-resistance",
    ],
  },
  {
    id: "controlled-environment",
    name: "Urban / Controlled Environment",
    description:
      "Vertical farms, greenhouses, and space agriculture. Artificial lighting (LED), hydroponic/aeroponic systems, and controlled atmosphere. Optimizing for growth rate, compact architecture, and nutritional density.",
    color: "#A855F7",
    gradient: "from-purple-500 to-violet-500",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    challenges: [
      "Artificial lighting spectrum and photoperiod optimization",
      "Compact plant architecture for vertical stacking",
      "Rapid growth cycle for economic viability",
      "Nutrient density per unit of growing space",
    ],
    temperatureRange: "20°C – 28°C (controlled)",
    rainfall: "N/A (hydroponic — 90% less water than field)",
    soilType: "Soilless — hydroponic, aeroponic, or substrate-based",
    requiredTraitIds: [
      "yield-boost",
      "enhanced-nutrition",
      "disease-resistance",
      "nutrient-efficiency",
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
  rice: "Oryza sativa (Rice)",
  maize: "Zea mays (Maize)",
  wheat: "Triticum aestivum (Wheat)",
  tomato: "Solanum lycopersicum (Tomato)",
  coffee: "Coffea arabica (Coffee)",
  soybean: "Glycine max (Soybean)",
  potato: "Solanum tuberosum (Potato)",
  cassava: "Manihot esculenta (Cassava)",
  barley: "Hordeum vulgare (Barley)",
  sorghum: "Sorghum bicolor (Sorghum)",
  cotton: "Gossypium hirsutum (Cotton)",
  sugarcane: "Saccharum officinarum (Sugarcane)",
  banana: "Musa acuminata (Banana)",
  canola: "Brassica napus (Canola)",
  peanut: "Arachis hypogaea (Peanut)",
  chickpea: "Cicer arietinum (Chickpea)",
  "pearl-millet": "Pennisetum glaucum (Pearl Millet)",
  quinoa: "Chenopodium quinoa (Quinoa)",
  "sweet-potato": "Ipomoea batatas (Sweet Potato)",
  cacao: "Theobroma cacao (Cacao)",
  tea: "Camellia sinensis (Tea)",
  "oil-palm": "Elaeis guineensis (Oil Palm)",
  lettuce: "Lactuca sativa (Lettuce)",
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
  "mediterranean":
    "Engineering targets seasonal drought survival (ABA signaling, stomatal regulation), heat wave resilience (HSP network, membrane thermostability), UV protection for intense solar radiation, and yield stability under variable water availability.",
  "temperate-continental":
    "This plan engineers winter survival through deep cold acclimation (CBF cascade, membrane remodeling, cryoprotectant accumulation), rapid spring growth to maximize the short growing season, and disease resistance against cold-wet pathogens.",
  "monsoon-floodplain":
    "Edits confer submergence tolerance (SUB1A quiescence strategy, ERF-VII regulation), rapid recovery after de-submergence, and post-flood disease resistance to combat the humid pathogen pressure following monsoon flooding.",
  "acidic-tropical":
    "This plan targets aluminum tolerance (organic acid exudation, Al³⁺ exclusion), phosphorus acquisition from locked-up soil P (enhanced root exudates, mycorrhizal signaling), and micronutrient biofortification for nutritious food from degraded soils.",
  "heavy-metal":
    "Engineering focuses on toxic metal exclusion from edible parts — blocking cadmium/arsenic uptake at root level (transporter knockouts), vacuolar sequestration in non-edible tissues, and enhanced nutrient acquisition to outcompete toxic metals for uptake.",
  "controlled-environment":
    "This plan optimizes for controlled-environment agriculture: compact plant architecture (dwarfing genes), rapid growth cycle (photoperiod insensitivity), enhanced nutritional density, and disease resistance for closed growing systems.",
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
