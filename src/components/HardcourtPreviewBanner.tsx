import Link from "next/link";
import { ArrowRight, CalendarDays, Zap } from "lucide-react";
import { StatManMascot } from "@/components/StatManMascot";
import { TournamentImage } from "@/components/TournamentImage";
import { tournaments } from "@/lib/data/tournaments";

const ROAD = [
  {
    id: "canadian-open",
    short: "Canada",
    label: "National Bank Open",
    when: "Aug 1–9",
    hook: "Shelton & Mboko defending",
  },
  {
    id: "cincinnati-open",
    short: "Cincy",
    label: "Cincinnati Open",
    when: "Aug 10–19",
    hook: "Alcaraz & Świątek hold titles",
  },
  {
    id: "us-open",
    short: "US Open",
    label: "Flushing Meadows",
    when: "Aug 31–Sep 13",
    hook: "Alcaraz & Sabalenka return",
  },
] as const;

const STAT_CALLS = [
  {
    value: "95",
    label: "Sinner PULSE",
    detail: "Tour-high form score entering the swing",
  },
  {
    value: "91%",
    label: "Fritz holds",
    detail: "Hard-court service holds — top three for three seasons",
  },
  {
    value: "+9%",
    label: "Sabalenka winners",
    detail: "More winners than anyone else in the WTA top 20",
  },
  {
    value: "2",
    label: "Alcaraz titles",
    detail: "Defending Cincinnati + US Open champion",
  },
] as const;

export function HardcourtPreviewBanner() {
  const usOpen = tournaments.find((t) => t.id === "us-open");
  if (!usOpen) return null;

  return (
    <section
      aria-label="Hardcourt preview: road to the US Open"
      className="relative overflow-hidden border-b border-court-green-light/20"
    >
      <div className="absolute inset-0">
        <TournamentImage
          tournamentId="us-open"
          city={usOpen.city}
          country={usOpen.country}
          surface="hard"
          aspectClass="aspect-auto h-full min-h-[520px]"
          className="h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/94 to-navy/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/55" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #40916c 0px, #40916c 1px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, #40916c 0px, #40916c 1px, transparent 1px, transparent 48px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-14 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex shrink-0 flex-col items-center text-center lg:w-80 lg:items-start lg:text-left">
            <StatManMascot size={96} pose="wave" className="mb-4" />
            <div className="inline-flex items-center gap-2 rounded-full border border-court-green-light/35 bg-court/20 px-4 py-1.5">
              <Zap size={14} className="text-court-green-light" />
              <span className="text-xs font-semibold uppercase tracking-widest text-court-green-light">
                Hardcourt Preview · 2026
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              <span className="gradient-text">Road to</span>
              <br />
              <span className="text-white">Flushing</span>
            </h2>
            <Link
              href="/calendar"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
            >
              Full hardcourt calendar
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="flex-1 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-court-green-light/25 bg-gradient-to-br from-court/15 via-navy-light/85 to-gold/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-gold" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    Three stops · One slam
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {usOpen.prizeMoney} prize fund waiting in Queens
                </p>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-foreground/90 md:text-[17px]">
                <p>
                  Grass is packed — and the North American hard courts will sort
                  the field before New York. Jannik Sinner enters the swing with
                  a tour-high{" "}
                  <span className="font-semibold text-gold-light">95 PULSE</span>
                  , while Carlos Alcaraz returns as the defending champion of
                  both Cincinnati and the US Open. Aryna Sabalenka still owns the
                  Flushing Meadows trophy and is hitting{" "}
                  <span className="font-semibold text-gold-light">
                    9% more winners
                  </span>{" "}
                  than anyone else in the WTA top 20. The road runs Canada (Aug
                  1–9) → Cincinnati (Aug 10–19) → Arthur Ashe (Aug 31), with a{" "}
                  {usOpen.prizeMoney} prize fund waiting at the finish.
                </p>
                <p>
                  Home hard courts should amplify the Americans: Taylor Fritz has
                  held serve{" "}
                  <span className="font-semibold text-gold-light">91%</span> of
                  the time on hard for three straight seasons, Ben Shelton brings
                  the tour&apos;s loudest lefty serve as the defending National
                  Bank Open champion, and Coco Gauff converts{" "}
                  <span className="font-semibold text-gold-light">
                    62% of deciding sets
                  </span>
                  . Keep an eye on the climbers too — Jack Draper&apos;s{" "}
                  <span className="font-semibold text-gold-light">
                    23-point PULSE rise
                  </span>{" "}
                  over the past year and Mirra Andreeva&apos;s teenage{" "}
                  <span className="font-semibold text-gold-light">94 PULSE</span>{" "}
                  mean the undercard stays loud all the way to Queens.
                </p>
              </div>

              <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-3">
                {ROAD.map((stop, i) => (
                  <Link
                    key={stop.id}
                    href="/calendar"
                    className="group relative rounded-2xl border border-white/10 bg-navy/50 p-4 transition-all hover:border-gold/35 hover:bg-navy/70"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-court-green-light">
                      Stop {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white group-hover:text-gold-light">
                      {stop.short}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted">{stop.label}</p>
                    <p className="mt-3 font-mono text-sm font-semibold text-gold-light">
                      {stop.when}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-foreground/80">
                      {stop.hook}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-gold/20 bg-navy-light/70 p-6 backdrop-blur-md md:p-7">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Stat Man&apos;s hardcourt ledger
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STAT_CALLS.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/5 bg-navy/40 px-4 py-4"
                  >
                    <p className="text-3xl font-bold text-gold-light">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
