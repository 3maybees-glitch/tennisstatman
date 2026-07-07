import type { RankingSource } from "@/lib/rankings/types";

const sourceLabels: Record<RankingSource, string> = {
  "official-api": "Official ATP API",
  "official-html": "Official WTA page",
  "tennis-api": "Tennis API (RapidAPI)",
  fallback: "Fallback data",
};

const sourceStyles: Record<RankingSource, string> = {
  "official-api": "bg-court/20 text-court-light",
  "official-html": "bg-pink-500/20 text-pink-300",
  "tennis-api": "bg-accent/20 text-blue-300",
  fallback: "bg-amber-500/20 text-amber-300",
};

const sourceLinkLabels: Record<RankingSource, string> = {
  "official-api": "Official source →",
  "official-html": "Official source →",
  "tennis-api": "Tennis API →",
  fallback: "Learn more →",
};

export function RankingsSourceBadge({
  source,
  sourceUrl,
  updatedAt,
  warning,
}: {
  source: RankingSource;
  sourceUrl: string;
  updatedAt: string;
  warning?: string;
}) {
  const updated = new Date(updatedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${sourceStyles[source]}`}
        >
          {sourceLabels[source]}
        </span>
        <span className="text-muted">Updated {updated}</span>
        <a
          href={sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-gold hover:text-gold-light"
        >
          {sourceLinkLabels[source]}
        </a>
      </div>
      {source === "tennis-api" && (
        <p className="text-xs text-muted">
          Cached for 24 hours to stay within the free tier (50 requests/day). No
          live endpoints are used.
        </p>
      )}
      {warning && (
        <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          {warning}
        </p>
      )}
    </div>
  );
}
