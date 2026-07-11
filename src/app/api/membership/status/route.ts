import { NextResponse } from "next/server";
import { getCourtsideCustomerId } from "@/lib/courtside-session";
import { getCourtsideMembership } from "@/lib/stripe";

export async function GET() {
  const customerId = await getCourtsideCustomerId();

  if (!customerId) {
    return NextResponse.json({
      active: false,
      plan: null,
      status: null,
      currentPeriodEnd: null,
    });
  }

  try {
    const membership = await getCourtsideMembership(customerId);
    return NextResponse.json(membership);
  } catch {
    return NextResponse.json(
      { error: "Unable to verify Courtside membership." },
      { status: 500 },
    );
  }
}
