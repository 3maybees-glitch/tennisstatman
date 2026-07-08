import { gradeColor, letterGrade } from "@/lib/data/grades";

export function GradeChip({ label, score }: { label: string; score: number }) {
  const color = gradeColor(score);
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2">
      <span className="text-xs text-muted">{label}</span>
      <span className="flex items-center gap-2">
        <span className="font-mono text-xs text-muted">{score}</span>
        <span
          className="rounded px-1.5 py-0.5 font-mono text-xs font-bold"
          style={{ color, backgroundColor: `${color}22` }}
        >
          {letterGrade(score)}
        </span>
      </span>
    </div>
  );
}

export function StarRating({ stars, size = 16 }: { stars: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`${stars} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill =
          stars >= i ? "full" : stars >= i - 0.5 ? "half" : "empty";
        return <Star key={i} fill={fill} size={size} />;
      })}
    </span>
  );
}

function Star({ fill, size }: { fill: "full" | "half" | "empty"; size: number }) {
  const id = `star-${fill}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {fill === "half" && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#f0c75e" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.15)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={
          fill === "full"
            ? "#f0c75e"
            : fill === "half"
              ? `url(#${id})`
              : "rgba(255,255,255,0.15)"
        }
      />
    </svg>
  );
}
