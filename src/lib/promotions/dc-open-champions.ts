const DAY_MS = 86_400_000;

/** First day the banner is shown (2026 DC Open final day). */
export const DC_OPEN_BANNER_START = "2026-08-03";

/** Last day the banner is shown (14 days inclusive). */
export const DC_OPEN_BANNER_END = "2026-08-17";

export type DcOpenChampion = {
  tour: "ATP" | "WTA";
  tourLabel: string;
  playerId: string;
  name: string;
  href: string;
  score: string;
  runnerUp: string;
  /** Short badge under the score. */
  stat: string;
};

export const DC_OPEN_CHAMPIONS = {
  atp: {
    tour: "ATP",
    tourLabel: "Men's Singles",
    playerId: "taylor-fritz",
    name: "Taylor Fritz",
    href: "/players/taylor-fritz",
    score: "7-6(2), 6-4",
    runnerUp: "Rafael Jódar",
    stat: "11th ATP title · first of 2026",
  },
  wta: {
    tour: "WTA",
    tourLabel: "Women's Singles",
    playerId: "alexandra-eala",
    name: "Alexandra Eala",
    href: "/wta",
    score: "4-6, 6-4, 6-0",
    runnerUp: "Jessica Pegula",
    stat: "First WTA title · first Filipino champ",
  },
} as const satisfies Record<"atp" | "wta", DcOpenChampion>;

export const DC_OPEN_META = {
  name: "Mubadala Citi DC Open",
  shortName: "DC Open",
  year: 2026,
  city: "Washington, D.C.",
  country: "USA",
  surface: "Hard",
  venue: "Rock Creek Park",
  tournamentId: "dc-open",
} as const;

/** Homepage + X-post blurb. */
export const DC_OPEN_BLURB =
  "Taylor Fritz and Alexandra Eala closed the books in Rock Creek Park. Fritz edged teen sensation Rafael Jódar 7-6(2), 6-4 for his first title of 2026, while Eala rewrote history — the first Filipino WTA champion — after rallying past Jessica Pegula 4-6, 6-4, 6-0 in a rain-split final.";

/** Shorter caption for the X intent composer. */
export const DC_OPEN_X_CAPTION = `DC Open champions 🏆

ATP: Taylor Fritz def. Rafael Jódar 7-6(2), 6-4
WTA: Alexandra Eala def. Jessica Pegula 4-6, 6-4, 6-0

Eala becomes the first Filipino WTA singles champion. Fritz banks his first title of 2026.

via @TennisStatMan`;

export const DC_OPEN_IMAGE = {
  /** Tall portrait — easy to post on X without cropping. */
  width: 1080,
  height: 1350,
} as const;

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — banner auto-hides after two weeks, no deploy needed. */
export function isDcOpenChampionsBannerActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return (
    today >= toDayMs(DC_OPEN_BANNER_START) &&
    today <= toDayMs(DC_OPEN_BANNER_END)
  );
}
