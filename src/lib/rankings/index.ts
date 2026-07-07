import { fetchAtpRankings } from "./atp";
import { fetchWtaRankings } from "./wta";
import type { RankingsSnapshot, Tour } from "./types";
import { isTennisApiConfigured } from "@/lib/tennis-api/client";
import { fetchTennisApiRankings } from "@/lib/tennis-api/rankings";
import { RANKINGS_TOP_COUNT } from "./constants";

function isLiveSnapshot(snapshot: RankingsSnapshot): boolean {
  return snapshot.source !== "fallback";
}

export async function fetchTourRankings(tour: Tour): Promise<RankingsSnapshot> {
  // Tennis API returns top 100 for both tours (official WTA HTML only exposes ~50).
  if (isTennisApiConfigured()) {
    const tennisApiRankings = await fetchTennisApiRankings(tour, RANKINGS_TOP_COUNT);
    if (isLiveSnapshot(tennisApiRankings)) {
      return tennisApiRankings;
    }
  }

  const official =
    tour === "ATP" ? await fetchAtpRankings() : await fetchWtaRankings();

  if (isLiveSnapshot(official)) {
    if (tour === "WTA" && official.entries.length < RANKINGS_TOP_COUNT) {
      return {
        ...official,
        warning:
          official.warning ??
          `Official WTA page lists ${official.entries.length} players. Add RAPIDAPI_KEY for the full top ${RANKINGS_TOP_COUNT}.`,
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
