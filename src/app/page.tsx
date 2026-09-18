import { Assessment } from "@/components/Assessment";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DIMENSIONS } from "@/lib/questions";
import { BANDS } from "@/lib/scoring";

const STEPS = [
  {
    number: "01",
    title: "Answer ten questions",
    body: "Each one has four options. Pick the description that is closest to the truth today, not the one you are working towards.",
  },
  {
    number: "02",
    title: "Get scored across three dimensions",
    body: "Financial readiness carries half the weight, operational readiness thirty percent, and strategic readiness the remaining twenty.",
  },
  {
    number: "03",
    title: "See your gaps and a timeline",
    body: "Your result names what is working, what a buyer would question, and roughly how long the preparation work tends to take.",
  },
];

const FAQS = [
  {
    question: "How long does the assessment take?",
    answer:
      "Under three minutes. Ten questions, four options each, one question per screen.",
  },
  {
    question: "Do I have to register or pay?",
    answer:
      "No. There is no registration, no paywall and no credit card. You can email yourself a copy of the results, but it is entirely optional.",
  },
  {
    question: "What happens to my answers?",
    answer:
      "They stay in your browser. Scoring runs on your own device, and nothing is stored on a server unless you choose to email yourself a copy.",
  },
  {
    question: "Is this a business valuation?",
    answer:
      "No. It is an educational indicator of how prepared your business is for a sale process. A formal valuation is a separate, evidence-based engagement — this assessment is a way to decide whether that conversation is worth having yet.",
  },
  {
    question: "Why is financial readiness weighted the most?",
    answer:
      "Because it is what a buyer tests first and prices hardest. Clean records, diversified revenue, stable margins and clean earnings determine whether a deal gets to diligence at all.",
  },
  {
    question: "What should I do with a low score?",
    answer:
      "Treat it as a baseline. Low scores usually cluster in the areas that improve fastest — record-keeping, documentation and owner dependency — and each improvement removes a discount a buyer would otherwise ask for.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden bg-forest">
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-teal/15 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-28">
            <div>
              <p className="eyebrow text-teal">Exit Readiness Assessment</p>
              <h1 className="mt-4 text-4xl leading-[1.08] font-bold text-white sm:text-5xl lg:text-6xl">
                Are you ready to sell your business?
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                Most owners find out what their business is really worth during
                diligence, when it is too late to change the answer. Ten
                questions will tell you where you stand before a buyer does.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#assessment"
                  className="rounded-full bg-teal px-8 py-4 text-center font-semibold text-white transition hover:bg-teal-dark"
                >
                  Start the assessment
                </a>
                <a
                  href="#how-it-works"
                  className="rounded-full border border-white/30 px-8 py-4 text-center font-semibold text-white transition hover:border-teal hover:text-teal"
                >
                  How it works
                </a>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/60">
                <li>Under three minutes</li>
                <li>No registration</li>
                <li>Results immediately</li>
              </ul>
            </div>

            <div className="rounded-3xl border border-white/12 bg-white/5 p-8 backdrop-blur">
              <p className="eyebrow text-teal">What you get</p>
              <ul className="mt-6 space-y-5">
                {[
                  "A readiness score from 0 to 100, with the band it falls into",
                  "A pillar-by-pillar breakdown across financial, operational and strategic readiness",
                  "The strengths a buyer would pay for, and the gaps they would price against",
                  "A realistic preparation timeline for your situation",
                ].map((item) => (
                  <li key={item} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal"
                    />
                    <span className="leading-relaxed text-white/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow text-teal">How it works</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-forest sm:text-4xl">
              A structured read on your business, not a personality quiz
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.number} className="border-t-2 border-teal pt-5">
                  <span className="text-sm font-bold tracking-widest text-teal">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-forest">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-charcoal/70">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section id="assessment" className="scroll-mt-20 bg-bone">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Assessment />
          </div>
        </section>

        {/* The three dimensions */}
        <section id="dimensions" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow text-teal">What we measure</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-forest sm:text-4xl">
              The three dimensions that decide whether a deal closes
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {(
                [
                  [
                    "financial",
                    [
                      "Quality of financial records",
                      "Revenue concentration",
                      "Margin and EBITDA stability",
                      "Performance vs. benchmarks",
                      "Quality of earnings",
                    ],
                  ],
                  [
                    "operational",
                    [
                      "Owner dependency",
                      "Documented processes",
                      "Regulatory and compliance exposure",
                    ],
                  ],
                  [
                    "strategic",
                    ["Post-exit personal plan", "Deal structure and tax literacy"],
                  ],
                ] as const
              ).map(([key, items]) => (
                <article
                  key={key}
                  className="flex flex-col rounded-2xl border border-line bg-bone p-7"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-xl font-bold text-forest">
                      {DIMENSIONS[key].name}
                    </h3>
                    <span className="rounded-full bg-teal/12 px-3 py-1 text-xs font-bold text-teal">
                      {Math.round(DIMENSIONS[key].weight * 100)}%
                    </span>
                  </div>
                  <p className="mt-3 leading-relaxed text-charcoal/70">
                    {DIMENSIONS[key].blurb}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm text-charcoal/75">
                    {items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Readiness bands */}
        <section className="bg-forest">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow text-teal">How scores are read</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Five readiness bands
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
              Your overall score places you in one of five bands. Each one
              implies a different preparation timeline, and a different
              conversation.
            </p>

            <div className="mt-11 overflow-hidden rounded-2xl border border-white/12">
              {BANDS.map((band, position) => (
                <div
                  key={band.id}
                  className={`flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:gap-8 ${
                    position % 2 === 0 ? "bg-white/[0.04]" : ""
                  }`}
                >
                  <span className="w-24 shrink-0 font-bold text-teal">
                    {band.min}–{band.max}
                  </span>
                  <span className="w-44 shrink-0 text-lg font-bold text-white">
                    {band.label}
                  </span>
                  <span className="leading-relaxed text-white/70">
                    {band.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <p className="eyebrow text-teal">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-forest sm:text-4xl">
              Frequently asked questions
            </h2>

            <div className="mt-10 divide-y divide-line border-y border-line">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-forest marker:hidden">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-2xl leading-none font-light text-teal transition group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-3xl leading-relaxed text-charcoal/70">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <div className="mt-14 rounded-2xl bg-bone px-6 py-10 text-center sm:px-10">
              <p className="eyebrow text-teal">Know your worth</p>
              <h3 className="mt-3 text-2xl font-bold text-forest sm:text-3xl">
                Ready to see where you stand?
              </h3>
              <a
                href="#assessment"
                className="mt-7 inline-block rounded-full bg-teal px-9 py-4 font-semibold text-white transition hover:bg-teal-dark"
              >
                Take the assessment
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
