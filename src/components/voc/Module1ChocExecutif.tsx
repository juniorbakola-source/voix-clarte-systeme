import { useState, useEffect, useRef } from "react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: visible ? "animate-reveal" : "opacity-0" };
};

export default function Module1() {
  const [rma, setRma] = useState(15);
  const [satisfaction, setSatisfaction] = useState(68);
  const [delai, setDelai] = useState(21);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  return (
    <div className="space-y-8">
      <div ref={r1.ref} className={r1.className}>
        <div className="bg-[hsl(var(--elka-darkgray))] text-white rounded-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded bg-[hsl(var(--elka-red))] flex items-center justify-center text-white font-bold text-lg">E</div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">ELKA SUSPENSION</p>
              <p className="text-sm uppercase tracking-widest text-white/60">Diagnostic VOC — Score global</p>
            </div>
          </div>
          <div className="flex items-end gap-4 mb-6">
            <span className="score-display text-6xl md:text-8xl text-[hsl(var(--elka-red))]">1.3</span>
            <span className="text-2xl md:text-3xl opacity-40 mb-2">/ 5.0</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3 mb-6">
            <div className="h-3 rounded-full bg-[hsl(var(--elka-red))]" style={{ width: "26%" }} />
          </div>
          <div className="flex justify-between text-xs opacity-50">
            <span>1.0 — Initial</span>
            <span>Cible : 4.0 — Maîtrisé</span>
            <span>5.0 — Prédictif</span>
          </div>
        </div>
      </div>

      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card border-l-4 border-l-[hsl(var(--elka-red))]">
          <p className="text-lg md:text-xl leading-relaxed font-medium text-foreground">
            « La Voix du Client existe dans l'organisation, mais elle est <span className="text-[hsl(var(--elka-red))] font-bold">non archivée</span>, <span className="text-[hsl(var(--elka-red))] font-bold">non mesurée</span> et <span className="text-[hsl(var(--elka-red))] font-bold">non exploitée</span>. Aucun indicateur VOC. RMA non quantifié. Coût de non-qualité externe invisible. »
          </p>
        </div>
      </div>

      <div className="consulting-card bg-red-50 border border-red-200">
        <p className="text-xs uppercase tracking-wide text-[hsl(var(--elka-red))] font-bold mb-3">Constats critiques des interviews</p>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "« On ne sait pas si le client est satisfait. »",
            "« Pas d'archivage, pas de traitement. »",
            "« Causes racines non analysées. »",
            "« Les services ne communiquent pas efficacement. »",
            "« RMA pas quantifié. Coût de non-qualité pas mesuré. »",
            "« Problèmes de production pas formalisés. »",
          ].map((q, i) => (
            <div key={i} className="text-sm italic text-foreground/70 p-2 bg-white rounded border border-red-100">{q}</div>
          ))}
        </div>
      </div>

      <div ref={r3.ref} className={r3.className}>
        <h3 className="section-title text-xl mb-6">Simulateur d'impact</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <SimSlider label="Réduction des RMA" value={rma} onChange={setRma} unit="%" color="text-emerald-600" impact={`${Math.round(rma * 2400)}$ économisés/an`} />
          <SimSlider label="Satisfaction client" value={satisfaction} onChange={setSatisfaction} unit="%" color="text-blue-600" impact={`+${Math.round((satisfaction - 68) * 0.8)}% rétention`} />
          <SimSlider label="Délai de livraison" value={delai} onChange={setDelai} unit=" jours" color="text-[hsl(var(--elka-red))]" impact={delai < 21 ? `${21 - delai} jours gagnés` : "Délai actuel"} />
        </div>
      </div>
    </div>
  );
}

function SimSlider({ label, value, onChange, unit, color, impact }: {
  label: string; value: number; onChange: (v: number) => void;
  unit: string; color: string; impact: string;
}) {
  return (
    <div className="consulting-card">
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className={`score-display text-3xl ${color} mb-4`}>{value}{unit}</p>
      <input
        type="range"
        min={0}
        max={unit === " jours" ? 30 : 100}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-[hsl(358,81%,52%)] mb-3"
      />
      <p className="text-xs text-muted-foreground font-medium">{impact}</p>
    </div>
  );
}
