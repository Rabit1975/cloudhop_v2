import { createClient } from '@supabase/supabase-js';
import { config, type TierType } from '../config.js';

export interface UserSubscription {
  id: string;
  tier: TierType;
  storage_used_mb: number;
  ai_actions_used: number;
  ai_actions_reset_date: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  tier_updated_at: string;
  created_at: string;
}

const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);
const supabaseAuth = createClient(config.supabaseUrl, config.supabaseAnonKey);

export async function getAuthUserFromToken(accessToken: string) {
  const { data, error } = await supabaseAuth.auth.getUser(accessToken);
  if (error) throw error;
  return data.user;
}

export async function getUserSubscription(userId: string): Promise<UserSubscription> {
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data as UserSubscription;
}

export async function getPlanByTier(tier: TierType) {
  const { data, error } = await supabaseAdmin
    .from('plans')
    .select('*')
    .eq('id', tier)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserUsage(userId: string) {
  const subscription = await getUserSubscription(userId);
  const plan = await getPlanByTier(subscription.tier);

  const storageLimitMb = plan.storage_gb ? plan.storage_gb * 1024 : null;

  return {
    tier: subscription.tier,
    storage: {
      used: subscription.storage_used_mb,
      limit: storageLimitMb,
      percentage: storageLimitMb ? (subscription.storage_used_mb / storageLimitMb) * 100 : 0,
    },
    ai_actions: {
      used: subscription.ai_actions_used,
      limit: {
        daily: subscription.tier === 'free' ? 5 : undefined,
        monthly: plan.ai_actions_monthly || undefined,
      },
    },
    meeting_minutes: {
      limit: plan.max_meeting_minutes,
    },
  };
}

export async function logUsage(userId: string, actionType: string, amount: number, metadata?: unknown) {
  const { error } = await supabaseAdmin.from('usage_logs').insert({
    user_id: userId,
    action_type: actionType,
    amount,
    metadata: metadata ?? null,
  });

  if (error) throw error;
}

export async function addStorageUsed(userId: string, amountMb: number) {
  const current = await getUserSubscription(userId);
  const { error } = await supabaseAdmin
    .from('user_subscriptions')
    .update({ storage_used_mb: current.storage_used_mb + amountMb })
    .eq('id', userId);

  if (error) throw error;
}

export async function incrementAIActionsUsed(userId: string, increment: number = 1) {
  const current = await getUserSubscription(userId);
  const { error } = await supabaseAdmin
    .from('user_subscriptions')
    .update({ ai_actions_used: current.ai_actions_used + increment })
    .eq('id', userId);

  if (error) throw error;
}

export async function updateUserTierByStripeCustomer(stripeCustomerId: string, nextTier: TierType, stripeSubscriptionId?: string) {
  const patch: Record<string, unknown> = {
    tier: nextTier,
    tier_updated_at: new Date().toISOString(),
    ai_actions_used: 0,
  };

  if (stripeSubscriptionId) {
    patch.stripe_subscription_id = stripeSubscriptionId;
  }

  const { error } = await supabaseAdmin
    .from('user_subscriptions')
    .update(patch)
    .eq('stripe_customer_id', stripeCustomerId);

  if (error) throw error;
}

export async function updateStripeCustomerForUser(userId: string, stripeCustomerId: string) {
  const { error } = await supabaseAdmin
    .from('user_subscriptions')
    .update({ stripe_customer_id: stripeCustomerId })
    .eq('id', userId);

  if (error) throw error;
}

export async function getUsageHistory(userId: string, limit: number = 50) {
  const { data, error } = await supabaseAdmin
    .from('usage_logs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getPlans() {
  const { data, error } = await supabaseAdmin.from('plans').select('*').order('price_monthly', { ascending: true });
  if (error) throw error;
  return data;
}
