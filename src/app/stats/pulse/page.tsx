import type { Metadata } from "next";
import Link from "next/link";
import { MascotExplainer } from "@/components/MascotExplainer";
import { PulseSpark } from "@/components/PulseSpark";
import { UpgradeCTA } from "@/components/UpgradeCTA";
import { currentPulse, players, pulseTrend } from "@/lib/data/players";
import { Activity, Flame, Snowflake } from "lucide-react";

export const metadata: Metadata = {
  title: "PULSE — the form score",
  description:
    "PULSE: Performance Under Load & Streak Evaluation. A 0-100 form score for every ATP and WTA player, updated after every match.",
};

export default function PulsePage() {
  const sorted = [...players].sort((a, b) => currentPulse(b) - currentPulse(a));
  const movers = [...players].sort((a, b) => pulseTrend(b) - pulseTrend(a));
  const hottest = movers[0];
  const coldest = movers[movers.length - 1];

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <Activity className="text-gold" size={30} />
                <h1 className="text-4xl font-bold">
                  PULSE<span className="text-gold">.</span>
                </h1>
              </div>
              <p className="mt-4 text-lg text-muted">
                <span className="text-gold-light">
                  Performance Under Load & Streak Evaluation
                </span>{" "}
                — our signature 0-100 form score. It blends recent results,
                strength of opponent, pressure-point performance, and momentum
                swings into one heartbeat you can read at a glance.
              </p>
              <p className="mt-3 text-sm text-muted">
                Rising line, rising danger. When a PULSE crosses 90, somebody
                is about to have a very good fortnight.
              </p>
            </div>
            <MascotExplainer pose="heart" className="ml-auto">
              PULSE is the site&apos;s heartbeat — one number for how alive a
              player&apos;s game is right now. When it spikes past 90, keep
              your eyes on them.
            </MascotExplainer>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* Hot / cold movers */}
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-court/30 bg-court/5 p-6">
            <h3 className="flex items-center gap-2 font-semibold text-court-light">
              <Flame size={18} /> Heating up
            </h3>
            <Link
              href={`/players/${hottest.id}`}
              className="mt-3 flex items-center justify-between hover:opacity-90"
            >
              <div>
                <p className="text-xl font-bold">{hottest.name}</p>
                <p className="text-sm text-muted">
                  +{pulseTrend(hottest)} PULSE over the last stretch
                </p>
              </div>
              <PulseSpark history={hottest.pulseHistory} width={130} height={40} />
            </Link>
          </div>
          <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
            <h3 className="flex items-center gap-2 font-semibold text-accent">
              <Snowflake size={18} /> Cooling off
            </h3>
            <Link
              href={`/players/${coldest.id}`}
              className="mt-3 flex items-center justify-between hover:opacity-90"
            >
              <div>
                <p className="text-xl font-bold">{coldest.name}</p>
                <p className="text-sm text-muted">
                  {pulseTrend(coldest)} PULSE over the last stretch
                </p>
              </div>
              <PulseSpark history={coldest.pulseHistory} width={130} height={40} />
            </Link>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
          <div className="border-b border-white/5 px-6 py-4">
            <h2 className="text-lg font-semibold">PULSE Leaderboard</h2>
            <p className="text-sm text-muted">Both tours, ranked by current form</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-6 py-3 font-medium">Player</th>
                  <th className="px-6 py-3 font-medium">Tour</th>
                  <th className="px-6 py-3 font-medium">PULSE</th>
                  <th className="px-6 py-3 font-medium">Trend</th>
                  <th className="px-6 py-3 font-medium">12-month line</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((player, i) => {
                  const trend = pulseTrend(player);
                  return (
                    <tr
                      key={player.id}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-6 py-4 font-mono text-gold">{i + 1}</td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/players/${player.id}`}
                          className="font-medium hover:text-gold-light"
                        >
                          {player.name}
                        </Link>
                        <span className="ml-2 text-xs text-muted">
                          {player.country}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted">{player.tour}</td>
                      <td className="px-6 py-4 font-mono text-lg font-bold text-gold-light">
                        {currentPulse(player)}
                      </td>
                      <td
                        className={`px-6 py-4 font-mono text-sm ${
                          trend >= 0 ? "text-court-light" : "text-red-400"
                        }`}
                      >
                        {trend >= 0 ? `+${trend}` : trend}
                      </td>
                      <td className="px-6 py-4">
                        <PulseSpark history={player.pulseHistory} width={110} height={30} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
            <h3 className="font-semibold">How PULSE is calculated</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <span className="text-gold-light">40% — Recent results:</span>{" "}
                last 10 matches, weighted by recency and tournament tier.
              </li>
              <li>
                <span className="text-gold-light">25% — Opponent strength:</span>{" "}
                beating a top-10 PULSE player moves your needle further.
              </li>
              <li>
                <span className="text-gold-light">20% — Pressure points:</span>{" "}
                break points, tiebreaks, and deciding sets count double.
              </li>
              <li>
                <span className="text-gold-light">15% — Momentum swings:</span>{" "}
                straight from our Momentum Swing Index — do you close matches
                or let them wobble?
              </li>
            </ul>
          </div>
          <UpgradeCTA
            title="PULSE alerts & archives"
            description="Courtside members get PULSE spike alerts, full historical archives back to a player's first pro match, and PULSE tracking for every Challenger and ITF player on the planet."
          />
        </div>
      </section>
    </div>
  );
}
