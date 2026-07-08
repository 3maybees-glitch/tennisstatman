"use client";

type Props = {
  history: number[];
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
};

/**
 * The PULSE heartbeat line — a lightweight inline SVG sparkline so it can be
 * dropped next to any player name without a chart library.
 */
export function PulseSpark({
  history,
  width = 120,
  height = 32,
  strokeWidth = 2,
  className,
}: Props) {
  if (history.length < 2) return null;

  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = Math.max(1, max - min);
  const pad = 3;

  const points = history.map((value, i) => {
    const x = pad + (i / (history.length - 1)) * (width - pad * 2);
    const y = pad + (1 - (value - min) / range) * (height - pad * 2);
    return { x, y };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");

  const rising = history[history.length - 1] >= history[0];
  const color = rising ? "#40916c" : "#ef4444";
  const last = points[points.length - 1];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last.x} cy={last.y} r={strokeWidth + 1} fill={color}>
        <animate
          attributeName="opacity"
          values="1;0.3;1"
          dur="1.6s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
