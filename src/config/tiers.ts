export type TierType = 'free' | 'plus' | 'pro' | 'teams';

export interface Plan {
  id: TierType;
  name: string;
  price_monthly: number;
  storage_gb: number | null;
  ai_actions_monthly: number | null;
  max_meeting_minutes: number | null;
  features: string[];
  color: string;
  icon: string;
}

export const PLANS: Record<TierType, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    price_monthly: 0,
    storage_gb: 1,
    ai_actions_monthly: 5, // per day
    max_meeting_minutes: 45,
    color: 'from-gray-500/20 to-gray-600/20',
    icon: '🎯',
    features: [
      'Unlimited messaging & 1:1 chats',
      'Up to 45-minute meetings',
      '1 Hop Space',
      '720p video & basic screen sharing',
      '5 AI actions/day',
      '1GB cloud storage',
      'Join unlimited communities',
      'Mobile + desktop apps',
      'Custom emoji & reactions',
    ],
  },
  plus: {
    id: 'plus',
    name: 'Plus',
    price_monthly: 599,
    storage_gb: 25,
    ai_actions_monthly: 300, // per month
    max_meeting_minutes: null, // unlimited
    color: 'from-cyan-500/20 to-cyan-600/20',
    icon: '⭐',
    features: [
      'Everything in Free, plus:',
      'Unlimited meeting length',
      'Up to 1080p HD video',
      '5 Hop Spaces',
      'Unlimited translations',
      '300 AI actions/month',
      'Advanced AI summaries (long-form)',
      'Unlimited message history',
      '25GB cloud storage',
      'Group permissions & roles',
      'Priority customer support',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price_monthly: 1499,
    storage_gb: 100,
    ai_actions_monthly: null, // unlimited
    max_meeting_minutes: null, // unlimited
    color: 'from-magenta-500/20 to-purple-600/20',
    icon: '🚀',
    features: [
      'Everything in Plus, plus:',
      'Unlimited Hop Spaces',
      'AI meeting notes & action-item extraction',
      'Sentiment analysis & message rewrite styles',
      'Real-time meeting translation',
      '4K video support (bandwidth-based)',
      'Multi-window & high frame-rate screen share',
      '100GB cloud storage',
      'Custom branding (logo + colors)',
      'Community analytics',
      'Channel automations (AI-powered)',
      'API & integrations access',
    ],
  },
  teams: {
    id: 'teams',
    name: 'Teams',
    price_monthly: 899,
    storage_gb: null, // unlimited
    ai_actions_monthly: null, // unlimited
    max_meeting_minutes: null, // unlimited
    color: 'from-cyan-500/20 to-magenta-500/20',
    icon: '👥',
    features: [
      'Everything in Pro, plus:',
      'Admin dashboard',
      'Team spaces (shared)',
      'Meeting recording & transcripts',
      'Unlimited storage per team',
      'Compliance mode',
      'User provisioning',
      'Priority email + chat support',
      'Internal-only communities',
    ],
  },
};

export const TIER_LIMITS = {
  free: {
    storage_mb: 1024,
    ai_actions_daily: 5,
    ai_actions_monthly: null,
    meeting_minutes: 45,
    hop_spaces: 1,
  },
  plus: {
    storage_mb: 25 * 1024,
    ai_actions_daily: null,
    ai_actions_monthly: 300,
    meeting_minutes: null, // unlimited
    hop_spaces: 5,
  },
  pro: {
    storage_mb: 100 * 1024,
    ai_actions_daily: null,
    ai_actions_monthly: null, // unlimited
    meeting_minutes: null, // unlimited
    hop_spaces: null, // unlimited
  },
  teams: {
    storage_mb: null, // unlimited
    ai_actions_daily: null,
    ai_actions_monthly: null, // unlimited
    meeting_minutes: null, // unlimited
    hop_spaces: null, // unlimited
  },
};

export const TIER_ORDER: TierType[] = ['free', 'plus', 'pro', 'teams'];

export function isTierHigher(tier1: TierType, tier2: TierType): boolean {
  return TIER_ORDER.indexOf(tier1) > TIER_ORDER.indexOf(tier2);
}

export function getStorageLimit(tier: TierType): number | null {
  return TIER_LIMITS[tier].storage_mb;
}

export function getAIActionLimit(tier: TierType): { daily?: number; monthly?: number } {
  return {
    daily: TIER_LIMITS[tier].ai_actions_daily || undefined,
    monthly: TIER_LIMITS[tier].ai_actions_monthly || undefined,
  };
}

export function getMeetingLimit(tier: TierType): number | null {
  return TIER_LIMITS[tier].meeting_minutes;
}

export function getHopSpaceLimit(tier: TierType): number | null {
  return TIER_LIMITS[tier].hop_spaces;
}
