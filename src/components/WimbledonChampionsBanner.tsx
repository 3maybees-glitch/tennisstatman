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

function TrophyIcon({ compact = false }: { compact?: boolean }) {
  const glowSize = compact ? "h-12 w-12" : "h-20 w-20";
  const iconSize = compact ? 36 : 56;

  return (
    <div className="relative flex shrink-0 items-center justify-center">
      <div className={`absolute ${glowSize} rounded-full bg-gold/20 blur-xl`} />
      <Trophy
        size={iconSize}
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
      className="group flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-navy/40 p-4 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-navy/60 sm:p-6"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-court-green-light/40 opacity-60 blur-sm" />
        <PlayerAvatar
          playerId={playerId}
          name={name}
          tour={tour}
          size={96}
          priority
          className="relative ring-4 ring-gold/30"
        />
        <div className="absolute -bottom-1.5 -right-1.5 rounded-full bg-gold p-1 shadow-lg sm:-bottom-2 sm:-right-2 sm:p-1.5">
          <Trophy size={14} className="text-navy sm:hidden" strokeWidth={2.5} />
          <Trophy
            size={18}
            className="hidden text-navy sm:block"
            strokeWidth={2.5}
          />
        </div>
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-court-green-light sm:mt-5 sm:text-xs">
        {tourLabel}
      </p>
      <h3 className="mt-1 text-center text-xl font-bold text-white group-hover:text-gold-light sm:text-2xl">
        {name}
      </h3>
      <p className="mt-2 font-mono text-base font-semibold text-gold-light sm:text-lg">
        {score}
      </p>
      <p className="mt-1 text-center text-xs text-muted sm:text-sm">
        def. {runnerUp}
      </p>
      <p className="mt-3 rounded-full bg-gold/10 px-3 py-1 text-center text-[11px] font-medium text-gold sm:text-xs">
        {stat}
      </p>
    </Link>
  );
}

function VenueBackdrop({
  city,
  country,
  className = "",
}: {
  city: string;
  country: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <TournamentImage
        tournamentId="wimbledon"
        city={city}
        country={country}
        surface="grass"
        aspectClass="absolute inset-0"
        className="h-full w-full"
        objectPosition="center 35%"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/70 to-navy" />
    </div>
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
      className="relative overflow-hidden border-b border-court-green-light/20 bg-navy"
    >
      {/* Mobile: short skyline strip — never stretch a photo across the full section */}
      <VenueBackdrop
        city={wimbledon.city}
        country={wimbledon.country}
        className="h-36 sm:h-44 md:hidden"
      />

      {/* Desktop: bounded hero band behind the header area */}
      <VenueBackdrop
        city={wimbledon.city}
        country={wimbledon.country}
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-80 md:block lg:h-96"
      />

      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/90 to-navy" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #6b238e 0px, #6b238e 2px, transparent 2px, transparent 40px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-14">
          {/* Copy + mascot */}
          <div className="flex shrink-0 flex-col items-center text-center lg:w-72 lg:items-start lg:text-left">
            <StatManMascot size={80} pose="trophy" className="mb-3 sm:mb-4 md:hidden" />
            <StatManMascot
              size={100}
              pose="trophy"
              className="mb-4 hidden md:block"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 sm:px-4 sm:py-1.5">
              <Trophy size={14} className="text-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gold sm:text-xs">
                The Championships · 2026
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
              <span className="gradient-text">Wimbledon</span>
              <br />
              <span className="text-white">Champions</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/85 sm:mt-4 sm:text-base">
              Jannik Sinner and Linda Nosková lifted the Venus Rosewater Dish
              and Gentlemen&apos;s Singles Trophy on Centre Court. Two grass-court
              masterclasses, one unforgettable fortnight.
            </p>
            <Link
              href="/calendar"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light sm:mt-6"
            >
              Full 2026 calendar →
            </Link>
          </div>

          {/* Infographic */}
          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/10 via-navy-light/80 to-court-green/10 p-4 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8">
              {/* Mobile: single trophy above venue label */}
              <div className="mb-5 flex flex-col items-center gap-3 border-b border-white/10 pb-5 sm:mb-6 sm:gap-4 sm:pb-6 md:hidden">
                <TrophyIcon compact />
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.25em]">
                    All England Club
                  </p>
                  <p className="mt-1 text-base font-bold text-white sm:text-lg">
                    London · Grass · Grand Slam
                  </p>
                </div>
              </div>

              {/* Tablet+: dual trophy header */}
              <div className="mb-6 hidden items-center justify-center gap-4 border-b border-white/10 pb-6 md:flex">
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

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
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

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center sm:mt-6 sm:gap-4 sm:pt-6">
                <div>
                  <p className="text-lg font-bold text-gold-light sm:text-2xl">128</p>
                  <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                    Draw size
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gold-light sm:text-2xl">
                    £53.5M
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                    Prize fund
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gold-light sm:text-2xl">
                    Grass
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                    Surface
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
