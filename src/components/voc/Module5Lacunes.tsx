import { useState, useEffect, useRef } from "react";
import { heatmapData, type HeatmapCell } from "@/data/interviewData";
import { X } from "lucide-react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: visible ? "animate-reveal" : "opacity-0" };
};

const CELL_CLASSES = { critical: "heatmap-critical", warning: "heatmap-warning", ok: "heatmap-ok", low: "heatmap-low" } as const;
const AXES_X = ["Collecte", "Centralisation", "Analyse", "Exploitation"] as const;
const AXES_Y = ["Service Client", "Ventes", "Production", "Ingénierie", "Shipping", "Qualité"] as const;

export default function Module5() {
  const [selected, setSelected] = useState<HeatmapCell | null>(null);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  const getCell = (x: string, y: string) => heatmapData.find(c => c.axisX === x && c.axisY === y);

  return (
    <div className="space-y-8">
      <div ref={r1.ref} className={r1.className}>
        <h3 className="section-title text-xl mb-2">Analyse des lacunes</h3>
        <p className="text-muted-foreground text-sm mb-6">Carte thermique des faiblesses structurelles — 6 départements × 4 axes de maturité VOC.</p>
      </div>

      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card overflow-x-auto">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-5 gap-2 mb-2">
              <div />
              {AXES_X.map(x => (
                <div key={x} className="text-center text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">{x}</div>
              ))}
            </div>
            {AXES_Y.map(y => (
              <div key={y} className="grid grid-cols-5 gap-2 mb-2">
                <div className="flex items-center text-[11px] font-semibold text-foreground">{y}</div>
                {AXES_X.map(x => {
                  const cell = getCell(x, y);
                  if (!cell) return <div key={x} />;
                  return (
                    <button
                      key={x}
                      onClick={() => setSelected(cell)}
                      className={`${CELL_CLASSES[cell.level]} heatmap-cell h-14 active:scale-[0.95] transition-transform`}
                    >
                      {cell.score.toFixed(1)}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-4 pt-4 border-t border-border">
            {[
              { cls: "heatmap-critical", label: "Critique (<1.5)" },
              { cls: "heatmap-warning", label: "À risque (1.5–2.5)" },
              { cls: "heatmap-ok", label: "Acceptable (>2.5)" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${l.cls}`} />
                <span className="text-xs text-muted-foreground">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={r3.ref} className={r3.className}>
        <div className="bg-[hsl(var(--elka-darkgray))] text-white rounded-xl p-8 text-center">
          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
            « Le problème n'est pas le manque de données client.<br/>
            <span className="text-[hsl(var(--elka-red))] font-bold">Le problème est l'absence de système pour les transformer en décisions.</span> »
          </p>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-xl p-6 max-w-lg w-full shadow-2xl animate-reveal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{selected.axisY} — {selected.axisX}</p>
                <p className="font-semibold text-foreground">Score : {selected.score.toFixed(1)} / 5</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary active:scale-95"><X size={18} /></button>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-[hsl(var(--elka-red))] font-semibold mb-2">Scénario réel</p>
              <p className="text-sm text-foreground/80 leading-relaxed">{selected.scenario}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
