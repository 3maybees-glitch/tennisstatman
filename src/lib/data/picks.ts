export type PickMatch = {
  id: string;
  tour: "ATP" | "WTA";
  tournament: string;
  round: string;
  playerA: { id: string; name: string; country: string; pulse: number };
  playerB: { id: string; name: string; country: string; pulse: number };
  /** Stat Man's lean, shown after the user locks a pick */
  statManPick: "A" | "B";
  statManReason: string;
};

export const weeklyPicks: PickMatch[] = [
  {
    id: "pick-1",
    tour: "ATP",
    tournament: "Wimbledon",
    round: "Quarterfinal",
    playerA: { id: "jannik-sinner", name: "Jannik Sinner", country: "ITA", pulse: 95 },
    playerB: { id: "ben-shelton", name: "Ben Shelton", country: "USA", pulse: 88 },
    statManPick: "A",
    statManReason:
      "Shelton's serve keeps it close, but Sinner's return game converts eventually. Front-runner rate 89% says don't overthink it.",
  },
  {
    id: "pick-2",
    tour: "ATP",
    tournament: "Wimbledon",
    round: "Quarterfinal",
    playerA: { id: "carlos-alcaraz", name: "Carlos Alcaraz", country: "ESP", pulse: 92 },
    playerB: { id: "jack-draper", name: "Jack Draper", country: "GBR", pulse: 91 },
    statManPick: "A",
    statManReason:
      "Draper's PULSE trend is the steepest on tour and home crowd matters — but Alcaraz on grass wins 71% of net approaches. Coin flip with a golden edge.",
  },
  {
    id: "pick-3",
    tour: "WTA",
    tournament: "Wimbledon",
    round: "Quarterfinal",
    playerA: { id: "aryna-sabalenka", name: "Aryna Sabalenka", country: "BLR", pulse: 93 },
    playerB: { id: "jasmine-paolini", name: "Jasmine Paolini", country: "ITA", pulse: 84 },
    statManPick: "A",
    statManReason:
      "Paolini's movement steals a set on the vibes alone, but Sabalenka's winner rate on grass is a different weather system.",
  },
  {
    id: "pick-4",
    tour: "WTA",
    tournament: "Wimbledon",
    round: "Quarterfinal",
    playerA: { id: "coco-gauff", name: "Coco Gauff", country: "USA", pulse: 90 },
    playerB: { id: "elena-rybakina", name: "Elena Rybakina", country: "KAZ", pulse: 86 },
    statManPick: "B",
    statManReason:
      "Upset lean. Rybakina's serve on grass is the WTA's most valuable shot, and Gauff's forehand gets exposed by flat pace. Third-set queen vs. ace machine.",
  },
];
