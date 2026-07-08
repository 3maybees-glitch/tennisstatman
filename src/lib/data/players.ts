import type { SkillGrades } from "./grades";

export type Player = {
  id: string;
  name: string;
  tour: "ATP" | "WTA";
  country: string;
  countryName: string;
  /** Birthplace for the origins map */
  origin: { city: string; lat: number; lon: number };
  age: number;
  hand: "R" | "L";
  rank: number;
  points: number;
  playstyle: string;
  skills: SkillGrades;
  /** Current PULSE (0-100) is the last entry of pulseHistory */
  pulseHistory: number[];
  legendMatch: { legendId: string; similarity: number };
  /** Stat Man's AI-written scouting verdict */
  verdict: string;
  funStat: string;
};

export const players: Player[] = [
  // ─── ATP ───────────────────────────────────────────────
  {
    id: "jannik-sinner",
    name: "Jannik Sinner",
    tour: "ATP",
    country: "ITA",
    countryName: "Italy",
    origin: { city: "San Candido, Italy", lat: 46.73, lon: 12.28 },
    age: 24,
    hand: "R",
    rank: 1,
    points: 11330,
    playstyle: "Baseline metronome",
    skills: { serve: 90, forehand: 94, backhand: 95, netPlay: 78, movement: 92 },
    pulseHistory: [82, 84, 86, 85, 88, 90, 91, 89, 92, 93, 94, 95],
    legendMatch: { legendId: "novak-djokovic", similarity: 84 },
    verdict:
      "Stat Man's take: Sinner is what happens when you feed a ball machine espresso. The backhand redirect down the line is the single most repeatable weapon on tour right now, and his PULSE has not dipped below 80 in months. If there's a nitpick, it's that he only visits the net like it's a distant relative — twice a set, out of obligation.",
    funStat:
      "Has won 89% of matches after taking the first set since 2024 — the tour's best front-runner.",
  },
  {
    id: "carlos-alcaraz",
    name: "Carlos Alcaraz",
    tour: "ATP",
    country: "ESP",
    countryName: "Spain",
    origin: { city: "El Palmar, Spain", lat: 37.94, lon: -1.16 },
    age: 23,
    hand: "R",
    rank: 2,
    points: 7010,
    playstyle: "Shot-making showman",
    skills: { serve: 85, forehand: 96, backhand: 88, netPlay: 93, movement: 97 },
    pulseHistory: [90, 92, 88, 85, 80, 78, 84, 88, 91, 87, 90, 92],
    legendMatch: { legendId: "roger-federer", similarity: 79 },
    verdict:
      "Stat Man's take: the most watchable player alive. Alcaraz's drop shot–lob combo is basically a magic trick performed at 75 mph, and no one covers more court with a bigger grin. His PULSE line looks like a mountain range because he plays every point like it's match point — glorious, occasionally expensive.",
    funStat:
      "Wins 71% of his net approaches — highest of any top-10 baseliner in the modern tracking era.",
  },
  {
    id: "alexander-zverev",
    name: "Alexander Zverev",
    tour: "ATP",
    country: "GER",
    countryName: "Germany",
    origin: { city: "Hamburg, Germany", lat: 53.55, lon: 9.99 },
    age: 29,
    hand: "R",
    rank: 3,
    points: 5930,
    playstyle: "First-strike tower",
    skills: { serve: 95, forehand: 84, backhand: 90, netPlay: 74, movement: 85 },
    pulseHistory: [76, 78, 80, 82, 79, 75, 73, 77, 80, 82, 81, 79],
    legendMatch: { legendId: "pete-sampras", similarity: 68 },
    verdict:
      "Stat Man's take: when the Zverev serve is on, sets disappear in 34 minutes. The backhand is quietly elite. The mystery box is the second-serve forehand under pressure — his PULSE dips in deciding sets are visible from space, and fixing that is the difference between finalist and champion.",
    funStat:
      "Averages 11.2 aces per match — but his second-serve points won drops 14 points in deciding sets.",
  },
  {
    id: "novak-djokovic-atp",
    name: "Novak Djokovic",
    tour: "ATP",
    country: "SRB",
    countryName: "Serbia",
    origin: { city: "Belgrade, Serbia", lat: 44.79, lon: 20.45 },
    age: 39,
    hand: "R",
    rank: 4,
    points: 5560,
    playstyle: "The final boss",
    skills: { serve: 88, forehand: 90, backhand: 96, netPlay: 84, movement: 88 },
    pulseHistory: [70, 72, 75, 78, 74, 70, 68, 72, 76, 80, 78, 75],
    legendMatch: { legendId: "novak-djokovic", similarity: 100 },
    verdict:
      "Stat Man's take: comparing Djokovic to legends is awkward because he IS the control group. At 39 the movement has gone from 'impossible' to merely 'excellent,' but the return of serve remains the best in recorded history. His PULSE spikes exactly when tournaments reach the quarterfinal stage. Coincidence? He doesn't do coincidences.",
    funStat:
      "Has broken serve in 96% of matches played since 2010. Nobody else is above 90%.",
  },
  {
    id: "taylor-fritz",
    name: "Taylor Fritz",
    tour: "ATP",
    country: "USA",
    countryName: "United States",
    origin: { city: "San Diego, USA", lat: 32.72, lon: -117.16 },
    age: 28,
    hand: "R",
    rank: 5,
    points: 4675,
    playstyle: "Corporate power baseliner",
    skills: { serve: 92, forehand: 89, backhand: 85, netPlay: 76, movement: 82 },
    pulseHistory: [74, 76, 78, 80, 82, 84, 82, 80, 83, 85, 84, 86],
    legendMatch: { legendId: "andre-agassi", similarity: 62 },
    verdict:
      "Stat Man's take: Fritz is the tour's most efficient big-hitter — no wasted motion, no drama, just clean first-strike tennis and a service motion you could set a watch to. The scouting report writes itself: get him moving backward off the backhand wing or don't bother showing up.",
    funStat:
      "Holds serve 91% of the time on hard courts — top three on tour for three straight seasons.",
  },
  {
    id: "jack-draper",
    name: "Jack Draper",
    tour: "ATP",
    country: "GBR",
    countryName: "Great Britain",
    origin: { city: "Sutton, England", lat: 51.36, lon: -0.19 },
    age: 24,
    hand: "L",
    rank: 6,
    points: 4130,
    playstyle: "Lefty sledgehammer",
    skills: { serve: 91, forehand: 92, backhand: 83, netPlay: 80, movement: 84 },
    pulseHistory: [68, 72, 76, 80, 84, 86, 88, 85, 87, 89, 90, 91],
    legendMatch: { legendId: "rafael-nadal", similarity: 58 },
    verdict:
      "Stat Man's take: the lefty serve out wide is a cheat code and Draper knows it. His PULSE trajectory over the past year is the steepest climb in the men's top ten — the physical questions are answered, and now the forehand is doing genuinely rude things to opponents on fast courts.",
    funStat:
      "His PULSE has risen 23 points in 12 months — the biggest gain of any top-10 ATP player.",
  },
  {
    id: "joao-fonseca",
    name: "João Fonseca",
    tour: "ATP",
    country: "BRA",
    countryName: "Brazil",
    origin: { city: "Rio de Janeiro, Brazil", lat: -22.91, lon: -43.17 },
    age: 19,
    hand: "R",
    rank: 24,
    points: 1520,
    playstyle: "Teen wrecking ball",
    skills: { serve: 84, forehand: 93, backhand: 82, netPlay: 72, movement: 86 },
    pulseHistory: [60, 65, 70, 68, 74, 78, 82, 80, 84, 88, 90, 93],
    legendMatch: { legendId: "gustavo-kuerten", similarity: 71 },
    verdict:
      "Stat Man's take: the forehand already lives in the top five and the rest of the game is sprinting to catch up. Fonseca is the prospect our Challenger-level tracking flagged 18 months ago, and his PULSE now reads like a rocket telemetry chart. Brazil hasn't buzzed like this since Guga's headband.",
    funStat:
      "Averaged 7.1 forehand winners per set at Challenger level — a tracking-era record for a teenager.",
  },
  {
    id: "holger-rune",
    name: "Holger Rune",
    tour: "ATP",
    country: "DEN",
    countryName: "Denmark",
    origin: { city: "Gentofte, Denmark", lat: 55.75, lon: 12.55 },
    age: 23,
    hand: "R",
    rank: 9,
    points: 3440,
    playstyle: "High-voltage gambler",
    skills: { serve: 87, forehand: 88, backhand: 89, netPlay: 79, movement: 90 },
    pulseHistory: [80, 76, 70, 74, 78, 72, 68, 74, 78, 82, 79, 76],
    legendMatch: { legendId: "john-mcenroe", similarity: 64 },
    verdict:
      "Stat Man's take: Rune's ceiling is a top-two ranking and his floor is a second-round exit with a broken racquet — sometimes in the same month. Our Tilt Detector was practically invented for him. When the emotional PULSE and the tennis PULSE align, he beats anyone alive.",
    funStat:
      "Has both beaten and lost to a top-5 player in the same tournament four times since 2024.",
  },
  {
    id: "ben-shelton",
    name: "Ben Shelton",
    tour: "ATP",
    country: "USA",
    countryName: "United States",
    origin: { city: "Atlanta, USA", lat: 33.75, lon: -84.39 },
    age: 23,
    hand: "L",
    rank: 12,
    points: 3040,
    playstyle: "Left-handed lightning",
    skills: { serve: 96, forehand: 87, backhand: 78, netPlay: 85, movement: 87 },
    pulseHistory: [72, 74, 70, 76, 80, 78, 82, 84, 81, 85, 87, 88],
    legendMatch: { legendId: "pete-sampras", similarity: 60 },
    verdict:
      "Stat Man's take: the 150 mph lefty serve is the loudest shot in tennis, and the celebration is louder. Shelton plays like a college kid who never got the memo that pros are supposed to be boring. The backhand slice is catching up to the rest of the toolkit — when it does, look out.",
    funStat:
      "Hit the three fastest serves of the 2025 season — all above 149 mph.",
  },
  {
    id: "lorenzo-musetti",
    name: "Lorenzo Musetti",
    tour: "ATP",
    country: "ITA",
    countryName: "Italy",
    origin: { city: "Carrara, Italy", lat: 44.08, lon: 10.1 },
    age: 24,
    hand: "R",
    rank: 8,
    points: 3550,
    playstyle: "One-handed poet",
    skills: { serve: 82, forehand: 86, backhand: 91, netPlay: 88, movement: 89 },
    pulseHistory: [70, 72, 75, 78, 82, 85, 83, 80, 78, 81, 84, 85],
    legendMatch: { legendId: "roger-federer", similarity: 72 },
    verdict:
      "Stat Man's take: the one-handed backhand isn't dead, it just moved to Tuscany. Musetti on clay is appointment viewing — all touch, angles, and disguise. The analytics say the serve keeps him from the very top; the poetry says who cares, watch the highlight reel.",
    funStat:
      "Leads the ATP in drop-shot winners per match on clay two seasons running.",
  },
  // ─── WTA ───────────────────────────────────────────────
  {
    id: "aryna-sabalenka",
    name: "Aryna Sabalenka",
    tour: "WTA",
    country: "BLR",
    countryName: "Belarus",
    origin: { city: "Minsk, Belarus", lat: 53.9, lon: 27.57 },
    age: 28,
    hand: "R",
    rank: 1,
    points: 9780,
    playstyle: "Controlled demolition",
    skills: { serve: 93, forehand: 95, backhand: 92, netPlay: 77, movement: 84 },
    pulseHistory: [86, 88, 90, 87, 85, 88, 91, 93, 90, 92, 94, 93],
    legendMatch: { legendId: "serena-williams", similarity: 81 },
    verdict:
      "Stat Man's take: Sabalenka hits the ball like it owes her money, but the story of her No. 1 reign is restraint — the unforced error count dropped 30% while the winner count stayed nuclear. The tiger tattoo is on the forearm; the discipline is new, and it's why she's on top.",
    funStat:
      "Hits 9% more winners than anyone else in the WTA top 20 — while now sitting mid-pack in errors.",
  },
  {
    id: "iga-swiatek",
    name: "Iga Świątek",
    tour: "WTA",
    country: "POL",
    countryName: "Poland",
    origin: { city: "Warsaw, Poland", lat: 52.23, lon: 21.01 },
    age: 25,
    hand: "R",
    rank: 2,
    points: 8195,
    playstyle: "Topspin steamroller",
    skills: { serve: 84, forehand: 96, backhand: 89, netPlay: 75, movement: 95 },
    pulseHistory: [92, 94, 90, 88, 85, 82, 80, 84, 87, 90, 88, 89],
    legendMatch: { legendId: "steffi-graf", similarity: 77 },
    verdict:
      "Stat Man's take: on clay, Świątek's forehand generates more RPM than a Formula 1 gearbox and the results are similarly unfair — she wins bagel sets like they're loyalty rewards. The serve is the door opponents keep knocking on; most weeks nobody's home to answer.",
    funStat:
      "Has won 21 sets 6-0 since 2023 — more than the rest of the top 10 combined.",
  },
  {
    id: "coco-gauff",
    name: "Coco Gauff",
    tour: "WTA",
    country: "USA",
    countryName: "United States",
    origin: { city: "Atlanta, USA", lat: 33.75, lon: -84.39 },
    age: 22,
    hand: "R",
    rank: 3,
    points: 6580,
    playstyle: "Defense that counterattacks",
    skills: { serve: 86, forehand: 80, backhand: 93, netPlay: 82, movement: 97 },
    pulseHistory: [84, 82, 80, 84, 86, 88, 85, 82, 86, 89, 91, 90],
    legendMatch: { legendId: "venus-williams", similarity: 74 },
    verdict:
      "Stat Man's take: Gauff turns defense into offense faster than anyone since prime Venus — the sprint-and-flip backhand pass is a signature dish. The forehand mechanics still wobble under max pressure, but her PULSE in third sets is elite: she believes, and the numbers back the belief.",
    funStat:
      "Wins 62% of deciding sets — the best third-set record in the WTA top 10.",
  },
  {
    id: "jessica-pegula",
    name: "Jessica Pegula",
    tour: "WTA",
    country: "USA",
    countryName: "United States",
    origin: { city: "Buffalo, USA", lat: 42.89, lon: -78.88 },
    age: 32,
    hand: "R",
    rank: 4,
    points: 5345,
    playstyle: "Flat-ball chess player",
    skills: { serve: 82, forehand: 88, backhand: 90, netPlay: 78, movement: 85 },
    pulseHistory: [78, 80, 82, 80, 78, 76, 79, 82, 84, 82, 80, 81],
    legendMatch: { legendId: "chris-evert", similarity: 69 },
    verdict:
      "Stat Man's take: Pegula takes the ball earlier than almost anyone on tour and redirects pace like she's forwarding email. No wasted flash, no cheap points given. Our consistency metrics adore her — the flattest, cleanest two-hander in the business.",
    funStat:
      "Ranked top-5 in return games won for five consecutive seasons.",
  },
  {
    id: "elena-rybakina",
    name: "Elena Rybakina",
    tour: "WTA",
    country: "KAZ",
    countryName: "Kazakhstan",
    origin: { city: "Moscow, Russia", lat: 55.76, lon: 37.62 },
    age: 27,
    hand: "R",
    rank: 5,
    points: 4865,
    playstyle: "Silent assassin",
    skills: { serve: 96, forehand: 91, backhand: 87, netPlay: 80, movement: 83 },
    pulseHistory: [82, 84, 86, 84, 80, 78, 82, 85, 88, 86, 84, 86],
    legendMatch: { legendId: "maria-sharapova", similarity: 73 },
    verdict:
      "Stat Man's take: Rybakina's serve is the WTA's most valuable single shot — free points on demand, zero celebration included. She emotes roughly once per Grand Slam, which makes her PULSE line hilariously flat while opponents' lines look like seismographs.",
    funStat:
      "Leads the WTA in aces for four straight seasons — with the tour's lowest double-fault rate among big servers.",
  },
  {
    id: "mirra-andreeva",
    name: "Mirra Andreeva",
    tour: "WTA",
    country: "RUS",
    countryName: "Russia",
    origin: { city: "Krasnoyarsk, Russia", lat: 56.01, lon: 92.87 },
    age: 19,
    hand: "R",
    rank: 6,
    points: 4620,
    playstyle: "Prodigy with a plan",
    skills: { serve: 81, forehand: 87, backhand: 92, netPlay: 79, movement: 93 },
    pulseHistory: [66, 70, 74, 78, 82, 85, 88, 86, 89, 91, 93, 94],
    legendMatch: { legendId: "martina-hingis", similarity: 78 },
    verdict:
      "Stat Man's take: Andreeva sees the court like a chess engine set to maximum depth — lobs, angles, and pace changes that players ten years older haven't learned. Steepest PULSE climb in women's tennis. The Hingis comparison isn't lazy; it's the only one that fits.",
    funStat:
      "Youngest player to reach the WTA top 10 since 2007 — and our highest teenage PULSE score ever recorded.",
  },
  {
    id: "madison-keys",
    name: "Madison Keys",
    tour: "WTA",
    country: "USA",
    countryName: "United States",
    origin: { city: "Rock Island, USA", lat: 41.51, lon: -90.58 },
    age: 31,
    hand: "R",
    rank: 7,
    points: 4380,
    playstyle: "First-strike artillery",
    skills: { serve: 90, forehand: 94, backhand: 84, netPlay: 76, movement: 80 },
    pulseHistory: [74, 78, 82, 86, 90, 86, 82, 80, 78, 80, 82, 83],
    legendMatch: { legendId: "serena-williams", similarity: 66 },
    verdict:
      "Stat Man's take: when Keys times the forehand, the point is over before the sound reaches the cheap seats. The late-career breakthrough was never about the weapons — it was the calm. Her pressure-point PULSE finally matches the firepower, and it won her a Slam.",
    funStat:
      "Averages the shortest rally length among WTA top-10 players: 3.4 shots.",
  },
  {
    id: "jasmine-paolini",
    name: "Jasmine Paolini",
    tour: "WTA",
    country: "ITA",
    countryName: "Italy",
    origin: { city: "Lucca, Italy", lat: 43.84, lon: 10.5 },
    age: 30,
    hand: "R",
    rank: 8,
    points: 4068,
    playstyle: "Pocket-sized hurricane",
    skills: { serve: 78, forehand: 89, backhand: 85, netPlay: 81, movement: 94 },
    pulseHistory: [76, 78, 80, 82, 84, 82, 80, 82, 84, 86, 85, 84],
    legendMatch: { legendId: "justine-henin", similarity: 65 },
    verdict:
      "Stat Man's take: 5'4\" and plays like the court is half the size everyone else sees. Paolini's forehand punches three weight classes up, and her smile-to-winner ratio is the best vibe stat on tour. Proof you don't need a howitzer serve to live in the top ten.",
    funStat:
      "Shortest player in the top 20 — and top-3 in return points won on second serves.",
  },
  {
    id: "naomi-osaka",
    name: "Naomi Osaka",
    tour: "WTA",
    country: "JPN",
    countryName: "Japan",
    origin: { city: "Osaka, Japan", lat: 34.69, lon: 135.5 },
    age: 28,
    hand: "R",
    rank: 12,
    points: 3120,
    playstyle: "Big-stage heavyweight",
    skills: { serve: 92, forehand: 93, backhand: 86, netPlay: 70, movement: 81 },
    pulseHistory: [60, 64, 68, 72, 76, 74, 78, 82, 80, 84, 86, 87],
    legendMatch: { legendId: "serena-williams", similarity: 76 },
    verdict:
      "Stat Man's take: nobody's ball screams off the court quite like Osaka's when the lights are brightest — four Slam finals, four titles, a 100% conversion rate that borders on absurd. The comeback PULSE trend is real and climbing. Hard-court draws should be nervous.",
    funStat:
      "Has never lost a Grand Slam final: 4-0, all on hard courts.",
  },
  {
    id: "paula-badosa",
    name: "Paula Badosa",
    tour: "WTA",
    country: "ESP",
    countryName: "Spain",
    origin: { city: "New York, USA", lat: 40.71, lon: -74.01 },
    age: 28,
    hand: "R",
    rank: 10,
    points: 3540,
    playstyle: "Aggressive baseline glider",
    skills: { serve: 85, forehand: 90, backhand: 84, netPlay: 74, movement: 88 },
    pulseHistory: [70, 72, 68, 66, 70, 74, 78, 76, 79, 82, 80, 81],
    legendMatch: { legendId: "maria-sharapova", similarity: 70 },
    verdict:
      "Stat Man's take: when the body cooperates, Badosa's first-strike forehand belongs in any top-five conversation. The resilience arc is the story — every injury comeback has ended with her PULSE climbing back above 80. You cannot teach that stubbornness.",
    funStat:
      "Has returned to the top 15 after three separate injury absences of 3+ months.",
  },
];

export function getPlayer(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function currentPulse(player: Player): number {
  return player.pulseHistory[player.pulseHistory.length - 1];
}

export function pulseTrend(player: Player): number {
  const h = player.pulseHistory;
  return h[h.length - 1] - h[Math.max(0, h.length - 5)];
}
