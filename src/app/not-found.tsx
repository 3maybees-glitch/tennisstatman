import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page could not be found on TennisStatMan.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="court-pattern">
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="font-mono text-sm uppercase tracking-wider text-gold">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold">Page not found</h1>
        <p className="mt-4 text-muted">
          That route doesn&apos;t exist — but the tour calendar, player cards,
          and PULSE leaderboard do.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy hover:bg-gold-light"
          >
            Home
          </Link>
          <Link
            href="/players"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/5"
          >
            Player cards
          </Link>
          <Link
            href="/stats/pulse"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/5"
          >
            PULSE leaderboard
          </Link>
        </div>
      </section>
    </div>
  );
}
