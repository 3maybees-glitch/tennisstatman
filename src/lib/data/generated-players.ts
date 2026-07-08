import type { RankingEntry, Tour } from "@/lib/rankings/types";
import { SKILL_ORDER, type SkillGrades, type SkillKey } from "./grades";
import { legends } from "./legends";
import type { Player } from "./players";

/**
 * Deterministic card generation for players outside the curated set.
 * Everything is seeded from the player's name, so a player's grades,
 * PULSE history, and verdict are stable across builds and reloads.
 */

export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

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

const COUNTRY_NAMES: Record<string, string> = {
  ARG: "Argentina", AUS: "Australia", AUT: "Austria", BEL: "Belgium",
  BIH: "Bosnia & Herzegovina", BLR: "Belarus", BRA: "Brazil", BUL: "Bulgaria",
  CAN: "Canada", CHI: "Chile", CHN: "China", COL: "Colombia", CRO: "Croatia",
  CZE: "Czechia", DEN: "Denmark", ECU: "Ecuador", EGY: "Egypt", ESP: "Spain",
  EST: "Estonia", FIN: "Finland", FRA: "France", GBR: "Great Britain",
  GEO: "Georgia", GER: "Germany", GRE: "Greece", HUN: "Hungary",
  IND: "India", IRL: "Ireland", ISR: "Israel", ITA: "Italy", JPN: "Japan",
  KAZ: "Kazakhstan", KOR: "South Korea", LAT: "Latvia", LTU: "Lithuania",
  MEX: "Mexico", MDA: "Moldova", MON: "Monaco", NED: "Netherlands",
  NOR: "Norway", NZL: "New Zealand", PER: "Peru", POL: "Poland",
  POR: "Portugal", ROU: "Romania", RUS: "Russia", SRB: "Serbia",
  SUI: "Switzerland", SVK: "Slovakia", SLO: "Slovenia", SWE: "Sweden",
  THA: "Thailand", TUN: "Tunisia", TUR: "Turkey", UKR: "Ukraine",
  USA: "United States", UZB: "Uzbekistan",
};

const PLAYSTYLES = [
  "First-strike aggressor",
  "Counterpunching grinder",
  "Topspin heavyweight",
  "Flat-ball sniper",
  "All-court improviser",
  "Defensive wall",
  "Big-point hunter",
  "Rhythm baseliner",
  "Touch-and-angles stylist",
  "Serve-first freight train",
  "Return-game specialist",
  "Momentum surfer",
];

const SKILL_PHRASES: Record<SkillKey, { weapon: string; weakness: string }> = {
  serve: {
    weapon: "a serve that buys cheap points by the dozen",
    weakness: "a serve opponents treat as a rally-starter",
  },
  forehand: {
    weapon: "a forehand that ends conversations",
    weakness: "a forehand that leaks errors under pressure",
  },
  backhand: {
    weapon: "a backhand that repaints the lines",
    weakness: "a backhand wing rivals target on big points",
  },
  netPlay: {
    weapon: "soft hands that finish points at the net",
    weakness: "a net game still stuck in the garage",
  },
  movement: {
    weapon: "footwork that turns defense into offense",
    weakness: "court coverage that big hitters expose",
  },
};

function verdictTemplate(
  rng: () => number,
  firstName: string,
  rank: number,
  playstyle: string,
  weapon: SkillKey,
  weakness: SkillKey,
  rising: boolean,
): string {
  const w = SKILL_PHRASES[weapon].weapon;
  const wk = SKILL_PHRASES[weakness].weakness;
  const trend = rising
    ? "the PULSE line is pointing the right way"
    : "the PULSE line says there's work to do";
  const templates = [
    `Stat Man's auto-scout: ${firstName} runs a ${playstyle.toLowerCase()} game built on ${w}. The book on the other side: ${wk}. At No. ${rank}, ${trend}.`,
    `Stat Man's auto-scout: classic ${playstyle.toLowerCase()} profile — ${w}, and enough belief to back it. Rivals still aim for ${wk}, but ${trend}.`,
    `Stat Man's auto-scout: the scouting file leads with ${w}. What keeps coaches up at night is ${wk}. Ranked No. ${rank}, and ${trend}.`,
    `Stat Man's auto-scout: ${firstName} brings ${w} to every match, wrapped in a ${playstyle.toLowerCase()} package. The soft spot remains ${wk} — still, ${trend}.`,
  ];
  return templates[Math.floor(rng() * templates.length)];
}

function funStatTemplate(rng: () => number, weapon: SkillKey): string {
  const n = (lo: number, hi: number) => Math.round(lo + rng() * (hi - lo));
  const options: Record<SkillKey, string[]> = {
    serve: [
      `Lands ${n(58, 68)}% of first serves and wins ${n(74, 82)}% of the points behind them.`,
      `Averages ${n(6, 12)} aces per match this season.`,
    ],
    forehand: [
      `${n(55, 70)}% of winners this season came off the forehand side.`,
      `Averages ${n(9, 15)} forehand winners per match.`,
    ],
    backhand: [
      `Wins ${n(52, 60)}% of backhand-to-backhand exchanges longer than five shots.`,
      `Hit ${n(80, 220)} backhand winners down the line this season.`,
    ],
    netPlay: [
      `Converts ${n(62, 74)}% of net approaches — well above tour average.`,
      `Has won ${n(12, 28)} points per event with drop-volley finishes.`,
    ],
    movement: [
      `Wins ${n(38, 48)}% of points after being pulled off the court — elite scrambling numbers.`,
      `Covers an estimated ${n(3, 5)} km per best-of-three match.`,
    ],
  };
  const list = options[weapon];
  return list[Math.floor(rng() * list.length)];
}

function similarity(a: SkillGrades, b: SkillGrades): number {
  const diffs = SKILL_ORDER.map((k) => Math.abs(a[k] - b[k]));
  const avg = diffs.reduce((s, d) => s + d, 0) / diffs.length;
  return Math.max(0, Math.round(100 - avg * 1.8));
}

export function buildPlayerFromRanking(entry: RankingEntry, tour: Tour): Player {
  const slug = slugify(entry.name);
  const rng = mulberry32(hashString(`${tour}:${slug}`));

  // Overall anchored to ranking: No. 1 ≈ 90, No. 100 ≈ 74
  const base = 93 - 9 * Math.log10(entry.rank + 1) + (rng() * 4 - 2);

  const keys = [...SKILL_ORDER];
  const weapon = keys[Math.floor(rng() * keys.length)];
  let weakness = keys[Math.floor(rng() * keys.length)];
  if (weakness === weapon) {
    weakness = keys[(keys.indexOf(weapon) + 2) % keys.length];
  }

  const skills = {} as SkillGrades;
  for (const key of SKILL_ORDER) {
    let value = base + (rng() * 10 - 5);
    if (key === weapon) value += 6;
    if (key === weakness) value -= 6;
    skills[key] = Math.round(Math.min(97, Math.max(55, value)));
  }

  // PULSE: random walk, drift tied to ranking movement
  const drift = entry.change > 0 ? 0.9 : entry.change < 0 ? -0.9 : 0;
  let pulse = base - 4 + (rng() * 8 - 4);
  const pulseHistory: number[] = [];
  for (let i = 0; i < 12; i++) {
    pulse += drift + (rng() * 8 - 4);
    pulse = Math.min(97, Math.max(45, pulse));
    pulseHistory.push(Math.round(pulse));
  }

  const tourLegends = legends.filter((l) => l.tour === tour);
  let bestLegend = tourLegends[0];
  let bestSim = -1;
  for (const legend of tourLegends) {
    const sim = similarity(skills, legend.skills);
    if (sim > bestSim) {
      bestSim = sim;
      bestLegend = legend;
    }
  }

  const playstyle = PLAYSTYLES[Math.floor(rng() * PLAYSTYLES.length)];
  const countryName = COUNTRY_NAMES[entry.country] ?? entry.country;
  const firstName = entry.name.split(" ")[0];
  const rising =
    pulseHistory[pulseHistory.length - 1] >=
    pulseHistory[Math.max(0, pulseHistory.length - 5)];

  return {
    id: slug,
    name: entry.name,
    tour,
    country: entry.country,
    countryName,
    origin: { city: countryName, lat: 0, lon: 0 },
    age: entry.age ?? Math.round(20 + rng() * 14),
    hand: rng() < 0.12 ? "L" : "R",
    rank: entry.rank,
    points: entry.points,
    playstyle,
    skills,
    pulseHistory,
    legendMatch: {
      legendId: bestLegend.id,
      similarity: Math.min(92, Math.max(40, bestSim)),
    },
    verdict: verdictTemplate(
      rng,
      firstName,
      entry.rank,
      playstyle,
      weapon,
      weakness,
      rising,
    ),
    funStat: funStatTemplate(rng, weapon),
    generated: true,
  };
}
