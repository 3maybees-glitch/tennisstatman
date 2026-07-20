import { ImageResponse } from "next/og";

type PwaIconOptions = {
  size: number;
  /** Extra padding so the glyph stays inside the maskable safe zone. */
  maskable?: boolean;
};

export const PWA_ICON_CONTENT_TYPE = "image/png";

export function createPwaIcon({ size, maskable = false }: PwaIconOptions) {
  const inset = maskable ? Math.round(size * 0.2) : Math.round(size * 0.08);
  const radius = Math.round(size * 0.22);
  const borderWidth = Math.max(2, Math.round(size * 0.018));
  const courtLine = Math.max(2, Math.round(size * 0.012));
  const ballSize = Math.round(size * 0.22);
  const ballTop = Math.round(size * 0.21);
  const ballLeft = Math.round(size * 0.54);
  const seamWidth = Math.max(1, Math.round(ballSize * 0.08));
  const labelSize = Math.max(13, Math.round(size * 0.12));
  const glowSize = Math.round(size * 0.4);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050913",
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
              "radial-gradient(circle at 20% 15%, #1d4f43 0%, #0d2234 42%, #091221 100%)",
            borderRadius: radius,
            border: `${borderWidth}px solid rgba(240, 199, 94, 0.4)`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "0",
              borderRadius: radius,
              border: `${Math.max(1, Math.round(size * 0.007))}px solid rgba(255, 255, 255, 0.16)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: glowSize,
              height: glowSize,
              borderRadius: "50%",
              right: Math.round(size * -0.12),
              top: Math.round(size * -0.14),
              background: "rgba(240, 199, 94, 0.13)",
              filter: `blur(${Math.max(10, Math.round(size * 0.03))}px)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: Math.round(size * 0.11),
              borderRadius: Math.round(size * 0.15),
              border: `${courtLine}px solid rgba(158, 225, 206, 0.34)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: Math.round(size * 0.11),
              width: courtLine,
              height: Math.round(size * 0.78),
              borderRadius: courtLine,
              background: "rgba(158, 225, 206, 0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.11),
              right: Math.round(size * 0.11),
              top: "50%",
              transform: "translateY(-50%)",
              height: courtLine,
              borderRadius: courtLine,
              background: "rgba(158, 225, 206, 0.28)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: ballTop,
              left: ballLeft,
              width: ballSize,
              height: ballSize,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 32% 28%, #fff1b8 0%, #f6ce66 46%, #d8a83e 100%)",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.32)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: Math.round(ballSize * 0.28),
                top: Math.round(ballSize * 0.09),
                width: seamWidth,
                height: Math.round(ballSize * 0.8),
                borderRadius: seamWidth,
                background: "rgba(255, 255, 255, 0.88)",
                transform: "rotate(14deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: Math.round(ballSize * 0.28),
                top: Math.round(ballSize * 0.09),
                width: seamWidth,
                height: Math.round(ballSize * 0.8),
                borderRadius: seamWidth,
                background: "rgba(255, 255, 255, 0.88)",
                transform: "rotate(-14deg)",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              left: Math.round(size * 0.13),
              bottom: Math.round(size * 0.13),
              color: "#f7d989",
              fontSize: labelSize,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: Math.max(0, Math.round(size * 0.005)),
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
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
