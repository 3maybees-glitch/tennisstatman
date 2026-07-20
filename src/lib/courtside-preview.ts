import type { CourtsideMembership } from "@/lib/stripe";

export function isCourtsidePreviewEnabled(): boolean {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.COURTSIDE_PREVIEW?.trim() === "true"
  );
}

export function getCourtsidePreviewMembership(): CourtsideMembership & {
  preview: true;
} {
  return {
    active: true,
    plan: "launch_annual",
    status: null,
    currentPeriodEnd: null,
    preview: true,
  };
}
