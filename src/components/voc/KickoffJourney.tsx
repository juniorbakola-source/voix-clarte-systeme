import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Compass, Factory, Flame, Gauge,
  HeartHandshake, Layers, Lightbulb, Map as MapIcon, Pencil, RotateCcw, Rocket, Save, Settings2,
  ShieldCheck, Sparkles, Target, TrendingUp, Users, Wrench,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuizExcellence from "@/components/voc/QuizExcellence";

const STORAGE_KEY = "kickoff-journey-edits-v1";

/* =========================================================================
   KickoffJourney — 9 actes guidés alignés sur le PPT « Kick-off OE »
   Philosophie : Curiosité → Compréhension → Confiance → Action
   Progressive disclosure : 1 acte = 1 écran focus, micro-interaction par acte.
   ========================================================================= */

type Act = {
  id: string;
  step: number;
  eyebrow: string;
  title: string;
  promise: string;
  emotion: "curiosité" | "compréhension" | "confiance" | "action";
  icon: typeof Compass;
};

const ACTS: Act[] = [
  { id: "ouverture", step: 1, eyebrow: "Acte 1 · Ouverture", title: "Nous lançons un mouvement", promise: "Voir le coût réel de l'invisible.", emotion: "curiosité", icon: Flame },
  { id: "pourquoi", step: 2, eyebrow: "Acte 2 · Le Pourquoi", title: "Stratégique · Opérationnel · Humain", promise: "Trois niveaux. Une seule vérité.", emotion: "curiosité", icon: Compass },
  { id: "intentions", step: 3, eyebrow: "Acte 3 · Intentions", title: "Ce que nous visons, par rôle", promise: "Des objectifs nets, un engagement par niveau.", emotion: "compréhension", icon: Target },
  { id: "benefices", step: 4, eyebrow: "Acte 4 · Bénéfices", title: "Hard savings & Soft gains", promise: "Le gain devient tangible.", emotion: "compréhension", icon: TrendingUp },
  { id: "methodologie", step: 5, eyebrow: "Acte 5 · Comment", title: "Système OE & DMAIC", promise: "Une maison, un cycle, une discipline.", emotion: "compréhension", icon: Layers },
  { id: "roadmap", step: 6, eyebrow: "Acte 6 · Roadmap", title: "24 mois, 4 phases", promise: "Pas de big bang. Pilotes → extension.", emotion: "confiance", icon: MapIcon },
  { id: "outils", step: 7, eyebrow: "Acte 7 · Outils & Muda", title: "La boîte à outils OE", promise: "Le bon outil, au bon niveau, au bon moment.", emotion: "confiance", icon: Wrench },
  { id: "adkar", step: 8, eyebrow: "Acte 8 · Changement", title: "Diagnostic ADKAR", promise: "Où en êtes-vous, vraiment ?", emotion: "action", icon: HeartHandshake },
  { id: "engagement", step: 9, eyebrow: "Acte 9 · Engagement", title: "Charte & premières bouchées", promise: "Signez. Engagez. Démarrez.", emotion: "action", icon: Rocket },
];

const EMOTION_TONE: Record<Act["emotion"], string> = {
  "curiosité": "from-[hsl(var(--elka-red))]/30 to-transparent",
  "compréhension": "from-amber-500/25 to-transparent",
  "confiance": "from-emerald-500/20 to-transparent",
  "action": "from-sky-500/25 to-transparent",
};

/* ---------- Acte 1 : OUVERTURE ---------- */
function ActeOuverture() {
  const constats = [
    { icon: Gauge, label: "Défauts produit", value: "PPM élevé · COPQ caché", insight: "On paie deux fois : la non-qualité + la rework." },
    { icon: Settings2, label: "Instabilité ligne", value: "OEE < cible", insight: "Cycles variables, arrêts non planifiés." },
    { icon: Users, label: "Silos", value: "Délais inter-services", insight: "Le problème circule plus vite que la solution." },
    { icon: Layers, label: "Gaspillage", value: "7 Muda actifs", insight: "Surproduction, attente, transport, sur-traitement…" },
  ];
  return (
    <div className="space-y-6">
      <blockquote className="rounded-lg border-l-4 border-[hsl(var(--elka-red))] bg-card p-5 text-card-foreground shadow-sm">
        <p className="text-base italic leading-relaxed md:text-lg">
          « Aujourd'hui, nous ne lançons pas un projet. Nous lançons un mouvement.
          L'Excellence Opérationnelle n'est pas une option — c'est notre condition de survie et de croissance. »
        </p>
      </blockquote>
      <div className="grid gap-3 md:grid-cols-2">
        {constats.map((c) => (
          <div key={c.label} className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <c.icon className="h-4 w-4 text-[hsl(var(--elka-red))]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{c.label}</p>
            </div>
            <p className="mt-2 text-lg font-bold">{c.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.insight}</p>
          </div>
        ))}
      </div>
      <div className="rounded-md bg-[hsl(var(--elka-black))] p-4 text-[hsl(var(--primary-foreground))]">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Message clé</p>
        <p className="mt-1 text-sm">Nous ne sommes pas en train de mal faire. Nous pouvons faire mieux, ensemble, de manière systématique.</p>
      </div>
    </div>
  );
}

/* ---------- Acte 2 : POURQUOI (3 cartes flip) ---------- */
function ActePourquoi() {
  const niveaux = [
    { id: "strat", title: "Stratégique", q: "Pourquoi maintenant ?", a: "Pression concurrentielle, exigences clients OE, marge érodée par le gaspillage." },
    { id: "ope", title: "Opérationnel", q: "Pourquoi cette approche ?", a: "Les solutions ponctuelles ont échoué. Méthode structurée, reproductible, portée par les équipes." },
    { id: "hum", title: "Humain", q: "Pourquoi moi ?", a: "Ceux qui font le travail savent le mieux comment l'améliorer. L'OE libère leur expertise." },
  ];
  const [revealed, setRevealed] = useState<string[]>([]);
  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">Touchez chaque niveau pour révéler la réponse. Tant que le « pourquoi » n'est pas partagé, le « comment » ne tient pas.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {niveaux.map((n) => {
          const open = revealed.includes(n.id);
          return (
            <button
              key={n.id}
              onClick={() => setRevealed((p) => p.includes(n.id) ? p.filter((x) => x !== n.id) : [...p, n.id])}
              className={`relative min-h-[200px] overflow-hidden rounded-lg border p-5 text-left transition-all ${open ? "border-[hsl(var(--elka-red))] bg-card" : "border-border bg-secondary/40 hover:border-[hsl(var(--elka-red))]/50"}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">{n.title}</p>
              <h4 className="mt-2 text-lg font-bold">{n.q}</h4>
              <div className={`mt-3 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}>
                <p className="text-sm leading-relaxed text-foreground/85">{n.a}</p>
              </div>
              {!open && <p className="absolute bottom-4 left-5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Toucher pour révéler</p>}
            </button>
          );
        })}
      </div>
      <p className="rounded-md border-l-2 border-[hsl(var(--elka-red))] bg-secondary/50 p-3 text-sm italic">« On ne change pas parce qu'on a peur. On change parce qu'on a une vision claire de quelque chose de mieux. »</p>
    </div>
  );
}

/* ---------- Acte 3 : INTENTIONS (sliders objectifs + tabs rôles) ---------- */
function ActeIntentions() {
  const objectifs = [
    { label: "Cpk caractéristiques critiques", target: "> 1.33", base: 75 },
    { label: "OEE en 18 mois", target: "+15%", base: 60 },
    { label: "PPM interne en 12 mois", target: "÷ 2", base: 50 },
    { label: "Résolution inter-services", target: "< 48h", base: 40 },
    { label: "Opérateurs formés OE en 24 mois", target: "80%", base: 25 },
  ];
  const roles = [
    { id: "dir", label: "Direction", items: ["Visibilité & soutien actif", "Gemba walks mensuels", "Décisions rapides", "Communication récurrente"] },
    { id: "mid", label: "Middle Management", items: ["Exemplarité du changement", "20% du temps aux projets OE", "Accepter la remise en question"] },
    { id: "ope", label: "Opérationnels", items: ["Participer aux ateliers", "Signaler les problèmes (No Blame)", "Proposer des idées d'amélioration"] },
  ];
  const [tab, setTab] = useState("dir");
  const active = roles.find((r) => r.id === tab) ?? roles[0];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Intentions chiffrées</p>
        {objectifs.map((o) => (
          <div key={o.label} className="rounded-md border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">{o.label}</p>
              <span className="rounded bg-[hsl(var(--elka-red))]/15 px-2 py-0.5 text-xs font-bold text-[hsl(var(--elka-red))]">{o.target}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all" style={{ width: `${o.base}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Attentes par rôle</p>
        <div className="mb-3 flex gap-2">
          {roles.map((r) => (
            <button key={r.id} onClick={() => setTab(r.id)} className={`rounded-md px-3 py-2 text-xs font-bold transition ${tab === r.id ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
              {r.label}
            </button>
          ))}
        </div>
        <ul className="space-y-2">
          {active.items.map((it) => (
            <li key={it} className="flex items-start gap-2 rounded-md border border-border bg-card p-3 text-sm">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--elka-red))]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Acte 4 : BÉNÉFICES (calculateur ROI) ---------- */
function ActeBenefices() {
  const [ca, setCa] = useState(50);    // M$
  const [copq, setCopq] = useState(8); // % CA
  const gainCopq = ((ca * copq) / 100) * 0.3;
  const soft = [
    { icon: Sparkles, label: "Culture", text: "Du « feu quotidien » à la prévention systématique." },
    { icon: Users, label: "Engagement", text: "Reconnaissance des experts métiers, autonomie." },
    { icon: ShieldCheck, label: "Agilité", text: "Absorber les variations sans stress." },
    { icon: Factory, label: "Image", text: "Fournisseur préféré, audits simplifiés." },
  ];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Hard savings — simulateur</p>
        <h4 className="mt-1 text-lg font-bold">Quel gain réaliste sur 12 mois ?</h4>
        <label className="mt-4 block text-xs font-semibold">Chiffre d'affaires (M$) : <span className="text-[hsl(var(--elka-red))]">{ca}</span></label>
        <input type="range" min={5} max={300} value={ca} onChange={(e) => setCa(+e.target.value)} className="w-full accent-[hsl(var(--elka-red))]" />
        <label className="mt-3 block text-xs font-semibold">COPQ estimé (% CA) : <span className="text-[hsl(var(--elka-red))]">{copq}%</span></label>
        <input type="range" min={2} max={20} value={copq} onChange={(e) => setCopq(+e.target.value)} className="w-full accent-[hsl(var(--elka-red))]" />
        <div className="mt-5 rounded-md bg-[hsl(var(--elka-black))] p-4 text-[hsl(var(--primary-foreground))]">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Gain potentiel (-30% COPQ)</p>
          <p className="mt-1 text-3xl font-black">{gainCopq.toFixed(1)} M$ / an</p>
          <p className="mt-1 text-xs text-[hsl(var(--primary-foreground))]/65">Hypothèse cible programme : Qualité -30%, OEE +15%, WIP -20%, Lead Time -25%.</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Soft gains</p>
        <div className="grid gap-3">
          {soft.map((s) => (
            <div key={s.label} className="flex items-start gap-3 rounded-md border border-border bg-card p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--elka-red))]/10"><s.icon className="h-4 w-4 text-[hsl(var(--elka-red))]" /></div>
              <div><p className="text-sm font-semibold">{s.label}</p><p className="text-xs text-muted-foreground">{s.text}</p></div>
            </div>
          ))}
        </div>
        <p className="mt-3 rounded-md border-l-2 border-[hsl(var(--elka-red))] bg-secondary/50 p-3 text-xs italic">« L'OE, c'est passer d'une médecine curative à une médecine préventive. »</p>
      </div>
    </div>
  );
}

/* ---------- Acte 5 : MÉTHODOLOGIE (Maison OE + DMAIC) ---------- */
function ActeMethodologie() {
  const [phase, setPhase] = useState(0);
  const dmaic = [
    { letter: "D", name: "Define", outils: "Charter, VOC, SIPOC", livrable: "Problème quantifié, périmètre validé" },
    { letter: "M", name: "Measure", outils: "MSA, capabilité, baseline", livrable: "Données fiables, gap vs objectif" },
    { letter: "A", name: "Analyze", outils: "Ishikawa, 5 Why, FMEA", livrable: "Racines causes validées" },
    { letter: "I", name: "Improve", outils: "DOE, Poka-Yoke, SMED", livrable: "Solutions implémentées, gains mesurés" },
    { letter: "C", name: "Control", outils: "Plan de contrôle, SPC, audit", livrable: "Standard verrouillé, responsable identifié" },
  ];
  const piliers = ["Standardisation (SOS/JES)", "Résolution (PDCA/8D)", "Amélioration continue (Kaizen)", "Management visuel (Obeya)", "Talents (TWI)"];
  const fondations = ["5S / Sécurité", "TPM (Maintenance autonome)", "SMED / Flow / Pull", "Qualité intégrée (Poka-Yoke / Jidoka)"];
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border bg-card p-5">
        <div className="rounded-md bg-[hsl(var(--elka-red))] p-2 text-center text-xs font-black uppercase tracking-[0.22em] text-[hsl(var(--accent-foreground))]">Vision · Zéro défaut, Zéro perte</div>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Piliers fondamentaux</p>
        <div className="mt-2 grid gap-2 md:grid-cols-5">
          {piliers.map((p) => <div key={p} className="rounded-md border border-border bg-secondary/40 p-2 text-center text-xs font-semibold">{p}</div>)}
        </div>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Fondations</p>
        <div className="mt-2 grid gap-2 md:grid-cols-4">
          {fondations.map((f) => <div key={f} className="rounded-md border border-dashed border-border bg-card p-2 text-center text-xs">{f}</div>)}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Cycle DMAIC interactif</p>
        <div className="flex gap-1.5">
          {dmaic.map((d, i) => (
            <button key={d.letter} onClick={() => setPhase(i)} className={`flex-1 rounded-md py-3 text-center transition ${phase === i ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
              <p className="text-xl font-black">{d.letter}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider">{d.name}</p>
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-3 rounded-md border border-border bg-card p-4 md:grid-cols-2">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Outils</p><p className="mt-1 text-sm">{dmaic[phase].outils}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Livrable</p><p className="mt-1 text-sm">{dmaic[phase].livrable}</p></div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Acte 6 : ROADMAP 24 mois ---------- */
function ActeRoadmap() {
  const phases = [
    { name: "FONDATION", period: "M1–M3", focus: "Diagnostic, sélection pilotes, formation noyau dur", jalons: ["Audit initial", "2 lignes pilotes", "5 BB/GB formés"] },
    { name: "ACCÉLÉRATION", period: "M4–M9", focus: "Déploiement pilotes, premiers DMAIC, système visuel", jalons: ["5 projets DMAIC clôturés", "OEE +10%", "Obeya opérationnel"] },
    { name: "EXTENSION", period: "M10–M18", focus: "Roll-out global, supply chain, TWIs", jalons: ["80% lignes couvertes", "Autonomie équipes", "Certification"] },
    { name: "INSTITUTIONNALISATION", period: "M19–M24", focus: "Standardisation, audits, pérennisation", jalons: ["Système auto-entretenu", "Projets générés par les équipes"] },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="space-y-4">
      <div className="grid gap-2 md:grid-cols-4">
        {phases.map((p, i) => (
          <button key={p.name} onClick={() => setActive(i)} className={`rounded-md border p-3 text-left transition ${active === i ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/10" : "border-border bg-card hover:border-[hsl(var(--elka-red))]/40"}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{p.period}</p>
            <p className="mt-1 text-sm font-bold">{p.name}</p>
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Phase {active + 1} · {phases[active].period}</p>
        <h4 className="mt-1 text-xl font-bold">{phases[active].name}</h4>
        <p className="mt-2 text-sm text-muted-foreground">{phases[active].focus}</p>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Jalons clés</p>
        <ul className="mt-2 grid gap-2 md:grid-cols-3">
          {phases[active].jalons.map((j) => (
            <li key={j} className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--elka-red))]" /> {j}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Acte 7 : OUTILS & MUDA ---------- */
function ActeOutils() {
  const niveaux = [
    { level: "Quotidien", outils: ["Hoshin Kanri (catchball)", "Gemba walks", "Stand-up 5 min"] },
    { level: "Hebdomadaire", outils: ["Obeya meeting", "Revue KPI", "Actions correctives"] },
    { level: "Projet", outils: ["DMAIC", "A3", "VSM", "Spaghetti", "Time Study"] },
    { level: "Kaizen", outils: ["Blitz 3-5 jours", "Workshop ciblé"] },
    { level: "Formation", outils: ["TWI-JI", "TWI-JM", "TWI-JR"] },
  ];
  const muda = ["Surproduction", "Attente", "Transport", "Sur-traitement", "Stock", "Mouvements", "Défauts"];
  const [pris, setPris] = useState<string[]>([]);
  return (
    <div className="space-y-5">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        {niveaux.map((n) => (
          <div key={n.level} className="rounded-md border border-border bg-card p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--elka-red))]">{n.level}</p>
            <ul className="mt-2 space-y-1">
              {n.outils.map((o) => <li key={o} className="text-xs text-foreground/85">• {o}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-secondary/40 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Les 7 Muda — repérez ceux qui existent chez vous</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {muda.map((m) => {
            const on = pris.includes(m);
            return (
              <button key={m} onClick={() => setPris((p) => on ? p.filter((x) => x !== m) : [...p, m])} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${on ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "border-border bg-card hover:border-[hsl(var(--elka-red))]/50"}`}>
                {m}
              </button>
            );
          })}
        </div>
        {pris.length > 0 && <p className="mt-3 text-xs text-muted-foreground">{pris.length} gaspillage(s) identifié(s) — prêts à entrer dans un Kaizen.</p>}
      </div>
    </div>
  );
}

/* ---------- Acte 8 : ADKAR (diagnostic perso) ---------- */
function ActeAdkar() {
  const items = [
    { letter: "A", name: "Awareness", q: "Sais-je pourquoi le changement est nécessaire ?", lever: "Communication transparente, données choc, storytelling." },
    { letter: "D", name: "Desire", q: "Ai-je envie d'y participer ?", lever: "Implication précoce, reconnaissance, lien aux intérêts personnels." },
    { letter: "K", name: "Knowledge", q: "Sais-je comment faire ?", lever: "Formation structurée, coaching, manuels visuels." },
    { letter: "A", name: "Ability", q: "Suis-je capable de le faire au poste ?", lever: "Pratique encadrée, tolérance à l'erreur, autorisation de tester." },
    { letter: "R", name: "Reinforcement", q: "Vais-je persévérer ?", lever: "Suivi, célébration, intégration aux objectifs." },
  ];
  const [scores, setScores] = useState<number[]>(items.map(() => 3));
  const total = scores.reduce((a, b) => a + b, 0);
  const max = items.length * 5;
  return (
    <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="rounded-md border border-border bg-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[hsl(var(--elka-red))] text-sm font-black text-[hsl(var(--accent-foreground))]">{it.letter}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">{it.name}</p>
                <p className="text-xs text-muted-foreground">{it.q}</p>
              </div>
              <span className="text-lg font-black text-[hsl(var(--elka-red))]">{scores[i]}/5</span>
            </div>
            <input type="range" min={1} max={5} value={scores[i]} onChange={(e) => setScores((s) => s.map((v, j) => j === i ? +e.target.value : v))} className="mt-3 w-full accent-[hsl(var(--elka-red))]" />
            <p className="mt-2 text-xs italic text-foreground/70">Levier : {it.lever}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-[hsl(var(--elka-black))] p-5 text-[hsl(var(--primary-foreground))]">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Votre maturité au changement</p>
        <p className="mt-2 text-5xl font-black">{Math.round((total / max) * 100)}%</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[hsl(var(--primary-foreground))]/15">
          <div className="h-full bg-[hsl(var(--elka-red))] transition-all" style={{ width: `${(total / max) * 100}%` }} />
        </div>
        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary-foreground))]/60">Anticiper les résistances</p>
        <ul className="mt-2 space-y-2 text-xs">
          {[
            ["« On a déjà essayé »", "Cette fois, c'est un système avec soutien, ressources et suivi."],
            ["« On n'a pas le temps »", "80% du temps actuel est consommé par des problèmes récurrents."],
            ["« C'est une mode »", "Sponsor exécutif engagé, projets intégrés aux objectifs annuels."],
            ["« Ça créera des suppressions »", "L'OE vise la compétitivité ; les gains servent à investir."],
            ["« Ça ne marchera pas ici »", "Pilotes prouvés d'abord. Les résultats parleront."],
          ].map(([q, a]) => (
            <li key={q} className="rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/5 p-2">
              <p className="font-semibold">{q}</p>
              <p className="text-[hsl(var(--primary-foreground))]/70">{a}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------- Acte 9 : ENGAGEMENT (charte + actions + quiz) ---------- */
function ActeEngagement({ onFinish }: { onFinish: () => void }) {
  const charte = [
    "Respecter les standards une fois définis, ou les faire évoluer via le processus formel.",
    "Participer activement aux projets et ateliers qui me concernent.",
    "Signaler les problèmes immédiatement, sans attendre qu'ils s'aggravent.",
    "Suggérer au moins une idée d'amélioration par trimestre.",
    "Coacher et être coaché dans l'esprit du développement continu.",
  ];
  const actions = [
    { who: "Black Belt + Production", what: "Diagnostic approfondi des 2 lignes pilotes", when: "+2 sem." },
    { who: "Black Belt + RH", what: "Formation Green Belt — noyau dur (5 personnes)", when: "+1 mois" },
    { who: "Management + BB", what: "Mise en place de l'Obeya", when: "+3 sem." },
    { who: "Sponsor + BB", what: "Premier projet DMAIC lancé", when: "+1 mois" },
    { who: "Com + Direction", what: "Communication interne mensuelle", when: "Continu" },
  ];
  const [signed, setSigned] = useState<number[]>([]);
  const [name, setName] = useState("");
  const ready = signed.length === charte.length && name.trim().length > 1;
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Charte d'engagement collective</p>
        <ul className="mt-3 space-y-2">
          {charte.map((c, i) => {
            const on = signed.includes(i);
            return (
              <li key={i}>
                <button onClick={() => setSigned((p) => on ? p.filter((x) => x !== i) : [...p, i])} className={`flex w-full items-start gap-3 rounded-md border p-3 text-left text-sm transition ${on ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/10" : "border-border bg-secondary/40 hover:border-[hsl(var(--elka-red))]/50"}`}>
                  <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${on ? "text-[hsl(var(--elka-red))]" : "text-muted-foreground"}`} />
                  <span>{c}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Votre nom complet" className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[hsl(var(--elka-red))]" />
          <button
            disabled={!ready}
            onClick={() => { onFinish(); toast({ title: "Engagement enregistré", description: `Merci ${name}. La première bouchée commence demain.` }); }}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[hsl(var(--elka-red))] px-4 py-2 text-sm font-bold text-[hsl(var(--accent-foreground))] transition disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Rocket className="h-4 w-4" /> Je m'engage
          </button>
        </div>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Prochaines étapes immédiates</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {actions.map((a) => (
            <div key={a.what} className="rounded-md border border-border bg-card p-3">
              <p className="text-sm font-semibold">{a.what}</p>
              <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span>{a.who}</span>
                <span className="rounded bg-[hsl(var(--elka-red))]/15 px-2 py-0.5 font-bold text-[hsl(var(--elka-red))]">{a.when}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/30 p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">Validez vos acquis</p>
        <h4 className="mt-1 text-lg font-bold">Quiz final OE</h4>
        <div className="mt-3"><QuizExcellence /></div>
      </div>
    </div>
  );
}

/* ---------- Wrapper / orchestrateur ---------- */
export default function KickoffJourney() {
  const [step, setStep] = useState(0);
  const act = ACTS[step];
  const progress = useMemo(() => ((step + 1) / ACTS.length) * 100, [step]);
  const Icon = act.icon;

  const renderBody = () => {
    switch (act.id) {
      case "ouverture": return <ActeOuverture />;
      case "pourquoi": return <ActePourquoi />;
      case "intentions": return <ActeIntentions />;
      case "benefices": return <ActeBenefices />;
      case "methodologie": return <ActeMethodologie />;
      case "roadmap": return <ActeRoadmap />;
      case "outils": return <ActeOutils />;
      case "adkar": return <ActeAdkar />;
      case "engagement": return <ActeEngagement onFinish={() => setStep(0)} />;
      default: return null;
    }
  };

  return (
    <section className="space-y-5">
      {/* Stepper */}
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">Parcours guidé · Kick-off OE</p>
            <p className="text-sm font-bold">Acte {act.step}/9 — émotion : {act.emotion}</p>
          </div>
          <span className="text-xs font-bold text-[hsl(var(--elka-red))]">{Math.round(progress)}%</span>
        </div>
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {ACTS.map((a, i) => (
            <button key={a.id} onClick={() => setStep(i)} className={`shrink-0 rounded-md border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition ${i === step ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : i < step ? "border-[hsl(var(--elka-red))]/40 bg-[hsl(var(--elka-red))]/10 text-foreground" : "border-border bg-secondary/50 text-muted-foreground hover:border-[hsl(var(--elka-red))]/40"}`}>
              {a.step}
            </button>
          ))}
        </div>
      </div>

      {/* Hero acte */}
      <div className={`relative overflow-hidden rounded-lg border border-border bg-card p-6`}>
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${EMOTION_TONE[act.emotion]}`} />
        <div className="relative flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]"><Icon className="h-5 w-5" /></div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">{act.eyebrow}</p>
              <h3 className="mt-1 text-2xl font-black md:text-3xl">{act.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{act.promise}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-2 text-xs font-bold transition hover:bg-secondary disabled:opacity-40">
              <ArrowLeft className="h-3.5 w-3.5" /> Précédent
            </button>
            <button disabled={step === ACTS.length - 1} onClick={() => setStep((s) => Math.min(ACTS.length - 1, s + 1))} className="inline-flex items-center gap-1.5 rounded-md bg-[hsl(var(--elka-red))] px-3 py-2 text-xs font-bold text-[hsl(var(--accent-foreground))] transition hover:opacity-90 disabled:opacity-40">
              Suivant <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Corps de l'acte */}
      <div className="animate-reveal">{renderBody()}</div>

      {/* Footer nav */}
      <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
        <button disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-bold transition hover:bg-secondary disabled:opacity-40">
          <ArrowLeft className="h-4 w-4" /> Acte précédent
        </button>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground hidden md:block">Progressive disclosure · 1 acte = 1 décision</p>
        <button disabled={step === ACTS.length - 1} onClick={() => setStep((s) => Math.min(ACTS.length - 1, s + 1))} className="inline-flex items-center gap-2 rounded-md bg-[hsl(var(--elka-red))] px-3 py-2 text-xs font-bold text-[hsl(var(--accent-foreground))] transition hover:opacity-90 disabled:opacity-40">
          Acte suivant <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
