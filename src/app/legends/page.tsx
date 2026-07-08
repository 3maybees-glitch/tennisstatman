import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { LegendCompare } from "@/components/LegendCompare";
import { MascotExplainer } from "@/components/MascotExplainer";
import { LEGENDS_FAQS } from "@/lib/seo/faqs";
import { faqPageJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Legend Comparisons",
  description:
    "Compare today's ATP and WTA stars to the legends of the game — skill overlays, similarity scores, and career trajectory tracking.",
  path: "/legends",
});

export default function LegendsPage() {
  return (
    <div className="court-pattern">
      <JsonLd data={faqPageJsonLd(LEGENDS_FAQS)} />
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
      <FaqSection faqs={LEGENDS_FAQS} />
    </div>
  );
}
