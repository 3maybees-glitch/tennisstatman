export type RaceEntry = {
  playerId: string;
  name: string;
  country: string;
  /** Cumulative race points at each checkpoint (index-aligned with RACE_CHECKPOINTS) */
  points: number[];
  color: string;
};

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
    playerId: "jannik-sinner",
    name: "Jannik Sinner",
    country: "ITA",
    color: "#f0c75e",
    points: [180, 2180, 3180, 3380, 4580, 5780, 7080, 7680, 9280, 10080, 10680],
  },
  {
    playerId: "carlos-alcaraz",
    name: "Carlos Alcaraz",
    country: "ESP",
    color: "#40916c",
    points: [90, 890, 1890, 2490, 4090, 6090, 6890, 7290, 8090, 8590, 9190],
  },
  {
    playerId: "alexander-zverev",
    name: "Alexander Zverev",
    country: "GER",
    color: "#3b82f6",
    points: [130, 1430, 2030, 2330, 3130, 3730, 4130, 4630, 5030, 5530, 6030],
  },
  {
    playerId: "novak-djokovic",
    name: "Novak Djokovic",
    country: "SRB",
    color: "#8b5cf6",
    points: [0, 800, 1200, 1200, 1800, 2600, 3800, 3800, 4600, 4900, 5300],
  },
  {
    playerId: "taylor-fritz",
    name: "Taylor Fritz",
    country: "USA",
    color: "#ef4444",
    points: [200, 700, 1400, 1500, 1900, 2200, 3000, 3700, 4500, 4900, 5200],
  },
  {
    playerId: "jack-draper",
    name: "Jack Draper",
    country: "GBR",
    color: "#14b8a6",
    points: [60, 460, 1460, 1660, 2260, 2560, 3160, 3660, 4060, 4460, 4860],
  },
  {
    playerId: "lorenzo-musetti",
    name: "Lorenzo Musetti",
    country: "ITA",
    color: "#f97316",
    points: [45, 345, 745, 1345, 2145, 2845, 3245, 3445, 3745, 3945, 4245],
  },
  {
    playerId: "ben-shelton",
    name: "Ben Shelton",
    country: "USA",
    color: "#eab308",
    points: [90, 590, 990, 1090, 1490, 1790, 2590, 3090, 3690, 4090, 4390],
  },
];

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
