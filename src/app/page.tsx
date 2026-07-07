import Link from "next/link";
import { Hero } from "@/components/Hero";
import { MatchCard } from "@/components/MatchCard";
import { RankingsTable } from "@/components/RankingsTable";
import { StatFeatureCard } from "@/components/StatFeatureCard";
import { featuredMatches, upcomingStats } from "@/lib/data/mock-matches";
import { fetchAllRankings } from "@/lib/rankings";

export const revalidate = 3600;

export default async function HomePage() {
  const { atp, wta } = await fetchAllRankings();

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
              Official top 5 on both tours, refreshed hourly
            </p>
            <Link
              href="/rankings"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
            >
              View full rankings →
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <RankingsTable snapshot={atp} limit={5} fullPageLink />
            <RankingsTable snapshot={wta} limit={5} fullPageLink />
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
