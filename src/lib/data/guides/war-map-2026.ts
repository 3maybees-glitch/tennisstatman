export const WAR_MAP_EDITION_ID = "war-map-2026";
export const WAR_MAP_PRICE_USD = 1;
export const WAR_MAP_PRICE_CENTS = 100;
export const WAR_MAP_PRICE_LABEL = "$1";
export const WAR_MAP_PDF_FILENAME = "tennisstatman-2026-war-map.pdf";

export type LetterGrade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C";

export type DepthEntry = {
  pos: number;
  name: string;
  country: string;
  role: string;
  note: string;
};

export type ScheduleEntry = {
  when: string;
  event: string;
  surface: string;
  stake: string;
};

export type UnitGrade = {
  unit: string;
  grade: LetterGrade;
  strength: string;
  keyNames: string;
};

export type FreshmanHopeful = {
  name: string;
  tour: "ATP" | "WTA";
  age: number;
  upside: string;
};

export type DraftProspect = {
  round: "R1" | "R2" | "Day 3";
  name: string;
  tour: "ATP" | "WTA";
  comps: string;
  ceiling: string;
};

export type SlamPrediction = {
  slam: string;
  mens: string;
  womens: string;
  mensScore: string;
  womensScore: string;
};

export type BowlPlacement = {
  bowl: string;
  projected: string;
  note: string;
};

export type YearEndPick = {
  tour: "ATP" | "WTA";
  rank1: string;
  rank2: string;
  darkHorse: string;
};

export const WAR_MAP_2026 = {
  id: WAR_MAP_EDITION_ID,
  title: "2026 WAR MAP",
  brand: "TennisStatMan",
  subtitle: "Super Master Season Preview Sheet",
  editionLabel: "One-Page War Room Edition",
  snapshotNote:
    "Post-Wimbledon 2026 board: depth charts, unit grades, schedule stakes, slam score projections, freshman hopefuls, breakout draft board, and year-end bowl placements — packed onto one printable page.",
  priceUsd: WAR_MAP_PRICE_USD,
  priceLabel: WAR_MAP_PRICE_LABEL,
  publishedAt: "2026-07-24",
  headlineTake:
    "Sinner still owns the metronome. Alcaraz owns the chaos. Świątek owns clay gravity. Sabalenka owns first-strike hard courts. Everyone else is fighting for the scraps between them.",
  atpDepth: [
    {
      pos: 1,
      name: "J. Sinner",
      country: "ITA",
      role: "QB / Closer",
      note: "Backhand redirect; YE #1 favorite",
    },
    {
      pos: 2,
      name: "C. Alcaraz",
      country: "ESP",
      role: "Playmaker",
      note: "All-court chaos; slam hunter",
    },
    {
      pos: 3,
      name: "A. Zverev",
      country: "GER",
      role: "Serve tower",
      note: "Holds forever; slam ceiling TBD",
    },
    {
      pos: 4,
      name: "N. Djokovic",
      country: "SRB",
      role: "Legacy CB",
      note: "Big stages only; still dangerous",
    },
    {
      pos: 5,
      name: "T. Fritz",
      country: "USA",
      role: "Hard-court WR",
      note: "Clean first strike; US swing",
    },
    {
      pos: 6,
      name: "J. Draper",
      country: "GBR",
      role: "Lefty edge",
      note: "Ascending; Finals candidate",
    },
    {
      pos: 7,
      name: "B. Shelton",
      country: "USA",
      role: "Power RB",
      note: "Serve + forehand; volatile",
    },
    {
      pos: 8,
      name: "L. Musetti",
      country: "ITA",
      role: "Clay artist",
      note: "Touch + shape; Rome/RG form",
    },
    {
      pos: 9,
      name: "A. Rublev",
      country: "RUS",
      role: "Grinder",
      note: "Heavy FH; needs calm weeks",
    },
    {
      pos: 10,
      name: "H. Rune",
      country: "DEN",
      role: "Wildcard",
      note: "Talent spikes; streak risk",
    },
    {
      pos: 11,
      name: "A. de Minaur",
      country: "AUS",
      role: "Coverage DB",
      note: "Defense engine; QF machine",
    },
    {
      pos: 12,
      name: "T. Paul",
      country: "USA",
      role: "All-surface",
      note: "Quietly elite; Finals push",
    },
  ] satisfies DepthEntry[],
  wtaDepth: [
    {
      pos: 1,
      name: "A. Sabalenka",
      country: "BLR",
      role: "Power QB",
      note: "First-strike hard; slam favorite",
    },
    {
      pos: 2,
      name: "I. Świątek",
      country: "POL",
      role: "Clay general",
      note: "RPM gravity; still #1 threat",
    },
    {
      pos: 3,
      name: "C. Gauff",
      country: "USA",
      role: "Athlete CB",
      note: "Defense + serve; NY heater",
    },
    {
      pos: 4,
      name: "J. Pegula",
      country: "USA",
      role: "Redirect TE",
      note: "Early takeback; consistency",
    },
    {
      pos: 5,
      name: "M. Andreeva",
      country: "RUS",
      role: "Next QB",
      note: "Variety + IQ; rising fast",
    },
    {
      pos: 6,
      name: "E. Rybakina",
      country: "KAZ",
      role: "Serve nuke",
      note: "Grass/hard laser; boom-bust",
    },
    {
      pos: 7,
      name: "Z. Zheng",
      country: "CHN",
      role: "Power wing",
      note: "Forehand pop; Asian swing",
    },
    {
      pos: 8,
      name: "J. Paolini",
      country: "ITA",
      role: "Competitor",
      note: "Big-stage belief; finals DNA",
    },
    {
      pos: 9,
      name: "Q. Zheng",
      country: "CHN",
      role: "Shotmaker",
      note: "Flair + fight; upset artist",
    },
    {
      pos: 10,
      name: "B. Bencic",
      country: "SUI",
      role: "Veteran WR",
      note: "Clean timing; sneaky deep",
    },
    {
      pos: 11,
      name: "D. Collins",
      country: "USA",
      role: "Intensity",
      note: "Fire + FH; US Open heat",
    },
    {
      pos: 12,
      name: "E. Navarro",
      country: "USA",
      role: "Counter",
      note: "Return quality; QF ceiling",
    },
  ] satisfies DepthEntry[],
  schedule: [
    {
      when: "Jan",
      event: "AO Melbourne",
      surface: "Hard",
      stake: "Slam I · title races open",
    },
    {
      when: "Mar",
      event: "Sunshine Double",
      surface: "Hard",
      stake: "IW + Miami · form check",
    },
    {
      when: "Apr–May",
      event: "Clay Masters",
      surface: "Clay",
      stake: "MC/Madrid/Rome tune-up",
    },
    {
      when: "May–Jun",
      event: "Roland-Garros",
      surface: "Clay",
      stake: "Slam II · clay crown",
    },
    {
      when: "Jun–Jul",
      event: "Wimbledon",
      surface: "Grass",
      stake: "Slam III · DONE",
    },
    {
      when: "Aug",
      event: "NA Hard Swing",
      surface: "Hard",
      stake: "Toronto/Cincy → USO path",
    },
    {
      when: "Aug–Sep",
      event: "US Open",
      surface: "Hard",
      stake: "Slam IV · biggest remaining",
    },
    {
      when: "Sep–Oct",
      event: "Asian Swing",
      surface: "Hard",
      stake: "Beijing/Wuhan/Tokyo race",
    },
    {
      when: "Oct–Nov",
      event: "Indoor Finish",
      surface: "Indoor",
      stake: "Paris → Finals lock race",
    },
    {
      when: "Nov",
      event: "Tour Finals",
      surface: "Indoor",
      stake: "Turin / WTA Finals bowls",
    },
  ] satisfies ScheduleEntry[],
  unitGrades: [
    {
      unit: "ATP Serve Unit",
      grade: "A",
      strength: "Free points stacked top to bottom",
      keyNames: "Zverev · Shelton · Rybakina-adjacent pace",
    },
    {
      unit: "ATP Return Unit",
      grade: "A-",
      strength: "Djokovic template still the standard",
      keyNames: "Djokovic · Sinner · de Minaur",
    },
    {
      unit: "ATP Clay Corps",
      grade: "A-",
      strength: "Alcaraz + Musetti shape the dirt",
      keyNames: "Alcaraz · Musetti · Rune",
    },
    {
      unit: "ATP Hard Corps",
      grade: "A+",
      strength: "Deepest surface unit on tour",
      keyNames: "Sinner · Fritz · Paul · Draper",
    },
    {
      unit: "ATP Grass Unit",
      grade: "B+",
      strength: "Thin after the fortnight",
      keyNames: "Alcaraz · Sinner · Fritz",
    },
    {
      unit: "WTA Power Unit",
      grade: "A+",
      strength: "First-strike era fully online",
      keyNames: "Sabalenka · Rybakina · Collins",
    },
    {
      unit: "WTA Defense Unit",
      grade: "A",
      strength: "Coverage + redirect still wins weeks",
      keyNames: "Gauff · Świątek · Pegula",
    },
    {
      unit: "WTA Clay Corps",
      grade: "A+",
      strength: "Świątek gravity remains unfair",
      keyNames: "Świątek · Paolini · Andreeva",
    },
    {
      unit: "WTA Hard Corps",
      grade: "A",
      strength: "US + Asia decide the YE race",
      keyNames: "Sabalenka · Gauff · Pegula",
    },
    {
      unit: "Clutch / Big Point",
      grade: "A-",
      strength: "Champions separate on Ad points",
      keyNames: "Sinner · Sabalenka · Alcaraz",
    },
  ] satisfies UnitGrade[],
  freshmanHopefuls: [
    {
      name: "J. Fonseca",
      tour: "ATP",
      age: 19,
      upside: "FH thunder; already beating veterans",
    },
    {
      name: "R. Mensik",
      tour: "ATP",
      age: 20,
      upside: "Serve + belief; Masters threat",
    },
    {
      name: "L. Tien",
      tour: "ATP",
      age: 20,
      upside: "Lefty IQ; American pipeline",
    },
    {
      name: "M. Andreeva",
      tour: "WTA",
      age: 19,
      upside: "Already top-5 DNA; slam SF floor",
    },
    {
      name: "M. Joint",
      tour: "WTA",
      age: 21,
      upside: "Aussie spark; hard-court climb",
    },
    {
      name: "I. Jovic",
      tour: "WTA",
      age: 18,
      upside: "USA freshman flyer; big stage calm",
    },
  ] satisfies FreshmanHopeful[],
  draftBoard: [
    {
      round: "R1",
      name: "J. Fonseca",
      tour: "ATP",
      comps: "Del Potro power / Alcaraz flair",
      ceiling: "Multiple slam contender",
    },
    {
      round: "R1",
      name: "M. Andreeva",
      tour: "WTA",
      comps: "Świątek IQ + variety",
      ceiling: "Year-end #1 track",
    },
    {
      round: "R1",
      name: "R. Mensik",
      tour: "ATP",
      comps: "Berrettini serve / modern FH",
      ceiling: "Top-5 + slam SF",
    },
    {
      round: "R2",
      name: "L. Tien",
      tour: "ATP",
      comps: "Lefty redirect artist",
      ceiling: "Top-10 regular",
    },
    {
      round: "R2",
      name: "I. Jovic",
      tour: "WTA",
      comps: "Clean USA athlete mold",
      ceiling: "Top-15 + slam QF",
    },
    {
      round: "R2",
      name: "V. Mboko",
      tour: "WTA",
      comps: "First-strike Canadian pop",
      ceiling: "Top-20 breaker",
    },
    {
      round: "Day 3",
      name: "N. Basavareddy",
      tour: "ATP",
      comps: "USA hard-court grinder",
      ceiling: "Top-30 / 500 hunter",
    },
    {
      round: "Day 3",
      name: "T. Cartwright",
      tour: "WTA",
      comps: "Power first-strike wing",
      ceiling: "Top-40 climber",
    },
  ] satisfies DraftProspect[],
  slamPredictions: [
    {
      slam: "AO",
      mens: "Sinner",
      womens: "Sabalenka",
      mensScore: "6-4, 7-6, 6-3",
      womensScore: "6-4, 6-7, 6-3",
    },
    {
      slam: "RG",
      mens: "Alcaraz",
      womens: "Świątek",
      mensScore: "6-3, 6-7, 6-4, 7-5",
      womensScore: "6-2, 6-4",
    },
    {
      slam: "WIM",
      mens: "Alcaraz",
      womens: "Rybakina",
      mensScore: "7-6, 6-4, 6-7, 6-3",
      womensScore: "7-5, 6-4",
    },
    {
      slam: "USO",
      mens: "Sinner",
      womens: "Gauff",
      mensScore: "6-4, 6-7, 7-5, 6-3",
      womensScore: "6-3, 3-6, 6-4",
    },
  ] satisfies SlamPrediction[],
  bowlPlacements: [
    {
      bowl: "ATP Finals · Turin",
      projected: "Sinner · Alcaraz · Zverev · Fritz · Draper · Shelton · Paul · Musetti",
      note: "8 locks race — Rublev/Rune on bubble",
    },
    {
      bowl: "WTA Finals",
      projected: "Sabalenka · Świątek · Gauff · Pegula · Andreeva · Rybakina · Zheng · Paolini",
      note: "Collins/Navarro fighting last seats",
    },
    {
      bowl: "US Open 'Bowl'",
      projected: "M: Sinner over Alcaraz · W: Gauff over Sabalenka",
      note: "Biggest remaining trophy on the map",
    },
    {
      bowl: "Year-End #1 Bowl",
      projected: "ATP: Sinner · WTA: Sabalenka (Świątek live)",
      note: "Hard-court points decide both races",
    },
  ] satisfies BowlPlacement[],
  yearEnd: [
    {
      tour: "ATP",
      rank1: "Jannik Sinner",
      rank2: "Carlos Alcaraz",
      darkHorse: "Jack Draper into top 5",
    },
    {
      tour: "WTA",
      rank1: "Aryna Sabalenka",
      rank2: "Iga Świątek",
      darkHorse: "Mirra Andreeva into top 3",
    },
  ] satisfies YearEndPick[],
  projectedRecordLines: [
    "ATP board: Sinner 58-8 · Alcaraz 55-12 · Fritz 48-18",
    "WTA board: Sabalenka 56-10 · Świątek 54-11 · Gauff 49-16",
    "Slam count board: Sinner 2 · Alcaraz 2 · Sabalenka 1 · Świątek 1 · Gauff 1 · Rybakina 1",
  ],
} as const;

export type WarMapEdition = typeof WAR_MAP_2026;
