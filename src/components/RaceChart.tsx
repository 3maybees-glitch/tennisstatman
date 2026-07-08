"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { RACE_CHECKPOINTS, atpRace, wtaRace } from "@/lib/data/race";

const QUALIFY_CUT = 8;

export function RaceChart() {
  const [tour, setTour] = useState<"ATP" | "WTA">("ATP");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const entries = tour === "ATP" ? atpRace : wtaRace;
  const maxStep = RACE_CHECKPOINTS.length - 1;

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setStep((s) => {
        if (s >= maxStep) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1100);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing, maxStep]);

  const standings = useMemo(
    () =>
      [...entries]
        .map((e) => ({ ...e, current: e.points[step] }))
        .sort((a, b) => b.current - a.current),
    [entries, step],
  );

  const maxPoints = Math.max(...entries.map((e) => e.points[maxStep]));

  return (
    <section className="mx-auto max-w-5xl px-6 py-12">
      {/* Controls */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {(["ATP", "WTA"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setTour(t);
                setStep(0);
                setPlaying(false);
              }}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                tour === t
                  ? "bg-court text-white"
                  : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
              }`}
            >
              {t} Race
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            if (step >= maxStep) setStep(0);
            setPlaying((p) => !p);
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2 text-sm font-semibold text-navy hover:bg-gold-light"
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          {playing ? "Pause" : step >= maxStep ? "Replay season" : "Play season"}
        </button>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setPlaying(false);
          }}
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {/* Timeline slider */}
      <div className="mb-8">
        <input
          type="range"
          min={0}
          max={maxStep}
          value={step}
          onChange={(e) => {
            setPlaying(false);
            setStep(Number(e.target.value));
          }}
          className="w-full accent-[#d4af37]"
          aria-label="Season checkpoint"
        />
        <p className="mt-2 text-center font-mono text-sm text-gold-light">
          {RACE_CHECKPOINTS[step]}
        </p>
      </div>

      {/* The race */}
      <div className="space-y-3">
        {standings.map((entry, position) => {
          const width = (entry.current / maxPoints) * 100;
          const qualified = position < QUALIFY_CUT;
          return (
            <motion.div
              key={entry.playerId}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="flex items-center gap-3"
            >
              <span
                className={`w-6 text-right font-mono text-sm ${
                  position === 0 ? "text-gold-light" : "text-muted"
                }`}
              >
                {position + 1}
              </span>
              <div className="relative h-11 flex-1 overflow-hidden rounded-xl border border-white/5 bg-navy-light">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-xl"
                  style={{ backgroundColor: `${entry.color}44`, borderRight: `3px solid ${entry.color}` }}
                  animate={{ width: `${Math.max(width, 8)}%` }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
                <div className="relative flex h-full items-center justify-between px-4">
                  <Link
                    href={`/players/${entry.playerId}`}
                    className="text-sm font-semibold hover:text-gold-light"
                  >
                    {entry.name}
                    <span className="ml-2 text-xs text-muted">{entry.country}</span>
                  </Link>
                  <span className="font-mono text-sm text-gold-light">
                    {entry.current.toLocaleString()}
                  </span>
                </div>
              </div>
              <span
                className={`w-14 text-xs ${
                  qualified ? "text-court-light" : "text-muted/50"
                }`}
              >
                {qualified ? "Finals ✓" : ""}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Top {QUALIFY_CUT} qualify for the{" "}
        {tour === "ATP" ? "Nitto ATP Finals in Turin" : "WTA Finals in Riyadh"}.
        Points shown are season race points at each checkpoint.
      </p>
    </section>
  );
}
