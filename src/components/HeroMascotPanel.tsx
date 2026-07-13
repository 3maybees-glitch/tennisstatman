"use client";

import { useEffect, useState } from "react";
import { StatManMascot } from "./StatManMascot";

export function HeroMascotPanel() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setShow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!show) return null;

  return (
    <div className="shrink-0">
      <div className="flex flex-col items-center gap-3">
        <StatManMascot size={230} pose="wave" />
        <div className="relative max-w-xs rounded-2xl rounded-tl-sm border border-gold/30 bg-navy-light/90 px-4 py-3 shadow-[0_0_24px_rgba(212,175,55,0.1)]">
          <span
            aria-hidden
            className="absolute -top-[7px] left-8 h-3.5 w-3.5 rotate-45 border-l border-t border-gold/30 bg-navy-light"
          />
          <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
            Stat Man says
          </p>
          <p className="mt-1 text-sm leading-relaxed text-white">
            Hi, I&apos;m Stat Man! I turn every serve, swing, and scoreline into
            stats you can actually feel. Come on in.
          </p>
        </div>
      </div>
    </div>
  );
}
