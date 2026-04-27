import { useState } from "react";
import { CheckCircle2, RotateCcw, Trophy } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "Quel est l'objectif de l'excellence opérationnelle ?",
    options: [
      "Réduire uniquement les coûts",
      "Améliorer la performance globale",
      "Augmenter le nombre de réunions",
    ],
    answer: 1,
  },
  {
    question: "Que signifie « Lean » ?",
    options: [
      "Augmenter la production à tout prix",
      "Éliminer les gaspillages",
      "Complexifier les processus",
    ],
    answer: 1,
  },
  {
    question: "Quel pilier soutient l'amélioration continue ?",
    options: ["Le contrôle hiérarchique", "Le Kaizen et l'engagement terrain", "Le reporting mensuel"],
    answer: 1,
  },
];

export default function QuizExcellence() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === questions[index].answer;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="rounded-xl border border-border bg-card p-10 text-center">
        <Trophy className="mx-auto h-12 w-12 text-[hsl(var(--elka-red))]" />
        <h3 className="section-title mt-4 text-2xl">Quiz terminé</h3>
        <p className="mt-2 text-muted-foreground">
          Score final : <span className="font-bold text-foreground">{score} / {questions.length}</span> ({pct}%)
        </p>
        <button
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
        >
          <RotateCcw className="h-4 w-4" /> Recommencer
        </button>
      </section>
    );
  }

  const q = questions[index];

  return (
    <section className="rounded-xl border border-border bg-card p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--elka-red))]">
          Quiz · Excellence Opérationnelle
        </p>
        <p className="text-xs text-muted-foreground">
          Question {index + 1} / {questions.length}
        </p>
      </div>

      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-[hsl(var(--elka-red))] transition-all duration-500"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="text-xl font-bold text-foreground md:text-2xl">{q.question}</h3>

      <div className="mt-5 space-y-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === q.answer;
          const showState = selected !== null;
          const cls = !showState
            ? "border-border bg-background hover:bg-secondary"
            : isCorrect
            ? "border-green-500/60 bg-green-500/10"
            : isSelected
            ? "border-[hsl(var(--elka-red))]/60 bg-[hsl(var(--elka-red))]/10"
            : "border-border bg-background opacity-60";
          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={selected !== null}
              className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium text-foreground transition ${cls}`}
            >
              <span>{opt}</span>
              {showState && isCorrect && <CheckCircle2 className="h-4 w-4 text-green-600" />}
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-muted-foreground">Score en cours : {score} / {questions.length}</p>
    </section>
  );
}
