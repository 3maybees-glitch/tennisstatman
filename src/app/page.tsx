import Link from "next/link";
import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HardcourtPreviewBanner } from "@/components/HardcourtPreviewBanner";
import { WimbledonChampionsBanner } from "@/components/WimbledonChampionsBanner";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { MatchCard } from "@/components/MatchCard";
import { PlayerCard } from "@/components/PlayerCard";
import { RankingsTable } from "@/components/RankingsTable";
import { StatFeatureCard } from "@/components/StatFeatureCard";
import { StatManMascot } from "@/components/StatManMascot";
import { featuredMatches, upcomingStats } from "@/lib/data/mock-matches";
import { players } from "@/lib/data/players";
import { getStatOfTheDay } from "@/lib/data/stat-of-the-day";
import { isHardcourtPreviewActive } from "@/lib/promotions/hardcourt-preview";
import { isWimbledonChampionsBannerActive } from "@/lib/promotions/wimbledon-champions";
import { fetchAllRankings } from "@/lib/rankings";
import {
  CalendarDays,
  Globe2,
  Swords,
  Target,
  Trophy,
  WalletCards,
} from "lucide-react";
import { HOME_FAQS } from "@/lib/seo/faqs";
import { faqPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Next-Gen Tennis Analytics",
  description:
    "ATP and WTA player cards with skill grades, PULSE form scores, legend comparisons, live rankings, a world map, and the full 2026 tournament calendar.",
  path: "/",
});

export const revalidate = 3600;

const exploreLinks = [
  {
    href: "/players",
    icon: WalletCards,
    title: "Player Cards",
    desc: "Five skill grades, star ratings, and PULSE on every card",
  },
  {
    href: "/legends",
    icon: Swords,
    title: "Legend Comparisons",
    desc: "Sinner vs. Federer at 24? Settle it with data",
  },
  {
    href: "/map",
    icon: Globe2,
    title: "World Map",
    desc: "Every tournament and every hometown on one globe",
  },
  {
    href: "/calendar",
    icon: CalendarDays,
    title: "Master Calendar",
    desc: "Slams to ITF — the whole season in one place",
  },
  {
    href: "/race",
    icon: Trophy,
    title: "Race to the Finals",
    desc: "Watch the season play out as an animated race",
  },
  {
    href: "/picks",
    icon: Target,
    title: "Beat Stat Man",
    desc: "Weekly picks against our PULSE model",
  },
];

export default async function HomePage() {
  const { atp, wta } = await fetchAllRankings();
  const daily = getStatOfTheDay();
  const featuredPlayers = players.slice(0, 2).concat(
    players.filter((p) => p.tour === "WTA").slice(0, 2),
  );

  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQS)} />
      <Hero />

      {isWimbledonChampionsBannerActive() && <WimbledonChampionsBanner />}
      {isHardcourtPreviewActive() && <HardcourtPreviewBanner />}

      {/* Stat of the Day */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-r from-gold/10 via-navy-light to-navy-light p-8 md:flex-row md:gap-10">
          <StatManMascot size={120} className="shrink-0" />
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              Stat of the Day · {daily.category}
            </p>
            <p className="mt-2 text-4xl font-bold text-gold-light md:text-5xl">
              {daily.headline}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-foreground/90">
              {daily.detail}
            </p>
            <Link
              href={daily.relatedHref}
              className="mt-4 inline-block text-sm font-medium text-gold hover:text-gold-light"
            >
              {daily.relatedLabel} →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured player cards */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Player Cards</h2>
            <p className="mt-3 text-muted">
              Serve · Forehand · Backhand · Net Play · Movement — graded like a
              scouting report, drawn like a trading card
            </p>
          </div>
          <Link href="/players" className="text-sm text-gold hover:text-gold-light">
            Collect them all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      {/* Explore grid */}
      <section className="border-y border-white/5 bg-navy-light/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-center text-3xl font-bold">
            One site, the whole sport
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exploreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-2xl border border-white/5 bg-navy-light p-6 transition-all hover:-translate-y-0.5 hover:border-gold/30"
              >
                <item.icon size={24} className="text-gold" />
                <h3 className="mt-4 text-lg font-semibold group-hover:text-gold-light">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Featured Match Analysis</h2>
          <p className="mt-3 text-muted">
            Preview our momentum tracking on iconic ATP and WTA encounters
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {featuredMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/5 bg-navy-light/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Rankings Snapshot</h2>
            <p className="mt-3 text-muted">
              Official top 5 on both tours, refreshed hourly
            </p>
            <Link
              href="/rankings"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light"
            >
              View full rankings →
            </Link>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <RankingsTable snapshot={atp} limit={5} fullPageLink />
            <RankingsTable snapshot={wta} limit={5} fullPageLink />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">The Stats Lab</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            We&apos;re building metrics that capture what traditional stats
            miss — the psychological and environmental currents running through
            every match.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingStats.map((stat) => (
            <StatFeatureCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      <FaqSection faqs={HOME_FAQS} />
    </>
  );
}
