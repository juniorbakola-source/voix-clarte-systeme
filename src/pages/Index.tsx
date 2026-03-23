import { useState } from "react";
import { AlertTriangle, Mic, Map, Target, Flame, Rocket } from "lucide-react";
import Module1 from "@/components/voc/Module1ChocExecutif";
import Module2 from "@/components/voc/Module2RealiteTerrain";
import Module3 from "@/components/voc/Module3Cartographie";
import Module4 from "@/components/voc/Module4Maturite";
import Module5 from "@/components/voc/Module5Lacunes";
import Module6 from "@/components/voc/Module6NextSteps";

const MODULES = [
  { id: 0, icon: AlertTriangle, label: "Choc exécutif", short: "Choc" },
  { id: 1, icon: Mic, label: "Réalité terrain", short: "Terrain" },
  { id: 2, icon: Map, label: "Cartographie", short: "Flux" },
  { id: 3, icon: Target, label: "Maturité", short: "Maturité" },
  { id: 4, icon: Flame, label: "Lacunes critiques", short: "Lacunes" },
  { id: 5, icon: Rocket, label: "Next Steps", short: "Next" },
] as const;

export default function Index() {
  const [active, setActive] = useState(0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-[hsl(var(--elka-red))] flex items-center justify-center text-white font-bold text-sm">E</div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">ELKA SUSPENSION</h1>
            </div>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-sidebar-foreground/40 mt-1">Voix du Client • Amortisseurs Haute Performance • WCM</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {MODULES.map(m => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`nav-item w-full ${active === m.id ? "nav-item-active" : "nav-item-inactive"}`}
              >
                <Icon size={16} />
                <span>{m.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[hsl(var(--elka-red))] animate-pulse" />
            <p className="text-[10px] text-sidebar-primary uppercase tracking-widest font-semibold">Système Actif</p>
          </div>
          <p className="text-[9px] text-sidebar-foreground/30 mt-1">
            {new Date().toLocaleDateString("fr-CA", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-sidebar border-t border-sidebar-border flex">
        {MODULES.map(m => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`flex-1 flex flex-col items-center py-2 gap-0.5 text-[10px] transition-colors ${
                active === m.id ? "text-sidebar-primary" : "text-sidebar-foreground/50"
              }`}
            >
              <Icon size={16} />
              {m.short}
            </button>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-4">
          <div className="flex items-center justify-between max-w-5xl">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Module {active + 1} / 6</p>
              <h2 className="section-title text-lg">{MODULES[active].label}</h2>
            </div>
            <div className="flex gap-1">
              {MODULES.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1 rounded-full transition-colors ${i <= active ? "bg-[hsl(var(--elka-red))]" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6 py-8">
          {active === 0 && <Module1 />}
          {active === 1 && <Module2 />}
          {active === 2 && <Module3 />}
          {active === 3 && <Module4 />}
          {active === 4 && <Module5 />}
          {active === 5 && <Module6 />}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-12 pt-6 border-t border-border">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground disabled:opacity-30 hover:bg-secondary/80 active:scale-[0.97] transition-all"
            >
              ← Précédent
            </button>
            <button
              onClick={() => setActive(Math.min(5, active + 1))}
              disabled={active === 5}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-[hsl(var(--elka-red))] text-white disabled:opacity-30 hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Suivant →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
