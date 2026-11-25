import type Stripe from "stripe";
import { GUIDE_PURCHASE_METADATA_KEY } from "@/lib/account/customer-access";
import {
  grantLifetimeAccess,
  getStripe,
  PLAYER_GUIDE_EDITION,
  PLAYER_GUIDE_PRODUCT,
} from "@/lib/stripe";

function customerIdFrom(
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null,
): string | null {
  if (!customer) return null;
  if (typeof customer === "string") return customer;
  if ("deleted" in customer && customer.deleted) return null;
  return customer.id;
}

async function loadCustomerMetadata(
  customerId: string,
): Promise<Stripe.Metadata> {
  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);
  if (customer.deleted) return {};
  return customer.metadata ?? {};
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const customerId = customerIdFrom(session.customer ?? null);
  if (!customerId) return;

  const product = session.metadata?.product;
  const stripe = getStripe();
  const existing = await loadCustomerMetadata(customerId);

  if (product === PLAYER_GUIDE_PRODUCT) {
    if (session.payment_status !== "paid") return;
    if (existing.player_guide_session_id === session.id) return;

    await stripe.customers.update(customerId, {
      metadata: {
        ...existing,
        [GUIDE_PURCHASE_METADATA_KEY]: "paid",
        player_guide_session_id: session.id,
        player_guide_edition: PLAYER_GUIDE_EDITION,
      },
    });
    return;
  }

  if (session.mode === "payment" && session.payment_status === "paid") {
    await grantLifetimeAccess(customerId);
    if (existing.courtside_checkout_session_id === session.id) return;
    await stripe.customers.update(customerId, {
      metadata: {
        ...existing,
        courtside_checkout_session_id: session.id,
        product: "courtside",
      },
    });
    return;
  }

  if (session.mode === "subscription" && session.payment_status === "paid") {
    if (existing.courtside_checkout_session_id === session.id) return;
    await stripe.customers.update(customerId, {
      metadata: {
        ...existing,
        courtside_checkout_session_id: session.id,
        product: "courtside",
      },
    });
  }
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId = customerIdFrom(subscription.customer);
  if (!customerId) return;

  const stripe = getStripe();
  const existing = await loadCustomerMetadata(customerId);

  await stripe.customers.update(customerId, {
    metadata: {
      ...existing,
      courtside_subscription_id: subscription.id,
      courtside_subscription_status: subscription.status,
      product: "courtside",
    },
  });
}