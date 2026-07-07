import {
  DEFAULT_BROWSER_HEADERS,
  OFFICIAL_SOURCES,
  RANKINGS_REVALIDATE_SECONDS,
} from "./constants";
import { getFallbackRankings } from "./fallback";
import type { RankingEntry, RankingsSnapshot } from "./types";

function parseMovement(rowHtml: string): number {
  const movementBlock = rowHtml.match(
    /player-row__movement[\s\S]*?<\/span>/,
  )?.[0];

  if (!movementBlock) return 0;

  const direction = movementBlock.match(
    /player-row__movement--(up|down)/,
  )?.[1];
  const rawValue = movementBlock
    .replace(/<[^>]+>/g, "")
    .trim()
    .replace(/[^\d-]/g, "");

  if (!direction || rawValue === "" || rawValue === "-") return 0;

  const amount = Number(rawValue);
  if (Number.isNaN(amount)) return 0;

  return direction === "down" ? -amount : amount;
}

export function parseWtaRankingsHtml(html: string): RankingEntry[] {
  const rowChunks = html.split('class="player-row js-player-item-favourite').slice(1);

  return rowChunks
    .map((rowHtml) => {
      const name = rowHtml.match(/data-player-name="([^"]+)"/)?.[1];
      const rank = Number(
        rowHtml.match(/player-row__rank[^>]*>\s*(\d+)/)?.[1] ?? "",
      );
      const country =
        rowHtml.match(/player-cell__country[^"]*--([A-Z]{3})/)?.[1] ??
        rowHtml.match(/player-cell__country[^>]*>\s*([A-Z]{3})/)?.[1];
      const pointsRaw = rowHtml.match(
        /player-row__cell--points[^>]*>\s*([\d,]+)/,
      )?.[1];
      const playerId = rowHtml.match(/data-player-id="(\d+)"/)?.[1];
      const age = Number(
        rowHtml.match(/player-row__cell--age[^>]*>\s*(\d+)/)?.[1] ?? "",
      );
      const tournamentsPlayed = Number(
        rowHtml.match(/player-row__cell--tournaments[^>]*>\s*(\d+)/)?.[1] ??
          "",
      );

      if (!name || !country || !pointsRaw || Number.isNaN(rank)) {
        return null;
      }

      const entry: RankingEntry = {
        rank,
        name,
        country,
        points: Number(pointsRaw.replace(/,/g, "")),
        change: parseMovement(rowHtml),
        playerId,
        age: Number.isNaN(age) ? undefined : age,
        tournamentsPlayed: Number.isNaN(tournamentsPlayed)
          ? undefined
          : tournamentsPlayed,
      };

      return entry;
    })
    .filter((entry): entry is RankingEntry => entry !== null)
    .sort((a, b) => a.rank - b.rank);
}

export async function fetchWtaRankings(): Promise<RankingsSnapshot> {
  try {
    const response = await fetch(OFFICIAL_SOURCES.WTA.page, {
      headers: {
        ...DEFAULT_BROWSER_HEADERS,
        Referer: OFFICIAL_SOURCES.WTA.page,
      },
      next: { revalidate: RANKINGS_REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      return getFallbackRankings(
        "WTA",
        `WTA official rankings page returned ${response.status}.`,
      );
    }

    const html = await response.text();
    const entries = parseWtaRankingsHtml(html);

    if (entries.length === 0) {
      return getFallbackRankings(
        "WTA",
        "WTA official rankings page loaded, but no ranking rows were parsed.",
      );
    }

    return {
      tour: "WTA",
      source: "official-html",
      sourceUrl: OFFICIAL_SOURCES.WTA.page,
      updatedAt: new Date().toISOString(),
      entries,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown WTA fetch error.";
    return getFallbackRankings("WTA", message);
  }
}
