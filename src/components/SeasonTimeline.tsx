"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  SEASON_SWINGS,
  SURFACE_COLORS,
  SURFACE_LABELS,
  TIER_COLORS,
  TIER_GROUPS,
  tournaments,
  type Surface,
  type Tournament,
} from "@/lib/data/tournaments";

const SEASON_START = Date.UTC(2026, 0, 1);
const SEASON_END = Date.UTC(2026, 11, 1);
const SEASON_SPAN = SEASON_END - SEASON_START;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
];

function pct(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  const t = Date.UTC(y, m - 1, d);
  return Math.min(100, Math.max(0, ((t - SEASON_START) / SEASON_SPAN) * 100));
}

const DAY_MS = 86_400_000;

function subscribeNever() {
  return () => {};
}

/** Snapped to whole days so the snapshot stays stable across renders. */
function getTodayPct(): number | null {
  const today = Math.floor(Date.now() / DAY_MS) * DAY_MS;
  if (today < SEASON_START || today > SEASON_END) return null;
  return ((today - SEASON_START) / SEASON_SPAN) * 100;
}

function formatRange(t: Tournament): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const start = new Date(t.start + "T00:00:00").toLocaleDateString("en-US", opts);
  const end = new Date(t.end + "T00:00:00").toLocaleDateString("en-US", opts);
  return `${start} – ${end}`;
}

export function SeasonTimeline({
  surface,
  onSelect,
}: {
  surface: Surface | "all";
  onSelect?: (t: Tournament) => void;
}) {
  const [hovered, setHovered] = useState<Tournament | null>(null);
  // Server snapshot is null so SSR and hydration markup match.
  const todayPct = useSyncExternalStore(subscribeNever, getTodayPct, () => null);

  const rows = useMemo(
    () =>
      TIER_GROUPS.map((group) => ({
        ...group,
        events: tournaments
          .filter((t) => group.tiers.includes(t.tier))
          .sort((a, b) => a.start.localeCompare(b.start)),
      })),
    [],
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light/60 p-5">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-bold text-white">
          Season at a glance{" "}
          <span className="gradient-text">— follow the surfaces</span>
        </h2>
        <span className="text-sm text-foreground/80">
          Hover a bar for details · click to jump to it
        </span>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="min-w-[760px]">
          {/* Month ruler */}
          <div className="relative ml-28 mb-1 flex text-xs font-mono font-semibold uppercase tracking-wider text-foreground">
            {MONTHS.map((m) => (
              <span
                key={m}
                className="border-l border-white/10 pl-1.5"
                style={{ width: `${100 / MONTHS.length}%` }}
              >
                {m}
              </span>
            ))}
          </div>

          {/* Surface swing ribbon */}
          <div className="relative ml-28 mb-3 flex h-7 overflow-hidden rounded-md">
            {SEASON_SWINGS.map((swing) => {
              const left = pct(swing.from);
              const width = pct(swing.to) - left;
              const color = SURFACE_COLORS[swing.surface];
              return (
                <div
                  key={swing.label}
                  className="flex h-full items-center justify-center overflow-hidden whitespace-nowrap text-xs font-bold"
                  style={{
                    width: `${width}%`,
                    background: `linear-gradient(180deg, ${color}55, ${color}22)`,
                    color,
                  }}
                  title={`${swing.label} (${SURFACE_LABELS[swing.surface]})`}
                >
                  {swing.label}
                </div>
              );
            })}
          </div>

          {/* Tier rows */}
          <div className="space-y-1.5">
            {rows.map((row) => {
              const rowColor = TIER_COLORS[row.tiers[0]];
              return (
                <div key={row.label} className="flex items-center">
                  <span
                    className="w-28 shrink-0 pr-3 text-right text-sm font-semibold"
                    style={{ color: rowColor }}
                  >
                    {row.label}
                  </span>
                  <div className="relative h-7 flex-1 rounded-md bg-white/[0.03]">
                    {todayPct !== null && (
                      <div
                        className="absolute inset-y-0 w-px bg-gold-light/70"
                        style={{ left: `${todayPct}%` }}
                      />
                    )}
                    {row.events.map((t) => {
                      const left = pct(t.start);
                      const width = Math.max(pct(t.end) - left, 1.6);
                      const color = SURFACE_COLORS[t.surface];
                      const active = surface === "all" || t.surface === surface;
                      const isSlam = t.tier === "Grand Slam";
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onMouseEnter={() => setHovered(t)}
                          onMouseLeave={() =>
                            setHovered((h) => (h?.id === t.id ? null : h))
                          }
                          onFocus={() => setHovered(t)}
                          onBlur={() =>
                            setHovered((h) => (h?.id === t.id ? null : h))
                          }
                          onClick={() => onSelect?.(t)}
                          aria-label={`${t.name}, ${formatRange(t)}`}
                          className="absolute inset-y-0.5 rounded-[5px] transition-all hover:z-10 hover:scale-y-110"
                          style={{
                            left: `${left}%`,
                            width: `${width}%`,
                            background: `linear-gradient(180deg, ${color}, ${color}99)`,
                            opacity: active ? 1 : 0.18,
                            boxShadow: isSlam
                              ? `0 0 12px ${color}aa, inset 0 0 0 1px #f0c75e`
                              : hovered?.id === t.id
                                ? `0 0 10px ${color}88`
                                : "none",
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hover detail strip */}
      <div className="mt-4 flex min-h-12 items-center rounded-xl bg-white/[0.03] px-4 py-2 text-base">
        {hovered ? (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className="rounded px-2 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: `${TIER_COLORS[hovered.tier]}22`,
                color: TIER_COLORS[hovered.tier],
              }}
            >
              {hovered.tier}
            </span>
            <span className="font-semibold text-white">{hovered.name}</span>
            <span className="text-white/90">
              {hovered.city}, {hovered.country}
            </span>
            <span className="font-mono text-sm text-white">
              {formatRange(hovered)}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: SURFACE_COLORS[hovered.surface] }}
            >
              {SURFACE_LABELS[hovered.surface]}
            </span>
            <span className="font-mono text-sm text-gold-light">
              {hovered.prizeMoney}
            </span>
          </div>
        ) : (
          <span className="text-sm text-foreground/80">
            The tour never stops — hard courts in the sun, a spring of clay, two
            months of grass, then back to hard until the indoor finish.
          </span>
        )}
      </div>
    </div>
  );
}
