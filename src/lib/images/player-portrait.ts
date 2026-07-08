import { WIKIPEDIA_PORTRAITS } from "./wikipedia-portraits";

function getStylizedPortraitUrl(playerId: string, size: number): string {
  const seed = encodeURIComponent(playerId);
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&size=${size}&backgroundColor=0d1b2a,1b263b,2d6a4f`;
}

/** Wikipedia headshot when available; stylized fallback for the wider roster. */
export function getPlayerPortraitUrl(
  playerId: string,
  size = 256,
): string {
  const wiki = WIKIPEDIA_PORTRAITS[playerId];
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
