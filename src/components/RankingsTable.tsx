import Link from "next/link";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import type { RankingEntry, RankingsSnapshot } from "@/lib/rankings/types";
import { RankingsSourceBadge } from "./RankingsSourceBadge";

export function RankingsTable({
  snapshot,
  limit,
  showSource = false,
  fullPageLink,
}: {
  snapshot: RankingsSnapshot;
  limit?: number;
  showSource?: boolean;
  fullPageLink?: boolean;
}) {
  const entries = limit ? snapshot.entries.slice(0, limit) : snapshot.entries;
  const title =
    limit && limit < snapshot.entries.length
      ? `${snapshot.tour === "ATP" ? "Men's" : "Women's"} Top ${limit}`
      : snapshot.entries.length >= 100
        ? `${snapshot.tour === "ATP" ? "Men's" : "Women's"} Top 100`
        : `${snapshot.tour === "ATP" ? "Men's" : "Women's"} Singles Rankings`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          {fullPageLink && (
            <Link href="/rankings" className="text-sm text-gold hover:text-gold-light">
              Full rankings →
            </Link>
          )}
        </div>
        {showSource && (
          <div className="mt-4">
            <RankingsSourceBadge
              source={snapshot.source}
              sourceUrl={snapshot.sourceUrl}
              updatedAt={snapshot.updatedAt}
              warning={snapshot.warning}
            />
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-white/5 text-left text-xs uppercase tracking-wider text-muted">
              <th className="px-6 py-3 font-medium">#</th>
              <th className="px-6 py-3 font-medium">Player</th>
              <th className="px-6 py-3 font-medium">Pts</th>
              <th className="px-6 py-3 font-medium">Δ</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <RankingRow key={`${snapshot.tour}-${entry.rank}-${entry.name}`} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
      {!limit && (
        <div className="border-t border-white/5 px-6 py-3 text-sm text-muted">
          Showing {entries.length} players
        </div>
      )}
    </div>
  );
}

function RankingRow({ entry }: { entry: RankingEntry }) {
  return (
    <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
      <td className="px-6 py-4 font-mono text-gold">{entry.rank}</td>
      <td className="px-6 py-4">
        <span className="font-medium">{entry.name}</span>
        <span className="ml-2 text-xs text-muted">{entry.country}</span>
      </td>
      <td className="px-6 py-4 font-mono text-sm">
        {entry.points.toLocaleString()}
      </td>
      <td className="px-6 py-4">
        {entry.change > 0 && (
          <span className="flex items-center gap-0.5 text-sm text-green-400">
            <ArrowUp size={14} /> {entry.change}
          </span>
        )}
        {entry.change < 0 && (
          <span className="flex items-center gap-0.5 text-sm text-red-400">
            <ArrowDown size={14} /> {Math.abs(entry.change)}
          </span>
        )}
        {entry.change === 0 && (
          <span className="flex items-center text-muted">
            <Minus size={14} />
          </span>
        )}
      </td>
    </tr>
  );
}
