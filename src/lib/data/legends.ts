import { ensureSkillGrades, type CoreSkillGrades, type SkillGrades } from "./grades";

function skillSeed(id: string): number {
  let h = 2166136261;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type Legend = {
  id: string;
  name: string;
  tour: "ATP" | "WTA";
  country: string;
  era: string;
  slams: number;
  weeksAtNo1: number;
  signature: string;
  skills: SkillGrades;
  /**
   * Career level curve: estimated peak-adjusted level (0-100) at each age.
   * Used for "player X at age Y vs legend at age Y" trajectory overlays.
   */
  careerCurve: { age: number; level: number }[];
};

type LegendDraft = Omit<Legend, "skills"> & { skills: CoreSkillGrades };

const legendDrafts: LegendDraft[] = [
  {
    id: "roger-federer",
    name: "Roger Federer",
    tour: "ATP",
    country: "SUI",
    era: "1998–2022",
    slams: 20,
    weeksAtNo1: 310,
    signature: "The effortless all-court flow",
    skills: { serve: 93, forehand: 97, backhand: 88, netPlay: 95, movement: 94 },
    careerCurve: [
      { age: 18, level: 62 }, { age: 19, level: 68 }, { age: 20, level: 74 },
      { age: 21, level: 82 }, { age: 22, level: 90 }, { age: 23, level: 96 },
      { age: 24, level: 98 }, { age: 25, level: 99 }, { age: 26, level: 98 },
      { age: 27, level: 95 }, { age: 28, level: 93 }, { age: 29, level: 91 },
      { age: 30, level: 90 }, { age: 31, level: 89 }, { age: 32, level: 88 },
      { age: 33, level: 89 }, { age: 34, level: 88 }, { age: 35, level: 90 },
      { age: 36, level: 87 }, { age: 37, level: 80 }, { age: 38, level: 74 },
    ],
  },
  {
    id: "rafael-nadal",
    name: "Rafael Nadal",
    tour: "ATP",
    country: "ESP",
    era: "2001–2024",
    slams: 22,
    weeksAtNo1: 209,
    signature: "The banana forehand and infinite fight",
    skills: { serve: 85, forehand: 98, backhand: 89, netPlay: 88, movement: 96 },
    careerCurve: [
      { age: 17, level: 70 }, { age: 18, level: 80 }, { age: 19, level: 90 },
      { age: 20, level: 93 }, { age: 21, level: 94 }, { age: 22, level: 97 },
      { age: 23, level: 94 }, { age: 24, level: 98 }, { age: 25, level: 95 },
      { age: 26, level: 94 }, { age: 27, level: 96 }, { age: 28, level: 90 },
      { age: 29, level: 88 }, { age: 30, level: 92 }, { age: 31, level: 94 },
      { age: 32, level: 93 }, { age: 33, level: 94 }, { age: 34, level: 91 },
      { age: 35, level: 92 }, { age: 36, level: 85 }, { age: 37, level: 72 },
    ],
  },
  {
    id: "novak-djokovic",
    name: "Novak Djokovic",
    tour: "ATP",
    country: "SRB",
    era: "2003–present",
    slams: 24,
    weeksAtNo1: 428,
    signature: "The elastic defense and unbreakable return",
    skills: { serve: 90, forehand: 92, backhand: 98, netPlay: 84, movement: 97 },
    careerCurve: [
      { age: 18, level: 68 }, { age: 19, level: 76 }, { age: 20, level: 85 },
      { age: 21, level: 88 }, { age: 22, level: 87 }, { age: 23, level: 92 },
      { age: 24, level: 99 }, { age: 25, level: 96 }, { age: 26, level: 95 },
      { age: 27, level: 97 }, { age: 28, level: 99 }, { age: 29, level: 94 },
      { age: 30, level: 86 }, { age: 31, level: 95 }, { age: 32, level: 96 },
      { age: 33, level: 95 }, { age: 34, level: 97 }, { age: 35, level: 94 },
      { age: 36, level: 95 }, { age: 37, level: 88 }, { age: 38, level: 84 },
      { age: 39, level: 80 },
    ],
  },
  {
    id: "pete-sampras",
    name: "Pete Sampras",
    tour: "ATP",
    country: "USA",
    era: "1988–2002",
    slams: 14,
    weeksAtNo1: 286,
    signature: "The running slam-dunk smash and untouchable serve",
    skills: { serve: 98, forehand: 92, backhand: 82, netPlay: 96, movement: 88 },
    careerCurve: [
      { age: 18, level: 72 }, { age: 19, level: 84 }, { age: 20, level: 82 },
      { age: 21, level: 88 }, { age: 22, level: 93 }, { age: 23, level: 96 },
      { age: 24, level: 95 }, { age: 25, level: 94 }, { age: 26, level: 96 },
      { age: 27, level: 93 }, { age: 28, level: 90 }, { age: 29, level: 87 },
      { age: 30, level: 82 }, { age: 31, level: 84 },
    ],
  },
  {
    id: "andre-agassi",
    name: "Andre Agassi",
    tour: "ATP",
    country: "USA",
    era: "1986–2006",
    slams: 8,
    weeksAtNo1: 101,
    signature: "The earliest ball-strike in history",
    skills: { serve: 82, forehand: 93, backhand: 92, netPlay: 76, movement: 87 },
    careerCurve: [
      { age: 18, level: 78 }, { age: 19, level: 82 }, { age: 20, level: 84 },
      { age: 21, level: 83 }, { age: 22, level: 88 }, { age: 23, level: 80 },
      { age: 24, level: 90 }, { age: 25, level: 93 }, { age: 26, level: 82 },
      { age: 27, level: 65 }, { age: 28, level: 85 }, { age: 29, level: 94 },
      { age: 30, level: 90 }, { age: 31, level: 89 }, { age: 32, level: 88 },
      { age: 33, level: 87 }, { age: 34, level: 82 }, { age: 35, level: 78 },
    ],
  },
  {
    id: "john-mcenroe",
    name: "John McEnroe",
    tour: "ATP",
    country: "USA",
    era: "1978–1992",
    slams: 7,
    weeksAtNo1: 170,
    signature: "Hands of silk, temper of thunder",
    skills: { serve: 90, forehand: 85, backhand: 86, netPlay: 98, movement: 89 },
    careerCurve: [
      { age: 19, level: 80 }, { age: 20, level: 86 }, { age: 21, level: 90 },
      { age: 22, level: 92 }, { age: 23, level: 91 }, { age: 24, level: 94 },
      { age: 25, level: 98 }, { age: 26, level: 88 }, { age: 27, level: 80 },
      { age: 28, level: 78 }, { age: 29, level: 82 }, { age: 30, level: 80 },
      { age: 31, level: 76 }, { age: 32, level: 74 },
    ],
  },
  {
    id: "gustavo-kuerten",
    name: "Gustavo Kuerten",
    tour: "ATP",
    country: "BRA",
    era: "1995–2008",
    slams: 3,
    weeksAtNo1: 43,
    signature: "The clay-court backhand painted with a headband",
    skills: { serve: 86, forehand: 89, backhand: 94, netPlay: 78, movement: 88 },
    careerCurve: [
      { age: 19, level: 62 }, { age: 20, level: 84 }, { age: 21, level: 80 },
      { age: 22, level: 85 }, { age: 23, level: 92 }, { age: 24, level: 95 },
      { age: 25, level: 88 }, { age: 26, level: 72 }, { age: 27, level: 70 },
      { age: 28, level: 65 },
    ],
  },
  {
    id: "serena-williams",
    name: "Serena Williams",
    tour: "WTA",
    country: "USA",
    era: "1995–2022",
    slams: 23,
    weeksAtNo1: 319,
    signature: "The greatest serve women's tennis has ever seen",
    skills: { serve: 99, forehand: 96, backhand: 92, netPlay: 85, movement: 90 },
    careerCurve: [
      { age: 17, level: 78 }, { age: 18, level: 84 }, { age: 19, level: 86 },
      { age: 20, level: 92 }, { age: 21, level: 97 }, { age: 22, level: 94 },
      { age: 23, level: 88 }, { age: 24, level: 80 }, { age: 25, level: 88 },
      { age: 26, level: 90 }, { age: 27, level: 92 }, { age: 28, level: 94 },
      { age: 29, level: 85 }, { age: 30, level: 93 }, { age: 31, level: 97 },
      { age: 32, level: 95 }, { age: 33, level: 98 }, { age: 34, level: 94 },
      { age: 35, level: 96 }, { age: 36, level: 82 }, { age: 37, level: 84 },
      { age: 38, level: 83 }, { age: 39, level: 78 }, { age: 40, level: 70 },
    ],
  },
  {
    id: "steffi-graf",
    name: "Steffi Graf",
    tour: "WTA",
    country: "GER",
    era: "1982–1999",
    slams: 22,
    weeksAtNo1: 377,
    signature: "The forehand that named itself Fräulein Forehand",
    skills: { serve: 90, forehand: 99, backhand: 85, netPlay: 84, movement: 96 },
    careerCurve: [
      { age: 16, level: 76 }, { age: 17, level: 86 }, { age: 18, level: 94 },
      { age: 19, level: 99 }, { age: 20, level: 97 }, { age: 21, level: 95 },
      { age: 22, level: 93 }, { age: 23, level: 96 }, { age: 24, level: 97 },
      { age: 25, level: 96 }, { age: 26, level: 95 }, { age: 27, level: 94 },
      { age: 28, level: 86 }, { age: 29, level: 88 }, { age: 30, level: 84 },
    ],
  },
  {
    id: "venus-williams",
    name: "Venus Williams",
    tour: "WTA",
    country: "USA",
    era: "1994–2023",
    slams: 7,
    weeksAtNo1: 11,
    signature: "Wingspan defense and grass-court royalty",
    skills: { serve: 94, forehand: 90, backhand: 88, netPlay: 89, movement: 95 },
    careerCurve: [
      { age: 17, level: 80 }, { age: 18, level: 84 }, { age: 19, level: 86 },
      { age: 20, level: 94 }, { age: 21, level: 96 }, { age: 22, level: 93 },
      { age: 23, level: 86 }, { age: 24, level: 82 }, { age: 25, level: 88 },
      { age: 26, level: 80 }, { age: 27, level: 87 }, { age: 28, level: 88 },
      { age: 29, level: 85 }, { age: 30, level: 82 }, { age: 31, level: 74 },
      { age: 32, level: 72 }, { age: 33, level: 70 }, { age: 34, level: 76 },
      { age: 35, level: 80 }, { age: 36, level: 83 }, { age: 37, level: 84 },
      { age: 38, level: 72 },
    ],
  },
  {
    id: "martina-hingis",
    name: "Martina Hingis",
    tour: "WTA",
    country: "SUI",
    era: "1994–2007",
    slams: 5,
    weeksAtNo1: 209,
    signature: "Chess-master tennis at 16 years old",
    skills: { serve: 78, forehand: 88, backhand: 91, netPlay: 92, movement: 93 },
    careerCurve: [
      { age: 14, level: 62 }, { age: 15, level: 74 }, { age: 16, level: 94 },
      { age: 17, level: 96 }, { age: 18, level: 95 }, { age: 19, level: 93 },
      { age: 20, level: 92 }, { age: 21, level: 88 }, { age: 22, level: 80 },
      { age: 25, level: 76 }, { age: 26, level: 78 },
    ],
  },
  {
    id: "chris-evert",
    name: "Chris Evert",
    tour: "WTA",
    country: "USA",
    era: "1972–1989",
    slams: 18,
    weeksAtNo1: 260,
    signature: "The two-handed backhand and ice-cold consistency",
    skills: { serve: 76, forehand: 92, backhand: 96, netPlay: 74, movement: 90 },
    careerCurve: [
      { age: 17, level: 84 }, { age: 18, level: 88 }, { age: 19, level: 92 },
      { age: 20, level: 96 }, { age: 21, level: 97 }, { age: 22, level: 96 },
      { age: 23, level: 95 }, { age: 24, level: 96 }, { age: 25, level: 95 },
      { age: 26, level: 94 }, { age: 27, level: 93 }, { age: 28, level: 92 },
      { age: 29, level: 91 }, { age: 30, level: 92 }, { age: 31, level: 90 },
      { age: 32, level: 88 }, { age: 33, level: 85 }, { age: 34, level: 82 },
    ],
  },
  {
    id: "maria-sharapova",
    name: "Maria Sharapova",
    tour: "WTA",
    country: "RUS",
    era: "2001–2020",
    slams: 5,
    weeksAtNo1: 21,
    signature: "First-strike ferocity and a career Grand Slam",
    skills: { serve: 88, forehand: 93, backhand: 91, netPlay: 72, movement: 82 },
    careerCurve: [
      { age: 17, level: 88 }, { age: 18, level: 90 }, { age: 19, level: 89 },
      { age: 20, level: 91 }, { age: 21, level: 92 }, { age: 22, level: 78 },
      { age: 23, level: 82 }, { age: 24, level: 88 }, { age: 25, level: 92 },
      { age: 26, level: 90 }, { age: 27, level: 91 }, { age: 28, level: 88 },
      { age: 30, level: 76 }, { age: 31, level: 74 }, { age: 32, level: 68 },
    ],
  },
  {
    id: "justine-henin",
    name: "Justine Henin",
    tour: "WTA",
    country: "BEL",
    era: "1999–2011",
    slams: 7,
    weeksAtNo1: 117,
    signature: "The most beautiful one-handed backhand in WTA history",
    skills: { serve: 84, forehand: 91, backhand: 97, netPlay: 88, movement: 94 },
    careerCurve: [
      { age: 17, level: 74 }, { age: 18, level: 80 }, { age: 19, level: 86 },
      { age: 20, level: 90 }, { age: 21, level: 95 }, { age: 22, level: 88 },
      { age: 23, level: 94 }, { age: 24, level: 96 }, { age: 25, level: 98 },
      { age: 26, level: 90 }, { age: 27, level: 84 }, { age: 28, level: 82 },
    ],
  },
];

export const legends: Legend[] = legendDrafts.map((legend) => ({
  ...legend,
  skills: ensureSkillGrades(legend.skills, skillSeed(legend.id)),
}));

export function getLegend(id: string): Legend | undefined {
  return legends.find((l) => l.id === id);
}
