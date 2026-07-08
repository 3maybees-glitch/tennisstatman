type Props = {
  size?: number;
  className?: string;
  /** Mood tweaks the expression */
  mood?: "happy" | "thinking";
};

/**
 * Tennis Stat Man — the site mascot. A cartoon tennis ball wearing glasses
 * and a sweatband, holding a clipboard. Drawn inline so it scales and
 * inherits no external assets.
 */
export function StatManMascot({ size = 96, className, mood = "happy" }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Tennis Stat Man mascot"
    >
      {/* clipboard behind body */}
      <g transform="rotate(8 92 78)">
        <rect x="82" y="58" width="26" height="34" rx="3" fill="#d9c08a" />
        <rect x="84.5" y="62" width="21" height="27" rx="2" fill="#f5efdf" />
        <rect x="90" y="55" width="10" height="6" rx="2" fill="#8b9cb8" />
        {/* tiny bar chart on the clipboard */}
        <rect x="88" y="80" width="3" height="6" fill="#2d6a4f" />
        <rect x="93" y="76" width="3" height="10" fill="#d4af37" />
        <rect x="98" y="72" width="3" height="14" fill="#2d6a4f" />
        <line x1="87" y1="67" x2="103" y2="67" stroke="#8b9cb8" strokeWidth="1.5" />
        <line x1="87" y1="71" x2="99" y2="71" stroke="#8b9cb8" strokeWidth="1.5" />
      </g>

      {/* legs */}
      <rect x="48" y="96" width="7" height="14" rx="3.5" fill="#141f35" />
      <rect x="63" y="96" width="7" height="14" rx="3.5" fill="#141f35" />
      <ellipse cx="50" cy="112" rx="8" ry="4" fill="#f0c75e" />
      <ellipse cx="68" cy="112" rx="8" ry="4" fill="#f0c75e" />

      {/* arms */}
      <path
        d="M32 70 Q20 66 16 54"
        stroke="#c8dd50"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M86 70 Q92 72 94 76"
        stroke="#c8dd50"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="15" cy="52" r="5" fill="#c8dd50" />

      {/* tennis ball body */}
      <circle cx="59" cy="62" r="40" fill="#c8dd50" />
      <circle cx="59" cy="62" r="40" fill="none" stroke="#a8bd3a" strokeWidth="2" />
      {/* ball seams */}
      <path
        d="M25 45 Q45 62 25 80"
        stroke="#ffffff"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M93 45 Q73 62 93 80"
        stroke="#ffffff"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* sweatband */}
      <path
        d="M28 38 Q59 22 90 38 L88 30 Q59 14 30 30 Z"
        fill="#d4af37"
      />
      <rect x="52" y="17" width="14" height="7" rx="3" fill="#2d6a4f" />

      {/* glasses */}
      <g stroke="#141f35" strokeWidth="2.5" fill="rgba(255,255,255,0.85)">
        <circle cx="46" cy="55" r="9" />
        <circle cx="72" cy="55" r="9" />
        <line x1="55" y1="55" x2="63" y2="55" />
      </g>
      {/* eyes */}
      <circle cx="47.5" cy="56" r="3" fill="#141f35" />
      <circle cx="70.5" cy="56" r="3" fill="#141f35" />
      <circle cx="48.5" cy="55" r="1" fill="#ffffff" />
      <circle cx="71.5" cy="55" r="1" fill="#ffffff" />

      {/* mouth */}
      {mood === "happy" ? (
        <path
          d="M48 72 Q59 82 70 72"
          stroke="#141f35"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M50 75 Q59 71 68 75"
          stroke="#141f35"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
