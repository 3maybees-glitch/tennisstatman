import type { Metadata } from "next";
import { MascotExplainer } from "@/components/MascotExplainer";
import { PlayersGrid } from "@/components/PlayersGrid";
import { getFullRoster } from "@/lib/data/roster";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Player Cards",
  description:
    "Trading-card style scouting profiles for the ATP and WTA top 100 — five core skill grades plus live PULSE scores.",
};

export default async function PlayersPage() {
  const roster = await getFullRoster();

  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">Player Cards</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              The top 100 of both tours, every player graded on the five skills
              that matter —{" "}
              <span className="text-gold-light">
                Serve, Forehand, Backhand, Net Play, and Movement
              </span>{" "}
              — plus a live PULSE score and a legend comparison. Collect the
              whole tour.
            </p>
          </div>
          <MascotExplainer pose="clipboard">
            My scouting binder, open for everyone. Two hundred players, five
            grades each — I did the homework so you can just flip the cards.
          </MascotExplainer>
        </div>
      </section>
      <PlayersGrid players={roster} />
    </div>
  );
}
