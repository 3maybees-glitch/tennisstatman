import { getCountryColors } from "./country-colors";

export type PlayerArtInput = {
  name: string;
  country: string;
  rank: number;
  tour: "ATP" | "WTA";
  hand: "R" | "L";
  playstyle: string;
};

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}

function poseVariant(rank: number): 0 | 1 | 2 {
  return (rank % 3) as 0 | 1 | 2;
}

/** Deterministic stylized action illustration — no photographic likeness. */
export function buildPlayerArtSvg(input: PlayerArtInput, size = 320): string {
  const colors = getCountryColors(input.country);
  const tourAccent = input.tour === "ATP" ? "#3B82F6" : "#EC4899";
  const pose = poseVariant(input.rank);
  const flip = input.hand === "L" ? -1 : 1;
  const cx = size / 2;
  const mark = initials(input.name);

  const bodyTransform =
    pose === 0
      ? `translate(${cx}, 168) scale(${flip}, 1)`
      : pose === 1
        ? `translate(${cx}, 172) scale(${flip * 0.96}, 1) rotate(-8)`
        : `translate(${cx}, 170) scale(${flip * 0.98}, 1) rotate(10)`;

  const racquetArm =
    pose === 0
      ? "M 18 -8 C 48 -28 78 -18 96 -40"
      : pose === 1
        ? "M 16 -4 C 42 8 70 18 92 4"
        : "M 14 -10 C 40 -36 66 -48 88 -62";

  const trail =
    pose === 0
      ? "M 110 -46 C 130 -70 150 -66 168 -84"
      : pose === 1
        ? "M 104 0 C 128 -8 148 10 170 4"
        : "M 98 -68 C 120 -90 146 -96 168 -112";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="courtGrad-${input.rank}-${input.tour}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0B1221" />
      <stop offset="55%" stop-color="#141F35" />
      <stop offset="100%" stop-color="#1B2A4A" />
    </linearGradient>
    <linearGradient id="kitGrad-${input.rank}-${input.tour}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${colors.primary}" />
      <stop offset="100%" stop-color="${colors.secondary}" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="22" fill="url(#courtGrad-${input.rank}-${input.tour})" />
  <ellipse cx="${cx}" cy="268" rx="108" ry="18" fill="rgba(45,106,79,0.45)" />
  <path d="M 36 250 Q ${cx} 210 ${size - 36} 250" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
  <circle cx="${size - 54}" cy="54" r="28" fill="${tourAccent}" opacity="0.9" />
  <text x="${size - 54}" y="54" fill="#0B1221" font-size="18" font-family="Helvetica-Bold, Helvetica" font-weight="700" text-anchor="middle" dominant-baseline="middle">#${input.rank}</text>
  <g transform="${bodyTransform}">
    <path d="${trail}" fill="none" stroke="#F0C75E" stroke-width="3" stroke-linecap="round" opacity="0.55" />
    <circle cx="0" cy="-58" r="18" fill="#F5E6C8" />
    <path d="M -22 -28 C -30 8 -24 52 -18 78 L 20 78 C 26 48 30 8 20 -28 Z" fill="url(#kitGrad-${input.rank}-${input.tour})" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
    <path d="M -18 78 L -28 118 L -10 118 L -6 78 Z" fill="#0B1221" />
    <path d="M 18 78 L 12 118 L 30 118 L 28 78 Z" fill="#0B1221" />
    <path d="M -16 -18 C -48 4 -58 34 -46 52" fill="none" stroke="#F5E6C8" stroke-width="10" stroke-linecap="round" />
    <path d="${racquetArm}" fill="none" stroke="#F5E6C8" stroke-width="10" stroke-linecap="round" />
    <ellipse cx="104" cy="${pose === 2 ? -74 : pose === 1 ? 2 : -48}" rx="16" ry="22" transform="rotate(${pose === 1 ? 25 : -35} 104 ${pose === 2 ? -74 : pose === 1 ? 2 : -48})" fill="none" stroke="#D4AF37" stroke-width="4" />
    <circle cx="${pose === 2 ? 150 : 148}" cy="${pose === 2 ? -98 : pose === 1 ? -18 : -78}" r="7" fill="#F0C75E" />
  </g>
  <rect x="18" y="${size - 58}" width="${size - 36}" height="34" rx="10" fill="rgba(11,18,33,0.72)" />
  <text x="30" y="${size - 36}" fill="#F0C75E" font-size="14" font-family="Helvetica-Bold, Helvetica" font-weight="700">${mark}</text>
  <text x="${size - 30}" y="${size - 36}" fill="rgba(255,255,255,0.75)" font-size="11" font-family="Helvetica" text-anchor="end">${input.country}</text>
</svg>`;
}
