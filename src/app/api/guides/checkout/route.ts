import { NextResponse } from "next/server";
import {
  DIGITAL_PRODUCTS,
  getDigitalProduct,
  type DigitalProductId,
} from "@/lib/guides/digital-products";
import {
  WAR_MAP_PRICE_CENTS,
  WAR_MAP_PRICE_LABEL,
} from "@/lib/data/guides/war-map-2026";
import {
  getPlayerGuidePriceId,
  getSiteUrl,
  getStripe,
  getWarMapPriceId,
  PLAYER_GUIDE_EDITION,
  PLAYER_GUIDE_PRODUCT,
  WAR_MAP_EDITION,
  WAR_MAP_PRODUCT,
} from "@/lib/stripe";

function resolveProduct(raw: unknown): DigitalProductId {
  if (raw === "war_map") return "war_map";
  return "player_guide";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as {
      product?: string;
    };
    const productId = resolveProduct(body.product);
    const product = getDigitalProduct(productId) ?? DIGITAL_PRODUCTS.player_guide;

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const metadata =
      product.product === "war_map"
        ? { product: WAR_MAP_PRODUCT, edition: WAR_MAP_EDITION }
        : { product: PLAYER_GUIDE_PRODUCT, edition: PLAYER_GUIDE_EDITION };

    const lineItems =
      product.product === "war_map"
        ? (() => {
            const priceId = getWarMapPriceId();
            if (priceId) {
              return [{ price: priceId, quantity: 1 }];
            }
            return [
              {
                price_data: {
                  currency: "usd",
                  unit_amount: WAR_MAP_PRICE_CENTS,
                  product_data: {
                    name: "TennisStatMan 2026 WAR MAP",
                    description: `One-page super master season preview sheet · ${WAR_MAP_PRICE_LABEL}`,
                  },
                },
                quantity: 1,
              },
            ];
          })()
        : [{ price: getPlayerGuidePriceId(), quantity: 1 }];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${siteUrl}/api/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}${product.cancelPath}?canceled=1`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      metadata,
      payment_intent_data: {
        metadata,
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
