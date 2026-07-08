"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  TIER_COLORS,
  SURFACE_LABELS,
  tournaments,
  type Tournament,
} from "@/lib/data/tournaments";
import { currentPulse, players, type Player } from "@/lib/data/players";
import { PlayerAvatar } from "./PlayerAvatar";
import { TournamentImage } from "./TournamentImage";

/**
 * Equirectangular projection onto a 1000x500 canvas.
 * Continents are hand-drawn stylized "cartoon" blobs on the same projection,
 * so real lat/lon pins land in roughly the right place.
 */
function project(lat: number, lon: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * 1000,
    y: ((90 - lat) / 180) * 500,
  };
}

const LAND = "#16281f";
const LAND_STROKE = "#2d6a4f";

const CONTINENTS: { name: string; d: string }[] = [
  {
    name: "North America",
    d: `M 55,78 Q 70,58 95,60 L 150,54 Q 200,50 240,58 L 285,72 Q 305,58 318,64
        L 348,102 Q 330,118 302,132 L 300,138 Q 290,150 282,162 L 276,180
        Q 262,188 250,184 L 256,200 Q 268,212 278,226 L 262,222 Q 245,214 226,198
        L 200,188 Q 186,172 182,162 L 166,156 Q 158,132 158,118 L 130,96 Q 90,92 55,78 Z`,
  },
  {
    name: "Greenland",
    d: `M 350,42 Q 375,30 398,38 Q 410,55 402,72 Q 388,84 368,80 Q 352,64 350,42 Z`,
  },
  {
    name: "South America",
    d: `M 278,226 Q 305,220 332,226 L 348,234 Q 380,248 403,268 Q 398,292 385,312
        L 370,340 Q 360,350 355,356 L 345,390 Q 338,415 312,436 Q 300,432 300,418
        L 293,378 Q 286,352 284,328 Q 280,304 286,282 Q 278,264 277,250 Q 276,236 278,226 Z`,
  },
  {
    name: "Eurasia",
    d: `M 473,149 Q 468,134 472,124 L 482,118 Q 492,110 502,107 L 516,101 Q 526,97 532,93
        Q 538,82 548,70 Q 558,58 572,52 L 620,54 Q 680,50 740,50 L 830,56 Q 900,58 960,66
        L 992,76 Q 990,90 968,98 Q 950,112 932,120 L 890,136 Q 872,146 862,154
        Q 850,160 840,164 L 828,178 Q 815,194 805,206 Q 796,216 790,224 L 782,240 Q 786,248 782,252
        Q 772,246 770,232 Q 764,216 754,202 Q 748,192 746,188 Q 742,196 740,204 L 728,222
        Q 720,232 714,230 Q 704,210 700,192 Q 688,178 676,172 Q 668,176 662,178
        Q 658,186 660,194 L 648,212 Q 636,214 628,206 Q 618,190 606,176 Q 596,168 592,162
        Q 584,154 576,150 Q 566,142 558,142 Q 550,148 545,148 Q 538,140 534,128 Q 524,132 516,134
        Q 504,140 494,143 Q 482,146 473,149 Z`,
  },
  {
    name: "Britain & Ireland",
    d: `M 492,92 Q 502,88 505,96 Q 506,106 501,114 Q 494,118 490,112 Q 488,100 492,92 Z
        M 478,98 Q 486,96 486,104 Q 485,111 478,110 Q 474,104 478,98 Z`,
  },
  {
    name: "Scandinavia notch",
    d: `M 536,92 Q 544,76 556,64 Q 566,58 572,60 Q 576,72 568,82 Q 560,92 552,96 Q 543,98 536,92 Z`,
  },
  {
    name: "Africa",
    d: `M 481,158 Q 505,150 530,150 Q 558,152 585,158 Q 594,162 596,166 Q 606,182 618,198
        Q 630,208 642,218 Q 634,244 620,268 Q 608,288 600,300 Q 594,322 584,340 Q 570,352 553,345
        Q 546,326 540,312 Q 536,294 533,282 Q 528,262 524,244 Q 508,238 492,235 Q 470,228 453,212
        Q 452,196 460,184 Q 470,168 481,158 Z`,
  },
  {
    name: "Madagascar",
    d: `M 624,290 Q 633,284 637,294 Q 638,308 631,318 Q 623,320 621,310 Q 620,298 624,290 Z`,
  },
  {
    name: "Arabia",
    d: `M 600,172 Q 616,164 634,164 Q 650,166 658,172 Q 664,182 660,192 Q 652,204 640,210
        Q 628,208 620,200 Q 610,188 604,180 Q 600,176 600,172 Z`,
  },
  {
    name: "India",
    d: `M 692,178 Q 706,172 720,176 Q 734,182 744,190 Q 742,204 734,216 Q 726,228 716,232
        Q 706,216 700,200 Q 694,188 692,178 Z`,
  },
  {
    name: "Japan",
    d: `M 872,158 Q 878,148 888,142 Q 898,136 902,140 Q 900,150 890,156 Q 882,162 876,164 Q 872,162 872,158 Z`,
  },
  {
    name: "Indonesia",
    d: `M 790,254 Q 800,250 810,254 Q 806,260 796,260 Q 790,258 790,254 Z
        M 820,252 Q 834,248 846,254 Q 838,262 826,260 Q 820,257 820,252 Z
        M 856,248 Q 868,244 876,250 Q 870,258 858,256 Q 855,252 856,248 Z`,
  },
  {
    name: "Australia",
    d: `M 820,318 Q 822,300 832,292 Q 846,283 864,283 Q 880,286 894,292 Q 906,298 910,302
        Q 922,312 925,326 Q 922,340 914,348 Q 902,358 888,358 Q 872,356 858,348 Q 838,344 824,338
        Q 819,328 820,318 Z`,
  },
  {
    name: "New Zealand",
    d: `M 978,340 Q 986,336 990,344 Q 988,352 982,354 Q 976,348 978,340 Z
        M 984,358 Q 992,356 994,364 Q 990,372 984,370 Q 980,364 984,358 Z`,
  },
];

const REGIONS: Record<string, string> = {
  World: "0 20 1000 460",
  Americas: "40 40 380 420",
  Europe: "440 40 210 140",
  "Asia-Pacific": "600 40 400 340",
};

type Mode = "tournaments" | "origins";

export function WorldMap() {
  const [mode, setMode] = useState<Mode>("tournaments");
  const [region, setRegion] = useState<keyof typeof REGIONS>("World");
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const tierLegend = useMemo(() => {
    const seen = new Map<string, string>();
    for (const t of tournaments) {
      const label = t.tier === "WTA 1000" ? "Masters 1000" : t.tier;
      const key = label.includes("500")
        ? "500s"
        : label.includes("250")
          ? "250s"
          : label;
      if (!seen.has(key)) seen.set(key, TIER_COLORS[t.tier]);
    }
    return [...seen.entries()];
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("tournaments");
              setSelectedPlayer(null);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              mode === "tournaments"
                ? "bg-court text-white"
                : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
            }`}
          >
            Tournaments
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("origins");
              setSelectedTournament(null);
            }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              mode === "origins"
                ? "bg-court text-white"
                : "border border-white/10 bg-navy-light text-muted hover:text-foreground"
            }`}
          >
            Where players are from
          </button>
        </div>
        <div className="flex gap-1 text-sm">
          {(Object.keys(REGIONS) as (keyof typeof REGIONS)[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                region === r
                  ? "bg-gold/15 text-gold-light"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* The map */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy">
        <svg
          viewBox={REGIONS[region]}
          className="h-auto w-full"
          role="img"
          aria-label="World map of tennis"
        >
          {/* ocean grid for texture */}
          <defs>
            <pattern id="oceanGrid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(45,106,79,0.08)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1000" height="500" fill="url(#oceanGrid)" />

          {CONTINENTS.map((c) => (
            <path
              key={c.name}
              d={c.d}
              fill={LAND}
              stroke={LAND_STROKE}
              strokeWidth="1.2"
              strokeLinejoin="round"
              opacity={0.95}
            />
          ))}

          {mode === "tournaments" &&
            tournaments.map((t) => {
              const { x, y } = project(t.lat, t.lon);
              const isSlam = t.tier === "Grand Slam";
              const r = isSlam ? 7 : t.tier.includes("1000") ? 5.5 : 4;
              const selected = selectedTournament?.id === t.id;
              return (
                <g
                  key={t.id}
                  onClick={() => setSelectedTournament(selected ? null : t)}
                  className="cursor-pointer"
                >
                  <title>{`${t.name} · ${t.city}`}</title>
                  {isSlam && (
                    <circle cx={x} cy={y} r={r} fill="none" stroke={TIER_COLORS[t.tier]} strokeWidth="1.5">
                      <animate attributeName="r" values={`${r};${r + 6};${r}`} dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0;0.8" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle
                    cx={x}
                    cy={y}
                    r={selected ? r + 2 : r}
                    fill={TIER_COLORS[t.tier]}
                    stroke={selected ? "#e8edf5" : "#070d18"}
                    strokeWidth={selected ? 2 : 1}
                  />
                </g>
              );
            })}

          {mode === "origins" &&
            players.map((p) => {
              const { x, y } = project(p.origin.lat, p.origin.lon);
              const selected = selectedPlayer?.id === p.id;
              const color = p.tour === "ATP" ? "#40916c" : "#8b5cf6";
              return (
                <g
                  key={p.id}
                  onClick={() => setSelectedPlayer(selected ? null : p)}
                  className="cursor-pointer"
                >
                  <title>{`${p.name} · ${p.origin.city}`}</title>
                  <circle
                    cx={x}
                    cy={y}
                    r={selected ? 7 : 5}
                    fill={color}
                    stroke={selected ? "#e8edf5" : "#070d18"}
                    strokeWidth={selected ? 2 : 1}
                  />
                </g>
              );
            })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted">
        {mode === "tournaments" ? (
          tierLegend.map(([label, color]) => (
            <span key={label} className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
          ))
        ) : (
          <>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-court-light" /> ATP
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#8b5cf6" }} /> WTA
            </span>
          </>
        )}
        <span className="ml-auto">Click a pin for details</span>
      </div>

      {/* Detail cards */}
      {selectedTournament && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-navy-light">
          <TournamentImage
            tournamentId={selectedTournament.id}
            city={selectedTournament.city}
            country={selectedTournament.country}
            surface={selectedTournament.surface}
            aspectClass="aspect-[21/9]"
          />
          <div className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span
                  className="rounded px-2 py-0.5 text-[11px] font-bold"
                  style={{
                    backgroundColor: `${TIER_COLORS[selectedTournament.tier]}22`,
                    color: TIER_COLORS[selectedTournament.tier],
                  }}
                >
                  {selectedTournament.tier}
                </span>
                <h3 className="mt-2 text-xl font-bold">{selectedTournament.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {selectedTournament.city}, {selectedTournament.country} ·{" "}
                  {SURFACE_LABELS[selectedTournament.surface]} ·{" "}
                  {selectedTournament.tour} · {selectedTournament.drawSize} draw ·{" "}
                  {selectedTournament.prizeMoney}
                </p>
              </div>
              <Link href="/calendar" className="text-sm text-gold hover:text-gold-light">
                View in calendar →
              </Link>
            </div>
          </div>
        </div>
      )}

      {selectedPlayer && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-navy-light p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <PlayerAvatar
                playerId={selectedPlayer.id}
                name={selectedPlayer.name}
                tour={selectedPlayer.tour}
                rank={selectedPlayer.rank}
                size={64}
              />
              <div>
                <span className="text-xs text-muted">
                  {selectedPlayer.tour} #{selectedPlayer.rank} · PULSE{" "}
                  {currentPulse(selectedPlayer)}
                </span>
                <h3 className="mt-1 text-xl font-bold">{selectedPlayer.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  From {selectedPlayer.origin.city} · {selectedPlayer.playstyle}
                </p>
              </div>
            </div>
            <Link
              href={`/players/${selectedPlayer.id}`}
              className="text-sm text-gold hover:text-gold-light"
            >
              Player card →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
