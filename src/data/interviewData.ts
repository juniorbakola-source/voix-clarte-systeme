export interface Verbatim {
  id: string;
  department: "Service Client" | "Ventes" | "Production" | "Ingénierie" | "Shipping" | "Qualité";
  question: string;
  response: string;
  context: string;
  needType: "Explicite" | "Latent" | "Critique";
  tag: "reactive" | "partial" | "indirect";
  interpretation: string;
}

export const verbatims: Verbatim[] = [
  // SERVICE CLIENT (Page 1)
  {
    id: "sc-1",
    department: "Service Client",
    question: "Par quels moyens recevez-vous des retours clients ?",
    response: "Emails, Téléphone. Pas d'archivage, pas de traitement.",
    context: "Responsable Service Client — Canaux d'écoute",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Les canaux de captation existent mais aucune donnée n'est archivée ni traitée systématiquement. L'information client est volatile et perdue dès réception.",
  },
  {
    id: "sc-2",
    department: "Service Client",
    question: "Les informations sont-elles formalisées ou informelles ?",
    response: "On le formalise pas mais on prend action.",
    context: "Responsable Service Client — Structure de l'information",
    needType: "Critique",
    tag: "reactive",
    interpretation: "L'action est prise sans formalisation. Aucune traçabilité, aucune capitalisation des apprentissages. Impossible de détecter des patterns récurrents.",
  },
  {
    id: "sc-3",
    department: "Service Client",
    question: "Où sont stockées ces données ?",
    response: "Les réclamations formelles / informelles ne sont pas stockées.",
    context: "Responsable Service Client — Stockage des données",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Absence totale de système de stockage. La mémoire organisationnelle client est inexistante.",
  },
  {
    id: "sc-4",
    department: "Service Client",
    question: "Existe-t-il un délai de traitement standard pour les plaintes ?",
    response: "Pas précis / Pas clair / Pas fait.",
    context: "Responsable Service Client — Gestion des plaintes",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Aucun SLA défini pour le traitement des plaintes. Le client n'a aucune garantie de temps de réponse.",
  },
  {
    id: "sc-5",
    department: "Service Client",
    question: "Les causes racines sont-elles systématiquement analysées ?",
    response: "Non, on se réfère à nos garanties. Pas d'évaluation de coût de non-garantie.",
    context: "Responsable Service Client — Analyse causale",
    needType: "Critique",
    tag: "reactive",
    interpretation: "L'analyse causale est remplacée par une vérification de garantie. Le coût réel de la non-qualité externe est totalement invisible.",
  },
  {
    id: "sc-6",
    department: "Service Client",
    question: "Avez-vous des indicateurs VoC ?",
    response: "Non. RMA pas quantifié. Coût de non-qualité externe pas mesuré.",
    context: "Responsable Service Client — KPIs",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Aucun indicateur de performance lié à la voix du client. L'entreprise pilote à l'aveugle.",
  },
  {
    id: "sc-7",
    department: "Service Client",
    question: "Qu'est-ce qui vous empêche d'exploiter mieux la voix du client ?",
    response: "Temps à allouer au client.",
    context: "Responsable Service Client — Frictions internes",
    needType: "Latent",
    tag: "indirect",
    interpretation: "Le manque de temps est symptomatique d'un manque de priorisation stratégique de la VOC dans l'organisation.",
  },

  // VENTES (Page 2)
  {
    id: "vent-1",
    department: "Ventes",
    question: "Comment savez-vous que le client est satisfait ?",
    response: "On ne sait pas si le client est satisfait. On ne questionne pas sur leur satisfaction.",
    context: "Directeur Commercial — Satisfaction client",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Aveu direct : aucun mécanisme de mesure de satisfaction. L'entreprise opère dans un vide complet de feedback structuré.",
  },
  {
    id: "vent-2",
    department: "Ventes",
    question: "Les informations sont-elles formalisées ou informelles ?",
    response: "Les informations sont toujours formalisées.",
    context: "Directeur Commercial — Documentation",
    needType: "Latent",
    tag: "partial",
    interpretation: "Contradiction avec les autres services. Les ventes estiment formaliser mais les données ne sont ni stockées ni partagées de manière structurée.",
  },
  {
    id: "vent-3",
    department: "Ventes",
    question: "Existe-t-il un délai de traitement standard pour les plaintes ?",
    response: "Non.",
    context: "Directeur Commercial — SLA plaintes",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Confirmation de l'absence de SLA à travers l'organisation. Le client subit des délais imprévisibles.",
  },
  {
    id: "vent-4",
    department: "Ventes",
    question: "Qu'est-ce qui vous empêche d'exploiter mieux la voix du client ?",
    response: "Manque d'expérience de l'équipe, les ressources matérielles pour maximiser le temps.",
    context: "Directeur Commercial — Frictions internes",
    needType: "Latent",
    tag: "partial",
    interpretation: "Les freins sont doubles : compétences et outils. L'équipe ventes n'est pas équipée pour structurer l'écoute client.",
  },
  {
    id: "vent-5",
    department: "Ventes",
    question: "Les services communiquent-ils efficacement entre eux ?",
    response: "Non.",
    context: "Directeur Commercial — Communication inter-services",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Silo confirmé. L'intelligence client captée par les ventes ne circule pas vers production et ingénierie.",
  },
  {
    id: "vent-6",
    department: "Ventes",
    question: "À quoi ressemblerait un système VoC idéal selon vous ?",
    response: "Combinaison d'initiatives de sondage périodique combiné avec la capacité des outils de collecte de façon bien mieux structurée.",
    context: "Directeur Commercial — Vision cible",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Le besoin est clairement articulé : sondages + outils de collecte structurés. La vision existe mais pas les moyens.",
  },

  // PRODUCTION (Page 3)
  {
    id: "prod-1",
    department: "Production",
    question: "Quels problèmes de production génèrent le plus souvent des retours clients ?",
    response: "Pas formalisé.",
    context: "Responsable Production — Retours clients",
    needType: "Critique",
    tag: "reactive",
    interpretation: "La production ne peut pas identifier les problèmes générant des retours car aucune analyse formelle n'existe.",
  },
  {
    id: "prod-2",
    department: "Production",
    question: "Quelles opérations sont les plus instables ou difficiles à contrôler ?",
    response: "Torquer, interprétation du dyno, association de pièces en emballage.",
    context: "Responsable Production — Variabilité des processus",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Les opérations critiques sont identifiées par l'expérience terrain mais non documentées dans un système CTQ formel.",
  },
  {
    id: "prod-3",
    department: "Production",
    question: "Quels sont les points du processus où vous perdez la valeur pour le client ?",
    response: "Délai de livraison, prise en charge du client, intégration des révisions.",
    context: "Responsable Production — Perte de valeur",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Trois CTQ critiques identifiés : délai, réactivité, gestion du changement. Ces points de douleur sont connus mais non mesurés.",
  },

  // SHIPPING
  {
    id: "ship-1",
    department: "Shipping",
    question: "Quelles erreurs d'expédition arrivent le plus souvent ?",
    response: "Erreurs d'adresse, les douanes.",
    context: "Responsable Expédition — Erreurs fréquentes",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Les erreurs d'expédition impactent directement l'expérience client et génèrent des coûts de non-qualité invisibles.",
  },
  {
    id: "ship-2",
    department: "Shipping",
    question: "Où se situent les principales causes de retards de livraison ?",
    response: "Manque de pièces, oubli des commandes, approbation du client.",
    context: "Responsable Expédition — Délais",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Les causes de retard sont multifactorielles et structurelles. L'oubli de commandes indique un problème systémique de gestion.",
  },

  // QUALITÉ
  {
    id: "qual-1",
    department: "Qualité",
    question: "Quels types de non-conformités reviennent le plus souvent des clients ?",
    response: "Niveau d'azote, niveau d'huile.",
    context: "Inspecteur Qualité — NC récurrentes",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Les NC récurrentes sont connues mais les actions préventives ne sont pas déclenchées de manière systémique.",
  },

  // INGÉNIERIE
  {
    id: "ing-1",
    department: "Ingénierie",
    question: "Quels problèmes les clients rapportent le plus souvent ?",
    response: "Mauvais setup.",
    context: "Ingénieur d'application — Problèmes récurrents",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Le problème de setup indique un gap entre le produit livré et la capacité du client à l'utiliser correctement. Besoin de documentation et support.",
  },
  {
    id: "ing-2",
    department: "Ingénierie",
    question: "Quelles plaintes sont les plus coûteuses ou les plus fréquentes ?",
    response: "Bris de shaft et body arraché.",
    context: "Ingénieur conception — Plaintes critiques",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Les défaillances mécaniques majeures (shaft, body) indiquent des problèmes potentiels de design ou de fabrication nécessitant une analyse CAPA urgente.",
  },
  {
    id: "ing-3",
    department: "Ingénierie",
    question: "Quels problèmes semblent venir du design vs de la fabrication ?",
    response: "Design : shaft cassé, sealhead. Fabrication : fuite d'huile, bris, manque de pièces.",
    context: "Ingénieur conception — Analyse causale",
    needType: "Critique",
    tag: "partial",
    interpretation: "La distinction design/fabrication est faite intuitivement mais pas supportée par des données. Une matrice CTQ-Cause racine est nécessaire.",
  },
  {
    id: "ing-4",
    department: "Ingénierie",
    question: "Si vous deviez choisir 3 améliorations produit selon le retour client ?",
    response: "Shaft, test de torsion, faire le développement réellement du véhicule, couleur, seal head, bearing.",
    context: "Directeur R&D — Priorisation",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Six améliorations citées au lieu de trois : l'ingénierie connaît les problèmes mais ne peut pas prioriser faute de données VOC structurées.",
  },
];

export const DEPARTMENTS = ["Tous", "Service Client", "Ventes", "Production", "Shipping", "Qualité", "Ingénierie"] as const;

export interface MaturityScore {
  department: "Ventes" | "Ingénierie" | "Production" | "Service Client" | "Shipping" | "Qualité";
  collecte: number;
  centralisation: number;
  analyse: number;
  exploitation: number;
  score: number;
  justification: string;
}

export const maturityScores: MaturityScore[] = [
  {
    department: "Service Client",
    collecte: 2.0,
    centralisation: 1.0,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.3,
    justification: "Canaux existants (email, téléphone) mais aucun archivage, aucun traitement, aucun indicateur VOC. RMA non quantifié. Coût de non-qualité non mesuré.",
  },
  {
    department: "Ventes",
    collecte: 2.5,
    centralisation: 1.5,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.5,
    justification: "Information dite « formalisée » mais non stockée ni partagée. Aucune mesure de satisfaction. Silos confirmés avec les autres services. Vision claire du système cible mais pas de moyens.",
  },
  {
    department: "Production",
    collecte: 1.5,
    centralisation: 1.0,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.1,
    justification: "Aucune formalisation des problèmes générant des retours clients. Les opérations critiques sont connues empiriquement mais non documentées dans un CTQ.",
  },
  {
    department: "Ingénierie",
    collecte: 2.0,
    centralisation: 1.0,
    analyse: 1.5,
    exploitation: 1.5,
    score: 1.5,
    justification: "Les problèmes clients sont connus (shaft, setup, fuite) mais la distinction design/fabrication est intuitive. Pas de données pour prioriser les améliorations.",
  },
  {
    department: "Shipping",
    collecte: 1.5,
    centralisation: 1.0,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.1,
    justification: "Les erreurs d'expédition et causes de retards sont connues mais non formalisées. Aucun moyen formel de savoir si le client est satisfait.",
  },
  {
    department: "Qualité",
    collecte: 2.0,
    centralisation: 1.5,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.4,
    justification: "Les NC récurrentes sont identifiées (azote, huile) mais les actions préventives ne sont pas systémiques. Les contrôles ne sont pas alignés aux CTQ clients.",
  },
];

export interface FluxInfo {
  id: string;
  source: string;
  description: string;
  status: "disconnected" | "weak" | "partial";
  detail: string;
  verbatimRef: string;
}

export const fluxData: FluxInfo[] = [
  {
    id: "flux-1",
    source: "Emails clients",
    description: "Service Client → Organisation",
    status: "weak",
    detail: "Les emails sont reçus mais ni archivés ni traités de manière structurée. L'information reste dans les boîtes individuelles sans capitalisation.",
    verbatimRef: "sc-1",
  },
  {
    id: "flux-2",
    source: "Réclamations informelles",
    description: "Terrain → Service Client",
    status: "disconnected",
    detail: "Les réclamations informelles ne sont pas stockées. Traitées comme des plaintes normales sans différenciation ni suivi spécifique.",
    verbatimRef: "sc-3",
  },
  {
    id: "flux-3",
    source: "Feedback satisfaction",
    description: "Client → Ventes",
    status: "disconnected",
    detail: "Aucun mécanisme de mesure de satisfaction. L'entreprise ne questionne pas les clients sur leur satisfaction.",
    verbatimRef: "vent-1",
  },
  {
    id: "flux-4",
    source: "Communication inter-services",
    description: "Ventes → Production / Ingénierie",
    status: "disconnected",
    detail: "Les services ne communiquent pas efficacement entre eux. L'intelligence client captée par les ventes ne circule pas.",
    verbatimRef: "vent-5",
  },
  {
    id: "flux-5",
    source: "Retours qualité clients",
    description: "Client → Production",
    status: "weak",
    detail: "Les problèmes générant des retours ne sont pas formalisés. La production connaît les opérations instables mais pas l'impact client.",
    verbatimRef: "prod-1",
  },
  {
    id: "flux-6",
    source: "Analyse causale RMA",
    description: "Qualité → Ingénierie",
    status: "partial",
    detail: "Les causes racines ne sont pas systématiquement analysées. On se réfère aux garanties sans évaluer le coût de non-qualité.",
    verbatimRef: "sc-5",
  },
];

export interface HeatmapCell {
  axisX: "Collecte" | "Centralisation" | "Analyse" | "Exploitation";
  axisY: "Service Client" | "Ventes" | "Production" | "Ingénierie" | "Shipping" | "Qualité";
  level: "critical" | "warning" | "ok" | "low";
  score: number;
  scenario: string;
}

export const heatmapData: HeatmapCell[] = [
  // Service Client
  { axisX: "Collecte", axisY: "Service Client", level: "warning", score: 2.0, scenario: "Les emails et appels sont reçus mais sans archivage ni traitement. Un client appelle pour le même problème 3 fois car il n'y a aucune trace du premier contact." },
  { axisX: "Centralisation", axisY: "Service Client", level: "critical", score: 1.0, scenario: "Les réclamations formelles et informelles ne sont pas stockées. La mémoire organisationnelle client est inexistante." },
  { axisX: "Analyse", axisY: "Service Client", level: "critical", score: 1.0, scenario: "Aucun indicateur VOC. Les RMA ne sont pas quantifiés. Le coût de non-qualité externe n'est pas mesuré." },
  { axisX: "Exploitation", axisY: "Service Client", level: "critical", score: 1.0, scenario: "On se réfère aux garanties sans analyser les causes racines. Pas d'évaluation du coût de non-garantie. Aucune boucle d'amélioration." },

  // Ventes
  { axisX: "Collecte", axisY: "Ventes", level: "warning", score: 2.5, scenario: "Les vendeurs captent des insights mais chacun a sa propre méthode. L'information est dite formalisée mais ne rejoint aucun système partagé." },
  { axisX: "Centralisation", axisY: "Ventes", level: "critical", score: 1.5, scenario: "Aucun CRM structuré. Les données client sont éparpillées entre les emails et méthodes individuelles de chaque vendeur." },
  { axisX: "Analyse", axisY: "Ventes", level: "critical", score: 1.0, scenario: "Aucune mesure de satisfaction client. « On ne sait pas si le client est satisfait. On ne questionne pas sur leur satisfaction. »" },
  { axisX: "Exploitation", axisY: "Ventes", level: "critical", score: 1.0, scenario: "Les irritants clients remontent par mail et plaintes mais ne sont jamais transformés en actions structurelles d'amélioration." },

  // Production
  { axisX: "Collecte", axisY: "Production", level: "critical", score: 1.5, scenario: "Les problèmes générant des retours clients ne sont pas formalisés. La production n'a pas visibilité sur les plaintes clients." },
  { axisX: "Centralisation", axisY: "Production", level: "critical", score: 1.0, scenario: "Aucun lien entre les données de production et les retours clients. Les spécifications d'emballage manquent systématiquement." },
  { axisX: "Analyse", axisY: "Production", level: "critical", score: 1.0, scenario: "Les opérations instables (torquer, dyno, emballage) sont connues empiriquement mais non analysées systématiquement vs impact client." },
  { axisX: "Exploitation", axisY: "Production", level: "critical", score: 1.0, scenario: "Les informations client ne sont pas suffisantes pour comprendre l'impact de ce qui est produit. Aucune boucle de rétroaction." },

  // Ingénierie
  { axisX: "Collecte", axisY: "Ingénierie", level: "warning", score: 2.0, scenario: "Les problèmes clients sont connus (shaft, setup, fuite) mais collectés de manière informelle et non structurée." },
  { axisX: "Centralisation", axisY: "Ingénierie", level: "critical", score: 1.0, scenario: "Aucun système relie les retours terrain aux projets de conception. Les leçons apprises entre projets sont perdues." },
  { axisX: "Analyse", axisY: "Ingénierie", level: "critical", score: 1.5, scenario: "La distinction design/fabrication est intuitive. 6 améliorations citées au lieu de 3 car impossible de prioriser sans données." },
  { axisX: "Exploitation", axisY: "Ingénierie", level: "critical", score: 1.5, scenario: "L'innovation est pilotée par l'intuition technique, pas par des données client structurées." },

  // Shipping
  { axisX: "Collecte", axisY: "Shipping", level: "critical", score: 1.5, scenario: "Pas de moyen formel de savoir si le client est satisfait de la livraison. Aucun feedback structuré." },
  { axisX: "Centralisation", axisY: "Shipping", level: "critical", score: 1.0, scenario: "Les critères clients pour la livraison sont connus (emballage) mais non documentés dans un système." },
  { axisX: "Analyse", axisY: "Shipping", level: "critical", score: 1.0, scenario: "Les causes de retards (manque pièces, oubli commandes) sont connues mais non analysées pour prévention." },
  { axisX: "Exploitation", axisY: "Shipping", level: "critical", score: 1.0, scenario: "Les priorités clients sont communiquées par ordre de fabrication et courriels, pas par un processus structuré." },

  // Qualité
  { axisX: "Collecte", axisY: "Qualité", level: "warning", score: 2.0, scenario: "Les NC récurrentes (azote, huile) sont identifiées mais les informations contextuelles (conditions d'utilisation) manquent." },
  { axisX: "Centralisation", axisY: "Qualité", level: "critical", score: 1.5, scenario: "Les données qualité ne sont pas reliées aux données clients ni aux historiques de plaintes." },
  { axisX: "Analyse", axisY: "Qualité", level: "critical", score: 1.0, scenario: "Les contrôles qualité ne sont pas alignés aux CTQ clients. Certains contrôles n'apportent pas de valeur du point de vue client." },
  { axisX: "Exploitation", axisY: "Qualité", level: "critical", score: 1.0, scenario: "L'écart entre ce qui est contrôlé en interne et ce que le client considère critique est « mineur » selon le service — mais non mesuré." },
];

// --- Complaints / Plaintes Data ---
export interface ComplaintCategory {
  category: string;
  count: number;
  percentage: number;
  kanoClass: "Must-be" | "Performance" | "Attractive" | "Indifferent";
  severity: "critical" | "high" | "medium" | "low";
}

export const complaintsByType: ComplaintCategory[] = [
  { category: "Problème de Durabilité", count: 22, percentage: 25.0, kanoClass: "Must-be", severity: "critical" },
  { category: "Problème de « fitment »", count: 19, percentage: 21.6, kanoClass: "Must-be", severity: "critical" },
  { category: "État de Commande Non Conforme", count: 28, percentage: 31.8, kanoClass: "Must-be", severity: "high" },
  { category: "Problème d'Assemblage", count: 18, percentage: 20.5, kanoClass: "Must-be", severity: "high" },
  { category: "Insatisfaction Client", count: 1, percentage: 1.1, kanoClass: "Performance", severity: "medium" },
];

export const complaintsByProblem: { problem: string; count: number; kanoClass: string }[] = [
  { problem: "Erreur vente", count: 11, kanoClass: "Must-be" },
  { problem: "Assemblage NC", count: 10, kanoClass: "Must-be" },
  { problem: "Fuite d'huile", count: 8, kanoClass: "Must-be" },
  { problem: "Ressort non conforme", count: 8, kanoClass: "Must-be" },
  { problem: "Mauvais Composant", count: 8, kanoClass: "Must-be" },
  { problem: "Amortisseur brisé", count: 5, kanoClass: "Must-be" },
  { problem: "Assemblage Non conforme", count: 5, kanoClass: "Must-be" },
  { problem: "Composant endommagé", count: 4, kanoClass: "Performance" },
  { problem: "BOM NC", count: 3, kanoClass: "Performance" },
  { problem: "Composant manquant", count: 3, kanoClass: "Must-be" },
  { problem: "Bruit", count: 2, kanoClass: "Performance" },
  { problem: "Emballage NC", count: 2, kanoClass: "Performance" },
  { problem: "Précharge ressort incorrecte", count: 2, kanoClass: "Performance" },
];

export const complaintsBySourceType: { type: string; count: number; percentage: number }[] = [
  { type: "Technique", count: 66, percentage: 75.0 },
  { type: "Commande", count: 19, percentage: 21.6 },
  { type: "Satisfaction", count: 3, percentage: 3.4 },
];

// --- CTQ Metrics ---
export interface CTQMetric {
  id: string;
  name: string;
  categoryId: string;
  kpiMetric: string;
  targetValue: string;
  currentValue: string;
  unit: string;
  responsibleDepartment: string;
}

export const ctqMetrics: CTQMetric[] = [
  { id: "CTQ-0001", name: "Reliability", categoryId: "VOCAT-001", kpiMetric: "Failure rate", targetValue: "—", currentValue: "—", unit: "PPM", responsibleDepartment: "Quality / Engineering" },
  { id: "CTQ-0002", name: "Performance", categoryId: "VOCAT-002", kpiMetric: "Damping coefficient", targetValue: "—", currentValue: "—", unit: "—", responsibleDepartment: "Engineering" },
  { id: "CTQ-0003", name: "Delivery", categoryId: "VOCAT-003", kpiMetric: "Lead time", targetValue: "—", currentValue: "—", unit: "Days", responsibleDepartment: "Shipping" },
  { id: "CTQ-0004", name: "Order accuracy", categoryId: "VOCAT-004", kpiMetric: "Shipment error rate", targetValue: "—", currentValue: "—", unit: "%", responsibleDepartment: "Sales / Customer Service" },
  { id: "CTQ-0005", name: "Customer satisfaction", categoryId: "VOCAT-006", kpiMetric: "NPS", targetValue: "—", currentValue: "—", unit: "Score", responsibleDepartment: "Customer Service" },
  { id: "CTQ-0006", name: "Price / Cost of quality", categoryId: "VOCAT-005", kpiMetric: "Claim cost", targetValue: "—", currentValue: "—", unit: "$", responsibleDepartment: "Sales / Finance" },
];

// --- Kano Online Reviews Categorization ---
export interface KanoReviewCategory {
  attribute: string;
  kanoClass: "Must-be" | "Performance" | "Attractive" | "Indifferent";
  source: "Avis en ligne" | "Plaintes clients" | "Interviews";
  frequency: "Très fréquent" | "Fréquent" | "Occasionnel" | "Rare";
  sentiment: "Négatif" | "Mixte" | "Positif";
  description: string;
}

export const kanoReviewData: KanoReviewCategory[] = [
  { attribute: "Durabilité du produit", kanoClass: "Must-be", source: "Plaintes clients", frequency: "Très fréquent", sentiment: "Négatif", description: "Shaft cassé, body arraché — 25% des plaintes. Attente de base non satisfaite." },
  { attribute: "Conformité de la commande", kanoClass: "Must-be", source: "Plaintes clients", frequency: "Très fréquent", sentiment: "Négatif", description: "31.8% des plaintes liées à des erreurs de commande. Le client reçoit un produit différent de celui commandé." },
  { attribute: "Étanchéité (fuite d'huile)", kanoClass: "Must-be", source: "Plaintes clients", frequency: "Fréquent", sentiment: "Négatif", description: "9% des plaintes. Défaillance critique de qualité perçue comme inacceptable." },
  { attribute: "Fitment / Compatibilité", kanoClass: "Must-be", source: "Plaintes clients", frequency: "Très fréquent", sentiment: "Négatif", description: "21.6% des plaintes. Ressort NC, mauvais composant — le produit ne s'adapte pas au véhicule." },
  { attribute: "Performance amortissement", kanoClass: "Performance", source: "Avis en ligne", frequency: "Fréquent", sentiment: "Mixte", description: "Coefficient d'amortissement et setup. Les clients experts évaluent la performance sur terrain." },
  { attribute: "Esthétique / Couleur", kanoClass: "Attractive", source: "Avis en ligne", frequency: "Occasionnel", sentiment: "Mixte", description: "Couleur d'anodisation, apparence. Mentionné dans les améliorations souhaitées par l'ingénierie." },
  { attribute: "Support après-vente", kanoClass: "Performance", source: "Interviews", frequency: "Fréquent", sentiment: "Négatif", description: "Délai de traitement des plaintes non défini. Aucun SLA. Le client subit des temps de réponse imprévisibles." },
  { attribute: "Délai de livraison", kanoClass: "Performance", source: "Interviews", frequency: "Fréquent", sentiment: "Négatif", description: "Identifié comme point de perte de valeur par la production. Manque de pièces, oubli de commandes." },
  { attribute: "Documentation technique", kanoClass: "Attractive", source: "Avis en ligne", frequency: "Occasionnel", sentiment: "Mixte", description: "Les clients mentionnent le besoin de guides de setup. Mauvais setup = plainte la plus rapportée à l'ingénierie." },
  { attribute: "Emballage", kanoClass: "Must-be", source: "Interviews", frequency: "Occasionnel", sentiment: "Négatif", description: "Spécifications d'emballage manquantes selon production. Composants endommagés en transit." },
];
