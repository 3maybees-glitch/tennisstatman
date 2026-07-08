import type { Metadata } from "next";
import { BarChart3, Sparkles } from "lucide-react";
import { CourtsideGate } from "@/components/CourtsideGate";
import { SkillLeaderboards } from "@/components/SkillLeaderboards";
import { StatManMascot } from "@/components/StatManMascot";
import { SKILL_ORDER, type SkillKey } from "@/lib/data/grades";
import { getFullRoster } from "@/lib/data/roster";
import { topBySkill } from "@/lib/data/skill-leaderboards";

function buildLeaderboardData(roster: Awaited<ReturnType<typeof getFullRoster>>) {
  const buildTour = (tour: "ATP" | "WTA") =>
    Object.fromEntries(
      SKILL_ORDER.map((skill) => [skill, topBySkill(roster, tour, skill)]),
    ) as Record<SkillKey, ReturnType<typeof topBySkill>>;

  return { ATP: buildTour("ATP"), WTA: buildTour("WTA") };
}

export const metadata: Metadata = {
  title: "Skill Leaderboards — Serve, Forehand, Backhand & More",
  description:
    "Top 10 ATP and WTA players in every skill category — serve, forehand, backhand, net play, and movement. A Courtside exclusive.",
};

export default async function SkillLeaderboardsPage() {
  const roster = await getFullRoster();
  const data = buildLeaderboardData(roster);

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-wrap items-center gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3">
                <BarChart3 className="text-gold" size={30} />
                <h1 className="text-4xl font-bold">Skill Leaderboards</h1>
                <span className="flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold">
                  <Sparkles size={12} /> Courtside
                </span>
              </div>
              <p className="mt-4 text-lg text-muted">
                Who has the best serve on tour? The deadliest forehand? The
                quickest feet? Bar charts and tables for the top 10 in every
                skill category — ATP and WTA, updated with the live roster.
              </p>
              <p className="mt-3 text-sm text-muted">
                Grades are Stat Man&apos;s scouting scores (0–100), blending
                shot data, match tape, and era-adjusted benchmarks. Not just
                who&apos;s ranked #1 — who&apos;s actually elite at each stroke.
              </p>
            </div>
            <StatManMascot size={130} className="ml-auto hidden lg:block" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <CourtsideGate
          title="Skill category leaderboards"
          description="Courtside members get top-10 bar charts and tables for serve, forehand, backhand, net play, and movement — for both ATP and WTA. See who truly owns each weapon on tour."
        >
          <SkillLeaderboards data={data} />
        </CourtsideGate>
      </section>
    </div>
  );
}
