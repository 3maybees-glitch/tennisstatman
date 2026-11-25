import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RaceChart } from "@/components/RaceChart";

import { ATP_RACE_AS_OF } from "@/lib/data/race";
import { SEASON_WRAP_HEADLINE } from "@/lib/promotions/off-season";

export const metadata: Metadata = {
  title: "Race to the Finals",
  description: `${SEASON_WRAP_HEADLINE}. ATP year-end race standings as of ${ATP_RACE_AS_OF}, plus an illustrative WTA season sketch.`,
};

export default function RacePage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Trophy className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Race to the Finals</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              ATP bars show year-end race points as of {ATP_RACE_AS_OF} after
              the Nitto ATP Finals. The WTA view is an illustrative season
              sketch — press play there, or stay on the ATP totals.
            </p>
            <Link
              href="/race/picks"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light"
            >
              Beat Stat Man — weekly picks
              <ArrowRight size={16} />
            </Link>
          </div>
          <MascotExplainer pose="stopwatch">
            The ATP board is a year-end snapshot, not a replay. Flip to the WTA
            sketch if you want me to run the season clock.
          </MascotExplainer>
        </div>
      </section>
      <RaceChart />
    </div>
  );
}
