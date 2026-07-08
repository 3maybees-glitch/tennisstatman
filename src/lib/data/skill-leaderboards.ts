import type { Player } from "./players";
import { letterGrade, type SkillKey } from "./grades";

export type SkillLeaderboardEntry = {
  id: string;
  name: string;
  rank: number;
  score: number;
  grade: string;
};

export function topBySkill(
  players: Player[],
  tour: "ATP" | "WTA",
  skill: SkillKey,
  limit = 10,
): SkillLeaderboardEntry[] {
  return players
    .filter((p) => p.tour === tour)
    .sort((a, b) => b.skills[skill] - a.skills[skill])
    .slice(0, limit)
    .map((p) => ({
      id: p.id,
      name: p.name,
      rank: p.rank,
      score: p.skills[skill],
      grade: letterGrade(p.skills[skill]),
    }));
}
