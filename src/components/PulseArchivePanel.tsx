"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Archive } from "lucide-react";
import { fullPulseArchive } from "@/lib/data/pulse-archive";
import type { Player } from "@/lib/data/players";

export function PulseArchivePanel({ player }: { player: Player }) {
  const data = fullPulseArchive(player);
  const peak = Math.max(...data.map((d) => d.pulse));
  const low = Math.min(...data.map((d) => d.pulse));

  return (
    <div className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
      <h3 className="flex items-center gap-2 font-semibold text-gold-light">
        <Archive size={16} /> Full PULSE archive · {data.length} months
      </h3>
      <p className="mt-1 text-xs text-muted">
        Courtside member view — the complete back-history, not just the last
        year. Peak {peak} · Low {low}.
      </p>
      <div className="mt-4">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="archiveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#40916c" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#40916c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#8b9cb8", fontSize: 10 }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
              interval={5}
            />
            <YAxis
              domain={[40, 100]}
              tick={{ fill: "#8b9cb8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="rounded-lg border border-white/10 bg-navy-light px-3 py-2 text-sm shadow-xl">
                    <div className="text-xs text-muted">{label}</div>
                    PULSE:{" "}
                    <span className="font-mono text-gold-light">
                      {payload[0].value}
                    </span>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="pulse"
              stroke="#40916c"
              strokeWidth={2.5}
              fill="url(#archiveGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
