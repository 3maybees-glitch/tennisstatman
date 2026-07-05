import type { Metadata } from "next";
import { StatFeatureCard } from "@/components/StatFeatureCard";
import { upcomingStats } from "@/lib/data/mock-matches";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Stats Lab",
  description:
    "Innovative tennis analytics metrics — momentum swings, clutch factor, mental resilience, and more.",
};

export default function StatsPage() {
  const preview = upcomingStats.filter((s) => s.status === "preview");
  const coming = upcomingStats.filter((s) => s.status === "coming");

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <FlaskConical className="text-gold" size={28} />
            <h1 className="text-4xl font-bold">Stats Lab</h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Traditional tennis stats tell you what happened. We&apos;re building
            metrics that explain <em>why</em> it happened and <em>what</em> happens
            next — momentum, mentality, and the forces players can&apos;t control.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-2 text-2xl font-bold">Live Previews</h2>
        <p className="mb-8 text-muted">Interactive demos with sample match data</p>
        <div className="grid gap-6 md:grid-cols-2">
          {preview.map((stat) => (
            <StatFeatureCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <h2 className="mb-2 text-2xl font-bold">On the Horizon</h2>
        <p className="mb-8 text-muted">
          Metrics in development for future releases
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coming.map((stat) => (
            <StatFeatureCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>
    </div>
  );
}
