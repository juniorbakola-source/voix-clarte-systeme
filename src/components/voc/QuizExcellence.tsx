import { useState } from "react";
import { CheckCircle2, RotateCcw, Trophy } from "lucide-react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

const questions: Question[] = [
  {
    question: "Quel est l'objectif principal de l'excellence opérationnelle ?",
    options: [
      "Réduire uniquement les coûts",
      "Améliorer la performance globale et durable",
      "Augmenter le nombre de réunions",
    ],
    answer: 1,
  },
  {
    question: "Que signifie « Lean » ?",
    options: [
      "Augmenter la production à tout prix",
      "Éliminer les gaspillages (Muda)",
      "Complexifier les processus",
    ],
    answer: 1,
  },
  {
    question: "Quel pilier soutient l'amélioration continue ?",
    options: [
      "Le contrôle hiérarchique strict",
      "Le Kaizen et l'engagement terrain",
      "Le reporting mensuel uniquement",
    ],
    answer: 1,
  },
  {
    question: "Que mesure un indicateur OEE / TRS ?",
    options: [
      "La satisfaction client",
      "L'efficacité globale d'un équipement",
      "Le chiffre d'affaires",
    ],
    answer: 1,
  },
  {
    question: "Qu'est-ce qu'un « Gemba walk » ?",
    options: [
      "Une réunion en salle de direction",
      "Une marche d'observation sur le terrain",
      "Un audit financier",
    ],
    answer: 1,
  },
  {
    question: "À quoi sert la méthode des 5S ?",
    options: [
      "À organiser et standardiser le poste de travail",
      "À recruter cinq nouveaux collaborateurs",
      "À fixer cinq objectifs annuels",
    ],
    answer: 0,
  },
  {
    question: "Que représente la VSM (Value Stream Mapping) ?",
    options: [
      "Une carte du flux de valeur",
      "Un tableau de bord financier",
      "Un organigramme RH",
    ],
    answer: 0,
  },
  {
    question: "Quel est le but du SMED ?",
    options: [
      "Réduire les temps de changement de série",
      "Augmenter la taille des lots",
      "Allonger les cycles de production",
    ],
    answer: 0,
  },
  {
    question: "Quelle démarche structure la résolution de problème ?",
    options: [
      "PDCA (Plan-Do-Check-Act)",
      "L'improvisation managériale",
      "Le copier-coller de bonnes pratiques",
    ],
    answer: 0,
  },
  {
    question: "Quel rôle joue le leadership dans l'excellence opérationnelle ?",
    options: [
      "Imposer des objectifs sans dialogue",
      "Donner du sens, soutenir et faire grandir les équipes",
      "Déléguer entièrement sans suivi",
    ],
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
    if (isCorrect) setScore((s) => s + 1);

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
      <div className="rounded-xl border border-border bg-card p-10 text-center">
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
      </div>
    );
  }

  const q = questions[index];

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8">
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
    </div>
  );
}
