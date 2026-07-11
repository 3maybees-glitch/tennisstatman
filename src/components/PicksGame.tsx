"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { MemberGate } from "./MemberGate";
import { PicksCourtside } from "./PicksCourtside";
import { StatManMascot } from "./StatManMascot";
import { weeklyPicks, type PickMatch } from "@/lib/data/picks";
import { CheckCircle2 } from "lucide-react";

const STORAGE_KEY = "tsm-picks-v1";

type Picks = Record<string, "A" | "B">;

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): string {
  return localStorage.getItem(STORAGE_KEY) ?? "";
}

function getServerSnapshot(): string {
  return "";
}

export function PicksGame() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const picks = useMemo<Picks>(() => {
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }, [raw]);

  function lockPick(matchId: string, side: "A" | "B") {
    if (picks[matchId]) return; // picks are final
    const next = { ...picks, [matchId]: side };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    for (const notify of listeners) notify();
  }

  const pickedCount = Object.keys(picks).length;
  const agreeCount = weeklyPicks.filter(
    (m) => picks[m.id] && picks[m.id] === m.statManPick,
  ).length;

  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8 rounded-2xl border border-white/10 bg-navy-light p-5 text-center">
        <p className="text-sm text-muted">
          {pickedCount === 0
            ? "Lock in your picks — Stat Man reveals his lean after each one."
            : pickedCount < weeklyPicks.length
              ? `${pickedCount}/${weeklyPicks.length} picks locked`
              : `All picks locked. You agreed with Stat Man on ${agreeCount} of ${weeklyPicks.length}.`}
        </p>
      </div>

      <div className="space-y-6">
        {weeklyPicks.map((match) => (
          <PickCard
            key={match.id}
            match={match}
            picked={picks[match.id]}
            onPick={(side) => lockPick(match.id, side)}
          />
        ))}
      </div>

      <MemberGate
        fallback={
          <div className="mt-10 rounded-2xl border border-gold/25 bg-gold/5 p-6 text-center">
            <p className="text-sm text-muted">
              Courtside members get graded pick history, PULSE-powered win
              probabilities on every pick, and a season-long leaderboard.{" "}
              <Link href="/pricing" className="text-gold hover:text-gold-light">
                Go Courtside →
              </Link>
            </p>
          </div>
        }
      >
        <PicksCourtside />
      </MemberGate>
    </section>
  );
}

function PickCard({
  match,
  picked,
  onPick,
}: {
  match: PickMatch;
  picked?: "A" | "B";
  onPick: (side: "A" | "B") => void;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-navy-light p-6">
      <p className="text-xs uppercase tracking-wider text-muted">
        {match.tour} · {match.tournament} · {match.round}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {(["A", "B"] as const).map((side) => {
          const p = side === "A" ? match.playerA : match.playerB;
          const isPicked = picked === side;
          return (
            <button
              key={side}
              type="button"
              disabled={!!picked}
              onClick={() => onPick(side)}
              className={`rounded-xl border p-4 text-left transition-all ${
                isPicked
                  ? "border-gold bg-gold/10"
                  : picked
                    ? "border-white/5 bg-navy opacity-50"
                    : "border-white/10 bg-navy hover:border-court/60 hover:bg-court/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{p.name}</span>
                {isPicked && <CheckCircle2 size={18} className="text-gold" />}
              </div>
              <p className="mt-1 text-xs text-muted">
                {p.country} · PULSE{" "}
                <span className="font-mono text-gold-light">{p.pulse}</span>
              </p>
            </button>
          );
        })}
      </div>

      {picked && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/5 bg-navy p-4">
          <StatManMascot size={44} mood="thinking" className="shrink-0" />
          <div>
            <p className="text-xs font-semibold text-gold-light">
              Stat Man picked:{" "}
              {match.statManPick === "A"
                ? match.playerA.name
                : match.playerB.name}
              {picked === match.statManPick ? " — same as you!" : " — bold move going the other way."}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              {match.statManReason}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
