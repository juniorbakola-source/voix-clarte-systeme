import { useState, useEffect, useRef } from "react";
import { fluxData, type FluxInfo } from "@/data/interviewData";
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

const STATUS = {
  disconnected: { label: "Déconnecté", color: "bg-red-500", ring: "ring-red-200" },
  weak: { label: "Faible", color: "bg-amber-400", ring: "ring-amber-200" },
  partial: { label: "Partiel", color: "bg-blue-400", ring: "ring-blue-200" },
};

export default function Module3() {
  const [selected, setSelected] = useState<FluxInfo | null>(null);
  const r1 = useReveal();
  const r2 = useReveal();

  return (
    <div className="space-y-8">
      <div ref={r1.ref} className={r1.className}>
        <h3 className="section-title text-xl mb-2">Cartographie des flux VOC</h3>
        <p className="text-muted-foreground text-sm mb-6">Visualisation de la circulation réelle de l'information client dans l'organisation.</p>

        {/* Legend */}
        <div className="flex gap-4 mb-6 flex-wrap">
          {Object.entries(STATUS).map(([k, v]) => (
            <div key={k} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${v.color}`} />
              <span className="text-xs text-muted-foreground">{v.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System map */}
      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card p-8">
          {/* Central node */}
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold text-center mb-8">
              Système<br/>VOC
            </div>

            <div className="grid md:grid-cols-3 gap-6 w-full">
              {/* Departments */}
              {(["Service Client", "Ventes", "Production", "Ingénierie", "Shipping", "Qualité"] as const).map(dept => {
                const deptFlux = fluxData.filter(f => f.description.includes(dept.split("é")[0]));
                return (
                  <div key={dept} className="space-y-3">
                    <div className="bg-primary/5 rounded-lg p-3 text-center">
                      <p className="text-sm font-semibold text-foreground">{dept}</p>
                    </div>
                    {deptFlux.map(flux => (
                      <FluxNode key={flux.id} flux={flux} onClick={() => setSelected(flux)} />
                    ))}
                    {deptFlux.length === 0 && (
                      <div className="text-xs text-muted-foreground text-center p-4 bg-secondary rounded-lg">Aucun flux direct identifié</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Orphan fluxes */}
            {fluxData.filter(f => !["Service Client", "Ventes", "Production", "Ingénierie", "Shipping", "Qualité"].some(d => f.description.includes(d.split("é")[0]))).length > 0 && (
              <div className="mt-6 w-full">
                <p className="text-xs text-muted-foreground mb-2">Flux transversaux</p>
                <div className="grid md:grid-cols-2 gap-3">
                  {fluxData.filter(f => !["Ventes", "Production", "Ingénierie"].some(d => f.description.includes(d.split("é")[0]))).map(flux => (
                    <FluxNode key={flux.id} flux={flux} onClick={() => setSelected(flux)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="consulting-card border-l-4 border-l-destructive">
        <p className="text-sm font-semibold text-foreground mb-1">Constat principal</p>
        <p className="text-sm text-muted-foreground">
          Les flux d'information client sont majoritairement <strong>informels et unidirectionnels</strong>. Les silos départementaux empêchent toute vision consolidée du client.
        </p>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-card rounded-xl p-6 max-w-lg w-full shadow-2xl animate-reveal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{selected.description}</p>
                <p className="font-semibold text-foreground">{selected.source}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary active:scale-95"><X size={18} /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2.5 h-2.5 rounded-full ${STATUS[selected.status].color}`} />
              <span className="text-sm font-medium">{STATUS[selected.status].label}</span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{selected.detail}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function FluxNode({ flux, onClick }: { flux: FluxInfo; onClick: () => void }) {
  const s = STATUS[flux.status];
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border transition-all duration-200 hover:shadow-md active:scale-[0.98] ring-1 ${s.ring} bg-card`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full ${s.color} ${flux.status === "disconnected" ? "animate-pulse-ring" : ""}`} />
        <span className="text-xs font-semibold text-foreground">{flux.source}</span>
      </div>
      <p className="text-[11px] text-muted-foreground">{flux.description}</p>
    </button>
  );
}
