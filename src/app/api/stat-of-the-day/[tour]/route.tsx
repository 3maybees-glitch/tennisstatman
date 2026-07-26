import { ImageResponse } from "next/og";
import { NextResponse } from "next/server";
import {
  getStatOfTheDayByTour,
  STAT_OF_THE_DAY_IMAGE,
  type TourSide,
} from "@/lib/data/stat-of-the-day";
import { StatOfTheDayImageMarkup } from "@/lib/stat-of-the-day-image";

export const runtime = "edge";
export const revalidate = 3600;

function parseTour(value: string): TourSide | null {
  const normalized = value.toUpperCase();
  if (normalized === "ATP" || normalized === "MEN" || normalized === "MENS") {
    return "ATP";
  }
  if (
    normalized === "WTA" ||
    normalized === "WOMEN" ||
    normalized === "WOMENS"
  ) {
    return "WTA";
  }
  return null;
}

type RouteContext = {
  params: Promise<{ tour: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { tour: tourParam } = await context.params;
  const tour = parseTour(tourParam);

  if (!tour) {
    return NextResponse.json(
      { error: "Tour must be ATP (men) or WTA (women)." },
      { status: 400 },
    );
  }

  const stat = getStatOfTheDayByTour(tour);
  const filename =
    tour === "ATP"
      ? "tennisstatman-mens-stat-of-the-day.png"
      : "tennisstatman-womens-stat-of-the-day.png";

  return new ImageResponse(<StatOfTheDayImageMarkup stat={stat} />, {
    ...STAT_OF_THE_DAY_IMAGE,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
