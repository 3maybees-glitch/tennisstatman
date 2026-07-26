import type { DailyStat, TourSide } from "@/lib/data/stat-of-the-day";
import { STAT_OF_THE_DAY_IMAGE } from "@/lib/data/stat-of-the-day";
import { SITE_NAME } from "@/lib/seo/site";
import { X_HANDLE } from "@/lib/social";

const tourLabel: Record<TourSide, string> = {
  ATP: "Men's · ATP",
  WTA: "Women's · WTA",
};

const tourAccent: Record<TourSide, string> = {
  ATP: "#3b82f6",
  WTA: "#f0c75e",
};

/** JSX tree for next/og ImageResponse — keep to flex + inline styles only. */
export function StatOfTheDayImageMarkup({ stat }: { stat: DailyStat }) {
  const accent = tourAccent[stat.tour];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 64px",
        background: "linear-gradient(165deg, #070d18 0%, #0b1221 42%, #13261c 100%)",
        color: "#ffffff",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -60,
          width: 420,
          height: 420,
          borderRadius: 999,
          background:
            stat.tour === "ATP"
              ? "rgba(59, 130, 246, 0.22)"
              : "rgba(212, 175, 55, 0.2)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Tennis
            <span style={{ color: "#f0c75e" }}>StatMan</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${accent}66`,
              background: `${accent}22`,
              color: accent,
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {tourLabel[stat.tour]}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#d4af37",
            fontWeight: 600,
          }}
        >
          Stat of the Day · {stat.category}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
          flex: 1,
          justifyContent: "center",
          paddingTop: 48,
          paddingBottom: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#f0c75e",
          }}
        >
          {stat.headline}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            lineHeight: 1.45,
            color: "rgba(255,255,255,0.9)",
            maxWidth: 920,
          }}
        >
          {stat.detail}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
          fontSize: 24,
          color: "rgba(255,255,255,0.65)",
        }}
      >
        <div style={{ display: "flex" }}>@{X_HANDLE}</div>
        <div style={{ display: "flex" }}>{SITE_NAME}.com</div>
      </div>
    </div>
  );
}

export { STAT_OF_THE_DAY_IMAGE };
