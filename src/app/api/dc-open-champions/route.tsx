import { ImageResponse } from "next/og";
import { DcOpenChampionsImageMarkup } from "@/lib/dc-open-champions-image";
import { getPlayerPortraitUrl } from "@/lib/images/player-portrait";
import {
  DC_OPEN_CHAMPIONS,
  DC_OPEN_IMAGE,
} from "@/lib/promotions/dc-open-champions";

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
    const res = await fetch(url, { next: { revalidate: 86_400 } });
    if (!res.ok) return url;
    const contentType = res.headers.get("content-type") ?? "image/jpeg";
    return toDataUrl(await res.arrayBuffer(), contentType);
  } catch {
    return url;
  }
}

export async function GET() {
  const { atp, wta } = DC_OPEN_CHAMPIONS;
  const [fritz, eala] = await Promise.all([
    loadPortrait(atp.playerId, atp.name),
    loadPortrait(wta.playerId, wta.name),
  ]);

  return new ImageResponse(
    <DcOpenChampionsImageMarkup portraits={{ fritz, eala }} />,
    {
      ...DC_OPEN_IMAGE,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        "Content-Disposition":
          'attachment; filename="tennisstatman-dc-open-champions-2026.png"',
      },
    },
  );
}
