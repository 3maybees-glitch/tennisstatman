import Link from "next/link";
import { Lock, Sparkles } from "lucide-react";

export function UpgradeCTA({
  title = "Courtside members only",
  description,
}: {
  title?: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 via-navy-light to-navy-light p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-gold/15 p-3 text-gold">
          <Lock size={20} />
        </div>
        <div className="flex-1">
          <h3 className="flex items-center gap-2 font-semibold text-gold-light">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-muted">{description}</p>
          <Link
            href="/pricing"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
          >
            <Sparkles size={15} />
            Go Courtside
          </Link>
        </div>
      </div>
    </div>
  );
}
