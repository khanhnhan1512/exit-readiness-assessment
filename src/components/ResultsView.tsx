"use client";

import { ScoreGauge } from "./ScoreGauge";
import { EmailResultsForm } from "./EmailResultsForm";
import type { AssessmentResult } from "@/lib/scoring";

function DimensionCard({
  name,
  weight,
  score,
  blurb,
  color,
  bandLabel,
}: {
  name: string;
  weight: number;
  score: number;
  blurb: string;
  color: string;
  bandLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="text-lg font-bold text-forest">{name}</h4>
        <span className="text-xs font-semibold tracking-wide text-charcoal/45">
          {Math.round(weight * 100)}% of score
        </span>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold" style={{ color }}>
          {Math.round(score)}
        </span>
        <span className="text-sm text-charcoal/45">/ 100</span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{ width: `${Math.max(2, score)}%`, backgroundColor: color }}
        />
      </div>

      <p className="mt-3 text-sm font-semibold" style={{ color }}>
        {bandLabel}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{blurb}</p>
    </div>
  );
}

export function ResultsView({
  result,
  onRestart,
}: {
  result: AssessmentResult;
  onRestart: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="text-center">
        <p className="eyebrow text-teal">Your result</p>
        <h3 className="mt-3 text-3xl font-bold text-forest sm:text-4xl">
          Your exit readiness score
        </h3>
      </div>

      <div className="mt-10 grid gap-10 md:grid-cols-[minmax(0,280px)_1fr] md:items-center">
        <div className="flex justify-center">
          <ScoreGauge
            score={result.overall}
            color={result.band.color}
            label={result.band.label}
          />
        </div>

        <div>
          <p className="text-lg font-semibold text-forest">
            {result.band.description}
          </p>
          <p className="mt-4 leading-relaxed text-charcoal/75">
            {result.band.interpretation}
          </p>

          <div className="mt-6 rounded-xl border border-teal/25 bg-teal-soft px-5 py-4">
            <p className="eyebrow text-teal">Suggested preparation timeline</p>
            <p className="mt-1.5 text-lg font-bold text-forest">
              {result.timeline}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h4 className="eyebrow text-charcoal/45">Pillar-by-pillar breakdown</h4>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {result.dimensions.map((dimension) => (
            <DimensionCard
              key={dimension.key}
              name={dimension.name}
              weight={dimension.weight}
              score={dimension.score}
              blurb={dimension.blurb}
              color={dimension.band.color}
              bandLabel={dimension.band.label}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h4 className="text-lg font-bold text-forest">
            What is working in your favour
          </h4>
          {result.strengths.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {result.strengths.map((strength) => (
                <li key={strength} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[0.7rem] font-bold text-white"
                  >
                    ✓
                  </span>
                  <span className="text-charcoal/80">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              No area scored in the top range yet. That is common early on, and
              it means the gaps opposite are where the fastest gains are.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
          <h4 className="text-lg font-bold text-forest">
            Where buyers will push back
          </h4>
          {result.gaps.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {result.gaps.map((gap) => (
                <li key={gap} className="flex gap-3 text-sm leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest text-[0.7rem] font-bold text-white"
                  >
                    !
                  </span>
                  <span className="text-charcoal/80">{gap}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm leading-relaxed text-charcoal/70">
              Nothing scored in the bottom range. The work ahead is about
              polishing and positioning rather than remediation.
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        <EmailResultsForm result={result} />
      </div>

      <div className="no-print mt-10 rounded-2xl bg-forest px-6 py-10 text-center sm:px-10">
        <p className="eyebrow text-teal">Know your worth</p>
        <h4 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          A score is a starting point. A conversation is where it gets useful.
        </h4>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/70">
          Walk through what these results mean for your business, your timeline
          and your number with an Aspen advisor.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {/* TODO: wire this CTA to the booking or contact destination once it
              is confirmed — e.g. <a href="https://aspenval.com/contact"> */}
          <button
            type="button"
            className="rounded-full bg-teal px-8 py-3.5 font-semibold text-white transition hover:bg-teal-dark"
          >
            Discuss your results
          </button>
          <button
            type="button"
            onClick={onRestart}
            className="rounded-full border border-white/30 px-8 py-3.5 font-semibold text-white transition hover:border-teal hover:text-teal"
          >
            Retake the assessment
          </button>
        </div>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-charcoal/50">
        This score is an educational indicator based on your self-reported
        answers. It is not a formal valuation or a valuation opinion, and it
        should not be relied upon for a transaction decision.
      </p>
    </div>
  );
}
