import {
  SKILL_LABELS,
  CORE_SKILL_ORDER,
  overallScore,
  type SkillKey,
} from "./data/grades";
import { currentPulse, type Player } from "./data/players";

/**
 * Matchup projection engine. Blends a player's skill profile (form-agnostic
 * quality) with current PULSE (recent form) into a single power rating, then
 * converts the gap into a win probability with a logistic curve.
 */

export type SkillEdge = {
  skill: SkillKey;
  label: string;
  diff: number;
  favors: "A" | "B";
};

export type MatchupResult = {
  winProbA: number;
  winProbB: number;
  ratingA: number;
  ratingB: number;
  edges: SkillEdge[];
  summary: string;
};

function powerRating(player: Player): number {
  return overallScore(player.skills) * 0.6 + currentPulse(player) * 0.4;
}

export function projectMatchup(a: Player, b: Player): MatchupResult {
  const ratingA = powerRating(a);
  const ratingB = powerRating(b);

  // Logistic: a ~6-point rating gap is roughly a 65/35 split.
  const winProbA = 1 / (1 + Math.pow(10, -(ratingA - ratingB) / 6));
  const winProbB = 1 - winProbA;

  const edges: SkillEdge[] = CORE_SKILL_ORDER.map((skill): SkillEdge => {
    const diff = a.skills[skill] - b.skills[skill];
    return {
      skill,
      label: SKILL_LABELS[skill],
      diff: Math.abs(diff),
      favors: diff >= 0 ? "A" : "B",
    };
  }).sort((x, y) => y.diff - x.diff);

  const top = edges[0];
  const favored = winProbA >= winProbB ? a : b;
  const underdog = favored === a ? b : a;
  const margin = Math.round(Math.abs(winProbA - winProbB) * 100);
  const edgeHolder = top.favors === "A" ? a : b;

  let summary: string;
  if (margin <= 8) {
    summary = `A coin flip. ${a.name} and ${b.name} rate within a whisker of each other — ${edgeHolder.name}'s ${top.label.toLowerCase()} is the tiebreaker to watch.`;
  } else if (margin <= 22) {
    summary = `${favored.name} is the lean over ${underdog.name}, largely on ${edgeHolder.name}'s ${top.label.toLowerCase()} edge. Live underdog if the form swings.`;
  } else {
    summary = `${favored.name} is a clear favorite. The ${top.label.toLowerCase()} gap is doing the heavy lifting, and current PULSE backs it up.`;
  }

  return {
    winProbA: Math.round(winProbA * 100),
    winProbB: Math.round(winProbB * 100),
    ratingA: Math.round(ratingA * 10) / 10,
    ratingB: Math.round(ratingB * 10) / 10,
    edges,
    summary,
  };
}
