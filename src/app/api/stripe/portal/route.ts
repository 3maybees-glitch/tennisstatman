import { NextResponse } from "next/server";
import { getCourtsideCustomerId } from "@/lib/courtside-session";
import { getSiteUrl, getStripe } from "@/lib/stripe";

export async function POST() {
  const customerId = await getCourtsideCustomerId();

  if (!customerId) {
    return NextResponse.json(
      { error: "No Courtside subscription found for this browser." },
      { status: 401 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getSiteUrl()}/courtside`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to open the billing portal.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
