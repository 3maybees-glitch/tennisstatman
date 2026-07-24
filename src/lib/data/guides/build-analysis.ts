import {
  CORE_SKILL_ORDER,
  SKILL_LABELS,
  type CoreSkillGrades,
  type CoreSkillKey,
} from "@/lib/data/grades";

const WEAPON_LINES: Record<CoreSkillKey, string[]> = {
  serve: [
    "the first serve buys free points and shortens every service game",
    "the delivery still sets the table before the rally even starts",
    "cheap points off the serve keep pressure on the returner all match",
  ],
  forehand: [
    "the forehand is the finishing hammer once the court opens up",
    "inside-out and inside-in forehands decide most neutral exchanges",
    "pace and shape off the forehand wing force opponents into guesswork",
  ],
  backhand: [
    "the backhand redirects pace cleanly and refuses to give free looks",
    "down-the-line backhand changes keep baseliners honest",
    "two-wing stability starts with a backhand that holds under heat",
  ],
  netPlay: [
    "soft hands and good timing at net turn half-chances into winners",
    "forward court instincts finish points before rallies get messy",
    "volleys and overheads close the deal when the approach is on time",
  ],
  movement: [
    "elite recovery steps turn defense into the next offensive ball",
    "court coverage stretches opponents into low-percentage targets",
    "footwork keeps every ball playable longer than rivals expect",
  ],
};

const WEAKNESS_LINES: Record<CoreSkillKey, string[]> = {
  serve: [
    "second-serve looks can sit up and invite first-strike returns",
    "when the first-serve percentage dips, holds become grinders",
    "returners get comfortable when free points dry up",
  ],
  forehand: [
    "the forehand leaks errors when rushed off the back foot",
    "long exchanges expose timing cracks on the stronger wing",
    "pressure points still find the forehand misfire window",
  ],
  backhand: [
    "rivals camp on the backhand corner and wait for a short ball",
    "passivity off the backhand wing gifts transition chances",
    "big servers still look to open that side early in returns",
  ],
  netPlay: [
    "the net game is still more obligation than weapon",
    "hesitant approaches leave easy passing lanes on the table",
    "points that should be finished at net get replayed from the baseline",
  ],
  movement: [
    "stretchers and wide serves expose recovery gaps",
    "heavy hitters win the geography battle when legs get heavy",
    "extended defensive patterns can turn into scoreboard leaks",
  ],
};

function hashSeed(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(list: T[], seed: number, salt: number): T {
  return list[(seed + salt) % list.length];
}

export function rankSkills(skills: CoreSkillGrades): {
  best: CoreSkillKey[];
  worst: CoreSkillKey[];
} {
  const ranked = [...CORE_SKILL_ORDER].sort(
    (a, b) => skills[b] - skills[a] || a.localeCompare(b),
  );
  return {
    best: ranked.slice(0, 2),
    worst: ranked.slice(-2).reverse(),
  };
}

export function buildStrengthsAnalysis(input: {
  id: string;
  firstName: string;
  playstyle: string;
  skills: CoreSkillGrades;
  custom?: string;
}): string {
  if (input.custom) return input.custom;

  const seed = hashSeed(input.id);
  const { best } = rankSkills(input.skills);
  const [primary, secondary] = best;
  const primaryLine = pick(WEAPON_LINES[primary], seed, 1);
  const secondaryLine = pick(WEAPON_LINES[secondary], seed, 3);

  return (
    `Stat Man's read: ${input.firstName}'s ${input.playstyle.toLowerCase()} game peaks with ${SKILL_LABELS[primary].toLowerCase()} (${input.skills[primary]}) — ${primaryLine}. ` +
    `Secondary edge is ${SKILL_LABELS[secondary].toLowerCase()} (${input.skills[secondary]}): ${secondaryLine}. ` +
    `When those two axes light up together, the match tilts fast.`
  );
}

export function buildWeaknessesAnalysis(input: {
  id: string;
  firstName: string;
  skills: CoreSkillGrades;
  custom?: string;
}): string {
  if (input.custom) return input.custom;

  const seed = hashSeed(`${input.id}:weak`);
  const { worst } = rankSkills(input.skills);
  const [primary, secondary] = worst;
  const primaryLine = pick(WEAKNESS_LINES[primary], seed, 2);
  const secondaryLine = pick(WEAKNESS_LINES[secondary], seed, 4);

  return (
    `The soft spots: ${SKILL_LABELS[primary].toLowerCase()} (${input.skills[primary]}) is the first door opponents knock on — ${primaryLine}. ` +
    `${SKILL_LABELS[secondary].toLowerCase()} (${input.skills[secondary]}) is the backup plan if that fails: ${secondaryLine}. ` +
    `Fix either one and ${input.firstName}'s ceiling jumps a tier.`
  );
}
