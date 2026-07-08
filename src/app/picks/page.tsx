import type { Metadata } from "next";
import { MascotExplainer } from "@/components/MascotExplainer";
import { PicksGame } from "@/components/PicksGame";

export const metadata: Metadata = {
  title: "Beat Stat Man — Weekly Picks",
  description:
    "Pick winners for the week's biggest ATP and WTA matches and see if you can out-predict Stat Man and his PULSE model.",
};

export default function PicksPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold">Beat Stat Man</h1>
            <p className="mt-4 max-w-3xl text-lg text-muted">
              Four matches. Four picks. Lock yours in, then see which way Stat
              Man and the PULSE model leaned. Agree and ride together — or go
              rogue and earn the bragging rights.
            </p>
          </div>
          <MascotExplainer pose="trophy">
            Think you read the game better than my PULSE model? Four matches,
            four picks — beat me and the bragging rights trophy is all yours.
          </MascotExplainer>
        </div>
      </section>
      <PicksGame />
    </div>
  );
}
