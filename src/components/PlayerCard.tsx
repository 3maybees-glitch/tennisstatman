import Link from "next/link";
import { SkillRadar } from "./SkillRadar";
import { PulseSpark } from "./PulseSpark";
import { GradeChip, StarRating } from "./GradeChip";
import { PlayerAvatar } from "./PlayerAvatar";
import {
  SKILL_LABELS,
  SKILL_ORDER,
  overallScore,
  starRating,
} from "@/lib/data/grades";
import { currentPulse, pulseTrend, type Player } from "@/lib/data/players";
import { getLegend } from "@/lib/data/legends";
import { TrendingDown, TrendingUp } from "lucide-react";

export function PlayerCard({
  player,
  compact = false,
}: {
  player: Player;
  compact?: boolean;
}) {
  const pulse = currentPulse(player);
  const trend = pulseTrend(player);
  const overall = overallScore(player.skills);
  const legend = getLegend(player.legendMatch.legendId);
  const tourColor = player.tour === "ATP" ? "#40916c" : "#8b5cf6";

  return (
    <Link
      href={`/players/${player.id}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-navy-light transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_8px_40px_rgba(212,175,55,0.15)]"
    >
      {/* Card header strip */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          background: `linear-gradient(90deg, ${tourColor}33, transparent)`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider"
            style={{ backgroundColor: `${tourColor}44`, color: "#e8edf5" }}
          >
            {player.tour}
          </span>
          <span className="font-mono text-xs text-muted">#{player.rank}</span>
        </div>
        <StarRating stars={starRating(player.skills)} size={13} />
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-start gap-4">
          <PlayerAvatar
            playerId={player.id}
            name={player.name}
            tour={player.tour}
            size={72}
          />
          <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-bold leading-tight group-hover:text-gold-light">
                {player.name}
              </h3>
              <p className="mt-0.5 text-xs text-muted">
                {player.country} · {player.playstyle}
              </p>
            </div>
            <div className="shrink-0 rounded-xl border border-white/10 bg-navy px-3 py-2 text-center">
              <p className="text-[10px] uppercase tracking-wider text-muted">
                Overall
              </p>
              <p className="font-mono text-xl font-bold text-gold-light">
                {overall}
              </p>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="-mx-2 mt-2">
            <SkillRadar
              series={[
                { name: player.name, skills: player.skills, color: tourColor },
              ]}
              height={190}
            />
          </div>
        )}

        {compact && (
          <div className="mt-4 grid grid-cols-1 gap-1.5">
            {SKILL_ORDER.slice(0, 3).map((key) => (
              <GradeChip
                key={key}
                label={SKILL_LABELS[key]}
                score={player.skills[key]}
              />
            ))}
          </div>
        )}

        {/* PULSE strip */}
        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-navy px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted">
              PULSE
            </p>
            <p className="flex items-center gap-1.5 font-mono text-lg font-bold">
              {pulse}
              {trend >= 0 ? (
                <TrendingUp size={14} className="text-court-light" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
            </p>
          </div>
          <PulseSpark history={player.pulseHistory} width={110} height={34} />
        </div>

        {legend && (
          <p className="mt-3 text-xs text-muted">
            Legend match:{" "}
            <span className="text-gold-light">
              {player.legendMatch.similarity}% {legend.name}
            </span>
          </p>
        )}
      </div>
    </Link>
  );
}
