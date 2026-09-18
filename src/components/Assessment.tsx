"use client";

import { useMemo, useRef, useState } from "react";
import { QUESTIONS } from "@/lib/questions";
import { scoreAssessment, type Answers } from "@/lib/scoring";
import { QuestionCard } from "./QuestionCard";
import { ResultsView } from "./ResultsView";

type Stage = "intro" | "quiz" | "results";

export function Assessment() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  // Answers live in component state only — nothing is persisted or sent anywhere.
  const [answers, setAnswers] = useState<Answers>({});
  const panelRef = useRef<HTMLDivElement>(null);

  const question = QUESTIONS[index];
  const result = useMemo(() => scoreAssessment(answers), [answers]);

  function scrollToPanel() {
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSelect(points: number) {
    setAnswers((previous) => ({ ...previous, [question.id]: points }));
  }

  function handleNext() {
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
      scrollToPanel();
    } else {
      setStage("results");
      scrollToPanel();
    }
  }

  function handleBack() {
    if (index > 0) {
      setIndex(index - 1);
      scrollToPanel();
    }
  }

  function handleRestart() {
    setAnswers({});
    setIndex(0);
    setStage("quiz");
    scrollToPanel();
  }

  return (
    <div
      ref={panelRef}
      className="scroll-mt-24 rounded-3xl border border-line bg-white p-6 shadow-[0_18px_60px_-30px_rgba(26,50,47,0.35)] sm:p-10"
    >
      {stage === "intro" ? (
        <div className="animate-fade-up text-center">
          <p className="eyebrow text-teal">Free · No registration</p>
          <h3 className="mt-3 text-3xl font-bold text-forest sm:text-4xl">
            Ten questions. Under three minutes.
          </h3>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-charcoal/70">
            Answer honestly — the score is only as useful as the answers behind
            it. Your responses stay in your browser and are scored on your own
            device.
          </p>

          <dl className="mx-auto mt-8 grid max-w-2xl gap-4 text-left sm:grid-cols-3">
            {[
              { term: "10", detail: "questions, four options each" },
              { term: "3", detail: "dimensions buyers actually test" },
              { term: "0–100", detail: "score with a readiness band" },
            ].map((item) => (
              <div
                key={item.term}
                className="rounded-xl border border-line bg-bone px-5 py-4"
              >
                <dt className="text-2xl font-bold text-teal">{item.term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-charcoal/70">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => {
              setStage("quiz");
              scrollToPanel();
            }}
            className="mt-9 rounded-full bg-teal px-10 py-4 text-lg font-semibold text-white transition hover:bg-teal-dark"
          >
            Begin the assessment
          </button>
        </div>
      ) : null}

      {stage === "quiz" ? (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          total={QUESTIONS.length}
          selected={answers[question.id]}
          onSelect={handleSelect}
          onNext={handleNext}
          onBack={handleBack}
        />
      ) : null}

      {stage === "results" ? (
        <ResultsView result={result} onRestart={handleRestart} />
      ) : null}
    </div>
  );
}
