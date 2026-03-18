import Stripe from 'stripe';
import { readRawBody, sendMethodNotAllowed } from '../_lib.js';
import { config as appConfig, stripeReady, type TierType } from '../../src/server/config.js';
import { updateStripeCustomerForUser, updateUserTierByStripeCustomer } from '../../src/server/utils/supabase.js';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = appConfig.stripeSecretKey
  ? new Stripe(appConfig.stripeSecretKey, { apiVersion: '2026-02-25.clover' })
  : null;

const priceToTier: Record<string, TierType> = {
  ...(appConfig.stripePricePlus ? { [appConfig.stripePricePlus]: 'plus' } : {}),
  ...(appConfig.stripePricePro ? { [appConfig.stripePricePro]: 'pro' } : {}),
  ...(appConfig.stripePriceTeams ? { [appConfig.stripePriceTeams]: 'teams' } : {}),
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendMethodNotAllowed(res, ['POST']);
  }

  if (!stripeReady || !stripe) {
    return res.status(503).json({
      error: 'Stripe is not configured yet',
      required: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'STRIPE_PRICE_PLUS', 'STRIPE_PRICE_PRO', 'STRIPE_PRICE_TEAMS'],
    });
  }

  try {
    const signature = req.headers['stripe-signature'];
    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    const rawBody = await readRawBody(req);
    const event = stripe.webhooks.constructEvent(rawBody, signature, appConfig.stripeWebhookSecret!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === 'string' ? session.customer : null;
      const userId = session.metadata?.userId;

      if (customerId && userId) {
        await updateStripeCustomerForUser(userId, customerId);
      }
    }

    if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;
      const priceId = subscription.items.data[0]?.price?.id;

      if (customerId && priceId && priceToTier[priceId]) {
        await updateUserTierByStripeCustomer(customerId, priceToTier[priceId], subscription.id);
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : null;

      if (customerId) {
        await updateUserTierByStripeCustomer(customerId, 'free', subscription.id);
      }
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(400).json({ error: 'Webhook verification failed', details: String(error) });
  }
}
