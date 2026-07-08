"use client";

import { useMemo, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { currentPulse, players, pulseTrend } from "@/lib/data/players";
import { overallScore } from "@/lib/data/grades";

type TourFilter = "All" | "ATP" | "WTA";
type SortKey = "rank" | "pulse" | "overall" | "trend";

const SORT_LABELS: Record<SortKey, string> = {
  rank: "Ranking",
  pulse: "PULSE",
  overall: "Overall grade",
  trend: "Hottest trend",
};

export function PlayersGrid() {
  const [tour, setTour] = useState<TourFilter>("All");
  const [sort, setSort] = useState<SortKey>("rank");

  const visible = useMemo(() => {
    const filtered = players.filter((p) => tour === "All" || p.tour === tour);
    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "pulse":
          return currentPulse(b) - currentPulse(a);
        case "overall":
          return overallScore(b.skills) - overallScore(a.skills);
        case "trend":
          return pulseTrend(b) - pulseTrend(a);
        default:
          return a.rank - b.rank;
      }
    });
  }, [tour, sort]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(["All", "ATP", "WTA"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTour(t)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                tour === t
                  ? "bg-court text-white"
                  : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Sort by</span>
          {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSort(key)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                sort === key
                  ? "bg-gold/15 text-gold-light"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {SORT_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </section>
  );
}
