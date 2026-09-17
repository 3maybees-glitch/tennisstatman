import {
  US_OPEN_CHAMPIONS,
  US_OPEN_CHAMPIONS_IMAGE_BLURB,
  US_OPEN_CHAMPIONS_IMAGE,
  US_OPEN_CHAMPIONS_LEDGER,
  US_OPEN_CHAMPIONS_META,
} from "@/lib/promotions/us-open-champions";
import { SITE_NAME } from "@/lib/seo/site";
import { X_HANDLE } from "@/lib/social";

type PortraitSources = {
  zverev: string;
  rybakina: string;
};

type Champion = (typeof US_OPEN_CHAMPIONS)["atp"] | (typeof US_OPEN_CHAMPIONS)["wta"];

type ChampionBlockProps = {
  champion: Champion;
  portrait: string;
  accent: string;
};

function ChampionBlock({ champion, portrait, accent }: ChampionBlockProps) {
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
        padding: "24px 18px 20px",
        gap: 8,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 148,
          height: 148,
        }}
      >
        {/* next/og ImageResponse requires <img>; next/image is unsupported here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={portrait}
          width={148}
          height={148}
          alt={champion.name}
          style={{
            width: 148,
            height: 148,
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
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: accent,
        }}
      >
        {champion.tour} · {champion.tourLabel}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 32,
          fontWeight: 800,
          lineHeight: 1.1,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        {champion.name}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          fontWeight: 700,
          fontFamily: "monospace",
          color: "#f0c75e",
          textAlign: "center",
        }}
      >
        {champion.score}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 18,
          color: "rgba(255,255,255,0.72)",
        }}
      >
        def. {champion.runnerUp}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 4,
          borderRadius: 999,
          background: "rgba(212, 175, 55, 0.14)",
          color: "#f0c75e",
          padding: "7px 14px",
          fontSize: 15,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        {champion.headline}
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: 8,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {champion.stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 800,
                fontFamily: "monospace",
                color: "#f0c75e",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 13,
                color: "rgba(255,255,255,0.62)",
                textAlign: "center",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** JSX tree for next/og ImageResponse — keep to flex + inline styles only. */
export function UsOpenChampionsImageMarkup({
  portraits,
}: {
  portraits: PortraitSources;
}) {
  const { atp, wta } = US_OPEN_CHAMPIONS;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px 40px 36px",
        background:
          "linear-gradient(165deg, #06101f 0%, #0b1a33 42%, #2a1208 100%)",
        color: "#ffffff",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -90,
          right: -70,
          width: 420,
          height: 420,
          borderRadius: 999,
          background: "rgba(56, 189, 248, 0.18)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -110,
          left: -70,
          width: 380,
          height: 380,
          borderRadius: 999,
          background: "rgba(251, 146, 60, 0.16)",
          display: "flex",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 24,
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
              border: "1px solid rgba(240,199,94,0.45)",
              background: "rgba(240,199,94,0.14)",
              color: "#f0c75e",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {US_OPEN_CHAMPIONS_META.shortName} · {US_OPEN_CHAMPIONS_META.year}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Congratulations
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {US_OPEN_CHAMPIONS_META.venue} · {US_OPEN_CHAMPIONS_META.campus} ·{" "}
            {US_OPEN_CHAMPIONS_META.surface}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: 18,
          marginTop: 20,
          marginBottom: 16,
        }}
      >
        <ChampionBlock
          champion={atp}
          portrait={portraits.zverev}
          accent="#38bdf8"
        />
        <ChampionBlock
          champion={wta}
          portrait={portraits.rybakina}
          accent="#f0c75e"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 14,
        }}
      >
        {US_OPEN_CHAMPIONS_LEDGER.map((stat) => (
          <div
            key={stat.label}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(11, 18, 33, 0.58)",
              padding: "10px 8px",
              gap: 2,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 800,
                color: "#f0c75e",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 13,
                color: "rgba(255,255,255,0.62)",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            lineHeight: 1.35,
            color: "rgba(255,255,255,0.86)",
          }}
        >
          {US_OPEN_CHAMPIONS_IMAGE_BLURB}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 14,
            fontSize: 18,
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

export { US_OPEN_CHAMPIONS_IMAGE };
