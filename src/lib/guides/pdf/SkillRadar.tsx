import { Circle, Line, Polygon, Svg, Text } from "@react-pdf/renderer";
import { CORE_SKILL_ORDER, type CoreSkillGrades } from "@/lib/data/grades";
import {
  buildRadarPoints,
  polarToCartesian,
  polygonPoints,
} from "@/lib/guides/radar-geometry";
import { colors } from "./styles";

export function SkillRadarPdf({
  skills,
  size = 210,
}: {
  skills: CoreSkillGrades;
  size?: number;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.3;
  const data = buildRadarPoints(skills, cx, cy, maxRadius);

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Circle
        cx={cx}
        cy={cy}
        r={maxRadius}
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
        fill={colors.navyLight}
      />
      {[0.25, 0.5, 0.75, 1].map((scale) => {
        const pts = CORE_SKILL_ORDER.map((_, i) =>
          polarToCartesian(cx, cy, maxRadius * scale, i),
        );
        return (
          <Polygon
            key={scale}
            points={polygonPoints(pts)}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1}
            fill="none"
          />
        );
      })}
      {CORE_SKILL_ORDER.map((_, i) => {
        const end = polarToCartesian(cx, cy, maxRadius, i);
        return (
          <Line
            key={i}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth={1}
          />
        );
      })}
      <Polygon
        points={polygonPoints(data)}
        fill="rgba(212,175,55,0.28)"
        stroke={colors.gold}
        strokeWidth={2}
      />
      {data.map((point) => (
        <Circle
          key={point.key}
          cx={point.x}
          cy={point.y}
          r={3}
          fill={colors.goldLight}
        />
      ))}
      {data.map((point, i) => {
        const label = polarToCartesian(cx, cy, maxRadius + 14, i);
        const anchorShift = point.label.length * 2.2;
        return (
          <Text
            key={`label-${point.key}`}
            x={label.x - anchorShift}
            y={label.y + 3}
            style={{ fontSize: 8, fill: colors.white }}
          >
            {point.label}
          </Text>
        );
      })}
    </Svg>
  );
}
