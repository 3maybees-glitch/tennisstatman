export type DailyStat = {
  headline: string;
  detail: string;
  category: string;
  relatedHref: string;
  relatedLabel: string;
};

const dailyStats: DailyStat[] = [
  {
    headline: "89%",
    detail:
      "Jannik Sinner's win rate after taking the first set since 2024 — the best front-running record on either tour. Translation: break him early or bring a book.",
    category: "Front-runner watch",
    relatedHref: "/players/jannik-sinner",
    relatedLabel: "Sinner's player card",
  },
  {
    headline: "21 bagels",
    detail:
      "Iga Świątek has won 21 sets 6-0 since 2023 — more than the rest of the WTA top 10 combined. The bakery never closes.",
    category: "Dominance dept.",
    relatedHref: "/players/iga-swiatek",
    relatedLabel: "Świątek's player card",
  },
  {
    headline: "4-0",
    detail:
      "Naomi Osaka has never lost a Grand Slam final. Four finals, four trophies, all on hard courts. The biggest stage brings out her biggest tennis.",
    category: "Clutch file",
    relatedHref: "/players/naomi-osaka",
    relatedLabel: "Osaka's player card",
  },
  {
    headline: "+23 PULSE",
    detail:
      "Jack Draper's PULSE has climbed 23 points in 12 months — the steepest rise of any top-10 ATP player. The lefty express has left the station.",
    category: "PULSE mover",
    relatedHref: "/stats/pulse",
    relatedLabel: "PULSE leaderboard",
  },
  {
    headline: "3.4 shots",
    detail:
      "Madison Keys plays the shortest average rally in the WTA top 10 at 3.4 shots. Blink twice and you've missed a service game.",
    category: "First-strike files",
    relatedHref: "/players/madison-keys",
    relatedLabel: "Keys' player card",
  },
  {
    headline: "96%",
    detail:
      "Novak Djokovic has broken serve in 96% of his matches since 2010. Nobody else in the dataset is above 90%. The return remains undefeated by time.",
    category: "Legend corner",
    relatedHref: "/players/novak-djokovic-atp",
    relatedLabel: "Djokovic's player card",
  },
  {
    headline: "7.1 per set",
    detail:
      "João Fonseca averaged 7.1 forehand winners per set at Challenger level — a tracking-era record for a teenager. Our prospect radar saw him coming 18 months out.",
    category: "Prospect radar",
    relatedHref: "/players/joao-fonseca",
    relatedLabel: "Fonseca's player card",
  },
];

/** Deterministic pick per calendar day so server and client agree. */
export function getStatOfTheDay(date = new Date()): DailyStat {
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  return dailyStats[dayIndex % dailyStats.length];
}
