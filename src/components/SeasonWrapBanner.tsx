import Link from "next/link";
import { Trophy } from "lucide-react";
import {
  SEASON_WRAP_DETAIL,
  SEASON_WRAP_HEADLINE,
  SEASON_WRAP_YEAR,
} from "@/lib/promotions/off-season";

export function SeasonWrapBanner() {
  return (
    <section className="border-b border-white/5 bg-gradient-to-r from-court/20 via-navy-light/80 to-gold/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gold">
            <Trophy size={16} aria-hidden />
            {SEASON_WRAP_YEAR} season wrap
          </div>
          <h2 className="mt-2 text-2xl font-bold md:text-3xl">{SEASON_WRAP_HEADLINE}</h2>
          <p className="mt-3 text-muted">{SEASON_WRAP_DETAIL}</p>
        </div>
        <SeasonWrapLinks />
      </div>
    </section>
  );
}

function SeasonWrapLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/race"
        className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-white/10"
      >
        Year-end race standings
      </Link>
      <Link
        href="/pricing"
        className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
      >
        Start Courtside for $1.99
      </Link>
    </div>
  );
}