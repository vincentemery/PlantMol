// ────────────────────────────────────────────────────────────
//  Deep Analysis Engine for Genome Architect
//  Epistatic interactions, expression profiles, delivery
//  strategies, regulatory classification, stacking plans,
//  pathway impacts, phenotype predictions, wild relatives
// ────────────────────────────────────────────────────────────

import type { EditPlan, PlannedEdit, EditType } from "./environments";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export type InteractionType =
  | "synergistic"
  | "antagonistic"
  | "neutral"
  | "conditional";

export interface EpistaticInteraction {
  geneA: string; // geneId
  geneB: string;
  type: InteractionType;
  strength: number; // -1 (strong antagonism) to +1 (strong synergy)
  description: string;
  mechanismDetail: string;
}

export interface TissueExpression {
  geneId: string;
  tissues: {
    root: number;
    stem: number;
    leaf: number;
    flower: number;
    fruit: number;
    seed: number;
  }; // 0-1 relative expression
  dominantTissue: string;
  expressionNotes: string;
}

export interface DeliveryStrategy {
  genomeId: string;
  species: string;
  primaryMethod: string;
  alternativeMethod: string;
  explantType: string;
  transformationEfficiency: string;
  timeToT0: string; // time to first transgenic plant
  genotypeDependence: "low" | "medium" | "high";
  notes: string;
  difficulty: "easy" | "moderate" | "difficult" | "very-difficult";
}

export interface RegulatoryClassification {
  editType: EditType;
  sdnCategory: "SDN-1" | "SDN-2" | "SDN-3" | "Transgenic";
  usRegulation: string;
  euRegulation: string;
  japanRegulation: string;
  description: string;
  foreignDNA: boolean;
}

export interface StackingStep {
  generation: number;
  geneIds: string[];
  geneNames: string[];
  rationale: string;
  method: string; // "co-transformation" | "sequential" | "crossing"
  expectedDuration: string;
}

export interface StackingPlan {
  totalGenerations: number;
  steps: StackingStep[];
  strategy: string;
  notes: string;
}

export interface WildRelativeInfo {
  genomeId: string;
  traitId: string;
  relativeSpecies: string;
  commonName: string;
  naturalMechanism: string;
  validationStatus: "confirmed" | "putative" | "ortholog-identified";
  potentialForIntrogression: string;
}

export interface PhenotypePrediction {
  traitId: string;
  morphological: string[];
  physiological: string[];
  metabolic: string[];
  tradeoffs: string[];
}

export interface PathwayImpact {
  geneId: string;
  pathway: string;
  fluxChange: "increased" | "decreased" | "redirected" | "blocked";
  magnitude: number; // fold change estimate
  affectedMetabolites: string[];
  description: string;
}

export interface FullAnalysis {
  interactions: EpistaticInteraction[];
  expressionProfiles: TissueExpression[];
  deliveryStrategy: DeliveryStrategy | null;
  regulatoryClassifications: RegulatoryClassification[];
  stackingPlan: StackingPlan | null;
  wildRelatives: WildRelativeInfo[];
  phenotypePredictions: PhenotypePrediction[];
  pathwayImpacts: PathwayImpact[];
  overallRiskScore: number; // 1-10
  biosafetyConcerns: string[];
  literatureRefs: LiteratureRef[];
}

export interface LiteratureRef {
  geneId: string;
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi: string;
  finding: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  EPISTATIC INTERACTIONS DATABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const interactions: EpistaticInteraction[] = [
  // Drought synergies
  {
    geneA: "at-dreb2a",
    geneB: "at-nced3",
    type: "synergistic",
    strength: 0.85,
    description:
      "DREB2A and NCED3 act through complementary drought response pathways — DREB2A activates dehydration-responsive genes directly while NCED3 amplifies ABA signaling upstream.",
    mechanismDetail:
      "DREB2A binds DRE/CRT elements (ABA-independent pathway) while NCED3-derived ABA activates AREB/ABF transcription factors binding ABRE elements (ABA-dependent pathway). Together they activate >90% of drought-responsive genes vs ~60% individually.",
  },
  {
    geneA: "at-dreb2a",
    geneB: "at-era1",
    type: "synergistic",
    strength: 0.72,
    description:
      "ERA1 knockout sensitizes ABA signaling while DREB2A activates ABA-independent drought genes. The combination covers both major drought response pathways.",
    mechanismDetail:
      "ERA1 loss prevents farnesylation of negative regulators (ABI1/ABI2), enhancing ABA perception. DREB2A-CA bypasses the need for drought signal entirely. Synergy arises from complete coverage of drought transcriptome.",
  },
  {
    geneA: "at-era1",
    geneB: "at-nced3",
    type: "synergistic",
    strength: 0.65,
    description:
      "Enhanced ABA production (NCED3) combined with enhanced ABA sensitivity (ERA1 KO) creates a powerful amplification loop for drought signaling.",
    mechanismDetail:
      "More ABA produced + more sensitive receptors = dramatically enhanced stomatal closure. Risk of ABA hypersensitivity in non-stress conditions partially mitigated by stress-inducible NCED3 promoter.",
  },
  // Cold synergies
  {
    geneA: "at-cbf1",
    geneB: "at-ice1",
    type: "synergistic",
    strength: 0.9,
    description:
      "ICE1 is the upstream activator of CBF1. Stabilized ICE1 (K393R) combined with enhanced CBF1 creates a maximally activated cold acclimation cascade.",
    mechanismDetail:
      "ICE1 K393R avoids HOS1-mediated degradation, sustaining CBF1 transcription. Combined with CBF1 overexpression, the cold regulon (COR15A, COR47, RD29A, LEA genes) is maximally activated with 5-8x higher expression than either alone.",
  },
  {
    geneA: "at-cbf1",
    geneB: "at-cor15a",
    type: "synergistic",
    strength: 0.55,
    description:
      "CBF1 induces COR15A among other targets. Direct COR15A overexpression ensures maximal chloroplast protection even if CBF1 activation is incomplete.",
    mechanismDetail:
      "Redundant activation of COR15A (both by CBF1 and by direct overexpression) ensures chloroplast membrane protection is never rate-limiting during freeze-thaw cycles.",
  },
  // Cross-trait antagonisms
  {
    geneA: "at-fad7-ko",
    geneB: "at-cbf1",
    type: "antagonistic",
    strength: -0.6,
    description:
      "FAD7 knockout reduces trienoic fatty acids for heat tolerance but impairs membrane fluidity needed for cold acclimation — directly opposing CBF1's cold tolerance effect.",
    mechanismDetail:
      "CBF1 induces FAD8 (a paralog of FAD7) during cold acclimation to increase membrane unsaturation. FAD7 KO reduces baseline trienoic acids, partially counteracting cold-induced lipid remodeling. Net effect: heat tolerance gained but cold tolerance ceiling reduced by ~2°C.",
  },
  {
    geneA: "at-fad7-ko",
    geneB: "at-cor15a",
    type: "antagonistic",
    strength: -0.4,
    description:
      "FAD7 KO alters chloroplast membrane composition, partially reducing COR15A's ability to prevent lamellar-to-hexagonal phase transitions.",
    mechanismDetail:
      "COR15A stabilizes membranes with high trienoic fatty acid content. Lower trienoic content from FAD7 KO changes the phase transition point, reducing but not eliminating COR15A's protective effect.",
  },
  // Salt synergies
  {
    geneA: "at-sos1",
    geneB: "at-nhx1",
    type: "synergistic",
    strength: 0.92,
    description:
      "SOS1 (plasma membrane Na+ efflux) and NHX1 (vacuolar Na+ sequestration) are the two pillars of cellular Na+ management — complementary and strongly synergistic.",
    mechanismDetail:
      "SOS1 prevents Na+ accumulation from the apoplast; NHX1 removes cytoplasmic Na+ into the vacuole. Together they maintain cytoplasmic Na+ below 10mM even at external 200mM NaCl, while vacuolar Na+ serves as osmoticum.",
  },
  {
    geneA: "at-sos1",
    geneB: "at-hkt1",
    type: "synergistic",
    strength: 0.8,
    description:
      "SOS1 manages root cellular Na+; HKT1 retrieves Na+ from xylem before it reaches shoots. Together they create a root-based Na+ exclusion barrier.",
    mechanismDetail:
      "Root SOS1 exports Na+ to soil; root stelar HKT1;1 retrieves Na+ from xylem sap. The combination reduces shoot Na+ by >70% vs wild-type, maintaining photosynthetic tissue integrity.",
  },
  {
    geneA: "at-nhx1",
    geneB: "at-hkt1",
    type: "synergistic",
    strength: 0.75,
    description:
      "Vacuolar sequestration (NHX1) and xylem retrieval (HKT1) are complementary: HKT1 limits Na+ delivery to shoots while NHX1 handles any Na+ that reaches leaf cells.",
    mechanismDetail:
      "Even with enhanced HKT1 xylem retrieval, some Na+ reaches shoots via transpiration stream. NHX1 in leaf cells sequesters this residual Na+ into vacuoles, providing a secondary defense layer.",
  },
  // Disease + nutrition interactions
  {
    geneA: "at-npr1",
    geneB: "at-psy-bio",
    type: "conditional",
    strength: 0.15,
    description:
      "NPR1-mediated SA signaling can mildly suppress carotenoid accumulation under pathogen stress due to resource reallocation, but the effect is minor under normal conditions.",
    mechanismDetail:
      "SA signaling redirects isochorismate from the MEP/carotenoid pathway to SA biosynthesis during immune activation. PSY overexpression largely overcomes this by maintaining high flux through the carotenoid branch.",
  },
  // Photosynthesis synergies
  {
    geneA: "at-sedp",
    geneB: "at-plgg1-ko",
    type: "synergistic",
    strength: 0.88,
    description:
      "SBPase overexpression (faster Calvin cycle) combined with photorespiration bypass creates a doubly enhanced carbon fixation engine.",
    mechanismDetail:
      "SBPase relieves RuBP regeneration limitation; photorespiration bypass recovers 75% of carbon normally lost to oxygenation. Combined effect: 30-50% increase in net carbon fixation, validated in tobacco field trials.",
  },
  // Nutrient + yield
  {
    geneA: "at-nrt1",
    geneB: "at-nlp7",
    type: "synergistic",
    strength: 0.78,
    description:
      "Enhanced nitrate uptake (NRT1.1 high-affinity mutant) combined with enhanced assimilation (NLP7) maximizes nitrogen use efficiency.",
    mechanismDetail:
      "More nitrate imported + faster nitrate reduction/assimilation = higher NUE. NLP7 also upregulates NRT2.1, creating a positive feedback loop with the constitutive high-affinity NRT1.1 T101A mutant.",
  },
  // Biofortification synergy
  {
    geneA: "at-psy-bio",
    geneB: "at-lcyb-bio",
    type: "synergistic",
    strength: 0.95,
    description:
      "PSY and LCYB are sequential enzymes in the carotenoid pathway. Co-overexpression ensures flux from GGPP is efficiently converted to β-carotene (provitamin A) without lycopene bottleneck.",
    mechanismDetail:
      "PSY alone causes lycopene accumulation (red). LCYB cyclizes lycopene to β-carotene (orange/yellow). The Golden Rice strategy uses both. Co-overexpression achieves 20-fold higher β-carotene than PSY alone.",
  },
  // Flood tolerance interactions
  {
    geneA: "at-erfvii",
    geneB: "at-lsd1-ko",
    type: "synergistic",
    strength: 0.6,
    description:
      "Stabilized RAP2.12 pre-activates anaerobic metabolism while LSD1 KO enhances aerenchyma for oxygen delivery — complementary flood survival strategies.",
    mechanismDetail:
      "RAP2.12 stabilization ensures ATP production via fermentation; LSD1 KO-driven aerenchyma delivers oxygen from aerial tissues to submerged roots. Combined: both metabolic and structural adaptations.",
  },
  // Cross-plant interactions
  {
    geneA: "vv-sts-up",
    geneB: "vv-vvcbf4",
    type: "neutral",
    strength: 0.1,
    description:
      "Stilbene synthase and CBF4 operate in independent pathways (phenylpropanoid vs cold acclimation) with minimal crosstalk.",
    mechanismDetail:
      "Slight positive interaction: cold stress can increase phenylpropanoid flux in some contexts, mildly enhancing STS substrate availability.",
  },
  {
    geneA: "ca-cadreb3",
    geneB: "ca-cahsp70",
    type: "synergistic",
    strength: 0.7,
    description:
      "Drought (CaDREB3) and heat (CaHSP70) tolerance address the two main stresses in arid pepper cultivation. Co-expression provides combined thermotolerance.",
    mechanismDetail:
      "CaDREB3 maintains water balance while CaHSP70 prevents protein denaturation. During heat+drought episodes (common in field), both are essential. CaHSP70 also protects DREB3 protein from heat-induced misfolding.",
  },
  {
    geneA: "ca-cahsp70",
    geneB: "ca-caccs",
    type: "conditional",
    strength: 0.3,
    description:
      "HSP70 may stabilize CCS enzyme during heat stress, maintaining carotenoid production at high temperatures when CCS would normally denature.",
    mechanismDetail:
      "CCS is moderately heat-labile. HSP70 chaperone activity could maintain CCS folding at 35-40°C, indirectly enhancing fruit color and antioxidant content under heat stress.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TISSUE EXPRESSION PROFILES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const expressionProfiles: TissueExpression[] = [
  // Arabidopsis drought genes
  { geneId: "at-dreb2a", tissues: { root: 0.4, stem: 0.3, leaf: 0.9, flower: 0.2, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Strongly induced in leaves during dehydration stress. Basal expression in all tissues." },
  { geneId: "at-era1", tissues: { root: 0.7, stem: 0.6, leaf: 0.7, flower: 0.5, fruit: 0.4, seed: 0.3 }, dominantTissue: "root/leaf", expressionNotes: "Ubiquitous expression — ERA1 is essential for protein farnesylation across all tissues." },
  { geneId: "at-nced3", tissues: { root: 0.85, stem: 0.3, leaf: 0.6, flower: 0.2, fruit: 0.1, seed: 0.4 }, dominantTissue: "root", expressionNotes: "Highest in roots where ABA biosynthesis occurs. Strong induction in vascular tissue during drought." },
  // Arabidopsis cold genes
  { geneId: "at-cbf1", tissues: { root: 0.2, stem: 0.3, leaf: 0.95, flower: 0.1, fruit: 0.05, seed: 0.05 }, dominantTissue: "leaf", expressionNotes: "Rapidly induced in leaves within 15 min of cold exposure. Weak basal expression." },
  { geneId: "at-ice1", tissues: { root: 0.5, stem: 0.5, leaf: 0.8, flower: 0.3, fruit: 0.2, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Constitutive expression; protein is post-translationally activated by cold-induced sumoylation." },
  { geneId: "at-cor15a", tissues: { root: 0.1, stem: 0.2, leaf: 0.9, flower: 0.1, fruit: 0.05, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Cold-specific expression in chloroplast-containing tissues. Barely detectable without cold treatment." },
  // Arabidopsis salt genes
  { geneId: "at-sos1", tissues: { root: 0.95, stem: 0.4, leaf: 0.2, flower: 0.1, fruit: 0.05, seed: 0.05 }, dominantTissue: "root", expressionNotes: "Predominantly root epidermal and stelar cells. Critical at root-soil interface." },
  { geneId: "at-nhx1", tissues: { root: 0.6, stem: 0.5, leaf: 0.7, flower: 0.4, fruit: 0.3, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "All tissues with vacuoles. Highest in leaves for Na+ compartmentalization." },
  { geneId: "at-hkt1", tissues: { root: 0.9, stem: 0.6, leaf: 0.1, flower: 0.05, fruit: 0.05, seed: 0.05 }, dominantTissue: "root", expressionNotes: "Root xylem parenchyma cells exclusively. Essential for Na+ retrieval from transpiration stream." },
  // Arabidopsis UV genes
  { geneId: "at-uvr8", tissues: { root: 0.1, stem: 0.3, leaf: 0.85, flower: 0.7, fruit: 0.2, seed: 0.05 }, dominantTissue: "leaf", expressionNotes: "UV-B exposed tissues: leaves and flowers. Constitutive protein, UV-activated by monomerization." },
  { geneId: "at-chs-uv", tissues: { root: 0.1, stem: 0.3, leaf: 0.8, flower: 0.9, fruit: 0.4, seed: 0.2 }, dominantTissue: "flower/leaf", expressionNotes: "Epidermal cells of UV-exposed organs. Strongest in flower petals (pigmentation) and leaf epidermis (UV screening)." },
  // Arabidopsis heat genes
  { geneId: "at-hsfa1", tissues: { root: 0.5, stem: 0.5, leaf: 0.8, flower: 0.7, fruit: 0.3, seed: 0.4 }, dominantTissue: "leaf", expressionNotes: "Ubiquitous but highest in leaves. Rapidly activated within 5 min of heat shock." },
  { geneId: "at-fad7-ko", tissues: { root: 0.3, stem: 0.4, leaf: 0.9, flower: 0.3, fruit: 0.2, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Chloroplast-localized in green tissues. Knockout effect strongest in leaves where thylakoid membranes dominate." },
  // Arabidopsis nutrient genes
  { geneId: "at-nrt1", tissues: { root: 0.95, stem: 0.2, leaf: 0.1, flower: 0.05, fruit: 0.05, seed: 0.05 }, dominantTissue: "root", expressionNotes: "Root epidermis and cortex for nitrate uptake from soil solution. Dual-affinity transporter." },
  { geneId: "at-nlp7", tissues: { root: 0.7, stem: 0.4, leaf: 0.6, flower: 0.3, fruit: 0.2, seed: 0.2 }, dominantTissue: "root", expressionNotes: "Nuclear-localized in all tissues. Highest in roots for nitrate signaling." },
  // Arabidopsis defense
  { geneId: "at-npr1", tissues: { root: 0.3, stem: 0.5, leaf: 0.8, flower: 0.4, fruit: 0.3, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "All above-ground tissues. Strongly induced by SA and pathogen infection." },
  // Arabidopsis nutrition
  { geneId: "at-psy-bio", tissues: { root: 0.05, stem: 0.2, leaf: 0.85, flower: 0.6, fruit: 0.7, seed: 0.3 }, dominantTissue: "leaf", expressionNotes: "Plastid-localized in all photosynthetic tissues. Also active in chromoplasts of fruits and flowers." },
  { geneId: "at-lcyb-bio", tissues: { root: 0.05, stem: 0.15, leaf: 0.8, flower: 0.5, fruit: 0.6, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Co-localized with PSY in plastids. Expression parallels carotenoid accumulation." },
  // Arabidopsis yield
  { geneId: "at-sedp", tissues: { root: 0.05, stem: 0.2, leaf: 0.95, flower: 0.1, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Exclusively in chloroplasts of photosynthetic tissues. Rate-limiting in Calvin cycle regeneration phase." },
  { geneId: "at-plgg1-ko", tissues: { root: 0.05, stem: 0.15, leaf: 0.9, flower: 0.1, fruit: 0.1, seed: 0.05 }, dominantTissue: "leaf", expressionNotes: "Chloroplast envelope transporter in mesophyll cells. Knockout redirects glycolate metabolism internally." },
  // Arabidopsis flood
  { geneId: "at-erfvii", tissues: { root: 0.7, stem: 0.5, leaf: 0.6, flower: 0.2, fruit: 0.1, seed: 0.2 }, dominantTissue: "root", expressionNotes: "All tissues but rapidly degraded by N-degron pathway in normoxic conditions. Stabilized only under hypoxia." },
  { geneId: "at-lsd1-ko", tissues: { root: 0.6, stem: 0.5, leaf: 0.7, flower: 0.3, fruit: 0.2, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Ubiquitous negative regulator of PCD. Knockout effect visible as spontaneous lesions in leaves under certain conditions." },
  // Capsicum genes
  { geneId: "ca-cadreb3", tissues: { root: 0.5, stem: 0.4, leaf: 0.8, flower: 0.3, fruit: 0.2, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Drought-inducible in all vegetative tissues of pepper." },
  { geneId: "ca-cahsp70", tissues: { root: 0.4, stem: 0.5, leaf: 0.7, flower: 0.8, fruit: 0.6, seed: 0.3 }, dominantTissue: "flower", expressionNotes: "Critical in flowers for pollen thermotolerance. Also high in developing fruits." },
  { geneId: "ca-canhx2", tissues: { root: 0.7, stem: 0.5, leaf: 0.6, flower: 0.3, fruit: 0.4, seed: 0.2 }, dominantTissue: "root", expressionNotes: "Root and leaf vacuolar Na+ sequestration in pepper." },
  { geneId: "ca-capr1", tissues: { root: 0.2, stem: 0.4, leaf: 0.85, flower: 0.3, fruit: 0.5, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Pathogen-inducible in all aerial tissues. Systemic expression during SAR." },
  { geneId: "ca-caccs", tissues: { root: 0.02, stem: 0.05, leaf: 0.1, flower: 0.3, fruit: 0.95, seed: 0.1 }, dominantTissue: "fruit", expressionNotes: "Almost exclusively in ripening pepper fruit chromoplasts. Controls red coloration." },
  // Vitis genes
  { geneId: "vv-vvnced1", tissues: { root: 0.7, stem: 0.3, leaf: 0.5, flower: 0.2, fruit: 0.6, seed: 0.2 }, dominantTissue: "root", expressionNotes: "Root-dominant for ABA biosynthesis. Also active in berries during véraison." },
  { geneId: "vv-vvcbf4", tissues: { root: 0.1, stem: 0.3, leaf: 0.7, flower: 0.1, fruit: 0.1, seed: 0.05 }, dominantTissue: "leaf", expressionNotes: "Cold-inducible in grapevine leaves and dormant buds." },
  { geneId: "vv-sts-up", tissues: { root: 0.1, stem: 0.3, leaf: 0.6, flower: 0.2, fruit: 0.8, seed: 0.2 }, dominantTissue: "fruit", expressionNotes: "Berry skin during ripening and upon pathogen challenge. Also in leaves after wounding." },
  // Nicotiana genes
  { geneId: "nt-ntlea5", tissues: { root: 0.5, stem: 0.4, leaf: 0.7, flower: 0.3, fruit: 0.2, seed: 0.6 }, dominantTissue: "leaf", expressionNotes: "Stress-inducible in all tissues. High in seeds during desiccation." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DELIVERY STRATEGIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const deliveryStrategies: DeliveryStrategy[] = [
  {
    genomeId: "arabidopsis",
    species: "Arabidopsis thaliana",
    primaryMethod: "Agrobacterium tumefaciens floral dip",
    alternativeMethod: "Protoplast PEG transformation",
    explantType: "Intact flowering plants (no tissue culture needed)",
    transformationEfficiency: "0.5-3% of seeds (high for plants)",
    timeToT0: "6-8 weeks (seed to T1 seed)",
    genotypeDependence: "low",
    notes: "Gold standard for plant transformation. Floral dip avoids tissue culture entirely. Multiple constructs can be co-transformed. T-DNA integrates randomly into genome.",
    difficulty: "easy",
  },
  {
    genomeId: "vitis",
    species: "Vitis vinifera",
    primaryMethod: "Agrobacterium + somatic embryogenesis",
    alternativeMethod: "Biolistic bombardment of embryogenic callus",
    explantType: "Anther-derived embryogenic callus or meristematic bulks",
    transformationEfficiency: "1-5% of embryogenic colonies",
    timeToT0: "12-18 months (callus to rooted plant)",
    genotypeDependence: "high",
    notes: "Highly genotype-dependent. 'Thompson Seedless' and '41B' rootstock transform well. Most wine cultivars (Pinot, Cabernet) are recalcitrant. Regeneration from callus is rate-limiting.",
    difficulty: "difficult",
  },
  {
    genomeId: "capsicum",
    species: "Capsicum annuum",
    primaryMethod: "Agrobacterium + cotyledon/hypocotyl explants",
    alternativeMethod: "In planta vacuum infiltration",
    explantType: "Cotyledon or hypocotyl segments from seedlings",
    transformationEfficiency: "0.5-2% regeneration of transgenic shoots",
    timeToT0: "8-14 months",
    genotypeDependence: "high",
    notes: "Pepper is moderately recalcitrant. Shoot regeneration from callus is poor in most cultivars. Recent CRISPR ribonucleoprotein (RNP) delivery to protoplasts shows promise for DNA-free editing.",
    difficulty: "difficult",
  },
  {
    genomeId: "nicotiana",
    species: "Nicotiana tabacum",
    primaryMethod: "Agrobacterium + leaf disc transformation",
    alternativeMethod: "Protoplast electroporation",
    explantType: "Leaf disc explants from sterile plants",
    transformationEfficiency: "5-30% of explants (very high)",
    timeToT0: "3-4 months",
    genotypeDependence: "low",
    notes: "Tobacco is the easiest crop plant to transform. Excellent regeneration from leaf discs. Often used as proof-of-concept host before moving to target crop. Can regenerate whole plants from single protoplasts.",
    difficulty: "easy",
  },
  {
    genomeId: "rice",
    species: "Oryza sativa",
    primaryMethod: "Agrobacterium + mature seed-derived callus",
    alternativeMethod: "Biolistic bombardment of immature embryos",
    explantType: "Scutellum-derived callus from mature seeds",
    transformationEfficiency: "10-40% of callus pieces (japonica); 1-5% (indica)",
    timeToT0: "4-6 months",
    genotypeDependence: "medium",
    notes: "Japonica varieties (Nipponbare, Kitaake) transform easily. Indica varieties (IR64, most tropical cultivars) are harder. CRISPR RNP delivery via protoplasts is increasingly used for DNA-free editing.",
    difficulty: "moderate",
  },
  {
    genomeId: "maize",
    species: "Zea mays",
    primaryMethod: "Agrobacterium + immature embryo co-cultivation",
    alternativeMethod: "Biolistic bombardment + morphogenic regulators",
    explantType: "Immature zygotic embryos (10-12 DAP)",
    transformationEfficiency: "5-20% with morphogenic factors (BBM/WUS2)",
    timeToT0: "4-6 months",
    genotypeDependence: "high",
    notes: "Revolution with BBM/WUS2 morphogenic gene co-expression: previously genotype-restricted transformation now works across diverse inbred lines. Still requires immature embryos from greenhouse-grown plants.",
    difficulty: "moderate",
  },
  {
    genomeId: "wheat",
    species: "Triticum aestivum",
    primaryMethod: "Biolistic bombardment of immature embryos",
    alternativeMethod: "Agrobacterium + immature embryo co-cultivation",
    explantType: "Immature scutella (12-16 DAP)",
    transformationEfficiency: "1-10% depending on genotype",
    timeToT0: "5-8 months",
    genotypeDependence: "high",
    notes: "Historically very difficult. Recent improvements with growth regulator optimization and TaWOX5 morphogenic factor have expanded amenable genotypes. CRISPR in hexaploid wheat requires targeting all three homeologs (A, B, D genomes).",
    difficulty: "very-difficult",
  },
  {
    genomeId: "tomato",
    species: "Solanum lycopersicum",
    primaryMethod: "Agrobacterium + cotyledon explants",
    alternativeMethod: "Protoplast PEG transformation",
    explantType: "Cotyledon segments from 7-day seedlings",
    transformationEfficiency: "10-30% of explants",
    timeToT0: "3-5 months",
    genotypeDependence: "low",
    notes: "Excellent model for fruit crop transformation. Most cultivars regenerate well. Micro-Tom (miniature cultivar) is used for rapid cycling experiments. Well-established CRISPR protocols available.",
    difficulty: "easy",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  REGULATORY CLASSIFICATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const regulatoryClassifications: RegulatoryClassification[] = [
  {
    editType: "knockout",
    sdnCategory: "SDN-1",
    usRegulation: "Exempt — USDA APHIS does not regulate SDN-1 edits (SECURE rule, 2020). No pre-market approval needed if no foreign DNA remains.",
    euRegulation: "Regulated as GMO — ECJ ruling (Case C-528/16, 2018) classifies all mutagenesis by directed nucleases as GMOs requiring full risk assessment under Directive 2001/18/EC.",
    japanRegulation: "Exempt — Japan MAFF exempts SDN-1 edits from GMO regulation if no foreign DNA is inserted (2019 notification system).",
    description: "Small insertions/deletions (indels) at the target site disrupting gene function. No donor template. No foreign DNA integration.",
    foreignDNA: false,
  },
  {
    editType: "point-mutation",
    sdnCategory: "SDN-2",
    usRegulation: "Case-by-case — USDA evaluates based on whether the edit could occur naturally. Single nucleotide changes generally exempt.",
    euRegulation: "Regulated as GMO — same ECJ ruling applies. All directed nuclease editing treated as GMO regardless of outcome.",
    japanRegulation: "Case-by-case — if the template DNA does not integrate, treated similarly to SDN-1. Requires notification.",
    description: "Precise nucleotide substitution using a short repair template (ssODN). Template is degraded after editing — no permanent foreign DNA.",
    foreignDNA: false,
  },
  {
    editType: "promoter-swap",
    sdnCategory: "SDN-3",
    usRegulation: "Regulated if foreign DNA integrates — requires USDA/EPA/FDA coordinated review. Cisgenic (same-species DNA) may qualify for streamlined review.",
    euRegulation: "Regulated as GMO — full Directive 2001/18/EC assessment required regardless of DNA source.",
    japanRegulation: "Regulated if foreign DNA integrates — full Cartagena Protocol assessment required.",
    description: "Replacement of native promoter with alternative promoter sequence. If from same species (cisgenic), may have simplified regulatory path in some jurisdictions.",
    foreignDNA: true,
  },
  {
    editType: "overexpression",
    sdnCategory: "SDN-3",
    usRegulation: "Regulated — requires T-DNA insertion for constitutive promoter. Full USDA/EPA review. Cisgenic approaches (using native promoter) may qualify for reduced oversight.",
    euRegulation: "Regulated as GMO — full assessment required under Directive 2001/18/EC.",
    japanRegulation: "Regulated — full assessment under Cartagena Protocol implementation.",
    description: "Introduction of additional gene copy under strong promoter (CaMV 35S, ubiquitin). Typically via T-DNA integration. Constitutes genetic modification in all jurisdictions.",
    foreignDNA: true,
  },
  {
    editType: "insertion",
    sdnCategory: "Transgenic",
    usRegulation: "Fully regulated — coordinated USDA/EPA/FDA review. Multi-year field trial data required. Deregulation petition needed before commercial release.",
    euRegulation: "Fully regulated — most stringent path. Full environmental risk assessment, food safety assessment, post-market monitoring, traceability, and labeling required under Regulations EC 1829/2003 and 1830/2003.",
    japanRegulation: "Fully regulated — Cartagena Protocol + Food Sanitation Act assessment. Environmental release approval required.",
    description: "Integration of foreign gene(s) from another species or synthetic constructs. Highest regulatory burden in all jurisdictions. May include antibiotic resistance markers (negative public perception).",
    foreignDNA: true,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  WILD RELATIVE VALIDATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const wildRelatives: WildRelativeInfo[] = [
  // Drought
  { genomeId: "arabidopsis", traitId: "drought-tolerance", relativeSpecies: "Thellungiella halophila (salt cress)", commonName: "Salt Cress", naturalMechanism: "Constitutively high ABA levels and enhanced DREB2 regulon expression even without stress", validationStatus: "confirmed", potentialForIntrogression: "Not crossable with Arabidopsis, but orthologous gene function confirmed by transgenic expression" },
  { genomeId: "capsicum", traitId: "drought-tolerance", relativeSpecies: "Capsicum chacoense", commonName: "Wild Chaco Pepper", naturalMechanism: "Deep root architecture and enhanced cuticular wax deposition", validationStatus: "confirmed", potentialForIntrogression: "Cross-compatible. Used in breeding programs for drought-tolerant rootstock." },
  { genomeId: "vitis", traitId: "drought-tolerance", relativeSpecies: "Vitis rupestris", commonName: "Sand Grape", naturalMechanism: "Enhanced ABA biosynthesis in roots and superior hydraulic conductance", validationStatus: "confirmed", potentialForIntrogression: "Widely used as drought-tolerant rootstock. V. rupestris × V. berlandieri hybrids are standard in viticulture." },
  // Cold
  { genomeId: "arabidopsis", traitId: "cold-tolerance", relativeSpecies: "Arabidopsis lyrata subsp. petraea", commonName: "Northern Rock-cress", naturalMechanism: "Expanded CBF gene family (6 copies vs 3 in A. thaliana) with divergent cold-responsive promoters", validationStatus: "confirmed", potentialForIntrogression: "Crossable with A. thaliana for genetic studies. CBF copy number variation drives natural freezing tolerance." },
  { genomeId: "vitis", traitId: "cold-tolerance", relativeSpecies: "Vitis amurensis", commonName: "Amur Grape", naturalMechanism: "VaCBF genes with enhanced cold activation kinetics; earlier and stronger cold acclimation", validationStatus: "confirmed", potentialForIntrogression: "Cross-compatible. Used in breeding cold-hardy wine grape varieties (e.g., 'Zuoshan' series)." },
  // Salt
  { genomeId: "arabidopsis", traitId: "salt-tolerance", relativeSpecies: "Thellungiella halophila", commonName: "Salt Cress", naturalMechanism: "Constitutive SOS1 expression 3-5x higher than A. thaliana; enhanced HKT1 in roots", validationStatus: "confirmed", potentialForIntrogression: "Key model for understanding halophyte adaptations. SOS1 promoter from Thellungiella drives stronger Na+ exclusion." },
  // Disease
  { genomeId: "vitis", traitId: "disease-resistance", relativeSpecies: "Muscadinia rotundifolia", commonName: "Muscadine Grape", naturalMechanism: "Run1/Rpv1 resistance gene locus conferring immunity to powdery and downy mildew", validationStatus: "confirmed", potentialForIntrogression: "Run1 locus has been introgressed into V. vinifera backgrounds. Provides near-complete mildew resistance." },
  { genomeId: "capsicum", traitId: "disease-resistance", relativeSpecies: "Capsicum baccatum", commonName: "Aji Pepper", naturalMechanism: "Multiple R-genes for Phytophthora resistance; enhanced SA/JA crosstalk", validationStatus: "confirmed", potentialForIntrogression: "Interspecific hybrids possible with C. annuum using embryo rescue. Source of Phytophthora resistance in breeding." },
  // Nutrition
  { genomeId: "capsicum", traitId: "enhanced-nutrition", relativeSpecies: "Capsicum chinense", commonName: "Habanero Pepper", naturalMechanism: "Extremely high capsaicinoid content (>1M SHU) through amplified CS/pAMT expression; also higher carotenoid levels", validationStatus: "confirmed", potentialForIntrogression: "Fully cross-compatible with C. annuum. Used extensively in breeding for both pungency and nutrition." },
  // Heat
  { genomeId: "capsicum", traitId: "heat-tolerance", relativeSpecies: "Capsicum galapagoense", commonName: "Galápagos Pepper", naturalMechanism: "Evolved in equatorial volcanic soils; enhanced HSP expression and pollen thermotolerance", validationStatus: "putative", potentialForIntrogression: "Limited crossability. Embryo rescue required. Valuable source of heat-adaptive alleles." },
  // Rice wild relatives
  { genomeId: "rice", traitId: "drought-tolerance", relativeSpecies: "Oryza australiensis", commonName: "Australian Wild Rice", naturalMechanism: "Deep root system, enhanced cuticle thickness, and constitutive LEA protein expression", validationStatus: "confirmed", potentialForIntrogression: "Bridging crosses possible through O. officinalis complex. Source of drought QTLs in IRRI breeding programs." },
  { genomeId: "rice", traitId: "salt-tolerance", relativeSpecies: "Oryza coarctata", commonName: "Coastal Wild Rice", naturalMechanism: "Specialized salt glands on leaf surface; constitutive SOS1/NHX1 expression; tissue tolerance", validationStatus: "confirmed", potentialForIntrogression: "Distant relative but salt gland trait and Saltol QTL have been introgressed via embryo rescue crosses." },
  { genomeId: "rice", traitId: "flood-tolerance", relativeSpecies: "Oryza rufipogon (Sub1 donor)", commonName: "Common Wild Rice", naturalMechanism: "SUB1A gene conferring quiescence strategy: growth arrest during submergence conserves carbohydrate reserves", validationStatus: "confirmed", potentialForIntrogression: "Direct ancestor of O. sativa. SUB1A has been introgressed into mega-varieties (Swarna-Sub1, IR64-Sub1) benefiting millions of farmers." },
  // Wheat wild relatives
  { genomeId: "wheat", traitId: "disease-resistance", relativeSpecies: "Triticum dicoccoides (Wild Emmer)", commonName: "Wild Emmer Wheat", naturalMechanism: "Yr15 and Yr36 stripe rust resistance genes; broad-spectrum via novel NLR protein architecture", validationStatus: "confirmed", potentialForIntrogression: "A/B genome donor — direct introgression possible. Multiple rust resistance genes already deployed commercially." },
  { genomeId: "wheat", traitId: "drought-tolerance", relativeSpecies: "Aegilops tauschii", commonName: "Tausch's Goatgrass", naturalMechanism: "D-genome donor with superior root architecture QTLs and osmotic adjustment capacity", validationStatus: "confirmed", potentialForIntrogression: "D-genome donor of hexaploid wheat. Synthetic hexaploid wheats created by crossing tetraploid wheat × Ae. tauschii are used in pre-breeding." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PHENOTYPE PREDICTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const phenotypePredictions: PhenotypePrediction[] = [
  {
    traitId: "drought-tolerance",
    morphological: [
      "Smaller, thicker leaves with enhanced cuticular wax",
      "Deeper root system (10-20% increased root:shoot ratio)",
      "Reduced stomatal density on abaxial leaf surface",
      "Earlier flowering under stress (drought escape)",
    ],
    physiological: [
      "50-70% reduction in stomatal conductance under stress",
      "Maintained leaf water potential at -2.0 MPa (vs -1.5 MPa wilting in WT)",
      "Enhanced osmotic adjustment via proline accumulation (5-10x)",
      "Faster ABA signaling response (minutes vs hours)",
    ],
    metabolic: [
      "2-5x higher ABA levels under drought",
      "Accumulation of compatible solutes (proline, raffinose, trehalose)",
      "Upregulation of LEA and dehydrin proteins",
      "Shift from growth metabolism to protective metabolism",
    ],
    tradeoffs: [
      "5-15% yield penalty under optimal watering (constitutive growth suppression)",
      "Slower germination due to enhanced ABA sensitivity",
      "Reduced vegetative vigor in well-watered conditions",
    ],
  },
  {
    traitId: "cold-tolerance",
    morphological: [
      "Compact rosette growth habit (reduced internode elongation)",
      "Darker green leaves (enhanced chlorophyll for low-light winter conditions)",
      "Increased leaf thickness and mesophyll density",
    ],
    physiological: [
      "Survival at -8°C after cold acclimation (vs -5°C wild-type)",
      "Maintained photosystem II efficiency at 0°C",
      "Enhanced membrane lipid unsaturation (18:3/18:2 ratio increased)",
      "Faster cold acclimation: full hardening in 3 days vs 7 days",
    ],
    metabolic: [
      "5-10x accumulation of cryoprotective sugars (raffinose, sucrose)",
      "Enhanced proline synthesis (osmoprotection during freeze dehydration)",
      "COR/LEA protein accumulation preventing ice crystal damage",
    ],
    tradeoffs: [
      "Slightly reduced growth rate at optimal temperatures (25°C)",
      "Dwarf phenotype if CBF is constitutively overexpressed",
      "Delayed flowering in spring due to extended cold response",
    ],
  },
  {
    traitId: "salt-tolerance",
    morphological: [
      "Enhanced root branching in upper soil layers (salt avoidance)",
      "Thicker leaves with increased succulence (dilution effect)",
      "Enhanced Casparian strip development (apoplastic barrier)",
    ],
    physiological: [
      "Maintained K+/Na+ ratio > 1.0 in shoots at 200mM NaCl",
      "Osmotic adjustment using vacuolar Na+ as osmoticum",
      "Continued growth at 150mM NaCl (vs growth arrest in WT)",
    ],
    metabolic: [
      "3-5x higher vacuolar Na+ with normal cytoplasmic Na+",
      "Enhanced V-ATPase activity for vacuolar Na+ sequestration",
      "Increased synthesis of compatible solutes for osmotic balance",
    ],
    tradeoffs: [
      "Higher energy cost for ion transport (10-15% respiratory burden)",
      "Reduced growth rate in non-saline conditions (constitutive SOS1)",
      "K+ nutrition may be affected under severe salt stress",
    ],
  },
  {
    traitId: "heat-tolerance",
    morphological: [
      "Maintained pollen viability at 38°C (vs sterility at 35°C in WT)",
      "Enhanced leaf reflectance and epicuticular wax",
      "Earlier flower development (heat escape in grain crops)",
    ],
    physiological: [
      "Thermotolerance at 45°C for 2 hours (vs lethal in WT)",
      "Maintained Rubisco activase function at 40°C",
      "Enhanced evaporative cooling through sustained stomatal opening",
    ],
    metabolic: [
      "Constitutive HSP70/HSP90/sHSP chaperone network",
      "Reduced membrane lipid saturation for thermal stability",
      "Enhanced antioxidant enzymes (APX, SOD) against heat-induced ROS",
    ],
    tradeoffs: [
      "Reduced cold tolerance (membrane lipid trade-off with FAD7 KO)",
      "Slight constitutive growth penalty from chaperone production",
      "Altered fatty acid composition may affect seed oil quality",
    ],
  },
  {
    traitId: "uv-resistance",
    morphological: [
      "Enhanced trichome density on leaf surface (UV scattering)",
      "Thicker epidermal cell layer",
      "Increased anthocyanin pigmentation in stems and petioles",
    ],
    physiological: [
      "50-80% higher epidermal UV-B absorbance",
      "Faster DNA repair (CPD photolyase activity)",
      "Reduced UV-B-induced DNA damage by 60-70%",
    ],
    metabolic: [
      "3-5x higher flavonol (kaempferol, quercetin) accumulation",
      "Enhanced sinapate ester production in epidermis",
      "Upregulated phenylpropanoid pathway flux",
    ],
    tradeoffs: [
      "Higher carbon cost for flavonoid synthesis (1-3% of fixed carbon)",
      "Possible allelopathic effects from exuded flavonoids",
      "Altered flower color may affect pollinator attraction",
    ],
  },
  {
    traitId: "nutrient-efficiency",
    morphological: [
      "Enhanced lateral root branching (increased root surface area)",
      "Longer root hairs for expanded soil exploration zone",
      "Slightly increased root:shoot biomass ratio",
    ],
    physiological: [
      "40% improved nitrogen uptake at low soil N (<1mM)",
      "Enhanced nitrate assimilation rate in roots",
      "Maintained growth with 40% less fertilizer input",
    ],
    metabolic: [
      "Higher NUE: more biomass per unit N absorbed",
      "Enhanced amino acid pool in leaves and seeds",
      "Upregulated high-affinity nitrate transport system",
    ],
    tradeoffs: [
      "May accumulate excess nitrate under high-N conditions",
      "Root architecture changes could alter anchorage",
      "Energy cost of constitutive high-affinity transport",
    ],
  },
  {
    traitId: "disease-resistance",
    morphological: [
      "No major morphological changes (primed, not constitutively activated)",
      "Slightly thicker cell walls from enhanced lignification",
      "Faster callose deposition at infection sites",
    ],
    physiological: [
      "60-80% reduced disease severity against broad-spectrum pathogens",
      "Faster hypersensitive response (HR) at infection sites",
      "Enhanced systemic acquired resistance (SAR) throughout plant",
    ],
    metabolic: [
      "Primed SA signaling pathway (faster but not constitutive)",
      "Enhanced phytoalexin production upon pathogen detection",
      "Upregulated PR protein expression after infection",
    ],
    tradeoffs: [
      "Possible growth-defense trade-off (5-10% yield cost)",
      "SA/JA antagonism may reduce herbivore defense",
      "Constitutive NPR1 OE can cause spontaneous lesions in some backgrounds",
    ],
  },
  {
    traitId: "enhanced-nutrition",
    morphological: [
      "Golden/orange coloration of edible tissues (β-carotene)",
      "No negative impact on plant architecture",
      "Possible changes in fruit/seed color (consumer preference factor)",
    ],
    physiological: [
      "5-20x increase in provitamin A (β-carotene) content",
      "Enhanced antioxidant capacity of edible tissues",
      "Maintained yield and agronomic performance",
    ],
    metabolic: [
      "Redirected GGPP flux toward carotenoid pathway",
      "Reduced flux through competing gibberellin pathway (minor)",
      "Enhanced xanthophyll cycle capacity (photoprotection co-benefit)",
    ],
    tradeoffs: [
      "Altered color may reduce consumer acceptance in some markets",
      "Slight reduction in gibberellin levels (potential dwarfing)",
      "β-carotene is light-sensitive — post-harvest losses must be managed",
    ],
  },
  {
    traitId: "yield-boost",
    morphological: [
      "15-30% larger leaf area due to enhanced carbon fixation",
      "Increased stem diameter and biomass",
      "More tillers/branches in some species",
    ],
    physiological: [
      "15-30% increased net photosynthetic rate",
      "Reduced photorespiratory carbon loss",
      "Enhanced RuBP regeneration capacity",
    ],
    metabolic: [
      "Higher flux through Calvin cycle",
      "75% recovery of photorespiratory carbon (with bypass)",
      "Increased sucrose export from source leaves",
    ],
    tradeoffs: [
      "Increased water demand (more biomass = more transpiration)",
      "May require additional nitrogen to support enhanced growth",
      "Photorespiration bypass may alter C/N balance in some tissues",
    ],
  },
  {
    traitId: "flood-tolerance",
    morphological: [
      "Enhanced aerenchyma in root cortex (gas channels)",
      "Adventitious root formation from submerged stem nodes",
      "Possible constitutive aerenchyma (may weaken root structure)",
    ],
    physiological: [
      "Survival of complete submergence for 7 days (vs 3 days WT)",
      "Maintained ATP production via fermentation during anoxia",
      "Faster recovery of aerobic metabolism after de-submergence",
    ],
    metabolic: [
      "Pre-activated ADH1/PDC1 fermentation enzymes",
      "Enhanced ethanolic fermentation capacity",
      "Maintained carbohydrate reserves during submergence",
    ],
    tradeoffs: [
      "Possible growth penalty from constitutive anaerobic gene expression",
      "LSD1 KO may cause spontaneous cell death under some stress combinations",
      "Ethanol production during flooding may attract pathogens",
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PATHWAY IMPACT ANALYSIS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const pathwayImpacts: PathwayImpact[] = [
  // Drought pathway impacts
  { geneId: "at-dreb2a", pathway: "Drought/ABA-independent signaling", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["Proline", "Raffinose", "LEA proteins", "Dehydrins"], description: "Activates ABA-independent DRE/CRT regulon. 3x increase in protective metabolite accumulation." },
  { geneId: "at-era1", pathway: "ABA signaling cascade", fluxChange: "increased", magnitude: 2.5, affectedMetabolites: ["ABA", "PA (phaseic acid)", "Proline"], description: "Removes negative regulation of ABA signaling. 2.5x enhanced sensitivity to endogenous ABA levels." },
  { geneId: "at-nced3", pathway: "Carotenoid → ABA biosynthesis", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["ABA", "Xanthoxin", "9'-cis-neoxanthin"], description: "Rate-limiting step in ABA biosynthesis. 3x faster ABA accumulation from carotenoid precursors during drought." },
  // Cold pathway impacts
  { geneId: "at-cbf1", pathway: "CBF/COR cold acclimation", fluxChange: "increased", magnitude: 5.0, affectedMetabolites: ["Proline", "Raffinose", "Sucrose", "COR proteins"], description: "Master regulator activating entire COR regulon. 5x increase in cryoprotectant accumulation." },
  { geneId: "at-ice1", pathway: "CBF transcriptional activation", fluxChange: "increased", magnitude: 2.0, affectedMetabolites: ["CBF1/2/3 transcripts"], description: "Stabilized ICE1 sustains CBF promoter activation. 2x longer CBF expression window during cold." },
  // Salt pathway impacts
  { geneId: "at-sos1", pathway: "SOS signaling / Na+ exclusion", fluxChange: "increased", magnitude: 4.0, affectedMetabolites: ["Cytoplasmic Na+", "Apoplastic Na+"], description: "4x enhanced Na+ efflux rate at plasma membrane. Major reduction in cytoplasmic Na+ toxicity." },
  { geneId: "at-nhx1", pathway: "Vacuolar ion homeostasis", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["Vacuolar Na+", "Vacuolar K+", "Malate"], description: "3x enhanced vacuolar Na+ sequestration. Vacuolar Na+ serves dual role as osmoticum." },
  // UV pathway impacts
  { geneId: "at-uvr8", pathway: "UV-B photomorphogenesis", fluxChange: "increased", magnitude: 2.5, affectedMetabolites: ["Flavonols", "Sinapate esters", "Anthocyanins"], description: "Enhanced UV-B perception drives 2.5x higher UV-screening compound production." },
  { geneId: "at-chs-uv", pathway: "Flavonoid biosynthesis", fluxChange: "increased", magnitude: 4.0, affectedMetabolites: ["Naringenin chalcone", "Kaempferol", "Quercetin"], description: "First committed step in flavonoid pathway. 4x faster UV-screening flavonoid deployment." },
  // Heat pathway impacts
  { geneId: "at-hsfa1", pathway: "Heat shock response", fluxChange: "increased", magnitude: 5.0, affectedMetabolites: ["HSP70", "HSP90", "HSP101", "sHSPs"], description: "Master HSR regulator activates entire chaperone network. 5x higher HSP accumulation under heat." },
  { geneId: "at-fad7-ko", pathway: "Chloroplast lipid desaturation", fluxChange: "decreased", magnitude: 0.3, affectedMetabolites: ["18:3 (trienoic acids)", "18:2 (dienoic acids)"], description: "70% reduction in chloroplast trienoic fatty acids. Increased membrane thermal stability but reduced fluidity." },
  // Nutrition pathway impacts
  { geneId: "at-psy-bio", pathway: "Carotenoid biosynthesis (MEP → GGPP → carotenoids)", fluxChange: "increased", magnitude: 10.0, affectedMetabolites: ["Phytoene", "Lycopene", "β-carotene", "Lutein"], description: "Massive increase in carotenoid pathway flux. 10-20x β-carotene accumulation (Golden Rice approach)." },
  { geneId: "at-lcyb-bio", pathway: "Lycopene cyclization", fluxChange: "redirected", magnitude: 5.0, affectedMetabolites: ["β-carotene (increased)", "Lycopene (decreased)"], description: "Redirects lycopene toward β-carotene. Prevents lycopene bottleneck when PSY is overexpressed." },
  // Yield pathway impacts
  { geneId: "at-sedp", pathway: "Calvin cycle (regeneration phase)", fluxChange: "increased", magnitude: 1.3, affectedMetabolites: ["RuBP", "Sedoheptulose-7P", "Sucrose"], description: "30% increase in RuBP regeneration rate. Rubisco operates closer to Vmax." },
  { geneId: "at-plgg1-ko", pathway: "Photorespiration → Calvin cycle bypass", fluxChange: "redirected", magnitude: 1.4, affectedMetabolites: ["Glycolate (decreased)", "CO₂ (released in chloroplast)", "3-PGA"], description: "Photorespiratory carbon recycled within chloroplast. 75% of normally-lost carbon recovered." },
  // Nutrient efficiency
  { geneId: "at-nrt1", pathway: "Nitrate uptake / transport", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["NO₃⁻ (cytoplasmic)", "Glutamine", "Glutamate"], description: "3x enhanced nitrate scavenging at low soil concentrations due to constitutive high-affinity mode." },
  { geneId: "at-nlp7", pathway: "Nitrate assimilation / signaling", fluxChange: "increased", magnitude: 2.0, affectedMetabolites: ["NIA (nitrate reductase)", "NIR (nitrite reductase)", "Amino acids"], description: "Coordinated upregulation of entire nitrogen assimilation pathway. 2x faster nitrate-to-amino acid conversion." },
  // Defense
  { geneId: "at-npr1", pathway: "Salicylic acid / SAR signaling", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["SA", "PR proteins", "Callose", "Phytoalexins"], description: "Primed SA signaling for rapid defense activation. 3x faster PR gene induction upon pathogen detection." },
  { geneId: "vv-sts-up", pathway: "Stilbenoid biosynthesis", fluxChange: "increased", magnitude: 5.0, affectedMetabolites: ["Resveratrol", "Viniferin", "Pterostilbene"], description: "5x faster resveratrol production at infection sites. Potent antifungal phytoalexin barrier." },
  // Flood
  { geneId: "at-erfvii", pathway: "Hypoxia response / anaerobic metabolism", fluxChange: "increased", magnitude: 3.0, affectedMetabolites: ["ADH1", "PDC1", "Ethanol", "Lactate"], description: "Pre-activated fermentation enzymes maintain ATP production during submergence." },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  LITERATURE REFERENCES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const literatureRefs: LiteratureRef[] = [
  { geneId: "at-dreb2a", authors: "Sakuma Y, Maruyama K, et al.", year: 2006, title: "Functional analysis of an Arabidopsis transcription factor, DREB2A, involved in drought-responsive gene expression", journal: "Plant Cell", doi: "10.1105/tpc.105.035881", finding: "Deletion of NRD creates constitutively active DREB2A-CA that confers drought tolerance without stress signal" },
  { geneId: "at-era1", authors: "Wang Y, Ying J, et al.", year: 2005, title: "Molecular tailoring of farnesylation for plant drought tolerance and yield protection", journal: "Plant J", doi: "10.1111/j.1365-313X.2005.02568.x", finding: "ERA1 antisense plants show 50% reduction in water loss and improved drought survival without major yield penalty" },
  { geneId: "at-cbf1", authors: "Jaglo-Ottosen KR, et al.", year: 1998, title: "Arabidopsis CBF1 overexpression induces COR genes and enhances freezing tolerance", journal: "Science", doi: "10.1126/science.280.5360.104", finding: "First demonstration that single transcription factor overexpression can dramatically improve freezing tolerance" },
  { geneId: "at-sos1", authors: "Shi H, Lee B, et al.", year: 2003, title: "Overexpression of a plasma membrane Na+/H+ antiporter gene improves salt tolerance in Arabidopsis thaliana", journal: "Nature Biotechnology", doi: "10.1038/nbt766", finding: "SOS1 overexpression improves salt tolerance and reduces Na+ accumulation in shoots" },
  { geneId: "at-nhx1", authors: "Apse MP, Aharon GS, et al.", year: 1999, title: "Salt tolerance conferred by overexpression of a vacuolar Na+/H+ antiport in Arabidopsis", journal: "Science", doi: "10.1126/science.285.5431.1256", finding: "Landmark paper: vacuolar NHX1 overexpression enables growth at 200mM NaCl" },
  { geneId: "at-psy-bio", authors: "Ye X, Al-Babili S, et al.", year: 2000, title: "Engineering the provitamin A (β-carotene) biosynthetic pathway into (carotenoid-free) rice endosperm", journal: "Science", doi: "10.1126/science.287.5451.303", finding: "Golden Rice proof-of-concept: PSY + LCYB/CrtI expression produces β-carotene in rice endosperm" },
  { geneId: "at-sedp", authors: "Lefebvre S, Lawson T, et al.", year: 2005, title: "Increased sedoheptulose-1,7-bisphosphatase activity in transgenic tobacco plants stimulates photosynthesis and growth", journal: "Plant Cell", doi: "10.1105/tpc.104.027797", finding: "SBPase overexpression increases photosynthetic CO₂ fixation by 30% and biomass by 30%" },
  { geneId: "at-plgg1-ko", authors: "South PF, Cavanagh AP, et al.", year: 2019, title: "Synthetic glycolate metabolism pathways stimulate crop growth and productivity in the field", journal: "Science", doi: "10.1126/science.aat9077", finding: "Photorespiration bypass increases tobacco biomass by >40% in replicated field trials — a breakthrough for C3 crop improvement" },
  { geneId: "at-npr1", authors: "Cao H, Li X, Dong X", year: 1998, title: "Generation of broad-spectrum disease resistance by overexpression of an essential regulatory gene in systemic acquired resistance", journal: "PNAS", doi: "10.1073/pnas.95.11.6531", finding: "NPR1 overexpression confers broad-spectrum resistance without constitutive defense gene activation" },
  { geneId: "at-hsfa1", authors: "Mishra SK, Tripp J, et al.", year: 2002, title: "In the complex family of heat stress transcription factors, HsfA1 has a unique role as master regulator of thermotolerance in tomato", journal: "Genes & Development", doi: "10.1101/gad.228802", finding: "HSFA1 identified as master regulator of the heat shock response — essential for acquired thermotolerance" },
  { geneId: "vv-sts-up", authors: "Dubrovina AS, Kiselev KV", year: 2017, title: "Regulation of stilbene biosynthesis in plants", journal: "Planta", doi: "10.1007/s00425-017-2730-8", finding: "Comprehensive review of STS gene family regulation in grapevine — pathogen-inducible expression of STS cluster confers strong Botrytis resistance" },
  { geneId: "at-nrt1", authors: "Ho CH, Lin SH, et al.", year: 2009, title: "CHL1 functions as a nitrate sensor in primary nitrate responses", journal: "Cell", doi: "10.1016/j.cell.2009.07.004", finding: "NRT1.1/CHL1 is a transceptor (transporter + receptor). T101 phosphorylation switches between high and low affinity modes" },
  { geneId: "at-ice1", authors: "Chinnusamy V, Ohta M, et al.", year: 2003, title: "ICE1: a regulator of cold-induced transcriptome and freezing tolerance in Arabidopsis", journal: "Genes & Development", doi: "10.1101/gad.1077503", finding: "ICE1 is essential upstream activator of CBF regulon. Dominant mutation enhances freezing tolerance by 3°C" },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ANALYSIS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function generateFullAnalysis(plan: EditPlan): FullAnalysis {
  const editGeneIds = new Set(plan.edits.map((e) => e.gene.geneId));
  const editTraitIds = new Set(plan.edits.map((e) => e.trait.id));

  // Epistatic interactions between edits in this plan
  const relevantInteractions = interactions.filter(
    (i) => editGeneIds.has(i.geneA) && editGeneIds.has(i.geneB)
  );

  // Expression profiles for edited genes
  const relevantExpression = expressionProfiles.filter((e) =>
    editGeneIds.has(e.geneId)
  );

  // Delivery strategy for this plant
  const delivery =
    deliveryStrategies.find((d) => d.genomeId === plan.plantId) ?? null;

  // Regulatory classifications for edit types used
  const editTypesUsed = new Set(plan.edits.map((e) => e.gene.editType));
  const relevantRegulatory = regulatoryClassifications.filter((r) =>
    editTypesUsed.has(r.editType)
  );

  // Stacking plan
  const stackingPlan = generateStackingPlan(plan);

  // Wild relative validations
  const relevantWild = wildRelatives.filter(
    (w) => w.genomeId === plan.plantId && editTraitIds.has(w.traitId)
  );

  // Phenotype predictions for traits in this plan
  const relevantPhenotypes = phenotypePredictions.filter((p) =>
    editTraitIds.has(p.traitId)
  );

  // Pathway impacts for edited genes
  const relevantPathways = pathwayImpacts.filter((p) =>
    editGeneIds.has(p.geneId)
  );

  // Literature references
  const relevantLiterature = literatureRefs.filter((r) =>
    editGeneIds.has(r.geneId)
  );

  // Overall risk score
  const highRiskCount = plan.edits.filter(
    (e) => e.gene.offTargetRisk === "high"
  ).length;
  const experimentalCount = plan.edits.filter(
    (e) => e.gene.confidence === "experimental"
  ).length;
  const antagonisms = relevantInteractions.filter(
    (i) => i.type === "antagonistic"
  ).length;
  const foreignDNACount = plan.edits.filter((e) => {
    const reg = regulatoryClassifications.find(
      (r) => r.editType === e.gene.editType
    );
    return reg?.foreignDNA;
  }).length;

  const overallRiskScore = Math.min(
    10,
    Math.max(
      1,
      Math.round(
        2 +
          highRiskCount * 2 +
          experimentalCount * 1.5 +
          antagonisms * 1.5 +
          foreignDNACount * 0.5
      )
    )
  );

  // Biosafety concerns
  const biosafetyConcerns: string[] = [];
  if (foreignDNACount > 0)
    biosafetyConcerns.push(
      `${foreignDNACount} edit(s) involve foreign DNA integration, requiring full GMO regulatory assessment in most jurisdictions.`
    );
  if (highRiskCount > 0)
    biosafetyConcerns.push(
      `${highRiskCount} edit(s) have high off-target risk — extensive whole-genome sequencing of T0 plants recommended to identify unintended mutations.`
    );
  if (antagonisms > 0)
    biosafetyConcerns.push(
      `${antagonisms} antagonistic interaction(s) detected between edits — phenotypic outcome may differ from individual edit predictions.`
    );
  if (experimentalCount > 0)
    biosafetyConcerns.push(
      `${experimentalCount} edit(s) at experimental confidence level — limited peer-reviewed validation. Additional controlled environment testing recommended before field trials.`
    );
  if (plan.totalEdits > 5)
    biosafetyConcerns.push(
      `Complex multi-gene edit (${plan.totalEdits} targets) — epistatic interactions may produce emergent phenotypes not predicted by individual gene studies. Recommend incremental stacking with phenotyping at each step.`
    );

  return {
    interactions: relevantInteractions,
    expressionProfiles: relevantExpression,
    deliveryStrategy: delivery,
    regulatoryClassifications: relevantRegulatory,
    stackingPlan,
    wildRelatives: relevantWild,
    phenotypePredictions: relevantPhenotypes,
    pathwayImpacts: relevantPathways,
    overallRiskScore,
    biosafetyConcerns,
    literatureRefs: relevantLiterature,
  };
}

// ── Stacking Plan Generator ──────────────────────────────

function generateStackingPlan(plan: EditPlan): StackingPlan | null {
  if (plan.edits.length === 0) return null;

  // Group edits by trait for logical stacking
  const traitGroups = new Map<string, PlannedEdit[]>();
  for (const edit of plan.edits) {
    const key = edit.trait.id;
    if (!traitGroups.has(key)) traitGroups.set(key, []);
    traitGroups.get(key)!.push(edit);
  }

  const steps: StackingStep[] = [];
  let gen = 1;

  // SDN-1 and SDN-2 edits can be multiplexed (co-delivered)
  const multiplexable = plan.edits.filter(
    (e) =>
      e.gene.editType === "knockout" || e.gene.editType === "point-mutation"
  );
  const nonMultiplexable = plan.edits.filter(
    (e) =>
      e.gene.editType !== "knockout" && e.gene.editType !== "point-mutation"
  );

  if (multiplexable.length > 0) {
    steps.push({
      generation: gen,
      geneIds: multiplexable.map((e) => e.gene.geneId),
      geneNames: multiplexable.map((e) => e.gene.geneName),
      rationale: `Multiplex CRISPR delivery: ${multiplexable.length} knockout/point-mutation edits can be delivered simultaneously using a single Cas9 construct with multiple guide RNAs. This is the most efficient approach as SDN-1/SDN-2 edits share the same molecular machinery.`,
      method: "co-transformation",
      expectedDuration: "4-6 months to homozygous T2",
    });
    gen++;
  }

  // Group remaining edits by trait, max 2 per generation
  const remaining = [...nonMultiplexable];
  while (remaining.length > 0) {
    const batch = remaining.splice(0, 2);
    steps.push({
      generation: gen,
      geneIds: batch.map((e) => e.gene.geneId),
      geneNames: batch.map((e) => e.gene.geneName),
      rationale:
        batch.length === 1
          ? `Sequential transformation: ${batch[0].gene.geneName} (${batch[0].gene.editType}) requires separate construct delivery due to construct complexity.`
          : `Co-transformation: ${batch.map((e) => e.gene.geneName).join(" + ")} can be delivered on the same T-DNA or via co-cultivation with two Agrobacterium strains.`,
      method: batch.length === 1 ? "sequential" : "co-transformation",
      expectedDuration:
        batch[0].gene.editType === "insertion"
          ? "8-12 months (includes transgene characterization)"
          : "4-8 months to homozygous progeny",
    });
    gen++;
  }

  // Final crossing step if multiple generations
  if (steps.length > 1) {
    steps.push({
      generation: gen,
      geneIds: [],
      geneNames: ["All traits"],
      rationale:
        "Cross independent transgenic lines to stack all edits into a single background. Screen F2 progeny by PCR/sequencing for all target alleles. Select homozygous multi-edit plants.",
      method: "crossing",
      expectedDuration: "6-12 months (crossing + F2 segregation + screening)",
    });
  }

  const totalGen = steps.length;

  return {
    totalGenerations: totalGen,
    steps,
    strategy:
      multiplexable.length > 0
        ? "Multiplex-first strategy: deliver all knockout/point-mutation edits simultaneously via multiplex CRISPR, then sequentially add overexpression/insertion cassettes, and finally cross to combine all modifications."
        : "Sequential stacking with final cross to combine all modifications into a single elite line.",
    notes:
      plan.totalEdits <= 3
        ? "Relatively simple edit plan. Consider delivering all edits in a single transformation event if the species supports it."
        : "Complex multi-gene engineering. Recommend maintaining individual edited lines in parallel and combining by crossing to enable quality control at each step.",
  };
}
