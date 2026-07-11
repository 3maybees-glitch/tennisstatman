"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, RotateCcw } from "lucide-react";
import {
  ALL_SKILL_ORDER,
  EXTENDED_SKILL_ORDER,
  SKILL_LABELS,
  CORE_SKILL_ORDER,
  type SkillKey,
} from "@/lib/data/grades";
import { currentPulse, players } from "@/lib/data/players";

type Weights = Record<SkillKey, number> & { pulse: number };

const DEFAULT_WEIGHTS: Weights = {
  serve: 50,
  forehand: 50,
  backhand: 50,
  netPlay: 50,
  movement: 50,
  return: 50,
  clutch: 50,
  consistency: 50,
  defense: 50,
  power: 50,
  pulse: 50,
};

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function StatLab() {
  const [weights, setWeights] = useState<Weights>(DEFAULT_WEIGHTS);

  const ranked = useMemo(() => {
    const total =
      ALL_SKILL_ORDER.reduce((s, k) => s + weights[k], 0) + weights.pulse;
    const safe = total === 0 ? 1 : total;
    return players
      .map((p) => {
        const skillPart = ALL_SKILL_ORDER.reduce(
          (s, k) => s + weights[k] * p.skills[k],
          0,
        );
        const pulsePart = weights.pulse * currentPulse(p);
        const rating = Math.round(((skillPart + pulsePart) / safe) * 10) / 10;
        return { player: p, rating };
      })
      .sort((a, b) => b.rating - a.rating);
  }, [weights]);

  function exportRows() {
    return ranked.map((r, i) => ({
      rank: i + 1,
      name: r.player.name,
      tour: r.player.tour,
      country: r.player.country,
      customRating: r.rating,
      pulse: currentPulse(r.player),
      ...r.player.skills,
    }));
  }

  function downloadCsv() {
    const rows = exportRows();
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        headers.map((h) => (row as Record<string, unknown>)[h]).join(","),
      ),
    ].join("\n");
    download("tennisstatman-custom-ratings.csv", csv, "text/csv");
  }

  function downloadJson() {
    download(
      "tennisstatman-custom-ratings.json",
      JSON.stringify({ weights, ranked: exportRows() }, null, 2),
      "application/json",
    );
  }

  const sliders: { key: keyof Weights; label: string; group?: string }[] = [
    ...CORE_SKILL_ORDER.map((k) => ({
      key: k as keyof Weights,
      label: SKILL_LABELS[k],
      group: "Core skills",
    })),
    ...EXTENDED_SKILL_ORDER.map((k) => ({
      key: k as keyof Weights,
      label: SKILL_LABELS[k],
      group: "Courtside deep dive",
    })),
    { key: "pulse", label: "Current PULSE (form)", group: "Form" },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      {/* Controls */}
      <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Weight the game</h3>
          <button
            type="button"
            onClick={() => setWeights(DEFAULT_WEIGHTS)}
            className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground"
          >
            <RotateCcw size={13} /> Reset
          </button>
        </div>
        <p className="mt-1 text-xs text-muted">
          Drag to decide what matters. The board re-ranks instantly.
        </p>

        <div className="mt-5 space-y-4">
          {sliders.map(({ key, label, group }, i) => {
            const showGroup =
              group &&
              (i === 0 || sliders[i - 1]?.group !== group);
            return (
              <div key={key}>
                {showGroup && (
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold-light">
                    {group}
                  </p>
                )}
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>{label}</span>
                    <span className="font-mono text-gold-light">
                      {weights[key]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={weights[key]}
                    onChange={(e) =>
                      setWeights((w) => ({
                        ...w,
                        [key]: Number(e.target.value),
                      }))
                    }
                    className="mt-1.5 w-full accent-[#d4af37]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={downloadCsv}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gold py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            <Download size={15} /> Download CSV
          </button>
          <button
            type="button"
            onClick={downloadJson}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
          >
            <Download size={15} /> Download JSON
          </button>
        </div>
      </div>

      {/* Custom leaderboard */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
        <div className="border-b border-white/5 px-6 py-4">
          <h3 className="font-semibold">Your custom leaderboard</h3>
          <p className="text-sm text-muted">
            Ranked by your weighting — {ranked.length} players
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted">
                <th className="px-6 py-3 font-medium">#</th>
                <th className="px-6 py-3 font-medium">Player</th>
                <th className="px-6 py-3 font-medium">Tour</th>
                <th className="px-6 py-3 font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map((r, i) => (
                <tr
                  key={r.player.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-3 font-mono text-gold">{i + 1}</td>
                  <td className="px-6 py-3">
                    <Link
                      href={`/players/${r.player.id}`}
                      className="font-medium hover:text-gold-light"
                    >
                      {r.player.name}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-sm text-muted">
                    {r.player.tour}
                  </td>
                  <td className="px-6 py-3 font-mono font-semibold text-gold-light">
                    {r.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
