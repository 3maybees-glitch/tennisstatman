"use client";

import { GUIDE_PRICE_LABEL } from "@/lib/data/guides/summer-2026";
import { DigitalCheckoutButton } from "@/components/DigitalCheckoutButton";

export function GuideCheckoutButton({
  className = "",
  label = `Buy the guide · ${GUIDE_PRICE_LABEL}`,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <DigitalCheckoutButton
      product="player_guide"
      label={label}
      className={className}
    />
  );
}
