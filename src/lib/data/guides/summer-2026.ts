import { players as curatedPlayers } from "@/lib/data/players";
import {
  completeSkillGrades,
  type CoreSkillGrades,
} from "@/lib/data/grades";
import {
  buildStrengthsAnalysis,
  buildWeaknessesAnalysis,
} from "./build-analysis";
import { ATP_SUMMER_2026_SEEDS } from "./summer-2026-atp";
import { WTA_SUMMER_2026_SEEDS } from "./summer-2026-wta";
import type { GuideEdition, GuidePlayer, GuidePlayerSeed } from "./types";

export const GUIDE_EDITION_ID = "summer-2026";
export const GUIDE_PRICE_USD = 4.99;
export const GUIDE_PRICE_LABEL = "$4.99";
export const GUIDE_PDF_FILENAME = "tennisstatman-player-guide-summer-2026.pdf";

function slugify(name: string): string {
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

function skillsForSeed(seed: GuidePlayerSeed): CoreSkillGrades {
  const id = slugify(seed.name);
  const curated = curatedPlayers.find(
    (p) => p.tour === seed.tour && slugify(p.name) === id,
  );

  if (curated) {
    return {
      serve: curated.skills.serve,
      forehand: curated.skills.forehand,
      backhand: curated.skills.backhand,
      netPlay: curated.skills.netPlay,
      movement: curated.skills.movement,
    };
  }

  if (
    seed.skills?.serve != null &&
    seed.skills.forehand != null &&
    seed.skills.backhand != null &&
    seed.skills.netPlay != null &&
    seed.skills.movement != null
  ) {
    return {
      serve: seed.skills.serve,
      forehand: seed.skills.forehand,
      backhand: seed.skills.backhand,
      netPlay: seed.skills.netPlay,
      movement: seed.skills.movement,
    };
  }

  const rng = mulberry32(hashString(`${seed.tour}:${id}`));
  const base = 93 - 9 * Math.log10(seed.rank + 1) + (rng() * 4 - 2);
  const core = {
    serve: Math.round(Math.min(97, Math.max(55, base + (rng() * 10 - 5)))),
    forehand: Math.round(Math.min(97, Math.max(55, base + (rng() * 10 - 5)))),
    backhand: Math.round(Math.min(97, Math.max(55, base + (rng() * 10 - 5)))),
    netPlay: Math.round(Math.min(97, Math.max(55, base + (rng() * 10 - 5) - 4))),
    movement: Math.round(Math.min(97, Math.max(55, base + (rng() * 10 - 5)))),
  };
  const full = completeSkillGrades(core, hashString(id));
  return {
    serve: full.serve,
    forehand: full.forehand,
    backhand: full.backhand,
    netPlay: full.netPlay,
    movement: full.movement,
  };
}

function buildGuidePlayer(seed: GuidePlayerSeed): GuidePlayer {
  const id = slugify(seed.name);
  const curated = curatedPlayers.find(
    (p) => p.tour === seed.tour && slugify(p.name) === id,
  );
  const skills = skillsForSeed(seed);
  const firstName = seed.name.split(" ")[0] ?? seed.name;
  const yearsOnTour = Math.max(0, 2026 - seed.turnedPro);

  return {
    id,
    name: seed.name,
    tour: seed.tour,
    rank: seed.rank,
    rankLastYear: seed.rankLastYear,
    country: seed.country,
    countryName: seed.countryName,
    location: seed.location,
    birthYear: seed.birthYear,
    heightCm: seed.heightCm,
    turnedPro: seed.turnedPro,
    yearsOnTour,
    nationality: seed.countryName,
    hand: seed.hand ?? curated?.hand ?? "R",
    playstyle: seed.playstyle ?? curated?.playstyle ?? "Tour competitor",
    skills,
    topFinishes: seed.topFinishes.slice(0, 5),
    strengths: buildStrengthsAnalysis({
      id,
      firstName,
      playstyle: seed.playstyle ?? curated?.playstyle ?? "Tour competitor",
      skills,
      custom: seed.strengths,
    }),
    weaknesses: buildWeaknessesAnalysis({
      id,
      firstName,
      skills,
      custom: seed.weaknesses,
    }),
    funFact: seed.funFact || curated?.funStat || "Still rewriting the scouting file.",
  };
}

const atpPlayers = ATP_SUMMER_2026_SEEDS.map(buildGuidePlayer);
const wtaPlayers = WTA_SUMMER_2026_SEEDS.map(buildGuidePlayer);

export const SUMMER_2026_GUIDE: GuideEdition = {
  id: GUIDE_EDITION_ID,
  title: "TennisStatMan Player Guide",
  subtitle: "Top 50 Men & Women",
  editionLabel: "Summer 2026 Edition",
  snapshotNote:
    "Post-Wimbledon rankings snapshot. Skill radars and scouting notes freeze the tour as it stood in Summer 2026.",
  priceUsd: GUIDE_PRICE_USD,
  priceLabel: GUIDE_PRICE_LABEL,
  publishedAt: "2026-07-24",
  players: [...atpPlayers, ...wtaPlayers],
};

export function getGuidePlayersByTour(tour: "ATP" | "WTA"): GuidePlayer[] {
  return SUMMER_2026_GUIDE.players.filter((p) => p.tour === tour);
}

export function getFeaturedGuidePlayer(): GuidePlayer {
  return (
    SUMMER_2026_GUIDE.players.find((p) => p.id === "jannik-sinner") ??
    SUMMER_2026_GUIDE.players[0]
  );
}
