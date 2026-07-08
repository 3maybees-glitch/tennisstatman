import type { Metadata } from "next";
import { Suspense } from "react";
import { LegendCompare } from "@/components/LegendCompare";
import { MascotExplainer } from "@/components/MascotExplainer";

export const metadata: Metadata = {
  title: "Legend Comparisons",
  description:
    "Compare today's ATP and WTA stars to the legends of the game — skill overlays, similarity scores, and career trajectory tracking.",
};

export default function LegendsPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">Legend Comparisons</h1>
            <p className="mt-4 text-lg text-muted">
              How does today&apos;s game measure up to history? Overlay any
              current star against the all-time greats — skill for skill, age
              for age — and settle the argument with a{" "}
              <span className="text-gold-light">Legend Similarity Score</span>.
            </p>
          </div>
          <MascotExplainer pose="magnify" mood="thinking">
            Every era argument, under the magnifying glass. Pick a star, pick
            a legend, and I&apos;ll overlay them skill for skill — no shouting
            required.
          </MascotExplainer>
        </div>
      </section>
      <Suspense>
        <LegendCompare />
      </Suspense>
    </div>
  );
}
