import { NextResponse } from "next/server";
import {
  fetchTennisApiFixturesByDate,
  fetchTennisApiFixturesByRange,
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

function isValidDate(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export async function GET(request: Request, context: RouteContext) {
  if (!isTennisApiConfigured()) {
    return NextResponse.json(
      { error: "RAPIDAPI_KEY is not configured." },
      { status: 503 },
    );
  }

  const { tour: tourParam } = await context.params;
  const tour = parseTour(tourParam);

  if (!tour) {
    return NextResponse.json({ error: "Tour must be 'atp' or 'wta'." }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    if (date) {
      if (!isValidDate(date)) {
        return NextResponse.json(
          { error: "date must be YYYY-MM-DD." },
          { status: 400 },
        );
      }

      const fixtures = await fetchTennisApiFixturesByDate(tour, date);
      return NextResponse.json({ tour, date, fixtures }, {
        headers: {
          "Cache-Control": TENNIS_API_CACHE_CONTROL,
        },
      });
    }

    if (startDate && endDate) {
      if (!isValidDate(startDate) || !isValidDate(endDate)) {
        return NextResponse.json(
          { error: "startDate and endDate must be YYYY-MM-DD." },
          { status: 400 },
        );
      }

      const fixtures = await fetchTennisApiFixturesByRange(
        tour,
        startDate,
        endDate,
      );
      return NextResponse.json({ tour, startDate, endDate, fixtures }, {
        headers: {
          "Cache-Control": TENNIS_API_CACHE_CONTROL,
        },
      });
    }

    return NextResponse.json(
      {
        error:
          "Provide ?date=YYYY-MM-DD or ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD. Live score endpoints are intentionally not used.",
      },
      { status: 400 },
    );
  } catch (error) {
    if (error instanceof TennisApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.status ?? 502 },
      );
    }

    return NextResponse.json({ error: "Failed to fetch fixtures." }, { status: 500 });
  }
}
