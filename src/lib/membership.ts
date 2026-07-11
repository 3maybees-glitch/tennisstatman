"use client";

import { useCallback, useEffect, useState } from "react";
import type { CourtsidePlan } from "@/lib/stripe";

type MembershipState = {
  isMember: boolean;
  loading: boolean;
  plan: CourtsidePlan | null;
  status: string | null;
  currentPeriodEnd: number | null;
};

const initialState: MembershipState = {
  isMember: false,
  loading: true,
  plan: null,
  status: null,
  currentPeriodEnd: null,
};

export function useMembership() {
  const [state, setState] = useState<MembershipState>(initialState);

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true }));

    try {
      const response = await fetch("/api/membership/status", {
        cache: "no-store",
      });
      const data = (await response.json()) as {
        active?: boolean;
        plan?: CourtsidePlan | null;
        status?: string | null;
        currentPeriodEnd?: number | null;
      };

      setState({
        isMember: Boolean(data.active),
        loading: false,
        plan: data.plan ?? null,
        status: data.status ?? null,
        currentPeriodEnd: data.currentPeriodEnd ?? null,
      });
    } catch {
      setState((current) => ({ ...current, loading: false }));
    }
  }, []);

  const openPortal = useCallback(async () => {
    const response = await fetch("/api/stripe/portal", { method: "POST" });
    const data = (await response.json()) as { url?: string; error?: string };

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    throw new Error(data.error ?? "Unable to open billing portal.");
  }, []);

  useEffect(() => {
    void refresh();

    const handleFocus = () => {
      void refresh();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refresh]);

  return { ...state, refresh, openPortal };
}
