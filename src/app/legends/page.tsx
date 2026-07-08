import type { Metadata } from "next";
import { Suspense } from "react";
import { LegendCompare } from "@/components/LegendCompare";
import { StatManMascot } from "@/components/StatManMascot";

export const metadata: Metadata = {
  title: "Legend Comparisons",
  description:
    "Compare today's ATP and WTA stars to the legends of the game — skill overlays, similarity scores, and career trajectory tracking.",
};

export default function LegendsPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">Legend Comparisons</h1>
            <p className="mt-4 text-lg text-muted">
              How does today&apos;s game measure up to history? Overlay any
              current star against the all-time greats — skill for skill, age
              for age — and settle the argument with a{" "}
              <span className="text-gold-light">Legend Similarity Score</span>.
            </p>
          </div>
          <StatManMascot size={120} mood="thinking" className="ml-auto hidden md:block" />
        </div>
      </section>
      <Suspense>
        <LegendCompare />
      </Suspense>
    </div>
  );
}
