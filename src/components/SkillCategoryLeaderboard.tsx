"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { gradeColor } from "@/lib/data/grades";
import type { SkillLeaderboardEntry } from "@/lib/data/skill-leaderboards";

type Props = {
  label: string;
  entries: SkillLeaderboardEntry[];
  tour: "ATP" | "WTA";
};

const TOUR_ACCENT: Record<"ATP" | "WTA", string> = {
  ATP: "#40916c",
  WTA: "#8b5cf6",
};

export function SkillCategoryLeaderboard({ label, entries, tour }: Props) {
  const chartData = [...entries].reverse();

  return (
    <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
      <h3 className="font-semibold">{label}</h3>
      <p className="mt-1 text-xs text-muted">Top 10 on tour by skill grade</p>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 4, right: 16, left: 4, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              horizontal={false}
            />
            <XAxis
              type="number"
              domain={[55, 100]}
              tick={{ fill: "#ffffff", fontSize: 11 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={88}
              tick={{ fill: "#ffffff", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.04)" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const entry = payload[0].payload as SkillLeaderboardEntry;
                return (
                  <div className="rounded-lg border border-white/10 bg-navy-light px-4 py-3 shadow-xl">
                    <p className="font-semibold">{entry.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      #{entry.rank} on tour · {entry.score} ({entry.grade})
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={18}>
              {chartData.map((entry) => (
                <Cell key={entry.id} fill={gradeColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-muted">
              <th className="pb-2 pr-4">#</th>
              <th className="pb-2 pr-4">Player</th>
              <th className="pb-2 pr-4 text-right">Rank</th>
              <th className="pb-2 pr-4 text-right">Score</th>
              <th className="pb-2 text-right">Grade</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, i) => (
              <tr
                key={entry.id}
                className="border-b border-white/5 last:border-0"
              >
                <td className="py-2 pr-4 font-mono text-muted">{i + 1}</td>
                <td className="py-2 pr-4">
                  <Link
                    href={`/players/${entry.id}`}
                    className="font-medium hover:text-gold-light"
                    style={{ color: i === 0 ? TOUR_ACCENT[tour] : undefined }}
                  >
                    {entry.name}
                  </Link>
                </td>
                <td className="py-2 pr-4 text-right font-mono text-muted">
                  #{entry.rank}
                </td>
                <td className="py-2 pr-4 text-right font-mono">{entry.score}</td>
                <td className="py-2 text-right">
                  <span
                    className="rounded px-1.5 py-0.5 font-mono text-xs font-bold"
                    style={{
                      color: gradeColor(entry.score),
                      backgroundColor: `${gradeColor(entry.score)}22`,
                    }}
                  >
                    {entry.grade}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
