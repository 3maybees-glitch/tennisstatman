export type MomentumPoint = {
  game: number;
  label: string;
  player1: number;
  player2: number;
  event?: string;
};

export type MatchPreview = {
  id: string;
  tour: "ATP" | "WTA";
  tournament: string;
  round: string;
  player1: { name: string; seed?: number; country: string };
  player2: { name: string; seed?: number; country: string };
  score: string;
  date: string;
  momentumSwings: number;
  clutchIndex: number;
  pressurePointsWon: { p1: number; p2: number };
  momentumData: MomentumPoint[];
};

export const featuredMatches: MatchPreview[] = [
  {
    id: "atp-001",
    tour: "ATP",
    tournament: "Wimbledon",
    round: "Final",
    player1: { name: "Carlos Alcaraz", seed: 3, country: "ESP" },
    player2: { name: "Novak Djokovic", seed: 2, country: "SRB" },
    score: "6-4, 6-4",
    date: "2024-07-14",
    momentumSwings: 7,
    clutchIndex: 8.4,
    pressurePointsWon: { p1: 62, p2: 58 },
    momentumData: [
      { game: 1, label: "G1", player1: 55, player2: 45 },
      { game: 2, label: "G2", player1: 58, player2: 42 },
      { game: 3, label: "G3", player1: 52, player2: 48, event: "Break back" },
      { game: 4, label: "G4", player1: 48, player2: 52 },
      { game: 5, label: "G5", player1: 45, player2: 55, event: "Djokovic surge" },
      { game: 6, label: "G6", player1: 50, player2: 50 },
      { game: 7, label: "G7", player1: 62, player2: 38, event: "Alcaraz break" },
      { game: 8, label: "G8", player1: 68, player2: 32 },
      { game: 9, label: "G9", player1: 65, player2: 35 },
      { game: 10, label: "G10", player1: 58, player2: 42, event: "Set point saved" },
      { game: 11, label: "G11", player1: 72, player2: 28, event: "Momentum shift" },
      { game: 12, label: "G12", player1: 75, player2: 25 },
    ],
  },
  {
    id: "wta-001",
    tour: "WTA",
    tournament: "US Open",
    round: "Semifinal",
    player1: { name: "Coco Gauff", seed: 3, country: "USA" },
    player2: { name: "Karolina Muchova", seed: 10, country: "CZE" },
    score: "6-4, 3-6, 6-4",
    date: "2024-09-06",
    momentumSwings: 9,
    clutchIndex: 7.8,
    pressurePointsWon: { p1: 55, p2: 61 },
    momentumData: [
      { game: 1, label: "G1", player1: 50, player2: 50 },
      { game: 2, label: "G2", player1: 55, player2: 45 },
      { game: 3, label: "G3", player1: 60, player2: 40 },
      { game: 4, label: "G4", player1: 52, player2: 48 },
      { game: 5, label: "G5", player1: 45, player2: 55, event: "Muchova break" },
      { game: 6, label: "G6", player1: 40, player2: 60 },
      { game: 7, label: "G7", player1: 35, player2: 65, event: "Set lost" },
      { game: 8, label: "G8", player1: 42, player2: 58 },
      { game: 9, label: "G9", player1: 55, player2: 45, event: "Gauff reset" },
      { game: 10, label: "G10", player1: 62, player2: 38 },
      { game: 11, label: "G11", player1: 58, player2: 42 },
      { game: 12, label: "G12", player1: 70, player2: 30, event: "Deciding surge" },
    ],
  },
];

export const upcomingStats = [
  {
    id: "momentum",
    title: "Momentum Swing Index",
    description:
      "Track real-time probability shifts after every point, break, and hold. See when a match truly turns.",
    status: "preview" as const,
    icon: "wave",
  },
  {
    id: "clutch",
    title: "Clutch Factor Score",
    description:
      "Performance under pressure on break points, set points, and tiebreaks — weighted by match importance.",
    status: "preview" as const,
    icon: "target",
  },
  {
    id: "mental",
    title: "Mental Resilience Map",
    description:
      "Measure bounce-back rate after losing consecutive games or facing crowd adversity.",
    status: "coming" as const,
    icon: "brain",
  },
  {
    id: "environment",
    title: "External Factor Index",
    description:
      "Heat, wind, court speed, and schedule fatigue — how conditions shift win probability.",
    status: "coming" as const,
    icon: "cloud",
  },
  {
    id: "serve-momentum",
    title: "Serve Momentum Chain",
    description:
      "Visualize how hold streaks and break clusters cascade through a set.",
    status: "coming" as const,
    icon: "link",
  },
  {
    id: "crowd",
    title: "Crowd Influence Delta",
    description:
      "Estimate home-court advantage and momentum impact from audience energy shifts.",
    status: "coming" as const,
    icon: "users",
  },
];

export const tourRankings = {
  atp: [
    { rank: 1, name: "Jannik Sinner", country: "ITA", points: 11330, change: 0 },
    { rank: 2, name: "Carlos Alcaraz", country: "ESP", points: 7010, change: 0 },
    { rank: 3, name: "Alexander Zverev", country: "GER", points: 5930, change: 1 },
    { rank: 4, name: "Novak Djokovic", country: "SRB", points: 5560, change: -1 },
    { rank: 5, name: "Taylor Fritz", country: "USA", points: 4675, change: 0 },
  ],
  wta: [
    { rank: 1, name: "Aryna Sabalenka", country: "BLR", points: 9780, change: 0 },
    { rank: 2, name: "Iga Swiatek", country: "POL", points: 8195, change: 0 },
    { rank: 3, name: "Coco Gauff", country: "USA", points: 6580, change: 0 },
    { rank: 4, name: "Jessica Pegula", country: "USA", points: 5345, change: 0 },
    { rank: 5, name: "Elena Rybakina", country: "KAZ", points: 4865, change: 1 },
  ],
};
