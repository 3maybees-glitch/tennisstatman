import type { Metadata } from "next";
import { MemberGate } from "@/components/MemberGate";
import { StatLab } from "@/components/StatLab";
import { StatManMascot } from "@/components/StatManMascot";
import { UpgradeCTA } from "@/components/UpgradeCTA";
import { SlidersHorizontal } from "lucide-react";

export const metadata: Metadata = {
  title: "Stat Lab — Custom Ratings",
  description:
    "Build your own player rating. Weight serve, forehand, backhand, net play, movement, and PULSE, re-rank every player, and download the data.",
};

export default function StatLabPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <StatManMascot size={110} className="hidden shrink-0 md:block" />
          <div>
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Stat Lab</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Tennis is an argument. Settle it. Weight every part of the game the
              way you see it, re-rank the tour in real time, and take the data
              with you.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <MemberGate
          fallback={
            <UpgradeCTA
              title="Stat Lab is a Courtside feature"
              description="Members get custom stat sliders to build their own rating formula, a live re-ranked leaderboard, and downloadable CSV/JSON data."
            />
          }
        >
          <StatLab />
        </MemberGate>
      </section>
    </div>
  );
}
