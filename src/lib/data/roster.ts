import { fetchAllRankings } from "@/lib/rankings";
import { buildPlayerFromRanking, slugify } from "./generated-players";
import { players as curatedPlayers, type Player } from "./players";

/**
 * The full card roster: live top-100 of both tours, with hand-curated cards
 * taking priority over auto-scouted ones. Curated players keep their written
 * verdicts but adopt live rank/points when the feeds have them.
 */
export async function getFullRoster(): Promise<Player[]> {
  const { atp, wta } = await fetchAllRankings();

  const curatedBySlug = new Map<string, Player>();
  for (const p of curatedPlayers) {
    curatedBySlug.set(`${p.tour}:${slugify(p.name)}`, p);
  }

  const roster: Player[] = [];
  const seen = new Set<string>();

  for (const snapshot of [atp, wta]) {
    for (const entry of snapshot.entries) {
      const key = `${snapshot.tour}:${slugify(entry.name)}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const curated = curatedBySlug.get(key);
      if (curated) {
        roster.push({ ...curated, rank: entry.rank, points: entry.points });
      } else {
        roster.push(buildPlayerFromRanking(entry, snapshot.tour));
      }
    }
  }

  // Keep curated players visible even if a feed is down or they fall out of the top 100
  for (const p of curatedPlayers) {
    const key = `${p.tour}:${slugify(p.name)}`;
    if (!seen.has(key)) {
      seen.add(key);
      roster.push(p);
    }
  }

  return roster;
}

export async function findRosterPlayer(id: string): Promise<Player | undefined> {
  const curated = curatedPlayers.find((p) => p.id === id);
  if (curated) return curated;
  const roster = await getFullRoster();
  return roster.find((p) => p.id === id);
}
