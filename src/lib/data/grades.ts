export type CoreSkillKey =
  | "serve"
  | "forehand"
  | "backhand"
  | "netPlay"
  | "movement";

export type ExtendedSkillKey =
  | "return"
  | "clutch"
  | "consistency"
  | "defense"
  | "power";

export type SkillKey = CoreSkillKey | ExtendedSkillKey;

export type SkillGrades = Record<SkillKey, number>;

export type CoreSkillGrades = Pick<SkillGrades, CoreSkillKey>;

export const SKILL_LABELS: Record<SkillKey, string> = {
  serve: "Serve",
  forehand: "Forehand",
  backhand: "Backhand",
  netPlay: "Net Play",
  movement: "Movement",
  return: "Return",
  clutch: "Clutch",
  consistency: "Consistency",
  defense: "Defense",
  power: "Power",
};

export const CORE_SKILL_ORDER: CoreSkillKey[] = [
  "serve",
  "forehand",
  "backhand",
  "netPlay",
  "movement",
];

export const EXTENDED_SKILL_ORDER: ExtendedSkillKey[] = [
  "return",
  "clutch",
  "consistency",
  "defense",
  "power",
];

export type ExtendedSkillGrades = Pick<SkillGrades, ExtendedSkillKey>;

export const SKILL_ORDER: SkillKey[] = [...CORE_SKILL_ORDER];

export const ALL_SKILL_ORDER: SkillKey[] = [
  ...CORE_SKILL_ORDER,
  ...EXTENDED_SKILL_ORDER,
];

function clampSkill(n: number): number {
  return Math.round(Math.min(97, Math.max(48, n)));
}

/**
 * Derive the five extended grades from the core scouting profile.
 * Used for curated cards that only specify the original five skills.
 */
export function completeSkillGrades(
  core: CoreSkillGrades,
  seed = 0,
): SkillGrades {
  const tilt = ((seed % 11) - 5) * 0.6;

  return {
    ...core,
    return: clampSkill(
      core.backhand * 0.4 +
        core.forehand * 0.3 +
        core.movement * 0.2 +
        core.serve * 0.1 +
        tilt,
    ),
    clutch: clampSkill(
      (core.serve + core.forehand + core.backhand) / 3 +
        core.netPlay * 0.08 -
        tilt * 0.4,
    ),
    consistency: clampSkill(
      core.backhand * 0.3 +
        core.movement * 0.3 +
        core.forehand * 0.25 +
        core.netPlay * 0.15,
    ),
    defense: clampSkill(
      core.movement * 0.45 +
        core.backhand * 0.35 +
        core.netPlay * 0.2,
    ),
    power: clampSkill(
      core.serve * 0.35 +
        core.forehand * 0.45 +
        core.backhand * 0.2 +
        tilt * 0.3,
    ),
  };
}

export function hasFullSkills(
  skills: Partial<SkillGrades>,
): skills is SkillGrades {
  return ALL_SKILL_ORDER.every((key) => typeof skills[key] === "number");
}

export function pickExtendedSkills(skills: SkillGrades): ExtendedSkillGrades {
  return {
    return: skills.return,
    clutch: skills.clutch,
    consistency: skills.consistency,
    defense: skills.defense,
    power: skills.power,
  };
}

/** Ensure a player/legend has all ten skill grades (core + Courtside extended). */
export function ensureSkillGrades(
  skills: Partial<SkillGrades>,
  seed = 0,
): SkillGrades {
  if (hasFullSkills(skills)) return skills;

  const core: CoreSkillGrades = {
    serve: skills.serve ?? 70,
    forehand: skills.forehand ?? 70,
    backhand: skills.backhand ?? 70,
    netPlay: skills.netPlay ?? 70,
    movement: skills.movement ?? 70,
  };

  return completeSkillGrades(core, seed);
}

/** Convert a 0-100 skill score into a report-card letter grade. */
export function letterGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 90) return "A";
  if (score >= 85) return "A-";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "B-";
  if (score >= 65) return "C+";
  if (score >= 58) return "C";
  return "D";
}

/** Public overall — core five skills only. */
export function overallScore(skills: CoreSkillGrades | SkillGrades): number {
  const values = CORE_SKILL_ORDER.map((key) => skills[key]);
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/** Courtside extended overall — the deep-dive five. */
export function extendedOverallScore(skills: SkillGrades): number {
  const values = EXTENDED_SKILL_ORDER.map((key) => skills[key]);
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

/** Star rating out of 5 (half-star precision) derived from overall score. */
export function starRating(skills: SkillGrades): number {
  const overall = overallScore(skills);
  // Map 50-100 onto 2.5-5 stars
  const stars = 2.5 + ((overall - 50) / 50) * 2.5;
  return Math.round(Math.min(5, Math.max(0, stars)) * 2) / 2;
}

export function gradeColor(score: number): string {
  if (score >= 90) return "#f0c75e"; // gold-light
  if (score >= 80) return "#40916c"; // court-light
  if (score >= 70) return "#3b82f6"; // accent blue
  return "#ffffff"; // white
}
