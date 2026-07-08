export type SkillKey =
  | "serve"
  | "forehand"
  | "backhand"
  | "netPlay"
  | "movement";

export type SkillGrades = Record<SkillKey, number>;

export const SKILL_LABELS: Record<SkillKey, string> = {
  serve: "Serve",
  forehand: "Forehand",
  backhand: "Backhand",
  netPlay: "Net Play",
  movement: "Movement",
};

export const SKILL_ORDER: SkillKey[] = [
  "serve",
  "forehand",
  "backhand",
  "netPlay",
  "movement",
];

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

export function overallScore(skills: SkillGrades): number {
  const values = SKILL_ORDER.map((key) => skills[key]);
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
  return "#8b9cb8"; // muted
}
