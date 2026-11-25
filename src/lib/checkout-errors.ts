/** Friendly copy for `?error=` redirects from Stripe checkout / success handlers. */
export function checkoutRedirectMessage(code: string | null): string | null {
  if (!code) return null;

  switch (code) {
    case "missing-session":
      return "We couldn't find your checkout session. If you just paid, wait a moment and open Courtside from the same browser, or try checkout again.";
    case "checkout-incomplete":
      return "Checkout didn't finish. No charge was made — pick a plan when you're ready.";
    case "missing-customer":
      return "Payment went through but we couldn't attach your membership. Email support from the address you used at checkout and we'll fix it.";
    case "checkout-failed":
      return "Something went wrong after checkout. You weren't charged twice — try again or use the same browser you paid with.";
    default:
      return "Something went wrong with checkout. Try again, or sign in on another device from your account page if you're already a member.";
  }
}