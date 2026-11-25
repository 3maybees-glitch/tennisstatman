import { Suspense } from "react";
import { AccountPanel } from "@/components/AccountPanel";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Account",
  description:
    "Restore Courtside access on a new device, manage Stripe billing, and re-download the Player Guide.",
  path: "/account",
});

export default function AccountPage() {
  return (
    <div className="court-pattern">
      <section className="border-b border-white/5 bg-navy-light/40">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-bold">Account</h1>
          <p className="mt-4 text-lg text-muted">
            Sign back in after checkout, open the billing portal, and grab your
            Player Guide again.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-white/10 bg-navy-light p-10 text-center text-muted">
              Loading account…
            </div>
          }
        >
          <AccountPanel />
        </Suspense>
      </section>
    </div>
  );
}