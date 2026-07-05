import { Hero } from "@/components/Hero";
import { MatchCard } from "@/components/MatchCard";
import { RankingsTable } from "@/components/RankingsTable";
import { StatFeatureCard } from "@/components/StatFeatureCard";
import {
  featuredMatches,
  tourRankings,
  upcomingStats,
} from "@/lib/data/mock-matches";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Featured Match Analysis</h2>
          <p className="mt-3 text-muted">
            Preview our momentum tracking on iconic ATP and WTA encounters
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-navy-light/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Rankings Snapshot</h2>
            <p className="mt-3 text-muted">
              Current top 5 on both tours — full dashboards coming soon
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <RankingsTable tour="ATP" entries={tourRankings.atp} />
            <RankingsTable tour="WTA" entries={tourRankings.wta} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">The Stats Lab</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            We&apos;re building metrics that capture what traditional stats
            miss — the psychological and environmental currents running through
            every match.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingStats.map((stat) => (
            <StatFeatureCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>
    </>
  );
}
