import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #070d18, #1b4332)",
          color: "#f0c75e",
          fontSize: 72,
          fontWeight: 700,
          borderRadius: 36,
        }}
      >
        TS
      </div>
    ),
    { ...size },
  );
}
