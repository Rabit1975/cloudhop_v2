import Stripe from 'stripe';
import { requireUser, sendMethodNotAllowed, readJsonBody } from '../_lib.js';
import { config, stripeReady, type TierType } from '../../src/server/config.js';

const stripe = config.stripeSecretKey
  ? new Stripe(config.stripeSecretKey, { apiVersion: '2026-02-25.clover' })
  : null;

const tierToPrice: Partial<Record<TierType, string>> = {
  plus: config.stripePricePlus,
  pro: config.stripePricePro,
  teams: config.stripePriceTeams,
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

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const body = await readJsonBody<{ planId?: TierType }>(req);
    const planId = body.planId;

    if (!planId || !tierToPrice[planId]) {
      return res.status(400).json({ error: 'Invalid planId. Allowed: plus, pro, teams' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: tierToPrice[planId]!, quantity: 1 }],
      customer_email: user.email,
      success_url: `${config.appUrl}/upgrade?success=true`,
      cancel_url: `${config.appUrl}/upgrade?canceled=true`,
      metadata: {
        userId: user.id,
        tier: planId,
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create checkout session', details: String(error) });
  }
}
