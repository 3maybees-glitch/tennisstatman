/**
 * Featured @TennisStatMan posts to show on the homepage.
 *
 * X's profile timeline embed returns an empty feed for brand-new /
 * low-follower accounts (login-walled). Individual post embeds still work —
 * paste status URLs here (or set NEXT_PUBLIC_X_POST_URLS).
 *
 * Example:
 *   "https://x.com/tennisstatman/status/1234567890123456789"
 */
const curatedPostUrls: string[] = [
  // Add latest post URLs below, newest first:
];

function urlsFromEnv(): string[] {
  const raw = process.env.NEXT_PUBLIC_X_POST_URLS?.trim();
  if (!raw) return [];
  return raw
    .split(/[,\s]+/)
    .map((u) => u.trim())
    .filter(Boolean);
}

const STATUS_URL_RE =
  /^https?:\/\/(?:(?:www|mobile)\.)?(?:twitter|x)\.com\/\w+\/status\/(\d+)/i;

export function normalizeXStatusUrl(url: string): string | null {
  const match = url.trim().match(STATUS_URL_RE);
  if (!match) return null;
  return `https://x.com/tennisstatman/status/${match[1]}`;
}

/** Deduped status URLs for the homepage feed (env wins over curated). */
export function getFeaturedXPostUrls(): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const url of [...urlsFromEnv(), ...curatedPostUrls]) {
    const normalized = normalizeXStatusUrl(url);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}
