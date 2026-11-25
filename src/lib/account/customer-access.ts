import type Stripe from "stripe";
import {
  getCourtsideMembership,
  getStripe,
  PLAYER_GUIDE_EDITION,
} from "@/lib/stripe";

export const GUIDE_PURCHASE_METADATA_KEY = "player_guide_summer_2026";

export async function findStripeCustomersByEmail(
  email: string,
): Promise<Stripe.Customer[]> {
  const stripe = getStripe();
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];

  const list = await stripe.customers.list({
    email: normalized,
    limit: 10,
  });

  return list.data.filter((customer): customer is Stripe.Customer => {
    return !("deleted" in customer && customer.deleted);
  });
}

export async function customerHasGuidePurchase(
  customerId: string,
): Promise<boolean> {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return false;
  return customer.metadata?.[GUIDE_PURCHASE_METADATA_KEY] === "paid";
}

export async function customerHasRestorableAccess(
  customerId: string,
): Promise<boolean> {
  const membership = await getCourtsideMembership(customerId);
  if (membership.active) return true;
  return customerHasGuidePurchase(customerId);
}

/** Prefer an active Courtside member; otherwise the first customer with guide access. */
export async function pickCustomerForMagicLink(
  customers: Stripe.Customer[],
): Promise<Stripe.Customer | null> {
  for (const customer of customers) {
    const membership = await getCourtsideMembership(customer.id);
    if (membership.active) return customer;
  }

  for (const customer of customers) {
    if (await customerHasGuidePurchase(customer.id)) {
      return customer;
    }
  }

  return customers[0] ?? null;
}

export function guideEditionFromMetadata(
  metadata: Stripe.Metadata | null | undefined,
): string | null {
  const edition = metadata?.player_guide_edition?.trim();
  if (edition === PLAYER_GUIDE_EDITION) return edition;
  if (metadata?.[GUIDE_PURCHASE_METADATA_KEY] === "paid") {
    return PLAYER_GUIDE_EDITION;
  }
  return null;
}