import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Gauge, Target, Trophy, Users } from "lucide-react";

const acts = ["Tension", "Reconnaissance", "Révélation", "Contrôle", "Engagement", "Impact"] as const;

const slides = [
  {
    act: "Tension",
    kicker: "ACTE 1",
    title: "Silence.",
    words: "Avant de parler d'excellence, faisons une pause.",
    script: "Regardez la salle. Pause 5 secondes. Puis dites calmement : “Chaque jour, on vous demande l'impossible.”",
    visual: "Fond noir, un seul mot. Aucun graphique. Le malaise est volontaire.",
  },
  {
    act: "Tension",
    kicker: "PROBLÈME",
    title: "Trop grand.",
    words: "Trop ambitieux. Trop complexe. Trop rapide. Trop loin du terrain.",
    script: "“On appelle ça Operational Excellence. Mais souvent, le terrain entend : encore un programme.”",
    visual: "Quatre mots qui apparaissent comme des contraintes système.",
  },
  {
    act: "Reconnaissance",
    kicker: "MIROIR INDUSTRIEL",
    title: "Ça vous parle.",
    words: "Défauts amortisseurs. Arrêts machines. FMEA ouverte. Fournisseurs variables. Prévisions instables. Coûts cachés.",
    script: "Ton direct : “Ce n'est pas théorique. C'est Production, Qualité, Ingénierie, Achats, Ventes et Finance dans la même journée.”",
    visual: "Six départements en tension autour d'une même perte de performance.",
  },
  {
    act: "Révélation",
    kicker: "RÉVÉLATION",
    title: "L'éléphant.",
    words: "On essaie de manger l'éléphant en une seule fois.",
    script: "Pause. “Voilà pourquoi l'OE échoue. Pas parce que les équipes résistent. Parce que la transformation est servie trop grosse.”",
    visual: "L'éléphant devient le symbole de la transformation globale.",
  },
  {
    act: "Révélation",
    kicker: "SHIFT MENTAL",
    title: "Une bouchée.",
    words: "On ne mange pas l'éléphant. On prend une bouchée. Chaque jour.",
    script: "Répétez lentement : “Une bouchée. Une action. Un standard. Un progrès.”",
    visual: "La complexité se réduit en geste quotidien maîtrisable.",
  },
  {
    act: "Contrôle",
    kicker: "SYSTÈME OE",
    title: "Vision → Actions",
    words: "Vision globale → Chantiers → Actions terrain → Suivi quotidien → Discipline.",
    script: "“L'OE n'est pas un projet. C'est le système qui transforme les grandes ambitions en routines visibles.”",
    visual: "Chaîne simple, lisible, actionnable.",
  },
  {
    act: "Contrôle",
    kicker: "3 PILIERS",
    title: "Clarté. Discipline. Engagement.",
    words: "Objectifs visibles. Routines quotidiennes. Ownership terrain.",
    script: "“Sans clarté, chacun optimise son silo. Sans discipline, l'amélioration s'évapore. Sans engagement, le système reste PowerPoint.”",
    visual: "Trois piliers sobres comme une architecture de management.",
  },
  {
    act: "Contrôle",
    kicker: "1% PAR JOUR",
    title: "Petit ≠ faible.",
    words: "1% d'amélioration par jour crée une transformation radicale à long terme.",
    script: "“La puissance n'est pas dans l'intensité du lancement. Elle est dans la répétition.”",
    visual: "Courbe de progrès cumulatif, minimaliste.",
  },
  {
    act: "Engagement",
    kicker: "GAMIFICATION LIVE",
    title: "Votre éléphant.",
    words: "En équipe : 1 éléphant réel, 3 chantiers, 5 bouchées, 1 owner, 24 heures.",
    script: "“Maintenant, on arrête d'écouter. On agit. Quelle est votre première bouchée aujourd'hui ?”",
    visual: "Atelier compétitif, score visible, feedback immédiat.",
  },
  {
    act: "Impact",
    kicker: "CONCLUSION",
    title: "One bite at a time.",
    words: "L'excellence opérationnelle n'est pas un sprint. C'est une discipline quotidienne.",
    script: "Regard caméra / salle. Pause. “Et aujourd'hui, la première bouchée commence ici.”",
    visual: "Retour au noir. Message final mémorable.",
  },
] as const;

const departments = [
  { name: "Production", bite: "Réduire un arrêt machine récurrent", kpi: "OEE / temps d'arrêt", tool: "Rituel QRQC quotidien" },
  { name: "Qualité", bite: "Isoler un défaut amortisseur critique", kpi: "PPM / retours", tool: "CAPA + contrôle CTQ" },
  { name: "Ingénierie", bite: "Fermer une action FMEA prioritaire", kpi: "RPN / délai de clôture", tool: "Design review courte" },
  { name: "Achats", bite: "Stabiliser un fournisseur variable", kpi: "OTD / NC réception", tool: "Scorecard fournisseur" },
  { name: "Ventes & Marketing", bite: "Fiabiliser une prévision client", kpi: "Forecast accuracy", tool: "Revue S&OP" },
  { name: "Finance", bite: "Rendre visible un coût caché", kpi: "COPQ", tool: "Tableau coûts non-qualité" },
];

const scoreRules = [
  { label: "Éléphant réel identifié", points: 20 },
  { label: "3 chantiers structurants", points: 25 },
  { label: "5 actions terrain concrètes", points: 25 },
  { label: "Owner + échéance 24 h", points: 20 },
  { label: "KPI de suivi défini", points: 10 },
];

export default function Module7ExcellenceOperationnelle() {
  const [current, setCurrent] = useState(0);
  const [checked, setChecked] = useState<number[]>([0, 1]);
  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;
  const score = useMemo(() => checked.reduce((sum, index) => sum + scoreRules[index].points, 0), [checked]);

  const toggleRule = (index: number) => {
    setChecked((prev) => prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--elka-black))] text-[hsl(var(--primary-foreground))] shadow-2xl">
        <div className="grid min-h-[560px] lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative flex flex-col justify-between p-6 md:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-[hsl(var(--secondary))]">
              <div className="h-full bg-[hsl(var(--elka-red))] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded border border-[hsl(var(--elka-red))]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--elka-red))]">{slide.kicker}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/50">Operational Excellence World Class</span>
              </div>

              <div className="space-y-5">
                <h2 className="max-w-4xl text-5xl font-bold leading-none md:text-7xl">{slide.title}</h2>
                <p className="max-w-2xl text-lg leading-relaxed text-[hsl(var(--primary-foreground))]/72 md:text-2xl">{slide.words}</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: Target, label: "Clarté", text: "Priorités visibles" },
                { icon: Gauge, label: "Discipline", text: "Routines quotidiennes" },
                { icon: Users, label: "Engagement", text: "Ownership terrain" },
              ].map((item) => (
                <div key={item.label} className="rounded-md border border-[hsl(var(--primary-foreground))]/12 bg-[hsl(var(--primary-foreground))]/6 p-4">
                  <item.icon className="mb-3 h-5 w-5 text-[hsl(var(--elka-red))]" />
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-[hsl(var(--primary-foreground))]/55">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-t border-[hsl(var(--primary-foreground))]/10 bg-[hsl(var(--elka-darkgray))] p-6 lg:border-l lg:border-t-0">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/45">Acte narratif</p>
                <p className="text-xl font-semibold">{slide.act}</p>
              </div>
              <div className="text-5xl" aria-hidden="true">🐘</div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Script speaker</p>
                <p className="text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/75">{slide.script}</p>
              </div>
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Ambiance visuelle</p>
                <p className="text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/65">{slide.visual}</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
              <button onClick={() => setCurrent((value) => Math.max(0, value - 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 transition hover:bg-[hsl(var(--primary-foreground))]/14" aria-label="Slide précédente">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-xs text-[hsl(var(--primary-foreground))]/45">{current + 1} / {slides.length}</span>
              <button onClick={() => setCurrent((value) => Math.min(slides.length - 1, value + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))] transition hover:opacity-90" aria-label="Slide suivante">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="consulting-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Mécanique gamifiée</p>
          <h3 className="section-title mb-4 text-2xl">La première bouchée</h3>
          <div className="mb-5 flex items-end gap-3">
            <span className="score-display text-6xl text-[hsl(var(--elka-red))]">{score}</span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100 points</span>
          </div>
          <div className="space-y-2">
            {scoreRules.map((rule, index) => (
              <button key={rule.label} onClick={() => toggleRule(index)} className="flex w-full items-center justify-between rounded-md border border-[hsl(var(--border))] bg-card px-4 py-3 text-left transition hover:bg-secondary">
                <span className="text-sm font-medium">{rule.label}</span>
                <span className={`rounded px-2 py-1 text-xs font-bold ${checked.includes(index) ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "bg-secondary text-secondary-foreground"}`}>+{rule.points}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="consulting-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Traduction par département</p>
          <div className="grid gap-3 md:grid-cols-2">
            {departments.map((dept) => (
              <div key={dept.name} className="rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-4">
                <p className="mb-2 font-semibold text-foreground">{dept.name}</p>
                <p className="text-sm text-muted-foreground">Bouchée : <span className="font-medium text-foreground">{dept.bite}</span></p>
                <p className="mt-2 text-xs text-muted-foreground">KPI : {dept.kpi}</p>
                <p className="text-xs text-[hsl(var(--elka-red))]">Rituel : {dept.tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="consulting-card border-l-4 border-l-[hsl(var(--elka-red))]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Call-to-action final</p>
            <p className="section-title mt-2 text-2xl">Quelle est la première bouchée que vous allez prendre aujourd'hui ?</p>
          </div>
          <div className="flex items-center gap-3 rounded-md bg-[hsl(var(--elka-black))] px-5 py-4 text-[hsl(var(--primary-foreground))]">
            <Trophy className="h-5 w-5 text-[hsl(var(--elka-red))]" />
            <span className="text-sm font-semibold">Engagement visible sous 24 h</span>
          </div>
        </div>
      </section>
    </div>
  );
}
