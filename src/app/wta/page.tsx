import type { Metadata } from "next";
import Link from "next/link";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RankingsTable } from "@/components/RankingsTable";
import { MatchCard } from "@/components/MatchCard";
import { featuredMatches } from "@/lib/data/mock-matches";
import { fetchTourRankings } from "@/lib/rankings";

export const metadata: Metadata = {
  title: "WTA Women's Tour",
  description:
    "WTA women's tennis analytics, rankings, and innovative match stats from TennisStatMan.",
};

export const revalidate = 3600;

export default async function WtaPage() {
  const wtaMatches = featuredMatches.filter((m) => m.tour === "WTA");
  const wtaRankings = await fetchTourRankings("WTA");

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-2xl">
            <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-semibold text-pink-300">
              WTA Tour
            </span>
            <h1 className="mt-4 text-4xl font-bold">Women&apos;s Tennis</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Comprehensive WTA coverage with the same innovative lens —
              momentum shifts, pressure-point performance, and mental game
              analytics for every level of the tour.
            </p>
          </div>
          <MascotExplainer pose="flex">
            The women&apos;s tour brings the power — live top 100, featured
            analysis, and the pressure-point stats that show who holds their
            nerve.
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
        <RankingsTable snapshot={wtaRankings} limit={20} showSource />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold">Featured Analysis</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {wtaMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-muted">
            Full WTA match database, player profiles, and surface-specific stats
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
