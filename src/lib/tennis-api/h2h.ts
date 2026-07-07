import type { Tour } from "@/lib/rankings/types";
import { tennisApiRequest } from "./client";
import type { TennisApiH2HMatch, TennisApiTour } from "./types";

function toTennisApiTour(tour: Tour): TennisApiTour {
  return tour.toLowerCase() as TennisApiTour;
}

/** Basic head-to-head match history (free tier). */
export async function fetchTennisApiH2H(
  tour: Tour,
  player1Id: number,
  player2Id: number,
  pageSize = 10,
): Promise<TennisApiH2HMatch[]> {
  const apiTour = toTennisApiTour(tour);

  const payload = await tennisApiRequest<TennisApiH2HMatch[] | { data?: TennisApiH2HMatch[] }>(
    `/tennis/v2/${apiTour}/fixtures/h2h/${player1Id}/${player2Id}`,
    {
      params: {
        pageSize,
        pageNo: 1,
        filter: "PlayerGroup:singles",
      },
    },
  );

  return Array.isArray(payload) ? payload : (payload.data ?? []);
}
