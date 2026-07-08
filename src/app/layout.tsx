import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TennisStatMan | Next-Gen Tennis Analytics",
    template: "%s | TennisStatMan",
  },
  description:
    "Tennis stats with a face. Player cards with skill grades, the PULSE form score, legend comparisons, a world map of tennis, and the master calendar from Grand Slams to ITF.",
  keywords: [
    "tennis stats",
    "ATP analytics",
    "WTA analytics",
    "tennis player cards",
    "PULSE tennis form score",
    "tennis legend comparison",
    "tennis tournament calendar",
    "momentum tennis",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
