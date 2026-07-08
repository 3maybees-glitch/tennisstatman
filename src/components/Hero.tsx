import Link from "next/link";
import { ArrowRight, Sparkles, WalletCards } from "lucide-react";
import { StatManMascot } from "./StatManMascot";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-court/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-background/90 to-background" />
      </div>

      <div className="court-pattern relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="flex flex-wrap items-center gap-12">
          <div className="max-w-3xl flex-1 basis-96">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold-light">
              <Sparkles size={14} />
              Tennis stats with a face
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              See the match{" "}
              <span className="gradient-text">beyond the scoreline</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Player cards you&apos;ll want to collect, a PULSE score you can
              read like a heartbeat, legend comparisons that settle arguments,
              and every tournament on Earth — from Wimbledon down to the ITF
              grind. Free for every fan.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/players"
                className="inline-flex items-center gap-2 rounded-xl bg-court px-6 py-3 font-semibold text-white transition-colors hover:bg-court-light"
              >
                <WalletCards size={18} />
                Browse Player Cards
              </Link>
              <Link
                href="/stats/pulse"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
              >
                Meet PULSE
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="hidden shrink-0 lg:block">
            <StatManMascot size={260} />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Tours covered", value: "ATP + WTA + ITF" },
            { label: "Signature stat", value: "PULSE" },
            { label: "Skill grades", value: "5 per player" },
            { label: "Fan built", value: "100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/5 bg-navy-light/60 px-4 py-5 backdrop-blur"
            >
              <p className="text-xs uppercase tracking-wider text-muted">
                {stat.label}
              </p>
              <p className="mt-1 text-lg font-bold text-gold-light">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
