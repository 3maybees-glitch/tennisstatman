import type { Tour } from "@/lib/rankings/types";
import { PORTRAIT_MANIFEST } from "./portrait-manifest";

export const TOP_PORTRAIT_RANK = 50;

const PORTRAIT_PROMPTS: Record<Tour, string> = {
  ATP: "professional male tennis player portrait photograph headshot athletic {name} studio lighting neutral dark charcoal background photorealistic sharp focus sports trading card",
  WTA: "professional female tennis player portrait photograph headshot athletic {name} studio lighting neutral dark charcoal background photorealistic sharp focus sports trading card",
};

type PortraitOptions = {
  tour?: Tour;
  rank?: number;
  name?: string;
};

function getPollinationsPortraitUrl(
  playerId: string,
  tour: Tour,
  size: number,
  name?: string,
): string {
  const label = name ?? playerId.replace(/-/g, " ");
  const prompt = encodeURIComponent(PORTRAIT_PROMPTS[tour].replace("{name}", label));
  const seed = hashString(`${tour}:${playerId}`);
  return `https://image.pollinations.ai/prompt/${prompt}?width=${size}&height=${size}&seed=${seed}&nologo=true`;
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function getStylizedPortraitUrl(playerId: string, size: number): string {
  const seed = encodeURIComponent(playerId);
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&size=${size}&backgroundColor=0d1b2a,1b263b,2d6a4f`;
}

/** Photorealistic AI portrait for top-50 cards; stylized fallback for the wider roster. */
export function getPlayerPortraitUrl(
  playerId: string,
  size = 256,
  options?: PortraitOptions,
): string {
  const rank = options?.rank;
  const tour = options?.tour;
  const isTopPlayer = rank !== undefined && rank <= TOP_PORTRAIT_RANK;

  if (PORTRAIT_MANIFEST.has(playerId)) {
    return `/players/${playerId}.jpg`;
  }

  if (isTopPlayer && tour) {
    return getPollinationsPortraitUrl(playerId, tour, size, options?.name);
  }

  return getStylizedPortraitUrl(playerId, size);
}

export function playerInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
