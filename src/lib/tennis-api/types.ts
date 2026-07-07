import type { Tour } from "@/lib/rankings/types";

export type TennisApiTour = Lowercase<Tour>;

export type TennisApiRankingRecord = {
  id?: number;
  date?: string;
  position?: number;
  rankingPoints?: number;
  point?: number;
  player?: {
    id?: number;
    name?: string;
    countryAcr?: string;
    progress?: number;
    country?: { acronym?: string; name?: string };
  };
};

export type TennisApiRankingsResponse = {
  data?: TennisApiRankingRecord[];
};

export type TennisApiPlayerSummary = {
  id: number;
  name: string;
  countryAcr?: string | null;
  currentRank?: number | null;
  points?: number | null;
  progress?: number | null;
};

export type TennisApiFixture = {
  id: number;
  date?: string | null;
  result?: string;
  roundId?: number;
  player1Id?: number;
  player2Id?: number;
  tournamentId?: number;
  seed1?: string | null;
  seed2?: string | null;
  player1?: { id: number; name: string; countryAcr?: string };
  player2?: { id: number; name: string; countryAcr?: string };
  tournament?: { id: number; name?: string };
  round?: { id: number; name?: string };
};

export type TennisApiFixturesResponse = {
  data?: TennisApiFixture[] | { data?: TennisApiFixture[]; hasNextPage?: boolean };
  hasNextPage?: boolean;
};

export type TennisApiPlayerProfile = {
  id: number;
  name: string;
  countryAcr?: string;
  currentRank?: number;
  points?: number;
  progress?: number;
  birthDate?: string;
  height?: string;
  weight?: string;
  turnedPro?: number;
  country?: { name?: string; acronym?: string };
};

export type TennisApiH2HMatch = TennisApiFixture;
