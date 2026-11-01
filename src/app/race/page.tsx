import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RaceChart } from "@/components/RaceChart";

export const metadata: Metadata = {
  title: "Race to the Finals",
  description:
    "ATP Live Race to Turin standings as of November 1, 2026, plus an illustrative WTA season sketch on the way to Indian Wells.",
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
              ATP bars are the live Race to Turin as of November 1, 2026.
              The WTA view is an illustrative season sketch — press play
              there, or stay on the ATP totals.
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
            The ATP board is a live snapshot, not a replay. Flip to the WTA
            sketch if you want me to run the season clock.
          </MascotExplainer>
        </div>
      </section>
      <RaceChart />
    </div>
  );
}
