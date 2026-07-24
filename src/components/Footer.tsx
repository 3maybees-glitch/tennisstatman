import Link from "next/link";
import { X } from "lucide-react";
import { X_HANDLE, X_PROFILE_URL } from "@/lib/social";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/5 bg-navy">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="text-lg font-semibold">
              Tennis<span className="text-gold">StatMan</span>
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Fan-inspired professional tennis analytics. Going beyond the
              box score to reveal momentum, mentality, and the invisible forces
              that decide matches.
            </p>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light"
            >
              <X size={16} aria-hidden />
              @{X_HANDLE}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Explore
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/players" className="hover:text-foreground">
                  Player Cards
                </Link>
              </li>
              <li>
                <Link href="/legends" className="hover:text-foreground">
                  Legend Comparisons
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-foreground">
                  World Map
                </Link>
              </li>
              <li>
                <Link href="/prints" className="hover:text-foreground">
                  Prints
                </Link>
              </li>
              <li>
                <Link href="/guides/summer-2026" className="hover:text-foreground">
                  Player Guide
                </Link>
              </li>
              <li>
                <Link href="/guides/war-map-2026" className="hover:text-foreground">
                  2026 WAR MAP
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-foreground">
                  Master Calendar
                </Link>
              </li>
              <li>
                <Link href="/race" className="hover:text-foreground">
                  Race to the Finals
                </Link>
              </li>
              <li>
                <Link href="/race/picks" className="hover:text-foreground">
                  Beat Stat Man
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold">
              Tours
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link href="/rankings" className="hover:text-foreground">
                  Official Rankings
                </Link>
              </li>
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
                <Link href="/stats/pulse" className="hover:text-foreground">
                  PULSE Form Score
                </Link>
              </li>
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
              <li>
                <Link href="/matchups" className="hover:text-foreground">
                  Matchup Projections
                </Link>
              </li>
              <li>
                <Link href="/stats/lab" className="hover:text-foreground">
                  Stat Lab
                </Link>
              </li>
              <li>
                <Link href="/scouting" className="hover:text-foreground">
                  Deep Scouting
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground">
                  Courtside Membership
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © {new Date().getFullYear()} TennisStatMan. Not affiliated with ATP,
          WTA, or ITF. Rankings refresh hourly from official tour feeds; player
          scouting grades and proprietary metrics are editorial analytics.
        </p>
      </div>
    </footer>
  );
}
