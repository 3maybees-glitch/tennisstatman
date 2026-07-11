import { NextResponse } from "next/server";
import {
  COURTSIDE_CUSTOMER_COOKIE,
  courtsideCustomerCookieOptions,
} from "@/lib/courtside-session";
import { getSiteUrl, getStripe, grantLifetimeAccess } from "@/lib/stripe";

export async function GET(request: Request) {
  const siteUrl = getSiteUrl();
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.redirect(`${siteUrl}/pricing?error=missing-session`);
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["subscription"],
    });

    if (session.status !== "complete") {
      return NextResponse.redirect(`${siteUrl}/pricing?error=checkout-incomplete`);
    }

    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;

    if (!customerId) {
      return NextResponse.redirect(`${siteUrl}/pricing?error=missing-customer`);
    }

    if (session.mode === "payment") {
      await grantLifetimeAccess(customerId);
    } else if (session.mode !== "subscription") {
      return NextResponse.redirect(`${siteUrl}/pricing?error=checkout-incomplete`);
    }

    const response = NextResponse.redirect(`${siteUrl}/courtside?subscribed=1`);
    response.cookies.set(
      COURTSIDE_CUSTOMER_COOKIE,
      customerId,
      courtsideCustomerCookieOptions(),
    );
    return response;
  } catch {
    return NextResponse.redirect(`${siteUrl}/pricing?error=checkout-failed`);
  }
}
