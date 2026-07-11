import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CourtsideCheckout } from "@/components/CourtsideCheckout";
import { MascotExplainer } from "@/components/MascotExplainer";
import { LAUNCH_ACTIVE } from "@/lib/pricing";
import { Check, Sparkles } from "lucide-react";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PRICING_FAQS } from "@/lib/seo/faqs";
import { faqPageJsonLd, productJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing — Free & Courtside",
  description:
    "TennisStatMan is free for every fan. Courtside membership unlocks unlimited comparisons, PULSE archives, alerts, and ITF-level scouting.",
  path: "/pricing",
});

const freeFeatures = [
  "Live ATP & WTA rankings, refreshed hourly",
  "Player cards with all five skill grades",
  "Current PULSE scores and the leaderboard",
  "World map — tournaments and player origins",
  "The Master Calendar, Slams down to ITF",
  "Race to the Finals animation",
  "3 legend comparisons per day",
  "Stat of the Day and AI player profiles",
  "Beat Stat Man weekly picks",
];

const courtsideFeatures = [
  "Everything in Free, plus:",
  "Unlimited legend comparisons — any player, any era",
  "Full PULSE history archives for every player",
  "PULSE spike alerts and personal watchlists",
  "AI scouting reports down to Challenger & ITF level",
  "Matchup projections: any player vs any player",
  "Top-10 skill leaderboards for ATP & WTA (Serve, FH, BH, Net, Movement)",
  "Extended skill deep dives — Return, Clutch, Consistency, Defense, Power",
  "Custom stat sliders and downloadable data",
  "Graded picks history and season leaderboard",
  "Skill category leaderboards — top 10 bar charts & tables per stroke",
  "Ad-free, and early access to new Stat Lab metrics",
];

export default function PricingPage() {
  return (
    <div className="court-pattern">
      <JsonLd data={[productJsonLd(), faqPageJsonLd(PRICING_FAQS)]} />
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <div className="flex justify-center">
            <MascotExplainer pose="thumbsup">
              Good news: the stats stay free, forever. Courtside is just for
              the superfans who want to read the footnotes with me.
            </MascotExplainer>
          </div>
          {LAUNCH_ACTIVE ? (
            <span className="mt-4 inline-flex rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-gold">
              Launch pricing live
            </span>
          ) : null}
          <h1 className="mt-6 text-4xl font-bold">
            Free for every fan.{" "}
            <span className="gradient-text">Courtside for the obsessed.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            The stats, the map, the calendar, and the cards stay free forever.
            Courtside is for the fans who want to go deeper than anyone else.
          </p>
          {LAUNCH_ACTIVE ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gold-light">
              Launch offer: $39/year, $1.99 first month, or $149 lifetime early
              bird. Regular pricing moves to $6.99/mo and $59/yr after launch.
            </p>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-navy-light p-8">
            <h2 className="text-xl font-bold">Fan</h2>
            <p className="mt-1 text-sm text-muted">
              Everything you need to follow the tour
            </p>
            <p className="mt-6 text-4xl font-bold">
              $0
              <span className="text-base font-normal text-muted"> / forever</span>
            </p>
            <ul className="mt-8 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-court-light"
                  />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/players"
              className="mt-8 block rounded-xl border border-white/10 bg-white/5 py-3 text-center font-semibold transition-colors hover:bg-white/10"
            >
              Start exploring
            </Link>
          </div>

          <div className="glow-gold relative rounded-2xl border border-gold/40 bg-gradient-to-b from-gold/10 to-navy-light p-8">
            <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
              {LAUNCH_ACTIVE ? "LAUNCH" : "MEMBERS"}
            </span>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gold-light">
              <Sparkles size={18} /> Courtside
            </h2>
            <p className="mt-1 text-sm text-muted">
              For the fan who reads the footnotes
            </p>
            {LAUNCH_ACTIVE ? (
              <div className="mt-6 space-y-1">
                <p className="text-4xl font-bold">
                  $39
                  <span className="text-base font-normal text-muted"> / year</span>
                </p>
                <p className="text-sm text-muted line-through">Regular $59/yr</p>
                <p className="text-xs text-gold-light">
                  Also: $1.99 first month or $149 lifetime early bird
                </p>
              </div>
            ) : (
              <div className="mt-6 space-y-1">
                <p className="text-4xl font-bold">
                  $6.99
                  <span className="text-base font-normal text-muted"> / month</span>
                </p>
                <p className="text-xs text-muted">or $59/year — best value</p>
              </div>
            )}
            <ul className="mt-8 space-y-3">
              {courtsideFeatures.map((f, i) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check
                    size={16}
                    className={`mt-0.5 shrink-0 ${i === 0 ? "text-muted" : "text-gold"}`}
                  />
                  <span className={i === 0 ? "text-muted" : "text-foreground/90"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <Suspense
              fallback={
                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm text-muted">
                  Loading checkout…
                </div>
              }
            >
              <CourtsideCheckout />
            </Suspense>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Courtside is billed through Stripe. Use the same browser after checkout
          so your membership cookie can unlock member features.
        </p>
      </section>

      <FaqSection faqs={PRICING_FAQS} />
    </div>
  );
}
