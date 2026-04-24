import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Edit3, Eye, MapPin, PlayCircle, Sparkles, Target, Trophy, Users, Zap } from "lucide-react";
import { comexBriefing, dashboardViews, departments, gameLevels, gamificationModes, immediateActions, oePillars, oeSlides, oeTools, roadmapPhases, scoreboardTeams, scoreRules, totalTeamScore } from "@/data/operationalExcellenceData";

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
