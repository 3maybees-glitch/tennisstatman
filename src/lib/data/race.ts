export type RaceEntry = {
  playerId: string;
  name: string;
  country: string;
  /**
   * Points at each checkpoint.
   * ATP entries hold one live total (see ATP_RACE_CHECKPOINTS).
   * WTA entries are an illustrative season sketch aligned with RACE_CHECKPOINTS.
   */
  points: number[];
  color: string;
  /** Set only when qualification is a known fact, not a top-8 inference. */
  qualified?: boolean;
};

/**
 * PIF ATP Live Race to Turin, fetched from
 * https://www.atptour.com/en/rankings/singles-race-to-turin
 * on 2026-11-01.
 *
 * These are live totals from that page, not a reconstructed season path.
 * Vienna and Basel were still in progress: Alcaraz and de Minaur had
 * reached the Vienna final, and Lehecka and Vacherot the Basel final.
 * `qualified` follows the players already in for Turin (Zverev, Alcaraz,
 * Shelton, Medvedev). Sinner is second on points and out for the season,
 * so a mechanical top-8 cut would be wrong.
 */
export const ATP_RACE_AS_OF = "2026-11-01";

export const ATP_RACE_SOURCE_URL =
  "https://www.atptour.com/en/rankings/singles-race-to-turin";

export const ATP_RACE_CHECKPOINTS = ["Nov 1, 2026 · Live Race"];

export const RACE_CHECKPOINTS = [
  "Jan · United Cup",
  "Feb · Australian Open",
  "Mar · Sunshine Double",
  "Apr · Monte Carlo",
  "May · Madrid + Rome",
  "Jun · Roland-Garros",
  "Jul · Wimbledon",
  "Aug · US Summer",
  "Sep · US Open",
  "Oct · Asian Swing",
  "Nov · Finals Push",
];

export const atpRace: RaceEntry[] = [
  {
    playerId: "alexander-zverev",
    name: "Alexander Zverev",
    country: "GER",
    color: "#3b82f6",
    points: [9350],
    qualified: true,
  },
  {
    playerId: "jannik-sinner",
    name: "Jannik Sinner",
    country: "ITA",
    color: "#f0c75e",
    points: [7950],
  },
  {
    playerId: "carlos-alcaraz",
    name: "Carlos Alcaraz",
    country: "ESP",
    color: "#40916c",
    points: [4930],
    qualified: true,
  },
  {
    playerId: "ben-shelton",
    name: "Ben Shelton",
    country: "USA",
    color: "#eab308",
    points: [4530],
    qualified: true,
  },
  {
    playerId: "daniil-medvedev",
    name: "Daniil Medvedev",
    country: "RUS",
    color: "#14b8a6",
    points: [3860],
    qualified: true,
  },
  {
    playerId: "flavio-cobolli",
    name: "Flavio Cobolli",
    country: "ITA",
    color: "#f97316",
    points: [3690],
  },
  {
    playerId: "arthur-fils",
    name: "Arthur Fils",
    country: "FRA",
    color: "#ec4899",
    points: [3525],
  },
  {
    playerId: "frances-tiafoe",
    name: "Frances Tiafoe",
    country: "USA",
    color: "#06b6d4",
    points: [3380],
  },
  {
    playerId: "alex-de-minaur",
    name: "Alex de Minaur",
    country: "AUS",
    color: "#a3e635",
    points: [3210],
  },
  {
    playerId: "rafael-jodar",
    name: "Rafael Jodar",
    country: "ESP",
    color: "#fb7185",
    points: [3209],
  },
  {
    playerId: "novak-djokovic",
    name: "Novak Djokovic",
    country: "SRB",
    color: "#8b5cf6",
    points: [2890],
  },
  {
    playerId: "taylor-fritz",
    name: "Taylor Fritz",
    country: "USA",
    color: "#ef4444",
    points: [2885],
  },
];

/** Illustrative season sketch. These are not official WTA race points. */
export const wtaRace: RaceEntry[] = [
  {
    playerId: "aryna-sabalenka",
    name: "Aryna Sabalenka",
    country: "BLR",
    color: "#f0c75e",
    points: [250, 2250, 3250, 3750, 4750, 5550, 6350, 7350, 9350, 9950, 10450],
  },
  {
    playerId: "iga-swiatek",
    name: "Iga Świątek",
    country: "POL",
    color: "#40916c",
    points: [120, 1020, 2020, 2620, 4620, 6620, 7220, 7620, 8220, 8720, 9120],
  },
  {
    playerId: "coco-gauff",
    name: "Coco Gauff",
    country: "USA",
    color: "#3b82f6",
    points: [180, 880, 1880, 2180, 2980, 4180, 4680, 5380, 6380, 6880, 7280],
  },
  {
    playerId: "mirra-andreeva",
    name: "Mirra Andreeva",
    country: "RUS",
    color: "#8b5cf6",
    points: [60, 560, 1560, 2160, 2760, 3360, 3860, 4260, 4860, 5560, 6060],
  },
  {
    playerId: "elena-rybakina",
    name: "Elena Rybakina",
    country: "KAZ",
    color: "#ef4444",
    points: [110, 810, 1410, 1710, 2310, 2710, 3710, 4210, 4810, 5310, 5710],
  },
  {
    playerId: "jessica-pegula",
    name: "Jessica Pegula",
    country: "USA",
    color: "#14b8a6",
    points: [150, 750, 1450, 1750, 2350, 2750, 3150, 3950, 4750, 5150, 5450],
  },
  {
    playerId: "madison-keys",
    name: "Madison Keys",
    country: "USA",
    color: "#f97316",
    points: [90, 2090, 2490, 2690, 3090, 3390, 3790, 4190, 4690, 4990, 5290],
  },
  {
    playerId: "jasmine-paolini",
    name: "Jasmine Paolini",
    country: "ITA",
    color: "#eab308",
    points: [70, 470, 1070, 1470, 2470, 3070, 3570, 3870, 4270, 4670, 4970],
  },
];
