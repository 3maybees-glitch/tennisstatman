"use client";

import { useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";
import {
  SURFACE_COLORS,
  SURFACE_LABELS,
  TIER_COLORS,
  TIER_GROUPS,
  tournaments,
  type Surface,
  type Tournament,
} from "@/lib/data/tournaments";
import { SeasonTimeline } from "@/components/SeasonTimeline";
import { MapPin, Trophy } from "lucide-react";

const SURFACES: Surface[] = ["hard", "clay", "grass", "indoor"];

function formatRange(t: Tournament): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const start = new Date(t.start + "T00:00:00").toLocaleDateString("en-US", opts);
  const end = new Date(t.end + "T00:00:00").toLocaleDateString("en-US", opts);
  return `${start} – ${end}`;
}

/** Per-month surface mix, used to paint the month header ribbons. */
function surfaceMix(events: Tournament[]): { surface: Surface; share: number }[] {
  const counts = new Map<Surface, number>();
  for (const t of events) counts.set(t.surface, (counts.get(t.surface) ?? 0) + 1);
  return SURFACES.filter((s) => counts.has(s)).map((s) => ({
    surface: s,
    share: (counts.get(s)! / events.length) * 100,
  }));
}

export function CalendarView() {
  const [activeGroups, setActiveGroups] = useState<Set<string>>(
    () => new Set(TIER_GROUPS.map((g) => g.label)),
  );
  const [surface, setSurface] = useState<Surface | "all">("all");
  const [flashId, setFlashId] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = useMemo(() => {
    const allowedTiers = new Set(
      TIER_GROUPS.filter((g) => activeGroups.has(g.label)).flatMap(
        (g) => g.tiers,
      ),
    );
    return [...tournaments]
      .filter(
        (t) =>
          allowedTiers.has(t.tier) &&
          (surface === "all" || t.surface === surface),
      )
      .sort((a, b) => a.start.localeCompare(b.start));
  }, [activeGroups, surface]);

  const byMonth = useMemo(() => {
    const map = new Map<string, Tournament[]>();
    for (const t of visible) {
      const month = new Date(t.start + "T00:00:00").toLocaleString("en-US", {
        month: "long",
      });
      if (!map.has(month)) map.set(month, []);
      map.get(month)!.push(t);
    }
    return map;
  }, [visible]);

  function toggleGroup(label: string) {
    setActiveGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  function jumpTo(t: Tournament) {
    // Widen the filters synchronously so the target card exists in the DOM,
    // then scroll to it.
    flushSync(() => {
      const group = TIER_GROUPS.find((g) => g.tiers.includes(t.tier));
      if (group && !activeGroups.has(group.label)) {
        setActiveGroups((prev) => new Set(prev).add(group.label));
      }
      if (surface !== "all" && surface !== t.surface) setSurface("all");
      setFlashId(t.id);
    });
    document
      .getElementById(`event-${t.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashId(null), 1600);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Season timeline */}
      <div className="mb-10">
        <SeasonTimeline surface={surface} onSelect={jumpTo} />
      </div>

      {/* Filters */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-base font-medium text-white">Level:</span>
          {TIER_GROUPS.map((group) => {
            const active = activeGroups.has(group.label);
            const color = TIER_COLORS[group.tiers[0]];
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={`rounded-lg border px-3 py-1.5 text-base transition-all ${
                  active ? "" : "opacity-40"
                }`}
                style={{
                  borderColor: `${color}66`,
                  backgroundColor: active ? `${color}22` : "transparent",
                  color: active ? color : "#ffffff",
                }}
              >
                {group.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-base font-medium text-white">Surface:</span>
          <button
            type="button"
            onClick={() => setSurface("all")}
            className={`rounded-lg px-3 py-1.5 text-base ${
              surface === "all"
                ? "bg-white/10 text-white"
                : "text-foreground/70 hover:text-white"
            }`}
          >
            All
          </button>
          {SURFACES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSurface(s)}
              className={`rounded-lg px-3 py-1.5 text-base transition-all ${
                surface === s ? "" : "opacity-60 hover:opacity-90"
              }`}
              style={{
                backgroundColor: surface === s ? `${SURFACE_COLORS[s]}33` : "transparent",
                color: SURFACE_COLORS[s],
              }}
            >
              {SURFACE_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Month sections */}
      {[...byMonth.entries()].map(([month, events]) => {
        const mix = surfaceMix(events);
        return (
          <div key={month} className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gold-light">{month}</h2>
              <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
                {mix.map(({ surface: s, share }) => (
                  <div
                    key={s}
                    title={`${SURFACE_LABELS[s]}: ${Math.round(share)}%`}
                    style={{
                      width: `${share}%`,
                      backgroundColor: SURFACE_COLORS[s],
                      opacity: 0.75,
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-sm text-white">
                {events.length} {events.length === 1 ? "event" : "events"}
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {events.map((t) => {
                const color = SURFACE_COLORS[t.surface];
                const isSlam = t.tier === "Grand Slam";
                const flashing = flashId === t.id;
                return (
                  <article
                    key={t.id}
                    id={`event-${t.id}`}
                    className="relative overflow-hidden rounded-2xl border bg-navy-light p-5 transition-all hover:-translate-y-0.5"
                    style={{
                      borderColor: flashing
                        ? "#f0c75e"
                        : isSlam
                          ? "#f0c75e55"
                          : `${color}33`,
                      boxShadow: flashing
                        ? "0 0 24px rgba(240, 199, 94, 0.45)"
                        : isSlam
                          ? "0 0 24px rgba(240, 199, 94, 0.12)"
                          : undefined,
                      background: `linear-gradient(160deg, ${color}14 0%, var(--navy-light) 45%)`,
                    }}
                  >
                    <div
                      className="absolute inset-x-0 top-0 h-1"
                      style={{
                        background: `linear-gradient(90deg, ${color}, ${color}00)`,
                      }}
                    />
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className="rounded px-2 py-0.5 text-xs font-bold"
                        style={{
                          backgroundColor: `${TIER_COLORS[t.tier]}22`,
                          color: TIER_COLORS[t.tier],
                        }}
                      >
                        {t.tier}
                      </span>
                      <span
                        className="rounded px-2 py-0.5 text-xs font-semibold"
                        style={{
                          backgroundColor: `${color}22`,
                          color,
                        }}
                      >
                        {SURFACE_LABELS[t.surface]}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-snug text-white">
                      {t.name}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-base text-white/90">
                      <MapPin size={15} style={{ color }} />
                      {t.city}, {t.country}
                    </p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="font-medium text-white">
                        {formatRange(t)}
                      </span>
                      <span className="font-mono text-white/90">
                        {t.tour} · {t.drawSize} draw · {t.prizeMoney}
                      </span>
                    </div>
                    {t.lastFinals.length > 0 && (
                      <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
                        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-light">
                          <Trophy size={13} className="text-gold" />
                          Reigning champion
                          {t.lastFinals.length > 1 ? "s" : ""} ·{" "}
                          {t.lastFinals[0].year}
                        </p>
                        {t.lastFinals.map((f) => (
                          <p
                            key={f.tour}
                            className="text-sm leading-snug text-white"
                          >
                            {t.lastFinals.length > 1 && (
                              <span className="mr-1.5 font-mono text-xs text-white/80">
                                {f.tour}
                              </span>
                            )}
                            <span className="font-semibold text-gold-light">
                              {f.champion}
                            </span>{" "}
                            <span className="text-white/80">def.</span>{" "}
                            {f.runnerUp}{" "}
                            <span className="font-mono text-white/90">
                              {f.score}
                            </span>
                          </p>
                        ))}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        );
      })}

      {visible.length === 0 && (
        <p className="py-20 text-center text-muted">
          No events match those filters. Even the ITF takes a week off sometimes.
        </p>
      )}

      <div className="mt-4 rounded-2xl border border-white/10 bg-navy-light/50 p-6 text-center">
        <p className="text-base text-foreground/80">
          Want to see all of these on a globe instead?{" "}
          <Link href="/map" className="text-gold hover:text-gold-light">
            Open the World Map →
          </Link>
        </p>
      </div>
    </section>
  );
}
