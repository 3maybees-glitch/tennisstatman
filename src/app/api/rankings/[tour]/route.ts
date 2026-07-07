import { NextResponse } from "next/server";
import { fetchTourRankings } from "@/lib/rankings";
import type { Tour } from "@/lib/rankings/types";

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
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
