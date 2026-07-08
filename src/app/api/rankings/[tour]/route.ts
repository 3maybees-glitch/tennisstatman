import { NextResponse } from "next/server";
import { fetchTourRankings } from "@/lib/rankings";
import type { Tour } from "@/lib/rankings/types";
import { TENNIS_API_CACHE_CONTROL } from "@/lib/tennis-api";

type RouteContext = {
  params: Promise<{ tour: string }>;
};

function isTour(value: string): value is Tour {
  return value === "atp" || value === "wta";
}

export async function GET(_request: Request, context: RouteContext) {
  const { tour: tourParam } = await context.params;

  if (!isTour(tourParam)) {
    return NextResponse.json(
      { error: "Tour must be 'atp' or 'wta'." },
      { status: 400 },
    );
  }

  const tour = tourParam.toUpperCase() as Tour;
  const rankings = await fetchTourRankings(tour);

  return NextResponse.json(rankings, {
    headers: {
      "Cache-Control": TENNIS_API_CACHE_CONTROL,
    },
  });
}
