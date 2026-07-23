import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { MascotExplainer } from "@/components/MascotExplainer";
import { RaceChart } from "@/components/RaceChart";

export const metadata: Metadata = {
  title: "Race to the Finals",
  description:
    "Watch the season unfold — an animated race of ATP and WTA points from January to the Finals in Turin and Riyadh.",
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
              The season as it was meant to be seen — a race. Press play and
              watch the points pile up from Melbourne to the Finals, or scrub
              the timeline to any checkpoint.
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
            On your marks... I time the whole season with this thing. Hit play
            and watch eleven months of ranking points fly by in seconds.
          </MascotExplainer>
        </div>
      </section>
      <RaceChart />
    </div>
  );
}
