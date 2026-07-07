import {
  DEFAULT_BROWSER_HEADERS,
  OFFICIAL_SOURCES,
  RANKINGS_REVALIDATE_SECONDS,
} from "./constants";
import { getFallbackRankings } from "./fallback";
import type { RankingEntry, RankingsSnapshot } from "./types";

type AtpRankingRecord = {
  rank?: string | number;
  points?: string | number;
  rankingChange?: string | number;
  player?: {
    firstName?: string;
    lastName?: string;
    playerId?: string | number;
    country?: {
      countryCode?: string;
      name?: string;
    };
  };
};

function normalizeAtpEntries(payload: unknown): RankingEntry[] {
  const root = payload as {
    rankings?: AtpRankingRecord[];
    data?: { rankings?: AtpRankingRecord[] };
  };

  const records = root.rankings ?? root.data?.rankings ?? [];

  return records
    .map((record) => {
      const rank = Number(record.rank);
      const points = Number(record.points);
      const firstName = record.player?.firstName ?? "";
      const lastName = record.player?.lastName ?? "";
      const name = `${firstName} ${lastName}`.trim();
      const country = record.player?.country?.countryCode ?? "";

      if (!name || !country || Number.isNaN(rank) || Number.isNaN(points)) {
        return null;
      }

      const entry: RankingEntry = {
        rank,
        name,
        country,
        points,
        change: Number(record.rankingChange ?? 0) || 0,
        playerId: record.player?.playerId
          ? String(record.player.playerId)
          : undefined,
      };

      return entry;
    })
    .filter((entry): entry is RankingEntry => entry !== null)
    .sort((a, b) => a.rank - b.rank);
}

export async function fetchAtpRankings(): Promise<RankingsSnapshot> {
  try {
    const response = await fetch(OFFICIAL_SOURCES.ATP.api, {
      headers: {
        ...DEFAULT_BROWSER_HEADERS,
        Accept: "application/json, text/plain, */*",
        Referer: OFFICIAL_SOURCES.ATP.page,
        Origin: "https://www.atptour.com",
      },
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return getFallbackRankings(
        "ATP",
        `ATP official rankings API returned ${response.status}. This source is protected in some environments.`,
      );
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return getFallbackRankings(
        "ATP",
        "ATP official rankings API did not return JSON (likely bot protection).",
      );
    }

    const payload = await response.json();
    const entries = normalizeAtpEntries(payload);

    if (entries.length === 0) {
      return getFallbackRankings(
        "ATP",
        "ATP official rankings API responded, but no entries were parsed.",
      );
    }

    return {
      tour: "ATP",
      source: "official-api",
      sourceUrl: OFFICIAL_SOURCES.ATP.api,
      updatedAt: new Date().toISOString(),
      entries,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown ATP fetch error.";
    return getFallbackRankings("ATP", message);
  }
}
