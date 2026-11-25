"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CreditCard, Download, Loader2, Mail, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useMembership } from "@/lib/membership";
import { formatPlanLabel } from "@/lib/pricing";

type AccountStatus = {
  signedIn: boolean;
  courtside: { active: boolean };
  guide: { purchased: boolean; edition: string | null };
};

const ACCOUNT_ERRORS: Record<string, string> = {
  "missing-token": "That sign-in link is incomplete.",
  "invalid-token": "That sign-in link expired or is invalid. Request a new one.",
  "no-purchase": "We could not find an active Courtside or Player Guide purchase for that email.",
  "verify-failed": "Sign-in failed. Try again.",
};

export function AccountPanel() {
  const searchParams = useSearchParams();
  const signedInBanner = searchParams.get("signed-in") === "1";
  const routeError = ACCOUNT_ERRORS[searchParams.get("error") ?? ""] ?? null;

  const { isMember, loading, plan, openPortal } = useMembership();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<AccountStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [portalWorking, setPortalWorking] = useState(false);
  const [error, setError] = useState<string | null>(routeError);

  const loadStatus = useCallback(async () => {
    const response = await fetch("/api/account/status", { cache: "no-store" });
    const data = (await response.json()) as AccountStatus;
    setStatus(data);
    setStatusLoading(false);
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus, signedInBanner]);

  async function handleMagicLink(event: React.FormEvent) {
    event.preventDefault();
    setWorking(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/account/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send sign-in link.");
      }

      setMessage(
        data.message ??
          "If we find a purchase for that email, we sent a sign-in link.",
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to send sign-in link.",
      );
    } finally {
      setWorking(false);
    }
  }

  async function handlePortal() {
    setPortalWorking(true);
    setError(null);
    try {
      await openPortal();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to open billing portal.",
      );
      setPortalWorking(false);
    }
  }

  const guidePurchased = status?.guide.purchased ?? false;
  const cookieSignedIn = status?.signedIn ?? false;

  return (
    <div className="space-y-8">
      {signedInBanner ? (
        <div className="rounded-2xl border border-court/40 bg-court/10 px-5 py-4 text-sm text-court-light">
          You&apos;re signed in on this browser. Courtside and guide downloads
          should work here.
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {message ? (
        <div className="rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-gold-light">
          {message}
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/10 bg-navy-light p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Mail size={20} className="text-gold" />
          Sign in on a new device
        </h2>
        <p className="mt-3 text-sm text-muted">
          Courtside still uses an httpOnly cookie after checkout. Enter the email
          from your Stripe receipt and we&apos;ll email a one-time magic link when
          email delivery is configured.
        </p>
        <form onSubmit={handleMagicLink} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none ring-gold/30 focus:ring-2"
          />
          <button
            type="submit"
            disabled={working}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:opacity-70"
          >
            {working ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              "Email me a sign-in link"
            )}
          </button>
        </form>
        <p className="mt-3 text-xs text-muted">
          Without RESEND_API_KEY and ACCOUNT_EMAIL_FROM, this form explains that
          email sign-in is off — use the same browser you paid with.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-navy-light p-8">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Sparkles size={20} className="text-gold" />
          Your access on this browser
        </h2>
        {statusLoading || loading ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-muted">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </p>
        ) : (
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              Cookie:{" "}
              <span className="text-foreground">
                {cookieSignedIn ? "Stripe customer linked" : "No customer cookie"}
              </span>
            </li>
            <li>
              Courtside:{" "}
              <span className="text-foreground">
                {isMember
                  ? `Active · ${formatPlanLabel(plan)}`
                  : "Not active on this device"}
              </span>
            </li>
            <li>
              Player Guide:{" "}
              <span className="text-foreground">
                {guidePurchased ? "Purchased — re-download below" : "Not on this account"}
              </span>
            </li>
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {isMember ? (
            <Link
              href="/courtside"
              className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-light"
            >
              Open Courtside
            </Link>
          ) : (
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              Get Courtside
            </Link>
          )}

          {isMember && plan !== "lifetime" ? (
            <button
              type="button"
              onClick={handlePortal}
              disabled={portalWorking}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold hover:bg-white/10 disabled:opacity-70"
            >
              {portalWorking ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Opening…
                </>
              ) : (
                <>
                  <CreditCard size={16} /> Manage billing
                </>
              )}
            </button>
          ) : null}
        </div>
      </section>

      {guidePurchased ? (
        <section className="rounded-2xl border border-white/10 bg-navy-light p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <Download size={20} className="text-gold" />
            Player Guide download
          </h2>
          <p className="mt-3 text-sm text-muted">
            Your purchase is stored on your Stripe customer record. Sign in on this
            device, then download again — no 24-hour checkout token required.
          </p>
          <a
            href="/api/account/guide-download"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-court px-5 py-3 text-sm font-semibold text-white hover:bg-court-light"
          >
            <Download size={16} /> Download Summer 2026 Player Guide (PDF)
          </a>
        </section>
      ) : null}
    </div>
  );
}