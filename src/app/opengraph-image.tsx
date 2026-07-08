import { ImageResponse } from "next/og";

export const alt = "TennisStatMan — Next-Gen Tennis Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #070d18 0%, #0d1b2a 45%, #1b4332 100%)",
          color: "#e8edf5",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#d4af37",
            marginBottom: 24,
            display: "flex",
          }}
        >
          ATP & WTA Analytics
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
            display: "flex",
          }}
        >
          Tennis<span style={{ color: "#f0c75e" }}>StatMan</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            lineHeight: 1.4,
            color: "#b8c5d6",
            maxWidth: 820,
            display: "flex",
          }}
        >
          Player cards, PULSE form scores, legend comparisons, and the full tour calendar.
        </div>
      </div>
    ),
    { ...size },
  );
}
