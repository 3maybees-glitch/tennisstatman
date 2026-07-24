import { NextResponse } from "next/server";
import {
  getPlayerGuidePriceId,
  getSiteUrl,
  getStripe,
  PLAYER_GUIDE_EDITION,
  PLAYER_GUIDE_PRODUCT,
} from "@/lib/stripe";

export async function POST() {
  try {
    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const priceId = getPlayerGuidePriceId();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/api/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/guides/summer-2026?canceled=1`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata: {
        product: PLAYER_GUIDE_PRODUCT,
        edition: PLAYER_GUIDE_EDITION,
      },
      payment_intent_data: {
        metadata: {
          product: PLAYER_GUIDE_PRODUCT,
          edition: PLAYER_GUIDE_EDITION,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
