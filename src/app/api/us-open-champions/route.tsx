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

async function loadPortrait(playerId: string, name: string): Promise<string> {
  const url = getPlayerPortraitUrl(playerId, 512, name);
  try {
    const res = await fetch(url, {
      next: { revalidate: 86_400 },
      headers: {
        "User-Agent":
          "TennisStatMan/1.0 (https://www.tennisstatman.com; champion portraits)",
        Accept: "image/jpeg,image/png,image/webp,*/*",
      },
    });
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
