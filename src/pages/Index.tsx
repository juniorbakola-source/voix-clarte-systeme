import { useMemo, useState } from "react";
import Module1 from "@/components/voc/Module1ChocExecutif";
import Module2 from "@/components/voc/Module2RealiteTerrain";
import Module3 from "@/components/voc/Module3Cartographie";
import Module4 from "@/components/voc/Module4Maturite";
import Module5 from "@/components/voc/Module5Lacunes";
import Module6 from "@/components/voc/Module6NextSteps";
import Module7ExcellenceOperationnelle from "@/components/voc/Module7ExcellenceOperationnelle";

const modules = [
  { id: "choc", label: "Choc exécutif", eyebrow: "Diagnostic VOC", component: Module1 },
  { id: "terrain", label: "Réalité terrain", eyebrow: "Verbatim", component: Module2 },
  { id: "flux", label: "Cartographie des flux", eyebrow: "Système actuel", component: Module3 },
  { id: "maturite", label: "Évaluation de maturité", eyebrow: "Score VOC", component: Module4 },
  { id: "lacunes", label: "Lacunes critiques", eyebrow: "Heatmap", component: Module5 },
  { id: "next", label: "Next steps", eyebrow: "VOC Velocity", component: Module6 },
  { id: "oe", label: "Excellence Opérationnelle", eyebrow: "World Class", component: Module7ExcellenceOperationnelle },
] as const;

type ModuleId = typeof modules[number]["id"];

export default function Index() {
  const [active, setActive] = useState<ModuleId>("oe");
  const selectedIndex = modules.findIndex((module) => module.id === active);
  const selected = modules[selectedIndex] ?? modules[0];
  const ActiveComponent = selected.component;
  const progress = useMemo(() => ((selectedIndex + 1) / modules.length) * 100, [selectedIndex]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-sidebar-border bg-sidebar p-5 text-sidebar-foreground lg:flex lg:flex-col">
        <div className="mb-8">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground font-bold">E</div>
          <h1 className="text-xl font-bold text-sidebar-primary-foreground">ELKA VOC System</h1>
          <p className="mt-1 text-xs text-sidebar-foreground/60">Diagnostic, priorisation et excellence opérationnelle.</p>
        </div>

        <nav className="space-y-2">
          {modules.map((module, index) => (
            <button
              key={module.id}
              onClick={() => setActive(module.id)}
              className={`nav-item w-full text-left ${active === module.id ? "nav-item-active" : "nav-item-inactive"}`}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-sidebar-border text-[10px] font-bold">{index + 1}</span>
              <span>
                <span className="block font-semibold">{module.label}</span>
                <span className="block text-[10px] uppercase tracking-[0.16em] opacity-60">{module.eyebrow}</span>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">{selected.eyebrow}</p>
                <h2 className="section-title mt-1 text-2xl md:text-4xl">{selected.label}</h2>
              </div>
              <p className="text-sm text-muted-foreground">Module {selectedIndex + 1} / {modules.length}</p>
            </div>

            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {modules.map((module) => (
                <button
                  key={module.id}
                  onClick={() => setActive(module.id)}
                  className={`shrink-0 rounded-md border px-3 py-2 text-xs font-semibold ${active === module.id ? "border-[hsl(var(--elka-red))] bg-[hsl(var(--elka-red))] text-[hsl(var(--accent-foreground))]" : "border-border bg-card text-card-foreground"}`}
                >
                  {module.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
          <ActiveComponent />
        </div>
      </section>
    </main>
  );
}
