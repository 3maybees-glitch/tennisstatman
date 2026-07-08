"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { SKILL_LABELS, SKILL_ORDER, type SkillGrades } from "@/lib/data/grades";

type Series = {
  name: string;
  skills: SkillGrades;
  color: string;
};

type Props = {
  series: Series[];
  height?: number;
  showLegend?: boolean;
};

export function SkillRadar({ series, height = 280, showLegend = false }: Props) {
  const data = SKILL_ORDER.map((key) => {
    const point: Record<string, string | number> = {
      skill: SKILL_LABELS[key],
    };
    for (const s of series) {
      point[s.name] = s.skills[key];
    }
    return point;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="72%">
        <PolarGrid stroke="rgba(255,255,255,0.12)" />
        <PolarAngleAxis
          dataKey="skill"
          tick={{ fill: "#ffffff", fontSize: 12 }}
        />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        {series.map((s) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={s.color}
            fill={s.color}
            fillOpacity={0.25}
            strokeWidth={2}
          />
        ))}
        {showLegend && (
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#ffffff" }}
            iconType="circle"
          />
        )}
      </RadarChart>
    </ResponsiveContainer>
  );
}
