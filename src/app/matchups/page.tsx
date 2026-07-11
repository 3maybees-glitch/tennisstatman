import type { Metadata } from "next";
import { MatchupProjector } from "@/components/MatchupProjector";
import { MemberGate } from "@/components/MemberGate";
import { StatManMascot } from "@/components/StatManMascot";
import { UpgradeCTA } from "@/components/UpgradeCTA";
import { Swords } from "lucide-react";

export const metadata: Metadata = {
  title: "Matchup Projections",
  description:
    "Project any player vs any player. Courtside's model blends skill grades and current PULSE into a win probability, skill overlay, and edge breakdown.",
};

export default function MatchupsPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <StatManMascot size={110} className="hidden shrink-0 md:block" />
          <div>
            <div className="flex items-center gap-3">
              <Swords className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Matchup Projections</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Any player, any opponent. The model weighs skill grades against
              current PULSE form to project a winner, the biggest edges, and how
              close it really is.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <MemberGate
          fallback={
            <UpgradeCTA
              title="Matchup projections are a Courtside feature"
              description="Members can simulate any player against any other player — win probability, skill overlay, and a full edge breakdown for every hypothetical."
            />
          }
        >
          <MatchupProjector />
        </MemberGate>
      </section>
    </div>
  );
}
