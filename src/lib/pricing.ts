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
