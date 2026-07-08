import type { RankingEntry, RankingsSnapshot, Tour } from "@/lib/rankings/types";
import { RANKINGS_TOP_COUNT } from "@/lib/rankings/constants";
import { TENNIS_API_DOCS_URL, TENNIS_API_RAPIDAPI_URL } from "./constants";
import { isTennisApiConfigured, tennisApiRequest, TennisApiError } from "./client";
import type { TennisApiRankingRecord, TennisApiRankingsResponse, TennisApiTour } from "./types";
import { getFallbackRankings } from "@/lib/rankings/fallback";

function toTennisApiTour(tour: Tour): TennisApiTour {
  return tour.toLowerCase() as TennisApiTour;
}

function normalizeRankingRecords(records: TennisApiRankingRecord[]): RankingEntry[] {
  return records
    .map((record) => {
      const rank = Number(record.position);
      const name = record.player?.name ?? "";
      const country =
        record.player?.countryAcr ??
        record.player?.country?.acronym ??
        "";
      const points = Number(record.rankingPoints ?? record.point);

      if (!name || !country || Number.isNaN(rank) || Number.isNaN(points)) {
        return null;
      }

      const entry: RankingEntry = {
        rank,
        name,
        country,
        points,
        change: Number(record.player?.progress ?? 0) || 0,
        playerId: record.player?.id ? String(record.player.id) : undefined,
      };

      return entry;
    })
    .filter((entry): entry is RankingEntry => entry !== null)
    .sort((a, b) => a.rank - b.rank);
}

export async function fetchTennisApiRankings(
  tour: Tour,
  pageSize = RANKINGS_TOP_COUNT,
): Promise<RankingsSnapshot> {
  if (!isTennisApiConfigured()) {
    return getFallbackRankings(
      tour,
      "RAPIDAPI_KEY is not set. Add your RapidAPI key to enable Tennis API rankings.",
    );
  }

  try {
    const apiTour = toTennisApiTour(tour);
    const payload = await tennisApiRequest<TennisApiRankingsResponse>(
      `/tennis/v2/${apiTour}/ranking/singles`,
      { params: { pageSize, pageNo: 1 } },
    );

    const records = Array.isArray(payload) ? payload : (payload.data ?? []);
    const entries = normalizeRankingRecords(records).slice(0, RANKINGS_TOP_COUNT);

    if (entries.length === 0) {
      return getFallbackRankings(
        tour,
        "Tennis API rankings response did not contain any entries.",
      );
    }

    const rankingDate = records[0]?.date;

    return {
      tour,
      source: "tennis-api",
      sourceUrl: TENNIS_API_RAPIDAPI_URL,
      updatedAt: rankingDate ?? new Date().toISOString(),
      entries,
    };
  } catch (error) {
    if (error instanceof TennisApiError && error.status === 401) {
      return getFallbackRankings(
        tour,
        "Tennis API rejected the RapidAPI key. Check RAPIDAPI_KEY in .env.local.",
      );
    }

    if (error instanceof TennisApiError && error.status === 429) {
      return getFallbackRankings(
        tour,
        "Tennis API quota exceeded. Rankings refresh at most once per week on the free tier.",
      );
    }

    const message =
      error instanceof Error ? error.message : "Unknown Tennis API error.";
    return getFallbackRankings(tour, message);
  }
}

export function getTennisApiSetupHint(): string {
  return `Configure RAPIDAPI_KEY to enable Tennis API. Docs: ${TENNIS_API_DOCS_URL}`;
}
