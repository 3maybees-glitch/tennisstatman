"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, CreditCard, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useMembership } from "@/lib/membership";
import {
  formatPlanLabel,
  getActivePlans,
  LAUNCH_ACTIVE,
} from "@/lib/pricing";
import type { CourtsidePlan } from "@/lib/stripe";

export function CourtsideCheckout() {
  const searchParams = useSearchParams();
  const { isMember, loading, plan, refresh, openPortal } = useMembership();
  const plans = getActivePlans();
  const [selectedPlan, setSelectedPlan] = useState<CourtsidePlan>(
    plans.find((item) => item.highlight)?.id ?? plans[0].id,
  );
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canceled = searchParams.get("canceled") === "1";
  const isLifetime = plan === "lifetime";

  useEffect(() => {
    if (searchParams.get("subscribed") === "1") {
      void refresh();
    }
  }, [refresh, searchParams]);

  async function handleCheckout() {
    setWorking(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan }),
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

  async function handleManageBilling() {
    setWorking(true);
    setError(null);

    try {
      await openPortal();
    } catch (portalError) {
      setError(
        portalError instanceof Error
          ? portalError.message
          : "Unable to open billing portal.",
      );
      setWorking(false);
    }
  }

  if (loading) {
    return (
      <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-muted">
        <Loader2 size={16} className="animate-spin" />
        Checking Courtside status…
      </div>
    );
  }

  if (isMember) {
    return (
      <div className="mt-8 space-y-3">
        <div className="flex items-center justify-center gap-2 rounded-xl border border-court/40 bg-court/10 py-3 text-center font-semibold text-court-light">
          <Check size={18} /> Courtside active · {formatPlanLabel(plan)}
        </div>
        <Link
          href="/courtside"
          className="block rounded-xl bg-gold py-3 text-center font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          Open your Courtside
        </Link>
        {!isLifetime ? (
          <button
            type="button"
            onClick={handleManageBilling}
            disabled={working}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-white/10 disabled:opacity-70"
          >
            {working ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Opening billing…
              </>
            ) : (
              <>
                <CreditCard size={16} /> Manage billing
              </>
            )}
          </button>
        ) : (
          <p className="text-center text-xs text-muted">
            Lifetime access is active on this browser. No renewal needed.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      {LAUNCH_ACTIVE ? (
        <div className="mb-4 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-center text-sm text-gold-light">
          Launch pricing is live. Annual is the best deal.
        </div>
      ) : null}

      <div className="space-y-3">
        {plans.map((option) => {
          const selected = selectedPlan === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSelectedPlan(option.id)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                selected
                  ? "border-gold bg-gold/15"
                  : "border-white/10 bg-white/5 hover:border-gold/30"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{option.label}</p>
                    {option.badge ? (
                      <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-navy">
                        {option.badge}
                      </span>
                    ) : null}
                  </div>
                  {option.subtext ? (
                    <p className="mt-1 text-xs text-muted">{option.subtext}</p>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gold-light">
                    {option.price}
                    <span className="text-xs font-normal text-muted">
                      {option.period}
                    </span>
                  </p>
                  {option.compareAt ? (
                    <p className="text-xs text-muted line-through">
                      {option.compareAt}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleCheckout}
        disabled={working}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-3 text-center font-semibold text-navy transition-colors hover:bg-gold-light disabled:opacity-70"
      >
        {working ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Redirecting to Stripe…
          </>
        ) : (
          <>
            <Sparkles size={16} /> Get Courtside
          </>
        )}
      </button>

      {canceled ? (
        <p className="mt-2 text-center text-xs text-muted">
          Checkout canceled. Pick a plan when you&apos;re ready.
        </p>
      ) : null}

      {error ? (
        <p className="mt-2 text-center text-xs text-red-300">{error}</p>
      ) : (
        <p className="mt-2 text-center text-xs text-muted">
          Secure checkout powered by Stripe.
          {selectedPlan === "lifetime"
            ? " One-time payment, lifetime access."
            : " Cancel anytime from your billing portal."}
        </p>
      )}
    </div>
  );
}
