import type { Metadata } from "next";
import { BookOpen, Radar, Sparkles, Users } from "lucide-react";
import { GuideCheckoutButton } from "@/components/GuideCheckoutButton";
import { GuidePlayerPreview } from "@/components/GuidePlayerPreview";
import { MascotExplainer } from "@/components/MascotExplainer";
import {
  GUIDE_PRICE_LABEL,
  getFeaturedGuidePlayer,
  SUMMER_2026_GUIDE,
} from "@/lib/data/guides/summer-2026";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Player Guide — Summer 2026 Edition",
  description:
    "TennisStatMan Top 50 men's and women's player guide PDF. Stylized action art, skill radars, bios, Stat Man scouting notes — Summer 2026 Edition for $4.99.",
  path: "/guides/summer-2026",
  keywords: [
    "tennis player guide",
    "ATP top 50 PDF",
    "WTA top 50 PDF",
    "tennis skill radar",
    "Summer 2026 tennis guide",
    "TennisStatMan guide",
  ],
});

const highlights = [
  {
    icon: Users,
    title: "100 player pages",
    body: "Top 50 ATP and Top 50 WTA in one downloadable PDF.",
  },
  {
    icon: Radar,
    title: "Summer 2026 radars",
    body: "Serve, forehand, backhand, net play, and movement — frozen post-Wimbledon.",
  },
  {
    icon: BookOpen,
    title: "Bio + finishes",
    body: "Born, location, height, years on tour, nationality, current and last-year ranks, top five finishes.",
  },
  {
    icon: Sparkles,
    title: "Stat Man depth",
    body: "Strengths, weaknesses, and a fun fact written around the skill breakdown.",
  },
];

type PageProps = {
  searchParams: Promise<{ canceled?: string; error?: string }>;
};

export default async function Summer2026GuidePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const featured = getFeaturedGuidePlayer();
  const edition = SUMMER_2026_GUIDE;

  return (
    <div className="court-pattern">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.16),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(45,106,79,0.22),_transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Digital download · {GUIDE_PRICE_LABEL}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Tennis<span className="text-gold">StatMan</span>
            </h1>
            <p className="mt-2 text-2xl font-semibold text-gold-light md:text-3xl">
              {edition.subtitle}
            </p>
            <p className="mt-1 text-lg text-muted">{edition.editionLabel}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {edition.snapshotNote} Instant PDF after Stripe checkout — stylized
              art, no stock photography.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GuideCheckoutButton />
              <a
                href="#sample"
                className="text-sm font-medium text-gold hover:text-gold-light"
              >
                Preview a sample page
              </a>
            </div>
            {params.canceled === "1" ? (
              <p className="mt-4 text-sm text-amber-200">
                Checkout canceled — your card was not charged.
              </p>
            ) : null}
            {params.error ? (
              <p className="mt-4 text-sm text-red-300">
                Something went wrong with payment verification. Try checkout
                again.
              </p>
            ) : null}
          </div>
          <MascotExplainer pose="clipboard">
            One hundred scouting pages, one price. I froze the radars after
            Wimbledon so you can argue with the internet using receipts.
          </MascotExplainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/5 bg-navy-light/50 p-5"
            >
              <item.icon className="text-gold" size={22} />
              <h2 className="mt-3 text-lg font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="sample" className="border-t border-white/5 bg-navy-light/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-white">Sample page</h2>
            <p className="mt-3 text-muted">
              Every player gets stylized action art, a Summer 2026 skill radar,
              bio data, finishes, Stat Man analysis, and one fun fact.
            </p>
          </div>
          <GuidePlayerPreview player={featured} />
          <div className="mt-10 flex justify-center">
            <GuideCheckoutButton
              label={`Download the full guide · ${GUIDE_PRICE_LABEL}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
