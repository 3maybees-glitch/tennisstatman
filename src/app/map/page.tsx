import type { Metadata } from "next";
import { MascotExplainer } from "@/components/MascotExplainer";
import { WorldMap } from "@/components/WorldMap";
import { Globe2 } from "lucide-react";

export const metadata: Metadata = {
  title: "World of Tennis Map",
  description:
    "An interactive world map of professional tennis — every tournament from the Grand Slams to the ITF, plus where the world's best players come from.",
};

export default function MapPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <Globe2 className="text-gold" size={28} />
              <h1 className="text-4xl font-bold">The World of Tennis</h1>
            </div>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              The whole sport on one globe. Flip between the tournament trail —
              Slams pulsing in gold — and the hometowns of the players chasing
              them around the planet.
            </p>
          </div>
          <MascotExplainer pose="globe">
            Tennis never sleeps — when Melbourne goes dark, someone&apos;s
            warming up in Monastir. Spin the globe and follow the tour around
            the planet.
          </MascotExplainer>
        </div>
      </section>
      <WorldMap />
    </div>
  );
}
