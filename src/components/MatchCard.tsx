import Link from "next/link";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import type { MatchPreview } from "@/lib/data/mock-matches";
import { MomentumChart } from "./MomentumChart";

export function MatchCard({ match }: { match: MatchPreview }) {
  return (
    <article className="glow-green overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
      <div className="border-b border-white/5 px-6 py-4">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              match.tour === "ATP"
                ? "bg-accent/20 text-blue-300"
                : "bg-pink-500/20 text-pink-300"
            }`}
          >
            {match.tour}
          </span>
          <span className="text-xs text-muted">
            {match.tournament} · {match.round}
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">
              {match.player1.name}
              {match.player1.seed && (
                <span className="ml-1 text-xs text-muted">[{match.player1.seed}]</span>
              )}
            </p>
            <p className="mt-1 font-semibold">
              {match.player2.name}
              {match.player2.seed && (
                <span className="ml-1 text-xs text-muted">[{match.player2.seed}]</span>
              )}
            </p>
          </div>
          <p className="text-right font-mono text-lg text-gold-light">{match.score}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-b border-white/5 px-6 py-4">
        <div>
          <p className="flex items-center gap-1 text-xs text-muted">
            <Zap size={12} className="text-gold" /> Swings
          </p>
          <p className="mt-1 text-xl font-bold">{match.momentumSwings}</p>
        </div>
        <div>
          <p className="flex items-center gap-1 text-xs text-muted">
            <TrendingUp size={12} className="text-court-light" /> Clutch
          </p>
          <p className="mt-1 text-xl font-bold">{match.clutchIndex}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Pressure pts</p>
          <p className="mt-1 text-sm font-medium">
            {match.pressurePointsWon.p1}% / {match.pressurePointsWon.p2}%
          </p>
        </div>
      </div>

      <div className="p-6">
        <MomentumChart
          data={match.momentumData}
          player1Name={match.player1.name.split(" ").pop() ?? match.player1.name}
          player2Name={match.player2.name.split(" ").pop() ?? match.player2.name}
          height={220}
        />
        <Link
          href="/stats/momentum"
          className="mt-4 inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light"
        >
          Explore momentum analysis
          <ArrowRight size={14} />
        </Link>
      </div>
    </article>
  );
}
