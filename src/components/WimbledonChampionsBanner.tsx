import Link from "next/link";
import { Trophy } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { StatManMascot } from "@/components/StatManMascot";
import { TournamentImage } from "@/components/TournamentImage";
import { tournaments } from "@/lib/data/tournaments";

const CHAMPIONS = {
  atp: {
    id: "jannik-sinner",
    name: "Jannik Sinner",
    tour: "ATP" as const,
    href: "/players/jannik-sinner",
    stat: "Back-to-back champion",
  },
  wta: {
    id: "linda-noskova",
    name: "Linda Nosková",
    tour: "WTA" as const,
    href: "/players/linda-noskova",
    stat: "First Grand Slam title",
  },
};

function TrophyIcon() {
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <div className="absolute h-20 w-20 rounded-full bg-gold/20 blur-xl" />
      <Trophy
        size={56}
        className="relative text-gold-light drop-shadow-[0_0_12px_rgba(240,199,94,0.5)]"
        strokeWidth={1.5}
        fill="currentColor"
        fillOpacity={0.15}
      />
    </div>
  );
}

function ChampionCard({
  name,
  playerId,
  tour,
  href,
  score,
  runnerUp,
  stat,
}: {
  name: string;
  playerId: string;
  tour: "ATP" | "WTA";
  href: string;
  score: string;
  runnerUp: string;
  stat: string;
}) {
  const tourLabel = tour === "ATP" ? "Gentlemen's Singles" : "Ladies' Singles";

  return (
    <Link
      href={href}
      className="group flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-navy/40 p-6 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-navy/60"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-court-green-light/40 opacity-60 blur-sm" />
        <PlayerAvatar
          playerId={playerId}
          name={name}
          tour={tour}
          size={112}
          priority
          className="relative ring-4 ring-gold/30"
        />
        <div className="absolute -bottom-2 -right-2 rounded-full bg-gold p-1.5 shadow-lg">
          <Trophy size={18} className="text-navy" strokeWidth={2.5} />
        </div>
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-widest text-court-green-light">
        {tourLabel}
      </p>
      <h3 className="mt-1 text-2xl font-bold text-white group-hover:text-gold-light">
        {name}
      </h3>
      <p className="mt-2 font-mono text-lg font-semibold text-gold-light">
        {score}
      </p>
      <p className="mt-1 text-sm text-muted">def. {runnerUp}</p>
      <p className="mt-3 rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
        {stat}
      </p>
    </Link>
  );
}

export function WimbledonChampionsBanner() {
  const wimbledon = tournaments.find((t) => t.id === "wimbledon");
  if (!wimbledon) return null;

  const atpFinal = wimbledon.lastFinals.find((f) => f.tour === "ATP");
  const wtaFinal = wimbledon.lastFinals.find((f) => f.tour === "WTA");
  if (!atpFinal || !wtaFinal) return null;

  return (
    <section
      aria-label="2026 Wimbledon Champions"
      className="relative overflow-hidden border-b border-court-green-light/20"
    >
      {/* Wimbledon venue backdrop */}
      <div className="absolute inset-0">
        <TournamentImage
          tournamentId="wimbledon"
          city={wimbledon.city}
          country={wimbledon.country}
          surface="grass"
          aspectClass="aspect-auto h-full min-h-[480px]"
          className="h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #6b238e 0px, #6b238e 2px, transparent 2px, transparent 40px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Copy + mascot */}
          <div className="flex shrink-0 flex-col items-center text-center lg:w-72 lg:items-start lg:text-left">
            <StatManMascot size={100} pose="trophy" className="mb-4" />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
              <Trophy size={14} className="text-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                The Championships · 2026
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              <span className="gradient-text">Wimbledon</span>
              <br />
              <span className="text-white">Champions</span>
            </h2>
            <p className="mt-4 max-w-sm leading-relaxed text-foreground/85">
              Jannik Sinner and Linda Nosková lifted the Venus Rosewater Dish
              and Gentlemen&apos;s Singles Trophy on Centre Court. Two grass-court
              masterclasses, one unforgettable fortnight.
            </p>
            <Link
              href="/calendar"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
            >
              Full 2026 calendar →
            </Link>
          </div>

          {/* Infographic */}
          <div className="flex-1">
            <div className="overflow-hidden rounded-3xl border border-gold/25 bg-gradient-to-br from-gold/10 via-navy-light/80 to-court-green/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="mb-6 flex items-center justify-center gap-4 border-b border-white/10 pb-6">
                <TrophyIcon />
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                    All England Club
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    London · Grass · Grand Slam
                  </p>
                </div>
                <TrophyIcon />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ChampionCard
                  name={CHAMPIONS.atp.name}
                  playerId={CHAMPIONS.atp.id}
                  tour={CHAMPIONS.atp.tour}
                  href={CHAMPIONS.atp.href}
                  score={atpFinal.score}
                  runnerUp={atpFinal.runnerUp}
                  stat={CHAMPIONS.atp.stat}
                />
                <ChampionCard
                  name={CHAMPIONS.wta.name}
                  playerId={CHAMPIONS.wta.id}
                  tour={CHAMPIONS.wta.tour}
                  href={CHAMPIONS.wta.href}
                  score={wtaFinal.score}
                  runnerUp={wtaFinal.runnerUp}
                  stat={CHAMPIONS.wta.stat}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
                <div>
                  <p className="text-2xl font-bold text-gold-light">128</p>
                  <p className="mt-1 text-xs text-muted">Draw size</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gold-light">£53.5M</p>
                  <p className="mt-1 text-xs text-muted">Prize fund</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gold-light">Grass</p>
                  <p className="mt-1 text-xs text-muted">Surface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
