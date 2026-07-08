import type { Metadata } from "next";
import Link from "next/link";
import { StatManMascot } from "@/components/StatManMascot";
import { Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Free & Courtside",
  description:
    "TennisStatMan is free for every fan. Courtside membership unlocks unlimited comparisons, PULSE archives, alerts, and ITF-level scouting.",
};

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
  "Custom stat sliders and downloadable data",
  "Graded picks history and season leaderboard",
  "Ad-free, and early access to new Stat Lab metrics",
];

export default function PricingPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <div className="flex justify-center">
            <StatManMascot size={110} />
          </div>
          <h1 className="mt-4 text-4xl font-bold">
            Free for every fan.{" "}
            <span className="gradient-text">Courtside for the obsessed.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            The stats, the map, the calendar, and the cards stay free forever.
            Courtside is for the fans who want to go deeper than anyone else.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Free */}
          <div className="rounded-2xl border border-white/10 bg-navy-light p-8">
            <h2 className="text-xl font-bold">Fan</h2>
            <p className="mt-1 text-sm text-muted">Everything you need to follow the tour</p>
            <p className="mt-6 text-4xl font-bold">
              $0
              <span className="text-base font-normal text-muted"> / forever</span>
            </p>
            <ul className="mt-8 space-y-3">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check size={16} className="mt-0.5 shrink-0 text-court-light" />
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

          {/* Courtside */}
          <div className="glow-gold relative rounded-2xl border border-gold/40 bg-gradient-to-b from-gold/10 to-navy-light p-8">
            <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy">
              MEMBERS
            </span>
            <h2 className="flex items-center gap-2 text-xl font-bold text-gold-light">
              <Sparkles size={18} /> Courtside
            </h2>
            <p className="mt-1 text-sm text-muted">For the fan who reads the footnotes</p>
            <p className="mt-6 text-4xl font-bold">
              $6<span className="text-base font-normal text-muted"> / month</span>
            </p>
            <p className="text-xs text-muted">or $48/year — two months free</p>
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
            <button
              type="button"
              className="mt-8 w-full cursor-not-allowed rounded-xl bg-gold py-3 text-center font-semibold text-navy opacity-90"
              title="Membership launching soon"
            >
              Coming soon — join the waitlist
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Courtside billing isn&apos;t live yet — the tier previews what
          membership will include at launch.
        </p>
      </section>
    </div>
  );
}
