import { currentPulse, type Player } from "./players";

/**
 * Courtside "full PULSE archive": the public card only exposes the last 12
 * readings, but members get a longer back-history. We synthesize the earlier
 * months deterministically from the player id so the archive is stable across
 * reloads and consistent with the recent (real) tail.
 */

const ARCHIVE_MONTHS = 36;

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type ArchivePoint = { month: string; pulse: number };

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthLabel(monthsAgo: number, now = new Date()): string {
  const d = new Date(now.getFullYear(), now.getMonth() - monthsAgo, 1);
  return `${MONTH_LABELS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`;
}

/** Full archive: synthesized older months + the real recent tail. */
export function fullPulseArchive(player: Player): ArchivePoint[] {
  const recent = player.pulseHistory;
  const olderCount = Math.max(0, ARCHIVE_MONTHS - recent.length);
  const rng = mulberry32(hashString(`archive:${player.id}`));

  // Walk backward from the oldest known reading to fill the earlier months.
  const older: number[] = [];
  let value = recent[0];
  for (let i = 0; i < olderCount; i++) {
    value += rng() * 9 - 4.5;
    value = Math.min(96, Math.max(42, value));
    older.push(Math.round(value));
  }
  older.reverse();

  const series = [...older, ...recent];
  const total = series.length;
  return series.map((pulse, i) => ({
    month: monthLabel(total - 1 - i),
    pulse,
  }));
}

export type PulseSpike = {
  player: Player;
  delta: number;
  pulse: number;
  crossed90: boolean;
};

/**
 * Spike alerts: players whose PULSE jumped sharply over the last month, or who
 * just crossed the 90 "danger" line. Sorted by the size of the move.
 */
export function pulseSpikes(
  players: Player[],
  threshold = 3,
): PulseSpike[] {
  const spikes: PulseSpike[] = [];
  for (const player of players) {
    const h = player.pulseHistory;
    if (h.length < 2) continue;
    const pulse = currentPulse(player);
    const delta = pulse - h[h.length - 2];
    const crossed90 = pulse >= 90 && h[h.length - 2] < 90;
    if (delta >= threshold || crossed90) {
      spikes.push({ player, delta, pulse, crossed90 });
    }
  }
  return spikes.sort((a, b) => b.delta - a.delta);
}
