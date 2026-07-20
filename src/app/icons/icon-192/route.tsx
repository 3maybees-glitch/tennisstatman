import { createPwaIcon, PWA_ICON_CONTENT_TYPE } from "@/lib/pwa-icon";

export const runtime = "edge";

export function GET() {
  const response = createPwaIcon({ size: 192 });
  response.headers.set("Content-Type", PWA_ICON_CONTENT_TYPE);
  response.headers.set(
    "Cache-Control",
    "public, max-age=86400, stale-while-revalidate=604800",
  );
  return response;
}
