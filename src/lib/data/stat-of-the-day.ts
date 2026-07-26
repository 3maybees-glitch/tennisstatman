export type TourSide = "ATP" | "WTA";

export type DailyStat = {
  tour: TourSide;
  headline: string;
  detail: string;
  category: string;
  relatedHref: string;
  relatedLabel: string;
};

const menDailyStats: DailyStat[] = [
  {
    tour: "ATP",
    headline: "89%",
    detail:
      "Jannik Sinner's win rate after taking the first set since 2024 — the best front-running record on tour. Translation: break him early or bring a book.",
    category: "Front-runner watch",
    relatedHref: "/players/jannik-sinner",
    relatedLabel: "Sinner's player card",
  },
  {
    tour: "ATP",
    headline: "+23 PULSE",
    detail:
      "Jack Draper's PULSE has climbed 23 points in 12 months — the steepest rise of any top-10 ATP player. The lefty express has left the station.",
    category: "PULSE mover",
    relatedHref: "/stats/pulse",
    relatedLabel: "PULSE leaderboard",
  },
  {
    tour: "ATP",
    headline: "96%",
    detail:
      "Novak Djokovic has broken serve in 96% of his matches since 2010. Nobody else in the dataset is above 90%. The return remains undefeated by time.",
    category: "Legend corner",
    relatedHref: "/players/novak-djokovic",
    relatedLabel: "Djokovic's player card",
  },
  {
    tour: "ATP",
    headline: "7.1 per set",
    detail:
      "João Fonseca averaged 7.1 forehand winners per set at Challenger level — a tracking-era record for a teenager. Our prospect radar saw him coming 18 months out.",
    category: "Prospect radar",
    relatedHref: "/players/joao-fonseca",
    relatedLabel: "Fonseca's player card",
  },
  {
    tour: "ATP",
    headline: "38 aces",
    detail:
      "Ben Shelton's single-match ace high on hard courts since 2024. When the lefty serve is dialed, returners are guessing — and usually wrong.",
    category: "Serve laboratory",
    relatedHref: "/players/ben-shelton",
    relatedLabel: "Shelton's player card",
  },
  {
    tour: "ATP",
    headline: "14 titles",
    detail:
      "Carlos Alcaraz has collected 14 tour-level titles before turning 23 — a pace that puts him in rare air among all-time greats.",
    category: "Trophy pace",
    relatedHref: "/players/carlos-alcaraz",
    relatedLabel: "Alcaraz's player card",
  },
  {
    tour: "ATP",
    headline: "71%",
    detail:
      "Alexander Zverev converts 71% of break points faced into holds under pressure in slam matches since 2023 — clutch when it counts most.",
    category: "Pressure index",
    relatedHref: "/players/alexander-zverev",
    relatedLabel: "Zverev's player card",
  },
];

const womenDailyStats: DailyStat[] = [
  {
    tour: "WTA",
    headline: "21 bagels",
    detail:
      "Iga Świątek has won 21 sets 6-0 since 2023 — more than the rest of the WTA top 10 combined. The bakery never closes.",
    category: "Dominance dept.",
    relatedHref: "/players/iga-swiatek",
    relatedLabel: "Świątek's player card",
  },
  {
    tour: "WTA",
    headline: "4-0",
    detail:
      "Naomi Osaka has never lost a Grand Slam final. Four finals, four trophies, all on hard courts. The biggest stage brings out her biggest tennis.",
    category: "Clutch file",
    relatedHref: "/players/naomi-osaka",
    relatedLabel: "Osaka's player card",
  },
  {
    tour: "WTA",
    headline: "3.4 shots",
    detail:
      "Madison Keys plays the shortest average rally in the WTA top 10 at 3.4 shots. Blink twice and you've missed a service game.",
    category: "First-strike files",
    relatedHref: "/players/madison-keys",
    relatedLabel: "Keys' player card",
  },
  {
    tour: "WTA",
    headline: "12 titles",
    detail:
      "Coco Gauff has already banked 12 tour-level titles, including a hard-court slam — and she's still rewriting what early-20s dominance looks like.",
    category: "Trophy pace",
    relatedHref: "/players/coco-gauff",
    relatedLabel: "Gauff's player card",
  },
  {
    tour: "WTA",
    headline: "64%",
    detail:
      "Aryna Sabalenka's first-serve win rate on hard courts since 2024 — power that turns holds into formality and return games into coin flips.",
    category: "Serve laboratory",
    relatedHref: "/players/aryna-sabalenka",
    relatedLabel: "Sabalenka's player card",
  },
  {
    tour: "WTA",
    headline: "+18 PULSE",
    detail:
      "Elena Rybakina's PULSE climb over the past year ranks among the sharpest rises in the WTA top 10 — quiet form, loud results.",
    category: "PULSE mover",
    relatedHref: "/stats/pulse",
    relatedLabel: "PULSE leaderboard",
  },
  {
    tour: "WTA",
    headline: "9.2 winners",
    detail:
      "Jessica Pegula averages 9.2 winners per set on hard courts in 2025 — clean ball-striking that wears down anyone who can't match the pace.",
    category: "Ball-striking dept.",
    relatedHref: "/players/jessica-pegula",
    relatedLabel: "Pegula's player card",
  },
];

function dayIndex(date: Date): number {
  return Math.floor(date.getTime() / 86_400_000);
}

/** Deterministic men's (ATP) pick per calendar day so server and client agree. */
export function getMenStatOfTheDay(date = new Date()): DailyStat {
  const index = dayIndex(date);
  return menDailyStats[index % menDailyStats.length];
}

/** Deterministic women's (WTA) pick per calendar day so server and client agree. */
export function getWomenStatOfTheDay(date = new Date()): DailyStat {
  // Offset so the two tours rotate independently through their pools.
  const index = dayIndex(date) + 3;
  return womenDailyStats[index % womenDailyStats.length];
}

/** @deprecated Prefer getMenStatOfTheDay / getWomenStatOfTheDay. */
export function getStatOfTheDay(date = new Date()): DailyStat {
  return getMenStatOfTheDay(date);
}

export function getStatOfTheDayByTour(
  tour: TourSide,
  date = new Date(),
): DailyStat {
  return tour === "ATP" ? getMenStatOfTheDay(date) : getWomenStatOfTheDay(date);
}

export const STAT_OF_THE_DAY_IMAGE = {
  /** Tall portrait — easy to post on X without cropping. */
  width: 1080,
  height: 1350,
} as const;
