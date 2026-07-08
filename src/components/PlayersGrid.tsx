"use client";

import { useMemo, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import { currentPulse, pulseTrend, type Player } from "@/lib/data/players";
import { overallScore } from "@/lib/data/grades";
import { Search } from "lucide-react";

type TourFilter = "All" | "ATP" | "WTA";
type SortKey = "rank" | "pulse" | "overall" | "trend";

const SORT_LABELS: Record<SortKey, string> = {
  rank: "Ranking",
  pulse: "PULSE",
  overall: "Overall grade",
  trend: "Hottest trend",
};

const PAGE_SIZE = 24;

export function PlayersGrid({ players }: { players: Player[] }) {
  const [tour, setTour] = useState<TourFilter>("All");
  const [sort, setSort] = useState<SortKey>("rank");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = players.filter(
      (p) =>
        (tour === "All" || p.tour === tour) &&
        (q === "" ||
          p.name.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          p.countryName.toLowerCase().includes(q)),
    );
    return [...list].sort((a, b) => {
      switch (sort) {
        case "pulse":
          return currentPulse(b) - currentPulse(a);
        case "overall":
          return overallScore(b.skills) - overallScore(a.skills);
        case "trend":
          return pulseTrend(b) - pulseTrend(a);
        default:
          return a.rank - b.rank || (a.tour === "ATP" ? -1 : 1);
      }
    });
  }, [players, tour, sort, query]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {(["All", "ATP", "WTA"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTour(t);
                  setVisibleCount(PAGE_SIZE);
                }}
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
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              placeholder="Search name or country…"
              className="w-56 rounded-xl border border-white/10 bg-navy-light py-2 pl-9 pr-3 text-sm placeholder:text-muted/60 focus:border-gold/40 focus:outline-none"
            />
          </div>
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

      <p className="mb-6 text-sm text-muted">
        {filtered.length} players
        {query.trim() !== "" && ` matching "${query.trim()}"`}
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((player) => (
          <PlayerCard key={`${player.tour}-${player.id}`} player={player} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-20 text-center text-muted">
          Nobody matches that search. Even Stat Man came up empty.
        </p>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-xl border border-white/10 bg-navy-light px-6 py-3 text-sm font-semibold transition-colors hover:border-gold/40 hover:text-gold-light"
          >
            Show more ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
}
