import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-momentum.png"
          alt=""
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/60 via-background/90 to-background" />
      </div>

      <div className="court-pattern relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold-light">
            <Sparkles size={14} />
            Next-generation tennis analytics
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            See the match{" "}
            <span className="gradient-text">beyond the scoreline</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            TennisStatMan covers ATP and WTA with stats you won&apos;t find
            anywhere else — momentum swings, clutch performance, mental
            resilience, and the external forces that shape every rally.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/stats/momentum"
              className="inline-flex items-center gap-2 rounded-xl bg-court px-6 py-3 font-semibold text-white transition-colors hover:bg-court-light"
            >
              <BarChart3 size={18} />
              Momentum Lab
            </Link>
            <Link
              href="/stats"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              Explore all stats
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Tours covered", value: "ATP + WTA" },
            { label: "Innovative metrics", value: "6+" },
            { label: "Momentum tracking", value: "Live-ready" },
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
