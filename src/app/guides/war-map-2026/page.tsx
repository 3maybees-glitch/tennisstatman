import type { Metadata } from "next";
import {
  CalendarDays,
  Crosshair,
  GraduationCap,
  LayoutTemplate,
  Medal,
  Shield,
} from "lucide-react";
import { DigitalCheckoutButton } from "@/components/DigitalCheckoutButton";
import { MascotExplainer } from "@/components/MascotExplainer";
import { WarMapPreview } from "@/components/WarMapPreview";
import {
  WAR_MAP_2026,
  WAR_MAP_PRICE_LABEL,
} from "@/lib/data/guides/war-map-2026";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "2026 WAR MAP — One-Page Season Preview",
  description:
    "TennisStatMan 2026 WAR MAP: one-page super master season preview with depth charts, unit grades, schedule, slam score projections, freshman hopefuls, draft board, and bowl placements — $1 digital download.",
  path: "/guides/war-map-2026",
  keywords: [
    "2026 WAR MAP",
    "tennis season preview",
    "ATP WTA predictions",
    "tennis unit grades",
    "TennisStatMan war map",
    "one page tennis sheet",
  ],
});

const highlights = [
  {
    icon: LayoutTemplate,
    title: "Players & positions",
    body: "ATP and WTA depth charts with roles, countries, and scouting notes through the top 12.",
  },
  {
    icon: CalendarDays,
    title: "Schedule + stakes",
    body: "Month-by-month battle calendar from AO through Tour Finals with surface and title stakes.",
  },
  {
    icon: Shield,
    title: "Unit grades",
    body: "Serve, return, clay, hard, grass, power, defense, and clutch units scored A+ through B+.",
  },
  {
    icon: GraduationCap,
    title: "Freshmen & draft board",
    body: "Freshman hopefuls plus an NFL-style R1 / R2 / Day 3 breakout draft board with ceilings.",
  },
  {
    icon: Crosshair,
    title: "Projected scores",
    body: "All four slam winners with projected championship scores on one printable landscape page.",
  },
  {
    icon: Medal,
    title: "Bowl placements",
    body: "Turin, WTA Finals, US Open bowl, and year-end #1 destinations with bubble notes.",
  },
];

type PageProps = {
  searchParams: Promise<{ canceled?: string; error?: string }>;
};

export default async function WarMap2026Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const edition = WAR_MAP_2026;

  return (
    <div className="court-pattern">
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(45,106,79,0.2),_transparent_50%)]" />
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-6 py-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Digital download · {WAR_MAP_PRICE_LABEL}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Tennis<span className="text-gold">StatMan</span>
            </h1>
            <p className="mt-2 text-3xl font-semibold tracking-wide text-gold-light md:text-4xl">
              {edition.title}
            </p>
            <p className="mt-1 text-lg text-muted">{edition.subtitle}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {edition.snapshotNote} Instant PDF after Stripe checkout — print
              landscape, pin it up, argue all autumn.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <DigitalCheckoutButton
                product="war_map"
                label={`Buy the WAR MAP · ${WAR_MAP_PRICE_LABEL}`}
              />
              <a
                href="#preview"
                className="text-sm font-medium text-gold hover:text-gold-light"
              >
                Preview the sheet
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
            One page. Maximum intel. Depth charts, grades, freshmen, draft
            board, projected scores, bowl destinations — the whole war room for
            a buck.
          </MascotExplainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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

      <section id="preview" className="border-t border-white/5 bg-navy-light/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-bold text-white">Sheet preview</h2>
            <p className="mt-3 text-muted">
              Condensed look at what lands on the printable landscape PDF —
              every block below ships denser on the real one-pager.
            </p>
          </div>
          <WarMapPreview edition={edition} />
          <div className="mt-10 flex justify-center">
            <DigitalCheckoutButton
              product="war_map"
              label={`Download the 2026 WAR MAP · ${WAR_MAP_PRICE_LABEL}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
