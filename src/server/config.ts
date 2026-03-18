function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function getOptionalNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function getOptionalEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value : undefined;
}

const allowedOriginsFromEnv = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

export const config = {
  port: getOptionalNumber('PORT', 3001),
  appUrl: process.env.VITE_APP_URL || 'http://localhost:5173',
  allowedOrigins:
    allowedOriginsFromEnv.length > 0
      ? allowedOriginsFromEnv
      : ['http://localhost:5173', 'http://localhost:3000'],
  supabaseUrl: process.env.SUPABASE_URL || getRequiredEnv('VITE_SUPABASE_URL'),
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY || getRequiredEnv('VITE_SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'),
  stripeSecretKey: getOptionalEnv('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: getOptionalEnv('STRIPE_WEBHOOK_SECRET'),
  stripePricePlus: getOptionalEnv('STRIPE_PRICE_PLUS'),
  stripePricePro: getOptionalEnv('STRIPE_PRICE_PRO'),
  stripePriceTeams: getOptionalEnv('STRIPE_PRICE_TEAMS'),
};

export type TierType = 'free' | 'plus' | 'pro' | 'teams';

export const stripeReady = Boolean(
  config.stripeSecretKey &&
    config.stripeWebhookSecret &&
    config.stripePricePlus &&
    config.stripePricePro &&
    config.stripePriceTeams
);
