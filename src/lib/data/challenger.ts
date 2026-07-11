import {
  CORE_SKILL_ORDER,
  completeSkillGrades,
  type CoreSkillGrades,
  type SkillGrades,
  type SkillKey,
} from "./grades";

/**
 * Challenger & ITF-tier prospects. These sit below the top-100 rankings the
 * public roster covers, so they're a Courtside-only feature: PULSE tracking and
 * AI scouting reports "down to the ITF level". Everything is generated
 * deterministically from the player id so the data is stable across reloads.
 */

export type ProTier = "Challenger" | "ITF";

export type ProspectPlayer = {
  id: string;
  name: string;
  tour: "ATP" | "WTA";
  tier: ProTier;
  country: string;
  age: number;
  hand: "R" | "L";
  tierRank: number;
  playstyle: string;
  skills: SkillGrades;
  pulseHistory: number[];
  weapon: SkillKey;
  weakness: SkillKey;
  scouting: string;
  watchLine: string;
};

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type Seed = {
  name: string;
  tour: "ATP" | "WTA";
  tier: ProTier;
  country: string;
};

// A hand-written pool of plausible prospect names across both tours and tiers.
const SEEDS: Seed[] = [
  { name: "Matteo Bellandi", tour: "ATP", tier: "Challenger", country: "ITA" },
  { name: "Diego Vargas", tour: "ATP", tier: "Challenger", country: "ARG" },
  { name: "Kasper Lund", tour: "ATP", tier: "Challenger", country: "DEN" },
  { name: "Noah Whitfield", tour: "ATP", tier: "Challenger", country: "GBR" },
  { name: "Tomas Havel", tour: "ATP", tier: "ITF", country: "CZE" },
  { name: "Rui Nakamura", tour: "ATP", tier: "ITF", country: "JPN" },
  { name: "Andres Ferreira", tour: "ATP", tier: "ITF", country: "BRA" },
  { name: "Yusuf Demir", tour: "ATP", tier: "ITF", country: "TUR" },
  { name: "Lena Vasquez", tour: "WTA", tier: "Challenger", country: "ESP" },
  { name: "Ingrid Sorensen", tour: "WTA", tier: "Challenger", country: "NOR" },
  { name: "Priya Nair", tour: "WTA", tier: "Challenger", country: "IND" },
  { name: "Chloe Beaumont", tour: "WTA", tier: "Challenger", country: "FRA" },
  { name: "Marta Kowalczyk", tour: "WTA", tier: "ITF", country: "POL" },
  { name: "Sofia Russo", tour: "WTA", tier: "ITF", country: "ITA" },
  { name: "Hana Petrov", tour: "WTA", tier: "ITF", country: "SRB" },
  { name: "Emily Carter", tour: "WTA", tier: "ITF", country: "USA" },
];

const PLAYSTYLES = [
  "First-strike aggressor",
  "Counterpunching grinder",
  "Topspin heavyweight",
  "Flat-ball sniper",
  "All-court improviser",
  "Serve-and-forehand freight train",
  "Rhythm baseliner",
  "Touch-and-angles stylist",
];

const SKILL_PHRASES: Record<SkillKey, { weapon: string; weakness: string }> = {
  serve: {
    weapon: "a serve that already looks tour-ready",
    weakness: "a second serve that gets punished at the next level",
  },
  forehand: {
    weapon: "a forehand that ends points early",
    weakness: "a forehand that breaks down when rushed",
  },
  backhand: {
    weapon: "a backhand that redirects pace both ways",
    weakness: "a backhand wing rivals will target relentlessly",
  },
  netPlay: {
    weapon: "instinctive hands at the net",
    weakness: "a net game that's still a work in progress",
  },
  movement: {
    weapon: "elite recovery and court coverage",
    weakness: "movement that lags in longer rallies",
  },
  return: {
    weapon: "a return that already looks tour-ready",
    weakness: "second-serve returns that get attacked",
  },
  clutch: {
    weapon: "belief on the biggest points",
    weakness: "deciding-set wobbles under scoreboard pressure",
  },
  consistency: {
    weapon: "clean ball-striking that limits free points",
    weakness: "error counts that spike in tight matches",
  },
  defense: {
    weapon: "scrambling that extends rallies past comfort",
    weakness: "defensive holes when pulled off the court",
  },
  power: {
    weapon: "pace that jumps off the strings",
    weakness: "ball speed that top-100 bodies absorb easily",
  },
};

function scoutingReport(
  rng: () => number,
  firstName: string,
  tier: ProTier,
  playstyle: string,
  weapon: SkillKey,
  weakness: SkillKey,
  rising: boolean,
): string {
  const w = SKILL_PHRASES[weapon].weapon;
  const wk = SKILL_PHRASES[weakness].weakness;
  const ceiling = rising
    ? "the arrow is pointing up, and the PULSE line agrees"
    : "the tools are there, but the results need to catch up";
  const path =
    tier === "Challenger"
      ? "a top-100 breakthrough is a realistic 18-month target"
      : "the immediate job is stringing together ITF titles and earning Challenger main-draw entries";
  const templates = [
    `Stat Man's deep scout: ${firstName} plays a ${playstyle.toLowerCase()} game anchored by ${w}. The gap to the next tier is ${wk}. Projection: ${path} — ${ceiling}.`,
    `Stat Man's deep scout: the file opens with ${w}, wrapped in a ${playstyle.toLowerCase()} identity. What the tape flags is ${wk}. For now ${path}, and ${ceiling}.`,
    `Stat Man's deep scout: at ${tier} level ${firstName} already shows ${w}. The developmental note is ${wk}. Bottom line — ${path}; ${ceiling}.`,
  ];
  return templates[Math.floor(rng() * templates.length)];
}

function watchTemplate(rng: () => number, weapon: SkillKey): string {
  const n = (lo: number, hi: number) => Math.round(lo + rng() * (hi - lo));
  const lines: Record<SkillKey, string[]> = {
    serve: [`Held serve in ${n(84, 94)}% of games across the current swing.`],
    forehand: [`Averaging ${n(8, 16)} forehand winners per match at this level.`],
    backhand: [`Wins ${n(53, 63)}% of extended backhand exchanges.`],
    netPlay: [`Converting ${n(60, 74)}% of net approaches this season.`],
    movement: [`Wins ${n(40, 50)}% of points after being pulled wide.`],
    return: [`Breaks serve in ${n(22, 34)}% of matches at this tier.`],
    clutch: [`Wins ${n(50, 62)}% of deciding sets this season.`],
    consistency: [`Unforced error rate in the top ${n(20, 40)}% at this level.`],
    defense: [`Saves ${n(30, 42)}% of break points with scrambling.`],
    power: [`Averaging ${n(70, 80)} mph on groundstroke winners.`],
  };
  return lines[weapon][0];
}

function buildProspect(seed: Seed, index: number): ProspectPlayer {
  const rng = mulberry32(hashString(`prospect:${seed.name}`));

  // Challengers rate a touch higher than ITF players.
  const base = seed.tier === "Challenger" ? 72 : 66;

  const keys = [...CORE_SKILL_ORDER];
  const weapon = keys[Math.floor(rng() * keys.length)];
  let weakness = keys[Math.floor(rng() * keys.length)];
  if (weakness === weapon) {
    weakness = keys[(keys.indexOf(weapon) + 2) % keys.length];
  }

  const core = {} as CoreSkillGrades;
  for (const key of CORE_SKILL_ORDER) {
    let value = base + (rng() * 12 - 6);
    if (key === weapon) value += 7;
    if (key === weakness) value -= 7;
    core[key] = Math.round(Math.min(90, Math.max(48, value)));
  }

  const skills = completeSkillGrades(core, hashString(`prospect:${seed.name}`));

  const rising = rng() > 0.4;
  const drift = rising ? 0.8 : -0.6;
  let pulse = base - 6 + (rng() * 8 - 4);
  const pulseHistory: number[] = [];
  for (let i = 0; i < 12; i++) {
    pulse += drift + (rng() * 7 - 3.5);
    pulse = Math.min(92, Math.max(40, pulse));
    pulseHistory.push(Math.round(pulse));
  }

  const playstyle = PLAYSTYLES[Math.floor(rng() * PLAYSTYLES.length)];
  const firstName = seed.name.split(" ")[0];

  return {
    id: slugify(seed.name),
    name: seed.name,
    tour: seed.tour,
    tier: seed.tier,
    country: seed.country,
    age: Math.round(17 + rng() * 6),
    hand: rng() < 0.15 ? "L" : "R",
    tierRank: 100 + index * 17 + Math.floor(rng() * 40),
    playstyle,
    skills,
    pulseHistory,
    weapon,
    weakness,
    scouting: scoutingReport(
      rng,
      firstName,
      seed.tier,
      playstyle,
      weapon,
      weakness,
      rising,
    ),
    watchLine: watchTemplate(rng, weapon),
  };
}

export const prospects: ProspectPlayer[] = SEEDS.map(buildProspect);

export function getProspect(id: string): ProspectPlayer | undefined {
  return prospects.find((p) => p.id === id);
}
