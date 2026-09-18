import { DIMENSIONS, QUESTIONS, type Dimension } from "./questions";

/** Answers keyed by question id; the value is the points awarded (0-3). */
export type Answers = Record<number, number>;

export interface Band {
  id: "exit-ready" | "mostly-ready" | "partially-ready" | "limited" | "not-ready";
  label: string;
  min: number;
  max: number;
  color: string;
  description: string;
  /** Timeline recommendation surfaced on the results page. */
  timeline: string;
  /** Longer read-out shown under the gauge. */
  interpretation: string;
}

/** Readiness bands and colours, exactly as defined in the specification. */
export const BANDS: Band[] = [
  {
    id: "exit-ready",
    label: "Exit Ready",
    min: 80,
    max: 100,
    color: "#05B4C9",
    description: "Business is ready for market",
    timeline: "Ready now — 0 to 6 months to launch a process",
    interpretation:
      "Your responses point to a business that would stand up to buyer scrutiny today. The work ahead is about positioning and process, not remediation: assembling the information package, identifying the right buyer universe, and running a competitive process that protects value.",
  },
  {
    id: "mostly-ready",
    label: "Mostly Ready",
    min: 65,
    max: 79,
    color: "#05B4C9",
    description: "Minor gaps; addressable in 12–18 months",
    timeline: "12 to 18 months",
    interpretation:
      "The foundations are sound and the gaps are specific rather than structural. Addressing them before you go to market is usually worth more than the time it costs, because each one is a discount a buyer would otherwise ask for.",
  },
  {
    id: "partially-ready",
    label: "Partially Ready",
    min: 50,
    max: 64,
    color: "#1A322F",
    description: "Significant gaps; 18–24 month timeline",
    timeline: "18 to 24 months",
    interpretation:
      "There is a real business here, but several areas would attract scrutiny in diligence. A staged plan — financial reporting first, then transferability — typically moves the score materially within a year and changes the range of buyers who will engage.",
  },
  {
    id: "limited",
    label: "Limited Readiness",
    min: 35,
    max: 49,
    color: "#1A322F",
    description: "Major work required; 2+ year timeline",
    timeline: "2+ years",
    interpretation:
      "Going to market from here would likely mean accepting a discount, a heavily structured deal, or both. The good news is that the highest-impact items are usually the most fixable: clean records, reduced owner dependency and documented process.",
  },
  {
    id: "not-ready",
    label: "Not Ready",
    min: 0,
    max: 34,
    color: "#333333",
    description: "Substantial restructuring needed",
    timeline: "3+ years, with a structured preparation plan",
    interpretation:
      "A sale process today would be difficult to run and harder to close. Treat this as a starting baseline rather than a verdict: businesses in this range often improve fastest, because the fundamentals being addressed are the ones buyers weigh most heavily.",
  },
];

export function bandFor(score: number): Band {
  const rounded = Math.round(score);
  return (
    BANDS.find((band) => rounded >= band.min && rounded <= band.max) ??
    BANDS[BANDS.length - 1]
  );
}

export interface DimensionScore {
  key: Dimension;
  name: string;
  weight: number;
  blurb: string;
  /** 0-100. */
  score: number;
  earned: number;
  possible: number;
  band: Band;
}

export interface AssessmentResult {
  overall: number;
  band: Band;
  dimensions: DimensionScore[];
  strengths: string[];
  gaps: string[];
  timeline: string;
}

const QUESTIONS_BY_DIMENSION = (dimension: Dimension) =>
  QUESTIONS.filter((question) => question.dimension === dimension);

/**
 * Scores a completed assessment.
 *
 * Financial   = (Q1 + Q2 + Q5 + Q8 + Q9) / 15 x 100
 * Operational = (Q3 + Q4 + Q10) / 9 x 100
 * Strategic   = (Q6 + Q7) / 6 x 100
 * Overall     = (Financial x 0.50) + (Operational x 0.30) + (Strategic x 0.20)
 */
export function scoreAssessment(answers: Answers): AssessmentResult {
  const dimensions = (
    Object.keys(DIMENSIONS) as Dimension[]
  ).map<DimensionScore>((key) => {
    const questions = QUESTIONS_BY_DIMENSION(key);
    const possible = questions.length * 3;
    const earned = questions.reduce(
      (total, question) => total + (answers[question.id] ?? 0),
      0,
    );
    const score = possible === 0 ? 0 : (earned / possible) * 100;

    return {
      key,
      name: DIMENSIONS[key].name,
      weight: DIMENSIONS[key].weight,
      blurb: DIMENSIONS[key].blurb,
      score,
      earned,
      possible,
      band: bandFor(score),
    };
  });

  const overall = dimensions.reduce(
    (total, dimension) => total + dimension.score * dimension.weight,
    0,
  );

  // Strengths come from top-scoring answers; if nothing scored full marks we
  // fall back to the solid ones so the list is never empty.
  const topAnswers = QUESTIONS.filter((q) => (answers[q.id] ?? 0) === 3);
  const solidAnswers = QUESTIONS.filter((q) => (answers[q.id] ?? 0) === 2);
  const strengths = (topAnswers.length > 0 ? topAnswers : solidAnswers).map(
    (q) => q.strength,
  );

  const gaps = QUESTIONS.filter((q) => (answers[q.id] ?? 0) <= 1).map(
    (q) => q.gap,
  );

  const band = bandFor(overall);

  return {
    overall,
    band,
    dimensions,
    strengths,
    gaps,
    timeline: band.timeline,
  };
}

/** Plain-text summary used for the emailed copy and the clipboard fallback. */
export function summarizeResult(result: AssessmentResult): string {
  const lines: string[] = [
    "ASPEN VALUATIONS — EXIT READINESS ASSESSMENT",
    "Know your worth.",
    "",
    `Overall readiness score: ${Math.round(result.overall)}/100 — ${result.band.label}`,
    result.band.description,
    "",
    "DIMENSION BREAKDOWN",
  ];

  for (const dimension of result.dimensions) {
    lines.push(
      `- ${dimension.name} (${Math.round(dimension.weight * 100)}% weight): ${Math.round(
        dimension.score,
      )}/100`,
    );
  }

  lines.push("", "STRENGTHS");
  if (result.strengths.length > 0) {
    for (const strength of result.strengths) lines.push(`- ${strength}`);
  } else {
    lines.push("- No area scored in the top range yet.");
  }

  lines.push("", "PRIORITY GAPS");
  if (result.gaps.length > 0) {
    for (const gap of result.gaps) lines.push(`- ${gap}`);
  } else {
    lines.push("- No material gaps identified.");
  }

  lines.push(
    "",
    "SUGGESTED TIMELINE",
    result.timeline,
    "",
    "This assessment is an educational indicator based on self-reported answers.",
    "It is not a formal valuation, a valuation opinion, or advice of any kind.",
  );

  return lines.join("\n");
}
