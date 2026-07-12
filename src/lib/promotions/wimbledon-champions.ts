const DAY_MS = 86_400_000;

/** First day the banner is shown (2026 Wimbledon final day). */
export const WIMBLEDON_BANNER_START = "2026-07-12";

/** Last day the banner is shown (14 days inclusive). */
export const WIMBLEDON_BANNER_END = "2026-07-26";

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — banner auto-hides after two weeks, no deploy needed. */
export function isWimbledonChampionsBannerActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return (
    today >= toDayMs(WIMBLEDON_BANNER_START) &&
    today <= toDayMs(WIMBLEDON_BANNER_END)
  );
}
