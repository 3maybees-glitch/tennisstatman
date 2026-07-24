import Stripe from "stripe";
import { SITE_URL } from "./seo/site";

export type CourtsidePlan =
  | "monthly"
  | "annual"
  | "launch_monthly"
  | "launch_annual"
  | "lifetime";

export type DigitalProduct = "courtside" | "player_guide" | "war_map";

export const PLAYER_GUIDE_PRODUCT = "player_guide" as const;
export const PLAYER_GUIDE_EDITION = "summer-2026" as const;
export const WAR_MAP_PRODUCT = "war_map" as const;
export const WAR_MAP_EDITION = "war-map-2026" as const;

export type CourtsideMembership = {
  active: boolean;
  plan: CourtsidePlan | null;
  status: Stripe.Subscription.Status | "lifetime" | null;
  currentPeriodEnd: number | null;
};

const ACTIVE_STATUSES = new Set<Stripe.Subscription.Status>([
  "active",
  "trialing",
]);

const PLAN_PRICE_ENV: Record<CourtsidePlan, string> = {
  monthly: "STRIPE_PRICE_MONTHLY",
  annual: "STRIPE_PRICE_ANNUAL",
  launch_monthly: "STRIPE_PRICE_MONTHLY",
  launch_annual: "STRIPE_PRICE_LAUNCH_ANNUAL",
  lifetime: "STRIPE_PRICE_LIFETIME",
};

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }

  if (process.env.VERCEL_ENV === "production") {
    return SITE_URL.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}

export function isCourtsidePlan(value: unknown): value is CourtsidePlan {
  return (
    value === "monthly" ||
    value === "annual" ||
    value === "launch_monthly" ||
    value === "launch_annual" ||
    value === "lifetime"
  );
}

export function getCourtsidePriceId(plan: CourtsidePlan): string {
  const envKey = PLAN_PRICE_ENV[plan];
  const priceId = process.env[envKey]?.trim();

  if (!priceId) {
    throw new Error(`${envKey} is not configured.`);
  }

  return priceId;
}

export function getPlayerGuidePriceId(): string {
  const priceId = process.env.STRIPE_PRICE_PLAYER_GUIDE?.trim();
  if (!priceId) {
    throw new Error("STRIPE_PRICE_PLAYER_GUIDE is not configured.");
  }
  return priceId;
}

/** Optional configured price; when unset, checkout uses inline $1 price_data. */
export function getWarMapPriceId(): string | null {
  return process.env.STRIPE_PRICE_WAR_MAP?.trim() || null;
}

export function getLaunchMonthlyCouponId(): string | null {
  return process.env.STRIPE_COUPON_LAUNCH_MONTHLY?.trim() ?? null;
}

function getKnownPriceIds(): Partial<Record<CourtsidePlan, string>> {
  return {
    monthly: process.env.STRIPE_PRICE_MONTHLY?.trim(),
    annual: process.env.STRIPE_PRICE_ANNUAL?.trim(),
    launch_annual: process.env.STRIPE_PRICE_LAUNCH_ANNUAL?.trim(),
    lifetime: process.env.STRIPE_PRICE_LIFETIME?.trim(),
  };
}

export function resolveCourtsidePlan(
  priceId: string | null | undefined,
): CourtsidePlan | null {
  if (!priceId) return null;

  const known = getKnownPriceIds();
  for (const [plan, id] of Object.entries(known) as Array<
    [CourtsidePlan, string | undefined]
  >) {
    if (id && id === priceId) {
      return plan;
    }
  }

  if (priceId === process.env.STRIPE_PRICE_MONTHLY?.trim()) {
    return "monthly";
  }

  return null;
}

async function hasLifetimeAccess(customerId: string): Promise<boolean> {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    return false;
  }

  return customer.metadata?.courtside_lifetime === "true";
}

export async function grantLifetimeAccess(customerId: string): Promise<void> {
  const stripe = getStripe();
  await stripe.customers.update(customerId, {
    metadata: {
      courtside_lifetime: "true",
      courtside_plan: "lifetime",
      product: "courtside",
    },
  });
}

export async function getCourtsideMembership(
  customerId: string,
): Promise<CourtsideMembership> {
  if (await hasLifetimeAccess(customerId)) {
    return {
      active: true,
      plan: "lifetime",
      status: "lifetime",
      currentPeriodEnd: null,
    };
  }

  const stripe = getStripe();
  const subscriptions = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 10,
    expand: ["data.items.data.price"],
  });

  const subscription = subscriptions.data.find((item) =>
    ACTIVE_STATUSES.has(item.status),
  );

  if (!subscription) {
    return {
      active: false,
      plan: null,
      status: null,
      currentPeriodEnd: null,
    };
  }

  const price = subscription.items.data[0]?.price;
  const priceId = typeof price === "string" ? price : price?.id;
  const currentPeriodEnd = subscription.items.data[0]?.current_period_end ?? null;
  const plan = resolveCourtsidePlan(priceId);

  const metadataPlan = subscription.metadata?.plan;
  const resolvedPlan =
    metadataPlan === "launch_monthly"
      ? "launch_monthly"
      : metadataPlan === "launch_annual"
        ? "launch_annual"
        : plan;

  return {
    active: true,
    plan: resolvedPlan,
    status: subscription.status,
    currentPeriodEnd,
  };
}
