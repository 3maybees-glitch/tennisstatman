import Link from "next/link";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

type RankingEntry = {
  rank: number;
  name: string;
  country: string;
  points: number;
  change: number;
};

export function RankingsTable({
  tour,
  entries,
}: {
  tour: "ATP" | "WTA";
  entries: RankingEntry[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <h3 className="text-lg font-semibold">
          {tour === "ATP" ? "Men's" : "Women's"} Top 5
        </h3>
        <Link
          href={tour === "ATP" ? "/atp" : "/wta"}
          className="text-sm text-gold hover:text-gold-light"
        >
          Full tour →
        </Link>
      </div>
      <table className="w-full">
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
            <tr
              key={entry.rank}
              className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
            >
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
