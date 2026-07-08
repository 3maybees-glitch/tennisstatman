import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GradeChip, StarRating } from "@/components/GradeChip";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { PulseHistoryChart } from "@/components/PulseHistoryChart";
import { SkillRadar } from "@/components/SkillRadar";
import { StatManMascot } from "@/components/StatManMascot";
import { UpgradeCTA } from "@/components/UpgradeCTA";
import {
  SKILL_LABELS,
  SKILL_ORDER,
  overallScore,
  starRating,
} from "@/lib/data/grades";
import { getLegend } from "@/lib/data/legends";
import { currentPulse, players, pulseTrend } from "@/lib/data/players";
import { findRosterPlayer } from "@/lib/data/roster";
import { ArrowLeft, MapPin, Sparkles, Swords } from "lucide-react";

export const revalidate = 3600;

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return players.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const player = await findRosterPlayer(id);
  if (!player) return { title: "Player not found" };
  return {
    title: `${player.name} — Player Card`,
    description: `Scouting grades, PULSE score, and Stat Man's verdict on ${player.name}.`,
  };
}

export default async function PlayerDetailPage({ params }: PageProps) {
  const { id } = await params;
  const player = await findRosterPlayer(id);
  if (!player) notFound();

  const pulse = currentPulse(player);
  const trend = pulseTrend(player);
  const overall = overallScore(player.skills);
  const legend = getLegend(player.legendMatch.legendId);
  const tourColor = player.tour === "ATP" ? "#40916c" : "#8b5cf6";

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/players"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft size={15} /> All player cards
          </Link>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-wrap items-end gap-6">
              <PlayerAvatar
                playerId={player.id}
                name={player.name}
                tour={player.tour}
                size={120}
                priority
              />
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="rounded px-2 py-0.5 text-xs font-bold tracking-wider text-white"
                    style={{ backgroundColor: tourColor }}
                  >
                    {player.tour} #{player.rank}
                  </span>
                  <StarRating stars={starRating(player.skills)} />
                  {player.generated && (
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-muted">
                      Auto-scouted
                    </span>
                  )}
                </div>
                <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                  {player.name}
                </h1>
                <p className="mt-2 flex items-center gap-2 text-muted">
                  <MapPin size={15} />
                  {player.origin.city} · Age {player.age} ·{" "}
                  {player.hand === "R" ? "Right" : "Left"}-handed ·{" "}
                  <span className="text-gold-light">{player.playstyle}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="rounded-2xl border border-white/10 bg-navy px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-wider text-muted">
                  Overall
                </p>
                <p className="font-mono text-3xl font-bold text-gold-light">
                  {overall}
                </p>
              </div>
              <div className="rounded-2xl border border-gold/25 bg-gold/5 px-6 py-4 text-center">
                <p className="text-xs uppercase tracking-wider text-muted">
                  PULSE
                </p>
                <p className="font-mono text-3xl font-bold text-gold-light">
                  {pulse}
                  <span
                    className={`ml-1 text-sm ${trend >= 0 ? "text-court-light" : "text-red-400"}`}
                  >
                    {trend >= 0 ? `+${trend}` : trend}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Skill profile */}
          <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
            <h2 className="font-semibold">Skill Profile</h2>
            <SkillRadar
              series={[
                { name: player.name, skills: player.skills, color: tourColor },
              ]}
              height={240}
            />
            <div className="mt-2 grid gap-2">
              {SKILL_ORDER.map((key) => (
                <GradeChip
                  key={key}
                  label={SKILL_LABELS[key]}
                  score={player.skills[key]}
                />
              ))}
            </div>
          </div>

          {/* PULSE + fun stat */}
          <div className="space-y-6">
            <div className="glow-gold rounded-2xl border border-white/10 bg-navy-light p-6">
              <h2 className="font-semibold">PULSE — last 12 months</h2>
              <p className="mt-1 text-xs text-muted">
                Performance Under Load & Streak Evaluation · updated after
                every match
              </p>
              <div className="mt-4">
                <PulseHistoryChart history={player.pulseHistory} />
              </div>
            </div>
            <div className="rounded-2xl border border-court/25 bg-court/5 p-6">
              <h3 className="flex items-center gap-2 font-semibold text-court-light">
                <Sparkles size={16} /> Fun stat
              </h3>
              <p className="mt-2 text-sm leading-relaxed">{player.funStat}</p>
            </div>
          </div>

          {/* Verdict + legend */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-gold/25 bg-navy-light p-6">
              <div className="flex items-center gap-3">
                <StatManMascot size={56} mood="thinking" />
                <h2 className="font-semibold text-gold-light">
                  Stat Man&apos;s Verdict
                </h2>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">
                {player.verdict}
              </p>
            </div>

            {legend && (
              <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Swords size={16} className="text-gold" /> Legend Match
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Closest all-time comparison by skill profile:
                </p>
                <p className="mt-3 text-2xl font-bold text-gold-light">
                  {player.legendMatch.similarity}%{" "}
                  <span className="text-foreground">{legend.name}</span>
                </p>
                <p className="mt-1 text-xs text-muted">
                  {legend.era} · {legend.slams} Slams · {legend.signature}
                </p>
                <SkillRadar
                  series={[
                    {
                      name: player.name,
                      skills: player.skills,
                      color: tourColor,
                    },
                    {
                      name: legend.name,
                      skills: legend.skills,
                      color: "#d4af37",
                    },
                  ]}
                  height={220}
                  showLegend
                />
                <Link
                  href={`/legends?player=${player.id}`}
                  className="mt-3 inline-block text-sm text-gold hover:text-gold-light"
                >
                  Full legend comparison →
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <UpgradeCTA description="Courtside members get full PULSE archives, matchup projections against any player, and AI scouting reports down to the ITF level." />
        </div>
      </section>
    </div>
  );
}
