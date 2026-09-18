import { AspenLogo } from "./AspenLogo";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-forest text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <AspenLogo variant="light" />
            <p className="mt-5 text-3xl font-bold tracking-[0.12em] text-teal">
              KNOW YOUR WORTH
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Independent business valuation and exit advisory. We help owners
              understand what their business is worth, and what it would take to
              be worth more.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="eyebrow text-white/50">Assessment</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <a href="#assessment" className="transition hover:text-teal">
                    Take the assessment
                  </a>
                </li>
                <li>
                  <a href="#dimensions" className="transition hover:text-teal">
                    The three dimensions
                  </a>
                </li>
                <li>
                  <a href="#faq" className="transition hover:text-teal">
                    Frequently asked questions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eyebrow text-white/50">Contact</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                <li>
                  <a
                    href="mailto:yen.dang@aspenval.com"
                    className="transition hover:text-teal"
                  >
                    yen.dang@aspenval.com
                  </a>
                </li>
                <li className="text-white/60">Aspen Valuations</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/50">
          <p>
            This assessment is an educational tool based on self-reported
            answers. It does not constitute a formal valuation, a valuation
            opinion, or financial, legal or tax advice, and it should not be
            relied upon for any transaction decision.
          </p>
          <p className="mt-3">
            © {new Date().getFullYear()} Aspen Valuations. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
