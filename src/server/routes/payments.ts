import { Router } from 'express';
import Stripe from 'stripe';
import { authMiddleware, type AuthRequest } from '../middleware/auth';
import { config, stripeReady, type TierType } from '../config';
import { updateStripeCustomerForUser, updateUserTierByStripeCustomer } from '../utils/supabase';

const router = Router();

const priceToTier: Record<string, TierType> = {
  ...(config.stripePricePlus ? { [config.stripePricePlus]: 'plus' } : {}),
  ...(config.stripePricePro ? { [config.stripePricePro]: 'pro' } : {}),
  ...(config.stripePriceTeams ? { [config.stripePriceTeams]: 'teams' } : {}),
};

const stripe = config.stripeSecretKey
  ? new Stripe(config.stripeSecretKey, {
      apiVersion: '2026-02-25.clover',
    })
  : null;

function requireStripe(res: import('express').Response): boolean {
  if (!stripeReady || !stripe) {
    res.status(503).json({
      error: 'Stripe is not configured yet',
      required: [
        'STRIPE_SECRET_KEY',
        'STRIPE_WEBHOOK_SECRET',
        'STRIPE_PRICE_PLUS',
        'STRIPE_PRICE_PRO',
        'STRIPE_PRICE_TEAMS',
      ],
    });
    return false;
  }

  return true;
}

router.post('/create-checkout', authMiddleware, async (req: AuthRequest, res) => {
  if (!requireStripe(res)) return;

  try {
    const requestedTier = String(req.body.planId || '').toLowerCase() as TierType;

    if (!['plus', 'pro', 'teams'].includes(requestedTier)) {
      return res.status(400).json({ error: 'Invalid planId. Allowed: plus, pro, teams' });
    }

    const priceId = Object.keys(priceToTier).find((key) => priceToTier[key] === requestedTier);
    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is not mapped for this tier' });
    }

    const session = await stripe!.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: req.user!.email,
      success_url: `${config.appUrl}/upgrade?success=true`,
      cancel_url: `${config.appUrl}/upgrade?canceled=true`,
      metadata: {
        userId: req.user!.id,
        tier: requestedTier,
      },
    });

    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create checkout session', details: String(error) });
  }
});

router.post('/webhook', async (req, res) => {
  if (!requireStripe(res)) return;

  try {
    const signature = req.headers['stripe-signature'];
    if (!signature || typeof signature !== 'string') {
      return res.status(400).json({ error: 'Missing stripe-signature header' });
    }

    const rawBody = (req as import('express').Request & { rawBody?: Buffer }).rawBody;
    if (!rawBody) {
      return res.status(400).json({ error: 'Missing raw webhook body for signature verification' });
    }

    const event = stripe!.webhooks.constructEvent(rawBody, signature, config.stripeWebhookSecret!);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === 'string' ? session.customer : null;
      const userId = session.metadata?.userId;

      if (customerId && userId) {
        await updateStripeCustomerForUser(userId, customerId);
      }
    }

    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
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

    return res.json({ received: true });
  } catch (error) {
    return res.status(400).json({ error: 'Webhook signature verification failed', details: String(error) });
  }
});

export default router;
