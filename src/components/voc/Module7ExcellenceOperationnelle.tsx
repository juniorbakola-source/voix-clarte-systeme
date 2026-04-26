import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Edit3, Expand, Eye, MapPin, Minimize2, Pause, Play, PlayCircle, Puzzle as PuzzleIcon, RotateCcw, Settings, Sparkles, Target, Trophy, Users, Zap } from "lucide-react";
import { comexBriefing, dashboardViews, departments, elephantPuzzlePieces, gameLevels, gamificationModes, immediateActions, oePillars, oeSlides, oeTools, roadmapPhases, scoreboardTeams, scoreRules, totalTeamScore } from "@/data/operationalExcellenceData";
import elephantHero from "@/assets/elephant-hero.png";
import AppleKeynote from "@/components/voc/AppleKeynote";
import sceneGlobal from "@/assets/elephant-scene1-global.jpg";
import sceneFragmented from "@/assets/elephant-scene2-fragmented.jpg";
import sceneDisappeared from "@/assets/elephant-scene3-disappeared.jpg";

const elephantNarrative = [
  {
    image: sceneGlobal,
    badge: "Scene 01",
    title: "Global Industrial Performance",
    caption: "Une performance forte, intacte, pleine de potentiel.",
    tone: "from-emerald-500/30 to-transparent",
  },
  {
    image: sceneFragmented,
    badge: "Scene 02",
    title: "Fragmented by Operational Issues",
    caption: "Pannes, défauts, instabilité, silos : la performance se fissure.",
    tone: "from-amber-500/35 to-transparent",
  },
  {
    image: sceneDisappeared,
    badge: "Scene 03",
    title: "Performance Has Disappeared",
    caption: "L'éléphant n'est plus là. Seul le produit reste — sans excellence.",
    tone: "from-rose-600/40 to-transparent",
  },
] as const;

function ElephantNarrativeStage() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const scene = elephantNarrative[index];

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % elephantNarrative.length), 4200);
    return () => window.clearTimeout(id);
  }, [index, playing]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-[hsl(var(--primary-foreground))]/12 bg-[hsl(var(--elka-black))]">
      <div className="relative aspect-[16/9] w-full">
        {elephantNarrative.map((s, i) => (
          <img
            key={s.badge}
            src={s.image}
            alt={s.title}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${scene.tone}`} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--elka-red))] animate-pulse" />
          {scene.badge} · L'éléphant ELKA
        </div>

        <button
          onClick={() => setPlaying((p) => !p)}
          className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:bg-black/60"
        >
          {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing ? "Pause" : "Play"}
        </button>

        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/65">Operational Excellence · Story</p>
          <h4 className="mt-1.5 text-2xl font-black leading-tight md:text-3xl">{scene.title}</h4>
          <p className="mt-2 max-w-2xl text-sm text-white/80">{scene.caption}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-white/10 bg-black/60 p-3">
        {elephantNarrative.map((s, i) => (
          <button
            key={s.badge}
            onClick={() => { setIndex(i); setPlaying(false); }}
            className={`group flex flex-1 items-center gap-3 rounded-lg border p-2 text-left transition ${i === index ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
          >
            <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-md">
              <img src={s.image} alt="" width={160} height={90} loading="lazy" className="h-full w-full object-cover" />
              {i !== index && <div className="absolute inset-0 bg-black/45" />}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">{s.badge}</p>
              <p className="truncate text-xs font-semibold text-white">{s.title}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

type EditableSlide = {
  act: string;
  kicker: string;
  title: string;
  words: string;
  script: string;
  visual: string;
};

const sceneByTitle: Record<string, { emoji: string; label: string; stat: string }> = {
  ELEPHANT: { emoji: "🐘", label: "Problème invisible", stat: "Silence" },
  "TOO BIG": { emoji: "⛰️", label: "Charge mentale", stat: "Complexité" },
  "WRONG APPROACH": { emoji: "⛔", label: "Transformation bloquée", stat: "Stop" },
  "ONE BITE": { emoji: "🍽️", label: "Action simple", stat: "1 bouchée" },
  REPEAT: { emoji: "🔁", label: "Répétition quotidienne", stat: "+1%" },
  PLAY: { emoji: "🎮", label: "Équipes engagées", stat: "Live" },
  TRACK: { emoji: "📊", label: "Pilotage visible", stat: "KPI" },
  "THE ELEPHANT IS GONE": { emoji: "🏁", label: "Impact collectif", stat: "Done" },
};

function DynamicSlideVisual({ slide, progress }: { slide: EditableSlide; progress: number }) {
  const scene = sceneByTitle[slide.title] ?? { emoji: "⚙️", label: slide.act, stat: slide.kicker };
  const isLight = slide.title === "ONE BITE";
  const pulseItems = [0, 1, 2, 3];

  return (
    <div className={`relative min-h-[300px] overflow-hidden rounded-lg border p-5 ${isLight ? "border-[hsl(var(--border))] bg-background text-foreground" : "border-[hsl(var(--primary-foreground))]/10 bg-[hsl(var(--elka-black))] text-[hsl(var(--primary-foreground))]"}`}>
      <div className="absolute inset-x-6 top-6 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.18em] opacity-55">
        <span>Visual live</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="flex min-h-[250px] items-center justify-center pt-8">
        <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-[hsl(var(--elka-red))]/35 bg-[hsl(var(--elka-red))]/10">
          <div className="absolute inset-3 rounded-full border border-[hsl(var(--elka-red))]/20 animate-pulse-ring" />
          {pulseItems.map((item) => (
            <span
              key={item}
              className="absolute h-3 w-3 rounded-full bg-[hsl(var(--elka-red))]"
              style={{
                left: `${18 + item * 21}%`,
                top: `${item % 2 === 0 ? 17 : 78}%`,
                opacity: 0.35 + item * 0.12,
              }}
            />
          ))}
          <div className="text-center">
            <div className="text-7xl" aria-hidden="true">{scene.emoji}</div>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">{scene.stat}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {["Vision", "Bouchée", "Discipline"].map((label, index) => (
          <div key={label} className="rounded-md border border-[hsl(var(--border))]/50 bg-card/80 p-3 text-card-foreground shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-700" style={{ width: `${Math.min(100, progress + index * 15)}%` }} />
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-sm font-semibold opacity-80">{scene.label}</p>
    </div>
  );
}

export default function Module7ExcellenceOperationnelle() {
  const [current, setCurrent] = useState(0);
  const [checked, setChecked] = useState<number[]>([0, 1]);
  const [editMode, setEditMode] = useState(false);
  const [audiencePulse, setAudiencePulse] = useState(68);
  const [activeView, setActiveView] = useState<string>(dashboardViews[0].id);
  const [activePhase, setActivePhase] = useState(0);
  const [activeTool, setActiveTool] = useState<number | null>(null);
  const [comexAnswered, setComexAnswered] = useState<number[]>([]);
  const [activeMode, setActiveMode] = useState<string>(gamificationModes[0].id);
  const [actionsTaken, setActionsTaken] = useState<number[]>([]);
  const [slides, setSlides] = useState<EditableSlide[]>(() => oeSlides.map((slide) => ({ ...slide })));
  const [takenPieces, setTakenPieces] = useState<number[]>([]);
  const [fullscreen, setFullscreen] = useState(false);
  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;
  const score = useMemo(() => checked.reduce((sum, index) => sum + scoreRules[index].points, 0), [checked]);
  const dashboard = dashboardViews.find((view) => view.id === activeView) ?? dashboardViews[0];
  const phase = roadmapPhases[activePhase];
  const mode = gamificationModes.find((item) => item.id === activeMode) ?? gamificationModes[0];

  const toggleRule = (index: number) => {
    setChecked((prev) => prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]);
  };

  const updateSlide = (field: keyof EditableSlide, value: string) => {
    setSlides((prev) => prev.map((item, index) => index === current ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--elka-black))] text-[hsl(var(--primary-foreground))] shadow-2xl">
        <div className="grid min-h-[620px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex flex-col justify-between p-6 md:p-10">
            <div className="absolute inset-x-0 top-0 h-1 bg-[hsl(var(--secondary))]">
              <div className="h-full bg-[hsl(var(--elka-red))] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="rounded border border-[hsl(var(--elka-red))]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--elka-red))]">{slide.kicker}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/50">Operational Excellence — The Bite System</span>
              </div>

              <div className="space-y-5 animate-reveal">
                {editMode ? (
                  <input
                    value={slide.title}
                    onChange={(event) => updateSlide("title", event.target.value)}
                    className="w-full border-0 bg-transparent p-0 text-5xl font-bold leading-none outline-none ring-0 placeholder:text-[hsl(var(--primary-foreground))]/30 md:text-7xl"
                    aria-label="Titre de slide"
                  />
                ) : (
                  <h2 className="max-w-4xl text-5xl font-bold leading-none md:text-7xl">{slide.title}</h2>
                )}
                {editMode ? (
                  <textarea
                    value={slide.words}
                    onChange={(event) => updateSlide("words", event.target.value)}
                    className="min-h-24 w-full resize-y rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 p-3 text-lg leading-relaxed outline-none focus:border-[hsl(var(--elka-red))] md:text-2xl"
                    aria-label="Message principal"
                  />
                ) : (
                  <p className="max-w-2xl text-lg leading-relaxed text-[hsl(var(--primary-foreground))]/72 md:text-2xl">{slide.words}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {oePillars.map((item) => (
                <div key={item.label} className="rounded-md border border-[hsl(var(--primary-foreground))]/12 bg-[hsl(var(--primary-foreground))]/6 p-4">
                  <item.icon className="mb-3 h-5 w-5 text-[hsl(var(--elka-red))]" />
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-xs text-[hsl(var(--primary-foreground))]/55">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-t border-[hsl(var(--primary-foreground))]/10 bg-[hsl(var(--elka-darkgray))] p-6 lg:border-l lg:border-t-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/45">Acte narratif</p>
                <p className="text-xl font-semibold">{slide.act}</p>
              </div>
              <button
                onClick={() => setEditMode((value) => !value)}
                className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-[hsl(var(--primary-foreground))]/14"
              >
                {editMode ? <Eye className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
                {editMode ? "Présenter" : "Éditer"}
              </button>
            </div>

            {current === 0 && (
              <div className="mb-5">
                <ElephantNarrativeStage />
              </div>
            )}
            <DynamicSlideVisual slide={slide} progress={progress} />

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[{ icon: Sparkles, label: "Wow", value: audiencePulse }, { icon: Users, label: "Énergie", value: audiencePulse + 9 }, { icon: Zap, label: "Action", value: score }].map((item) => (
                <button key={item.label} onClick={() => setAudiencePulse((value) => Math.min(100, value + 4))} className="rounded-md border border-[hsl(var(--primary-foreground))]/12 bg-[hsl(var(--primary-foreground))]/6 p-3 text-left transition hover:bg-[hsl(var(--primary-foreground))]/12">
                  <item.icon className="mb-2 h-4 w-4 text-[hsl(var(--elka-red))]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--primary-foreground))]/45">{item.label}</p>
                  <p className="score-display text-2xl">{Math.min(100, item.value)}%</p>
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              {editMode ? (
                <>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Script speaker éditable</span>
                    <textarea value={slide.script} onChange={(event) => updateSlide("script", event.target.value)} className="min-h-28 w-full resize-y rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 p-3 text-sm leading-relaxed outline-none focus:border-[hsl(var(--elka-red))]" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Image / ambiance éditable</span>
                    <textarea value={slide.visual} onChange={(event) => updateSlide("visual", event.target.value)} className="min-h-24 w-full resize-y rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 p-3 text-sm leading-relaxed outline-none focus:border-[hsl(var(--elka-red))]" />
                  </label>
                </>
              ) : (
                <>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Script speaker</p>
                    <p className="text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/75">{slide.script}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">Ambiance visuelle</p>
                    <p className="text-sm leading-relaxed text-[hsl(var(--primary-foreground))]/65">{slide.visual}</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <button onClick={() => setCurrent((value) => Math.max(0, value - 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 transition hover:bg-[hsl(var(--primary-foreground))]/14" aria-label="Slide précédente">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="flex max-w-[260px] gap-1 overflow-x-auto px-1">
                {slides.map((item, index) => (
                  <button key={`${item.title}-${index}`} onClick={() => setCurrent(index)} className={`h-2.5 w-8 shrink-0 rounded-full transition ${index === current ? "bg-[hsl(var(--elka-red))]" : "bg-[hsl(var(--primary-foreground))]/18"}`} aria-label={`Aller à la slide ${index + 1}`} />
                ))}
              </div>
              <button onClick={() => setCurrent((value) => Math.min(slides.length - 1, value + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))] transition hover:opacity-90" aria-label="Slide suivante">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      {/* Puzzle Éléphant — Industrie amortisseurs */}
      <section className="overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-gradient-to-br from-[hsl(var(--elka-black))] to-[hsl(var(--elka-darkgray))] text-[hsl(var(--primary-foreground))] shadow-2xl">
        <div className="grid lg:grid-cols-[1fr_0.85fr]">
          {/* Visualisation éléphant + puzzle */}
          <div className="relative p-6 md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--elka-red))]">L'éléphant industriel</p>
                <h3 className="mt-1 text-2xl font-bold md:text-3xl">Une bouchée à la fois</h3>
                <p className="mt-1 text-xs text-[hsl(var(--primary-foreground))]/60">Cliquez chaque pièce : le département prend sa part, l'éléphant disparaît.</p>
              </div>
              <button
                onClick={() => setTakenPieces([])}
                className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--primary-foreground))]/15 bg-[hsl(var(--primary-foreground))]/8 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] transition hover:bg-[hsl(var(--primary-foreground))]/14"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            </div>

            {/* Scène mobile/desktop : éléphant + pièces */}
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg bg-[hsl(var(--primary-foreground))]/5 ring-1 ring-[hsl(var(--primary-foreground))]/10">
              {/* Éléphant qui s'efface progressivement */}
              <img
                src={elephantHero}
                alt="Éléphant — métaphore du grand problème industriel"
                width={1024}
                height={768}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain p-6 transition-all duration-1000"
                style={{
                  opacity: Math.max(0, 1 - (takenPieces.length / elephantPuzzlePieces.length) * 1.05),
                  filter: `grayscale(${takenPieces.length * 12}%) blur(${takenPieces.length * 0.4}px)`,
                  transform: `scale(${1 - takenPieces.length * 0.02})`,
                }}
              />

              {/* Pièces de puzzle en surimpression */}
              {elephantPuzzlePieces.map((piece) => {
                const isTaken = takenPieces.includes(piece.id);
                return (
                  <button
                    key={piece.id}
                    onClick={() => setTakenPieces((prev) => prev.includes(piece.id) ? prev.filter((id) => id !== piece.id) : [...prev, piece.id])}
                    aria-label={`Prendre la part : ${piece.problem}`}
                    className={`group absolute flex flex-col items-center justify-center rounded-md border-2 p-1.5 text-center transition-all duration-500 ${
                      isTaken
                        ? "scale-90 border-[hsl(var(--elka-red))]/0 bg-transparent opacity-0 pointer-events-none"
                        : "border-[hsl(var(--elka-red))]/70 bg-[hsl(var(--elka-black))]/85 backdrop-blur-sm hover:scale-105 hover:border-[hsl(var(--elka-red))] hover:bg-[hsl(var(--elka-red))]/30 hover:shadow-lg"
                    }`}
                    style={{
                      left: `${piece.x}%`,
                      top: `${piece.y}%`,
                      width: `${piece.w}%`,
                      height: `${piece.h}%`,
                    }}
                  >
                    <span className="text-[8px] font-bold uppercase tracking-wider text-[hsl(var(--elka-red))] md:text-[9px]">{piece.owner}</span>
                    <span className="mt-0.5 line-clamp-2 text-[9px] font-semibold leading-tight text-[hsl(var(--primary-foreground))] md:text-[10px]">{piece.problem}</span>
                  </button>
                );
              })}

              {/* Message final quand tout est pris */}
              {takenPieces.length === elephantPuzzlePieces.length && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[hsl(var(--elka-black))]/95 p-6 text-center animate-reveal">
                  <Trophy className="mb-3 h-10 w-10 text-[hsl(var(--elka-red))]" />
                  <p className="text-xl font-bold md:text-2xl">L'éléphant a disparu.</p>
                  <p className="mt-2 max-w-xs text-sm text-[hsl(var(--primary-foreground))]/70">Personne ne l'a mangé seul. Chacun a pris sa part.</p>
                </div>
              )}
            </div>

            {/* Barre de progression */}
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-[hsl(var(--primary-foreground))]/60">
                <span>Bouchées prises</span>
                <span className="text-[hsl(var(--elka-red))]">{takenPieces.length} / {elephantPuzzlePieces.length}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[hsl(var(--primary-foreground))]/10">
                <div
                  className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-700"
                  style={{ width: `${(takenPieces.length / elephantPuzzlePieces.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Liste détaillée des pièces */}
          <aside className="border-t border-[hsl(var(--primary-foreground))]/10 bg-[hsl(var(--elka-black))]/60 p-6 lg:border-l lg:border-t-0">
            <div className="mb-4 flex items-center gap-2">
              <PuzzleIcon className="h-5 w-5 text-[hsl(var(--elka-red))]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/60">8 pièces · 8 départements</p>
            </div>
            <div className="max-h-[480px] space-y-2 overflow-y-auto pr-1">
              {elephantPuzzlePieces.map((piece) => {
                const isTaken = takenPieces.includes(piece.id);
                return (
                  <button
                    key={piece.id}
                    onClick={() => setTakenPieces((prev) => prev.includes(piece.id) ? prev.filter((id) => id !== piece.id) : [...prev, piece.id])}
                    className={`flex w-full items-start gap-3 rounded-md border p-3 text-left transition ${
                      isTaken
                        ? "border-[hsl(var(--elka-red))]/40 bg-[hsl(var(--elka-red))]/8 opacity-60"
                        : "border-[hsl(var(--primary-foreground))]/12 bg-[hsl(var(--primary-foreground))]/4 hover:border-[hsl(var(--elka-red))]/50 hover:bg-[hsl(var(--primary-foreground))]/8"
                    }`}
                  >
                    {isTaken
                      ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--elka-red))]" />
                      : <Target className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--primary-foreground))]/40" />}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`text-sm font-semibold ${isTaken ? "line-through text-[hsl(var(--primary-foreground))]/60" : "text-[hsl(var(--primary-foreground))]"}`}>{piece.problem}</p>
                        <span className="rounded bg-[hsl(var(--elka-red))]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[hsl(var(--elka-red))]">{piece.owner}</span>
                      </div>
                      <p className="mt-1 text-xs text-[hsl(var(--primary-foreground))]/55">🍽️ {piece.bite}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="consulting-card">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">The OE Game</p>
              <h3 className="section-title text-2xl">Mission board éditable</h3>
            </div>
            <PlayCircle className="h-8 w-8 text-[hsl(var(--elka-red))]" />
          </div>
          <div className="mb-5 flex items-end gap-3">
            <span className="score-display text-6xl text-[hsl(var(--elka-red))]">{score}</span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100 points</span>
          </div>
          <div className="space-y-2">
            {gameLevels.map((rule, index) => (
              <button key={rule.title} onClick={() => toggleRule(index)} className="flex w-full items-center justify-between rounded-md border border-[hsl(var(--border))] bg-card px-4 py-3 text-left transition hover:bg-secondary">
                <span className="flex items-start gap-3">
                  {checked.includes(index) ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-[hsl(var(--elka-red))]" /> : <Target className="mt-0.5 h-5 w-5 text-muted-foreground" />}
                  <span>
                    <span className="block text-sm font-semibold">{rule.title}</span>
                    <span className="block text-xs text-muted-foreground">{rule.level} · {rule.mission}</span>
                  </span>
                </span>
                <span className={`rounded px-2 py-1 text-xs font-bold ${checked.includes(index) ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "bg-secondary text-secondary-foreground"}`}>+{rule.points}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="consulting-card">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Dashboard live projeté</p>
              <h3 className="section-title text-2xl">Scoreboard équipes</h3>
            </div>
            <BarChart3 className="h-8 w-8 text-[hsl(var(--elka-red))]" />
          </div>
          <div className="mb-5 grid gap-3 md:grid-cols-2">
            {scoreboardTeams.map((team) => (
              <div key={team.team} className="rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold text-foreground">{team.team}</p>
                  <span className="score-display text-2xl text-[hsl(var(--elka-red))]">{totalTeamScore(team)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  <span>Clarté {team.clarity}</span><span>Action {team.action}</span><span>Impact {team.impact}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Traduction par département</p>
          <div className="grid gap-3 md:grid-cols-2">
            {departments.map((dept) => (
              <div key={dept.name} className="rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-4">
                <p className="mb-2 font-semibold text-foreground">{dept.name}</p>
                <p className="text-sm text-muted-foreground">Éléphant : <span className="font-medium text-foreground">{dept.elephant}</span></p>
                <p className="text-sm text-muted-foreground">Bouchée : <span className="font-medium text-foreground">{dept.bite}</span></p>
                <p className="mt-2 text-xs text-muted-foreground">KPI : {dept.kpi}</p>
                <p className="text-xs text-[hsl(var(--elka-red))]">Rituel : {dept.tool}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture OE — 8 outils interactifs */}
      <section className="consulting-card">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Architecture OE</p>
            <h3 className="section-title text-2xl">8 outils — Une chaîne de valeur</h3>
            <p className="mt-1 text-sm text-muted-foreground">Cliquez sur un outil pour révéler son pilote et ses connexions inter-départements.</p>
          </div>
          <Settings className="h-8 w-8 text-[hsl(var(--elka-red))]" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {oeTools.map((tool, index) => {
            const isActive = activeTool === index;
            return (
              <button
                key={tool.code}
                onClick={() => setActiveTool(isActive ? null : index)}
                className={`rounded-md border p-4 text-left transition ${isActive ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/8 shadow-md" : "border-[hsl(var(--border))] bg-card hover:border-[hsl(var(--elka-red))]/40"}`}
              >
                <tool.icon className={`mb-2 h-5 w-5 ${isActive ? "text-[hsl(var(--elka-red))]" : "text-muted-foreground"}`} />
                <p className="text-sm font-bold text-foreground">{tool.code}</p>
                <p className="text-xs text-muted-foreground">{tool.name}</p>
                {isActive && (
                  <div className="mt-3 space-y-1 border-t border-[hsl(var(--border))] pt-3 animate-reveal">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--elka-red))]">Pilote</p>
                    <p className="text-xs font-semibold">{tool.owner}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Connexions</p>
                    <p className="text-xs">{tool.link}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Dashboard SaaS — 4 vues */}
      <section className="consulting-card">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Dashboard SaaS live</p>
            <h3 className="section-title text-2xl">4 vues. 1 plateforme.</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {dashboardViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-semibold transition ${activeView === view.id ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "border border-[hsl(var(--border))] bg-card hover:bg-secondary"}`}
              >
                <view.icon className="h-3.5 w-3.5" />
                {view.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md border border-[hsl(var(--border))] bg-[hsl(var(--elka-black))] p-6 text-[hsl(var(--primary-foreground))]">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--primary-foreground))]/55">{dashboard.kpi}</p>
            <p className="score-display mt-3 text-7xl text-[hsl(var(--elka-red))]">{dashboard.value}</p>
            <p className="mt-2 text-sm text-[hsl(var(--primary-foreground))]/70">{dashboard.delta}</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-[hsl(var(--primary-foreground))]/12">
              <div className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-700" style={{ width: `${Math.min(100, parseInt(dashboard.value) || 75)}%` }} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {dashboard.metrics.map((metric) => (
              <div key={metric.label} className="rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{metric.label}</p>
                <p className="score-display mt-2 text-3xl text-foreground">{metric.value}</p>
                <p className="mt-1 text-xs font-semibold text-[hsl(var(--elka-red))]">{metric.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap 4 phases */}
      <section className="consulting-card">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Roadmap 0 → 12 mois</p>
            <h3 className="section-title text-2xl">De l'activation à la maturité</h3>
          </div>
          <MapPin className="h-8 w-8 text-[hsl(var(--elka-red))]" />
        </div>
        <div className="mb-5 grid gap-2 md:grid-cols-4">
          {roadmapPhases.map((item, index) => (
            <button
              key={item.phase}
              onClick={() => setActivePhase(index)}
              className={`rounded-md border p-3 text-left transition ${activePhase === index ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/8" : "border-[hsl(var(--border))] bg-card hover:bg-secondary"}`}
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">{item.phase}</p>
              <p className="mt-1 text-sm font-bold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.period}</p>
            </button>
          ))}
        </div>
        <div className="rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-5 animate-reveal">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-lg font-bold text-foreground">{phase.title} — {phase.focus}</p>
            <span className="rounded bg-[hsl(var(--elka-red))] px-3 py-1 text-xs font-bold text-[hsl(var(--accent-foreground))]">{phase.kpi}</span>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {phase.actions.map((action) => (
              <div key={action} className="flex items-start gap-2 rounded border border-[hsl(var(--border))] bg-card p-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--elka-red))]" />
                <p className="text-sm text-foreground">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Briefing COMEX */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="consulting-card">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Briefing COMEX</p>
          <h3 className="section-title mt-1 text-2xl">Réponses aux objections</h3>
          <div className="mt-5 space-y-2">
            {comexBriefing.objections.map((item, index) => {
              const open = comexAnswered.includes(index);
              return (
                <button
                  key={item.q}
                  onClick={() => setComexAnswered((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index])}
                  className="w-full rounded-md border border-[hsl(var(--border))] bg-card p-4 text-left transition hover:border-[hsl(var(--elka-red))]/40"
                >
                  <p className="flex items-center justify-between text-sm font-semibold text-foreground">
                    <span>« {item.q} »</span>
                    <span className="text-[hsl(var(--elka-red))]">{open ? "−" : "+"}</span>
                  </p>
                  {open && <p className="mt-2 text-sm text-muted-foreground animate-reveal">→ {item.a}</p>}
                </button>
              );
            })}
          </div>
        </div>
        <div className="consulting-card bg-[hsl(var(--elka-black))] text-[hsl(var(--primary-foreground))]">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Business case 12 mois</p>
          <h3 className="section-title mt-1 text-2xl text-[hsl(var(--primary-foreground))]">ROI consolidé</h3>
          <div className="mt-5 space-y-3">
            {comexBriefing.roi.map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-[hsl(var(--primary-foreground))]/10 pb-3 last:border-0">
                <p className="text-sm text-[hsl(var(--primary-foreground))]/70">{item.label}</p>
                <p className="score-display text-2xl text-[hsl(var(--elka-red))]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification interactive — QR / Kahoot / Puzzle / Scoring */}
      <section className="consulting-card">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">Système gamifié complet</p>
            <h3 className="section-title text-2xl">Réveiller l'auditoire en 4 modes</h3>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {gamificationModes.map((item) => {
            const isActive = activeMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMode(item.id)}
                className={`rounded-md border p-4 text-left transition ${isActive ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/8" : "border-[hsl(var(--border))] bg-card hover:border-[hsl(var(--elka-red))]/40"}`}
              >
                <item.icon className={`mb-2 h-6 w-6 ${isActive ? "text-[hsl(var(--elka-red))]" : "text-muted-foreground"}`} />
                <p className="text-sm font-bold text-foreground">{item.title}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[hsl(var(--elka-red))]">{item.metric}</p>
              </button>
            );
          })}
        </div>
        <div className="mt-5 rounded-md border border-[hsl(var(--border))] bg-secondary/40 p-5 animate-reveal">
          <p className="text-lg text-foreground">{mode.desc}</p>
        </div>
      </section>

      {/* Call-to-action final enrichi */}
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
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {immediateActions.map((action, index) => {
            const done = actionsTaken.includes(index);
            return (
              <button
                key={action.label}
                onClick={() => setActionsTaken((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index])}
                className={`flex items-start gap-3 rounded-md border p-4 text-left transition ${done ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))]/8" : "border-[hsl(var(--border))] bg-card hover:bg-secondary"}`}
              >
                {done ? <CheckCircle2 className="mt-0.5 h-5 w-5 text-[hsl(var(--elka-red))]" /> : <action.icon className="mt-0.5 h-5 w-5 text-muted-foreground" />}
                <div>
                  <p className="text-sm font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-[hsl(var(--elka-red))]">{action.deadline}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Keynote IA · Apple style</p>
          <h3 className="section-title mt-1 text-2xl">Générez vos slides d'excellence à la volée</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Storytelling exécutif minimal, transitions fluides, contenu éditable. Chaque slide est généré par Lovable AI.
          </p>
        </div>
        <AppleKeynote />
      </section>
    </div>
  );
}
