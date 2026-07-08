import { NextResponse } from "next/server";
import {
  fetchTennisApiPlayerProfile,
  isTennisApiConfigured,
  TennisApiError,
  TENNIS_API_CACHE_CONTROL,
} from "@/lib/tennis-api";
import type { Tour } from "@/lib/rankings/types";

type RouteContext = {
  params: Promise<{ tour: string; playerId: string }>;
};

function parseTour(value: string): Tour | null {
  if (value === "atp") return "ATP";
  if (value === "wta") return "WTA";
  return null;
}

export async function GET(_request: Request, context: RouteContext) {
  if (!isTennisApiConfigured()) {
    return NextResponse.json(
      { error: "RAPIDAPI_KEY is not configured." },
      { status: 503 },
    );
  }

  const { tour: tourParam, playerId: playerIdParam } = await context.params;
  const tour = parseTour(tourParam);
  const playerId = Number(playerIdParam);

  if (!tour) {
    return NextResponse.json({ error: "Tour must be 'atp' or 'wta'." }, { status: 400 });
  }

  if (!Number.isInteger(playerId) || playerId < 1) {
    return NextResponse.json({ error: "Invalid player ID." }, { status: 400 });
  }

  try {
    const profile = await fetchTennisApiPlayerProfile(tour, playerId);
    return NextResponse.json(profile, {
      headers: {
        "Cache-Control": TENNIS_API_CACHE_CONTROL,
      },
    });
  } catch (error) {
    if (error instanceof TennisApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 502 },
      );
    }

    return NextResponse.json({ error: "Failed to fetch player profile." }, { status: 500 });
  }
}
