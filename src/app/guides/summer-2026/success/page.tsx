import type { Metadata } from "next";
import Link from "next/link";
import { Download, CheckCircle2 } from "lucide-react";
import {
  GUIDE_PDF_FILENAME,
  SUMMER_2026_GUIDE,
} from "@/lib/data/guides/summer-2026";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Download your Player Guide",
  description: "Download your TennisStatMan Summer 2026 Player Guide PDF.",
  path: "/guides/summer-2026/success",
});

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function GuideSuccessPage({ searchParams }: PageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="court-pattern mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-white">Missing download link</h1>
        <p className="mt-4 text-muted">
          We couldn&apos;t find a download token. If you just paid, return to
          your Stripe receipt email or purchase again from the guide page.
        </p>
        <Link
          href="/guides/summer-2026"
          className="mt-8 inline-flex rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-navy hover:bg-gold-light"
        >
          Back to the guide
        </Link>
      </div>
    );
  }

  const downloadHref = `/api/guides/download?token=${encodeURIComponent(token)}`;

  return (
    <div className="court-pattern">
      <section className="mx-auto max-w-2xl px-6 py-20 text-center">
        <CheckCircle2 className="mx-auto text-court-light" size={42} />
        <h1 className="mt-5 text-3xl font-bold text-white md:text-4xl">
          You&apos;re in. Download the guide.
        </h1>
        <p className="mt-4 text-muted">
          {SUMMER_2026_GUIDE.title} — {SUMMER_2026_GUIDE.editionLabel}. Your
          download link stays valid for 24 hours.
        </p>
        <a
          href={downloadHref}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light"
        >
          <Download size={16} />
          Download {GUIDE_PDF_FILENAME}
        </a>
        <p className="mt-6 text-sm text-muted">
          Save the file — if this tab closes, reopen this page from your
          browser history while the token is still valid.
        </p>
        <Link
          href="/guides/summer-2026"
          className="mt-8 inline-block text-sm text-gold hover:text-gold-light"
        >
          Back to product page
        </Link>
      </section>
    </div>
  );
}
