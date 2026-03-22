export interface Verbatim {
  id: string;
  department: "Production" | "Ventes" | "Ingénierie";
  question: string;
  response: string;
  context: string;
  needType: "Explicite" | "Latent" | "Critique";
  tag: "reactive" | "partial" | "indirect";
  interpretation: string;
}

export const verbatims: Verbatim[] = [
  // PRODUCTION
  {
    id: "prod-1",
    department: "Production",
    question: "Comment recevez-vous les plaintes clients liées à la qualité ?",
    response: "On reçoit les RMA par email, parfois c'est le vendeur qui nous appelle directement. Il n'y a pas vraiment de système formel. On traite au cas par cas, et souvent on découvre le problème quand la pièce revient sur la ligne.",
    context: "Responsable de production, 12 ans d'expérience",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Absence de processus structuré de captation des retours qualité. L'information client arrive de manière fragmentée et tardive, rendant impossible toute action préventive.",
  },
  {
    id: "prod-2",
    department: "Production",
    question: "Avez-vous accès aux données de satisfaction client ?",
    response: "Non, pas directement. On sait quand ça va mal parce qu'on reçoit plus de retours. Mais des données chiffrées, des scores, non. On n'a jamais vu de rapport de satisfaction structuré arriver jusqu'à nous.",
    context: "Superviseur qualité, équipe de 8 personnes",
    needType: "Latent",
    tag: "indirect",
    interpretation: "La production opère en aveugle par rapport à la perception client. Les signaux faibles sont ignorés jusqu'à ce qu'ils deviennent des problèmes visibles.",
  },
  {
    id: "prod-3",
    department: "Production",
    question: "Comment les retours clients influencent-ils vos processus ?",
    response: "Honnêtement, très peu. On ajuste quand il y a un RMA récurrent, mais c'est toujours en réaction. On n'a jamais modifié un processus de façon proactive suite à un feedback client. C'est plutôt l'ingénierie qui décide des changements.",
    context: "Chef d'équipe, secteur assemblage",
    needType: "Critique",
    tag: "reactive",
    interpretation: "La boucle de rétroaction client-production est quasi inexistante. Les améliorations ne sont pas pilotées par la voix du client mais par les contraintes internes.",
  },
  {
    id: "prod-4",
    department: "Production",
    question: "Existe-t-il un suivi des tendances de réclamations ?",
    response: "On a un fichier Excel avec les RMA de l'année, mais personne ne l'analyse vraiment en profondeur. On regarde les gros volumes, c'est tout. Les tendances, les corrélations avec les lots ou les fournisseurs, on n'a pas le temps pour ça.",
    context: "Coordinateur qualité",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Les données existent mais ne sont pas exploitées analytiquement. Le potentiel d'intelligence client est gaspillé par manque de ressources et de méthodologie.",
  },
  // VENTES
  {
    id: "vent-1",
    department: "Ventes",
    question: "Comment capturez-vous les besoins exprimés par les clients ?",
    response: "C'est principalement lors des appels et des visites. Je prends des notes dans mon carnet ou dans un email que j'envoie à mon directeur. Mais il n'y a pas de CRM structuré pour ça. Chaque vendeur a sa propre méthode.",
    context: "Représentant commercial senior, territoire Est",
    needType: "Critique",
    tag: "reactive",
    interpretation: "L'intelligence client est emprisonnée dans des silos individuels. La connaissance accumulée par chaque vendeur est invisible pour le reste de l'organisation.",
  },
  {
    id: "vent-2",
    department: "Ventes",
    question: "Les retours terrain remontent-ils jusqu'à l'ingénierie ?",
    response: "Rarement de manière formelle. Si je vois un problème récurrent, j'en parle au directeur technique lors d'un dîner ou d'une réunion informelle. Mais il n'y a pas de canal dédié. Parfois l'info se perd, c'est frustrant.",
    context: "Directeur commercial, 15 ans dans l'entreprise",
    needType: "Critique",
    tag: "reactive",
    interpretation: "Le transfert d'intelligence marché vers R&D repose sur des rencontres informelles. Les insights stratégiques sont tributaires du hasard des interactions sociales.",
  },
  {
    id: "vent-3",
    department: "Ventes",
    question: "Avez-vous une visibilité sur les raisons de perte de contrats ?",
    response: "On en discute parfois en réunion d'équipe, mais c'est anecdotique. On ne fait pas d'analyse systématique des pertes. On sait qu'on perd des contrats sur le prix ou les délais, mais on n'a pas de données précises pour le prouver.",
    context: "Gestionnaire de comptes clés",
    needType: "Latent",
    tag: "partial",
    interpretation: "L'absence d'analyse win/loss empêche l'organisation de comprendre ses véritables faiblesses compétitives. Les décisions stratégiques se font sur des impressions.",
  },
  {
    id: "vent-4",
    department: "Ventes",
    question: "Comment évaluez-vous la satisfaction de vos clients actuels ?",
    response: "Au feeling. Quand un client appelle souvent pour se plaindre, on sait que ça ne va pas. Mais on n'a pas d'enquête de satisfaction, pas de NPS. C'est quelque chose qu'on devrait faire, mais on n'a jamais pris le temps de mettre ça en place.",
    context: "Représentant commercial, territoire Ouest",
    needType: "Explicite",
    tag: "partial",
    interpretation: "La mesure de satisfaction est intuitive et non instrumentée. L'entreprise ne peut pas quantifier la loyauté client ni prédire l'attrition.",
  },
  // INGÉNIERIE
  {
    id: "ing-1",
    department: "Ingénierie",
    question: "Comment les exigences clients sont-elles intégrées dans la conception ?",
    response: "On reçoit un cahier des charges du client, parfois via les ventes, parfois directement. Mais c'est souvent incomplet. On doit interpréter beaucoup. Et une fois le projet lancé, les changements clients arrivent au fil de l'eau sans processus clair.",
    context: "Ingénieur conception, 8 ans d'expérience",
    needType: "Critique",
    tag: "partial",
    interpretation: "L'ingénierie travaille avec des spécifications incomplètes et des changements non maîtrisés. Le risque de divergence entre le produit livré et le besoin réel est élevé.",
  },
  {
    id: "ing-2",
    department: "Ingénierie",
    question: "Avez-vous accès aux retours de terrain après livraison ?",
    response: "Très rarement. On apprend qu'il y a eu un problème quand on nous demande de modifier un design. Mais le lien entre le retour client original et notre intervention est souvent flou. On corrige sans toujours comprendre la cause racine côté client.",
    context: "Chef de projet technique",
    needType: "Latent",
    tag: "indirect",
    interpretation: "L'ingénierie est déconnectée de la réalité d'usage post-livraison. Les corrections sont apportées sans compréhension systémique du problème client.",
  },
  {
    id: "ing-3",
    department: "Ingénierie",
    question: "Comment anticipez-vous les besoins futurs du marché ?",
    response: "On fait de la veille technologique, on va aux salons. Mais pour les besoins clients spécifiques, on n'a pas de mécanisme structuré. On se fie aux tendances générales et à ce que les ventes nous remontent occasionnellement.",
    context: "Directeur R&D",
    needType: "Latent",
    tag: "indirect",
    interpretation: "L'innovation est déconnectée de l'intelligence client. La R&D innove par intuition technologique plutôt que par compréhension des besoins émergents du marché.",
  },
  {
    id: "ing-4",
    department: "Ingénierie",
    question: "Participez-vous aux discussions avec les clients ?",
    response: "Parfois pour les projets complexes, on est invité aux réunions de lancement. Mais c'est l'exception. Normalement, c'est les ventes qui gèrent la relation. On aimerait avoir plus de contact direct pour mieux comprendre l'utilisation réelle de nos produits.",
    context: "Ingénieur d'application",
    needType: "Explicite",
    tag: "partial",
    interpretation: "Le cloisonnement organisationnel prive l'ingénierie du contact direct avec l'utilisateur final, réduisant sa capacité à concevoir des solutions véritablement adaptées.",
  },
];

export interface MaturityScore {
  department: "Ventes" | "Ingénierie" | "Production";
  collecte: number;
  centralisation: number;
  analyse: number;
  exploitation: number;
  score: number;
  justification: string;
}

export const maturityScores: MaturityScore[] = [
  {
    department: "Ventes",
    collecte: 2.5,
    centralisation: 1.5,
    analyse: 1.0,
    exploitation: 1.5,
    score: 1.6,
    justification: "La collecte est active mais individuelle et non structurée. Aucune centralisation ni analyse systématique. L'exploitation des données clients est quasi inexistante.",
  },
  {
    department: "Production",
    collecte: 2.0,
    centralisation: 1.5,
    analyse: 1.0,
    exploitation: 1.0,
    score: 1.4,
    justification: "Les retours arrivent principalement via les RMA. Pas de visibilité sur la satisfaction. L'analyse se limite au comptage. Aucune boucle d'amélioration proactive.",
  },
  {
    department: "Ingénierie",
    collecte: 1.5,
    centralisation: 1.0,
    analyse: 1.5,
    exploitation: 1.5,
    score: 1.4,
    justification: "Faible exposition directe aux clients. Les informations arrivent filtrées et incomplètes. La veille technologique ne compense pas l'absence d'intelligence client.",
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
    source: "Appels clients",
    description: "Ventes → Organisation",
    status: "weak",
    detail: "Les notes d'appels restent dans les carnets individuels des vendeurs. Aucune saisie structurée dans un système partagé.",
    verbatimRef: "vent-1",
  },
  {
    id: "flux-2",
    source: "RMA",
    description: "Production / Qualité → Ingénierie",
    status: "partial",
    detail: "Les RMA sont enregistrés dans un fichier Excel mais l'analyse des causes racines n'est pas systématique. Le lien avec l'ingénierie est occasionnel.",
    verbatimRef: "prod-4",
  },
  {
    id: "flux-3",
    source: "Emails clients",
    description: "Ventes → Production",
    status: "disconnected",
    detail: "Les emails contenant des informations clients critiques ne sont pas transférés de manière systématique. L'information reste dans les boîtes individuelles.",
    verbatimRef: "vent-2",
  },
  {
    id: "flux-4",
    source: "Feedback distributeurs",
    description: "Ventes → Direction",
    status: "weak",
    detail: "Les retours des distributeurs remontent de manière informelle lors de réunions commerciales. Pas de processus de collecte dédié.",
    verbatimRef: "vent-3",
  },
  {
    id: "flux-5",
    source: "Validation technique",
    description: "Ingénierie → Client",
    status: "partial",
    detail: "Les validations techniques se font en direct sur les projets complexes uniquement. Pour les projets standards, l'ingénierie travaille sans retour client.",
    verbatimRef: "ing-4",
  },
];

export interface HeatmapCell {
  axisX: "Collecte" | "Centralisation" | "Analyse" | "Exploitation";
  axisY: "Ventes" | "Production" | "Ingénierie";
  level: "critical" | "warning" | "ok" | "low";
  score: number;
  scenario: string;
}

export const heatmapData: HeatmapCell[] = [
  { axisX: "Collecte", axisY: "Ventes", level: "warning", score: 2.5, scenario: "Les vendeurs captent des insights riches mais les stockent dans leurs carnets personnels. Un vendeur senior qui quitte l'entreprise emporte avec lui 15 ans de connaissance client." },
  { axisX: "Centralisation", axisY: "Ventes", level: "critical", score: 1.5, scenario: "Aucun CRM structuré. Chaque vendeur a sa propre méthode de stockage. L'intelligence collective n'existe pas." },
  { axisX: "Analyse", axisY: "Ventes", level: "critical", score: 1.0, scenario: "Aucune analyse systématique des win/loss. L'entreprise ne sait pas précisément pourquoi elle perd des contrats." },
  { axisX: "Exploitation", axisY: "Ventes", level: "critical", score: 1.5, scenario: "Les insights commerciaux ne se transforment jamais en actions produit. Un client demande une fonctionnalité 3 fois avant qu'elle soit considérée." },

  { axisX: "Collecte", axisY: "Production", level: "warning", score: 2.0, scenario: "Les RMA sont collectés mais les informations contextuelles (conditions d'utilisation, environnement) sont rarement documentées." },
  { axisX: "Centralisation", axisY: "Production", level: "critical", score: 1.5, scenario: "Un fichier Excel unique contient les RMA mais n'est pas relié aux données de production ni aux historiques clients." },
  { axisX: "Analyse", axisY: "Production", level: "critical", score: 1.0, scenario: "Les tendances de réclamations ne sont pas analysées. Un défaut récurrent sur un composant spécifique peut passer inaperçu pendant des mois." },
  { axisX: "Exploitation", axisY: "Production", level: "critical", score: 1.0, scenario: "Les processus de production ne sont jamais modifiés sur la base de retours clients. Les ajustements sont purement réactifs." },

  { axisX: "Collecte", axisY: "Ingénierie", level: "critical", score: 1.5, scenario: "L'ingénierie n'a pas d'accès direct aux retours clients. Les spécifications arrivent filtrées et souvent incomplètes." },
  { axisX: "Centralisation", axisY: "Ingénierie", level: "critical", score: 1.0, scenario: "Aucun système ne relie les retours terrain aux projets de conception. Les leçons apprises sont perdues entre les projets." },
  { axisX: "Analyse", axisY: "Ingénierie", level: "critical", score: 1.5, scenario: "La veille se limite aux tendances technologiques. Les besoins émergents des clients ne sont pas cartographiés." },
  { axisX: "Exploitation", axisY: "Ingénierie", level: "critical", score: 1.5, scenario: "L'innovation est pilotée par la technologie, pas par le marché. Un produit techniquement excellent peut rater sa cible commerciale." },
];
