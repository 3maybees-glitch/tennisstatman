/** Stylized AI portrait URL — deterministic per player id. */
export function getPlayerPortraitUrl(playerId: string, size = 256): string {
  const seed = encodeURIComponent(playerId);
  return `https://api.dicebear.com/7.x/personas/png?seed=${seed}&size=${size}&backgroundColor=0d1b2a,1b263b,2d6a4f`;
}

export function playerInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
