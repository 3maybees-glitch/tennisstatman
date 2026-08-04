import {
  DC_OPEN_BLURB,
  DC_OPEN_CHAMPIONS,
  DC_OPEN_IMAGE,
  DC_OPEN_META,
} from "@/lib/promotions/dc-open-champions";
import { SITE_NAME } from "@/lib/seo/site";
import { X_HANDLE } from "@/lib/social";

type PortraitSources = {
  fritz: string;
  eala: string;
};

type ChampionBlockProps = {
  tour: "ATP" | "WTA";
  tourLabel: string;
  name: string;
  score: string;
  runnerUp: string;
  stat: string;
  portrait: string;
  accent: string;
};

function ChampionBlock({
  tour,
  tourLabel,
  name,
  score,
  runnerUp,
  stat,
  portrait,
  accent,
}: ChampionBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 28,
        background: "rgba(11, 18, 33, 0.72)",
        padding: "28px 20px 24px",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 168,
          height: 168,
        }}
      >
        <img
          src={portrait}
          width={168}
          height={168}
          alt={name}
          style={{
            width: 168,
            height: 168,
            borderRadius: 999,
            objectFit: "cover",
            border: `4px solid ${accent}`,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 8,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {tour} · {tourLabel}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 34,
          fontWeight: 800,
          lineHeight: 1.1,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        {name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "monospace",
          color: "#f0c75e",
        }}
      >
        {score}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        def. {runnerUp}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 4,
          borderRadius: 999,
          background: "rgba(212, 175, 55, 0.14)",
          color: "#f0c75e",
          padding: "8px 16px",
          fontSize: 16,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {stat}
      </div>
    </div>
  );
}

/** JSX tree for next/og ImageResponse — keep to flex + inline styles only. */
export function DcOpenChampionsImageMarkup({
  portraits,
}: {
  portraits: PortraitSources;
}) {
  const { atp, wta } = DC_OPEN_CHAMPIONS;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "52px 48px 44px",
        background:
          "linear-gradient(165deg, #070d18 0%, #0b1221 38%, #13261c 100%)",
        color: "#ffffff",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -80,
          width: 420,
          height: 420,
          borderRadius: 999,
          background: "rgba(212, 175, 55, 0.16)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -60,
          width: 380,
          height: 380,
          borderRadius: 999,
          background: "rgba(59, 130, 246, 0.14)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 26,
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
              border: "1px solid rgba(212,175,55,0.45)",
              background: "rgba(212,175,55,0.14)",
              color: "#f0c75e",
              borderRadius: 999,
              padding: "10px 20px",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {DC_OPEN_META.shortName} · {DC_OPEN_META.year}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 48,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Champions of D.C.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.04em",
            }}
          >
            {DC_OPEN_META.venue} · {DC_OPEN_META.city} · {DC_OPEN_META.surface}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 22,
          marginTop: 28,
          marginBottom: 22,
        }}
      >
        <ChampionBlock
          tour={atp.tour}
          tourLabel={atp.tourLabel}
          name={atp.name}
          score={atp.score}
          runnerUp={atp.runnerUp}
          stat={atp.stat}
          portrait={portraits.fritz}
          accent="#3b82f6"
        />
        <ChampionBlock
          tour={wta.tour}
          tourLabel={wta.tourLabel}
          name={wta.name}
          score={wta.score}
          runnerUp={wta.runnerUp}
          stat={wta.stat}
          portrait={portraits.eala}
          accent="#f0c75e"
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          {DC_OPEN_BLURB}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 18,
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>@{X_HANDLE}</div>
          <div style={{ display: "flex" }}>{SITE_NAME}.com</div>
        </div>
      </div>
    </div>
  );
}

export { DC_OPEN_IMAGE };
