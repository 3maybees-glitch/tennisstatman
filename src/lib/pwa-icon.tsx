import { ImageResponse } from "next/og";

type PwaIconOptions = {
  size: number;
  /** Extra padding so the glyph stays inside the maskable safe zone. */
  maskable?: boolean;
};

export const PWA_ICON_CONTENT_TYPE = "image/png";

export function createPwaIcon({ size, maskable = false }: PwaIconOptions) {
  const inset = maskable ? Math.round(size * 0.18) : Math.round(size * 0.07);
  const radius = Math.round(size * 0.22);
  const markRadius = Math.round(size * 0.2);
  const ballSize = Math.round(size * 0.3);
  const seamOffset = Math.max(2, Math.round(ballSize * 0.17));
  const seamWidth = Math.max(1, Math.round(ballSize * 0.065));
  const textSize = Math.max(14, Math.round(size * 0.13));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 25% 15%, #1b4332 0%, #081423 40%, #070d18 100%)",
          padding: inset,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(145deg, rgba(11, 24, 37, 0.95), rgba(19, 50, 43, 0.96))",
            borderRadius: radius,
            border: `${Math.max(2, Math.round(size * 0.02))}px solid rgba(240, 199, 94, 0.36)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0",
              borderRadius: radius,
              border: `${Math.max(1, Math.round(size * 0.01))}px solid rgba(240, 199, 94, 0.2)`,
            }}
          />
          <div
            style={{
              width: ballSize,
              height: ballSize,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #ffe89a 0%, #f0c75e 48%, #cc9f38 100%)",
              boxShadow: "0 10px 22px rgba(0, 0, 0, 0.35)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: seamOffset,
                top: Math.round(ballSize * 0.07),
                width: seamWidth,
                height: Math.round(ballSize * 0.84),
                borderRadius: seamWidth,
                background: "rgba(255, 255, 255, 0.82)",
                transform: "rotate(14deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: seamOffset,
                top: Math.round(ballSize * 0.07),
                width: seamWidth,
                height: Math.round(ballSize * 0.84),
                borderRadius: seamWidth,
                background: "rgba(255, 255, 255, 0.82)",
                transform: "rotate(-14deg)",
              }}
            />
          </div>
          <div
            style={{
              marginTop: Math.round(size * 0.08),
              padding: `${Math.max(4, Math.round(size * 0.015))}px ${Math.max(8, Math.round(size * 0.045))}px`,
              borderRadius: markRadius,
              background: "rgba(7, 13, 24, 0.62)",
              border: `${Math.max(1, Math.round(size * 0.006))}px solid rgba(240, 199, 94, 0.34)`,
              color: "#f6d986",
              fontSize: textSize,
              letterSpacing: Math.max(0, Math.round(size * 0.004)),
              fontWeight: 700,
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            TSM
          </div>
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
