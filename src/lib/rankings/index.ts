import { fetchAtpRankings } from "./atp";
import { fetchWtaRankings } from "./wta";
import type { RankingsSnapshot, Tour } from "./types";
import { isTennisApiConfigured } from "@/lib/tennis-api/client";
import { fetchTennisApiRankings } from "@/lib/tennis-api/rankings";

function isLiveSnapshot(snapshot: RankingsSnapshot): boolean {
  return snapshot.source !== "fallback";
}

export async function fetchTourRankings(tour: Tour): Promise<RankingsSnapshot> {
  // Prefer Tennis API for ATP when configured — official ATP feed is often bot-blocked.
  if (tour === "ATP" && isTennisApiConfigured()) {
    const tennisApiRankings = await fetchTennisApiRankings("ATP");
    if (isLiveSnapshot(tennisApiRankings)) {
      return tennisApiRankings;
    }
  }

  const official =
    tour === "ATP" ? await fetchAtpRankings() : await fetchWtaRankings();

  if (isLiveSnapshot(official)) {
    return official;
  }

  if (isTennisApiConfigured()) {
    const tennisApiRankings = await fetchTennisApiRankings(tour);
    if (isLiveSnapshot(tennisApiRankings)) {
      return tennisApiRankings;
    }
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
