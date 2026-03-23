import { useState, useEffect, useRef } from "react";
import { verbatims, DEPARTMENTS, type Verbatim } from "@/data/interviewData";
import { X } from "lucide-react";

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, className: visible ? "animate-reveal" : "opacity-0" };
};

const TAG_LABELS = { reactive: "🔴 Réactif", partial: "🟡 Partiellement structuré", indirect: "🔵 Indirect" } as const;
const TAG_CLASSES = { reactive: "tag-reactive", partial: "tag-partial", indirect: "tag-indirect" } as const;
const NEED_COLORS = { Explicite: "bg-blue-100 text-blue-800", Latent: "bg-purple-100 text-purple-800", Critique: "bg-red-100 text-red-800" } as const;

export default function Module2() {
  const [filter, setFilter] = useState<string>("Tous");
  const [selected, setSelected] = useState<Verbatim | null>(null);
  const r1 = useReveal();

  const filtered = filter === "Tous" ? verbatims : verbatims.filter(v => v.department === filter);

  return (
    <div className="space-y-6">
      <div ref={r1.ref} className={r1.className}>
        <h3 className="section-title text-xl mb-2">Verbatim terrain</h3>
        <p className="text-muted-foreground text-sm mb-6">Extraits des interviews réalisées auprès de 6 départements — données réelles ELKA Suspension.</p>

        <div className="flex gap-2 mb-6 flex-wrap">
          {DEPARTMENTS.map(d => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-[0.97] ${
                filter === d
                  ? "bg-[hsl(var(--elka-red))] text-white shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((v, i) => (
          <VerbatimCard key={v.id} verbatim={v} delay={i} onClick={() => setSelected(v)} />
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-card rounded-xl p-6 md:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl animate-reveal"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${TAG_CLASSES[selected.tag]}`}>
                  {TAG_LABELS[selected.tag]}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${NEED_COLORS[selected.needType]}`}>
                  {selected.needType}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary transition-colors active:scale-95">
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{selected.department} — {selected.context}</p>
            <p className="font-semibold text-foreground mb-3">{selected.question}</p>

            <blockquote className="border-l-4 border-l-[hsl(var(--elka-red))] pl-4 py-2 mb-6 bg-red-50 rounded-r-lg">
              <p className="text-sm leading-relaxed italic text-foreground/80">« {selected.response} »</p>
            </blockquote>

            <div className="bg-primary/5 rounded-lg p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-semibold">Interprétation</p>
              <p className="text-sm leading-relaxed text-foreground">{selected.interpretation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VerbatimCard({ verbatim: v, delay, onClick }: { verbatim: Verbatim; delay: number; onClick: () => void }) {
  const r = useReveal();
  return (
    <div
      ref={r.ref}
      className={r.className}
      style={{ animationDelay: `${Math.min(delay, 5) * 80}ms` }}
    >
      <div
        onClick={onClick}
        className="consulting-card cursor-pointer group active:scale-[0.98] transition-transform duration-150"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{v.department}</span>
          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${TAG_CLASSES[v.tag]}`}>
            {TAG_LABELS[v.tag]}
          </span>
        </div>
        <p className="text-sm font-medium text-foreground mb-2 line-clamp-1">{v.question}</p>
        <p className="text-sm text-muted-foreground line-clamp-2 italic">« {v.response} »</p>
        <p className="text-xs text-[hsl(var(--elka-red))] mt-3 font-medium group-hover:underline">Voir le détail →</p>
      </div>
    </div>
  );
}
