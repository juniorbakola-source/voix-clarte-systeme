import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Trophy } from "lucide-react";
import { departments, gameLevels, oePillars, oeSlides, scoreboardTeams, scoreRules, totalTeamScore } from "@/data/operationalExcellenceData";

export default function Module7ExcellenceOperationnelle() {
  const [current, setCurrent] = useState(0);
  const [checked, setChecked] = useState<number[]>([0, 1]);
  const slide = oeSlides[current];
  const progress = ((current + 1) / oeSlides.length) * 100;
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
              <span className="text-xs text-[hsl(var(--primary-foreground))]/45">{current + 1} / {oeSlides.length}</span>
              <button onClick={() => setCurrent((value) => Math.min(oeSlides.length - 1, value + 1))} className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))] transition hover:opacity-90" aria-label="Slide suivante">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="consulting-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[hsl(var(--elka-red))]">The OE Game</p>
          <h3 className="section-title mb-4 text-2xl">The Bite System</h3>
          <div className="mb-5 flex items-end gap-3">
            <span className="score-display text-6xl text-[hsl(var(--elka-red))]">{score}</span>
            <span className="pb-2 text-sm text-muted-foreground">/ 100 points</span>
          </div>
          <div className="space-y-2">
            {gameLevels.map((rule, index) => (
              <button key={rule.title} onClick={() => toggleRule(index)} className="flex w-full items-center justify-between rounded-md border border-[hsl(var(--border))] bg-card px-4 py-3 text-left transition hover:bg-secondary">
                <span>
                  <span className="block text-sm font-semibold">{rule.title}</span>
                  <span className="block text-xs text-muted-foreground">{rule.level} · {rule.mission}</span>
                </span>
                <span className={`rounded px-2 py-1 text-xs font-bold ${checked.includes(index) ? "bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "bg-secondary text-secondary-foreground"}`}>+{rule.points}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="consulting-card">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Dashboard live projeté</p>
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
