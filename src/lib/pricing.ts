import type { CourtsidePlan } from "@/lib/stripe";

export const LAUNCH_ACTIVE = true;

export type PlanOption = {
  id: CourtsidePlan;
  label: string;
  price: string;
  period: string;
  compareAt?: string;
  badge?: string;
  highlight?: boolean;
  subtext?: string;
};

export const launchPlans: PlanOption[] = [
  {
    id: "launch_annual",
    label: "Launch Annual",
    price: "$39",
    period: "/ year",
    compareAt: "$59/yr",
    badge: "Best value",
    highlight: true,
    subtext: "Lock in launch pricing for a full year.",
  },
  {
    id: "launch_monthly",
    label: "Launch Monthly",
    price: "$1.99",
    period: "first month",
    compareAt: "$6.99/mo",
    subtext: "Then $6.99/mo. Cancel anytime.",
  },
  {
    id: "lifetime",
    label: "Lifetime",
    price: "$149",
    period: "once",
    compareAt: "$199",
    badge: "Early bird",
    subtext: "Pay once. Courtside forever.",
  },
];

export const regularPlans: PlanOption[] = [
  {
    id: "annual",
    label: "Annual",
    price: "$59",
    period: "/ year",
    badge: "Best value",
    highlight: true,
    subtext: "Save vs monthly billing.",
  },
  {
    id: "monthly",
    label: "Monthly",
    price: "$6.99",
    period: "/ month",
    subtext: "Cancel anytime.",
  },
];

export function getActivePlans(): PlanOption[] {
  return LAUNCH_ACTIVE ? launchPlans : regularPlans;
}

export function formatPlanLabel(plan: CourtsidePlan | null): string {
  switch (plan) {
    case "launch_annual":
      return "Launch Annual";
    case "launch_monthly":
      return "Launch Monthly";
    case "lifetime":
      return "Lifetime";
    case "annual":
      return "Annual";
    case "monthly":
      return "Monthly";
    default:
      return "Courtside";
  }
}

export function getPlan(id: CourtsidePlan): PlanOption {
  const plan = [...launchPlans, ...regularPlans].find((item) => item.id === id);
  if (!plan) {
    throw new Error(`Unknown Courtside plan: ${id}`);
  }
  return plan;
}

/** Schema.org price, taken from the display string in this file. */
export function planAmount(plan: PlanOption): string {
  return plan.price.replace(/[^0-9.]/g, "");
}

/** Short offer line used on the pricing page, FAQ, and meta description. */
export function launchOfferSentence(): string {
  const annual = getPlan("launch_annual");
  const monthly = getPlan("launch_monthly");
  const lifetime = getPlan("lifetime");
  const regularMonthly = getPlan("monthly");
  const regularAnnual = getPlan("annual");
  return `Launch offer: ${annual.price}/year, ${monthly.price} first month, or ${lifetime.price} lifetime early bird. Regular pricing moves to ${regularMonthly.price}/mo and ${regularAnnual.price}/yr after launch.`;
}

export function courtsideMembershipAnswer(): string {
  const features =
    "unlimited legend comparisons, full PULSE history archives, PULSE alerts, skill category leaderboards, matchup projections, and ITF-level scouting reports";

  if (LAUNCH_ACTIVE) {
    const annual = getPlan("launch_annual");
    const monthly = getPlan("launch_monthly");
    const lifetime = getPlan("lifetime");
    return `Courtside is TennisStatMan's premium tier. Launch pricing is live: ${annual.price}/year (regular ${annual.compareAt}), ${monthly.price} for the first month then ${monthly.compareAt}, or ${lifetime.price} lifetime (regular ${lifetime.compareAt}). It is for fans who want ${features}.`;
  }

  const monthly = getPlan("monthly");
  const annual = getPlan("annual");
  return `Courtside is TennisStatMan's premium tier (${monthly.price}/month or ${annual.price}/year) for fans who want ${features}.`;
}

export function courtsideBillingAnswer(): string {
  if (LAUNCH_ACTIVE) {
    return `Yes. Launch pricing is live, and Courtside checkout is billed through Stripe. ${launchOfferSentence()}`;
  }

  const monthly = getPlan("monthly");
  const annual = getPlan("annual");
  return `Yes. Courtside billing is live at ${monthly.price}/month or ${annual.price}/year. Checkout is billed through Stripe.`;
}

export function pricingPageDescription(): string {
  if (LAUNCH_ACTIVE) {
    return `TennisStatMan is free for every fan. ${launchOfferSentence()} Courtside unlocks unlimited comparisons, PULSE archives, alerts, and ITF-level scouting.`;
  }

  const monthly = getPlan("monthly");
  const annual = getPlan("annual");
  return `TennisStatMan is free for every fan. Courtside is ${monthly.price}/month or ${annual.price}/year and unlocks unlimited comparisons, PULSE archives, alerts, and ITF-level scouting.`;
}

export function planOfferDescription(plan: PlanOption): string {
  const parts = [
    plan.subtext,
    plan.compareAt ? `Regular price ${plan.compareAt}.` : null,
  ].filter((part): part is string => Boolean(part));
  return parts.join(" ");
}
