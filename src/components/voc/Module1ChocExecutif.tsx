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
      {/* Hero score */}
      <div ref={r1.ref} className={r1.className}>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12">
          <p className="text-sm uppercase tracking-widest opacity-60 mb-2">Diagnostic VOC — Score global</p>
          <div className="flex items-end gap-4 mb-6">
            <span className="score-display text-6xl md:text-8xl text-accent">2.1</span>
            <span className="text-2xl md:text-3xl opacity-40 mb-2">/ 5.0</span>
          </div>
          <div className="w-full bg-primary-foreground/10 rounded-full h-3 mb-6">
            <div className="h-3 rounded-full bg-accent" style={{ width: "42%" }} />
          </div>
          <div className="flex justify-between text-xs opacity-50">
            <span>1.0 — Initial</span>
            <span>Cible : 4.0 — Maîtrisé</span>
            <span>5.0 — Prédictif</span>
          </div>
        </div>
      </div>

      {/* Central message */}
      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card border-l-4 border-l-accent">
          <p className="text-lg md:text-xl leading-relaxed font-medium text-foreground">
            « La Voix du Client existe dans l'organisation, mais elle est <span className="text-accent font-bold">fragmentée</span>, <span className="text-accent font-bold">informelle</span> et <span className="text-accent font-bold">peu exploitée</span>. L'entreprise réagit aux problèmes sans anticiper les besoins du marché. »
          </p>
        </div>
      </div>

      {/* Simulateur d'impact */}
      <div ref={r3.ref} className={r3.className}>
        <h3 className="section-title text-xl mb-6">Simulateur d'impact</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <SimSlider
            label="Réduction des RMA"
            value={rma}
            onChange={setRma}
            unit="%"
            color="text-emerald-600"
            impact={`${Math.round(rma * 2400)}$ économisés/an`}
          />
          <SimSlider
            label="Satisfaction client"
            value={satisfaction}
            onChange={setSatisfaction}
            unit="%"
            color="text-blue-600"
            impact={`+${Math.round((satisfaction - 68) * 0.8)}% rétention`}
          />
          <SimSlider
            label="Délai de livraison"
            value={delai}
            onChange={setDelai}
            unit=" jours"
            color="text-amber-600"
            impact={delai < 21 ? `${21 - delai} jours gagnés` : "Délai actuel"}
          />
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
        className="w-full accent-amber-500 mb-3"
      />
      <p className="text-xs text-muted-foreground font-medium">{impact}</p>
    </div>
  );
}
