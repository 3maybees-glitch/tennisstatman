import type { Metadata } from "next";
import { PlayersGrid } from "@/components/PlayersGrid";
import { StatManMascot } from "@/components/StatManMascot";

export const metadata: Metadata = {
  title: "Player Cards",
  description:
    "Trading-card style scouting profiles for ATP and WTA players — Serve, Forehand, Backhand, Net Play, and Movement grades plus live PULSE scores.",
};

export default function PlayersPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-16">
          <StatManMascot size={110} className="hidden shrink-0 md:block" />
          <div>
            <h1 className="text-4xl font-bold">Player Cards</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Every player graded on the five skills that matter —{" "}
              <span className="text-gold-light">
                Serve, Forehand, Backhand, Net Play, and Movement
              </span>{" "}
              — plus a live PULSE score and a legend comparison. Collect the
              whole tour.
            </p>
          </div>
        </div>
      </section>
      <PlayersGrid />
    </div>
  );
}
