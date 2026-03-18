export default async function handler(_req: any, res: any) {
  const stripeReady = Boolean(
    process.env.STRIPE_SECRET_KEY &&
    process.env.STRIPE_WEBHOOK_SECRET &&
    process.env.STRIPE_PRICE_PLUS &&
    process.env.STRIPE_PRICE_PRO &&
    process.env.STRIPE_PRICE_TEAMS
  );

  return res.status(200).json({
    status: 'ok',
    stripeReady,
    time: new Date().toISOString(),
  });
}
