"use client";

import { useCallback, useEffect, useState } from "react";
import type { CourtsidePlan } from "@/lib/stripe";

type MembershipState = {
  isMember: boolean;
  loading: boolean;
  isPreview: boolean;
  plan: CourtsidePlan | null;
  status: string | null;
  currentPeriodEnd: number | null;
};

const initialState: MembershipState = {
  isMember: false,
  loading: true,
  isPreview: false,
  plan: null,
  status: null,
  currentPeriodEnd: null,
};

export function useMembership() {
  const [state, setState] = useState<MembershipState>(initialState);

  const loadStatus = useCallback(async () => {
    const response = await fetch("/api/membership/status", {
      cache: "no-store",
    });
    const data = (await response.json()) as {
      active?: boolean;
      preview?: boolean;
      plan?: CourtsidePlan | null;
      status?: string | null;
      currentPeriodEnd?: number | null;
    };

    return {
      isMember: Boolean(data.active),
      loading: false,
      isPreview: Boolean(data.preview),
      plan: data.plan ?? null,
      status: data.status ?? null,
      currentPeriodEnd: data.currentPeriodEnd ?? null,
    } satisfies MembershipState;
  }, []);

  const refresh = useCallback(async () => {
    setState((current) => ({ ...current, loading: true }));

    try {
      setState(await loadStatus());
    } catch {
      setState((current) => ({ ...current, loading: false }));
    }
  }, [loadStatus]);

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
    let active = true;

    void loadStatus()
      .then((next) => {
        if (active) setState(next);
      })
      .catch(() => {
        if (active) setState((current) => ({ ...current, loading: false }));
      });

    const handleFocus = () => {
      void refresh();
    };

    window.addEventListener("focus", handleFocus);
    return () => {
      active = false;
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadStatus, refresh]);

  return { ...state, refresh, openPortal };
}
