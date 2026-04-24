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