"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Check, Sparkles, Trophy, X } from "lucide-react";
import { weeklyPicks } from "@/lib/data/picks";
import {
  gradedWeeks,
  seasonLeaderboard,
  statManRecord,
  type LeaderboardEntry,
} from "@/lib/data/picks-history";

const STORAGE_KEY = "tsm-picks-v1";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}
function getSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}
function getServerSnapshot(): string {
  return "";
}

export function PicksCourtside() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const picks = useMemo<Record<string, "A" | "B">>(() => {
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }, [raw]);

  const lockedCount = Object.keys(picks).length;
  const agreeCount = weeklyPicks.filter(
    (m) => picks[m.id] && picks[m.id] === m.statManPick,
  ).length;

  const record = statManRecord();

  const board: LeaderboardEntry[] = useMemo(() => {
    const you: LeaderboardEntry = {
      handle: "You",
      wins: agreeCount,
      losses: Math.max(0, lockedCount - agreeCount),
      streak: lockedCount > 0 ? `${lockedCount} locked` : "—",
      you: true,
    };
    const statMan: LeaderboardEntry = {
      handle: "Stat Man (model)",
      wins: record.pct,
      losses: 100 - record.pct,
      streak: `${record.pct}%`,
    };
    return [...seasonLeaderboard, statMan, you].sort(
      (a, b) =>
        b.wins / Math.max(1, b.wins + b.losses) -
        a.wins / Math.max(1, a.wins + a.losses),
    );
  }, [agreeCount, lockedCount, record.pct]);

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-gold" />
        <h2 className="text-lg font-semibold text-gold-light">
          Courtside picks room
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gold/25 bg-gold/5 p-6 text-center">
          <p className="text-xs uppercase tracking-wider text-muted">
            Stat Man&apos;s model — season
          </p>
          <p className="mt-2 font-mono text-4xl font-bold text-gold-light">
            {record.pct}%
          </p>
          <p className="mt-1 text-sm text-muted">
            {record.wins} of {record.total} graded picks correct
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6 text-center">
          <p className="text-xs uppercase tracking-wider text-muted">
            Your card this week
          </p>
          <p className="mt-2 font-mono text-4xl font-bold">
            {lockedCount}/{weeklyPicks.length}
          </p>
          <p className="mt-1 text-sm text-muted">
            {lockedCount === 0
              ? "No picks locked yet"
              : `Aligned with the model on ${agreeCount}`}
          </p>
        </div>
      </div>

      {/* Graded history */}
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
        <h3 className="font-semibold">Graded history</h3>
        <p className="text-sm text-muted">
          How the model fared once the results were in.
        </p>
        <div className="mt-4 space-y-5">
          {gradedWeeks.map((week) => (
            <div key={week.week}>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
                {week.week}
              </p>
              <ul className="mt-2 space-y-1.5">
                {week.picks.map((p) => {
                  const correct = p.statManPick === p.winner;
                  const winnerName =
                    p.winner === "A" ? p.playerA : p.playerB;
                  return (
                    <li
                      key={p.id}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-white/[0.02]"
                    >
                      <span className="text-muted">
                        {p.playerA} <span className="opacity-50">vs</span>{" "}
                        {p.playerB}
                      </span>
                      <span className="flex items-center gap-2">
                        <span className="text-foreground/90">
                          def. by {winnerName}
                        </span>
                        {correct ? (
                          <span className="flex items-center gap-1 text-court-light">
                            <Check size={14} /> model
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400">
                            <X size={14} /> miss
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Season leaderboard */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
        <div className="flex items-center gap-2 border-b border-white/5 px-6 py-4">
          <Trophy size={16} className="text-gold" />
          <h3 className="font-semibold">Season leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Player</th>
                <th className="px-6 py-3 font-medium">W–L</th>
                <th className="px-6 py-3 font-medium">Win %</th>
                <th className="px-6 py-3 font-medium">Form</th>
              </tr>
            </thead>
            <tbody>
              {board.map((entry, i) => {
                const total = entry.wins + entry.losses;
                const pct = total ? Math.round((entry.wins / total) * 100) : 0;
                return (
                  <tr
                    key={entry.handle}
                    className={`border-b border-white/5 last:border-0 ${
                      entry.you ? "bg-gold/10" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <td className="px-6 py-3 font-mono text-gold">{i + 1}</td>
                    <td className="px-6 py-3 font-medium">
                      {entry.you ? (
                        <span className="text-gold-light">{entry.handle}</span>
                      ) : (
                        entry.handle
                      )}
                    </td>
                    <td className="px-6 py-3 text-sm text-muted">
                      {entry.wins}–{entry.losses}
                    </td>
                    <td className="px-6 py-3 font-mono text-sm text-gold-light">
                      {pct}%
                    </td>
                    <td className="px-6 py-3 text-sm text-muted">
                      {entry.streak}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="border-t border-white/5 px-6 py-3 text-xs text-muted">
          Standings are a preview — your row updates as you lock picks each week.
        </p>
      </div>
    </div>
  );
}
