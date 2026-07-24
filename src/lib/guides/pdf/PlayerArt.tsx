import { Circle, Ellipse, Path, Rect, Svg, Text } from "@react-pdf/renderer";
import type { GuidePlayer } from "@/lib/data/guides/types";
import { getCountryColors } from "@/lib/guides/country-colors";
import { colors } from "./styles";

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

export function PlayerArt({
  player,
  size = 210,
}: {
  player: GuidePlayer;
  size?: number;
}) {
  const kit = getCountryColors(player.country);
  const tourAccent = player.tour === "ATP" ? colors.atp : colors.wta;
  const mark = initials(player.name);
  const lefty = player.hand === "L";
  const cx = size / 2;

  // Mirror action side for lefties without SVG group transforms.
  const armX1 = lefty ? cx + 14 : cx - 14;
  const armX2 = lefty ? cx - 52 : cx + 52;
  const racquetX = lefty ? cx - 68 : cx + 68;
  const ballX = lefty ? cx - 96 : cx + 96;
  const trailX2 = lefty ? cx - 110 : cx + 110;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect width={size} height={size} rx={16} fill={colors.navyLight} />
      <Ellipse
        cx={cx}
        cy={size * 0.84}
        rx={size * 0.34}
        ry={12}
        fill="rgba(45,106,79,0.4)"
      />
      <Circle cx={size - 36} cy={34} r={18} fill={tourAccent} />
      <Text
        x={size - 44}
        y={38}
        fill={colors.navy}
        style={{ fontSize: 11, fontFamily: "Helvetica-Bold" }}
      >
        #{player.rank}
      </Text>

      <Path
        d={`M ${racquetX} 78 C ${(racquetX + trailX2) / 2} 54 ${trailX2} 60 ${trailX2} 42`}
        stroke={colors.goldLight}
        strokeWidth={2.5}
        fill="none"
      />
      <Circle cx={cx} cy={70} r={13} fill="#F5E6C8" />
      <Path
        d={`M ${cx - 16} 88 C ${cx - 22} 118 ${cx - 18} 150 ${cx - 12} 168 L ${cx + 14} 168 C ${cx + 20} 148 ${cx + 22} 118 ${cx + 14} 88 Z`}
        fill={kit.primary}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth={1}
      />
      <Path
        d={`M ${cx - 12} 168 L ${cx - 20} 196 L ${cx - 6} 196 L ${cx - 4} 168 Z`}
        fill={colors.navy}
      />
      <Path
        d={`M ${cx + 12} 168 L ${cx + 8} 196 L ${cx + 22} 196 L ${cx + 20} 168 Z`}
        fill={colors.navy}
      />
      <Path
        d={`M ${armX1} 100 C ${lefty ? cx + 36 : cx - 36} 118 ${lefty ? cx + 40 : cx - 40} 140 ${lefty ? cx + 28 : cx - 28} 152`}
        stroke="#F5E6C8"
        strokeWidth={7}
        fill="none"
      />
      <Path
        d={`M ${armX1} 96 C ${(armX1 + armX2) / 2} 84 ${armX2} 90 ${racquetX} 78`}
        stroke="#F5E6C8"
        strokeWidth={7}
        fill="none"
      />
      <Ellipse
        cx={racquetX}
        cy={72}
        rx={11}
        ry={15}
        stroke={colors.gold}
        strokeWidth={3}
        fill="none"
      />
      <Circle cx={ballX} cy={48} r={5} fill={colors.goldLight} />

      <Rect
        x={12}
        y={size - 38}
        width={size - 24}
        height={22}
        rx={8}
        fill="rgba(11,18,33,0.75)"
      />
      <Text
        x={20}
        y={size - 23}
        fill={colors.goldLight}
        style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}
      >
        {mark}
      </Text>
      <Text
        x={size - 42}
        y={size - 23}
        fill={colors.muted}
        style={{ fontSize: 9 }}
      >
        {player.country}
      </Text>
    </Svg>
  );
}
