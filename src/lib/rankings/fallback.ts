import { tourRankings } from "@/lib/data/mock-matches";
import type { RankingsSnapshot, Tour } from "./types";
import { OFFICIAL_SOURCES } from "./constants";

export function getFallbackRankings(tour: Tour, warning?: string): RankingsSnapshot {
  const entries = tour === "ATP" ? tourRankings.atp : tourRankings.wta;

  return {
    tour,
    source: "fallback",
    sourceUrl: OFFICIAL_SOURCES[tour].page,
    updatedAt: new Date().toISOString(),
    entries,
    warning:
      warning ??
      `Live ${tour} rankings could not be fetched from the official source. Showing cached fallback data.`,
  };
}
