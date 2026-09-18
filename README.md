# Exit Readiness Assessment — Aspen Valuations

A ten-question business exit readiness assessment with client-side scoring, built
to the specification in [docs/](docs/).

Users answer ten multiple-choice questions (four options each, worth 3/2/1/0
points). Scores are calculated in the browser across three dimensions and mapped
to one of five readiness bands.

## Scoring

```
Financial   = (Q1 + Q2 + Q5 + Q8 + Q9) / 15 × 100
Operational = (Q3 + Q4 + Q10)          /  9 × 100
Strategic   = (Q6 + Q7)                /  6 × 100

Overall     = (Financial × 0.50) + (Operational × 0.30) + (Strategic × 0.20)
```

| Score  | Band              | Colour    |
| ------ | ----------------- | --------- |
| 80–100 | Exit Ready        | `#05B4C9` |
| 65–79  | Mostly Ready      | `#05B4C9` |
| 50–64  | Partially Ready   | `#1A322F` |
| 35–49  | Limited Readiness | `#1A322F` |
| 0–34   | Not Ready         | `#333333` |

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Deployed on Vercel

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Project structure

```
src/
  app/
    layout.tsx                  # fonts, metadata
    page.tsx                    # landing page: hero, how it works, dimensions, bands, FAQ
    globals.css                 # brand tokens (teal / forest / charcoal)
    api/send-results/route.ts   # optional "email me a copy" endpoint
  components/
    Assessment.tsx              # intro → quiz → results state machine
    QuestionCard.tsx            # one question per screen, with progress bar
    ResultsView.tsx             # gauge, dimension cards, strengths, gaps, timeline, CTAs
    ScoreGauge.tsx              # animated SVG arc gauge
    EmailResultsForm.tsx        # optional email / copy / print
    SiteHeader.tsx, SiteFooter.tsx, AspenLogo.tsx
  lib/
    questions.ts                # the ten questions, options and dimension mapping
    scoring.ts                  # scoring formulas, bands, summary text
```

Answers live in component state only. Nothing is persisted or sent anywhere
unless the user opts in to emailing themselves a copy.

## Optional: emailing results

`POST /api/send-results` is disabled until credentials are present, and the UI
falls back to "Copy summary" and "Print or save as PDF". To enable it, set:

```
RESEND_API_KEY=re_xxxxxxxx
RESULTS_FROM_EMAIL="Aspen Valuations <noreply@yourdomain.com>"
```

locally in `.env.local`, or as environment variables in the Vercel project.

## Outstanding items

- **Brand logo** — `src/components/AspenLogo.tsx` is a placeholder lockup. Drop
  the official asset at `public/aspen-logo.svg` and swap the component for an
  `<Image />`.
- **Typography** — DIN Next LT Pro is referenced first in the font stack, with
  Barlow as the free web fallback and Arial last. Self-host the licensed DIN
  files under `public/fonts/` to use the real brand face.
- **"Discuss your results" CTA** — currently inert. The destination is marked
  with a `TODO` in `src/components/ResultsView.tsx`.

## Deployment

Push to GitHub and import the repository into Vercel, or run `vercel --prod`.
No build configuration is needed; the defaults for Next.js apply.
