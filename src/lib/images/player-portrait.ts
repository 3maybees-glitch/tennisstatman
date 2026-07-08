import { WIKIPEDIA_PORTRAITS } from "./wikipedia-portraits";
import { slugify } from "@/lib/data/generated-players";

function getStylizedPortraitUrl(playerId: string, size: number): string {
  const seed = encodeURIComponent(playerId);
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&size=${size}&backgroundColor=0d1b2a,1b263b,2d6a4f`;
}

function portraitKeys(playerId: string, name?: string): string[] {
  const keys = new Set<string>();

  keys.add(playerId);

  const withoutTourSuffix = playerId.replace(/-(atp|wta)$/i, "");
  if (withoutTourSuffix !== playerId) {
    keys.add(withoutTourSuffix);
  }

  if (name) {
    keys.add(slugify(name));
  }

  return [...keys];
}

function resolveWikipediaPortrait(playerId: string, name?: string) {
  for (const key of portraitKeys(playerId, name)) {
    const portrait = WIKIPEDIA_PORTRAITS[key];
    if (portrait?.url) return portrait;
  }
  return undefined;
}

/** Wikipedia headshot when available; stylized fallback for the wider roster. */
export function getPlayerPortraitUrl(
  playerId: string,
  size = 256,
  name?: string,
): string {
  const wiki = resolveWikipediaPortrait(playerId, name);
  if (wiki?.url) {
    return wiki.url;
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
