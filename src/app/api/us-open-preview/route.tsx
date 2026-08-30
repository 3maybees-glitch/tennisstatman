import { ImageResponse } from "next/og";
import { getPlayerPortraitUrl } from "@/lib/images/player-portrait";
import {
  US_OPEN_IMAGE,
  getUsOpenFeaturedPicks,
} from "@/lib/promotions/us-open-preview";
import { UsOpenPreviewImageMarkup } from "@/lib/us-open-preview-image";

export const runtime = "edge";
export const revalidate = 3600;

function toDataUrl(buffer: ArrayBuffer, contentType: string): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return `data:${contentType};base64,${btoa(binary)}`;
}

async function loadPortrait(playerId: string, name: string): Promise<string> {
  const url = getPlayerPortraitUrl(playerId, 256, name);
  try {
    const res = await fetch(url, { next: { revalidate: 86_400 } });
    if (!res.ok) return url;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return toDataUrl(await res.arrayBuffer(), contentType);
  } catch {
    return url;
  }
}

export async function GET() {
  const picks = getUsOpenFeaturedPicks();
  const portraits = Object.fromEntries(
    await Promise.all(
      picks.map(async (pick) => [
        pick.id,
        await loadPortrait(pick.id, pick.name),
      ]),
    ),
  );

  return new ImageResponse(
    <UsOpenPreviewImageMarkup portraits={portraits} />,
    {
      ...US_OPEN_IMAGE,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Disposition":
          'attachment; filename="tennisstatman-us-open-preview-2026.png"',
      },
    },
  );
}
