export type Dimension = "financial" | "operational" | "strategic";

export interface AnswerOption {
  /** Option key as it appears in the specification (A = 3 pts ... D = 0 pts). */
  key: "A" | "B" | "C" | "D";
  label: string;
  detail: string;
  points: 0 | 1 | 2 | 3;
}

export interface Question {
  /** 1-based question number, matching the specification. */
  id: number;
  dimension: Dimension;
  title: string;
  /** Short framing shown under the question to set context. */
  context: string;
  /** Used to build the "Strengths" list on the results page. */
  strength: string;
  /** Used to build the "Priority gaps" list on the results page. */
  gap: string;
  options: AnswerOption[];
}

export const DIMENSIONS: Record<
  Dimension,
  { name: string; weight: number; blurb: string }
> = {
  financial: {
    name: "Financial",
    weight: 0.5,
    blurb:
      "The quality, consistency and defensibility of your numbers — the first thing a buyer or lender tests.",
  },
  operational: {
    name: "Operational",
    weight: 0.3,
    blurb:
      "How well the business runs without you, and how much of its know-how is written down rather than carried in your head.",
  },
  strategic: {
    name: "Strategic",
    weight: 0.2,
    blurb:
      "Your own readiness: what happens after the sale, and how well you understand the structure of the deal.",
  },
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "financial",
    title: "How would you describe the state of your financial records?",
    context:
      "Buyers begin with your statements. Clean, consistent records shorten diligence and protect value.",
    strength: "Financial records are clean and diligence-ready",
    gap: "Financial records need cleanup before going to market",
    options: [
      {
        key: "A",
        label: "Professionally prepared or audited",
        detail:
          "Reviewed or audited statements produced by an external accountant.",
        points: 3,
      },
      {
        key: "B",
        label: "Well-organized, internally prepared",
        detail: "Consistent internal statements, reconciled and up to date.",
        points: 2,
      },
      {
        key: "C",
        label: "Mostly in order, needs cleanup",
        detail: "Broadly reliable, but some accounts would need tidying first.",
        points: 1,
      },
      {
        key: "D",
        label: "Disorganized or mixed with personal expenses",
        detail: "Business and personal items are not cleanly separated.",
        points: 0,
      },
    ],
  },
  {
    id: 2,
    dimension: "financial",
    title: "What is the primary revenue driver of your business?",
    context:
      "Revenue concentration is one of the most common reasons a valuation is discounted.",
    strength: "Revenue is diversified across multiple stable streams",
    gap: "Revenue is concentrated in too few customers",
    options: [
      {
        key: "A",
        label: "Multiple stable revenue streams",
        detail: "No single customer or line of business dominates.",
        points: 3,
      },
      {
        key: "B",
        label: "A few customers, top three under 70% of revenue",
        detail: "Some concentration, but within a range buyers accept.",
        points: 2,
      },
      {
        key: "C",
        label: "A few customers, top three at 70–90% of revenue",
        detail: "Material concentration that buyers will price for.",
        points: 1,
      },
      {
        key: "D",
        label: "One or two customers, over 90% of revenue",
        detail: "The business is effectively tied to a single relationship.",
        points: 0,
      },
    ],
  },
  {
    id: 3,
    dimension: "operational",
    title: "How would you characterize your business's owner dependency?",
    context:
      "A buyer is purchasing a business, not a job. The less it depends on you, the more transferable it is.",
    strength: "The business runs without day-to-day owner involvement",
    gap: "The business depends heavily on the owner",
    options: [
      {
        key: "A",
        label: "Runs smoothly without the owner",
        detail: "A management team handles operations and most decisions.",
        points: 3,
      },
      {
        key: "B",
        label: "Stable, but key decisions run through the owner",
        detail: "Operations are delegated; strategy and approvals are not.",
        points: 2,
      },
      {
        key: "C",
        label: "Owner is involved in most day-to-day matters",
        detail: "Daily operations would stall without the owner present.",
        points: 1,
      },
      {
        key: "D",
        label: "Entirely dependent on the owner",
        detail: "Relationships, pricing and delivery all sit with the owner.",
        points: 0,
      },
    ],
  },
  {
    id: 4,
    dimension: "operational",
    title: "What is the current state of your operational documentation?",
    context:
      "Documented process is what lets a new owner keep the business running from day one.",
    strength: "Processes are documented and transferable",
    gap: "Operating procedures are largely undocumented",
    options: [
      {
        key: "A",
        label: "Complete procedures manual",
        detail: "Core processes are written, current and actually used.",
        points: 3,
      },
      {
        key: "B",
        label: "Most processes documented",
        detail: "Key workflows are captured; some gaps remain.",
        points: 2,
      },
      {
        key: "C",
        label: "Limited documentation",
        detail: "A few written procedures; most knowledge is informal.",
        points: 1,
      },
      {
        key: "D",
        label: "No formal documentation",
        detail: "Know-how lives with individual people.",
        points: 0,
      },
    ],
  },
  {
    id: 5,
    dimension: "financial",
    title:
      "How stable are your profit margins and EBITDA trends over the last three years?",
    context:
      "Buyers pay for earnings they can rely on. The trend matters as much as the level.",
    strength: "Margins and EBITDA trends are stable or improving",
    gap: "Margin and EBITDA volatility will need explaining",
    options: [
      {
        key: "A",
        label: "Consistent or growing margins",
        detail: "A clear, defensible three-year trend.",
        points: 3,
      },
      {
        key: "B",
        label: "Generally stable with some variance",
        detail: "Movement year to year, but explainable.",
        points: 2,
      },
      {
        key: "C",
        label: "Fluctuating margins",
        detail: "No clear trend; results move with circumstance.",
        points: 1,
      },
      {
        key: "D",
        label: "Declining margins or unclear visibility",
        detail: "Earnings are falling, or you cannot see them clearly.",
        points: 0,
      },
    ],
  },
  {
    id: 6,
    dimension: "strategic",
    title: "What is your personal plan after an exit?",
    context:
      "Deals stall when the owner is not ready personally, even when the business is.",
    strength: "You have a clear personal plan for life after the sale",
    gap: "Your post-exit personal plan is not yet defined",
    options: [
      {
        key: "A",
        label: "A clear plan is defined",
        detail: "You know what comes next, financially and personally.",
        points: 3,
      },
      {
        key: "B",
        label: "A general idea, planning has begun",
        detail: "Direction is set; the detail is still being worked out.",
        points: 2,
      },
      {
        key: "C",
        label: "Vague ideas",
        detail: "You have thought about it, but nothing is settled.",
        points: 1,
      },
      {
        key: "D",
        label: "No plan, and unsure",
        detail: "Life after the business has not been considered yet.",
        points: 0,
      },
    ],
  },
  {
    id: 7,
    dimension: "strategic",
    title:
      "What is your understanding of the tax implications of a share sale versus an asset sale?",
    context:
      "Deal structure can change your after-tax proceeds materially. It is worth understanding early.",
    strength: "You understand how deal structure affects your proceeds",
    gap: "Tax and deal-structure implications are not yet understood",
    options: [
      {
        key: "A",
        label: "Well-informed, and I have consulted an advisor",
        detail: "You have modelled the after-tax outcome of each structure.",
        points: 3,
      },
      {
        key: "B",
        label: "Somewhat informed",
        detail: "You know the difference, but not what it means for you.",
        points: 2,
      },
      {
        key: "C",
        label: "Limited knowledge",
        detail: "You are aware the distinction exists.",
        points: 1,
      },
      {
        key: "D",
        label: "No knowledge",
        detail: "This has not been looked at yet.",
        points: 0,
      },
    ],
  },
  {
    id: 8,
    dimension: "financial",
    title: "How does your business perform against industry benchmarks?",
    context:
      "Relative performance drives the multiple a buyer is willing to apply.",
    strength: "Performance is strong relative to industry benchmarks",
    gap: "Performance trails industry benchmarks",
    options: [
      {
        key: "A",
        label: "Strong margins and metrics",
        detail: "You outperform comparable businesses in your sector.",
        points: 3,
      },
      {
        key: "B",
        label: "Comparable to the industry",
        detail: "Broadly in line with sector norms.",
        points: 2,
      },
      {
        key: "C",
        label: "Slightly below average",
        detail: "Behind peers on one or more key metrics.",
        points: 1,
      },
      {
        key: "D",
        label: "Significantly below benchmarks",
        detail: "Materially behind comparable businesses.",
        points: 0,
      },
    ],
  },
  {
    id: 9,
    dimension: "financial",
    title: "How would you rate your quality of earnings?",
    context:
      "Add-backs and non-recurring items are where buyers push back hardest on price.",
    strength: "Earnings are clean, with minimal add-backs",
    gap: "Significant add-backs will invite buyer scrutiny",
    options: [
      {
        key: "A",
        label: "Clean earnings, minimal add-backs",
        detail: "Reported earnings closely reflect true operating performance.",
        points: 3,
      },
      {
        key: "B",
        label: "Generally clean, some add-backs",
        detail: "A handful of adjustments, each well supported.",
        points: 2,
      },
      {
        key: "C",
        label: "Moderate add-backs",
        detail: "Normalization is needed to show real earnings.",
        points: 1,
      },
      {
        key: "D",
        label: "Significant add-backs",
        detail: "Reported results differ substantially from operating reality.",
        points: 0,
      },
    ],
  },
  {
    id: 10,
    dimension: "operational",
    title: "What is your business's exposure to regulatory or compliance risk?",
    context:
      "Unresolved compliance issues surface in diligence and can delay or derail a transaction.",
    strength: "Regulatory and compliance posture is sound",
    gap: "Compliance gaps could surface during diligence",
    options: [
      {
        key: "A",
        label: "Fully compliant, with regular audits",
        detail: "Obligations are tracked and independently verified.",
        points: 3,
      },
      {
        key: "B",
        label: "Generally compliant",
        detail: "No known issues, though monitoring is informal.",
        points: 2,
      },
      {
        key: "C",
        label: "Some compliance gaps",
        detail: "Known items remain outstanding.",
        points: 1,
      },
      {
        key: "D",
        label: "Significant issues or past violations",
        detail: "Material exposure a buyer would price for or exclude.",
        points: 0,
      },
    ],
  },
];
