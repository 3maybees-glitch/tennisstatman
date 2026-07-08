import type { Metadata } from "next";
import Link from "next/link";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RankingsTable } from "@/components/RankingsTable";
import { MatchCard } from "@/components/MatchCard";
import { featuredMatches } from "@/lib/data/mock-matches";
import { fetchTourRankings } from "@/lib/rankings";

export const metadata: Metadata = {
  title: "ATP Men's Tour",
  description:
    "ATP men's tennis analytics, rankings, and innovative match stats from TennisStatMan.",
};

export const revalidate = 3600;

export default async function AtpPage() {
  const atpMatches = featuredMatches.filter((m) => m.tour === "ATP");
  const atpRankings = await fetchTourRankings("ATP");

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-2xl">
            <span className="rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-blue-300">
              ATP Tour
            </span>
            <h1 className="mt-4 text-4xl font-bold">Men&apos;s Tennis</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Deep analytics for the ATP Tour — from Grand Slams to Masters
              1000. Track momentum, clutch performance, and the invisible
              battle for control on every surface.
            </p>
          </div>
          <MascotExplainer pose="racquet">
            The men&apos;s tour, served up with the good stuff — live top 100,
            featured matchups, and the momentum swings behind every scoreline.
          </MascotExplainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Current Rankings</h2>
          <Link href="/rankings" className="text-sm text-gold hover:text-gold-light">
            Full rankings →
          </Link>
        </div>
        <RankingsTable snapshot={atpRankings} limit={20} showSource />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold">Featured Analysis</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {atpMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-muted">
            Full ATP match database, player profiles, and surface-specific stats
            coming in the next release.
          </p>
          <Link
            href="/stats"
            className="mt-4 inline-block text-gold hover:text-gold-light"
          >
            See what we&apos;re building →
          </Link>
        </div>
      </section>
    </div>
  );
}
