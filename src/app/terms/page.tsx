import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms for using TennisStatMan, Courtside membership, and the Player Guide.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="court-pattern">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">Terms of Use</h1>
        <p className="mt-4 text-muted">Last updated November 25, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-gold-light">The service</h2>
            <p className="mt-3 text-muted">
              TennisStatMan provides fan-built tennis statistics and editorial
              analytics. Rankings and tour data come from public sources; our
              skill grades, PULSE scores, and scouting copy are our own analysis —
              not official tour statistics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">No affiliation</h2>
            <p className="mt-3 text-muted">
              TennisStatMan is not affiliated with, endorsed by, or sponsored by the
              ATP, WTA, ITF, or any Grand Slam tournament.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Courtside membership</h2>
            <p className="mt-3 text-muted">
              Paid Courtside access is a digital subscription (or one-time lifetime
              purchase) billed through Stripe. Prices shown at checkout apply.
              Subscriptions renew until you cancel in the Stripe customer portal.
              Refunds follow Stripe and our support practices — we&apos;re a small
              shop, so email us if something went wrong.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Player Guide</h2>
            <p className="mt-3 text-muted">
              The Summer 2026 Player Guide is a digital PDF. Your license is personal;
              don&apos;t resell or redistribute the file.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Disclaimer</h2>
            <p className="mt-3 text-muted">
              Content is for entertainment and fan analysis. We don&apos;t guarantee
              accuracy of third-party data or betting outcomes. Use at your own
              discretion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Changes</h2>
            <p className="mt-3 text-muted">
              We may update these terms or the site. Continued use after changes
              means you accept the updated terms.
            </p>
          </section>

          <p className="text-sm text-muted">
            <Link href="/privacy" className="text-gold hover:text-gold-light">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/pricing" className="text-gold hover:text-gold-light">
              Pricing
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}