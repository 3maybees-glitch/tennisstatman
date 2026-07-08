import type { Metadata } from "next";
import { RaceChart } from "@/components/RaceChart";
import { Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Race to the Finals",
  description:
    "Watch the season unfold — an animated race of ATP and WTA points from January to the Finals in Turin and Riyadh.",
};

export default function RacePage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <Trophy className="text-gold" size={28} />
            <h1 className="text-4xl font-bold">Race to the Finals</h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            The season as it was meant to be seen — a race. Press play and
            watch the points pile up from Melbourne to the Finals, or scrub the
            timeline to any checkpoint.
          </p>
        </div>
      </section>
      <RaceChart />
    </div>
  );
}
