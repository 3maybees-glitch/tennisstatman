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
    id: "wimbledon-2026-m-final",
    tour: "ATP",
    tournament: "Wimbledon",
    round: "Final",
    player1: { name: "Jannik Sinner", seed: 1, country: "ITA" },
    player2: { name: "Alexander Zverev", seed: 2, country: "GER" },
    score: "6-7(7), 7-6(2), 6-3, 6-4",
    date: "2026-07-12",
    momentumSwings: 11,
    clutchIndex: 9.2,
    pressurePointsWon: { p1: 64, p2: 58 },
    momentumData: [
      { game: 1, label: "S1", player1: 48, player2: 52 },
      { game: 2, label: "S1", player1: 44, player2: 56, event: "Zverev tiebreak edge" },
      { game: 3, label: "S2", player1: 52, player2: 48 },
      { game: 4, label: "S2", player1: 58, player2: 42, event: "Sinner levels" },
      { game: 5, label: "S3", player1: 55, player2: 45 },
      { game: 6, label: "S3", player1: 62, player2: 38, event: "Zverev slip" },
      { game: 7, label: "S3", player1: 68, player2: 32 },
      { game: 8, label: "S4", player1: 60, player2: 40 },
      { game: 9, label: "S4", player1: 55, player2: 45, event: "Zverev fights back" },
      { game: 10, label: "S4", player1: 58, player2: 42 },
      { game: 11, label: "S4", player1: 72, player2: 28, event: "Championship point" },
      { game: 12, label: "End", player1: 78, player2: 22 },
    ],
  },
  {
    id: "wimbledon-2026-w-final",
    tour: "WTA",
    tournament: "Wimbledon",
    round: "Final",
    player1: { name: "Linda Nosková", seed: 9, country: "CZE" },
    player2: { name: "Karolína Muchová", seed: 10, country: "CZE" },
    score: "6-2, 5-7, 6-3",
    date: "2026-07-11",
    momentumSwings: 14,
    clutchIndex: 8.9,
    pressurePointsWon: { p1: 61, p2: 56 },
    momentumData: [
      { game: 1, label: "S1", player1: 62, player2: 38 },
      { game: 2, label: "S1", player1: 68, player2: 32, event: "Nosková breaks twice" },
      { game: 3, label: "S2", player1: 72, player2: 28 },
      { game: 4, label: "S2", player1: 65, player2: 35 },
      { game: 5, label: "S2", player1: 48, player2: 52, event: "5 match points saved" },
      { game: 6, label: "S2", player1: 35, player2: 65, event: "Muchova roars back" },
      { game: 7, label: "S3", player1: 42, player2: 58 },
      { game: 8, label: "S3", player1: 55, player2: 45, event: "Early break" },
      { game: 9, label: "S3", player1: 62, player2: 38 },
      { game: 10, label: "S3", player1: 68, player2: 32 },
      { game: 11, label: "S3", player1: 75, player2: 25, event: "6th match point" },
      { game: 12, label: "End", player1: 82, player2: 18 },
    ],
  },
];

export const upcomingStats = [
  {
    id: "pulse",
    title: "PULSE Form Score",
    description:
      "Our signature 0-100 form score — recent results, opponent strength, pressure points, and momentum in one heartbeat.",
    status: "preview" as const,
    icon: "pulse",
  },
  {
    id: "momentum",
    title: "Momentum Swing Index",
    description:
      "Track real-time probability shifts after every point, break, and hold. See when a match truly turns.",
    status: "preview" as const,
    icon: "wave",
  },
  {
    id: "skills",
    title: "Skill Category Leaderboards",
    description:
      "Top 10 bar charts and tables for serve, forehand, backhand, net play, and movement — ATP and WTA. Courtside exclusive.",
    status: "preview" as const,
    icon: "bars",
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
