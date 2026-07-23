"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { X_HANDLE, X_PROFILE_URL, X_TIMELINE_EMBED_URL } from "@/lib/social";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
      };
    };
  }
}

type Props = {
  /** Pixel height of the embedded timeline. */
  height?: number;
};

export function XTimeline({ height = 560 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.twttr?.widgets.load(containerRef.current);
  }, []);

  return (
    <section
      className="border-t border-white/5 bg-navy-light/30 py-20"
      aria-labelledby="x-feed-heading"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <X size={22} aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-widest">
                On X
              </p>
            </div>
            <h2 id="x-feed-heading" className="mt-2 text-3xl font-bold">
              Latest from @{X_HANDLE}
            </h2>
            <p className="mt-3 text-muted">
              Daily tennis stats, PULSE movers, and Courtside takes — straight
              from the feed.
            </p>
          </div>
          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold-light transition-colors hover:border-gold/50 hover:bg-gold/20"
          >
            <X size={16} aria-hidden />
            Follow on X
          </a>
        </div>

        <div
          ref={containerRef}
          className="overflow-hidden rounded-2xl border border-white/10 bg-navy"
        >
          <a
            className="twitter-timeline"
            data-theme="dark"
            data-chrome="noheader nofooter noborders transparent"
            data-height={String(height)}
            href={X_TIMELINE_EMBED_URL}
          >
            Posts by @{X_HANDLE}
          </a>
        </div>
      </div>

      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onLoad={() => {
          window.twttr?.widgets.load(containerRef.current);
        }}
      />
    </section>
  );
}
