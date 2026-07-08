import type { ReactNode } from "react";
import { StatManMascot, type MascotPose } from "./StatManMascot";

type Props = {
  pose?: MascotPose;
  mood?: "happy" | "thinking";
  size?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Stat Man with a speech bubble — drops the mascot onto a page in a given
 * pose with a short line explaining what the page is about.
 */
export function MascotExplainer({
  pose = "clipboard",
  mood = "happy",
  size = 116,
  className = "",
  children,
}: Props) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <StatManMascot size={size} pose={pose} mood={mood} className="shrink-0" />
      <div className="relative max-w-sm rounded-2xl rounded-bl-sm border border-gold/30 bg-navy-light/90 px-4 py-3 shadow-[0_0_24px_rgba(212,175,55,0.1)]">
        <span
          aria-hidden
          className="absolute -left-[7px] bottom-4 h-3.5 w-3.5 rotate-45 border-b border-l border-gold/30 bg-navy-light"
        />
        <p className="text-[11px] font-bold uppercase tracking-widest text-gold">
          Stat Man says
        </p>
        <p className="mt-1 text-sm leading-relaxed text-white">{children}</p>
      </div>
    </div>
  );
}
