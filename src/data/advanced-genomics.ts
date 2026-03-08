// ────────────────────────────────────────────────────────────
//  Advanced Genomics Engine
//  Ploidy-aware editing, modern tools, multiplexing,
//  morphogenic regulators, ortholog mapping
// ────────────────────────────────────────────────────────────

import type { EditType } from "./environments";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface PloidyInfo {
  genomeId: string;
  ploidyLevel: number;
  subgenomes: string[];
  homeologGroups: number;
  editingComplexity: "standard" | "complex" | "very-complex";
  notes: string;
  homeologEditingStrategy: string;
}

export type EditingTool =
  | "SpCas9"
  | "Cas12a"
  | "Base-Editor-CBE"
  | "Base-Editor-ABE"
  | "Prime-Editor"
  | "CRISPRi"
  | "CRISPRa"
  | "Cas13";

export interface EditingToolInfo {
  id: EditingTool;
  fullName: string;
  description: string;
  mechanism: string;
  advantages: string[];
  limitations: string[];
  bestFor: string[];
  pamRequirement: string;
  deliverySize: string;
  efficiency: string;
}

export interface MultiplexStrategy {
  id: string;
  name: string;
  description: string;
  maxTargets: number;
  mechanism: string;
  advantages: string[];
  limitations: string[];
  bestForPloidy: string[];
}

export interface MorphogenicRegulator {
  id: string;
  name: string;
  fullName: string;
  mechanism: string;
  cropsUnlocked: string[];
  efficiencyGain: string;
  reference: string;
  year: number;
}

export interface OrthologGroup {
  groupId: string;
  geneName: string;
  pathway: string;
  members: {
    genomeId: string;
    geneId: string;
    geneName: string;
    similarity: number;
  }[];
  conservationLevel: "highly-conserved" | "moderately-conserved" | "divergent";
  notes: string;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  PLOIDY DATABASE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ploidyData: PloidyInfo[] = [
  // ── Diploids (standard editing) ──
  {
    genomeId: "arabidopsis",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Model diploid. Single-copy targets — straightforward CRISPR design.",
    homeologEditingStrategy: "Standard single-guide approach. No homeolog considerations.",
  },
  {
    genomeId: "rice",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid with excellent transformation. Gold standard for cereal editing.",
    homeologEditingStrategy: "Standard single-guide approach. Highly efficient in rice protoplasts and callus.",
  },
  {
    genomeId: "maize",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Ancient tetraploid but functionally diploid after extensive fractionation. Some duplicated segments remain on homeologous chromosomes.",
    homeologEditingStrategy: "Treat as diploid but check for retained duplicates from ancient WGD. ~30% of genes have a syntenic paralog.",
  },
  {
    genomeId: "tomato",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid Solanaceae. Well-established Agrobacterium transformation. Tripled genome ~71 MYA but extensively fractionated.",
    homeologEditingStrategy: "Standard single-guide approach.",
  },
  {
    genomeId: "vitis",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid. Palaeo-hexaploid with well-fractionated genome. Clonally propagated — edits maintained vegetatively.",
    homeologEditingStrategy: "Standard approach. Clonal propagation means heterozygous edits are stably maintained.",
  },
  {
    genomeId: "capsicum",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid with very large genome (~3.5 Gb) due to TE expansion, not WGD.",
    homeologEditingStrategy: "Standard single-guide approach. Large genome may reduce off-target risk due to sequence diversity.",
  },
  {
    genomeId: "sorghum",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid C4 grass. Compact genome (~730 Mb). Transformation historically difficult but BBM/WUS2 breakthrough improved efficiency.",
    homeologEditingStrategy: "Standard single-guide approach. Use BBM/WUS2 morphogenic regulators to improve regeneration.",
  },
  {
    genomeId: "barley",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid Triticeae. Very large genome (~5.1 Gb) but only 2n=14. Close relative of wheat — edits can inform polyploid strategies.",
    homeologEditingStrategy: "Standard single-guide approach. Serves as diploid model for wheat homeolog studies.",
  },
  {
    genomeId: "chickpea",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid legume. Extremely recalcitrant to transformation — the bottleneck is regeneration, not editing.",
    homeologEditingStrategy: "Standard editing design, but delivery and regeneration are the major challenges. Consider GRF-GIF morphogenic regulators.",
  },
  {
    genomeId: "pearl-millet",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid. Very limited transformation protocols. Recently sequenced (2017).",
    homeologEditingStrategy: "Standard approach, but transformation remains the bottleneck. Biolistic delivery to immature embryos is primary method.",
  },
  {
    genomeId: "cacao",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid. Compact genome (~430 Mb). Long generation time (3-5 years to fruiting) makes editing high-value.",
    homeologEditingStrategy: "Standard approach. Somatic embryogenesis required — long regeneration cycle (12-18 months).",
  },
  {
    genomeId: "tea",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid. Very large genome (~3.1 Gb) with massive TE content. Woody perennial — extremely difficult transformation.",
    homeologEditingStrategy: "Standard single-guide approach. The challenge is entirely in delivery/regeneration for this woody species.",
  },
  {
    genomeId: "oil-palm",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid. 25-year lifespan with 4-5 years to first harvest. Editing is extraordinarily valuable given long generation time.",
    homeologEditingStrategy: "Standard approach. Embryogenic callus from immature embryos — 18-24 month regeneration cycle.",
  },
  {
    genomeId: "lettuce",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid Asteraceae model. Easy transformation. DMR6 knockout was among first CRISPR crops with US regulatory clearance.",
    homeologEditingStrategy: "Standard approach. High-efficiency Agrobacterium transformation makes this one of the easiest crops to edit.",
  },
  {
    genomeId: "coffee",
    ploidyLevel: 4,
    subgenomes: ["Cc", "Ce"],
    homeologGroups: 11,
    editingComplexity: "complex",
    notes: "C. arabica is allotetraploid from C. canephora (Cc) × C. eugenioides (Ce). Both homeologs must be edited for complete knockout.",
    homeologEditingStrategy: "Design guides targeting conserved regions between Cc and Ce homeologs. Use multiplexed guides if homeologs have diverged at PAM sites. Verify editing of both copies by amplicon sequencing with homeolog-specific primers.",
  },
  {
    genomeId: "soybean",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Paleopolyploid (WGD ~13 MYA) but functionally diploid. ~75% of genes have a paralog — check for functional redundancy.",
    homeologEditingStrategy: "Functionally diploid but check paralogs. For many gene families, both WGD copies must be knocked out for full effect (e.g., GmFAD2-1A and GmFAD2-1B).",
  },
  {
    genomeId: "potato",
    ploidyLevel: 4,
    subgenomes: [],
    homeologGroups: 12,
    editingComplexity: "complex",
    notes: "Autotetraploid (2n=4x=48). All 4 alleles must be knocked out for recessive loss-of-function. Highly heterozygous — SNPs between alleles complicate guide design.",
    homeologEditingStrategy: "Design guides in conserved regions across all 4 alleles. Screen regenerants by amplicon deep-sequencing to confirm tetra-allelic knockouts. Consider using high-fidelity Cas9 variants to reduce mosaicism.",
  },
  {
    genomeId: "cassava",
    ploidyLevel: 2,
    subgenomes: [],
    homeologGroups: 0,
    editingComplexity: "standard",
    notes: "Diploid but highly heterozygous. Clonally propagated — edits are maintained through vegetative propagation.",
    homeologEditingStrategy: "Standard approach. High heterozygosity means guide design must account for SNPs between alleles. Clonal propagation preserves heterozygous edits.",
  },
  // ── Polyploids (complex/very-complex editing) ──
  {
    genomeId: "nicotiana",
    ploidyLevel: 4,
    subgenomes: ["S", "T"],
    homeologGroups: 12,
    editingComplexity: "complex",
    notes: "Allotetraploid (S genome from N. sylvestris × T genome from N. tomentosiformis). Good transformation efficiency despite polyploidy.",
    homeologEditingStrategy: "Design guides in conserved regions between S and T homeologs. Many homeolog pairs have diverged sufficiently for homeolog-specific editing. Transformation is routine — the complexity is in achieving complete edits across all copies.",
  },
  {
    genomeId: "wheat",
    ploidyLevel: 6,
    subgenomes: ["A", "B", "D"],
    homeologGroups: 7,
    editingComplexity: "very-complex",
    notes: "Hexaploid (AABBDD, ~17 Gb). Each gene exists in up to 3 homeologous copies. All 3 must be edited for complete loss-of-function. The largest and most complex crop genome routinely edited.",
    homeologEditingStrategy: "Design guides targeting conserved sequences across A, B, and D homeologs — ideally a single guide hits all 3. Use polycistronic tRNA-gRNA arrays if homeologs have diverged. Screen by genome-specific PCR + sequencing. GRF-GIF chimera dramatically improves regeneration efficiency.",
  },
  {
    genomeId: "cotton",
    ploidyLevel: 4,
    subgenomes: ["At", "Dt"],
    homeologGroups: 13,
    editingComplexity: "complex",
    notes: "Allotetraploid (At from G. arboreum × Dt from G. raimondii). At and Dt homeologs have ~95% sequence identity in coding regions.",
    homeologEditingStrategy: "High sequence similarity between At/Dt enables single-guide targeting of both homeologs in most cases. Verify by subgenome-specific amplicon sequencing. Highly genotype-dependent transformation (Coker 312 standard).",
  },
  {
    genomeId: "canola",
    ploidyLevel: 4,
    subgenomes: ["A", "C"],
    homeologGroups: 19,
    editingComplexity: "complex",
    notes: "Allotetraploid (A genome from B. rapa × C genome from B. oleracea). Recent polyploidization (~7,500 years) means high homeolog similarity.",
    homeologEditingStrategy: "Very recent polyploidy means A/C homeologs are often >95% identical. Single guides frequently edit both copies. Excellent transformation efficiency enables high-throughput screening of edits.",
  },
  {
    genomeId: "peanut",
    ploidyLevel: 4,
    subgenomes: ["A", "B"],
    homeologGroups: 10,
    editingComplexity: "complex",
    notes: "Allotetraploid (A from A. duranensis × B from A. ipaensis). A and B subgenomes show ~95-97% sequence identity.",
    homeologEditingStrategy: "High A/B similarity enables single-guide dual-homeolog editing. For FAD2 editing (high oleic trait), both AhFAD2-A and AhFAD2-B must be knocked out. Screen with subgenome-diagnostic SNP markers.",
  },
  {
    genomeId: "quinoa",
    ploidyLevel: 4,
    subgenomes: ["A", "B"],
    homeologGroups: 9,
    editingComplexity: "complex",
    notes: "Allotetraploid (A + B subgenomes). Saponin biosynthesis genes (TSARL1) exist on both subgenomes — both copies must be knocked out for saponin-free grain.",
    homeologEditingStrategy: "Target conserved regions between A/B homeologs. For bitter saponin removal, edit both CqTSARL1 copies. Limited transformation protocols — Agrobacterium to hypocotyl explants is the primary method.",
  },
  {
    genomeId: "banana",
    ploidyLevel: 3,
    subgenomes: ["A1", "A2", "A3"],
    homeologGroups: 11,
    editingComplexity: "complex",
    notes: "Triploid (AAA for Cavendish) and sterile — no sexual reproduction. All 3 alleles must be edited. Cannot do genetic crosses, so all edits must be achieved in a single transformation event.",
    homeologEditingStrategy: "CRITICAL: Triploid sterility means no crosses to combine edits. ALL target alleles must be knocked out in a single transformation event using multiplexed guides. Embryogenic cell suspension is the only viable explant. Screen extensively for tri-allelic edits.",
  },
  {
    genomeId: "sugarcane",
    ploidyLevel: 12,
    subgenomes: ["So1", "So2", "So3", "So4", "So5", "So6", "So7", "So8", "Ss1", "Ss2", "Ss3", "Ss4"],
    homeologGroups: 10,
    editingComplexity: "very-complex",
    notes: "Extreme polyploid (8-12x, ~80-120 chromosomes). Hybrid of S. officinarum (2n=80) × S. spontaneum (2n=40-128). Each gene may have 8-12+ copies. The most challenging crop genome for editing.",
    homeologEditingStrategy: "Dose-dependent phenotype: partial knockouts may be sufficient (e.g., knocking out 6/10 copies may give intermediate phenotype). Use highly multiplexed CRISPR with conserved guides. Biolistic delivery to embryogenic callus. Accept mosaic/chimeric edits and propagate clonally. Full knockout of all copies is rarely achievable or necessary.",
  },
  {
    genomeId: "sweet-potato",
    ploidyLevel: 6,
    subgenomes: ["B1", "B1'", "B2", "B2'", "B3", "B3'"],
    homeologGroups: 15,
    editingComplexity: "very-complex",
    notes: "Autohexaploid (2n=6x=90). Six copies of each gene with high sequence similarity. Complex polysomic inheritance. IbOr overexpression is dose-dependent — more copies = more beta-carotene.",
    homeologEditingStrategy: "For overexpression: insert strong promoter upstream of one copy — other copies provide additive effect. For knockouts: all 6 alleles must be disrupted. Use conserved-region guides + multiplex. Agrobacterium to leaf discs with moderate efficiency.",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MODERN EDITING TOOLS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const editingTools: EditingToolInfo[] = [
  {
    id: "SpCas9",
    fullName: "Streptococcus pyogenes Cas9",
    description: "The workhorse nuclease. Creates blunt-ended DSBs 3 bp upstream of the PAM site. Repaired by NHEJ (indels) or HDR (precise edits with donor template).",
    mechanism: "RuvC and HNH nuclease domains each cut one DNA strand, creating a blunt DSB. Guide RNA (20-nt spacer + scaffold) directs targeting via Watson-Crick base pairing.",
    advantages: [
      "Most extensively validated across all plant species",
      "Largest library of validated guides available",
      "High on-target efficiency (typically 30-90%)",
      "Flexible PAM (NGG) covers most genomic targets",
      "Proven multiplexing with polycistronic arrays",
    ],
    limitations: [
      "Creates DSBs — can cause large deletions, translocations",
      "NHEJ repair is imprecise — random indels at cut site",
      "HDR efficiency is very low in plants (<5%)",
      "Off-target activity at sites with 1-3 mismatches",
      "Large protein (4.1 kb) limits some delivery methods",
    ],
    bestFor: ["knockout", "overexpression", "insertion"],
    pamRequirement: "NGG (5'-NRG also tolerated at reduced efficiency)",
    deliverySize: "4.1 kb (Cas9) + 0.4 kb (sgRNA)",
    efficiency: "30-90% indel frequency in plants",
  },
  {
    id: "Cas12a",
    fullName: "Cas12a (formerly Cpf1)",
    description: "Creates staggered DSBs with 4-5 nt overhangs, distal from PAM. Processes its own crRNA array — ideal for multiplexing in polyploid crops.",
    mechanism: "Single RuvC nuclease domain cuts both strands sequentially, generating 5' overhangs. Recognizes TTTV PAM on the 5' side of the target. Intrinsic RNase activity processes polycistronic crRNA arrays.",
    advantages: [
      "Native crRNA array processing — built-in multiplexing",
      "Staggered cuts favor HDR over NHEJ",
      "Cuts distal from PAM — seed region preserved after NHEJ, enabling re-cutting",
      "T-rich PAM accesses AT-rich promoter regions",
      "Smaller protein than Cas9 (3.9 kb for LbCas12a)",
      "Lower off-target activity than SpCas9",
    ],
    limitations: [
      "T-rich PAM (TTTV) limits targetable sites in GC-rich regions",
      "Lower editing efficiency than SpCas9 in some species",
      "Temperature-sensitive — reduced activity below 28°C",
      "Fewer validated plant-optimized variants available",
    ],
    bestFor: ["knockout", "promoter-swap"],
    pamRequirement: "TTTV (V = A, C, or G)",
    deliverySize: "3.9 kb (LbCas12a) + 0.12 kb per crRNA",
    efficiency: "20-70% indel frequency; higher multiplex efficiency",
  },
  {
    id: "Base-Editor-CBE",
    fullName: "Cytosine Base Editor (BE4max)",
    description: "Converts C to T (or G to A on opposite strand) without creating DSBs. Fuses catalytically impaired Cas9 (nickase) with cytidine deaminase (APOBEC1/A3A) and UGI.",
    mechanism: "nCas9(D10A) nicks the non-edited strand while tethered APOBEC1 deaminates cytosines in a 4-8 nt editing window (positions 4-8 of protospacer). UGI inhibits uracil glycosylase to prevent base excision repair reverting the edit.",
    advantages: [
      "No DSBs — dramatically reduces indels, translocations, chromothripsis",
      "High efficiency for C>T transitions (40-80% in plants)",
      "Clean single-nucleotide changes ideal for point mutations",
      "Can create premature stop codons (CAA>TAA, CGA>TGA, CAG>TAG) for gene knockout",
      "No donor template required",
    ],
    limitations: [
      "Limited to C>T (G>A) transitions only",
      "Editing window of ~4-5 nt — bystander edits at other Cs in window",
      "Cannot make transversions (C>A, C>G)",
      "Large construct (~5.5 kb) challenging for some delivery methods",
      "Guide-independent off-target RNA editing by APOBEC1 deaminase domain",
    ],
    bestFor: ["point-mutation", "knockout"],
    pamRequirement: "NGG (same as SpCas9 nickase)",
    deliverySize: "5.5 kb (nCas9-APOBEC1-UGI)",
    efficiency: "40-80% C>T conversion in plants",
  },
  {
    id: "Base-Editor-ABE",
    fullName: "Adenine Base Editor (ABE8e)",
    description: "Converts A to G (or T to C on opposite strand) without DSBs. Fuses nCas9 with evolved TadA* adenosine deaminase. Complements CBE for the other transition class.",
    mechanism: "Evolved TadA* deaminase converts adenine to inosine (read as guanine) in positions 4-8 of the protospacer. nCas9(D10A) nicks the non-edited strand to bias repair toward the edited strand.",
    advantages: [
      "No DSBs — minimal indels and genomic rearrangements",
      "High product purity (>95% A>G with minimal byproducts)",
      "Very low off-target DNA editing (no guide-independent deamination)",
      "Can correct many disease/trait-associated SNPs",
      "ABE8e variant has dramatically improved efficiency over earlier versions",
    ],
    limitations: [
      "Limited to A>G (T>C) transitions only",
      "Narrow editing window (positions 4-8)",
      "Cannot make transversions",
      "Large construct size similar to CBE",
      "Activity can vary significantly between target sites",
    ],
    bestFor: ["point-mutation"],
    pamRequirement: "NGG (same as SpCas9 nickase)",
    deliverySize: "5.3 kb (nCas9-TadA*)",
    efficiency: "30-70% A>G conversion in plants",
  },
  {
    id: "Prime-Editor",
    fullName: "Prime Editor (PE3/PE5max)",
    description: "The most versatile editor — can make all 12 possible point mutations, small insertions (up to ~40 bp), and deletions (up to ~80 bp) without DSBs or donor DNA templates.",
    mechanism: "nCas9(H840A) fused to engineered M-MLV reverse transcriptase. The pegRNA contains a primer binding site (PBS) and reverse transcription template (RTT) encoding the desired edit. After nicking, the 3' flap is extended by RT using the pegRNA as template.",
    advantages: [
      "Most precise editing — any point mutation, small indel without DSBs",
      "No donor DNA template needed (edit encoded in pegRNA)",
      "Very low off-target and indel rates",
      "Can install all 12 transition and transversion mutations",
      "Can make precise insertions and deletions",
    ],
    limitations: [
      "Lower efficiency than Cas9 or base editors (5-30% in plants)",
      "Very large construct (~6.3 kb) — difficult to deliver",
      "Complex pegRNA design requires optimization",
      "Efficiency highly variable between loci",
      "Limited plant-optimized versions available (improving rapidly)",
    ],
    bestFor: ["point-mutation", "insertion"],
    pamRequirement: "NGG (for PE3 nick site: NGG or NGA)",
    deliverySize: "6.3 kb (nCas9-RT) + pegRNA + nick gRNA",
    efficiency: "5-30% precise editing in plants (improving)",
  },
  {
    id: "CRISPRi",
    fullName: "CRISPR Interference (dCas9-KRAB/SRDX)",
    description: "Transcriptional repression without DNA modification. Catalytically dead Cas9 (dCas9) fused to repressor domains blocks transcription when targeted to promoters.",
    mechanism: "dCas9 (D10A + H840A) physically blocks RNA polymerase and/or recruits transcriptional repressors (KRAB in mammals, SRDX in plants) to silence gene expression. No DNA cutting — fully reversible.",
    advantages: [
      "No permanent DNA changes — reversible gene silencing",
      "No risk of off-target mutations or chromosomal rearrangements",
      "Can achieve partial knockdown (tunable repression)",
      "Ideal for studying essential genes that cannot be knocked out",
      "Multiplexable for pathway-level silencing",
    ],
    limitations: [
      "Requires continuous expression of dCas9 — not stable without transgene",
      "Repression efficiency varies (typically 60-90% reduction)",
      "Not a permanent edit — lost if transgene segregates out",
      "Limited use in crops where transgene-free product is required",
      "Effectiveness depends on precise promoter targeting",
    ],
    bestFor: ["knockout"],
    pamRequirement: "NGG (same as SpCas9)",
    deliverySize: "4.2 kb (dCas9) + repressor domain + sgRNA",
    efficiency: "60-90% transcriptional repression",
  },
  {
    id: "CRISPRa",
    fullName: "CRISPR Activation (dCas9-VP64/VPR/TV)",
    description: "Transcriptional activation of endogenous genes without DNA modification. dCas9 fused to activation domains (VP64, p65, Rta) upregulates target gene expression.",
    mechanism: "dCas9 fused to transcriptional activators recruits RNA polymerase and general transcription factors to the target promoter. VPR (VP64-p65-Rta) and TV (6xTAL-VP128) systems provide strong activation in plants.",
    advantages: [
      "Upregulates endogenous genes — no transgene insertion needed for the target",
      "Can activate multiple genes simultaneously for pathway engineering",
      "Tunable activation by guide multiplicity and activator strength",
      "No DNA damage or off-target mutations",
      "Useful alternative to constitutive overexpression transgenes",
    ],
    limitations: [
      "Requires dCas9-activator transgene for continuous expression",
      "Activation levels may not match strong constitutive promoters",
      "Position-dependent — guides must target within -400 to -50 of TSS",
      "Not permanent without maintaining the activator construct",
      "Limited validation in crop species beyond rice and Arabidopsis",
    ],
    bestFor: ["overexpression"],
    pamRequirement: "NGG (same as SpCas9)",
    deliverySize: "4.2 kb (dCas9) + activator domain + sgRNA",
    efficiency: "2-20 fold transcriptional activation",
  },
  {
    id: "Cas13",
    fullName: "Cas13 (RNA-targeting CRISPR)",
    description: "Targets and cleaves RNA rather than DNA. No permanent genome modification. Useful for transient gene knockdown, viral RNA degradation, and RNA base editing.",
    mechanism: "Cas13 binds crRNA, recognizes complementary ssRNA via HEPN nuclease domains, and cleaves the target transcript. No PAM required on RNA. Can be fused to ADAR2 for RNA base editing (A>I, read as G).",
    advantages: [
      "Targets RNA — no permanent DNA changes",
      "No PAM requirement on target RNA",
      "Can degrade viral RNA for virus resistance",
      "RNA base editing (REPAIR/RESCUE systems) for transient changes",
      "Collateral cleavage can be engineered as diagnostic (SHERLOCK)",
    ],
    limitations: [
      "Transient effect — must be continuously expressed",
      "Collateral RNA cleavage (non-specific RNase activity when activated)",
      "Limited plant applications published to date",
      "Cannot create permanent genomic edits",
      "Large protein — delivery challenging",
    ],
    bestFor: ["knockout"],
    pamRequirement: "None (RNA target); PFS preference for some orthologs",
    deliverySize: "3.5-4.5 kb depending on ortholog",
    efficiency: "50-90% transcript knockdown",
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MULTIPLEXING STRATEGIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const multiplexStrategies: MultiplexStrategy[] = [
  {
    id: "trna-grna-array",
    name: "Polycistronic tRNA-gRNA Array",
    description:
      "Multiple gRNAs separated by tRNA sequences are transcribed as a single polycistronic transcript from one Pol III promoter. Endogenous tRNase Z and tRNase P process the tRNA junctions, releasing individual mature gRNAs.",
    maxTargets: 12,
    mechanism:
      "OsU3/U6 promoter → tRNA-gRNA1-tRNA-gRNA2-tRNA-gRNA3... → processed by RNase Z/P into individual sgRNAs. Each tRNA spacer is ~77 bp. The endogenous tRNA processing machinery is universal across plant species.",
    advantages: [
      "Single promoter drives all guides — compact construct",
      "Endogenous tRNA processing is universal — works in any plant",
      "Up to 8-12 guides validated in rice and wheat",
      "Equal expression of all guides (unlike multiple promoters)",
      "Ideal for polyploid homeolog editing",
    ],
    limitations: [
      "Construct assembly can be complex (Golden Gate cloning recommended)",
      "Very long arrays (>8 guides) may have reduced 3' guide expression",
      "Total construct size can exceed single T-DNA capacity for many guides",
    ],
    bestForPloidy: ["hexaploid", "tetraploid", "polyploid"],
  },
  {
    id: "csy4-system",
    name: "Csy4 Ribonuclease System",
    description:
      "gRNAs separated by Csy4 recognition sequences (28-nt hairpin) are processed by co-expressed Csy4 endoribonuclease from Pseudomonas aeruginosa.",
    maxTargets: 8,
    mechanism:
      "Pol II promoter → gRNA1-Csy4site-gRNA2-Csy4site-gRNA3... Co-expressed Csy4 cleaves at 28-nt recognition hairpins. Enables use of Pol II promoters (tissue-specific, inducible) for guide expression.",
    advantages: [
      "Compatible with Pol II promoters — enables tissue-specific guide expression",
      "Precise cleavage with no extra nucleotides on mature guide",
      "Orthogonal processing — independent of host RNases",
      "Can combine with inducible promoters for temporal control",
    ],
    limitations: [
      "Requires co-expression of Csy4 protein (additional construct)",
      "Csy4 expression level must be tuned to avoid guide degradation",
      "Less validated in plants compared to tRNA arrays",
    ],
    bestForPloidy: ["diploid", "tetraploid"],
  },
  {
    id: "multiple-promoters",
    name: "Multiple Promoter Cassettes",
    description:
      "Each gRNA is driven by its own U6 or U3 promoter. The simplest and most reliable approach for small numbers of targets.",
    maxTargets: 4,
    mechanism:
      "Independent OsU6a-gRNA1, OsU6b-gRNA2, OsU3-gRNA3 cassettes in a single T-DNA. Different U6/U3 promoter variants avoid repeat-induced silencing.",
    advantages: [
      "Simplest to clone — standard Golden Gate or Gibson assembly",
      "Each guide independently expressed at optimal levels",
      "Most reliable for 2-4 targets",
      "Well-validated across many plant species",
    ],
    limitations: [
      "Limited to 3-4 guides before construct becomes too large",
      "Repeated promoter sequences risk recombination-based deletion",
      "T-DNA size limit (~15 kb) constrains total cassettes",
      "Unequal guide expression between different promoters",
    ],
    bestForPloidy: ["diploid"],
  },
  {
    id: "cas12a-array",
    name: "Cas12a Native Array Processing",
    description:
      "Cas12a (Cpf1) naturally processes its own CRISPR array — a single transcript with direct repeats between spacers is cleaved by Cas12a's intrinsic RNase activity.",
    maxTargets: 10,
    mechanism:
      "Pol III promoter → DR-spacer1-DR-spacer2-DR-spacer3... Cas12a protein processes direct repeats (19-nt) to release individual crRNAs. No additional processing machinery needed — Cas12a does both RNA processing and DNA cutting.",
    advantages: [
      "Built-in multiplexing — no additional processing enzymes",
      "Very compact — each additional target adds only ~43 bp (19-nt DR + 24-nt spacer)",
      "Validated for up to 10 targets in plants",
      "Simultaneous editing at all targets",
      "Lower off-target rate than SpCas9",
    ],
    limitations: [
      "TTTV PAM requirement limits targetable sites",
      "Generally lower per-site efficiency than SpCas9",
      "Temperature sensitivity (LbCas12a < 28°C reduced activity)",
      "Fewer plant-optimized Cas12a variants available",
    ],
    bestForPloidy: ["tetraploid", "hexaploid", "polyploid"],
  },
  {
    id: "paired-nickase",
    name: "Paired Nickase Approach",
    description:
      "Two Cas9 nickase (D10A) guides targeting opposite strands with offset PAMs create a coordinated DSB. Dramatically reduces off-targets since single nicks are repaired faithfully.",
    maxTargets: 2,
    mechanism:
      "nCas9(D10A) + two sgRNAs targeting opposite strands 30-100 bp apart. Each nickase creates a single-strand break; the combined offset nicks produce a DSB with overhangs. Single nicks at off-target sites are repaired error-free by BER.",
    advantages: [
      "100-1000x reduction in off-target mutagenesis",
      "Can create precise deletions of defined size (distance between nick sites)",
      "Overhang structure favors HDR over NHEJ",
      "Ideal for high-specificity applications near essential genes",
    ],
    limitations: [
      "Requires two guides per target — doubles guide RNA design effort",
      "Efficiency depends on precise nick spacing (30-100 bp optimal)",
      "Not suitable for multiplexing many targets simultaneously",
      "Guide pair orientation must be carefully designed (PAM-out configuration)",
    ],
    bestForPloidy: ["diploid"],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  MORPHOGENIC REGULATORS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const morphogenicRegulators: MorphogenicRegulator[] = [
  {
    id: "bbm-wus2",
    name: "BBM + WUS2",
    fullName: "Baby Boom + Wuschel 2",
    mechanism:
      "ZmBBM (AP2/ERF transcription factor) promotes somatic embryogenesis while ZmWUS2 (homeodomain TF) maintains stem cell identity. Co-expression transforms somatic cells directly into embryogenic cells, bypassing callus phase. Excision cassette (Cre/loxP or heat-inducible) removes morphogenic genes after regeneration.",
    cropsUnlocked: ["maize", "sorghum", "sugarcane", "rice", "pearl-millet"],
    efficiencyGain: "10-50x increase in transformation frequency. Enables editing of previously untransformable inbred lines.",
    reference: "Lowe et al. (2016) Plant Cell 28: 1998-2015",
    year: 2016,
  },
  {
    id: "grf-gif",
    name: "GRF-GIF chimera",
    fullName: "Growth-Regulating Factor 4 + GRF-Interacting Factor 1 chimera",
    mechanism:
      "Wheat TaGRF4-GIF1 chimeric protein acts as a potent growth regulator that dramatically enhances regeneration efficiency. The GRF4 interacts with GIF1 to activate cell proliferation genes. The chimera is resistant to miR396-mediated degradation, providing sustained regeneration stimulus.",
    cropsUnlocked: ["wheat", "rice", "canola", "chickpea", "lettuce"],
    efficiencyGain: "4-7x increase in regeneration efficiency. Reduces genotype dependence. Makes previously recalcitrant wheat varieties transformable.",
    reference: "Debernardi et al. (2020) Nature Biotechnology 38: 1274-1279",
    year: 2020,
  },
  {
    id: "grf4-gif1",
    name: "GRF4-GIF1",
    fullName: "OsGRF4 + OsGIF1 co-expression",
    mechanism:
      "Rice-derived GRF4 and GIF1 co-expressed as separate genes (not chimera) enhance shoot regeneration from callus. OsGRF4 promotes cell division while OsGIF1 enhances chloroplast biogenesis and shoot identity.",
    cropsUnlocked: ["rice", "wheat", "barley", "maize"],
    efficiencyGain: "3-5x improvement in shoot regeneration from callus. Reduces time from transformation to T0 plant by 2-3 weeks.",
    reference: "Kong et al. (2020) Plant Biotechnology Journal 18: 2142-2148",
    year: 2020,
  },
  {
    id: "tawox",
    name: "TaWOX",
    fullName: "Triticum aestivum WUSCHEL-related homeobox",
    mechanism:
      "Wheat-specific WOX gene that promotes stem cell maintenance and somatic embryogenesis when transiently expressed. Works particularly well in Triticeae species where standard WUS2 shows limited efficacy.",
    cropsUnlocked: ["wheat", "barley"],
    efficiencyGain: "3-8x improvement in wheat transformation efficiency across multiple genotype backgrounds including commercial varieties.",
    reference: "Wang et al. (2022) Nature Plants 8: 110-117",
    year: 2022,
  },
  {
    id: "plt5",
    name: "PLT5",
    fullName: "PLETHORA 5",
    mechanism:
      "AP2/ERF transcription factor that promotes pluripotency and de novo shoot organogenesis. Unlike BBM/WUS2 which requires excision, PLT5 can be transiently expressed via non-integrating delivery (RNP or mRNA) to stimulate regeneration without permanent transgene integration.",
    cropsUnlocked: ["tomato", "potato", "sweet-potato", "cassava", "lettuce"],
    efficiencyGain: "2-5x improvement in regeneration efficiency for Solanaceae and other dicots. Compatible with transgene-free editing via transient expression.",
    reference: "Lian et al. (2022) Nature Plants 8: 1071-1082",
    year: 2022,
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  ORTHOLOG GROUPS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const orthologGroups: OrthologGroup[] = [
  {
    groupId: "dreb-cbf",
    geneName: "DREB/CBF",
    pathway: "Drought & Cold Response",
    conservationLevel: "highly-conserved",
    notes: "The DREB/CBF transcription factor family is present in all land plants. DREB2 subfamily mediates drought/heat response; CBF/DREB1 subfamily mediates cold acclimation. Conserved AP2/ERF DNA-binding domain targets DRE/CRT cis-elements.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-dreb2a", geneName: "AtDREB2A", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-osdreb2a", geneName: "OsDREB2A", similarity: 0.72 },
      { genomeId: "maize", geneId: "zm-zmdreb2a", geneName: "ZmDREB2A", similarity: 0.68 },
      { genomeId: "wheat", geneId: "ta-tadreb2", geneName: "TaDREB2", similarity: 0.71 },
      { genomeId: "sorghum", geneId: "sb-dreb2", geneName: "SbDREB2", similarity: 0.75 },
      { genomeId: "barley", geneId: "hv-dreb1", geneName: "HvDREB1", similarity: 0.70 },
      { genomeId: "pearl-millet", geneId: "pg-dreb2", geneName: "PgDREB2", similarity: 0.69 },
      { genomeId: "chickpea", geneId: "ca2-dreb1", geneName: "CaDREB1", similarity: 0.58 },
      { genomeId: "soybean", geneId: "gm-gmdreb2", geneName: "GmDREB2", similarity: 0.56 },
      { genomeId: "cotton", geneId: "gh-dreb", geneName: "GhDREB", similarity: 0.55 },
      { genomeId: "canola", geneId: "bn-dreb", geneName: "BnDREB", similarity: 0.64 },
      { genomeId: "quinoa", geneId: "cq-dreb", geneName: "CqDREB", similarity: 0.48 },
      { genomeId: "sweet-potato", geneId: "ib-dreb", geneName: "IbDREB", similarity: 0.45 },
    ],
  },
  {
    groupId: "sos1-nhx1-hkt1",
    geneName: "SOS1 / NHX1 / HKT1",
    pathway: "Salt Tolerance",
    conservationLevel: "highly-conserved",
    notes: "The salt overly sensitive (SOS) pathway, vacuolar Na+/H+ antiporters (NHX), and high-affinity K+ transporters (HKT) form the three pillars of plant salt tolerance. Conserved across all angiosperms — evolved from ancestral marine algae ion transport systems.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-sos1", geneName: "AtSOS1", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-oshkt1-5", geneName: "OsHKT1;5", similarity: 0.74 },
      { genomeId: "wheat", geneId: "ta-tahkt1-5", geneName: "TaHKT1;5", similarity: 0.72 },
      { genomeId: "barley", geneId: "hv-hkt1-5", geneName: "HvHKT1;5", similarity: 0.73 },
      { genomeId: "sorghum", geneId: "sb-sos1", geneName: "SbSOS1", similarity: 0.69 },
      { genomeId: "tomato", geneId: "sl-slsos1", geneName: "SlSOS1", similarity: 0.66 },
      { genomeId: "quinoa", geneId: "cq-sos1", geneName: "CqSOS1", similarity: 0.52 },
      { genomeId: "pearl-millet", geneId: "pg-hkt", geneName: "PgHKT", similarity: 0.68 },
      { genomeId: "cotton", geneId: "gh-sos1", geneName: "GhSOS1", similarity: 0.58 },
      { genomeId: "banana", geneId: "ma-nhx1", geneName: "MaNHX1", similarity: 0.55 },
    ],
  },
  {
    groupId: "npr1",
    geneName: "NPR1",
    pathway: "Systemic Acquired Resistance",
    conservationLevel: "highly-conserved",
    notes: "NPR1 (Non-expressor of Pathogenesis-Related genes 1) is the master regulator of salicylic acid-mediated systemic acquired resistance (SAR). It functions as a transcriptional co-activator that interacts with TGA transcription factors. Conserved across all flowering plants.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-npr1", geneName: "AtNPR1", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-oswr45", geneName: "OsWRKY45", similarity: 0.45 },
      { genomeId: "cacao", geneId: "tc-npr1", geneName: "TcNPR1", similarity: 0.68 },
      { genomeId: "cotton", geneId: "gh-npr1", geneName: "GhNPR1", similarity: 0.64 },
      { genomeId: "sorghum", geneId: "sb-npr1", geneName: "SbNPR1", similarity: 0.58 },
      { genomeId: "tea", geneId: "cs-npr1", geneName: "CsNPR1", similarity: 0.62 },
      { genomeId: "canola", geneId: "bn-rlm", geneName: "BnRLM", similarity: 0.42 },
      { genomeId: "oil-palm", geneId: "eg-npr1", geneName: "EgNPR1", similarity: 0.56 },
      { genomeId: "banana", geneId: "ma-rga2", geneName: "MaRGA2", similarity: 0.38 },
    ],
  },
  {
    groupId: "psy",
    geneName: "PSY (Phytoene Synthase)",
    pathway: "Carotenoid Biosynthesis",
    conservationLevel: "highly-conserved",
    notes: "PSY catalyzes the first committed step of carotenoid biosynthesis (GGPP → phytoene). Rate-limiting enzyme for provitamin A accumulation. Golden Rice and orange-fleshed sweet potato both leverage PSY overexpression. Present in all photosynthetic organisms.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-psy", geneName: "AtPSY", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-ospsy1", geneName: "OsPSY1", similarity: 0.72 },
      { genomeId: "maize", geneId: "zm-zmpsy1", geneName: "ZmPSY1", similarity: 0.78 },
      { genomeId: "tomato", geneId: "sl-slpsy1", geneName: "SlPSY1", similarity: 0.70 },
      { genomeId: "sweet-potato", geneId: "ib-or", geneName: "IbOr", similarity: 0.42 },
      { genomeId: "banana", geneId: "ma-psy", geneName: "MaPSY", similarity: 0.65 },
      { genomeId: "sorghum", geneId: "sb-psy1", geneName: "SbPSY1", similarity: 0.76 },
      { genomeId: "cassava", geneId: "me-mepsy", geneName: "MePSY", similarity: 0.60 },
    ],
  },
  {
    groupId: "hsp-hsf",
    geneName: "HSP/HSF",
    pathway: "Heat Shock Response",
    conservationLevel: "highly-conserved",
    notes: "Heat shock proteins (HSPs) and heat shock factors (HSFs) form a universal stress response system present in all cellular organisms. HSFs are the transcriptional activators; HSPs are molecular chaperones that prevent protein aggregation under heat stress.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-hsfa2", geneName: "AtHSFA2", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-oshsfa2d", geneName: "OsHSFA2d", similarity: 0.72 },
      { genomeId: "wheat", geneId: "ta-tahsfa6e", geneName: "TaHSFA6e", similarity: 0.70 },
      { genomeId: "sorghum", geneId: "sb-hsfa2", geneName: "SbHSFA2", similarity: 0.74 },
      { genomeId: "pearl-millet", geneId: "pg-hsf", geneName: "PgHSF", similarity: 0.71 },
      { genomeId: "cotton", geneId: "gh-hsp70", geneName: "GhHSP70", similarity: 0.68 },
      { genomeId: "chickpea", geneId: "ca2-hsp", geneName: "CaHSP", similarity: 0.55 },
      { genomeId: "cacao", geneId: "tc-hsp", geneName: "TcHSP", similarity: 0.58 },
      { genomeId: "oil-palm", geneId: "eg-hsp", geneName: "EgHSP", similarity: 0.56 },
      { genomeId: "banana", geneId: "ma-hsp70", geneName: "MaHSP70", similarity: 0.60 },
    ],
  },
  {
    groupId: "gw-yield",
    geneName: "GW2/GW7/GS3",
    pathway: "Grain Weight / Yield",
    conservationLevel: "moderately-conserved",
    notes: "Grain weight genes (GW2, GW7, GS3) are negative regulators of grain size in cereals. GW2 encodes a RING-type E3 ubiquitin ligase; loss-of-function increases grain width and weight. Conserved primarily in grasses (Poaceae).",
    members: [
      { genomeId: "rice", geneId: "os-osgw7", geneName: "OsGW7", similarity: 1.0 },
      { genomeId: "wheat", geneId: "ta-tagw2", geneName: "TaGW2", similarity: 0.82 },
      { genomeId: "maize", geneId: "zm-zmgs3", geneName: "ZmGS3", similarity: 0.65 },
      { genomeId: "barley", geneId: "hv-gw", geneName: "HvGW", similarity: 0.80 },
      { genomeId: "sorghum", geneId: "sb-gw2", geneName: "SbGW2", similarity: 0.78 },
      { genomeId: "pearl-millet", geneId: "pg-gw2", geneName: "PgGW2", similarity: 0.72 },
    ],
  },
  {
    groupId: "sub1-erf",
    geneName: "SUB1A / ERF-VII",
    pathway: "Submergence / Flood Tolerance",
    conservationLevel: "moderately-conserved",
    notes: "ERF-VII transcription factors mediate submergence tolerance via the N-end rule oxygen sensing pathway. SUB1A in rice provides quiescence-based survival. The N-degron pathway (PRT6-mediated) is conserved, but SUB1A-like genes are restricted to Oryza.",
    members: [
      { genomeId: "rice", geneId: "os-sub1a", geneName: "SUB1A", similarity: 1.0 },
      { genomeId: "sorghum", geneId: "sb-sub1", geneName: "SbSUB1-like", similarity: 0.55 },
      { genomeId: "barley", geneId: "hv-erf", geneName: "HvERF-VII", similarity: 0.48 },
      { genomeId: "banana", geneId: "ma-erf", geneName: "MaERF-VII", similarity: 0.40 },
      { genomeId: "sugarcane", geneId: "sc-erf", geneName: "ScERF-VII", similarity: 0.52 },
      { genomeId: "sweet-potato", geneId: "ib-erf", geneName: "IbERF", similarity: 0.38 },
    ],
  },
  {
    groupId: "fad2",
    geneName: "FAD2",
    pathway: "Fatty Acid Desaturation / Oil Quality",
    conservationLevel: "highly-conserved",
    notes: "FAD2 (omega-6 fatty acid desaturase) converts oleic acid (18:1) to linoleic acid (18:2). Loss-of-function mutations increase oleic acid content — the basis of 'high oleic' varieties in peanut, canola, soybean, and sunflower. Important for both nutrition and cooking stability.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-fad2", geneName: "AtFAD2", similarity: 1.0 },
      { genomeId: "peanut", geneId: "ah-fad2", geneName: "AhFAD2", similarity: 0.78 },
      { genomeId: "canola", geneId: "bn-fad2", geneName: "BnFAD2", similarity: 0.82 },
      { genomeId: "soybean", geneId: "gm-gmfad2", geneName: "GmFAD2", similarity: 0.76 },
      { genomeId: "cotton", geneId: "gh-fad2", geneName: "GhFAD2", similarity: 0.70 },
      { genomeId: "oil-palm", geneId: "eg-fatb", geneName: "EgFATB", similarity: 0.45 },
    ],
  },
  {
    groupId: "myb-tf",
    geneName: "MYB TFs (Anthocyanin/Flavonoid)",
    pathway: "Anthocyanin & Flavonoid Regulation",
    conservationLevel: "highly-conserved",
    notes: "R2R3-MYB transcription factors form the MBW complex (MYB-bHLH-WD40) controlling anthocyanin and flavonoid biosynthesis. This regulatory module is conserved across all flowering plants. Key targets for biofortification and UV protection.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-myb75", geneName: "AtMYB75/PAP1", similarity: 1.0 },
      { genomeId: "tomato", geneId: "sl-ant1", geneName: "SlANT1", similarity: 0.62 },
      { genomeId: "sweet-potato", geneId: "ib-myb1", geneName: "IbMYB1", similarity: 0.55 },
      { genomeId: "lettuce", geneId: "ls-myb", geneName: "LsMYB", similarity: 0.58 },
      { genomeId: "tea", geneId: "cs-fls", geneName: "CsFLS", similarity: 0.48 },
      { genomeId: "cacao", geneId: "tc-myb", geneName: "TcMYB", similarity: 0.52 },
      { genomeId: "vitis", geneId: "vv-myba1", geneName: "VvMYBA1", similarity: 0.60 },
    ],
  },
  {
    groupId: "pht1",
    geneName: "PHT1 (Phosphate Transporter)",
    pathway: "Phosphorus Acquisition",
    conservationLevel: "highly-conserved",
    notes: "PHT1 family high-affinity phosphate transporters are critical for P uptake from soil. Overexpression improves growth in P-deficient soils. PSTOL1 (phosphorus starvation tolerance) enhances root growth for better P foraging. Essential for sustainable agriculture on degraded soils.",
    members: [
      { genomeId: "arabidopsis", geneId: "at-pht1", geneName: "AtPHT1;1", similarity: 1.0 },
      { genomeId: "rice", geneId: "os-osnrt1-1b", geneName: "OsNRT1.1B", similarity: 0.42 },
      { genomeId: "barley", geneId: "hv-pht1", geneName: "HvPHT1", similarity: 0.72 },
      { genomeId: "sorghum", geneId: "sb-pstol1", geneName: "SbPSTOL1", similarity: 0.55 },
      { genomeId: "pearl-millet", geneId: "pg-pstol", geneName: "PgPSTOL", similarity: 0.52 },
      { genomeId: "canola", geneId: "bn-pht1", geneName: "BnPHT1", similarity: 0.68 },
      { genomeId: "tea", geneId: "cs-amt", geneName: "CsAMT", similarity: 0.35 },
      { genomeId: "oil-palm", geneId: "eg-pht", geneName: "EgPHT", similarity: 0.50 },
      { genomeId: "cacao", geneId: "tc-pht", geneName: "TcPHT", similarity: 0.48 },
      { genomeId: "lettuce", geneId: "ls-nrt", geneName: "LsNRT", similarity: 0.40 },
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  UTILITY FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getPloidyInfo(genomeId: string): PloidyInfo | undefined {
  return ploidyData.find((p) => p.genomeId === genomeId);
}

export function getRecommendedTools(
  editType: EditType,
  ploidyLevel: number
): EditingToolInfo[] {
  const tools = editingTools.filter((t) => t.bestFor.includes(editType));
  // For polyploids, prioritize tools that work well with multiplexing
  if (ploidyLevel > 2) {
    return tools.sort((a, b) => {
      const aMultiplex = a.id === "Cas12a" || a.id === "SpCas9" ? 1 : 0;
      const bMultiplex = b.id === "Cas12a" || b.id === "SpCas9" ? 1 : 0;
      return bMultiplex - aMultiplex;
    });
  }
  return tools;
}

export function getOrthologsForGene(
  geneId: string
): OrthologGroup | undefined {
  return orthologGroups.find((g) =>
    g.members.some((m) => m.geneId === geneId)
  );
}

export function getMultiplexStrategy(
  numTargets: number,
  ploidyLevel: number
): MultiplexStrategy {
  if (ploidyLevel >= 6 || numTargets > 6) {
    return (
      multiplexStrategies.find((s) => s.id === "trna-grna-array") ??
      multiplexStrategies[0]
    );
  }
  if (ploidyLevel >= 4 || numTargets > 4) {
    return (
      multiplexStrategies.find((s) => s.id === "cas12a-array") ??
      multiplexStrategies[0]
    );
  }
  if (numTargets <= 2) {
    return (
      multiplexStrategies.find((s) => s.id === "paired-nickase") ??
      multiplexStrategies[2]
    );
  }
  return (
    multiplexStrategies.find((s) => s.id === "multiple-promoters") ??
    multiplexStrategies[2]
  );
}

export function getMorphogenicOptions(
  genomeId: string
): MorphogenicRegulator[] {
  return morphogenicRegulators.filter((m) =>
    m.cropsUnlocked.includes(genomeId)
  );
}

export function getAllEditingTools(): EditingToolInfo[] {
  return editingTools;
}

export function getAllMultiplexStrategies(): MultiplexStrategy[] {
  return multiplexStrategies;
}

export function getAllOrthologGroups(): OrthologGroup[] {
  return orthologGroups;
}
