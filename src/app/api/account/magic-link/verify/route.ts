import { NextResponse } from "next/server";
import { verifyMagicLinkToken } from "@/lib/account/magic-link";
import { customerHasRestorableAccess } from "@/lib/account/customer-access";
import {
  COURTSIDE_CUSTOMER_COOKIE,
  courtsideCustomerCookieOptions,
} from "@/lib/courtside-session";
import { getSiteUrl } from "@/lib/stripe";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  const siteUrl = getSiteUrl();

  if (!token) {
    return NextResponse.redirect(`${siteUrl}/account?error=missing-token`);
  }

  const payload = verifyMagicLinkToken(token);
  if (!payload) {
    return NextResponse.redirect(`${siteUrl}/account?error=invalid-token`);
  }

  try {
    const allowed = await customerHasRestorableAccess(payload.customerId);
    if (!allowed) {
      return NextResponse.redirect(`${siteUrl}/account?error=no-purchase`);
    }

    const response = NextResponse.redirect(`${siteUrl}/account?signed-in=1`);
    response.cookies.set(
      COURTSIDE_CUSTOMER_COOKIE,
      payload.customerId,
      courtsideCustomerCookieOptions(),
    );
    return response;
  } catch {
    return NextResponse.redirect(`${siteUrl}/account?error=verify-failed`);
  }
}