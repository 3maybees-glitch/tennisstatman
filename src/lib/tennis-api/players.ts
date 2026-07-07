import type { Tour } from "@/lib/rankings/types";
import { tennisApiRequest } from "./client";
import type { TennisApiPlayerProfile, TennisApiTour } from "./types";

function toTennisApiTour(tour: Tour): TennisApiTour {
  return tour.toLowerCase() as TennisApiTour;
}

/** Basic player profile (free tier). */
export async function fetchTennisApiPlayerProfile(
  tour: Tour,
  playerId: number,
): Promise<TennisApiPlayerProfile> {
  const apiTour = toTennisApiTour(tour);

  return tennisApiRequest<TennisApiPlayerProfile>(
    `/tennis/v2/${apiTour}/player/profile/${playerId}`,
    { params: { include: "country" } },
  );
}

/** Completed match results for a player (historical, not live). */
export async function fetchTennisApiPlayerPastMatches(
  tour: Tour,
  playerId: number,
  pageSize = 10,
): Promise<unknown> {
  const apiTour = toTennisApiTour(tour);

  return tennisApiRequest(
    `/tennis/v2/${apiTour}/player/past-matches/${playerId}`,
    { params: { pageSize, pageNo: 1 } },
  );
}
