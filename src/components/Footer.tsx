import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold">
              Tennis<span className="text-gold">StatMan</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Fan-inspired professional tennis analytics. Going beyond the
              box score to reveal momentum, mentality, and the invisible forces
              that decide matches.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Tours
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/atp" className="hover:text-foreground">
                  ATP Men&apos;s Tour
                </Link>
              </li>
              <li>
                <Link href="/wta" className="hover:text-foreground">
                  WTA Women&apos;s Tour
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Stats Lab
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/stats/momentum" className="hover:text-foreground">
                  Momentum Swing Index
                </Link>
              </li>
              <li>
                <Link href="/stats" className="hover:text-foreground">
                  All Innovations
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} TennisStatMan. Not affiliated with ATP,
          WTA, or ITF. Demo data for preview purposes.
        </p>
      </div>
    </footer>
  );
}
