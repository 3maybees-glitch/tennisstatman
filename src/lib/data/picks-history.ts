/**
 * Graded picks history and the season leaderboard — Courtside features that
 * build on the free "Beat Stat Man" weekly game. Past weeks include the actual
 * winner so we can grade Stat Man's model, and a mock leaderboard gives members
 * a season-long standings view.
 */

export type GradedPick = {
  id: string;
  tournament: string;
  round: string;
  playerA: string;
  playerB: string;
  statManPick: "A" | "B";
  winner: "A" | "B";
};

export type GradedWeek = {
  week: string;
  picks: GradedPick[];
};

export const gradedWeeks: GradedWeek[] = [
  {
    week: "Wimbledon — Round of 16",
    picks: [
      {
        id: "w1-1",
        tournament: "Wimbledon",
        round: "R16",
        playerA: "Jannik Sinner",
        playerB: "Holger Rune",
        statManPick: "A",
        winner: "A",
      },
      {
        id: "w1-2",
        tournament: "Wimbledon",
        round: "R16",
        playerA: "Carlos Alcaraz",
        playerB: "Lorenzo Musetti",
        statManPick: "A",
        winner: "A",
      },
      {
        id: "w1-3",
        tournament: "Wimbledon",
        round: "R16",
        playerA: "Iga Świątek",
        playerB: "Madison Keys",
        statManPick: "A",
        winner: "B",
      },
      {
        id: "w1-4",
        tournament: "Wimbledon",
        round: "R16",
        playerA: "Aryna Sabalenka",
        playerB: "Paula Badosa",
        statManPick: "A",
        winner: "A",
      },
    ],
  },
  {
    week: "Queen's & Berlin — Finals",
    picks: [
      {
        id: "w2-1",
        tournament: "Queen's Club",
        round: "Final",
        playerA: "Jack Draper",
        playerB: "Taylor Fritz",
        statManPick: "B",
        winner: "A",
      },
      {
        id: "w2-2",
        tournament: "Berlin",
        round: "Final",
        playerA: "Coco Gauff",
        playerB: "Jessica Pegula",
        statManPick: "A",
        winner: "A",
      },
      {
        id: "w2-3",
        tournament: "Halle",
        round: "Final",
        playerA: "Alexander Zverev",
        playerB: "Ben Shelton",
        statManPick: "A",
        winner: "A",
      },
    ],
  },
  {
    week: "Roland Garros — Semifinals",
    picks: [
      {
        id: "w3-1",
        tournament: "Roland Garros",
        round: "SF",
        playerA: "Carlos Alcaraz",
        playerB: "Jannik Sinner",
        statManPick: "B",
        winner: "A",
      },
      {
        id: "w3-2",
        tournament: "Roland Garros",
        round: "SF",
        playerA: "Iga Świątek",
        playerB: "Coco Gauff",
        statManPick: "A",
        winner: "A",
      },
    ],
  },
];

export function statManRecord(): { wins: number; total: number; pct: number } {
  let wins = 0;
  let total = 0;
  for (const week of gradedWeeks) {
    for (const p of week.picks) {
      total += 1;
      if (p.statManPick === p.winner) wins += 1;
    }
  }
  return { wins, total, pct: Math.round((wins / total) * 100) };
}

export type LeaderboardEntry = {
  handle: string;
  wins: number;
  losses: number;
  streak: string;
  you?: boolean;
};

// Mock season standings for flavor. Stat Man's row is computed from real
// graded results; the "You" row is filled in client-side from the user's picks.
export const seasonLeaderboard: LeaderboardEntry[] = [
  { handle: "acedout", wins: 71, losses: 29, streak: "W4" },
  { handle: "breakpoint_betty", wins: 68, losses: 32, streak: "W2" },
  { handle: "topspin_tom", wins: 66, losses: 34, streak: "L1" },
  { handle: "deuce_or_die", wins: 63, losses: 37, streak: "W1" },
  { handle: "netcord_ninja", wins: 61, losses: 39, streak: "L2" },
  { handle: "baseline_bandit", wins: 58, losses: 42, streak: "W3" },
];
