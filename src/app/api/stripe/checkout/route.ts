import { NextResponse } from "next/server";
import {
  getCourtsidePriceId,
  getLaunchMonthlyCouponId,
  getSiteUrl,
  getStripe,
  isCourtsidePlan,
  type CourtsidePlan,
} from "@/lib/stripe";
import { getCourtsideCustomerId } from "@/lib/courtside-session";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { plan?: unknown };
    const plan = body.plan;

    if (!isCourtsidePlan(plan)) {
      return NextResponse.json(
        {
          error:
            "Plan must be 'monthly', 'annual', 'launch_monthly', 'launch_annual', or 'lifetime'.",
        },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const customerId = await getCourtsideCustomerId();

    const session =
      plan === "lifetime"
        ? await createLifetimeSession(stripe, siteUrl, customerId)
        : await createSubscriptionSession(stripe, siteUrl, customerId, plan);

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

async function createLifetimeSession(
  stripe: ReturnType<typeof getStripe>,
  siteUrl: string,
  customerId: string | null,
) {
  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: getCourtsidePriceId("lifetime"), quantity: 1 }],
    success_url: `${siteUrl}/api/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing?canceled=1`,
    billing_address_collection: "auto",
    ...(customerId ? { customer: customerId } : {}),
    metadata: {
      plan: "lifetime",
      product: "courtside",
    },
    payment_intent_data: {
      metadata: {
        plan: "lifetime",
        product: "courtside",
      },
    },
  });
}

async function createSubscriptionSession(
  stripe: ReturnType<typeof getStripe>,
  siteUrl: string,
  customerId: string | null,
  plan: Exclude<CourtsidePlan, "lifetime">,
) {
  const launchCoupon =
    plan === "launch_monthly" ? getLaunchMonthlyCouponId() : null;

  if (plan === "launch_monthly" && !launchCoupon) {
    throw new Error("STRIPE_COUPON_LAUNCH_MONTHLY is not configured.");
  }

  return stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: getCourtsidePriceId(plan), quantity: 1 }],
    success_url: `${siteUrl}/api/stripe/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/pricing?canceled=1`,
    billing_address_collection: "auto",
    ...(customerId ? { customer: customerId } : {}),
    ...(launchCoupon
      ? { discounts: [{ coupon: launchCoupon }] }
      : { allow_promotion_codes: true }),
    metadata: {
      plan,
      product: "courtside",
    },
    subscription_data: {
      metadata: {
        plan,
        product: "courtside",
      },
    },
  });
}
