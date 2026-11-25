import { NextResponse } from "next/server";
import { sendMagicLinkEmail, isAccountEmailConfigured } from "@/lib/account/email";
import { createMagicLinkToken } from "@/lib/account/magic-link";
import {
  findStripeCustomersByEmail,
  pickCustomerForMagicLink,
} from "@/lib/account/customer-access";
import { getSiteUrl } from "@/lib/stripe";

type Body = { email?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!isAccountEmailConfigured()) {
    return NextResponse.json({
      ok: true,
      emailDelivery: false,
      message:
        "Email sign-in is not turned on yet. Use the same browser you checked out with, or add RESEND_API_KEY and ACCOUNT_EMAIL_FROM in Vercel.",
    });
  }

  try {
    const customers = await findStripeCustomersByEmail(email);
    const customer = await pickCustomerForMagicLink(customers);

    if (customer) {
      const token = createMagicLinkToken(customer.id, email);
      const signInUrl = `${getSiteUrl()}/api/account/magic-link/verify?token=${encodeURIComponent(token)}`;
      const { sent } = await sendMagicLinkEmail(email, signInUrl);

      if (!sent) {
        return NextResponse.json(
          { error: "We could not send email right now. Try again in a minute." },
          { status: 503 },
        );
      }
    }

    return NextResponse.json({
      ok: true,
      emailDelivery: true,
      message:
        "If we find a Courtside or Player Guide purchase for that email, we sent a sign-in link.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to start sign-in.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}