"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SkillRadar } from "./SkillRadar";
import { UpgradeCTA } from "./UpgradeCTA";
import {
  SKILL_LABELS,
  SKILL_ORDER,
  overallScore,
  type SkillGrades,
} from "@/lib/data/grades";
import { legends, type Legend } from "@/lib/data/legends";
import { players, type Player } from "@/lib/data/players";

const FREE_COMPARISONS = 3;

function similarity(a: SkillGrades, b: SkillGrades): number {
  const diffs = SKILL_ORDER.map((k) => Math.abs(a[k] - b[k]));
  const avg = diffs.reduce((s, d) => s + d, 0) / diffs.length;
  return Math.max(0, Math.round(100 - avg * 1.8));
}

export function LegendCompare() {
  const searchParams = useSearchParams();
  const initialPlayer =
    players.find((p) => p.id === searchParams.get("player")) ?? players[0];

  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [legend, setLegend] = useState<Legend>(
    () =>
      legends.find((l) => l.id === initialPlayer.legendMatch.legendId) ??
      legends[0],
  );
  const [comparisons, setComparisons] = useState(0);
  const locked = comparisons >= FREE_COMPARISONS;

  const sim = useMemo(
    () => similarity(player.skills, legend.skills),
    [player, legend],
  );

  const tourColor = player.tour === "ATP" ? "#40916c" : "#8b5cf6";
  const playerOverall = overallScore(player.skills);

  const curveData = legend.careerCurve.map((point) => ({
    age: point.age,
    [legend.name]: point.level,
  }));

  function select<T>(setter: (v: T) => void, value: T) {
    if (locked) return;
    setComparisons((c) => c + 1);
    setter(value);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Pickers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Today&apos;s player
          </h3>
          <div className="flex flex-wrap gap-2">
            {players.map((p) => (
              <button
                key={p.id}
                type="button"
                disabled={locked}
                onClick={() => select(setPlayer, p)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors disabled:opacity-40 ${
                  player.id === p.id
                    ? "bg-court text-white"
                    : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            The legend
          </h3>
          <div className="flex flex-wrap gap-2">
            {legends.map((l) => (
              <button
                key={l.id}
                type="button"
                disabled={locked}
                onClick={() => select(setLegend, l)}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors disabled:opacity-40 ${
                  legend.id === l.id
                    ? "bg-gold text-navy"
                    : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {!locked && (
        <p className="mt-4 text-xs text-muted">
          Free plan: {Math.max(0, FREE_COMPARISONS - comparisons)} comparison
          changes left today. Courtside members compare without limits.
        </p>
      )}

      {locked && (
        <div className="mt-8">
          <UpgradeCTA
            title="You've used today's free comparisons"
            description="Courtside members get unlimited legend comparisons, any-player-vs-any-player matchups, and era-adjusted deep dives."
          />
        </div>
      )}

      {/* Verdict banner */}
      <div className="mt-10 rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/10 to-transparent p-6 text-center md:p-8">
        <p className="text-sm uppercase tracking-wider text-muted">
          Legend Similarity Score
        </p>
        <p className="mt-2 text-5xl font-bold text-gold-light">{sim}%</p>
        <p className="mt-3 text-lg">
          <span style={{ color: tourColor }} className="font-semibold">
            {player.name}
          </span>{" "}
          plays {sim >= 80 ? "remarkably" : sim >= 65 ? "noticeably" : "somewhat"}{" "}
          like{" "}
          <span className="font-semibold text-gold-light">{legend.name}</span>
        </p>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
          {legend.signature} · {legend.slams} Grand Slams · {legend.weeksAtNo1}{" "}
          weeks at No. 1
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {/* Radar overlay */}
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h3 className="font-semibold">Skill overlay</h3>
          <SkillRadar
            series={[
              { name: player.name, skills: player.skills, color: tourColor },
              { name: legend.name, skills: legend.skills, color: "#d4af37" },
            ]}
            height={300}
            showLegend
          />
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {SKILL_ORDER.map((key) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-muted">{SKILL_LABELS[key]}</span>
                <span className="font-mono">
                  <span style={{ color: tourColor }}>{player.skills[key]}</span>
                  <span className="mx-1 text-muted">/</span>
                  <span className="text-gold-light">{legend.skills[key]}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Career trajectory */}
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h3 className="font-semibold">Career trajectory</h3>
          <p className="mt-1 text-xs text-muted">
            {legend.name}&apos;s peak-adjusted level by age — the dot marks
            where {player.name.split(" ").pop()} stands right now at age{" "}
            {player.age}.
          </p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={curveData} margin={{ top: 10, right: 20, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="age"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  tick={{ fill: "#ffffff", fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  label={{
                    value: "Age",
                    position: "insideBottomRight",
                    fill: "#ffffff",
                    fontSize: 11,
                  }}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fill: "#ffffff", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null;
                    return (
                      <div className="rounded-lg border border-white/10 bg-navy-light px-3 py-2 text-sm shadow-xl">
                        <p className="text-xs text-muted">Age {label}</p>
                        <p className="text-gold-light">
                          {legend.name}: {payload[0].value}
                        </p>
                      </div>
                    );
                  }}
                />
                <Line
                  type="monotone"
                  dataKey={legend.name}
                  stroke="#d4af37"
                  strokeWidth={2.5}
                  dot={false}
                />
                <ReferenceDot
                  x={player.age}
                  y={playerOverall}
                  r={7}
                  fill={tourColor}
                  stroke="#e8edf5"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-3 text-sm text-muted">
            {trajectoryVerdict(player, legend, playerOverall)}
          </p>
        </div>
      </div>
    </section>
  );
}

function trajectoryVerdict(
  player: Player,
  legend: Legend,
  playerOverall: number,
): string {
  const atAge = legend.careerCurve.find((p) => p.age === player.age);
  if (!atAge) {
    return `${legend.name}'s recorded career doesn't cover age ${player.age}, so ${player.name.split(" ").pop()} is charting new territory.`;
  }
  const delta = playerOverall - atAge.level;
  const last = player.name.split(" ").pop();
  if (delta >= 3)
    return `At age ${player.age}, ${last} grades ${delta} points ABOVE where ${legend.name} was at the same age. Historic pace.`;
  if (delta <= -3)
    return `At age ${player.age}, ${last} trails ${legend.name}'s same-age level by ${Math.abs(delta)} points — but legends' curves bend late all the time.`;
  return `At age ${player.age}, ${last} is within ${Math.abs(delta)} points of ${legend.name}'s same-age level. Right on the legend track.`;
}
