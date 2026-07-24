import type { CoreSkillGrades } from "@/lib/data/grades";

export type GuideTour = "ATP" | "WTA";

export type GuidePlayer = {
  id: string;
  name: string;
  tour: GuideTour;
  rank: number;
  rankLastYear: number;
  country: string;
  countryName: string;
  location: string;
  birthYear: number;
  heightCm: number;
  turnedPro: number;
  yearsOnTour: number;
  nationality: string;
  hand: "R" | "L";
  playstyle: string;
  skills: CoreSkillGrades;
  topFinishes: string[];
  strengths: string;
  weaknesses: string;
  funFact: string;
};

export type GuideEdition = {
  id: string;
  title: string;
  subtitle: string;
  editionLabel: string;
  snapshotNote: string;
  priceUsd: number;
  priceLabel: string;
  publishedAt: string;
  players: GuidePlayer[];
};

export type GuidePlayerSeed = {
  name: string;
  tour: GuideTour;
  rank: number;
  rankLastYear: number;
  country: string;
  countryName: string;
  location: string;
  birthYear: number;
  heightCm: number;
  turnedPro: number;
  hand?: "R" | "L";
  playstyle?: string;
  skills?: Partial<CoreSkillGrades>;
  topFinishes: string[];
  funFact: string;
  strengths?: string;
  weaknesses?: string;
};
