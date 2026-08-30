import { currentPulse, getPlayer, pulseTrend } from "@/lib/data/players";
import { X_HANDLE } from "@/lib/social";
import { absoluteUrl } from "@/lib/seo/site";

const DAY_MS = 86_400_000;

/** First day the US Open preview is shown (week of the tournament). */
export const US_OPEN_PREVIEW_START = "2026-08-24";

/** Last day the preview is shown (through Men's / Women's finals). */
export const US_OPEN_PREVIEW_END = "2026-09-13";

export const US_OPEN_META = {
  name: "US Open",
  year: 2026,
  city: "New York",
  country: "USA",
  surface: "Hard",
  venue: "Arthur Ashe Stadium",
  campus: "Flushing Meadows",
  tournamentId: "us-open",
  dates: "Aug 31–Sep 13",
  prizeMoney: "$75M",
  drawSize: 128,
} as const;

export const US_OPEN_IMAGE = {
  width: 1080,
  height: 1350,
} as const;

export const US_OPEN_OVERVIEW =
  "The last Grand Slam of 2026 opens in Queens with the draw already rewritten. Jannik Sinner is out, Carlos Alcaraz has not played a singles match since April, and Aryna Sabalenka is the only defending champion who looks like she never left mid-tournament form. Night sessions on Arthur Ashe will sort the rest — veterans who still own this building, first-timers who already know how it sounds, and a couple of summer risers who are not supposed to be here in week two.";

export type UsOpenTour = "ATP" | "WTA";

export type UsOpenStat = {
  value: string;
  label: string;
};

export type UsOpenPickDraft = {
  id: string;
  name: string;
  tour: UsOpenTour;
  country: string;
  seedLabel: string;
  /** Scout PULSE line used when the player is not on the curated roster. */
  scoutPulse: number[];
  extraStats: UsOpenStat[];
  body: string;
};

export type UsOpenPick = UsOpenPickDraft & {
  pulseHistory: number[];
  pulse: number;
  trend: number;
  href: string;
  onRoster: boolean;
};

export type UsOpenCategoryId = "first" | "veteran" | "surprise" | "locked";

export type UsOpenCategoryDraft = {
  id: UsOpenCategoryId;
  title: string;
  kicker: string;
  man: UsOpenPickDraft;
  woman: UsOpenPickDraft;
};

export type UsOpenCategory = Omit<UsOpenCategoryDraft, "man" | "woman"> & {
  man: UsOpenPick;
  woman: UsOpenPick;
};

export const US_OPEN_CATEGORY_DRAFTS: UsOpenCategoryDraft[] = [
  {
    id: "first",
    title: "Best first US Open",
    kicker: "Debut energy",
    man: {
      id: "rafael-jodar",
      name: "Rafael Jódar",
      tour: "ATP",
      country: "ESP",
      seedLabel: "World No. 13",
      scoutPulse: [58, 61, 65, 70, 74, 78, 82, 85, 87, 89, 91, 92],
      extraStats: [
        { value: "150+", label: "Started 2026 outside the top 150" },
        { value: "2024", label: "Junior US Open champion here" },
        { value: "3", label: "RG QF · Masters SF · Washington F" },
      ],
      body: "First professional main-draw appearance at the tournament where he won the junior title two years ago. He started 2026 ranked outside the top 150 and arrives as world No. 13 after a Roland Garros quarterfinal, a Masters 1000 semifinal, and a Washington final. The surface suits his first-strike game, and he already knows how this place sounds when a Spaniard starts winning matches. The opener will tell us whether the leap from junior champion to Slam threat is real.",
    },
    woman: {
      id: "kristina-liutova",
      name: "Kristina Liutova",
      tour: "WTA",
      country: "RUS",
      seedLabel: "No. 125 · qualifier",
      scoutPulse: [48, 50, 52, 55, 58, 62, 68, 74, 80, 84, 86, 88],
      extraStats: [
        { value: "9", label: "Match winning streak into the draw" },
        { value: "16", label: "Years old — first Slam main draw" },
        { value: "2010", label: "First player born in 2010 to reach one" },
      ],
      body: "Sixteen years old, first Grand Slam main draw of her career, and the first player born in 2010 to reach one. She qualified this week on a nine-match winning streak after winning her WTA debut title in Memphis as a qualifier. Ranked No. 125, she opens against Zheng Qinwen in an all-qualifier first-round match. The résumé is tiny, but the winning percentage and the nerve she showed in qualifying make her the cleanest “first time here, already dangerous” story in the women’s field.",
    },
  },
  {
    id: "veteran",
    title: "Best veteran performance",
    kicker: "The building still knows them",
    man: {
      id: "novak-djokovic",
      name: "Novak Djokovic",
      tour: "ATP",
      country: "SRB",
      seedLabel: "No. 4 seed · age 39",
      scoutPulse: [70, 72, 75, 78, 74, 70, 68, 72, 76, 80, 78, 75],
      extraStats: [
        { value: "4×", label: "US Open champion" },
        { value: "96%", label: "Matches with a break since 2010" },
        { value: "Ashe", label: "Opens Sunday night vs. Mariano Navone" },
      ],
      body: "Four-time champion, No. 4 seed, 39 years old, opening Sunday night on Arthur Ashe against Mariano Navone. He is no longer the automatic favorite, but no one in the draw has solved New York more often or for longer. With Sinner out and Alcaraz returning from a four-month layoff, the veteran path is wide open if the legs hold through the second week. This is the last Slam of the year and the one that has always fit him best.",
    },
    woman: {
      id: "jessica-pegula",
      name: "Jessica Pegula",
      tour: "WTA",
      country: "USA",
      seedLabel: "No. 3 seed · age 32",
      scoutPulse: [78, 80, 82, 80, 78, 76, 79, 82, 84, 82, 80, 81],
      extraStats: [
        { value: "9.2", label: "Winners per set on hard (2025)" },
        { value: "5 yrs", label: "Top-5 in return games won" },
        { value: "F / SF", label: "Recent US Open knockout stages" },
      ],
      body: "Thirty-two, No. 3 seed, and the most reliable American veteran still playing at a genuine title level. She has been a finalist and semifinalist here in recent years, she is playing her best hard-court tennis of the summer, and she gets a home crowd that actually knows her game. Pegula does not need a fairy-tale narrative. She needs the same heavy baseline tennis that has carried her deep at this event before. If a veteran woman is going to look like she belongs in the final, it is her.",
    },
  },
  {
    id: "surprise",
    title: "Most surprising",
    kicker: "Wait, he might actually do this",
    man: {
      id: "arthur-fils",
      name: "Arthur Fils",
      tour: "ATP",
      country: "FRA",
      seedLabel: "Cincinnati champion · 12–1",
      scoutPulse: [76, 78, 80, 81, 82, 83, 84, 86, 88, 90, 92, 93],
      extraStats: [
        { value: "12–1", label: "Hard-court ledger into Queens" },
        { value: "Cincy", label: "Masters title last week" },
        { value: "Fast", label: "First-strike game on this surface" },
      ],
      body: "Cincinnati champion last week and sitting in the 12-1 range. He is not a complete unknown anymore, but he is still not supposed to beat Alcaraz, Zverev, and Djokovic in the same fortnight. With Sinner missing and Alcaraz short of matches, the Frenchman’s first-strike power on a fast hard court is the most plausible “wait, he might actually do this” run in the men’s draw. A second week would be expected. A final would be the surprise.",
    },
    woman: {
      id: "alexandra-eala",
      name: "Alexandra Eala",
      tour: "WTA",
      country: "PHI",
      seedLabel: "Age 21 · first WTA title",
      scoutPulse: [72, 74, 76, 78, 80, 81, 83, 85, 87, 89, 90, 91],
      extraStats: [
        { value: "1st", label: "Filipino to win a Slam main-draw match" },
        { value: "DC", label: "Washington title this month" },
        { value: "21", label: "Rising, fearless, adopted by New York" },
      ],
      body: "First WTA title this month in Washington and already the first Filipino to win a Slam main-draw match. She is 21, rising fast, and playing with the kind of fearlessness that New York rewards. A round or two would be a nice story. A quarterfinal or better would be the tournament’s biggest plot twist on the women’s side, especially if she starts taking out seeds in front of a crowd that has already adopted her.",
    },
  },
  {
    id: "locked",
    title: "Most locked in to win",
    kicker: "The trophy still points here",
    man: {
      id: "carlos-alcaraz",
      name: "Carlos Alcaraz",
      tour: "ATP",
      country: "ESP",
      seedLabel: "Defending champion",
      scoutPulse: [90, 92, 88, 85, 80, 78, 84, 88, 91, 87, 90, 92],
      extraStats: [
        { value: "71%", label: "Net approaches won (top-10 high)" },
        { value: "0", label: "Singles matches since April" },
        { value: "R1", label: "Opens vs. Roman Safiullin" },
      ],
      body: "Defending champion and still the betting favorite even after missing Roland Garros and Wimbledon with a wrist injury. He has not played a singles match since April, so the first-round test against Roman Safiullin matters more than usual. If the wrist holds and the timing comes back in two matches, he remains the most complete player in the field. The rust is the only real argument against him. Everything else still points to him.",
    },
    woman: {
      id: "aryna-sabalenka",
      name: "Aryna Sabalenka",
      tour: "WTA",
      country: "BLR",
      seedLabel: "World No. 1 · top seed",
      scoutPulse: [86, 88, 90, 87, 85, 88, 91, 93, 90, 92, 94, 93],
      extraStats: [
        { value: "+9%", label: "More winners than any WTA top-20 peer" },
        { value: "64%", label: "First-serve points won on hard" },
        { value: "Def.", label: "Reigning US Open champion" },
      ],
      body: "Defending champion, world No. 1, top seed. She is the only player who looks like she arrived already in mid-tournament form. The power game travels to New York better than anywhere else, and she has already proven she can close this event. Everyone else is chasing a version of Sabalenka that has been built for this exact fortnight — first-strike power, a hard-court trophy she already knows how to lift, and a PULSE that arrived already in the 90s.",
    },
  },
];

export const US_OPEN_LEDGER: UsOpenStat[] = [
  { value: "Aug 31–13", label: "Flushing Meadows fortnight" },
  { value: "$75M", label: "Prize fund in Queens" },
  { value: "128", label: "Singles draw on each side" },
  { value: "Out", label: "Jannik Sinner — the door is open" },
  { value: "April", label: "Alcaraz’s last singles match" },
  { value: "Ashe", label: "Sunday night: Djokovic vs. Navone" },
];

function toDayMs(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

/** Server-side date gate — auto-hides after the US Open finals. */
export function isUsOpenPreviewActive(now = Date.now()): boolean {
  const today = Math.floor(now / DAY_MS) * DAY_MS;
  return (
    today >= toDayMs(US_OPEN_PREVIEW_START) &&
    today <= toDayMs(US_OPEN_PREVIEW_END)
  );
}

function hydratePick(draft: UsOpenPickDraft): UsOpenPick {
  const roster = getPlayer(draft.id);
  const pulseHistory = roster?.pulseHistory ?? draft.scoutPulse;
  const href = roster
    ? `/players/${roster.id}`
    : draft.tour === "ATP"
      ? "/atp"
      : "/wta";

  if (roster) {
    return {
      ...draft,
      pulseHistory,
      pulse: currentPulse(roster),
      trend: pulseTrend(roster),
      href,
      onRoster: true,
    };
  }

  return {
    ...draft,
    pulseHistory,
    pulse: pulseHistory[pulseHistory.length - 1] ?? 0,
    trend:
      pulseHistory[pulseHistory.length - 1] -
      pulseHistory[Math.max(0, pulseHistory.length - 5)],
    href,
    onRoster: false,
  };
}

export function getUsOpenCategories(): UsOpenCategory[] {
  return US_OPEN_CATEGORY_DRAFTS.map((category) => ({
    id: category.id,
    title: category.title,
    kicker: category.kicker,
    man: hydratePick(category.man),
    woman: hydratePick(category.woman),
  }));
}

export function getUsOpenFeaturedPicks(): UsOpenPick[] {
  return getUsOpenCategories().flatMap((category) => [category.man, category.woman]);
}

export function getUsOpenPulseBoard(): UsOpenPick[] {
  return [...getUsOpenFeaturedPicks()].sort((a, b) => b.pulse - a.pulse);
}

export function usOpenPreviewJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: "2026 US Open",
    startDate: "2026-08-31",
    endDate: "2026-09-13",
    sport: "Tennis",
    description: US_OPEN_OVERVIEW,
    url: absoluteUrl("/"),
    location: {
      "@type": "Place",
      name: "USTA Billie Jean King National Tennis Center",
      address: {
        "@type": "PostalAddress",
        addressLocality: "New York",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
  };
}

export function usOpenXCaption(picks = getUsOpenFeaturedPicks()): string {
  const pulseLeaders = [...picks]
    .sort((a, b) => b.pulse - a.pulse)
    .slice(0, 3)
    .map((p) => `${p.name.split(" ").pop()} ${p.pulse}`)
    .join(" · ");

  return `US Open 2026 preview

First: Jódar / Liutova
Veteran: Djokovic / Pegula
Surprise: Fils / Eala
Locked in: Alcaraz / Sabalenka

PULSE into Queens: ${pulseLeaders}

via @${X_HANDLE}`;
}
