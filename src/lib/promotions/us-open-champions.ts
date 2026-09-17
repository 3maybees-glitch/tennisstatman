import { X_HANDLE } from "@/lib/social";
import { absoluteUrl } from "@/lib/seo/site";

const DAY_MS = 86_400_000;

/** First day the banner is shown (2026 US Open men's final day). */
export const US_OPEN_CHAMPIONS_BANNER_START = "2026-09-13";

/** Last day the banner is shown (14 days inclusive). */
export const US_OPEN_CHAMPIONS_BANNER_END = "2026-09-27";

export type UsOpenChampionStat = {
  value: string;
  label: string;
};

export type UsOpenChampion = {
  tour: "ATP" | "WTA";
  tourLabel: string;
  playerId: string;
  name: string;
  href: string;
  score: string;
  runnerUp: string;
  /** Short badge under the score. */
  headline: string;
  stats: UsOpenChampionStat[];
};

export const US_OPEN_CHAMPIONS = {
  atp: {
    tour: "ATP",
    tourLabel: "Men's Singles",
    playerId: "alexander-zverev",
    name: "Alexander Zverev",
    href: "/players/alexander-zverev",
    score: "6-3, 7-6(2), 5-7, 6-2",
    runnerUp: "Ben Shelton",
    headline: "2nd Grand Slam · first German champ since 1989",
    stats: [
      { value: "2nd", label: "Major title" },
      { value: "1989", label: "First German here since" },
      { value: "No. 1", label: "Seed · $5.5M" },
    ],
  },
  wta: {
    tour: "WTA",
    tourLabel: "Women's Singles",
    playerId: "elena-rybakina",
    name: "Elena Rybakina",
    href: "/players/elena-rybakina",
    score: "6-4, 5-7, 6-2",
    runnerUp: "Aryna Sabalenka",
    headline: "First US Open title · 2nd Slam of 2026",
    stats: [
      { value: "1st", label: "US Open title" },
      { value: "3rd", label: "Grand Slam overall" },
      { value: "No. 2", label: "Seed beat No. 1" },
    ],
  },
} as const satisfies Record<"atp" | "wta", UsOpenChampion>;

export const US_OPEN_CHAMPIONS_META = {
  name: "US Open",
  shortName: "US Open",
  year: 2026,
  city: "New York",
  country: "USA",
  surface: "Hard",
  venue: "Arthur Ashe Stadium",
  campus: "Flushing Meadows",
  tournamentId: "us-open",
  dates: "Aug 31–Sep 13",
  prizeMoney: "$108M",
  championPurse: "$5.5M",
} as const;

export const US_OPEN_CHAMPIONS_LEDGER: UsOpenChampionStat[] = [
  { value: "Sep 12–13", label: "Finals on Ashe" },
  { value: "$5.5M", label: "Champion's cheque" },
  { value: "$108M", label: "Record prize fund" },
];

/** Homepage + X-post blurb. */
export const US_OPEN_CHAMPIONS_BLURB =
  "Alexander Zverev and Elena Rybakina closed the last Slam of 2026 on Arthur Ashe. Zverev outlasted Ben Shelton 6-3, 7-6(2), 5-7, 6-2 to become the first German men's champion here since 1989 — his second major. Rybakina beat defending champion Aryna Sabalenka 6-4, 5-7, 6-2 for her first US Open title and her second Slam of the year.";

/** Shorter recap for the tall X graphic. */
export const US_OPEN_CHAMPIONS_IMAGE_BLURB =
  "Zverev outlasted Shelton in four sets — first German US Open men's champion since 1989, his second major. Rybakina beat defending champion Sabalenka for her first US Open and second Slam of 2026.";

/** Shorter caption for the X intent composer. */
export const US_OPEN_CHAMPIONS_X_CAPTION = `US Open 2026 champions 🏆

ATP: Alexander Zverev def. Ben Shelton 6-3, 7-6(2), 5-7, 6-2
WTA: Elena Rybakina def. Aryna Sabalenka 6-4, 5-7, 6-2

Zverev: first German champ since 1989 · 2nd Slam
Rybakina: first US Open title · 2nd major of 2026

via @${X_HANDLE}`;

export const US_OPEN_CHAMPIONS_IMAGE = {
  /** Tall portrait — easy to post on X without cropping. */
  width: 1080,
  height: 1350,
} as const;

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — banner auto-hides after two weeks, no deploy needed. */
export function isUsOpenChampionsBannerActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return (
    today >= toDayMs(US_OPEN_CHAMPIONS_BANNER_START) &&
    today <= toDayMs(US_OPEN_CHAMPIONS_BANNER_END)
  );
}

export function usOpenChampionsJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "2026 US Open",
    startDate: "2026-08-31",
    endDate: "2026-09-13",
    sport: "Tennis",
    description: US_OPEN_CHAMPIONS_BLURB,
    url: absoluteUrl("/"),
    location: {
      "@type": "Place",
      name: "USTA Billie Jean King National Tennis Center",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
  };
}
