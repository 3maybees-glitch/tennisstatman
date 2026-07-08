export type MascotPose =
  | "clipboard"
  | "wave"
  | "point"
  | "trophy"
  | "racquet"
  | "flex"
  | "globe"
  | "calendar"
  | "stopwatch"
  | "magnify"
  | "chart"
  | "flask"
  | "heart"
  | "thumbsup";

type Props = {
  size?: number;
  className?: string;
  /** Mood tweaks the expression */
  mood?: "happy" | "thinking";
  /** Pose swaps the arms and the prop Stat Man is holding */
  pose?: MascotPose;
};

const ARM = {
  stroke: "#c8dd50",
  strokeWidth: 7,
  strokeLinecap: "round" as const,
  fill: "none",
};

function Hand({ x, y }: { x: number; y: number }) {
  return <circle cx={x} cy={y} r={5} fill="#c8dd50" />;
}

function ArmLeftOut() {
  return (
    <>
      <path d="M32 70 Q20 66 16 54" {...ARM} />
      <Hand x={15} y={52} />
    </>
  );
}

function ArmLeftDown() {
  return (
    <>
      <path d="M30 74 Q23 82 22 91" {...ARM} />
      <Hand x={22} y={93} />
    </>
  );
}

function ArmRightDown() {
  return (
    <>
      <path d="M88 74 Q95 82 96 91" {...ARM} />
      <Hand x={96} y={93} />
    </>
  );
}

function ArmRightUp() {
  return (
    <>
      <path d="M88 66 Q98 52 100 40" {...ARM} />
      <Hand x={101} y={38} />
    </>
  );
}

function ArmRightOut() {
  return (
    <>
      <path d="M88 68 Q99 64 107 61" {...ARM} />
      <Hand x={108} y={60} />
    </>
  );
}

function ArmLeftUp() {
  return (
    <>
      <path d="M30 66 Q20 52 18 40" {...ARM} />
      <Hand x={17} y={38} />
    </>
  );
}

/** Arms + prop for each pose. Rendered before the body so arms tuck behind it. */
function PoseBack({ pose }: { pose: MascotPose }) {
  switch (pose) {
    case "clipboard":
      return (
        <g transform="rotate(8 92 78)">
          <rect x="82" y="58" width="26" height="34" rx="3" fill="#d9c08a" />
          <rect x="84.5" y="62" width="21" height="27" rx="2" fill="#f5efdf" />
          <rect x="90" y="55" width="10" height="6" rx="2" fill="#8b9cb8" />
          <rect x="88" y="80" width="3" height="6" fill="#2d6a4f" />
          <rect x="93" y="76" width="3" height="10" fill="#d4af37" />
          <rect x="98" y="72" width="3" height="14" fill="#2d6a4f" />
          <line x1="87" y1="67" x2="103" y2="67" stroke="#8b9cb8" strokeWidth="1.5" />
          <line x1="87" y1="71" x2="99" y2="71" stroke="#8b9cb8" strokeWidth="1.5" />
        </g>
      );
    default:
      return null;
  }
}

/** Arms + prop rendered after the body so they sit in front. */
function PoseFront({ pose }: { pose: MascotPose }) {
  switch (pose) {
    case "clipboard":
      return (
        <>
          <ArmLeftOut />
          <path d="M86 70 Q92 72 94 76" {...ARM} />
        </>
      );
    case "wave":
      return (
        <>
          <ArmLeftDown />
          <ArmRightUp />
          {/* motion arcs by the waving hand */}
          <path d="M106 30 Q110 34 110 40" stroke="#f0c75e" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M109 25 Q115 31 115 39" stroke="#f0c75e" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        </>
      );
    case "point":
      return (
        <>
          <ArmLeftDown />
          <ArmRightOut />
          {/* pointing finger */}
          <rect x="108" y="57.5" width="9" height="5" rx="2.5" fill="#c8dd50" />
        </>
      );
    case "trophy":
      return (
        <>
          <ArmLeftUp />
          <ArmRightUp />
          {/* gold trophy in the right hand */}
          <g transform="translate(101 20)">
            <path d="M-7 0 H7 V6 Q7 14 0 15 Q-7 14 -7 6 Z" fill="#d4af37" />
            <path d="M-7 2 Q-13 3 -10 9 Q-8 12 -6 10" fill="none" stroke="#d4af37" strokeWidth="2" />
            <path d="M7 2 Q13 3 10 9 Q8 12 6 10" fill="none" stroke="#d4af37" strokeWidth="2" />
            <rect x="-1.5" y="14" width="3" height="4" fill="#b8962e" />
            <rect x="-5" y="18" width="10" height="3" rx="1" fill="#b8962e" />
            <circle cx="0" cy="6" r="2" fill="#f0c75e" />
          </g>
        </>
      );
    case "racquet":
      return (
        <>
          <ArmLeftOut />
          <ArmRightUp />
          {/* racquet in the right hand */}
          <g transform="rotate(-24 103 20)">
            <line x1="103" y1="38" x2="103" y2="30" stroke="#8b5a2b" strokeWidth="3.5" strokeLinecap="round" />
            <ellipse cx="103" cy="18" rx="9" ry="12" fill="rgba(255,255,255,0.15)" stroke="#d4af37" strokeWidth="2.5" />
            <line x1="97" y1="14" x2="109" y2="14" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="96" y1="18" x2="110" y2="18" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="97" y1="22" x2="109" y2="22" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="99" y1="10" x2="99" y2="26" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="103" y1="8" x2="103" y2="28" stroke="#ffffff" strokeWidth="0.8" />
            <line x1="107" y1="10" x2="107" y2="26" stroke="#ffffff" strokeWidth="0.8" />
          </g>
        </>
      );
    case "flex":
      return (
        <>
          {/* double bicep flex */}
          <path d="M30 68 Q17 62 20 48" {...ARM} />
          <Hand x={21} y={46} />
          <path d="M88 68 Q101 62 98 48" {...ARM} />
          <Hand x={97} y={46} />
          {/* sparkle */}
          <path d="M12 42 l2 0 M13 41 l0 2" stroke="#f0c75e" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M106 42 l2 0 M107 41 l0 2" stroke="#f0c75e" strokeWidth="1.5" strokeLinecap="round" />
        </>
      );
    case "globe":
      return (
        <>
          <ArmRightDown />
          {/* globe cradled in the left hand */}
          <path d="M32 72 Q24 78 21 84" {...ARM} />
          <circle cx="16" cy="76" r="11" fill="#1d4ed8" stroke="#3b82f6" strokeWidth="1.5" />
          <path d="M16 65 Q10 76 16 87 M16 65 Q22 76 16 87" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <line x1="5.5" y1="76" x2="26.5" y2="76" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <path d="M9 71 Q13 68 18 71 Q21 73 24 71" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 81 Q14 83 19 81" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case "calendar":
      return (
        <>
          <ArmLeftDown />
          <path d="M88 68 Q93 64 95 58" {...ARM} />
          {/* calendar card in the right hand */}
          <g transform="rotate(6 104 56)">
            <rect x="93" y="46" width="23" height="22" rx="2.5" fill="#f5efdf" />
            <rect x="93" y="46" width="23" height="6" rx="2.5" fill="#d4af37" />
            <line x1="98" y1="44" x2="98" y2="49" stroke="#8b9cb8" strokeWidth="2" strokeLinecap="round" />
            <line x1="111" y1="44" x2="111" y2="49" stroke="#8b9cb8" strokeWidth="2" strokeLinecap="round" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={96 + col * 4.7}
                  y={54.5 + row * 4}
                  width="3"
                  height="2.6"
                  rx="0.6"
                  fill={row === 1 && col === 2 ? "#2d6a4f" : "#c9bfa3"}
                />
              )),
            )}
          </g>
        </>
      );
    case "stopwatch":
      return (
        <>
          <ArmLeftOut />
          <path d="M88 66 Q97 56 100 48" {...ARM} />
          <Hand x={101} y={46} />
          {/* stopwatch in the right hand */}
          <rect x="100" y="26" width="5" height="4" rx="1" fill="#8b9cb8" />
          <line x1="106.5" y1="30" x2="109" y2="27" stroke="#8b9cb8" strokeWidth="2" strokeLinecap="round" />
          <circle cx="102.5" cy="38" r="9" fill="#f5efdf" stroke="#141f35" strokeWidth="2" />
          <line x1="102.5" y1="38" x2="102.5" y2="32.5" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="102.5" y1="38" x2="106" y2="40" stroke="#141f35" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case "magnify":
      return (
        <>
          <ArmLeftDown />
          <path d="M88 66 Q95 58 98 52" {...ARM} />
          <Hand x={99} y={50} />
          {/* magnifying glass in the right hand */}
          <line x1="99" y1="49" x2="104" y2="42" stroke="#8b5a2b" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="107" cy="37" r="8" fill="rgba(59,130,246,0.2)" stroke="#d4af37" strokeWidth="2.5" />
          <path d="M103 34 Q105 32 108 32" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      );
    case "chart":
      return (
        <>
          <ArmLeftDown />
          <path d="M88 68 Q93 66 95 62" {...ARM} />
          {/* rising chart placard in the right hand */}
          <g transform="rotate(4 104 52)">
            <rect x="92" y="40" width="24" height="22" rx="2.5" fill="#141f35" stroke="#d4af37" strokeWidth="1.5" />
            <polyline
              points="95,58 100,53 104,55 112,44"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="112" cy="44" r="1.8" fill="#f0c75e" />
          </g>
        </>
      );
    case "flask":
      return (
        <>
          <ArmLeftOut />
          <path d="M88 66 Q96 58 99 52" {...ARM} />
          <Hand x={100} y={50} />
          {/* bubbling flask in the right hand */}
          <g transform="rotate(8 104 38)">
            <path d="M101 26 h6 v8 l6 12 q1 3 -2 3 h-14 q-3 0 -2 -3 l6 -12 Z" fill="#f5efdf" stroke="#141f35" strokeWidth="1.5" />
            <path d="M98.5 40 l3.5 -6 v0 h4 l3.5 6 q1.5 3 -1 3 h-9 q-2.5 0 -1 -3 Z" fill="#40916c" opacity="0.85" />
            <circle cx="103" cy="22" r="1.5" fill="#40916c" opacity="0.7" />
            <circle cx="106.5" cy="18" r="2" fill="#40916c" opacity="0.5" />
          </g>
        </>
      );
    case "heart":
      return (
        <>
          <ArmRightDown />
          <path d="M32 70 Q22 66 18 58" {...ARM} />
          {/* heart with a pulse line in the left hand */}
          <g transform="translate(15 44)">
            <path
              d="M0 3 C-2 -3 -11 -2 -10 5 C-9.5 10 -3 14 0 16 C3 14 9.5 10 10 5 C11 -2 2 -3 0 3 Z"
              fill="#ef4444"
              stroke="#f87171"
              strokeWidth="1"
            />
            <polyline
              points="-7,7 -3,7 -1.5,3 1,11 3,7 7,7"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </>
      );
    case "thumbsup":
      return (
        <>
          <ArmLeftDown />
          <path d="M88 66 Q97 58 100 50" {...ARM} />
          {/* thumbs-up fist */}
          <circle cx="102" cy="46" r="6" fill="#c8dd50" />
          <rect x="99" y="34" width="5" height="10" rx="2.5" fill="#c8dd50" />
        </>
      );
    default:
      return null;
  }
}

/**
 * Tennis Stat Man — the site mascot. A cartoon tennis ball wearing glasses
 * and a sweatband, striking a different pose on every page. Drawn inline so
 * it scales and inherits no external assets.
 */
export function StatManMascot({
  size = 96,
  className,
  mood = "happy",
  pose = "clipboard",
}: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Tennis Stat Man mascot"
    >
      <PoseBack pose={pose} />

      {/* legs */}
      <rect x="48" y="96" width="7" height="14" rx="3.5" fill="#141f35" />
      <rect x="63" y="96" width="7" height="14" rx="3.5" fill="#141f35" />
      <ellipse cx="50" cy="112" rx="8" ry="4" fill="#f0c75e" />
      <ellipse cx="68" cy="112" rx="8" ry="4" fill="#f0c75e" />

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

      <PoseFront pose={pose} />

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
