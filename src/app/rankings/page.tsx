import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RankingsTable } from "@/components/RankingsTable";
import { fetchAllRankings } from "@/lib/rankings";
import {
  latestRankingsUpdatedAt,
  rankingsRefreshFootnote,
} from "@/lib/rankings/display";

export const metadata: Metadata = {
  title: "Official Rankings",
  description:
    "ATP and WTA official singles rankings on TennisStatMan, sourced from tour feeds and updated periodically.",
};

export const revalidate = 3600;

export default async function RankingsPage() {
  const { atp, wta } = await fetchAllRankings();
  const updatedNote = rankingsRefreshFootnote(
    latestRankingsUpdatedAt([atp, wta]),
  );

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Trophy className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Official Tour Rankings</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Top 100 singles rankings for the ATP and WTA tours. {updatedNote}
            </p>
          </div>
          <MascotExplainer pose="chart">
            The scoreboard of the whole sport — the official top 100 on both
            tours. I pull from tour feeds when we refresh; the date on each
            table tells you how fresh it is.
          </MascotExplainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-6 py-16">
        <RankingsTable snapshot={atp} showSource />
        <RankingsTable snapshot={wta} showSource />
      </section>
    </div>
  );
}
