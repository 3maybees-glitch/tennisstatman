"use client";

import { Microscope } from "lucide-react";
import { GradeChip } from "./GradeChip";
import { SkillRadar } from "./SkillRadar";
import {
  EXTENDED_SKILL_ORDER,
  SKILL_LABELS,
  extendedOverallScore,
  pickExtendedSkills,
} from "@/lib/data/grades";
import type { Player } from "@/lib/data/players";

export function ExtendedSkillsPanel({
  player,
  tourColor,
}: {
  player: Player;
  tourColor: string;
}) {
  const extended = pickExtendedSkills(player.skills);
  const deepOverall = extendedOverallScore(player.skills);

  return (
    <div className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
      <h3 className="flex items-center gap-2 font-semibold text-gold-light">
        <Microscope size={16} /> Courtside deep dive
      </h3>
      <p className="mt-1 text-xs text-muted">
        Five extended grades beyond the public card — Return, Clutch,
        Consistency, Defense, and Power. Deep overall:{" "}
        <span className="font-mono font-semibold text-gold-light">
          {deepOverall}
        </span>
      </p>
      <div className="mt-4">
        <SkillRadar
          series={[
            {
              name: player.name,
              skills: player.skills,
              color: tourColor,
            },
          ]}
          skillKeys={EXTENDED_SKILL_ORDER}
          height={220}
        />
      </div>
      <div className="mt-3 grid gap-2">
        {EXTENDED_SKILL_ORDER.map((key) => (
          <GradeChip
            key={key}
            label={SKILL_LABELS[key]}
            score={extended[key]}
          />
        ))}
      </div>
    </div>
  );
}
