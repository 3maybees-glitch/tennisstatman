import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How TennisStatMan handles cookies, Stripe payments, and analytics on tennisstatman.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="court-pattern">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>
        <p className="mt-4 text-muted">Last updated November 25, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-foreground/90">
          <section>
            <h2 className="text-xl font-semibold text-gold-light">Who we are</h2>
            <p className="mt-3 text-muted">
              TennisStatMan (tennisstatman.com) is a small, fan-run tennis stats
              site. We are not affiliated with the ATP, WTA, or ITF.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">What we collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
              <li>
                <strong className="text-foreground">Courtside access:</strong> If
                you subscribe, Stripe processes your payment. We store an httpOnly
                cookie on your device that holds your Stripe customer id so member
                features work in that browser.
              </li>
              <li>
                <strong className="text-foreground">Email:</strong> If you use
                magic-link sign-in (when RESEND_API_KEY and ACCOUNT_EMAIL_FROM are
                set), we use the email you enter only to look up your Stripe
                customer and send a one-time sign-in link.
              </li>
              <li>
                <strong className="text-foreground">Analytics:</strong> We use
                Vercel Analytics for aggregated traffic — not for selling data.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Cookies</h2>
            <p className="mt-3 text-muted">
              Besides the Courtside membership cookie, the site may set standard
              session or preference cookies. You can clear cookies in your browser;
              that will sign you out of Courtside on that device until you sign in
              again.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Stripe</h2>
            <p className="mt-3 text-muted">
              Payments and billing are handled by Stripe. We do not store full card
              numbers. Stripe&apos;s privacy policy applies to payment data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gold-light">Contact</h2>
            <p className="mt-3 text-muted">
              Questions about privacy? Reach us on{" "}
              <a
                href="https://x.com/TennisStatMan"
                className="text-gold hover:text-gold-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                @TennisStatMan
              </a>{" "}
              on X.
            </p>
          </section>

          <p className="text-sm text-muted">
            See also our <Link href="/terms">Terms of Use</Link> and{" "}
            <Link href="/pricing">Courtside pricing</Link>.
          </p>
        </div>
      </article>
    </div>
  );
}