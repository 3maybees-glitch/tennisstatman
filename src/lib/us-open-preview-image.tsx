import {
  US_OPEN_IMAGE,
  US_OPEN_META,
  US_OPEN_OVERVIEW,
  getUsOpenCategories,
  getUsOpenPulseBoard,
} from "@/lib/promotions/us-open-preview";
import { SITE_NAME } from "@/lib/seo/site";
import { X_HANDLE } from "@/lib/social";

const CATEGORY_COLOR: Record<string, string> = {
  first: "#fb923c",
  veteran: "#f0c75e",
  surprise: "#c084fc",
  locked: "#38bdf8",
};

type PortraitMap = Record<string, string>;

/** JSX tree for next/og ImageResponse — keep to flex + inline styles only. */
export function UsOpenPreviewImageMarkup({
  portraits,
}: {
  portraits: PortraitMap;
}) {
  const categories = getUsOpenCategories();
  const board = getUsOpenPulseBoard();
  const categoryOf = new Map<string, string>();
  for (const category of categories) {
    categoryOf.set(category.man.id, category.id);
    categoryOf.set(category.woman.id, category.id);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "44px 42px 36px",
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
              border: "1px solid rgba(56,189,248,0.45)",
              background: "rgba(56,189,248,0.14)",
              color: "#7dd3fc",
              borderRadius: 999,
              padding: "8px 16px",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {US_OPEN_META.name} · {US_OPEN_META.year}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div
            style={{
              display: "flex",
              fontSize: 46,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Night session in Queens
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            {US_OPEN_META.dates} · {US_OPEN_META.campus} · PULSE preview
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 18,
          padding: "16px 18px",
          borderRadius: 24,
          border: "1px solid rgba(56,189,248,0.22)",
          background: "rgba(11, 18, 33, 0.62)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          PULSE night board
        </div>
        {board.map((pick, index) => {
          const color = CATEGORY_COLOR[categoryOf.get(pick.id) ?? "locked"];
          return (
            <div
              key={pick.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 28,
                  fontSize: 16,
                  fontFamily: "monospace",
                  color: "rgba(255,255,255,0.55)",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              {/* next/og ImageResponse requires <img>; next/image is unsupported here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={portraits[pick.id] ?? portraits.fallback}
                width={36}
                height={36}
                alt={pick.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  objectFit: "cover",
                  border: `2px solid ${color}`,
                }}
              />
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {pick.name}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: "#f0c75e",
                }}
              >
                {pick.pulse}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 14,
        }}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
              flexGrow: 1,
              borderRadius: 20,
              border: `1px solid ${CATEGORY_COLOR[category.id]}55`,
              background: "rgba(11, 18, 33, 0.58)",
              padding: "12px 14px",
              gap: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: CATEGORY_COLOR[category.id],
              }}
            >
              {category.title}
            </div>
            <div style={{ display: "flex", fontSize: 18, fontWeight: 700 }}>
              {category.man.name.split(" ").pop()} {category.man.pulse} ·{" "}
              {category.woman.name.split(" ").pop()} {category.woman.pulse}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          marginTop: 14,
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
          {US_OPEN_OVERVIEW.slice(0, 180)}…
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

export { US_OPEN_IMAGE };
