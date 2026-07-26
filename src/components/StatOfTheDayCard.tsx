"use client";

import Link from "next/link";
import { Download, ExternalLink } from "lucide-react";
import type { DailyStat } from "@/lib/data/stat-of-the-day";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/social";

type Props = {
  stat: DailyStat;
};

function tourHeading(tour: DailyStat["tour"]) {
  return tour === "ATP" ? "Men's Stat of the Day" : "Women's Stat of the Day";
}

function tourBadge(tour: DailyStat["tour"]) {
  return tour === "ATP" ? "ATP" : "WTA";
}

function tweetText(stat: DailyStat) {
  const side = stat.tour === "ATP" ? "Men's" : "Women's";
  return `${side} Stat of the Day\n\n${stat.headline} — ${stat.detail}\n\nvia @${X_HANDLE}`;
}

function xIntentUrl(stat: DailyStat) {
  const params = new URLSearchParams({
    text: tweetText(stat),
  });
  return `https://x.com/intent/tweet?${params.toString()}`;
}

function imageHref(tour: DailyStat["tour"]) {
  return `/api/stat-of-the-day/${tour.toLowerCase()}`;
}

export function StatOfTheDayCard({ stat }: Props) {
  const isMen = stat.tour === "ATP";

  return (
    <article className="flex flex-col items-center gap-4">
      <div
        className={`relative aspect-[4/5] w-full max-w-[360px] overflow-hidden rounded-2xl border shadow-lg ${
          isMen
            ? "border-accent/35 bg-gradient-to-b from-accent/15 via-navy-light to-navy"
            : "border-gold/35 bg-gradient-to-b from-gold/15 via-navy-light to-navy"
        }`}
      >
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl ${
            isMen ? "bg-accent/25" : "bg-gold/20"
          }`}
        />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-7">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold tracking-tight">
                Tennis<span className="text-gold-light">StatMan</span>
              </p>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                  isMen
                    ? "border border-accent/40 bg-accent/15 text-accent"
                    : "border border-gold/40 bg-gold/15 text-gold-light"
                }`}
              >
                {tourBadge(stat.tour)}
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                {tourHeading(stat.tour)}
              </p>
              <p className="mt-1 text-xs text-muted/80">{stat.category}</p>
            </div>
          </div>

          <div className="space-y-4 py-6">
            <p className="text-5xl font-extrabold leading-none tracking-tight text-gold-light sm:text-6xl">
              {stat.headline}
            </p>
            <p className="text-[15px] leading-relaxed text-foreground/90">
              {stat.detail}
            </p>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4">
            <Link
              href={stat.relatedHref}
              className="inline-block text-sm font-medium text-gold hover:text-gold-light"
            >
              {stat.relatedLabel} →
            </Link>
            <p className="text-xs text-muted/70">@{X_HANDLE}</p>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-[360px] flex-wrap items-center justify-center gap-2">
        <a
          href={imageHref(stat.tour)}
          download
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium transition-colors hover:bg-white/10"
        >
          <Download size={14} />
          Download for X
        </a>
        <a
          href={xIntentUrl(stat)}
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
          Tennis Stat Man on X
        </a>
      </div>
    </article>
  );
}
