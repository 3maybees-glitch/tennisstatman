"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { MomentumPoint } from "@/lib/data/mock-matches";

type Props = {
  data: MomentumPoint[];
  player1Name: string;
  player2Name: string;
  height?: number;
};

export function MomentumChart({
  data,
  player1Name,
  player2Name,
  height = 320,
}: Props) {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-court-light" />
          <span className="text-muted">{player1Name}</span>
        </div>
        <span className="text-xs uppercase tracking-wider text-muted">
          Win probability %
        </span>
        <div className="flex items-center gap-2">
          <span className="text-muted">{player2Name}</span>
          <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="p1Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#40916c" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#40916c" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="p2Gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4af37" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#d4af37" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#8b9cb8", fontSize: 12 }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
          />
          <YAxis
            domain={[20, 80]}
            tick={{ fill: "#8b9cb8", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <ReferenceLine y={50} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0].payload as MomentumPoint;
              return (
                <div className="rounded-lg border border-white/10 bg-navy-light px-4 py-3 shadow-xl">
                  <p className="text-xs text-muted">Game {point.game}</p>
                  <p className="mt-1 text-sm">
                    <span className="text-court-light">{player1Name}</span>:{" "}
                    {point.player1}%
                  </p>
                  <p className="text-sm">
                    <span className="text-gold">{player2Name}</span>: {point.player2}%
                  </p>
                  {point.event && (
                    <p className="mt-2 text-xs text-gold-light">⚡ {point.event}</p>
                  )}
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="player1"
            stroke="#40916c"
            strokeWidth={2}
            fill="url(#p1Gradient)"
          />
          <Area
            type="monotone"
            dataKey="player2"
            stroke="#d4af37"
            strokeWidth={2}
            fill="url(#p2Gradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
