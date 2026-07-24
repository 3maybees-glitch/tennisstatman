import {
  CORE_SKILL_ORDER,
  SKILL_LABELS,
  type CoreSkillGrades,
  type CoreSkillKey,
} from "@/lib/data/grades";

export type RadarPoint = {
  key: CoreSkillKey;
  label: string;
  value: number;
  x: number;
  y: number;
};

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleIndex: number,
  total = CORE_SKILL_ORDER.length,
): { x: number; y: number } {
  const angle = (-Math.PI / 2) + (angleIndex * 2 * Math.PI) / total;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export function buildRadarPoints(
  skills: CoreSkillGrades,
  cx: number,
  cy: number,
  maxRadius: number,
): RadarPoint[] {
  return CORE_SKILL_ORDER.map((key, index) => {
    const value = skills[key];
    const radius = (Math.max(0, Math.min(100, value)) / 100) * maxRadius;
    const { x, y } = polarToCartesian(cx, cy, radius, index);
    return {
      key,
      label: SKILL_LABELS[key],
      value,
      x,
      y,
    };
  });
}

export function polygonPoints(points: Array<{ x: number; y: number }>): string {
  return points.map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
}

export function buildRadarSvg(input: {
  skills: CoreSkillGrades;
  size?: number;
  stroke?: string;
  fill?: string;
  gridStroke?: string;
  labelFill?: string;
}): string {
  const size = input.size ?? 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.34;
  const stroke = input.stroke ?? "#D4AF37";
  const fill = input.fill ?? "rgba(212,175,55,0.28)";
  const gridStroke = input.gridStroke ?? "rgba(255,255,255,0.18)";
  const labelFill = input.labelFill ?? "#FFFFFF";

  const rings = [0.25, 0.5, 0.75, 1]
    .map((scale) => {
      const pts = CORE_SKILL_ORDER.map((_, i) =>
        polarToCartesian(cx, cy, maxRadius * scale, i),
      );
      return `<polygon points="${polygonPoints(pts)}" fill="none" stroke="${gridStroke}" stroke-width="1" />`;
    })
    .join("");

  const axes = CORE_SKILL_ORDER.map((_, i) => {
    const end = polarToCartesian(cx, cy, maxRadius, i);
    return `<line x1="${cx}" y1="${cy}" x2="${end.x}" y2="${end.y}" stroke="${gridStroke}" stroke-width="1" />`;
  }).join("");

  const data = buildRadarPoints(input.skills, cx, cy, maxRadius);
  const labels = data
    .map((point, i) => {
      const labelPos = polarToCartesian(cx, cy, maxRadius + 18, i);
      return `<text x="${labelPos.x.toFixed(1)}" y="${labelPos.y.toFixed(1)}" fill="${labelFill}" font-size="11" font-family="Helvetica" text-anchor="middle" dominant-baseline="middle">${point.label}</text>`;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="16" fill="#141F35" />
  ${rings}
  ${axes}
  <polygon points="${polygonPoints(data)}" fill="${fill}" stroke="${stroke}" stroke-width="2.5" />
  ${data
    .map(
      (p) =>
        `<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="${stroke}" />`,
    )
    .join("")}
  ${labels}
</svg>`;
}
