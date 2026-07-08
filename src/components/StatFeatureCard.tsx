import {
  Activity,
  BarChart3,
  Brain,
  Cloud,
  Link2,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  wave: TrendingUp,
  target: Target,
  brain: Brain,
  cloud: Cloud,
  link: Link2,
  users: Users,
  pulse: Activity,
  bars: BarChart3,
};

const previewLinks: Record<string, string> = {
  momentum: "/stats/momentum",
  pulse: "/stats/pulse",
  skills: "/stats/skills",
};

type StatFeature = {
  id: string;
  title: string;
  description: string;
  status: "preview" | "coming";
  icon: string;
};

export function StatFeatureCard({ stat }: { stat: StatFeature }) {
  const Icon = iconMap[stat.icon] ?? TrendingUp;
  const isPreview = stat.status === "preview";

  return (
    <article
      className={`group rounded-2xl border p-6 transition-all ${
        isPreview
          ? "border-court/30 bg-court/5 hover:border-court/50 hover:bg-court/10"
          : "border-white/5 bg-navy-light/50 hover:border-white/10"
      }`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`rounded-xl p-3 ${
            isPreview ? "bg-court/20 text-court-light" : "bg-white/5 text-muted"
          }`}
        >
          <Icon size={22} />
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            isPreview
              ? "bg-court/20 text-court-light"
              : "bg-white/5 text-muted"
          }`}
        >
          {isPreview ? "Preview" : "Coming Soon"}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold group-hover:text-gold-light">
        {stat.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{stat.description}</p>
      {isPreview && (
        <Link
          href={previewLinks[stat.id] ?? "/stats"}
          className="mt-4 inline-block text-sm font-medium text-gold hover:text-gold-light"
        >
          View preview →
        </Link>
      )}
    </article>
  );
}
