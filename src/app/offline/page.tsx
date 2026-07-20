import type { Metadata } from "next";
import Link from "next/link";
import { StatManMascot } from "@/components/StatManMascot";

export const metadata: Metadata = {
  title: "You're offline",
  description: "TennisStatMan needs a connection to load live rankings and stats.",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="court-pattern">
      <section className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <StatManMascot size={96} mood="thinking" pose="magnify" />
        <h1 className="mt-8 text-3xl font-bold">You're offline</h1>
        <p className="mt-4 text-muted">
          Rankings, PULSE, and matchups need a connection. Reconnect and try
          again — your watchlist and picks stay on this device.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          Try again
        </Link>
      </section>
    </div>
  );
}
