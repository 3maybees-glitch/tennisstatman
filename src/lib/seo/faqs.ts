import type { FaqItem } from "./json-ld";

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is TennisStatMan?",
    answer:
      "TennisStatMan is a fan-inspired tennis analytics site covering ATP and WTA tours. It offers player cards with five skill grades, the PULSE form score, legend comparisons, live rankings, a world map of tournaments and player origins, and a full-season calendar from Grand Slams to ITF.",
  },
  {
    question: "What is the PULSE form score in tennis?",
    answer:
      "PULSE (Performance Under Load & Streak Evaluation) is TennisStatMan's 0–100 form score. It blends recent match results, opponent strength, pressure-point performance, and momentum swings into a single number that shows how hot or cold a player is right now.",
  },
  {
    question: "Is TennisStatMan free?",
    answer:
      "Yes. The Fan tier is free forever and includes live rankings, player cards, the tournament calendar, world map, current PULSE scores, three legend comparisons per day, and weekly picks. Courtside membership adds deeper archives and unlimited tools.",
  },
];

export const PULSE_FAQS: FaqItem[] = [
  {
    question: "What does PULSE stand for in tennis analytics?",
    answer:
      "PULSE stands for Performance Under Load & Streak Evaluation. It is TennisStatMan's proprietary 0–100 form score for ATP and WTA players.",
  },
  {
    question: "How is PULSE calculated?",
    answer:
      "PULSE weights four factors: 40% recent results (last 10 matches by recency and tournament tier), 25% opponent strength, 20% pressure points (break points, tiebreaks, deciding sets), and 15% momentum swings from the Momentum Swing Index.",
  },
  {
    question: "What is a good PULSE score?",
    answer:
      "A PULSE above 80 signals strong current form. Scores above 90 indicate a player is peaking and often precede deep tournament runs. Below 60 suggests a cooling-off period.",
  },
  {
    question: "How often is PULSE updated?",
    answer:
      "PULSE updates after every counted match. Rankings and roster data on TennisStatMan refresh hourly from official ATP and WTA sources.",
  },
];

export const PRICING_FAQS: FaqItem[] = [
  {
    question: "Is TennisStatMan free to use?",
    answer:
      "Yes. The Fan tier costs $0 forever and includes live ATP and WTA rankings, player cards with skill grades, current PULSE scores, the world map, the master calendar, three legend comparisons per day, and Beat Stat Man weekly picks.",
  },
  {
    question: "What is Courtside membership?",
    answer:
      "Courtside is TennisStatMan's premium tier ($6/month or $48/year) for fans who want unlimited legend comparisons, full PULSE history archives, PULSE alerts, skill category leaderboards, matchup projections, and ITF-level scouting reports.",
  },
  {
    question: "Is Courtside billing live yet?",
    answer:
      "Courtside billing is not live yet. The pricing page previews what membership will include at launch.",
  },
];

export const MOMENTUM_FAQS: FaqItem[] = [
  {
    question: "What is the Momentum Swing Index?",
    answer:
      "The Momentum Swing Index tracks how win probability shifts game-by-game during a tennis match. It flags breaks, comebacks, and psychological turning points when the likely winner changes.",
  },
  {
    question: "How do you detect momentum swings in tennis?",
    answer:
      "Win probability is recalculated after every game using score state, serve advantage, head-to-head history, and surface factors. Swings above 10% within two games are flagged as momentum events.",
  },
  {
    question: "How is momentum related to PULSE?",
    answer:
      "Momentum swings feed into PULSE — they account for 15% of a player's form score, measuring whether a player closes out matches or lets leads wobble under pressure.",
  },
];

export const LEGENDS_FAQS: FaqItem[] = [
  {
    question: "What is the Legend Similarity Score?",
    answer:
      "The Legend Similarity Score compares a current player's five skill grades (serve, forehand, backhand, net play, movement) against all-time greats and returns a percentage match with the closest legend.",
  },
  {
    question: "How many free legend comparisons do I get?",
    answer:
      "Free users get three legend comparison changes per day. Courtside members get unlimited comparisons across any player and any era.",
  },
];
