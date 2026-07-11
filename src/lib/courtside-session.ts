import { cookies } from "next/headers";

export const COURTSIDE_CUSTOMER_COOKIE = "tsm_courtside_customer";

export async function getCourtsideCustomerId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(COURTSIDE_CUSTOMER_COOKIE)?.value ?? null;
}

export function courtsideCustomerCookieOptions(maxAge = 60 * 60 * 24 * 365) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge,
    path: "/",
  };
}
