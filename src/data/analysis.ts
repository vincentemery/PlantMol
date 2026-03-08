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
  // Coffee interactions
  {
    geneA: "co-cadreb",
    geneB: "co-cahsp70",
    type: "synergistic",
    strength: 0.7,
    description: "Drought and heat co-occur in coffee plantations during dry season. DREB-mediated water conservation complements HSP70-mediated protein protection.",
    mechanismDetail: "Coffee experiences combined heat+drought during the dry season. DREB maintains water balance while HSP70 prevents heat denaturation of photosynthetic enzymes. Together they address the dual stress that causes 'die-back' in plantations.",
  },
  {
    geneA: "co-canpr1",
    geneB: "co-cahsp70",
    type: "conditional",
    strength: 0.2,
    description: "HSP70 may stabilize defense proteins during heat stress, maintaining pathogen resistance at elevated temperatures.",
    mechanismDetail: "Coffee leaf rust severity increases at higher temperatures partly because defense proteins denature. HSP70 chaperone activity could maintain NPR1 and downstream PR proteins at elevated temperatures.",
  },
  // Soybean interactions
  {
    geneA: "gm-gmdreb1",
    geneB: "gm-gmnhx1",
    type: "synergistic",
    strength: 0.6,
    description: "Drought and salt often co-occur in irrigated soybean production. Combined tolerance addresses both stresses.",
    mechanismDetail: "In irrigated agriculture, drought leads to increased soil salinity as water evaporates. DREB1 handles dehydration stress while NHX1 handles Na+ toxicity — addressing both aspects of osmotic stress.",
  },
  {
    geneA: "gm-gmnhx1",
    geneB: "gm-gmnark",
    type: "conditional",
    strength: 0.35,
    description: "Enhanced salt tolerance (NHX1) protects nodule function, potentially allowing the enhanced nodulation (NARK modification) to function under saline conditions.",
    mechanismDetail: "Rhizobial nodules are extremely salt-sensitive. NHX1-mediated salt tolerance in root cells may protect the enhanced nodule population from salt damage, allowing the NARK benefit to persist under stress.",
  },
  // Potato interactions
  {
    geneA: "st-str1",
    geneB: "st-stpsy1",
    type: "neutral",
    strength: 0.05,
    description: "Late blight resistance and β-carotene biofortification operate in independent pathways with no known interaction.",
    mechanismDetail: "Rpi-blb1 is an NLR immune receptor; PSY1 is a carotenoid enzyme. They occupy different cellular compartments and metabolic networks.",
  },
  // ── New crop interactions ──
  {
    geneA: "sb-dreb2",
    geneB: "sb-staygreen",
    type: "synergistic",
    strength: 0.88,
    description: "DREB2-mediated drought response synergizes with stay-green delay of senescence, providing both acute stress protection and prolonged photosynthetic capacity under terminal drought.",
    mechanismDetail: "SbDREB2 activates drought-responsive genes for immediate protection while stay-green (SbSGR mutation) blocks chlorophyll degradation. Combined effect: maintained photosynthesis + enhanced osmoprotection during grain fill period.",
  },
  {
    geneA: "bn-fad2",
    geneB: "bn-fae1",
    type: "synergistic",
    strength: 0.92,
    description: "Double knockout of FAD2 (blocks oleic→linoleic conversion) and FAE1 (blocks oleic→erucic acid elongation) channels maximum flux toward oleic acid — the ideal canola oil profile.",
    mechanismDetail: "FAD2 desaturates 18:1 to 18:2; FAE1 elongates 18:1 to 22:1. Knocking out both removes the two major routes for oleic acid consumption, resulting in >85% oleic acid content — optimal for cooking stability and nutrition.",
  },
  {
    geneA: "hv-cbf14",
    geneB: "hv-ice1",
    type: "synergistic",
    strength: 0.82,
    description: "ICE1 is the upstream activator of the CBF cascade. Overexpressing both amplifies the cold acclimation response beyond what either achieves alone.",
    mechanismDetail: "HvICE1 binds the MYC-recognition element in the HvCBF14 promoter, activating transcription. CBF14 then induces COR/LEA/dehydrin genes. Co-overexpression saturates both the activator and effector levels of the pathway.",
  },
  {
    geneA: "ma-rga2",
    geneB: "ma-nhx1",
    type: "neutral",
    strength: 0.1,
    description: "RGA2 disease resistance and NHX1 salt tolerance operate through independent signaling pathways. No known antagonism or synergy.",
    mechanismDetail: "RGA2 is an NBS-LRR immune receptor recognizing Fusarium effectors. NHX1 is a vacuolar Na+/H+ antiporter. Independent pathways allow stacking without interference.",
  },
  {
    geneA: "cq-sos1",
    geneB: "cq-dreb",
    type: "synergistic",
    strength: 0.75,
    description: "Salt and drought tolerance combine synergistically in quinoa — many saline environments are also water-limited (e.g., Altiplano, coastal drylands).",
    mechanismDetail: "CqSOS1 provides Na+ exclusion at the plasma membrane. CqDREB activates drought-responsive genes including osmolyte production. Osmolytes also aid osmotic component of salt stress, creating positive interaction.",
  },
  {
    geneA: "tc-npr1",
    geneB: "tc-hsp",
    type: "conditional",
    strength: 0.35,
    description: "NPR1-mediated disease resistance is temperature-sensitive. High temperatures (>30°C) suppress SA signaling, making HSP co-expression critical for maintaining defense under heat stress.",
    mechanismDetail: "NPR1 condensates dissociate at high temperature, reducing SA signaling. HSP70/HSP90 chaperones stabilize NPR1 oligomers and NLR receptor complexes, partially rescuing defense at elevated temperature.",
  },
  {
    geneA: "eg-fatb",
    geneB: "eg-shell",
    type: "synergistic",
    strength: 0.78,
    description: "FATB knockout (reducing palmitic acid) + SHELL heterozygote (tenera fruit form) = higher yield of healthier palm oil.",
    mechanismDetail: "EgSHELL controls endocarp thickness — tenera (Sh/sh) has thin shell and more mesocarp (oil-bearing tissue). EgFATB knockout shifts fatty acid profile toward unsaturated oils. Combined: more oil per fruit with better nutritional profile.",
  },
  {
    geneA: "pg-dreb2",
    geneB: "pg-hsf",
    type: "synergistic",
    strength: 0.90,
    description: "Drought and heat stress frequently co-occur in pearl millet's native Sahel environment. DREB2 and HSF pathways have evolved to work together in this species.",
    mechanismDetail: "PgDREB2 activates drought+heat dual-responsive genes unique to pearl millet. PgHSF stabilizes proteins under combined stress. Pearl millet's natural combined drought+heat tolerance is likely due to this evolved synergy — engineering both recapitulates the full protective response.",
  },
  {
    geneA: "ls-dmr6",
    geneB: "ls-myb12",
    type: "neutral",
    strength: 0.08,
    description: "DMR6 knockout (disease resistance) and MYB12 overexpression (flavonoid/UV protection) operate independently.",
    mechanismDetail: "DMR6 is a 2-oxoglutarate oxygenase that catalyzes SA hydroxylation — its loss increases SA levels. MYB12 activates flavonol synthase for UV protection. Minor positive interaction: elevated SA from DMR6-KO can modestly induce phenylpropanoid pathway where MYB12 operates.",
  },
  {
    geneA: "ah-fad2",
    geneB: "ah-rrs5",
    type: "neutral",
    strength: 0.05,
    description: "High oleic acid (FAD2 knockout) and disease resistance (RRS5) are independent traits in peanut. No metabolic or regulatory crosstalk.",
    mechanismDetail: "AhFAD2 is an ER-localized fatty acid desaturase. AhRRS5 is a plasma membrane NBS-LRR receptor. Completely independent pathways — ideal for trait stacking.",
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
  // Coffee genes
  { geneId: "co-cadreb", tissues: { root: 0.4, stem: 0.3, leaf: 0.8, flower: 0.3, fruit: 0.5, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Drought-inducible in leaves and developing cherry. Coffee cherries require 6-8 months to develop, making sustained drought tolerance critical." },
  { geneId: "co-casos1", tissues: { root: 0.9, stem: 0.4, leaf: 0.2, flower: 0.1, fruit: 0.1, seed: 0.05 }, dominantTissue: "root", expressionNotes: "Root-dominant for Na+ exclusion. Coffee roots are shallow and salt-sensitive." },
  { geneId: "co-canpr1", tissues: { root: 0.2, stem: 0.4, leaf: 0.85, flower: 0.3, fruit: 0.4, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Leaf-dominant. Critical for defense against Hemileia vastatrix (coffee leaf rust) which infects via stomata on abaxial leaf surface." },
  { geneId: "co-cahsp70", tissues: { root: 0.3, stem: 0.4, leaf: 0.7, flower: 0.8, fruit: 0.6, seed: 0.3 }, dominantTissue: "flower", expressionNotes: "High in flowers and developing fruit. Flower abortion during heat stress is a major yield constraint." },
  { geneId: "co-cacbf", tissues: { root: 0.2, stem: 0.3, leaf: 0.8, flower: 0.2, fruit: 0.3, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Cold-inducible in leaves. Critical for surviving frost events in highland production." },
  // Soybean genes
  { geneId: "gm-gmdreb1", tissues: { root: 0.5, stem: 0.3, leaf: 0.85, flower: 0.4, fruit: 0.3, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Drought-inducible in leaves and roots. Critical during R1-R6 reproductive stages." },
  { geneId: "gm-gmnhx1", tissues: { root: 0.6, stem: 0.4, leaf: 0.7, flower: 0.3, fruit: 0.2, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Vacuolar transporter in all tissues. Protects nodule function under salt stress." },
  { geneId: "gm-gmnpr1", tissues: { root: 0.3, stem: 0.5, leaf: 0.8, flower: 0.3, fruit: 0.4, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "SA-responsive in leaves. Important for foliar pathogen defense." },
  { geneId: "gm-gmhsp90", tissues: { root: 0.4, stem: 0.5, leaf: 0.6, flower: 0.85, fruit: 0.5, seed: 0.3 }, dominantTissue: "flower", expressionNotes: "Highest in flowers during heat stress. Protects pollen development at high temperatures." },
  { geneId: "gm-gmnark", tissues: { root: 0.3, stem: 0.1, leaf: 0.7, flower: 0.1, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Leaf-derived CLE peptide signal perceived by root NARK receptor. Systemic shoot-to-root regulation of nodule number." },
  // Potato genes
  { geneId: "st-stdreb2", tissues: { root: 0.4, stem: 0.3, leaf: 0.8, flower: 0.2, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Drought-inducible in leaves. Potato's shallow root system makes it the most drought-susceptible major crop." },
  { geneId: "st-stnhx1", tissues: { root: 0.5, stem: 0.4, leaf: 0.6, flower: 0.2, fruit: 0.3, seed: 0.2 }, dominantTissue: "leaf", expressionNotes: "Vacuolar Na+ sequestration in all tissues including developing tubers." },
  { geneId: "st-str1", tissues: { root: 0.2, stem: 0.3, leaf: 0.9, flower: 0.2, fruit: 0.3, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Constitutive NLR expression in leaves — primary site of P. infestans infection." },
  { geneId: "st-stpsy1", tissues: { root: 0.05, stem: 0.1, leaf: 0.3, flower: 0.2, fruit: 0.8, seed: 0.1 }, dominantTissue: "tuber/fruit", expressionNotes: "Tuber-specific expression for β-carotene accumulation in potato flesh. Engineering target for orange-fleshed potato." },
  { geneId: "st-stcbf", tissues: { root: 0.2, stem: 0.3, leaf: 0.85, flower: 0.1, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Rapidly cold-induced in leaves. Critical for highland Andean potato production." },
  // Cassava genes
  { geneId: "me-medreb2", tissues: { root: 0.5, stem: 0.4, leaf: 0.75, flower: 0.2, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Drought-responsive in leaves. Cassava is naturally drought-tolerant — this enhances existing mechanisms." },
  { geneId: "me-mecmd2", tissues: { root: 0.1, stem: 0.3, leaf: 0.9, flower: 0.2, fruit: 0.1, seed: 0.1 }, dominantTissue: "leaf", expressionNotes: "Leaf-dominant. CMD resistance is essential for protecting the primary photosynthetic tissue from viral infection." },
  { geneId: "me-mepsy", tissues: { root: 0.8, stem: 0.1, leaf: 0.1, flower: 0.1, fruit: 0.05, seed: 0.05 }, dominantTissue: "storage root", expressionNotes: "Storage root-specific for carotenoid accumulation. Engineering target for vitamin A biofortification in cassava." },
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
  {
    genomeId: "coffee",
    species: "Coffea arabica",
    primaryMethod: "Agrobacterium + somatic embryogenesis",
    alternativeMethod: "Biolistic bombardment of embryogenic calli",
    explantType: "Leaf explant-derived embryogenic callus",
    transformationEfficiency: "1-5% of embryogenic calli (genotype-dependent)",
    timeToT0: "14-20 months (callus → embryo → plantlet → acclimatization)",
    genotypeDependence: "high",
    notes: "Coffee transformation is slow due to long regeneration cycle. Somatic embryogenesis from leaf explants is the standard route. C. canephora (robusta) transforms more easily than C. arabica. CRISPR has been demonstrated in coffee protoplasts.",
    difficulty: "difficult",
  },
  {
    genomeId: "soybean",
    species: "Glycine max",
    primaryMethod: "Agrobacterium + cotyledonary node explants",
    alternativeMethod: "Biolistic bombardment of immature embryos",
    explantType: "Cotyledonary node from 5-day seedlings",
    transformationEfficiency: "3-10% (improved with sonication-assisted Agrobacterium)",
    timeToT0: "4-6 months",
    genotypeDependence: "medium",
    notes: "Most commercial soybean transformation uses cotyledonary node method. Williams 82 and Jack are model cultivars. Biolistic method used for stacking multiple transgenes. CRISPR well established in soybean.",
    difficulty: "moderate",
  },
  {
    genomeId: "potato",
    species: "Solanum tuberosum",
    primaryMethod: "Agrobacterium + stem internode explants",
    alternativeMethod: "Protoplast PEG transformation (for DNA-free editing)",
    explantType: "Stem internode segments from in vitro plants",
    transformationEfficiency: "10-50% (excellent — among the easiest crops)",
    timeToT0: "3-5 months",
    genotypeDependence: "low",
    notes: "Potato transforms very efficiently. Desiree and Ranger Russet are model varieties. The main challenge is autotetraploidy — all 4 alleles must be edited for complete knockout. CRISPR extremely well-demonstrated in potato.",
    difficulty: "easy",
  },
  {
    genomeId: "cassava",
    species: "Manihot esculenta",
    primaryMethod: "Agrobacterium + friable embryogenic callus (FEC)",
    alternativeMethod: "Organized embryogenic structures (OES)",
    explantType: "Friable embryogenic callus from immature leaf lobes",
    transformationEfficiency: "5-15% of FEC lines",
    timeToT0: "6-10 months",
    genotypeDependence: "high",
    notes: "Cassava transformation via FEC is well established at DDPSC/ETH. TME204 and 60444 are amenable varieties. African farmer-preferred varieties (TME3, TME7) are more difficult. CRISPR has been demonstrated for reducing cyanide content.",
    difficulty: "moderate",
  },
  // ── New Crops ──
  {
    genomeId: "barley",
    species: "Hordeum vulgare",
    primaryMethod: "Agrobacterium tumefaciens to immature embryos",
    alternativeMethod: "Biolistic bombardment of immature embryos",
    explantType: "Immature zygotic embryos (12-16 DAP)",
    transformationEfficiency: "5-25% depending on genotype",
    timeToT0: "4-6 months",
    genotypeDependence: "medium",
    notes: "Golden Promise is the standard transformable variety. Spring barley types generally easier than winter types. Efficiency has improved dramatically with optimized Agrobacterium protocols. CRISPR validated for MLA, HvCKX, and other targets.",
    difficulty: "moderate",
  },
  {
    genomeId: "sorghum",
    species: "Sorghum bicolor",
    primaryMethod: "Agrobacterium to immature embryos (with BBM/WUS2)",
    alternativeMethod: "Biolistic bombardment of immature embryos",
    explantType: "Immature zygotic embryos (12-15 DAP)",
    transformationEfficiency: "1-5% (standard); 10-30% (with BBM/WUS2)",
    timeToT0: "5-8 months",
    genotypeDependence: "high",
    notes: "Notoriously recalcitrant. Tx430 is the only routinely transformable line. BBM/WUS2 morphogenic regulators (Lowe et al. 2016) broke the transformation barrier, enabling editing of previously untransformable genotypes. Still challenging for farmer-preferred African varieties.",
    difficulty: "very-difficult",
  },
  {
    genomeId: "cotton",
    species: "Gossypium hirsutum",
    primaryMethod: "Agrobacterium to hypocotyl/cotyledon explants",
    alternativeMethod: "Biolistic bombardment of embryogenic callus",
    explantType: "Hypocotyl segments or cotyledon pieces from seedlings",
    transformationEfficiency: "3-10% of explants",
    timeToT0: "8-14 months (long somatic embryogenesis phase)",
    genotypeDependence: "high",
    notes: "Extremely genotype-dependent. Coker 312 and its derivatives are the standard transformable genotypes. Regeneration via somatic embryogenesis takes 8-14 months. Backcrossing into elite varieties adds 2-3 years. CRISPR has been demonstrated for GhCLA1, GhPDS, and fiber quality genes.",
    difficulty: "moderate",
  },
  {
    genomeId: "sugarcane",
    species: "Saccharum officinarum",
    primaryMethod: "Biolistic bombardment of embryogenic callus",
    alternativeMethod: "Agrobacterium to embryogenic callus",
    explantType: "Embryogenic callus from young leaf rolls or immature inflorescence",
    transformationEfficiency: "1-5% of callus lines",
    timeToT0: "6-12 months",
    genotypeDependence: "high",
    notes: "Complex polyploidy (8-12x) is the primary challenge — each gene has 8-12+ copies. Biolistics is preferred due to large construct sizes needed for multiplexed editing. Mosaic editing is common; clonal propagation stabilizes chimeric plants. NCo310 and Q117 are standard varieties.",
    difficulty: "difficult",
  },
  {
    genomeId: "banana",
    species: "Musa acuminata",
    primaryMethod: "Agrobacterium to embryogenic cell suspensions (ECS)",
    alternativeMethod: "Biolistic bombardment of ECS",
    explantType: "Embryogenic cell suspensions from male flower buds",
    transformationEfficiency: "3-10% of ECS colonies",
    timeToT0: "8-14 months",
    genotypeDependence: "medium",
    notes: "Triploid sterility means all edits must be achieved in one transformation event — no genetic crosses possible. ECS establishment takes 3-6 months. Grand Naine (Cavendish subgroup) is the standard variety. CRISPR validated for MaRGA2 (TR4 resistance) and fruit quality genes.",
    difficulty: "difficult",
  },
  {
    genomeId: "canola",
    species: "Brassica napus",
    primaryMethod: "Agrobacterium to hypocotyl segments",
    alternativeMethod: "Protoplast PEG transformation",
    explantType: "Hypocotyl segments from 5-7 day old seedlings",
    transformationEfficiency: "10-30% of explants",
    timeToT0: "3-5 months",
    genotypeDependence: "low",
    notes: "One of the easiest crops to transform. Close relative of Arabidopsis — protocols well-established. Westar, DH12075, and most spring types transform readily. Both homeolog pairs (A/C subgenomes) must be edited for complete knockouts. CRISPR well-validated for FAD2, FAE1, and other oil quality targets.",
    difficulty: "easy",
  },
  {
    genomeId: "peanut",
    species: "Arachis hypogaea",
    primaryMethod: "Agrobacterium to de-embryonated cotyledons",
    alternativeMethod: "Biolistic bombardment of embryogenic callus",
    explantType: "De-embryonated cotyledon segments",
    transformationEfficiency: "1-5% of explants",
    timeToT0: "6-10 months",
    genotypeDependence: "high",
    notes: "Recalcitrant crop. Runner-type varieties (e.g., New Mexico Valencia A) are somewhat amenable. Allotetraploid — both A and B homeologs of FAD2 must be knocked out for high-oleic trait. CRISPR validated for AhFAD2 high-oleic editing.",
    difficulty: "difficult",
  },
  {
    genomeId: "chickpea",
    species: "Cicer arietinum",
    primaryMethod: "Agrobacterium to half-embryo/shoot meristem",
    alternativeMethod: "In planta Agrobacterium (cut-dip-budding)",
    explantType: "Half-embryo axes or cotyledonary nodes",
    transformationEfficiency: "0.5-3% of explants",
    timeToT0: "6-12 months",
    genotypeDependence: "high",
    notes: "One of the most recalcitrant grain legumes. Regeneration is the bottleneck — callus rarely produces shoots. Recent GRF-GIF chimera and cut-dip-budding methods show promise. C. arietinum ICC 4958 and ICCV 89314 are somewhat amenable. Very limited CRISPR publications.",
    difficulty: "very-difficult",
  },
  {
    genomeId: "pearl-millet",
    species: "Pennisetum glaucum",
    primaryMethod: "Biolistic bombardment of immature embryos",
    alternativeMethod: "Agrobacterium (limited protocols)",
    explantType: "Immature zygotic embryos (10-12 DAP)",
    transformationEfficiency: "0.5-3% of embryos",
    timeToT0: "6-10 months",
    genotypeDependence: "high",
    notes: "Very limited transformation capacity. ICTP 8203 and 843B lines show some amenability. Recent work using BBM/WUS2-related approaches shows promise. Critical orphan crop for sub-Saharan Africa — CRISPR editing would be transformative but delivery remains the major bottleneck.",
    difficulty: "very-difficult",
  },
  {
    genomeId: "quinoa",
    species: "Chenopodium quinoa",
    primaryMethod: "Agrobacterium to hypocotyl explants",
    alternativeMethod: "Protoplast transformation",
    explantType: "Hypocotyl segments from young seedlings",
    transformationEfficiency: "2-8% of explants",
    timeToT0: "4-8 months",
    genotypeDependence: "medium",
    notes: "Limited but improving transformation protocols. Allotetraploid — both subgenome copies of TSARL1 must be knocked out for saponin-free quinoa. Real Red variety shows reasonable amenability. CRISPR demonstrated for saponin reduction (CqTSARL1).",
    difficulty: "difficult",
  },
  {
    genomeId: "sweet-potato",
    species: "Ipomoea batatas",
    primaryMethod: "Agrobacterium to leaf disc/petiole explants",
    alternativeMethod: "Biolistic bombardment of embryogenic callus",
    explantType: "Leaf discs or petiole segments from in vitro plants",
    transformationEfficiency: "5-15% of explants",
    timeToT0: "4-8 months",
    genotypeDependence: "medium",
    notes: "Hexaploid complexity is the challenge — 6 copies of each gene. IbOr overexpression for orange-fleshed varieties is well-established. Beauregard and Jewel are standard transformable varieties. PLT5 morphogenic regulator shows promise for improving regeneration.",
    difficulty: "moderate",
  },
  {
    genomeId: "cacao",
    species: "Theobroma cacao",
    primaryMethod: "Agrobacterium to somatic embryos",
    alternativeMethod: "Agrobacterium to leaf pieces (transient)",
    explantType: "Secondary somatic embryos from floral staminodes",
    transformationEfficiency: "2-8% of somatic embryo clusters",
    timeToT0: "12-24 months (somatic embryogenesis is slow)",
    genotypeDependence: "high",
    notes: "Long regeneration cycle is the primary constraint. Somatic embryogenesis from staminodes or immature flower petals. Scavina 6 is resistant to frosty pod but difficult to transform. CRISPR validated for TcNPR3 in transient leaf assays. Stable transformation for disease resistance is the holy grail.",
    difficulty: "difficult",
  },
  {
    genomeId: "tea",
    species: "Camellia sinensis",
    primaryMethod: "Agrobacterium to leaf explants/cotyledons",
    alternativeMethod: "Biolistic bombardment of callus",
    explantType: "Young leaf pieces or cotyledon segments from seeds",
    transformationEfficiency: "0.5-2% of explants",
    timeToT0: "12-18 months (woody perennial regeneration)",
    genotypeDependence: "high",
    notes: "Extremely challenging woody perennial. Very few published stable transformation reports. Most CRISPR studies use transient expression or hairy root systems. Regeneration from callus is slow and genotype-dependent. Long juvenile period (3-5 years to first harvest).",
    difficulty: "very-difficult",
  },
  {
    genomeId: "oil-palm",
    species: "Elaeis guineensis",
    primaryMethod: "Biolistic bombardment of embryogenic callus",
    alternativeMethod: "Agrobacterium to embryogenic callus",
    explantType: "Embryogenic callus from immature embryos or young leaves",
    transformationEfficiency: "1-5% of callus lines",
    timeToT0: "18-36 months (very slow regeneration)",
    genotypeDependence: "high",
    notes: "Extremely long regeneration cycle (18-36 months callus → plantlet). 4-5 years from plantlet to first fruit. Somaclonal variation (mantled fruit) is a risk with prolonged tissue culture. SHELL gene editing would be transformative for oil yield but the timeline makes this a decade-long project.",
    difficulty: "very-difficult",
  },
  {
    genomeId: "lettuce",
    species: "Lactuca sativa",
    primaryMethod: "Agrobacterium to cotyledon/leaf explants",
    alternativeMethod: "Protoplast PEG transformation",
    explantType: "Cotyledon segments from 5-day-old seedlings",
    transformationEfficiency: "15-40% of explants",
    timeToT0: "2-4 months",
    genotypeDependence: "low",
    notes: "One of the easiest crops to transform — model for Asteraceae. Rapid regeneration via organogenesis. Most varieties transform well. DMR6 knockout for downy mildew resistance was one of the first CRISPR crops to receive US regulatory exemption (non-regulated status letter from USDA, 2015).",
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
  // Coffee wild relatives
  { genomeId: "coffee", traitId: "disease-resistance", relativeSpecies: "Coffea canephora (Robusta)", commonName: "Robusta Coffee", naturalMechanism: "Multiple resistance genes against Hemileia vastatrix (coffee leaf rust) from the CcSH gene cluster. Robusta has co-evolved with the rust pathogen in its center of origin (Central Africa).", validationStatus: "confirmed", potentialForIntrogression: "Arabica × Robusta hybrids (Timor Hybrid, Catimor, Sarchimor) are widely cultivated. SH genes already introgressed into commercial arabica varieties." },
  { genomeId: "coffee", traitId: "heat-tolerance", relativeSpecies: "Coffea stenophylla", commonName: "Stenophylla Coffee", naturalMechanism: "Tolerates mean annual temperatures 6°C higher than arabica. Recently rediscovered species from West Africa with flavor comparable to arabica.", validationStatus: "confirmed", potentialForIntrogression: "Not directly crossable with C. arabica. Genomic analysis reveals heat-tolerance QTLs that could inform CRISPR targets." },
  // Potato wild relatives
  { genomeId: "potato", traitId: "disease-resistance", relativeSpecies: "Solanum bulbocastanum", commonName: "Mexican Wild Potato", naturalMechanism: "Rpi-blb1 and Rpi-blb2 broad-spectrum late blight resistance genes. Co-evolved with P. infestans in its Mexican center of origin.", validationStatus: "confirmed", potentialForIntrogression: "Not directly crossable — requires somatic hybridization or transgenic approach. Rpi-blb1 stacked with Rpi-blb2/Rpi-vnt1 in Wageningen cisgenic potatoes." },
  { genomeId: "potato", traitId: "cold-tolerance", relativeSpecies: "Solanum acaule", commonName: "Bitter Potato", naturalMechanism: "Survives -8°C through constitutive expression of cold-regulated genes and high glycoalkaloid content in tubers.", validationStatus: "confirmed", potentialForIntrogression: "Crossable with cultivated potato via bridging species. Source of frost tolerance in Andean breeding programs." },
  // Cassava wild relatives
  { genomeId: "cassava", traitId: "disease-resistance", relativeSpecies: "Manihot glaziovii", commonName: "Ceará Rubber Tree", naturalMechanism: "Resistance to cassava mosaic disease and cassava brown streak disease. Vigorous growth habit with rapid canopy closure.", validationStatus: "confirmed", potentialForIntrogression: "Crossable with M. esculenta. Backcross breeding at IITA/CIAT has introgressed CMD resistance. M. glaziovii genome sequences available." },
  // Soybean wild relatives
  { genomeId: "soybean", traitId: "drought-tolerance", relativeSpecies: "Glycine soja (Wild Soybean)", commonName: "Wild Soybean", naturalMechanism: "Extensive root system, higher proline accumulation, and enhanced antioxidant enzyme activity under drought.", validationStatus: "confirmed", potentialForIntrogression: "Fully cross-compatible with G. max. USDA soybean germplasm collection includes >20,000 G. soja accessions with drought tolerance QTLs." },
  // ── New crop wild relatives ──
  { genomeId: "barley", traitId: "drought-tolerance", relativeSpecies: "Hordeum spontaneum", commonName: "Wild Barley", naturalMechanism: "Drought escape via early flowering and deep root system. Enhanced dehydrin expression under osmotic stress.", validationStatus: "confirmed", potentialForIntrogression: "Fully cross-compatible with cultivated barley. Fertile Crescent populations carry extensive drought adaptation alleles." },
  { genomeId: "barley", traitId: "salt-tolerance", relativeSpecies: "Hordeum marinum", commonName: "Sea Barley", naturalMechanism: "Extreme halophyte tolerating >400 mM NaCl. Enhanced tissue tolerance and Na+ exclusion from shoots.", validationStatus: "confirmed", potentialForIntrogression: "Not directly crossable but HKT gene orthologs identified. Informs CRISPR target design for salt tolerance." },
  { genomeId: "sorghum", traitId: "drought-tolerance", relativeSpecies: "Sorghum propinquum", commonName: "Wild Sorghum", naturalMechanism: "Stay-green trait with deep root system. Maintains photosynthesis during terminal drought.", validationStatus: "confirmed", potentialForIntrogression: "Cross-compatible. Stay-green QTLs (Stg1-Stg4) mapped in S. bicolor × S. propinquum populations." },
  { genomeId: "cotton", traitId: "disease-resistance", relativeSpecies: "Gossypium arboreum", commonName: "Tree Cotton (A-genome diploid)", naturalMechanism: "Natural resistance to cotton leaf curl virus and jassid pest. Produces gossypol-rich trichomes.", validationStatus: "confirmed", potentialForIntrogression: "A-genome donor. Synthetic allotetraploids (G. arboreum × G. raimondii) used to recreate cotton for trait introgression." },
  { genomeId: "banana", traitId: "disease-resistance", relativeSpecies: "Musa balbisiana (B genome)", commonName: "Wild Banana", naturalMechanism: "Resistance to Fusarium oxysporum f.sp. cubense TR4 (Panama disease) and black Sigatoka. Robust cold tolerance.", validationStatus: "confirmed", potentialForIntrogression: "B genome contributes disease resistance in AB and ABB cooking banana varieties. Source of RGA2 resistance gene." },
  { genomeId: "peanut", traitId: "disease-resistance", relativeSpecies: "Arachis duranensis / A. ipaensis", commonName: "Wild Peanut Progenitors", naturalMechanism: "Resistance to late leaf spot, rust, and nematodes. Multiple NBS-LRR gene clusters.", validationStatus: "confirmed", potentialForIntrogression: "Diploid progenitors of cultivated peanut. Synthetic allotetraploids created for pre-breeding. Resistance genes mapped and validated." },
  { genomeId: "chickpea", traitId: "drought-tolerance", relativeSpecies: "Cicer reticulatum", commonName: "Wild Chickpea", naturalMechanism: "Deeper, more branched root system. Enhanced osmotic adjustment. Faster drought-escape flowering.", validationStatus: "confirmed", potentialForIntrogression: "Only fully cross-compatible wild relative of chickpea. Drought tolerance QTLs transferred in ICRISAT breeding programs." },
  { genomeId: "quinoa", traitId: "salt-tolerance", relativeSpecies: "Chenopodium hircinum", commonName: "Wild Goosefoot", naturalMechanism: "Extreme halophyte with salt bladder cells on leaf surface. Accumulates Na+ in epidermal bladder cells, protecting mesophyll.", validationStatus: "confirmed", potentialForIntrogression: "Cross-compatible with quinoa. Source of superior salt tolerance alleles including SOS1 and NHX variants." },
  { genomeId: "sweet-potato", traitId: "enhanced-nutrition", relativeSpecies: "Ipomoea trifida", commonName: "Wild Sweet Potato", naturalMechanism: "Diploid progenitor with storage root formation genes (KNOX, BEL). Key to understanding Or gene regulation for beta-carotene.", validationStatus: "confirmed", potentialForIntrogression: "Closest diploid relative. Complete genome available. Used as model for understanding sweet potato biology." },
  { genomeId: "cacao", traitId: "disease-resistance", relativeSpecies: "Theobroma grandiflorum", commonName: "Cupuacu", naturalMechanism: "Tolerance to frosty pod rot (Moniliophthora roreri) and witches' broom (M. perniciosa). Different pod morphology limits pathogen entry.", validationStatus: "putative", potentialForIntrogression: "Same genus but distant. Genomic comparison identifies candidate resistance genes orthologous to NBS-LRR clusters." },
  { genomeId: "tea", traitId: "cold-tolerance", relativeSpecies: "Camellia taliensis", commonName: "Wild Tea", naturalMechanism: "Cold-hardy species from high elevations in Yunnan. Enhanced CBF expression and antifreeze protein production.", validationStatus: "ortholog-identified", potentialForIntrogression: "Not readily crossable. Genomic comparisons identify cold-responsive alleles for CRISPR-based domestication." },
  { genomeId: "oil-palm", traitId: "disease-resistance", relativeSpecies: "Elaeis oleifera", commonName: "American Oil Palm", naturalMechanism: "Resistance to Ganoderma basal stem rot and bud rot disease. Higher unsaturated fatty acid content.", validationStatus: "confirmed", potentialForIntrogression: "E. guineensis × E. oleifera hybrids (OxG) commercially cultivated in Central America. Combines disease resistance with altered oil profile." },
  { genomeId: "lettuce", traitId: "disease-resistance", relativeSpecies: "Lactuca serriola", commonName: "Prickly Lettuce", naturalMechanism: "Dm (downy mildew) resistance genes. Major gene cluster on chromosome 1 with >20 R-gene paralogs.", validationStatus: "confirmed", potentialForIntrogression: "Direct progenitor of cultivated lettuce — fully cross-compatible. Most Dm resistance genes in modern lettuce originate from L. serriola." },
  { genomeId: "canola", traitId: "disease-resistance", relativeSpecies: "Brassica rapa / B. oleracea", commonName: "Turnip / Wild Cabbage", naturalMechanism: "Diploid progenitors carrying Rlm/LepR blackleg resistance genes and clubroot resistance (CRa/CRb).", validationStatus: "confirmed", potentialForIntrogression: "Direct progenitors of B. napus. Resynthesized canola (B. rapa × B. oleracea) used to introgress novel R-genes from diploid germplasm." },
  { genomeId: "pearl-millet", traitId: "heat-tolerance", relativeSpecies: "Pennisetum violaceum", commonName: "Wild Pearl Millet", naturalMechanism: "Extreme heat tolerance — photosynthesis maintained above 45°C. Enhanced HSP/HSF network and membrane thermostability.", validationStatus: "putative", potentialForIntrogression: "Cross-compatible. Wild populations from the Sahara carry heat and drought tolerance QTLs. Used in ICRISAT pre-breeding." },
  { genomeId: "sugarcane", traitId: "yield-boost", relativeSpecies: "Saccharum spontaneum", commonName: "Wild Sugarcane", naturalMechanism: "Vigorous growth, tillering capacity, and abiotic stress tolerance. Lower sugar content but massive biomass production.", validationStatus: "confirmed", potentialForIntrogression: "Used in all modern sugarcane breeding (nobilization). S. spontaneum contributes 15-25% of genome in commercial hybrids. Source of stress tolerance and vigor." },
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
  // Coffee references
  { geneId: "co-cadreb", authors: "Alves GSC, Torres LF, et al.", year: 2017, title: "Differential fine-tuning of gene expression regulation in coffee leaves by CcDREB1D promoter haplotypes under water deficit", journal: "Journal of Experimental Botany", doi: "10.1093/jxb/erx166", finding: "Natural promoter haplotype variation in CcDREB1D controls drought response strength in coffee — a key target for precision editing" },
  { geneId: "co-canpr1", authors: "Diniz I, Talhinhas P, et al.", year: 2012, title: "Characterization of the defense response of Coffea spp. to Hemileia vastatrix", journal: "European Journal of Plant Pathology", doi: "10.1007/s10658-012-0038-x", finding: "Coffee defense response to leaf rust involves rapid SA accumulation and NPR1-dependent PR gene activation within 24h of infection" },
  { geneId: "co-cahsp70", authors: "DaMatta FM, Ramalho JC", year: 2006, title: "Impacts of drought and temperature stress on coffee physiology and production", journal: "Brazilian Journal of Plant Physiology", doi: "10.1590/S1677-04202006000100006", finding: "Comprehensive review: arabica coffee optimal at 18-22°C, quality declines above 23°C, photosynthesis impaired above 34°C — heat tolerance is the #1 climate adaptation priority for coffee" },
  // Rice references
  { geneId: "os-sub1a", authors: "Xu K, Xu X, Fukao T, et al.", year: 2006, title: "Sub1A is an ethylene-response-factor-like gene that confers submergence tolerance to rice", journal: "Nature", doi: "10.1038/nature04920", finding: "SUB1A cloning — landmark paper showing how a single ERF-VII transcription factor confers 14-day submergence tolerance" },
  { geneId: "os-osnac9", authors: "Redillas MCFR, Jeong JS, et al.", year: 2012, title: "The overexpression of OsNAC9 alters the root architecture of rice plants enhancing drought resistance", journal: "BMC Plant Biology", doi: "10.1186/1471-2229-12-108", finding: "Root-specific OsNAC9 overexpression increases root depth by 20% without yield penalty — field-validated drought tolerance" },
  { geneId: "os-oshkt1-5", authors: "Ren ZH, Gao JP, et al.", year: 2005, title: "A rice quantitative trait locus for salt tolerance encodes a sodium transporter", journal: "Nature Genetics", doi: "10.1038/ng1643", finding: "OsHKT1;5 identified as the Saltol QTL gene — now introgressed into mega-varieties feeding millions in salt-affected rice lands" },
  { geneId: "os-ospsy1", authors: "Paine JA, Shipton CA, et al.", year: 2005, title: "Improving the nutritional value of Golden Rice through increased pro-vitamin A content", journal: "Nature Biotechnology", doi: "10.1038/nbt1082", finding: "Golden Rice 2 achieves 37 μg/g β-carotene in polished rice endosperm — 23x higher than GR1. Now approved for commercial cultivation in Philippines." },
  // Potato references
  { geneId: "st-str1", authors: "Haverkort AJ, Boonekamp PM, et al.", year: 2016, title: "Durable late blight resistance in potato through dynamic varieties obtained by cisgenesis", journal: "Plant Biotechnology Journal", doi: "10.1111/pbi.12574", finding: "Stacking 3 cisgenic R-genes (Rpi-blb1, Rpi-blb2, Rpi-vnt1) provides durable late blight resistance in 5-year field trials without fungicide application" },
  // Cassava references
  { geneId: "me-mecmd2", authors: "Rabbi IY, Hamblin MT, et al.", year: 2014, title: "Genetic mapping using a dense SNP-based linkage map reveals CMD2 as complex locus affecting resistance to cassava mosaic disease", journal: "G3: Genes Genomes Genetics", doi: "10.1534/g3.114.010373", finding: "CMD2 mapped as a dominant monogenic resistance locus — key target for CRISPR-mediated introgression into susceptible farmer-preferred varieties" },
  // Soybean references
  { geneId: "gm-gmnark", authors: "Searle IR, Men AE, et al.", year: 2003, title: "Long-distance signaling in nodulation directed by a CLAVATA1-like receptor kinase", journal: "Science", doi: "10.1126/science.1077937", finding: "GmNARK identified as the autoregulation of nodulation receptor — controlling nodule number through a long-distance shoot-root signaling pathway" },
  // Maize references
  { geneId: "zm-zmnac111", authors: "Mao H, Wang H, et al.", year: 2015, title: "A transposable element in a NAC gene is associated with drought tolerance in maize seedlings", journal: "Nature Communications", doi: "10.1038/ncomms9326", finding: "MITE insertion in ZmNAC111 promoter silences expression in drought-sensitive maize — natural variation validates this as a CRISPR target" },
  // Wheat references
  { geneId: "tw-tagw2-ko", authors: "Zhang Y, Li D, et al.", year: 2018, title: "Analysis of the functions of TaGW2 homoeologs in wheat grain weight and protein content traits", journal: "Plant Journal", doi: "10.1111/tpj.13903", finding: "Simultaneous knockout of all three TaGW2 homeologs in hexaploid wheat increases grain weight by 16% — demonstrates power of multiplex CRISPR in polyploid crops" },
  // ── New crop references ──
  { geneId: "sb-staygreen", authors: "Borrell AK, Mullet JE, et al.", year: 2014, title: "Drought adaptation of stay-green sorghum is associated with canopy development, leaf anatomy, root growth, and water uptake", journal: "Journal of Experimental Botany", doi: "10.1093/jxb/eru232", finding: "Stay-green sorghum maintains green leaf area 30 days longer than senescent types under terminal drought — maps to Stg1-Stg4 QTLs" },
  { geneId: "sb-dreb2", authors: "Lowe K, Wu E, et al.", year: 2016, title: "Morphogenic regulators Baby boom and Wuschel improve monocot transformation", journal: "Plant Cell", doi: "10.1105/tpc.16.00124", finding: "BBM/WUS2 expression enables transformation of previously recalcitrant sorghum, maize inbreds, and sugarcane — 10-50x efficiency increase" },
  { geneId: "ma-rga2", authors: "Dale J, James A, et al.", year: 2017, title: "Transgenic Cavendish bananas with resistance to Fusarium wilt tropical race 4", journal: "Nature Communications", doi: "10.1038/s41467-017-01670-6", finding: "RGA2 from wild banana M. acuminata malaccensis confers resistance to TR4 in field trials — 67% of transgenic lines showed no disease after 3 years" },
  { geneId: "ah-fad2", authors: "Chu Y, Holbrook CC, Ozias-Akins P", year: 2009, title: "Two alleles of ahFAD2B control the high oleic acid trait in cultivated peanut", journal: "Crop Science", doi: "10.2135/cropsci2008.11.0590", finding: "Both ahFAD2A and ahFAD2B must be knocked out for high oleic trait — natural mutant alleles validate CRISPR target" },
  { geneId: "cq-sos1", authors: "Jarvis DE, Ho YS, et al.", year: 2017, title: "The genome of Chenopodium quinoa", journal: "Nature", doi: "10.1038/nature21370", finding: "Quinoa genome reveals expansion of ion transporter gene families and TSARL1 controlling bitter saponin — key targets for CRISPR improvement" },
  { geneId: "ib-or", authors: "Wang S, Nie S, Zhu F", year: 2019, title: "Chemical constituents and health effects of sweet potato", journal: "Food Research International", doi: "10.1016/j.foodres.2018.10.024", finding: "Orange-fleshed sweet potato (Or gene overexpression) provides up to 300% RDA of vitamin A per serving — most successful biofortification crop" },
  { geneId: "hv-mla", authors: "Wei F, Wing RA, et al.", year: 2002, title: "The Mla (powdery mildew) resistance cluster is associated with three NBS-LRR gene families and suppressed recombination within a 240-kb DNA interval on chromosome 5H", journal: "Genetics", doi: "10.1093/genetics/160.4.1551", finding: "MLA locus contains multiple allelic resistance specificities — single amino acid changes in LRR domain determine pathogen race recognition" },
  { geneId: "eg-shell", authors: "Singh R, Ong-Abdullah M, et al.", year: 2013, title: "Oil palm genome sequence reveals divergence of interfertile species in Old and New worlds", journal: "Nature", doi: "10.1038/nature12309", finding: "SHELL gene identified — tenera palms (Sh/sh heterozygotes) yield 30% more oil than dura (Sh/Sh). SHELL is a MADS-box gene controlling fruit form." },
  { geneId: "ls-dmr6", authors: "Zhang Y, Bai Y, et al.", year: 2020, title: "Editing of the downy mildew resistance gene DMR6 in lettuce enhances resistance to multiple fungal pathogens", journal: "Plant Biotechnology Journal", doi: "10.1111/pbi.13500", finding: "CRISPR knockout of LsDMR6 confers broad-spectrum disease resistance — one of first gene-edited crops to receive USDA non-regulated status" },
  { geneId: "gh-myb109", authors: "Li F, Fan G, et al.", year: 2015, title: "Genome sequence of cultivated Upland cotton (Gossypium hirsutum TM-1) provides insights into genome evolution", journal: "Nature Biotechnology", doi: "10.1038/nbt.3208", finding: "Cotton genome reveals At/Dt subgenome asymmetry in fiber development gene expression — MYB109 is predominantly expressed from the At subgenome" },
  { geneId: "tc-npr1", authors: "Motamayor JC, Mockaitis K, et al.", year: 2013, title: "The genome sequence of the most widely cultivated cacao type and its use to identify candidate genes regulating pod color", journal: "Genome Biology", doi: "10.1186/gb-2013-14-6-r53", finding: "Cacao genome reveals expanded NBS-LRR disease resistance gene family — TcNPR1 identified as key SAR pathway regulator" },
  { geneId: "pg-dreb2", authors: "Varshney RK, Shi C, et al.", year: 2017, title: "Pearl millet genome sequence provides a resource to improve agronomic traits in arid environments", journal: "Nature Biotechnology", doi: "10.1038/nbt.3943", finding: "Pearl millet genome reveals heat/drought tolerance gene clusters — foundation for CRISPR-based improvement of this critical Sahel crop" },
  { geneId: "ca2-dreb1", authors: "Varshney RK, Song C, et al.", year: 2013, title: "Draft genome sequence of chickpea (Cicer arietinum) provides a resource for trait improvement", journal: "Nature Biotechnology", doi: "10.1038/nbt.2491", finding: "Chickpea genome identifies drought tolerance QTLs and disease resistance gene clusters — enables marker-assisted and CRISPR-based breeding" },
  { geneId: "cs-fls", authors: "Xia E, Zhang H, et al.", year: 2017, title: "The tea tree genome provides insights into tea flavor and independent evolution of caffeine biosynthesis", journal: "Molecular Plant", doi: "10.1016/j.molp.2017.04.002", finding: "Tea genome reveals independent evolution of caffeine biosynthesis from coffee. Catechin biosynthesis genes (FLS, LAR, ANR) massively expanded — basis for tea flavor chemistry" },
  { geneId: "bn-fad2", authors: "Chalhoub B, Denoeud F, et al.", year: 2014, title: "Early allopolyploid evolution in the post-Neolithic Brassica napus oilseed genome", journal: "Science", doi: "10.1126/science.1253435", finding: "Canola genome reveals recent polyploidy with minimal gene loss — A/C homeologs remain >95% similar in coding regions, enabling single-guide dual-homeolog editing" },
  { geneId: "sc-sps", authors: "Garsmeur O, Droc G, et al.", year: 2018, title: "A mosaic monoploid reference sequence for the highly complex genome of sugarcane", journal: "Nature Communications", doi: "10.1038/s41467-018-05051-5", finding: "First sugarcane monoploid reference genome — reveals extreme polyploidy with 8-12 copies of most genes, explaining the challenge of complete knockout editing" },
  { geneId: "ma-psy", authors: "Paul JY, Khanna H, et al.", year: 2017, title: "Golden bananas in the field: elevated fruit pro-vitamin A from the expression of a banana phytoene synthase gene", journal: "Plant Biotechnology Journal", doi: "10.1111/pbi.12650", finding: "MaPSY2 overexpression increases pro-vitamin A in banana fruit 4-6 fold in field trials — key target for biofortification in East Africa" },
  { geneId: "hv-pht1", authors: "Ramesh SA, Shin R, et al.", year: 2004, title: "Differential metal selectivity and gene expression of two zinc transporters from rice", journal: "Plant Physiology", doi: "10.1104/pp.103.026815", finding: "Zinc transporter characterization provides foundation for biofortification — overexpression increases Zn content in grains 2-3 fold" },
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
