import { useState, useEffect, useCallback } from 'react';
import subscriptionAPI from '@/services/subscriptionAPI';
import { TierType, TIER_LIMITS } from '@/config/tiers';

export interface SubscriptionData {
  tier: TierType;
  storage_used_mb: number;
  ai_actions_used: number;
  stripe_customer_id?: string;
  tier_updated_at: string;
}

export interface UsageData {
  tier: TierType;
  storage: {
    used: number;
    limit: number | null;
    percentage: number;
  };
  ai_actions: {
    used: number;
    limit: { daily?: number; monthly?: number };
  };
  meeting_minutes: {
    limit: number | null;
  };
  hop_spaces: {
    limit: number | null;
  };
}

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch subscription data
  const fetchSubscription = useCallback(async () => {
    try {
      setLoading(true);
      const data = await subscriptionAPI.getSubscription();
      setSubscription(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      console.error('Subscription fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch usage data
  const fetchUsage = useCallback(async () => {
    try {
      const data = await subscriptionAPI.getUsage();
      setUsage(data);
    } catch (err) {
      console.error('Usage fetch error:', err);
    }
  }, []);

  // Check if user can perform action
  const checkLimit = useCallback(
    async (action: 'storage' | 'ai_action' | 'meeting', amount: number = 1) => {
      try {
        const result = await subscriptionAPI.checkLimit(action, amount);
        return result;
      } catch (err) {
        console.error('Limit check error:', err);
        return { allowed: false, reason: 'Error checking limit' };
      }
    },
    []
  );

  // Log usage
  const logUsage = useCallback(async (action: string, amount: number, metadata?: any) => {
    try {
      await subscriptionAPI.logUsage(action, amount, metadata);
      // Refresh usage data
      await fetchUsage();
    } catch (err) {
      console.error('Log usage error:', err);
    }
  }, [fetchUsage]);

  // Initial fetch
  useEffect(() => {
    fetchSubscription();
    fetchUsage();
  }, [fetchSubscription, fetchUsage]);

  // Check if feature is available
  const isFeatureAvailable = useCallback((feature: string): boolean => {
    if (!subscription) return false;

    const tier = subscription.tier;
    const featureMap: Record<string, TierType[]> = {
      'unlimited_meetings': ['plus', 'pro', 'teams'],
      'hd_video': ['plus', 'pro', 'teams'],
      '4k_video': ['pro', 'teams'],
      'custom_branding': ['pro', 'teams'],
      'meeting_transcripts': ['teams'],
      'unlimited_storage': ['pro', 'teams'],
      'unlimited_ai': ['pro', 'teams'],
      'admin_dashboard': ['teams'],
    };

    return featureMap[feature]?.includes(tier) ?? false;
  }, [subscription]);

  // Get remaining quota
  const getRemainingQuota = useCallback((type: 'storage' | 'ai_actions'): number | null => {
    if (!subscription || !usage) return null;

    if (type === 'storage') {
      const limit = usage.storage.limit;
      if (!limit) return null;
      return Math.max(0, limit - usage.storage.used);
    }

    if (type === 'ai_actions') {
      const limit = usage.ai_actions.limit.monthly;
      if (!limit) return null;
      return Math.max(0, limit - usage.ai_actions.used);
    }

    return null;
  }, [subscription, usage]);

  // Check if storage limit exceeded
  const isStorageLimitExceeded = useCallback((): boolean => {
    if (!usage) return false;
    return usage.storage.percentage >= 100;
  }, [usage]);

  // Check if AI limit exceeded
  const isAILimitExceeded = useCallback((): boolean => {
    if (!usage) return false;
    const limit = usage.ai_actions.limit.monthly;
    if (!limit) return false;
    return usage.ai_actions.used >= limit;
  }, [usage]);

  return {
    subscription,
    usage,
    loading,
    error,
    fetchSubscription,
    fetchUsage,
    checkLimit,
    logUsage,
    isFeatureAvailable,
    getRemainingQuota,
    isStorageLimitExceeded,
    isAILimitExceeded,
  };
}

export default useSubscription;
