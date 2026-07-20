"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Bell,
  CreditCard,
  Eye,
  Loader2,
  Radar,
  SlidersHorizontal,
  Sparkles,
  Swords,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CourtsideSkillLeaderboards } from "./CourtsideSkillLeaderboards";
import { useMembership } from "@/lib/membership";
import { useWatchlist } from "@/lib/watchlist";
import { players } from "@/lib/data/players";
import { pulseSpikes } from "@/lib/data/pulse-archive";
import { formatPlanLabel } from "@/lib/pricing";
import type { Player } from "@/lib/data/players";

const features = [
  {
    href: "/matchups",
    icon: Swords,
    title: "Matchup Projections",
    desc: "Simulate any player vs any player with win probability and edge breakdown.",
  },
  {
    href: "/stats/lab",
    icon: SlidersHorizontal,
    title: "Stat Lab",
    desc: "Build a custom rating, re-rank the tour, and download the data.",
  },
  {
    href: "/scouting",
    icon: Radar,
    title: "Deep Scouting",
    desc: "AI scouting reports and PULSE for Challenger & ITF prospects.",
  },
  {
    href: "/legends",
    icon: Sparkles,
    title: "Unlimited Legend Compares",
    desc: "Compare any player to any legend — no daily cap.",
  },
  {
    href: "/stats/pulse",
    icon: Bell,
    title: "PULSE Alerts & Archives",
    desc: "Spike alerts, your watchlist, and full historical archives.",
  },
  {
    href: "/picks",
    icon: Trophy,
    title: "Picks Room",
    desc: "Graded pick history and the season leaderboard.",
  },
];

function formatRenewalDate(timestamp: number | null) {
  if (!timestamp) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp * 1000));
}

export function CourtsideHub({ roster }: { roster: Player[] }) {
  const searchParams = useSearchParams();
  const { isMember, loading, isPreview, plan, currentPeriodEnd, refresh, openPortal } =
    useMembership();
  const { ids } = useWatchlist();
  const spikeCount = pulseSpikes(players).length;
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscribed = searchParams.get("subscribed") === "1";
  const renewalDate = formatRenewalDate(currentPeriodEnd);
  const isLifetime = plan === "lifetime";

  useEffect(() => {
    if (subscribed) {
      void refresh();
    }
  }, [refresh, subscribed]);

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
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-navy-light p-10 text-muted">
        <Loader2 size={18} className="animate-spin" />
        Checking Courtside membership…
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-navy-light to-navy-light p-10 text-center">
        <Sparkles className="mx-auto text-gold" size={32} />
        <h2 className="mt-4 text-2xl font-bold">Courtside is locked</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Subscribe to Courtside to open skill leaderboards, extended player deep
          dives, matchup projections, the Stat Lab, deep scouting, PULSE alerts,
          and the graded picks room.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          <Sparkles size={16} /> Go to pricing
        </Link>
      </div>
    );
  }

  return (
    <div>
      {isPreview ? (
        <div className="mb-6 rounded-2xl border border-gold/30 bg-gold/10 px-5 py-4 text-sm text-gold-light">
          Local preview mode is on. Courtside is unlocked without billing.
        </div>
      ) : subscribed ? (
        <div className="mb-6 rounded-2xl border border-court/40 bg-court/10 px-5 py-4 text-sm text-court-light">
          Courtside is live. Your subscription is active on this browser.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard icon={Eye} label="Watchlist" value={`${ids.length}`} />
        <StatCard icon={Bell} label="PULSE spikes" value={`${spikeCount}`} />
        <StatCard
          icon={Sparkles}
          label="Membership"
          value={formatPlanLabel(plan)}
        />
      </div>

      <CourtsideSkillLeaderboards roster={roster} />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <Link
            key={f.href}
            href={f.href}
            className="group rounded-2xl border border-white/10 bg-navy-light p-6 transition-colors hover:border-gold/30 hover:bg-navy-light/70"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gold/15 p-2.5 text-gold">
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold group-hover:text-gold-light">
                {f.title}
              </h3>
            </div>
            <p className="mt-3 text-sm text-muted">{f.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy-light p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">
            {isLifetime ? "Courtside lifetime access" : "Courtside subscription"}
          </p>
          <p className="text-sm text-muted">
            {isPreview
              ? "Preview mode — billing is disabled in local development."
              : isLifetime
              ? "You have lifetime Courtside access on this browser."
              : renewalDate
                ? `Renews on ${renewalDate}.`
                : "Manage your plan, payment method, or cancellation in Stripe."}
          </p>
          {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
        </div>
        {!isLifetime && !isPreview ? (
          <button
            type="button"
            onClick={handleManageBilling}
            disabled={working}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white/10 disabled:opacity-70"
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
        ) : null}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-navy-light p-5">
      <div className="rounded-xl bg-gold/15 p-2.5 text-gold">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
