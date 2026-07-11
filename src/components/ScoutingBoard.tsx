"use client";

import { useMemo, useState } from "react";
import { Radar, Sparkles } from "lucide-react";
import { PulseSpark } from "./PulseSpark";
import { prospects, type ProTier } from "@/lib/data/challenger";
import { letterGrade, overallScore } from "@/lib/data/grades";

type TourFilter = "All" | "ATP" | "WTA";
type TierFilter = "All" | ProTier;

export function ScoutingBoard() {
  const [tour, setTour] = useState<TourFilter>("All");
  const [tier, setTier] = useState<TierFilter>("All");

  const filtered = useMemo(
    () =>
      prospects
        .filter((p) => (tour === "All" ? true : p.tour === tour))
        .filter((p) => (tier === "All" ? true : p.tier === tier))
        .sort(
          (a, b) =>
            b.pulseHistory[b.pulseHistory.length - 1] -
            a.pulseHistory[a.pulseHistory.length - 1],
        ),
    [tour, tier],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <FilterGroup
          value={tour}
          onChange={setTour}
          options={["All", "ATP", "WTA"]}
        />
        <FilterGroup
          value={tier}
          onChange={setTier}
          options={["All", "Challenger", "ITF"]}
        />
        <span className="ml-auto text-sm text-muted">
          {filtered.length} prospect{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {filtered.map((p) => {
          const overall = overallScore(p.skills);
          const pulse = p.pulseHistory[p.pulseHistory.length - 1];
          return (
            <div
              key={p.id}
              className="rounded-2xl border border-white/10 bg-navy-light p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        p.tier === "Challenger"
                          ? "bg-court/20 text-court-light"
                          : "bg-white/10 text-muted"
                      }`}
                    >
                      {p.tier}
                    </span>
                    <span className="text-xs text-muted">
                      {p.tour} · {p.country} · Age {p.age}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-bold">{p.name}</h3>
                  <p className="text-xs text-gold-light">{p.playstyle}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-2xl font-bold text-gold-light">
                    {pulse}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted">
                    PULSE
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-muted">
                  Overall{" "}
                  <span className="font-semibold text-foreground">
                    {overall}
                  </span>{" "}
                  <span className="text-gold-light">
                    ({letterGrade(overall)})
                  </span>
                </span>
                <PulseSpark history={p.pulseHistory} width={110} height={30} />
              </div>

              <div className="mt-4 flex items-start gap-2 rounded-xl border border-gold/20 bg-gold/5 p-3">
                <Sparkles size={15} className="mt-0.5 shrink-0 text-gold" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  {p.scouting}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted">{p.watchLine}</p>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-navy-light p-10 text-muted">
          <Radar size={18} /> No prospects match those filters.
        </div>
      )}
    </div>
  );
}

function FilterGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: T[];
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-white/10 bg-navy-light p-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            value === opt
              ? "bg-court text-white"
              : "text-muted hover:text-foreground"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
