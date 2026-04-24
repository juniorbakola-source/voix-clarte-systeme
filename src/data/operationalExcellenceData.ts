import { Activity, Boxes, Gauge, Layers, LineChart, Puzzle, QrCode, Rocket, Settings, ShieldCheck, Sparkles, Target, Timer, Trophy, Users, Wrench } from "lucide-react";

export const oeSlides = [
  {
    act: "Tension",
    kicker: "OPENING",
    title: "ELEPHANT",
    words: "Voici votre problème.",
    script: "Ton calme. Regard salle. Dites : “Voici votre problème.” Pause longue. Ne remplissez pas le silence.",
    visual: "Fond noir total. Un seul mot massif. Aucun graphique. Le public doit sentir le poids avant de comprendre.",
  },
  {
    act: "Tension",
    kicker: "FRICTION",
    title: "TOO BIG",
    words: "Trop complexe. Trop lourd. Trop lent.",
    script: "“C'est ce que ressent le terrain quand on parle de transformation globale.” Pause courte. “Trop grand pour commencer.”",
    visual: "Trois fragments typographiques espacés, comme un système qui résiste.",
  },
  {
    act: "Révélation",
    kicker: "REVEAL",
    title: "WRONG APPROACH",
    words: "Vous essayez de tout changer… d'un coup.",
    script: "Ton plus direct : “Le problème n'est pas l'ambition. Le problème, c'est l'approche.”",
    visual: "Contraste brutal. Mot large, coupe nette, sentiment d'arrêt.",
  },
  {
    act: "Twist",
    kicker: "APPLE MOMENT",
    title: "ONE BITE",
    words: "Les organisations qui gagnent ne mangent pas l'éléphant. Elles prennent une bouchée.",
    script: "Passez au fond clair. Pause. “Vous n'avez pas besoin de plus de stratégie. Vous avez besoin de plus de bouchées.”",
    visual: "Slide blanc, minimal, respiration forte. Le twist devient évident.",
  },
  {
    act: "Système",
    kicker: "THE BITE SYSTEM",
    title: "REPEAT",
    words: "Small actions. Done daily. Change everything.",
    script: "“L'excellence opérationnelle n'est pas une transformation. C'est un système de répétition.”",
    visual: "Rythme propre, trois lignes courtes, progression calme vers l'action.",
  },
  {
    act: "Engagement",
    kicker: "THE OE GAME",
    title: "PLAY",
    words: "Chaque participant devient acteur. Chaque équipe choisit son éléphant réel.",
    script: "“Maintenant, on arrête d'observer. On joue pour transformer.” Lancez les équipes.",
    visual: "Interface projetée type app : progression, niveau, score, mission active.",
  },
  {
    act: "Exécution",
    kicker: "LIVE DASHBOARD",
    title: "TRACK",
    words: "Éléphant. Actions. Progression. Feedback immédiat.",
    script: "“Ce qui devient visible devient pilotable. Ce qui est piloté devient une habitude.”",
    visual: "Dashboard SaaS sombre, score live, missions, leaderboard, KPI temps réel.",
  },
  {
    act: "Impact final",
    kicker: "WOW MOMENT",
    title: "THE ELEPHANT IS GONE",
    words: "Personne n'a mangé l'éléphant. Mais tout le monde a pris une bouchée.",
    script: "Silence. Regard salle. Dites lentement : “Personne n'a mangé l'éléphant.” Pause. “Mais tout le monde a pris une bouchée.”",
    visual: "Retour au noir. Message final large, mémorable, presque cinématographique.",
  },
] as const;

export const oePillars = [
  { icon: Target, label: "Clarté", text: "Éléphant réel" },
  { icon: Gauge, label: "Répétition", text: "Bouchées quotidiennes" },
  { icon: Users, label: "Jeu collectif", text: "Équipes engagées" },
] as const;

export const gameLevels = [
  { level: "Niveau 1", title: "Identifier l'éléphant", mission: "Choisir un problème réel", score: "Clarté du problème", points: 25 },
  { level: "Niveau 2", title: "Découper", mission: "Transformer en 3 morceaux", score: "Structuration", points: 25 },
  { level: "Niveau 3", title: "Bouchées", mission: "Définir 5 actions concrètes", score: "Faisabilité", points: 25 },
  { level: "Niveau 4", title: "Exécution", mission: "Lancer 1 action immédiatement", score: "Engagement", points: 25 },
] as const;

export const scoreboardTeams = [
  { team: "Production", clarity: 22, action: 20, impact: 18 },
  { team: "Qualité", clarity: 24, action: 21, impact: 20 },
  { team: "Ingénierie", clarity: 19, action: 23, impact: 17 },
  { team: "Achats", clarity: 21, action: 18, impact: 19 },
] as const;

export const departments = [
  { name: "Production", elephant: "Arrêts machines récurrents", bite: "Isoler une cause d'arrêt", kpi: "OEE / temps d'arrêt", tool: "Rituel QRQC quotidien" },
  { name: "Qualité", elephant: "Défauts amortisseurs", bite: "Bloquer un défaut critique", kpi: "PPM / retours", tool: "CAPA + contrôle CTQ" },
  { name: "Ingénierie", elephant: "FMEA ouverte", bite: "Fermer un risque prioritaire", kpi: "RPN / délai de clôture", tool: "Design review courte" },
  { name: "Achats", elephant: "Variabilité fournisseurs", bite: "Sécuriser un fournisseur instable", kpi: "OTD / NC réception", tool: "Scorecard fournisseur" },
  { name: "Ventes & Marketing", elephant: "Prévisions instables", bite: "Fiabiliser une donnée client", kpi: "Forecast accuracy", tool: "Revue S&OP" },
  { name: "Finance", elephant: "Coûts cachés", bite: "Rendre visible un COPQ", kpi: "COPQ", tool: "Tableau coûts non-qualité" },
] as const;

export const scoreRules = gameLevels.map((level) => ({ label: level.title, points: level.points }));

export const totalTeamScore = (team: (typeof scoreboardTeams)[number]) => team.clarity + team.action + team.impact;

// 8 outils OE (Architecture)
export const oeTools = [
  { code: "OEE", name: "Overall Equipment Effectiveness", owner: "Production", icon: Gauge, link: "Qualité · Maintenance", color: "red" },
  { code: "Six Sigma", name: "Réduction variabilité défauts", owner: "Qualité", icon: ShieldCheck, link: "Ingénierie · Production", color: "red" },
  { code: "SPC", name: "Statistical Process Control", owner: "Qualité", icon: LineChart, link: "Production", color: "silver" },
  { code: "FMEA", name: "Analyse modes de défaillance", owner: "Ingénierie", icon: Target, link: "Qualité · Achats", color: "silver" },
  { code: "TPM", name: "Total Productive Maintenance", owner: "Maintenance", icon: Wrench, link: "Production", color: "red" },
  { code: "SMED", name: "Changement rapide d'outil", owner: "Production", icon: Timer, link: "Ingénierie", color: "silver" },
  { code: "S&OP", name: "Sales & Operations Planning", owner: "Ventes", icon: Activity, link: "Achats · Finance", color: "silver" },
  { code: "VSM", name: "Value Stream Mapping", owner: "Excellence Op.", icon: Layers, link: "Tous départements", color: "red" },
] as const;

// Dashboard SaaS — 4 vues
export const dashboardViews = [
  {
    id: "globale",
    label: "Vue Globale",
    icon: Sparkles,
    kpi: "OE Score",
    value: "72",
    delta: "+8 pts",
    metrics: [
      { label: "OEE moyen", value: "78%", trend: "+3" },
      { label: "PPM défauts", value: "320", trend: "-45" },
      { label: "Bouchées/jour", value: "47", trend: "+12" },
    ],
  },
  {
    id: "strategique",
    label: "Vue Stratégique (COMEX)",
    icon: Trophy,
    kpi: "ROI 12 mois",
    value: "3.4x",
    delta: "Plan tenu",
    metrics: [
      { label: "EBITDA impact", value: "+2.1 M€", trend: "↑" },
      { label: "COPQ", value: "-38%", trend: "↓" },
      { label: "OTD client", value: "94%", trend: "+6" },
    ],
  },
  {
    id: "operationnelle",
    label: "Vue Opérationnelle",
    icon: Settings,
    kpi: "Actions live",
    value: "126",
    delta: "82 closes",
    metrics: [
      { label: "QRQC ouverts", value: "14", trend: "-3" },
      { label: "FMEA closes", value: "61%", trend: "+9" },
      { label: "MTBF lignes", value: "42h", trend: "+5" },
    ],
  },
  {
    id: "gamification",
    label: "Vue Gamification",
    icon: Trophy,
    kpi: "Engagement",
    value: "88%",
    delta: "4 équipes",
    metrics: [
      { label: "Bouchées/équipe", value: "12", trend: "+4" },
      { label: "Niveau moyen", value: "3.2", trend: "+0.5" },
      { label: "Streak max", value: "21j", trend: "🔥" },
    ],
  },
] as const;

// Roadmap 4 phases (0-12 mois)
export const roadmapPhases = [
  {
    phase: "Phase 1",
    period: "Mois 0-2",
    title: "Activation",
    focus: "Quick wins + alignement COMEX",
    actions: ["Diagnostic VOC", "Sélection éléphants prioritaires", "Lancement rituels QRQC"],
    kpi: "3 quick wins visibles",
    color: "red",
  },
  {
    phase: "Phase 2",
    period: "Mois 3-5",
    title: "Structuration",
    focus: "Déploiement outils OE",
    actions: ["FMEA critiques", "SPC lignes pilotes", "Scorecard fournisseurs"],
    kpi: "OEE +5 pts",
    color: "silver",
  },
  {
    phase: "Phase 3",
    period: "Mois 6-9",
    title: "Accélération",
    focus: "Standardisation + gamification",
    actions: ["Dashboard live", "Battles inter-équipes", "S&OP mensuel"],
    kpi: "PPM -30%",
    color: "red",
  },
  {
    phase: "Phase 4",
    period: "Mois 10-12",
    title: "Maturité",
    focus: "Culture + ROI consolidé",
    actions: ["Audit OE world class", "Certification équipes", "Plan année N+1"],
    kpi: "ROI 3x atteint",
    color: "silver",
  },
] as const;

// Version COMEX — objections / réponses
export const comexBriefing = {
  roi: [
    { label: "Investissement total", value: "620 K€" },
    { label: "Gains nets 12 mois", value: "2.1 M€" },
    { label: "Payback", value: "4 mois" },
    { label: "Multiple ROI", value: "3.4x" },
  ],
  objections: [
    { q: "Encore une initiative ?", a: "Non — un système de répétition. Pas un programme." },
    { q: "Combien de temps avant impact ?", a: "Premiers gains visibles en 8 semaines via quick wins." },
    { q: "Charge supplémentaire pour le terrain ?", a: "15 min/jour de rituel. Remplace les réunions inutiles." },
    { q: "Et si ça ne marche pas ?", a: "Pilotage live + sortie en 90 jours si KPI non atteints." },
  ],
} as const;

// Gamification — QR / Kahoot / Puzzle
export const gamificationModes = [
  {
    id: "qr",
    title: "QR Code Engagement",
    icon: QrCode,
    desc: "Chaque participant scanne, choisit son éléphant, valide ses bouchées en live.",
    metric: "Activation < 30 sec",
  },
  {
    id: "kahoot",
    title: "Kahoot — 3 niveaux",
    icon: Rocket,
    desc: "Quiz progressif : Diagnostic → Outils OE → Application terrain.",
    metric: "15 questions · 20 min",
  },
  {
    id: "puzzle",
    title: "Puzzle par département",
    icon: Puzzle,
    desc: "Chaque équipe assemble son éléphant : pièces = bouchées concrètes.",
    metric: "6 puzzles · 6 départements",
  },
  {
    id: "scoring",
    title: "Scoring 100 points",
    icon: Trophy,
    desc: "Clarté 25 · Structuration 25 · Faisabilité 25 · Engagement 25.",
    metric: "Leaderboard live",
  },
] as const;

// Puzzle Éléphant — Problèmes industrie amortisseurs (8 pièces)
export const elephantPuzzlePieces = [
  { id: 1, problem: "Défauts amortisseurs", owner: "Qualité", bite: "Bloquer le défaut critique CTQ", x: 18, y: 20, w: 22, h: 28 },
  { id: 2, problem: "Arrêts ligne récurrents", owner: "Production", bite: "Isoler la cause racine #1", x: 40, y: 15, w: 24, h: 26 },
  { id: 3, problem: "Variabilité fournisseurs", owner: "Achats", bite: "Sécuriser 1 fournisseur instable", x: 64, y: 22, w: 22, h: 26 },
  { id: 4, problem: "FMEA non clôturée", owner: "Ingénierie", bite: "Fermer 1 risque prioritaire", x: 16, y: 48, w: 24, h: 26 },
  { id: 5, problem: "Forecast instable", owner: "Ventes", bite: "Fiabiliser 1 donnée client clé", x: 40, y: 41, w: 24, h: 28 },
  { id: 6, problem: "Coûts de non-qualité", owner: "Finance", bite: "Rendre visible 1 COPQ caché", x: 64, y: 48, w: 22, h: 26 },
  { id: 7, problem: "Maintenance réactive", owner: "Maintenance", bite: "Lancer 1 plan TPM pilote", x: 28, y: 69, w: 22, h: 22 },
  { id: 8, problem: "Silos inter-équipes", owner: "COMEX", bite: "Rituel hebdo cross-fonctionnel", x: 52, y: 69, w: 24, h: 22 },
] as const;

// Actions immédiates — Call to action final
export const immediateActions = [
  { icon: Target, label: "Identifier votre éléphant", deadline: "Aujourd'hui" },
  { icon: Boxes, label: "Définir 3 bouchées", deadline: "Cette semaine" },
  { icon: Users, label: "Embarquer votre équipe", deadline: "48 heures" },
] as const;