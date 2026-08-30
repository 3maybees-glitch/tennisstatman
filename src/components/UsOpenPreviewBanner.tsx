import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Download,
  ExternalLink,
  Flame,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { PulseSpark } from "@/components/PulseSpark";
import { StatManMascot } from "@/components/StatManMascot";
import { TournamentImage } from "@/components/TournamentImage";
import { tournaments } from "@/lib/data/tournaments";
import {
  getUsOpenCategories,
  getUsOpenPulseBoard,
  US_OPEN_LEDGER,
  US_OPEN_META,
  US_OPEN_OVERVIEW,
  usOpenXCaption,
  type UsOpenCategory,
  type UsOpenCategoryId,
  type UsOpenPick,
} from "@/lib/promotions/us-open-preview";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/social";

const CATEGORY_THEME: Record<
  UsOpenCategoryId,
  { ring: string; chip: string; bar: string; glow: string }
> = {
  first: {
    ring: "ring-orange-400/40",
    chip: "border-orange-400/40 bg-orange-500/15 text-orange-200",
    bar: "from-orange-400 to-amber-300",
    glow: "bg-orange-400/20",
  },
  veteran: {
    ring: "ring-gold/40",
    chip: "border-gold/35 bg-gold/10 text-gold-light",
    bar: "from-gold to-gold-light",
    glow: "bg-gold/20",
  },
  surprise: {
    ring: "ring-violet-400/40",
    chip: "border-violet-400/40 bg-violet-500/15 text-violet-200",
    bar: "from-violet-400 to-fuchsia-300",
    glow: "bg-violet-400/20",
  },
  locked: {
    ring: "ring-sky-400/40",
    chip: "border-sky-400/40 bg-sky-500/15 text-sky-200",
    bar: "from-sky-400 to-cyan-300",
    glow: "bg-sky-400/20",
  },
};

function xIntentUrl() {
  const params = new URLSearchParams({ text: usOpenXCaption() });
  return `https://x.com/intent/tweet?${params.toString()}`;
}

function formatTrend(trend: number): string {
  if (trend > 0) return `+${trend}`;
  return `${trend}`;
}

function PulseNightBoard({
  board,
  categories,
}: {
  board: UsOpenPick[];
  categories: UsOpenCategory[];
}) {
  const categoryOf = new Map<string, UsOpenCategoryId>();
  for (const category of categories) {
    categoryOf.set(category.man.id, category.id);
    categoryOf.set(category.woman.id, category.id);
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-sky-400/25 bg-gradient-to-br from-sky-950/80 via-navy-light/90 to-orange-950/40 p-5 shadow-2xl backdrop-blur-md md:p-7">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">
            Infographic 01 · PULSE night board
          </p>
          <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">
            Form into Flushing
          </h3>
        </div>
        <Link
          href="/stats/pulse"
          className="text-sm font-medium text-gold hover:text-gold-light"
        >
          Full PULSE leaderboard →
        </Link>
      </div>

      <div className="space-y-3">
        {board.map((pick, index) => {
          const categoryId = categoryOf.get(pick.id) ?? "locked";
          const theme = CATEGORY_THEME[categoryId];
          const width = `${Math.max(18, pick.pulse)}%`;
          return (
            <Link
              key={pick.id}
              href={pick.href}
              className="group block rounded-2xl border border-white/10 bg-navy/45 px-3 py-2.5 transition-colors hover:border-white/20 hover:bg-navy/70"
            >
              <div className="mb-1.5 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-5 font-mono text-xs text-sky-300/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <PlayerAvatar
                    playerId={pick.id}
                    name={pick.name}
                    tour={pick.tour}
                    size={36}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white group-hover:text-gold-light">
                      {pick.name}
                    </p>
                    <p className="text-[11px] text-muted">
                      {pick.tour} · {pick.seedLabel}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <PulseSpark history={pick.pulseHistory} width={72} height={22} />
                  <div className="text-right">
                    <p className="font-mono text-lg font-bold text-gold-light">
                      {pick.pulse}
                    </p>
                    <p
                      className={`text-[11px] font-mono ${
                        pick.trend >= 0 ? "text-sky-300" : "text-orange-300"
                      }`}
                    >
                      {formatTrend(pick.trend)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.bar}`}
                  style={{ width }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function FlushingLedger() {
  return (
    <div className="overflow-hidden rounded-3xl border border-orange-400/25 bg-gradient-to-br from-orange-950/50 via-navy-light/90 to-sky-950/70 p-5 shadow-2xl backdrop-blur-md md:p-7">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-200">
        Infographic 02 · Flushing ledger
      </p>
      <h3 className="mt-1 text-xl font-bold text-white md:text-2xl">
        The New York numbers
      </h3>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {US_OPEN_LEDGER.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-navy/50 px-3 py-4 text-center"
          >
            <p className="font-mono text-xl font-bold text-orange-200 sm:text-2xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[11px] leading-snug text-muted sm:text-xs">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PickCard({
  pick,
  categoryId,
  side,
}: {
  pick: UsOpenPick;
  categoryId: UsOpenCategoryId;
  side: "Man" | "Woman";
}) {
  const theme = CATEGORY_THEME[categoryId];

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy/45 p-4 backdrop-blur-sm sm:p-5">
      <div className="flex items-start gap-3">
        <div className="relative">
          <div
            className={`absolute -inset-1 rounded-full blur-md ${theme.glow}`}
          />
          <PlayerAvatar
            playerId={pick.id}
            name={pick.name}
            tour={pick.tour}
            size={64}
            className={`relative ${theme.ring} ring-2`}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            {side} · {pick.tour}
          </p>
          <h4 className="mt-0.5 text-lg font-bold leading-tight text-white sm:text-xl">
            <Link href={pick.href} className="hover:text-gold-light">
              {pick.name}
            </Link>
          </h4>
          <p className="mt-1 text-xs text-muted">{pick.seedLabel}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-widest text-gold">PULSE</p>
          <p className="font-mono text-3xl font-bold text-gold-light">
            {pick.pulse}
          </p>
          <p
            className={`font-mono text-xs ${
              pick.trend >= 0 ? "text-sky-300" : "text-orange-300"
            }`}
          >
            {formatTrend(pick.trend)}
          </p>
        </div>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${theme.bar}`}
          style={{ width: `${pick.pulse}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <PulseSpark history={pick.pulseHistory} width={110} height={28} />
        <p className="text-[10px] uppercase tracking-wider text-muted">
          {pick.onRoster ? "Roster PULSE" : "Scout PULSE"}
        </p>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/88">
        {pick.body}
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
        {pick.extraStats.map((stat) => (
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
    </article>
  );
}

export function UsOpenPreviewBanner() {
  const usOpen = tournaments.find((t) => t.id === US_OPEN_META.tournamentId);
  const categories = getUsOpenCategories();
  const board = getUsOpenPulseBoard();
  if (!usOpen) return null;

  return (
    <section
      aria-label="2026 US Open preview"
      className="relative overflow-hidden border-b border-sky-400/20"
    >
      <div className="absolute inset-0">
        <TournamentImage
          tournamentId="us-open"
          city={usOpen.city}
          country={usOpen.country}
          surface="hard"
          aspectClass="aspect-auto h-full min-h-[640px]"
          className="h-full w-full"
          objectPosition="center 30%"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06101f] via-[#0b1a33]/94 to-[#1a0d08]/88" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06101f] via-transparent to-[#06101f]/60" />
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

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex shrink-0 flex-col items-center text-center lg:w-80 lg:items-start lg:text-left">
            <StatManMascot size={96} pose="chart" className="mb-4" />
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/35 bg-sky-500/10 px-4 py-1.5">
              <Zap size={14} className="text-sky-300" />
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-200">
                {US_OPEN_META.name} Preview · {US_OPEN_META.year}
              </span>
            </div>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              <span className="bg-gradient-to-r from-sky-300 via-gold-light to-orange-300 bg-clip-text text-transparent">
                Night session
              </span>
              <br />
              <span className="text-white">in Queens</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-foreground/85">
              {US_OPEN_META.dates} · {US_OPEN_META.campus} · {usOpen.prizeMoney}{" "}
              prize fund
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <a
                href="/api/us-open-preview"
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
                className="inline-flex items-center gap-1.5 rounded-lg border border-orange-400/35 bg-orange-500/10 px-3 py-2 text-xs font-medium text-orange-200 transition-colors hover:bg-orange-500/20"
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
            <Link
              href="/calendar"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
            >
              Full Slam calendar
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="min-w-0 flex-1 space-y-6">
            <div className="overflow-hidden rounded-3xl border border-sky-400/25 bg-gradient-to-br from-sky-500/10 via-navy-light/85 to-orange-500/10 p-6 shadow-2xl backdrop-blur-md md:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-orange-300" />
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-200">
                    Stat Man&apos;s overall preview
                  </p>
                </div>
                <p className="text-sm text-muted">
                  {US_OPEN_META.venue} · {US_OPEN_META.surface}
                </p>
              </div>
              <p className="text-base leading-relaxed text-foreground/90 md:text-[17px]">
                {US_OPEN_OVERVIEW}
              </p>
            </div>

            <PulseNightBoard board={board} categories={categories} />
            <FlushingLedger />
          </div>
        </div>

        <div className="mt-12 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Four storylines · eight names
              </p>
              <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                The Queens commentary desk
              </h3>
            </div>
            <p className="max-w-md text-sm text-muted">
              First-timers, veterans, plot twists, and the two players still
              pointing at the trophy — with PULSE and the supporting numbers
              next to every take.
            </p>
          </div>

          {categories.map((category) => {
            const theme = CATEGORY_THEME[category.id];
            return (
              <div key={category.id} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${theme.chip}`}
                  >
                    {category.id === "locked" ? (
                      <Trophy size={12} />
                    ) : category.id === "surprise" ? (
                      <Sparkles size={12} />
                    ) : category.id === "first" ? (
                      <Flame size={12} />
                    ) : (
                      <Zap size={12} />
                    )}
                    {category.kicker}
                  </span>
                  <h3 className="text-xl font-bold text-white md:text-2xl">
                    {category.title}
                  </h3>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  <PickCard
                    pick={category.man}
                    categoryId={category.id}
                    side="Man"
                  />
                  <PickCard
                    pick={category.woman}
                    categoryId={category.id}
                    side="Woman"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
