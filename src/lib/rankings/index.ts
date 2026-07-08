import { fetchAtpRankings } from "./atp";
import { fetchWtaRankings } from "./wta";
import type { RankingsSnapshot, Tour } from "./types";
import { isTennisApiConfigured } from "@/lib/tennis-api/client";
import { fetchTennisApiRankings } from "@/lib/tennis-api/rankings";
import { RANKINGS_TOP_COUNT } from "./constants";

function isLiveSnapshot(snapshot: RankingsSnapshot): boolean {
  return snapshot.source !== "fallback";
}

/**
 * Prefer free official ATP/WTA feeds. Only call the paid Tennis API when
 * official data is unavailable or incomplete (mainly WTA top 100).
 */
export async function fetchTourRankings(tour: Tour): Promise<RankingsSnapshot> {
  const official =
    tour === "ATP" ? await fetchAtpRankings() : await fetchWtaRankings();

  const officialIsLive = isLiveSnapshot(official);
  const officialIsComplete =
    officialIsLive && official.entries.length >= RANKINGS_TOP_COUNT;

  if (officialIsComplete) {
    return official;
  }

  if (isTennisApiConfigured()) {
    const tennisApiRankings = await fetchTennisApiRankings(
      tour,
      RANKINGS_TOP_COUNT,
    );
    if (isLiveSnapshot(tennisApiRankings)) {
      return tennisApiRankings;
    }
  }

  if (officialIsLive) {
    if (tour === "WTA" && official.entries.length < RANKINGS_TOP_COUNT) {
      return {
        ...official,
        warning:
          official.warning ??
          `Official WTA page lists ${official.entries.length} players. Tennis API refreshes weekly when configured.`,
      };
    }
    return official;
  }

  return official;
}

export async function fetchAllRankings(): Promise<{
  atp: RankingsSnapshot;
  wta: RankingsSnapshot;
}> {
  const [atp, wta] = await Promise.all([
    fetchTourRankings("ATP"),
    fetchTourRankings("WTA"),
  ]);

  return { atp, wta };
}

export type { RankingEntry, RankingsSnapshot, Tour, RankingSource } from "./types";
