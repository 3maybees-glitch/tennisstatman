import type { Metadata } from "next";
import { MapPinned } from "lucide-react";
import { MascotExplainer } from "@/components/MascotExplainer";
import { PrintProductCard } from "@/components/PrintProductCard";
import { PRINT_PRODUCTS } from "@/lib/prints";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Championship Legend Maps",
  description:
    "Wimbledon Championship Legend Land prints — gentlemen's and ladies' singles history mapped for your wall. Buy on Etsy.",
  path: "/prints",
  keywords: [
    "Wimbledon map print",
    "tennis wall art",
    "championship legend map",
    "Etsy tennis print",
  ],
});

export default function PrintsPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <MapPinned className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">Championship Legend Maps</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              The gentlemen&apos;s and ladies&apos; championship story, mapped.
              Hang Centre Court history on your wall — checkout happens on
              Etsy.
            </p>
          </div>
          <MascotExplainer pose="globe">
            Stats on the screen, legends on the wall. These prints chart every
            champion who wrote Wimbledon history — grab one before the next
            fortnight.
          </MascotExplainer>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {PRINT_PRODUCTS.map((product) => (
            <PrintProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          You&apos;ll complete your purchase on Etsy. Tennis Stat Man is not
          affiliated with the All England Club, ATP, or WTA.
        </p>
      </section>
    </div>
  );
}
