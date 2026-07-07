export type Tour = "ATP" | "WTA";

export type RankingSource =
  | "official-api"
  | "official-html"
  | "tennis-api"
  | "fallback";

export type RankingEntry = {
  rank: number;
  name: string;
  country: string;
  points: number;
  change: number;
  playerId?: string;
  tournamentsPlayed?: number;
  age?: number;
};

export type RankingsSnapshot = {
  tour: Tour;
  source: RankingSource;
  sourceUrl: string;
  updatedAt: string;
  entries: RankingEntry[];
  warning?: string;
};
