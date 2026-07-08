import type { Metadata } from "next";
import { CalendarView } from "@/components/CalendarView";
import { CalendarDays } from "lucide-react";

export const metadata: Metadata = {
  title: "Master Calendar",
  description:
    "Every professional tennis event in one calendar — Grand Slams, Masters, 500s, 250s, Challengers, and ITF tournaments with dates, surfaces, and prize money.",
};

export default function CalendarPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-center gap-3">
            <CalendarDays className="text-gold" size={28} />
            <h1 className="text-4xl font-bold">The Master Calendar</h1>
          </div>
          <p className="mt-4 max-w-3xl text-xl text-foreground/90">
            Every level of professional tennis in one place — from the Grand
            Slams down to the Challengers and ITF events where next year&apos;s
            stars are grinding right now. Filter by level and surface.
          </p>
        </div>
      </section>
      <CalendarView />
    </div>
  );
}
