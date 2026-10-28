import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy } from "lucide-react";
import { StatManMascot } from "@/components/StatManMascot";
import { TournamentImage } from "@/components/TournamentImage";
import {
  FINALS_SWING_BLURB,
  FINALS_SWING_STOPS,
} from "@/lib/promotions/finals-swing";

export function FinalsSwingBanner() {
  return (
    <section
      aria-label="Paris Masters, WTA Finals, and the Race to Turin"
      className="relative overflow-hidden border-b border-gold/20"
    >
      <div className="absolute inset-0">
        <TournamentImage
          tournamentId="paris-masters"
          city="Paris"
          country="France"
          surface="indoor"
          aspectClass="aspect-auto h-full min-h-[520px]"
          className="h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/94 to-navy/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/55" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex shrink-0 flex-col items-center text-center lg:w-80 lg:items-start lg:text-left">
            <StatManMascot size={96} pose="stopwatch" className="mb-4" />
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/15 px-4 py-1.5">
              <Trophy size={14} className="text-gold" />
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-light">
                Indoor swing · 2026
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              <span className="gradient-text">Paris to</span>
              <br />
              <span className="text-white">the Finals</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/85 sm:text-base">
              {FINALS_SWING_BLURB}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/calendar"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                <CalendarDays size={16} />
                Season calendar
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/race"
                className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                Race chart
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid flex-1 gap-4 sm:grid-cols-3">
            {FINALS_SWING_STOPS.map((stop) => (
              <Link
                key={stop.id}
                href="/calendar"
                className="group flex flex-col rounded-2xl border border-white/10 bg-navy/60 p-5 backdrop-blur-md transition-all hover:border-gold/40 hover:bg-navy/75"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">
                  {stop.kicker}
                </p>
                <h3 className="mt-2 text-xl font-bold text-white group-hover:text-gold-light">
                  {stop.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{stop.where}</p>
                <p className="mt-4 font-mono text-sm font-semibold text-gold-light">
                  {stop.when}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                  {stop.detail}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
