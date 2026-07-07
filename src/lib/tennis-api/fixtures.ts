import type { Tour } from "@/lib/rankings/types";
import { tennisApiRequest } from "./client";
import type {
  TennisApiFixture,
  TennisApiFixturesResponse,
  TennisApiTour,
} from "./types";

function toTennisApiTour(tour: Tour): TennisApiTour {
  return tour.toLowerCase() as TennisApiTour;
}

function unwrapFixtures(payload: TennisApiFixturesResponse): TennisApiFixture[] {
  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data && "data" in payload.data && Array.isArray(payload.data.data)) {
    return payload.data.data;
  }

  return [];
}

/** Upcoming fixtures for a date (not live scores). */
export async function fetchTennisApiFixturesByDate(
  tour: Tour,
  date: string,
  pageSize = 20,
): Promise<TennisApiFixture[]> {
  const apiTour = toTennisApiTour(tour);
  const payload = await tennisApiRequest<TennisApiFixturesResponse>(
    `/tennis/v2/${apiTour}/fixtures/${date}`,
    {
      params: {
        pageSize,
        pageNo: 1,
        include: "round,tournament",
        filter: "PlayerGroup:singles",
      },
    },
  );

  return unwrapFixtures(payload);
}

/** Upcoming fixtures in a date range (not live scores). */
export async function fetchTennisApiFixturesByRange(
  tour: Tour,
  startDate: string,
  endDate: string,
  pageSize = 20,
): Promise<TennisApiFixture[]> {
  const apiTour = toTennisApiTour(tour);
  const payload = await tennisApiRequest<TennisApiFixturesResponse>(
    `/tennis/v2/${apiTour}/fixtures/${startDate}/${endDate}`,
    {
      params: {
        pageSize,
        pageNo: 1,
        include: "round,tournament",
        filter: "PlayerGroup:singles",
      },
    },
  );

  return unwrapFixtures(payload);
}
