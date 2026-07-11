"use client";

import type { ReactNode } from "react";
import { useMembership } from "@/lib/membership";

/**
 * Renders `children` only for Courtside members, otherwise `fallback`.
 * Server components can pass pre-rendered nodes into both slots.
 */
export function MemberGate({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  const { isMember } = useMembership();
  return <>{isMember ? children : fallback}</>;
}
