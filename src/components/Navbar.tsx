"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useMembership } from "@/lib/membership";
import { StatManMascot } from "./StatManMascot";

const links = [
  { href: "/players", label: "Players" },
  { href: "/stats/pulse", label: "PULSE" },
  { href: "/legends", label: "Legends" },
  { href: "/race", label: "Race" },
  { href: "/map", label: "Map" },
  { href: "/calendar", label: "Calendar" },
  { href: "/rankings", label: "Rankings" },
  { href: "/prints", label: "Prints" },
  { href: "/pricing", label: "Courtside" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { isMember } = useMembership();

  const navLinks = links.map((link) =>
    link.href === "/pricing" && isMember
      ? { href: "/courtside", label: "Courtside" }
      : link,
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <StatManMascot size={38} />
          <span className="text-lg font-semibold tracking-tight">
            Tennis<span className="text-gold">StatMan</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            const isCourtside =
              link.href === "/pricing" || link.href === "/courtside";
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors lg:px-3 lg:text-base ${
                    isCourtside
                      ? "bg-gold px-3.5 text-navy hover:bg-gold-light lg:px-4"
                      : active
                        ? "bg-court/20 text-gold-light"
                        : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {isCourtside && isMember && <Sparkles size={13} />}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="rounded-lg p-2 text-muted hover:bg-white/5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    link.href === "/pricing" || link.href === "/courtside"
                      ? "bg-gold text-center font-semibold text-navy hover:bg-gold-light"
                      : "text-muted hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
