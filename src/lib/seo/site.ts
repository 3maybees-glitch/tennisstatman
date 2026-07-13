export const SITE_NAME = "TennisStatMan";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tennisstatman.com";

export const SITE_DESCRIPTION =
  "Tennis stats with a face. Player cards with skill grades, the PULSE form score, legend comparisons, a world map of tennis, and the master calendar from Grand Slams to ITF.";

export const SITE_KEYWORDS = [
  "tennis stats",
  "ATP analytics",
  "WTA analytics",
  "tennis player cards",
  "PULSE tennis form score",
  "tennis legend comparison",
  "tennis tournament calendar",
  "momentum tennis",
  "tennis rankings",
  "tennis scouting grades",
];

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
