import { useSubscription } from '@/hooks/useSubscription';
import { PLANS } from '@/config/tiers';
import { AlertCircle, CheckCircle, Clock, Zap, HardDrive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UsageDashboard() {
  const { subscription, usage, loading, isStorageLimitExceeded, isAILimitExceeded } = useSubscription();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!subscription || !usage) {
    return <div className="p-6 text-muted-foreground">Unable to load usage data</div>;
  }

  const plan = PLANS[subscription.tier];
  const storagePercent = usage.storage.percentage;
  const aiPercent = usage.ai_actions.limit.monthly
    ? (usage.ai_actions.used / usage.ai_actions.limit.monthly) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              {plan.icon} {plan.name} Plan
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {plan.price_monthly === 0 ? 'Free forever' : `$${(plan.price_monthly / 100).toFixed(2)}/month`}
            </p>
          </div>
          <button
            onClick={() => navigate('/upgrade')}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30 transition-all text-sm font-medium"
          >
            Upgrade
          </button>
        </div>
      </div>

      {/* Alerts */}
      {(isStorageLimitExceeded() || isAILimitExceeded()) && (
        <div className="glass-panel rounded-xl p-4 border border-red-500/30 bg-red-500/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-300 mb-1">Usage Limit Reached</h4>
              <p className="text-sm text-red-200">
                {isStorageLimitExceeded() && 'Your storage is full. '}
                {isAILimitExceeded() && 'Your AI actions are maxed out. '}
                <button
                  onClick={() => navigate('/upgrade')}
                  className="underline hover:no-underline"
                >
                  Upgrade now
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Storage */}
      <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-5 h-5 text-cyan-400" />
          <h4 className="font-bold text-foreground">Storage</h4>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              {usage.storage.used.toLocaleString()} MB
            </span>
            <span className="text-sm text-muted-foreground">
              {usage.storage.limit ? `${usage.storage.limit.toLocaleString()} MB` : 'Unlimited'}
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                storagePercent >= 100
                  ? 'bg-red-500'
                  : storagePercent >= 80
                    ? 'bg-yellow-500'
                    : 'bg-cyan-500'
              }`}
              style={{ width: `${Math.min(storagePercent, 100)}%` }}
            />
          </div>
          {storagePercent > 80 && (
            <p className="text-xs text-yellow-300 mt-2">
              {storagePercent >= 100 ? '⚠️ Storage full' : '⚠️ Storage almost full'}
            </p>
          )}
        </div>
      </div>

      {/* AI Actions */}
      {usage.ai_actions.limit.monthly && (
        <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-foreground">AI Actions</h4>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {usage.ai_actions.used.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                {usage.ai_actions.limit.monthly?.toLocaleString()} / month
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  aiPercent >= 100
                    ? 'bg-red-500'
                    : aiPercent >= 80
                      ? 'bg-yellow-500'
                      : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min(aiPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Meeting Duration */}
      {usage.meeting_minutes.limit && (
        <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h4 className="font-bold text-foreground">Meeting Duration</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Limited to {usage.meeting_minutes.limit} minutes per meeting
          </p>
          {usage.meeting_minutes.limit <= 45 && (
            <p className="text-xs text-cyan-300 mt-2">
              💡 Upgrade to Plus for unlimited meetings
            </p>
          )}
        </div>
      )}

      {/* Features */}
      <div className="glass-panel rounded-xl p-6 border-cyan-400/20">
        <h4 className="font-bold text-foreground mb-4">Your Features</h4>
        <div className="space-y-2">
          {plan.features.slice(0, 5).map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
          {plan.features.length > 5 && (
            <p className="text-xs text-cyan-400 mt-2">
              +{plan.features.length - 5} more features
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsageDashboard;
