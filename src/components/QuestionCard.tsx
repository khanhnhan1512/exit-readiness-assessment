"use client";

import { DIMENSIONS, type Question } from "@/lib/questions";

export function QuestionCard({
  question,
  index,
  total,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  question: Question;
  index: number;
  total: number;
  selected: number | undefined;
  onSelect: (points: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const progress = ((index + (selected === undefined ? 0 : 1)) / total) * 100;
  const isLast = index === total - 1;

  return (
    <div className="animate-fade-up">
      <div className="flex items-center justify-between gap-4">
        <span className="eyebrow text-teal">
          {DIMENSIONS[question.dimension].name}
        </span>
        <span className="text-sm font-semibold text-charcoal/50">
          Question {index + 1} of {total}
        </span>
      </div>

      <div
        className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label="Assessment progress"
      >
        <div
          className="h-full rounded-full bg-teal transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h3 className="mt-8 text-2xl leading-snug font-bold text-forest sm:text-3xl">
        {question.title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-charcoal/70">
        {question.context}
      </p>

      <fieldset className="mt-7">
        <legend className="sr-only">{question.title}</legend>
        <div className="space-y-3">
          {question.options.map((option) => {
            const isSelected = selected === option.points;
            return (
              <label
                key={option.key}
                className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition ${
                  isSelected
                    ? "border-teal bg-teal-soft shadow-[0_0_0_1px_var(--color-teal)]"
                    : "border-line bg-white hover:border-teal/50 hover:bg-bone"
                }`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => onSelect(option.points)}
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition ${
                    isSelected
                      ? "border-teal bg-teal text-white"
                      : "border-charcoal/25 text-charcoal/50"
                  }`}
                >
                  {option.key}
                </span>
                <span>
                  <span className="block font-semibold text-forest">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-charcoal/65">
                    {option.detail}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={index === 0}
          className="text-sm font-semibold text-charcoal/60 transition hover:text-teal disabled:cursor-not-allowed disabled:opacity-35"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={selected === undefined}
          className="rounded-full bg-teal px-8 py-3 font-semibold text-white transition hover:bg-teal-dark disabled:cursor-not-allowed disabled:bg-charcoal/20"
        >
          {isLast ? "See my results" : "Next"}
        </button>
      </div>
    </div>
  );
}
