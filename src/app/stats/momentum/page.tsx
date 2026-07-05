"use client";

import { useState } from "react";
import { MomentumChart } from "@/components/MomentumChart";
import { featuredMatches } from "@/lib/data/mock-matches";
import { Activity, Info, TrendingUp, Zap } from "lucide-react";

export default function MomentumPage() {
  const [selectedId, setSelectedId] = useState(featuredMatches[0].id);
  const match = featuredMatches.find((m) => m.id === selectedId)!;

  const swings = match.momentumData.filter((point, i, arr) => {
    if (i === 0) return false;
    const prev = arr[i - 1];
    const prevLeader = prev.player1 > prev.player2 ? "p1" : "p2";
    const currLeader = point.player1 > point.player2 ? "p1" : "p2";
    return prevLeader !== currLeader;
  });

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <Activity className="text-gold" size={28} />
            <h1 className="text-4xl font-bold">Momentum Swing Index</h1>
          </div>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            Every match has turning points — moments where probability shifts
            dramatically. Our Momentum Swing Index tracks win-probability
            changes game-by-game, flagging breaks, comebacks, and the
            psychological swings that decide outcomes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-wrap gap-3">
          {featuredMatches.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelectedId(m.id)}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                selectedId === m.id
                  ? "bg-court text-white"
                  : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
              }`}
            >
              {m.tour}: {m.player1.name.split(" ").pop()} vs{" "}
              {m.player2.name.split(" ").pop()}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="glow-gold rounded-2xl border border-white/10 bg-navy-light p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">
                    {match.tournament} · {match.round}
                  </p>
                  <h2 className="mt-1 text-xl font-bold">
                    {match.player1.name} vs {match.player2.name}
                  </h2>
                </div>
                <span className="font-mono text-gold-light">{match.score}</span>
              </div>
              <MomentumChart
                data={match.momentumData}
                player1Name={match.player1.name}
                player2Name={match.player2.name}
                height={360}
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Zap size={18} className="text-gold" />
                Momentum Swings
              </h3>
              <p className="mt-2 text-4xl font-bold text-gold-light">
                {swings.length}
              </p>
              <p className="mt-2 text-sm text-muted">
                Times the win-probability leader changed during this match
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <TrendingUp size={18} className="text-court-light" />
                Key Events
              </h3>
              <ul className="mt-4 space-y-3">
                {match.momentumData
                  .filter((p) => p.event)
                  .map((point) => (
                    <li
                      key={point.game}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-0.5 font-mono text-xs text-gold">
                        G{point.game}
                      </span>
                      <span className="text-muted">{point.event}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-court/20 bg-court/5 p-6">
              <h3 className="flex items-center gap-2 font-semibold">
                <Info size={18} className="text-court-light" />
                How it works
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Win probability is recalculated after every game using score
                state, serve advantage, historical H2H, and surface factors.
                Swings above 10% within 2 games are flagged as momentum events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-navy-light/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold">Related Metrics (Coming Soon)</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Swing Velocity",
                desc: "Rate of probability change — how fast momentum shifts",
              },
              {
                title: "Recovery Index",
                desc: "How quickly a player regains control after losing momentum",
              },
              {
                title: "Tilt Detector",
                desc: "Pattern recognition for consecutive unforced errors under pressure",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/5 bg-navy-light/50 p-6"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
                <span className="mt-4 inline-block text-xs text-gold">
                  Coming soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
