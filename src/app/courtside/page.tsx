import type { Metadata } from "next";
import { Suspense } from "react";
import { CourtsideHub } from "@/components/CourtsideHub";
import { StatManMascot } from "@/components/StatManMascot";
import { getFullRoster } from "@/lib/data/roster";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Your Courtside",
  description:
    "Your Courtside home — skill leaderboards, extended deep dives, matchup projections, the Stat Lab, deep scouting, PULSE alerts, and the graded picks room.",
};

export const revalidate = 3600;

export default async function CourtsidePage() {
  const roster = await getFullRoster();

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <StatManMascot size={110} className="hidden shrink-0 md:block" />
          <div>
            <div className="flex items-center gap-3">
              <Sparkles className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Your Courtside</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Top-10 skill leaderboards for both tours, extended player deep
              dives, and everything else the obsessed fan gets — all in one
              place.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-navy-light p-10 text-center text-muted">
              Loading Courtside…
            </div>
          }
        >
          <CourtsideHub roster={roster} />
        </Suspense>
      </section>
    </div>
  );
}
