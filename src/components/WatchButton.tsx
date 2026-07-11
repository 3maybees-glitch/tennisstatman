"use client";

import Link from "next/link";
import { Eye, EyeOff, Star } from "lucide-react";
import { useMembership } from "@/lib/membership";
import { useWatchlist } from "@/lib/watchlist";

export function WatchButton({
  playerId,
  className = "",
}: {
  playerId: string;
  className?: string;
}) {
  const { isMember } = useMembership();
  const { isWatched, toggle } = useWatchlist();

  if (!isMember) {
    return (
      <Link
        href="/pricing"
        className={`inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-gold/10 px-3 py-1.5 text-xs font-medium text-gold-light transition-colors hover:bg-gold/20 ${className}`}
      >
        <Star size={14} /> Watch (Courtside)
      </Link>
    );
  }

  const watched = isWatched(playerId);
  return (
    <button
      type="button"
      onClick={() => toggle(playerId)}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
        watched
          ? "border-gold/40 bg-gold/15 text-gold-light hover:bg-gold/25"
          : "border-white/10 bg-white/5 text-muted hover:text-foreground"
      } ${className}`}
    >
      {watched ? <Eye size={14} /> : <EyeOff size={14} />}
      {watched ? "Watching" : "Watch"}
    </button>
  );
}
