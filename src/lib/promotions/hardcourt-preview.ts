const DAY_MS = 86_400_000;

/** First day the hardcourt preview is shown (post-Wimbledon hardcourt swing). */
export const HARDCOURT_PREVIEW_START = "2026-07-15";

/** Last day the preview is shown (through US Open first week). */
export const HARDCOURT_PREVIEW_END = "2026-09-06";

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — auto-hides after the US Open first week. */
export function isHardcourtPreviewActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return (
    today >= toDayMs(HARDCOURT_PREVIEW_START) &&
    today <= toDayMs(HARDCOURT_PREVIEW_END)
  );
}
