import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Slide = { title: string; content: string };

const initialSlides: Slide[] = [
  {
    title: "Excellence Opérationnelle",
    content: "Piloter la performance par la clarté, la discipline et l'amélioration continue.",
  },
];

export default function AppleKeynote() {
  const [slides, setSlides] = useState<Slide[]>(initialSlides);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.isContentEditable) return;
      if (e.key === "ArrowRight") setIndex((i) => Math.min(i + 1, slides.length - 1));
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [slides.length]);

  const handleAI = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-slide", {
        body: { topic: "Excellence Opérationnelle" },
      });
      if (error) throw error;
      if (!data?.title) throw new Error("Réponse IA invalide");
      setSlides((prev) => {
        const next = [...prev, { title: data.title, content: data.content ?? "" }];
        setIndex(next.length - 1);
        return next;
      });
    } catch (e: any) {
      const msg = e?.message ?? "Échec de la génération";
      toast({ title: "Erreur de génération IA", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-background to-secondary">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Keynote style Apple · IA
          </p>
          <p className="text-sm font-semibold text-foreground">
            Slide {index + 1} / {slides.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIndex((i) => Math.max(i - 1, 0))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-40"
            disabled={index === 0}
            aria-label="Précédent"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-secondary disabled:opacity-40"
            disabled={index === slides.length - 1}
            aria-label="Suivant"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative min-h-[420px] md:min-h-[520px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center px-8 py-16 md:px-20 md:py-24"
            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Inter, sans-serif" }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              contentEditable
              suppressContentEditableWarning
              className="text-4xl font-bold tracking-tight text-foreground outline-none md:text-6xl"
              style={{ letterSpacing: "-1.5px" }}
            >
              {slide.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              contentEditable
              suppressContentEditableWarning
              className="mt-5 max-w-3xl text-lg text-muted-foreground outline-none md:text-2xl"
            >
              {slide.content}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleAI}
          disabled={loading}
          className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--elka-black))] px-5 py-3 text-sm font-semibold text-[hsl(var(--primary-foreground))] shadow-lg transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Génération…" : "Générer une slide"}
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-2 text-[11px] text-muted-foreground">
        <span>← / → pour naviguer · Cliquez le texte pour éditer</span>
        <span>Powered by Lovable AI</span>
      </div>
    </section>
  );
}
