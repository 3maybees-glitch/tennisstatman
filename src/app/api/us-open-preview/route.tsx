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

/** Prefer a Wikimedia thumb so full-size Commons files do not blow the OG budget. */
function toWikimediaThumb(url: string, width = 256): string {
  const match = url.match(
    /upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)/i,
  );
  if (!match || url.includes("/thumb/")) return url;
  const [, dir, sub, file] = match;
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${dir}/${sub}/${file}/${width}px-${file}`;
}

async function loadPortrait(playerId: string, name: string): Promise<string> {
  const url = toWikimediaThumb(getPlayerPortraitUrl(playerId, 256, name));
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
