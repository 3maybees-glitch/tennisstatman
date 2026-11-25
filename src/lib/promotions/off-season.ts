import { absoluteUrl } from "@/lib/seo/site";

const DAY_MS = 86_400_000;

/** First day after the indoor-swing / ATP Finals window (see finals-swing). */
export const OFF_SEASON_START = "2026-11-23";

export const SEASON_WRAP_YEAR = 2026;

export const SEASON_WRAP_HEADLINE =
  "2026 season wrap — Carlos Alcaraz won the Nitto ATP Finals in Turin";

export const SEASON_WRAP_DETAIL =
  "Alcaraz beat Alexander Zverev 6-2, 7-6(7) on November 22, 2026 to close the men’s season. Rankings and player cards here stay useful in the off-season — we refresh tour data when new official feeds land.";

export const OFF_SEASON_HERO_LINE =
  "The 2026 ATP season is in the books. Explore year-end standings, player cards, and Courtside tools while we wait for the 2027 swing.";

export const OFF_SEASON_KEYWORDS = [
  "ATP Finals 2026",
  "Carlos Alcaraz Nitto ATP Finals",
  "tennis off-season 2026",
  "ATP rankings",
  "WTA rankings",
  "PULSE tennis",
];

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function isOffSeasonActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return today >= toDayMs(OFF_SEASON_START);
}

export function offSeasonDescription(): string {
  return `${SEASON_WRAP_HEADLINE}. ${SEASON_WRAP_DETAIL}`;
}

export function offSeasonJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: "Nitto ATP Finals 2026 — Men's Singles Final",
      startDate: "2026-11-22",
      endDate: "2026-11-22",
      sport: "Tennis",
      description:
        "Carlos Alcaraz defeated Alexander Zverev 6-2, 7-6(7) in Turin to win the 2026 Nitto ATP Finals.",
      url: absoluteUrl("/"),
      location: {
        "@type": "Place",
        name: "Inalpi Arena",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Turin",
          addressCountry: "IT",
        },
      },
    },
  ];
}