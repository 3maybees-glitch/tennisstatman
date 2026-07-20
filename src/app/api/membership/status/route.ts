import { NextResponse } from "next/server";
import {
  getCourtsidePreviewMembership,
  isCourtsidePreviewEnabled,
} from "@/lib/courtside-preview";
import { getCourtsideCustomerId } from "@/lib/courtside-session";
import { getCourtsideMembership } from "@/lib/stripe";

export async function GET() {
  if (isCourtsidePreviewEnabled()) {
    return NextResponse.json(getCourtsidePreviewMembership());
  }

  const customerId = await getCourtsideCustomerId();

  if (!customerId) {
    return NextResponse.json({
      active: false,
      plan: null,
      status: null,
      currentPeriodEnd: null,
      preview: false,
    });
  }

  try {
    const membership = await getCourtsideMembership(customerId);
    return NextResponse.json({ ...membership, preview: false });
  } catch {
    return NextResponse.json(
      { error: "Unable to verify Courtside membership." },
      { status: 500 },
    );
  }
}
