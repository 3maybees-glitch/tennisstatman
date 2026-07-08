import { NextResponse } from "next/server";
import {
  fetchTennisApiRankings,
  isTennisApiConfigured,
  TennisApiError,
  TENNIS_API_CACHE_CONTROL,
} from "@/lib/tennis-api";
import type { Tour } from "@/lib/rankings/types";

type RouteContext = {
  params: Promise<{ tour: string }>;
};

function parseTour(value: string): Tour | null {
  if (value === "atp") return "ATP";
  if (value === "wta") return "WTA";
  return null;
}

function notConfiguredResponse() {
  return NextResponse.json(
    {
      error:
        "RAPIDAPI_KEY is not configured. Add it to .env.local to use Tennis API endpoints.",
    },
    { status: 503 },
  );
}

function handleTennisApiError(error: unknown) {
  if (error instanceof TennisApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 502 },
    );
  }

  const message = error instanceof Error ? error.message : "Unknown Tennis API error.";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(_request: Request, context: RouteContext) {
  if (!isTennisApiConfigured()) {
    return notConfiguredResponse();
  }

  const { tour: tourParam } = await context.params;
  const tour = parseTour(tourParam);

  if (!tour) {
    return NextResponse.json(
      { error: "Tour must be 'atp' or 'wta'." },
      { status: 400 },
    );
  }

  try {
    const rankings = await fetchTennisApiRankings(tour);
    return NextResponse.json(rankings, {
      headers: {
        "Cache-Control": TENNIS_API_CACHE_CONTROL,
      },
    });
  } catch (error) {
    return handleTennisApiError(error);
  }
}
