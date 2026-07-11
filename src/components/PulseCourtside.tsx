"use client";

import Link from "next/link";
import { Bell, Eye, Sparkles, TrendingUp } from "lucide-react";
import { PulseSpark } from "./PulseSpark";
import { currentPulse, players, pulseTrend } from "@/lib/data/players";
import { pulseSpikes } from "@/lib/data/pulse-archive";
import { useWatchlist } from "@/lib/watchlist";

export function PulseCourtside() {
  const { ids } = useWatchlist();
  const spikes = pulseSpikes(players);
  const watched = players.filter((p) => ids.includes(p.id));

  return (
    <div className="mt-10 space-y-8">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-gold" />
        <h2 className="text-lg font-semibold text-gold-light">
          Courtside PULSE tools
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Spike alerts */}
        <div className="rounded-2xl border border-gold/25 bg-gold/5 p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Bell size={16} className="text-gold" /> PULSE spike alerts
          </h3>
          <p className="mt-1 text-sm text-muted">
            Sharp moves and fresh crossings of the 90 danger line.
          </p>
          <ul className="mt-4 space-y-2">
            {spikes.length === 0 && (
              <li className="text-sm text-muted">No spikes this week.</li>
            )}
            {spikes.map(({ player, delta, pulse, crossed90 }) => (
              <li key={player.id}>
                <Link
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white/5"
                >
                  <span className="flex items-center gap-2 text-sm font-medium">
                    {player.name}
                    {crossed90 && (
                      <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-light">
                        crossed 90
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-semibold text-court-light">
                    <TrendingUp size={14} /> +{delta} → {pulse}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Watchlist */}
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Eye size={16} className="text-gold" /> Your watchlist
          </h3>
          <p className="mt-1 text-sm text-muted">
            {watched.length === 0
              ? "Add players from any player card to track their PULSE here."
              : `${watched.length} player${watched.length === 1 ? "" : "s"} tracked.`}
          </p>
          <ul className="mt-4 space-y-2">
            {watched.map((player) => (
              <li key={player.id}>
                <Link
                  href={`/players/${player.id}`}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white/5"
                >
                  <span className="text-sm font-medium">{player.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-sm text-muted">
                      {currentPulse(player)}{" "}
                      <span
                        className={
                          pulseTrend(player) >= 0
                            ? "text-court-light"
                            : "text-accent"
                        }
                      >
                        ({pulseTrend(player) >= 0 ? "+" : ""}
                        {pulseTrend(player)})
                      </span>
                    </span>
                    <PulseSpark
                      history={player.pulseHistory}
                      width={80}
                      height={26}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {watched.length === 0 && (
            <Link
              href="/players"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
            >
              Browse players →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
