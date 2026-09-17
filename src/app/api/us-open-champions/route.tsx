import { ImageResponse } from "next/og";
import { UsOpenChampionsImageMarkup } from "@/lib/us-open-champions-image";
import { getPlayerPortraitUrl } from "@/lib/images/player-portrait";
import {
  US_OPEN_CHAMPIONS,
  US_OPEN_CHAMPIONS_IMAGE,
} from "@/lib/promotions/us-open-champions";

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
  const thumbMatch = url.match(
    /upload\.wikimedia\.org\/wikipedia\/commons\/thumb\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)\/\d+px-/i,
  );
  if (thumbMatch) {
    const [, dir, sub, file] = thumbMatch;
    return `https://upload.wikimedia.org/wikipedia/commons/thumb/${dir}/${sub}/${file}/${width}px-${file}`;
  }

  const match = url.match(
    /upload\.wikimedia\.org\/wikipedia\/commons\/([0-9a-f])\/([0-9a-f]{2})\/([^/?#]+)/i,
  );
  if (!match) return url;
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
  const { atp, wta } = US_OPEN_CHAMPIONS;
  const [zverev, rybakina] = await Promise.all([
    loadPortrait(atp.playerId, atp.name),
    loadPortrait(wta.playerId, wta.name),
  ]);

  return new ImageResponse(
    <UsOpenChampionsImageMarkup portraits={{ zverev, rybakina }} />,
    {
      ...US_OPEN_CHAMPIONS_IMAGE,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Disposition":
          'attachment; filename="tennisstatman-us-open-champions-2026.png"',
      },
    },
  );
}
