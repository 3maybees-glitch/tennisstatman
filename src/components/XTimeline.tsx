"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect } from "react";
import { ExternalLink, X } from "lucide-react";
import type { XOEmbed } from "@/lib/x-oembed";
import {
  X_AVATAR_URL,
  X_BIO,
  X_DISPLAY_NAME,
  X_HANDLE,
  X_PROFILE_URL,
} from "@/lib/social";

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
  embeds: XOEmbed[];
};

export function XTimeline({ embeds }: Props) {
  useEffect(() => {
    window.twttr?.widgets.load();
  }, [embeds]);

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
              Daily tennis stats, PULSE movers, and Courtside takes.
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

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy">
          <div className="flex items-center gap-4 border-b border-white/10 p-5">
            <Image
              src={X_AVATAR_URL}
              alt={`${X_DISPLAY_NAME} avatar`}
              width={56}
              height={56}
              className="rounded-full ring-2 ring-gold/40"
              unoptimized
            />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{X_DISPLAY_NAME}</p>
              <p className="text-sm text-gold">@{X_HANDLE}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{X_BIO}</p>
            </div>
          </div>

          {embeds.length > 0 ? (
            <div className="space-y-4 px-3 py-4 sm:px-5">
              {embeds.map((embed) => (
                <div
                  key={embed.url}
                  className="x-embed overflow-hidden [&_.twitter-tweet]:!mx-auto"
                  dangerouslySetInnerHTML={{ __html: embed.html }}
                />
              ))}
            </div>
          ) : (
            <div className="px-5 py-10 text-center">
              <p className="text-foreground/90">
                Open @{X_HANDLE} on X to see the latest posts.
              </p>
              <p className="mt-2 text-sm text-muted">
                X blocks timeline embeds for new accounts — individual posts
                still show here once they&apos;re added.
              </p>
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                View posts on X
                <ExternalLink size={14} aria-hidden />
              </a>
            </div>
          )}
        </div>
      </div>

      {embeds.length > 0 && (
        <Script
          src="https://platform.twitter.com/widgets.js"
          strategy="lazyOnload"
          onLoad={() => {
            window.twttr?.widgets.load();
          }}
        />
      )}
    </section>
  );
}
