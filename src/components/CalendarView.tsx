"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  SURFACE_COLORS,
  SURFACE_LABELS,
  TIER_COLORS,
  tournaments,
  type Surface,
  type Tier,
  type Tournament,
} from "@/lib/data/tournaments";
import { MapPin } from "lucide-react";

const TIER_GROUPS: { label: string; tiers: Tier[] }[] = [
  { label: "Grand Slams", tiers: ["Grand Slam"] },
  { label: "1000s", tiers: ["Masters 1000", "WTA 1000"] },
  { label: "500s", tiers: ["ATP 500", "WTA 500"] },
  { label: "250s", tiers: ["ATP 250", "WTA 250"] },
  { label: "Challengers", tiers: ["Challenger"] },
  { label: "ITF", tiers: ["ITF"] },
];

const SURFACES: Surface[] = ["hard", "clay", "grass", "indoor"];

function formatRange(t: Tournament): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const start = new Date(t.start + "T00:00:00").toLocaleDateString("en-US", opts);
  const end = new Date(t.end + "T00:00:00").toLocaleDateString("en-US", opts);
  return `${start} – ${end}`;
}

export function CalendarView() {
  const [activeGroups, setActiveGroups] = useState<Set<string>>(
    () => new Set(TIER_GROUPS.map((g) => g.label)),
  );
  const [surface, setSurface] = useState<Surface | "all">("all");

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

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Filters */}
      <div className="mb-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-muted">Level:</span>
          {TIER_GROUPS.map((group) => {
            const active = activeGroups.has(group.label);
            const color = TIER_COLORS[group.tiers[0]];
            return (
              <button
                key={group.label}
                type="button"
                onClick={() => toggleGroup(group.label)}
                className={`rounded-lg border px-3 py-1.5 text-sm transition-all ${
                  active ? "" : "opacity-40"
                }`}
                style={{
                  borderColor: `${color}66`,
                  backgroundColor: active ? `${color}22` : "transparent",
                  color: active ? color : "#8b9cb8",
                }}
              >
                {group.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-muted">Surface:</span>
          <button
            type="button"
            onClick={() => setSurface("all")}
            className={`rounded-lg px-3 py-1.5 text-sm ${
              surface === "all"
                ? "bg-white/10 text-foreground"
                : "text-muted hover:text-foreground"
            }`}
          >
            All
          </button>
          {SURFACES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSurface(s)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                surface === s ? "" : "opacity-50 hover:opacity-80"
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
      {[...byMonth.entries()].map(([month, events]) => (
        <div key={month} className="mb-10">
          <h2 className="mb-4 text-xl font-bold text-gold-light">{month}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((t) => (
              <article
                key={t.id}
                className="rounded-2xl border border-white/10 bg-navy-light p-5 transition-colors hover:border-white/20"
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className="rounded px-2 py-0.5 text-[11px] font-bold"
                    style={{
                      backgroundColor: `${TIER_COLORS[t.tier]}22`,
                      color: TIER_COLORS[t.tier],
                    }}
                  >
                    {t.tier}
                  </span>
                  <span
                    className="rounded px-2 py-0.5 text-[11px] font-medium"
                    style={{
                      backgroundColor: `${SURFACE_COLORS[t.surface]}22`,
                      color: SURFACE_COLORS[t.surface],
                    }}
                  >
                    {SURFACE_LABELS[t.surface]}
                  </span>
                </div>
                <h3 className="mt-3 font-semibold leading-snug">{t.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={13} />
                  {t.city}, {t.country}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <span>{formatRange(t)}</span>
                  <span className="font-mono">
                    {t.tour} · {t.drawSize} draw · {t.prizeMoney}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}

      {visible.length === 0 && (
        <p className="py-20 text-center text-muted">
          No events match those filters. Even the ITF takes a week off sometimes.
        </p>
      )}

      <div className="mt-4 rounded-2xl border border-white/10 bg-navy-light/50 p-6 text-center">
        <p className="text-sm text-muted">
          Want to see all of these on a globe instead?{" "}
          <Link href="/map" className="text-gold hover:text-gold-light">
            Open the World Map →
          </Link>
        </p>
      </div>
    </section>
  );
}
