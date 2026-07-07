import { NextResponse } from "next/server";
import {
  fetchTennisApiH2H,
  isTennisApiConfigured,
  TennisApiError,
} from "@/lib/tennis-api";
import type { Tour } from "@/lib/rankings/types";

type RouteContext = {
  params: Promise<{ tour: string; player1Id: string; player2Id: string }>;
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

  const { tour: tourParam, player1Id: p1Param, player2Id: p2Param } =
    await context.params;
  const tour = parseTour(tourParam);
  const player1Id = Number(p1Param);
  const player2Id = Number(p2Param);

  if (!tour) {
    return NextResponse.json({ error: "Tour must be 'atp' or 'wta'." }, { status: 400 });
  }

  if (
    !Number.isInteger(player1Id) ||
    !Number.isInteger(player2Id) ||
    player1Id < 1 ||
    player2Id < 1
  ) {
    return NextResponse.json({ error: "Invalid player IDs." }, { status: 400 });
  }

  try {
    const matches = await fetchTennisApiH2H(tour, player1Id, player2Id);
    return NextResponse.json(
      { tour, player1Id, player2Id, matches },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    if (error instanceof TennisApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 502 },
      );
    }

    return NextResponse.json({ error: "Failed to fetch H2H data." }, { status: 500 });
  }
}
