import { useState, useEffect, useRef } from "react";
import { maturityScores, verbatims } from "@/data/interviewData";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";
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

const LEVELS = [
  { score: 1, label: "Initial", desc: "Pas de processus défini" },
  { score: 2, label: "Défini", desc: "Processus ad hoc identifié" },
  { score: 3, label: "Structuré", desc: "Processus documenté et suivi" },
  { score: 4, label: "Maîtrisé", desc: "Processus mesuré et optimisé" },
  { score: 5, label: "Prédictif", desc: "Anticipation et amélioration continue" },
];

export default function Module4() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const r1 = useReveal();
  const r2 = useReveal();
  const r3 = useReveal();

  const radarData = [
    { axis: "Collecte", Ventes: 2.5, Production: 2.0, Ingénierie: 1.5 },
    { axis: "Centralisation", Ventes: 1.5, Production: 1.5, Ingénierie: 1.0 },
    { axis: "Analyse", Ventes: 1.0, Production: 1.0, Ingénierie: 1.5 },
    { axis: "Exploitation", Ventes: 1.5, Production: 1.0, Ingénierie: 1.5 },
  ];

  const selected = selectedDept ? maturityScores.find(s => s.department === selectedDept) : null;
  const deptVerbatims = selectedDept ? verbatims.filter(v => v.department === selectedDept) : [];

  return (
    <div className="space-y-8">
      <div ref={r1.ref} className={r1.className}>
        <h3 className="section-title text-xl mb-2">Évaluation de maturité VOC</h3>
        <p className="text-muted-foreground text-sm mb-6">Radar comparatif des 3 départements sur les 4 axes de maturité.</p>
      </div>

      {/* Radar */}
      <div ref={r2.ref} className={r2.className}>
        <div className="consulting-card">
          <ResponsiveContainer width="100%" height={360}>
            <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Ventes" dataKey="Ventes" stroke="hsl(38, 92%, 50%)" fill="hsl(38, 92%, 50%)" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Production" dataKey="Production" stroke="hsl(0, 72%, 51%)" fill="hsl(0, 72%, 51%)" fillOpacity={0.1} strokeWidth={2} />
              <Radar name="Ingénierie" dataKey="Ingénierie" stroke="hsl(210, 70%, 50%)" fill="hsl(210, 70%, 50%)" fillOpacity={0.1} strokeWidth={2} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-6 mt-4">
            {[
              { name: "Ventes", color: "bg-amber-500" },
              { name: "Production", color: "bg-red-500" },
              { name: "Ingénierie", color: "bg-blue-500" },
            ].map(d => (
              <button
                key={d.name}
                onClick={() => setSelectedDept(d.name)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary transition-colors active:scale-[0.97]"
              >
                <div className={`w-2.5 h-2.5 rounded-full ${d.color}`} />
                <span className="text-sm font-medium">{d.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Maturity scale */}
      <div ref={r3.ref} className={r3.className}>
        <div className="consulting-card">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4 font-semibold">Échelle de maturité</p>
          <div className="flex gap-1">
            {LEVELS.map(l => (
              <div key={l.score} className="flex-1 text-center">
                <div className={`h-2 rounded-full mb-2 ${l.score <= 2 ? "bg-red-400" : l.score <= 3 ? "bg-amber-400" : "bg-emerald-400"}`} />
                <p className="text-xs font-semibold">{l.score}</p>
                <p className="text-[10px] text-muted-foreground">{l.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department scores */}
      <div className="grid md:grid-cols-3 gap-4">
        {maturityScores.map(s => (
          <button
            key={s.department}
            onClick={() => setSelectedDept(s.department)}
            className="consulting-card text-left active:scale-[0.98] transition-transform"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{s.department}</p>
            <p className="score-display text-3xl text-foreground mb-2">{s.score.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{s.justification}</p>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelectedDept(null)}>
          <div className="bg-card rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-reveal" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{selected.department}</p>
                <p className="section-title text-2xl">Score : {selected.score.toFixed(1)} / 5</p>
              </div>
              <button onClick={() => setSelectedDept(null)} className="p-1 rounded hover:bg-secondary active:scale-95"><X size={20} /></button>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed mb-6">{selected.justification}</p>

            <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-3">Verbatim associés</p>
            <div className="space-y-3">
              {deptVerbatims.map(v => (
                <div key={v.id} className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-xs font-medium text-foreground mb-1">{v.question}</p>
                  <p className="text-sm italic text-muted-foreground">« {v.response} »</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
