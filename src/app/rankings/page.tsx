import type { Metadata } from "next";
import { Trophy } from "lucide-react";
import { RankingsTable } from "@/components/RankingsTable";
import { fetchAllRankings } from "@/lib/rankings";

export const metadata: Metadata = {
  title: "Official Rankings",
  description:
    "Live ATP and WTA official singles rankings pulled into TennisStatMan from tour sources.",
};

export const revalidate = 3600;

export default async function RankingsPage() {
  const { atp, wta } = await fetchAllRankings();

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <Trophy className="text-gold" size={28} />
            <h1 className="text-4xl font-bold">Official Tour Rankings</h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            Top 100 singles rankings for the ATP and WTA tours, refreshed daily
            via Tennis API when configured, with official tour sources as
            fallback.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-10 px-6 py-16">
        <RankingsTable snapshot={atp} showSource />
        <RankingsTable snapshot={wta} showSource />
      </section>
    </div>
  );
}
