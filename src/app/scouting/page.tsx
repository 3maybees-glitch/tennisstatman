import type { Metadata } from "next";
import { MemberGate } from "@/components/MemberGate";
import { ScoutingBoard } from "@/components/ScoutingBoard";
import { StatManMascot } from "@/components/StatManMascot";
import { UpgradeCTA } from "@/components/UpgradeCTA";
import { Radar } from "lucide-react";

export const metadata: Metadata = {
  title: "Scouting Reports — Challenger & ITF",
  description:
    "Courtside AI scouting reports and PULSE tracking for Challenger and ITF-level prospects — the players about to break into the top 100.",
};

export default function ScoutingPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <StatManMascot size={110} className="hidden shrink-0 md:block" />
          <div>
            <div className="flex items-center gap-3">
              <Radar className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Deep Scouting</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              PULSE tracking and AI scouting reports down to the ITF level — the
              prospects the top-100 pages don&apos;t cover yet. This is where you
              find them first.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <MemberGate
          fallback={
            <UpgradeCTA
              title="Scouting is a Courtside feature"
              description="Members get AI scouting reports and PULSE tracking for every Challenger and ITF prospect — down to the players still grinding Futures events."
            />
          }
        >
          <ScoutingBoard />
        </MemberGate>
      </section>
    </div>
  );
}
