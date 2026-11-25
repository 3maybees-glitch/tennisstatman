import { NextResponse } from "next/server";
import { customerHasGuidePurchase } from "@/lib/account/customer-access";
import { getCourtsideCustomerId } from "@/lib/courtside-session";
import { getCourtsideMembership } from "@/lib/stripe";

export async function GET() {
  const customerId = await getCourtsideCustomerId();
  if (!customerId) {
    return NextResponse.json({
      signedIn: false,
      courtside: { active: false },
      guide: { purchased: false },
    });
  }

  try {
    const [membership, guidePurchased] = await Promise.all([
      getCourtsideMembership(customerId),
      customerHasGuidePurchase(customerId),
    ]);

    return NextResponse.json({
      signedIn: true,
      customerId,
      courtside: {
        active: membership.active,
        plan: membership.plan,
        status: membership.status,
        currentPeriodEnd: membership.currentPeriodEnd,
      },
      guide: {
        purchased: guidePurchased,
        edition: guidePurchased ? "summer-2026" : null,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to load account.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}