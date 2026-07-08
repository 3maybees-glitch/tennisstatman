"use client";

import { useState } from "react";
import { SkillCategoryLeaderboard } from "./SkillCategoryLeaderboard";
import { SKILL_LABELS, SKILL_ORDER, type SkillKey } from "@/lib/data/grades";
import type { SkillLeaderboardEntry } from "@/lib/data/skill-leaderboards";

type LeaderboardData = Record<
  "ATP" | "WTA",
  Record<SkillKey, SkillLeaderboardEntry[]>
>;

export function SkillLeaderboards({ data }: { data: LeaderboardData }) {
  const [tour, setTour] = useState<"ATP" | "WTA">("ATP");

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {(["ATP", "WTA"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTour(t)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                tour === t
                  ? t === "ATP"
                    ? "bg-court text-white"
                    : "bg-[#8b5cf6] text-white"
                  : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">
          Top 10 in each skill category — {tour} tour
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {SKILL_ORDER.map((skill) => (
          <SkillCategoryLeaderboard
            key={skill}
            label={SKILL_LABELS[skill]}
            entries={data[tour][skill]}
            tour={tour}
          />
        ))}
      </div>
    </div>
  );
}
