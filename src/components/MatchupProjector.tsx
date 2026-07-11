"use client";

import { useMemo, useState } from "react";
import { Swords } from "lucide-react";
import { SkillRadar } from "./SkillRadar";
import { players, type Player } from "@/lib/data/players";
import { projectMatchup } from "@/lib/matchup";

function PlayerSelect({
  label,
  value,
  exclude,
  onChange,
}: {
  label: string;
  value: string;
  exclude: string;
  onChange: (id: string) => void;
}) {
  const atp = players.filter((p) => p.tour === "ATP");
  const wta = players.filter((p) => p.tour === "WTA");
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-navy px-3 py-2.5 text-sm font-medium text-foreground outline-none focus:border-gold/50"
      >
        <optgroup label="ATP">
          {atp.map((p) => (
            <option key={p.id} value={p.id} disabled={p.id === exclude}>
              {p.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="WTA">
          {wta.map((p) => (
            <option key={p.id} value={p.id} disabled={p.id === exclude}>
              {p.name}
            </option>
          ))}
        </optgroup>
      </select>
    </label>
  );
}

export function MatchupProjector() {
  const [aId, setAId] = useState(players[0].id);
  const [bId, setBId] = useState(players[1].id);

  const a = players.find((p) => p.id === aId) as Player;
  const b = players.find((p) => p.id === bId) as Player;

  const result = useMemo(() => projectMatchup(a, b), [a, b]);

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2">
        <PlayerSelect label="Player A" value={aId} exclude={bId} onChange={setAId} />
        <PlayerSelect label="Player B" value={bId} exclude={aId} onChange={setBId} />
      </div>

      {/* Win probability bar */}
      <div className="mt-8 rounded-2xl border border-gold/25 bg-navy-light p-6">
        <div className="flex items-center justify-between text-sm font-semibold">
          <span className="text-court-light">{a.name}</span>
          <span className="flex items-center gap-1.5 text-muted">
            <Swords size={15} className="text-gold" /> Projected winner
          </span>
          <span className="text-accent">{b.name}</span>
        </div>
        <div className="mt-3 flex h-9 overflow-hidden rounded-full border border-white/10">
          <div
            className="flex items-center justify-start bg-court px-3 text-sm font-bold text-white transition-all"
            style={{ width: `${result.winProbA}%` }}
          >
            {result.winProbA}%
          </div>
          <div
            className="flex items-center justify-end bg-accent px-3 text-sm font-bold text-white transition-all"
            style={{ width: `${result.winProbB}%` }}
          >
            {result.winProbB}%
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">
          {result.summary}
        </p>
        <p className="mt-2 text-xs text-muted">
          Power rating: {a.name} {result.ratingA} · {b.name} {result.ratingB}{" "}
          <span className="opacity-70">
            (60% skill grade, 40% current PULSE)
          </span>
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Skill overlay */}
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h3 className="font-semibold">Skill overlay</h3>
          <SkillRadar
            series={[
              { name: a.name, skills: a.skills, color: "#40916c" },
              { name: b.name, skills: b.skills, color: "#8b5cf6" },
            ]}
            height={260}
            showLegend
          />
        </div>

        {/* Edge breakdown */}
        <div className="rounded-2xl border border-white/10 bg-navy-light p-6">
          <h3 className="font-semibold">Where it&apos;s won</h3>
          <ul className="mt-4 space-y-3">
            {result.edges.map((edge) => {
              const holder = edge.favors === "A" ? a : b;
              const color = edge.favors === "A" ? "#40916c" : "#8b5cf6";
              return (
                <li key={edge.skill}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{edge.label}</span>
                    <span className="font-medium" style={{ color }}>
                      {holder.name.split(" ").slice(-1)} +{edge.diff}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, edge.diff * 5)}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
