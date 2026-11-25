import type { RankingsSnapshot } from "./types";

/** Human label for when rankings were last written to the page. */
export function formatRankingsLastUpdated(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return "date unavailable";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function latestRankingsUpdatedAt(
  snapshots: RankingsSnapshot[],
): string | null {
  const stamps = snapshots
    .map((s) => new Date(s.updatedAt).getTime())
  .filter((t) => !Number.isNaN(t));
  if (stamps.length === 0) return null;
  return new Date(Math.max(...stamps)).toISOString();
}

export function rankingsRefreshFootnote(updatedAtIso: string | null): string {
  const when = updatedAtIso
    ? `Last updated ${formatRankingsLastUpdated(updatedAtIso)}.`
    : "";
  return `${when} Rankings come from official tour feeds and may be cached for several days between refreshes — not every hour.`.trim();
}