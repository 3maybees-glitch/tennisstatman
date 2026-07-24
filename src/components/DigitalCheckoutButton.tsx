"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { DigitalProductId } from "@/lib/guides/digital-products";

export function DigitalCheckoutButton({
  product,
  label,
  className = "",
}: {
  product: DigitalProductId;
  label: string;
  className?: string;
}) {
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setWorking(true);
    setError(null);

    try {
      const response = await fetch("/api/guides/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Unable to start Stripe checkout.");
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start Stripe checkout.",
      );
      setWorking(false);
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => void handleCheckout()}
        disabled={working}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-70"
      >
        {working && <Loader2 size={16} className="animate-spin" />}
        {working ? "Redirecting to Stripe…" : label}
      </button>
      {error ? <p className="mt-3 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
