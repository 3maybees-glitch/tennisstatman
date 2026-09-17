"use client";

import Link from "next/link";
import { Download, ExternalLink, Trophy } from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { StatManMascot } from "@/components/StatManMascot";
import { TournamentImage } from "@/components/TournamentImage";
import {
  US_OPEN_CHAMPIONS,
  US_OPEN_CHAMPIONS_BLURB,
  US_OPEN_CHAMPIONS_LEDGER,
  US_OPEN_CHAMPIONS_META,
  US_OPEN_CHAMPIONS_X_CAPTION,
  type UsOpenChampionStat,
} from "@/lib/promotions/us-open-champions";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/social";

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

type Champion = (typeof US_OPEN_CHAMPIONS)["atp"] | (typeof US_OPEN_CHAMPIONS)["wta"];

function ChampionCard({ champion }: { champion: Champion }) {
  return (
    <Link
      href={champion.href}
      className="group flex flex-1 flex-col items-center rounded-2xl border border-white/10 bg-navy/40 p-4 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-navy/60 sm:p-6"
    >
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 to-sky-400/40 opacity-60 blur-sm" />
        <PlayerAvatar
          playerId={champion.playerId}
          name={champion.name}
          tour={champion.tour}
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
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-sky-300 sm:mt-5 sm:text-xs">
        {champion.tourLabel}
      </p>
      <h3 className="mt-1 text-center text-xl font-bold text-white group-hover:text-gold-light sm:text-2xl">
        {champion.name}
      </h3>
      <p className="mt-2 text-center font-mono text-base font-semibold text-gold-light sm:text-lg">
        {champion.score}
      </p>
      <p className="mt-1 text-center text-xs text-muted sm:text-sm">
        def. {champion.runnerUp}
      </p>
      <p className="mt-3 rounded-full bg-gold/10 px-3 py-1 text-center text-[11px] font-medium text-gold sm:text-xs">
        {champion.headline}
      </p>
      <dl className="mt-4 grid w-full grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {champion.stats.map((stat: UsOpenChampionStat) => (
          <div key={stat.label} className="text-center">
            <dt className="font-mono text-base font-bold text-gold-light sm:text-lg">
              {stat.value}
            </dt>
            <dd className="mt-1 text-[10px] leading-snug text-muted sm:text-[11px]">
              {stat.label}
            </dd>
          </div>
        ))}
      </dl>
    </Link>
  );
}

function VenueBackdrop({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <TournamentImage
        tournamentId={US_OPEN_CHAMPIONS_META.tournamentId}
        city={US_OPEN_CHAMPIONS_META.city}
        country={US_OPEN_CHAMPIONS_META.country}
        surface="hard"
        aspectClass="absolute inset-0"
        className="h-full w-full"
        objectPosition="center 30%"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/70 to-navy" />
    </div>
  );
}

function xIntentUrl() {
  const params = new URLSearchParams({ text: US_OPEN_CHAMPIONS_X_CAPTION });
  return `https://x.com/intent/tweet?${params.toString()}`;
}

export function UsOpenChampionsBanner() {
  const { atp, wta } = US_OPEN_CHAMPIONS;

  return (
    <section
      aria-label="2026 US Open Champions"
      className="relative overflow-hidden border-b border-sky-400/20 bg-navy"
    >
      <VenueBackdrop className="h-36 sm:h-44 md:hidden" />
      <VenueBackdrop className="pointer-events-none absolute inset-x-0 top-0 hidden h-80 md:block lg:h-96" />

      <div
        className="pointer-events-none absolute inset-0 hidden md:block"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/90 to-navy" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #38bdf8 0px, #38bdf8 1px, transparent 1px, transparent 52px), repeating-linear-gradient(90deg, #fb923c 0px, #fb923c 1px, transparent 1px, transparent 52px)",
          }}
        />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-orange-500/16 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="flex shrink-0 flex-col items-center text-center lg:w-80 lg:items-start lg:text-left">
            <StatManMascot
              size={80}
              pose="trophy"
              className="mb-3 sm:mb-4 md:hidden"
            />
            <StatManMascot
              size={100}
              pose="trophy"
              className="mb-4 hidden md:block"
            />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 sm:px-4 sm:py-1.5">
              <Trophy size={14} className="text-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gold sm:text-xs">
                {US_OPEN_CHAMPIONS_META.shortName} · {US_OPEN_CHAMPIONS_META.year}
              </span>
            </div>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:mt-4 sm:text-4xl md:text-5xl">
              <span className="bg-gradient-to-r from-sky-300 via-gold-light to-orange-300 bg-clip-text text-transparent">
                Congratulations
              </span>
              <br />
              <span className="text-white">US Open champions</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/85 sm:mt-4 sm:text-base">
              {US_OPEN_CHAMPIONS_BLURB}
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:mt-6 lg:justify-start">
              <a
                href="/api/us-open-champions"
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10"
              >
                <Download size={14} />
                Download for X
              </a>
              <a
                href={xIntentUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-medium text-gold-light transition-colors hover:bg-gold/20"
              >
                <ExternalLink size={14} />
                Post on X
              </a>
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="sr-only"
              >
                @{X_HANDLE} on X
              </a>
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-sky-500/10 via-navy-light/80 to-orange-500/10 p-4 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-6 md:p-8">
              <div className="mb-5 flex flex-col items-center gap-3 border-b border-white/10 pb-5 sm:mb-6 sm:gap-4 sm:pb-6 md:hidden">
                <TrophyIcon compact />
                <div className="text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold sm:text-xs sm:tracking-[0.25em]">
                    {US_OPEN_CHAMPIONS_META.name}
                  </p>
                  <p className="mt-1 text-base font-bold text-white sm:text-lg">
                    {US_OPEN_CHAMPIONS_META.campus} ·{" "}
                    {US_OPEN_CHAMPIONS_META.surface} · ATP / WTA
                  </p>
                </div>
              </div>

              <div className="mb-6 hidden items-center justify-center gap-4 border-b border-white/10 pb-6 md:flex">
                <TrophyIcon />
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                    {US_OPEN_CHAMPIONS_META.name}
                  </p>
                  <p className="mt-1 text-lg font-bold text-white">
                    {US_OPEN_CHAMPIONS_META.venue} ·{" "}
                    {US_OPEN_CHAMPIONS_META.surface} · Grand Slam
                  </p>
                </div>
                <TrophyIcon />
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <ChampionCard champion={atp} />
                <ChampionCard champion={wta} />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center sm:mt-6 sm:gap-4 sm:pt-6">
                {US_OPEN_CHAMPIONS_LEDGER.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-bold text-gold-light sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted sm:mt-1 sm:text-xs">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-center text-xs text-muted/70">
                Portrait card · @{X_HANDLE} · ready for X
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
