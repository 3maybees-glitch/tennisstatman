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

export function PulseHistoryChart({
  history,
  height = 220,
}: {
  history: number[];
  height?: number;
}) {
  const data = history.map((pulse, i) => ({
    month: `M${i + 1}`,
    pulse,
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="pulseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0c75e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#f0c75e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis
          dataKey="month"
          tick={{ fill: "#8b9cb8", fontSize: 11 }}
          axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
          tickLine={false}
        />
        <YAxis
          domain={[40, 100]}
          tick={{ fill: "#8b9cb8", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            return (
              <div className="rounded-lg border border-white/10 bg-navy-light px-3 py-2 text-sm shadow-xl">
                PULSE: <span className="font-mono text-gold-light">{payload[0].value}</span>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="pulse"
          stroke="#d4af37"
          strokeWidth={2.5}
          fill="url(#pulseGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
