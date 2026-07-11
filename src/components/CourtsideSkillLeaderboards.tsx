"use client";

import { useState } from "react";
import Link from "next/link";
import { Crown } from "lucide-react";
import { GradeChip } from "./GradeChip";
import {
  CORE_SKILL_ORDER,
  SKILL_LABELS,
  letterGrade,
  type CoreSkillKey,
} from "@/lib/data/grades";
import type { Player } from "@/lib/data/players";

type CourtsideEntry = {
  rank: number;
  player: Player;
  score: number;
};

function topTenBySkill(
  roster: Player[],
  skill: CoreSkillKey,
  tour: "ATP" | "WTA",
): CourtsideEntry[] {
  return roster
    .filter((p) => p.tour === tour)
    .sort((a, b) => b.skills[skill] - a.skills[skill])
    .slice(0, 10)
    .map((player, i) => ({
      rank: i + 1,
      player,
      score: player.skills[skill],
    }));
}

const CORE_SKILL_OPTIONS = CORE_SKILL_ORDER.map((key) => ({
  key,
  label: SKILL_LABELS[key],
}));

export function CourtsideSkillLeaderboards({ roster }: { roster: Player[] }) {
  const [skill, setSkill] = useState<CoreSkillKey>("serve");

  const atp = topTenBySkill(roster, skill, "ATP");
  const wta = topTenBySkill(roster, skill, "WTA");
  const label = CORE_SKILL_OPTIONS.find((o) => o.key === skill)?.label ?? skill;

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Crown size={18} className="text-gold" />
          <h2 className="text-lg font-semibold text-gold-light">
            Skill leaderboards
          </h2>
        </div>
        <div className="ml-auto flex flex-wrap gap-1 rounded-lg border border-white/10 bg-navy-light p-1">
          {CORE_SKILL_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => setSkill(opt.key)}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                skill === opt.key
                  ? "bg-gold font-semibold text-navy"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-muted">
        Top 10 on each tour for{" "}
        <span className="text-gold-light">{label}</span> — ranked from our
        scouting grades across the full roster.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <LeaderboardTable tour="ATP" entries={atp} tourColor="#40916c" />
        <LeaderboardTable tour="WTA" entries={wta} tourColor="#8b5cf6" />
      </div>
    </div>
  );
}

function LeaderboardTable({
  tour,
  entries,
  tourColor,
}: {
  tour: "ATP" | "WTA";
  entries: CourtsideEntry[];
  tourColor: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
      <div
        className="border-b border-white/5 px-5 py-3"
        style={{
          background: `linear-gradient(90deg, ${tourColor}22, transparent)`,
        }}
      >
        <h3 className="font-semibold" style={{ color: tourColor }}>
          {tour} · Top 10
        </h3>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted">
            <th className="px-5 py-2.5 font-medium">#</th>
            <th className="px-5 py-2.5 font-medium">Player</th>
            <th className="px-5 py-2.5 font-medium">Grade</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(({ rank, player, score }) => (
            <tr
              key={player.id}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
              <td className="px-5 py-3 font-mono text-gold">{rank}</td>
              <td className="px-5 py-3">
                <Link
                  href={`/players/${player.id}`}
                  className="font-medium hover:text-gold-light"
                >
                  {player.name}
                </Link>
                <span className="ml-2 text-xs text-muted">#{player.rank}</span>
              </td>
              <td className="px-5 py-3">
                <span className="font-mono font-semibold text-gold-light">
                  {score}
                </span>
                <span className="ml-1.5 text-xs text-muted">
                  ({letterGrade(score)})
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
