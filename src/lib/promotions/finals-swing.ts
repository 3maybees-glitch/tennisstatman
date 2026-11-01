import { absoluteUrl } from "@/lib/seo/site";

const DAY_MS = 86_400_000;

/** First day the indoor-swing banner is shown (after the US Open champions window). */
export const FINALS_SWING_START = "2026-10-20";

/** Last day the banner is shown (ATP Finals end, inclusive). */
export const FINALS_SWING_END = "2026-11-22";

export const FINALS_SWING_TITLE = "Paris Masters and the Finals";

/**
 * 2026-11-02 00:00 America/New_York.
 * DST ended on Nov 1, 2026, so that local midnight is 05:00 UTC.
 * The threshold is a fixed instant. Whether we are past it is decided
 * at render time inside `isAfterNo1`, not when this module is first loaded.
 */
const NO1_CUTOVER_MS = Date.parse("2026-11-02T05:00:00Z");

/** True from 2026-11-02 00:00 America/New_York onward. */
export function isAfterNo1(now = Date.now()): boolean {
  return now >= NO1_CUTOVER_MS;
}

const FINALS_SWING_DESCRIPTION_BEFORE =
  "Rolex Paris Masters main draw Nov 2–8. Sinner is out for the season. Race to Turin Nov 15–22 — Zverev, Alcaraz, and Shelton are in. WTA Finals move to Indian Wells Nov 8–15.";

const FINALS_SWING_DESCRIPTION_AFTER =
  "Alexander Zverev is the new world No. 1. Rolex Paris Masters main draw Nov 2–8. Sinner is out for the season. Race to Turin Nov 15–22 — Zverev, Alcaraz, Shelton, and Medvedev are in. WTA Finals move to Indian Wells Nov 8–15.";

const FINALS_SWING_HERO_LINE_BEFORE =
  "Rolex Paris Masters opens Nov 2. The WTA Finals are in Indian Wells, and the Race to Turin is on.";

const FINALS_SWING_HERO_LINE_AFTER =
  "Zverev is world No. 1 as the Rolex Paris Masters opens Nov 2. The WTA Finals are in Indian Wells, and the Race to Turin is on.";

const ATP_FINALS_DETAIL_BEFORE =
  "Alexander Zverev, Carlos Alcaraz, and Ben Shelton have already qualified for the season finale.";

const ATP_FINALS_DETAIL_AFTER =
  "World No. 1 Alexander Zverev, Carlos Alcaraz, Ben Shelton, and Daniil Medvedev have already qualified for the season finale.";

/** Homepage meta description. Read during render so ISR can flip the copy. */
export function getFinalsSwingDescription(now = Date.now()): string {
  return isAfterNo1(now)
    ? FINALS_SWING_DESCRIPTION_AFTER
    : FINALS_SWING_DESCRIPTION_BEFORE;
}

/** Gold line under the homepage hero. Read during render. */
export function getFinalsSwingHeroLine(now = Date.now()): string {
  return isAfterNo1(now)
    ? FINALS_SWING_HERO_LINE_AFTER
    : FINALS_SWING_HERO_LINE_BEFORE;
}

export const FINALS_SWING_KEYWORDS = [
  "Rolex Paris Masters 2026",
  "Race to Turin",
  "ATP Finals 2026",
  "WTA Finals Indian Wells",
  "Elena Rybakina",
  "Jannik Sinner",
  "PULSE tennis form score",
  "ATP analytics",
  "WTA analytics",
];

export type FinalsSwingStop = {
  id: string;
  tournamentId: string;
  kicker: string;
  title: string;
  when: string;
  where: string;
  detail: string;
};

const FINALS_SWING_STOPS_BASE: FinalsSwingStop[] = [
  {
    id: "paris-masters",
    tournamentId: "paris-masters",
    kicker: "Indoor Masters",
    title: "Rolex Paris Masters",
    when: "Nov 2–8",
    where: "Paris",
    detail:
      "Main draw. Jannik Sinner is out for the season with a knee injury. Félix Auger-Aliassime and João Fonseca have also withdrawn.",
  },
  {
    id: "wta-finals",
    tournamentId: "wta-finals",
    kicker: "Women's finale",
    title: "WTA Finals",
    when: "Nov 8–15",
    where: "Indian Wells",
    detail:
      "Moved to Indian Wells. Qualifiers: Rybakina, Sabalenka, Andreeva, Pegula, Gauff, Svitolina, Muchová, and Nosková. Rybakina is world No. 1 with a tour-leading 4 titles in 2026.",
  },
  {
    id: "atp-finals",
    tournamentId: "atp-finals",
    kicker: "Race to Turin",
    title: "ATP Finals",
    when: "Nov 15–22",
    where: "Turin",
    detail: ATP_FINALS_DETAIL_BEFORE,
  },
];

/** Banner cards. The Turin blurb flips with `isAfterNo1` at render time. */
export function getFinalsSwingStops(now = Date.now()): FinalsSwingStop[] {
  const atpDetail = isAfterNo1(now)
    ? ATP_FINALS_DETAIL_AFTER
    : ATP_FINALS_DETAIL_BEFORE;
  return FINALS_SWING_STOPS_BASE.map((stop) =>
    stop.id === "atp-finals" ? { ...stop, detail: atpDetail } : stop,
  );
}

export const FINALS_SWING_BLURB =
  "The indoor swing closes the year. Paris is missing its defending champion, the women's finale has moved to the desert, and the race for Turin is down to the last spots.";

type FinalsSwingEvent = {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  country: string;
};

const FINALS_SWING_EVENTS: FinalsSwingEvent[] = [
  {
    name: "2026 Rolex Paris Masters",
    startDate: "2026-11-02",
    endDate: "2026-11-08",
    venue: "Paris La Défense Arena",
    city: "Paris",
    country: "FR",
  },
  {
    name: "2026 WTA Finals",
    startDate: "2026-11-08",
    endDate: "2026-11-15",
    venue: "Indian Wells Tennis Garden",
    city: "Indian Wells",
    country: "US",
  },
  {
    name: "2026 ATP Finals",
    startDate: "2026-11-15",
    endDate: "2026-11-22",
    venue: "Inalpi Arena",
    city: "Turin",
    country: "IT",
  },
];

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — banner hides after the ATP Finals, no deploy needed. */
export function isFinalsSwingActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return today >= toDayMs(FINALS_SWING_START) && today <= toDayMs(FINALS_SWING_END);
}

export function finalsSwingJsonLd(now = Date.now()) {
  const stops = getFinalsSwingStops(now);
  return FINALS_SWING_EVENTS.map((event, index) => ({
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: event.name,
    startDate: event.startDate,
    endDate: event.endDate,
    sport: "Tennis",
    description: stops[index]?.detail ?? "",
    url: absoluteUrl("/"),
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: event.country,
      },
    },
  }));
}
