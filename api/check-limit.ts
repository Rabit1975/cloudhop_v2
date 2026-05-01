import { readJsonBody, requireUser, sendMethodNotAllowed } from './_lib.js';
import { getUserUsage } from '../src/server/utils/supabase.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendMethodNotAllowed(res, ['POST']);
  }

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const body = await readJsonBody<{ action?: string; amount?: number }>(req);
    const action = String(body.action || '');
    const amount = Number(body.amount ?? 1);
    const usage = await getUserUsage(user.id);

    let allowed = true;
    let reason = '';

    if (action === 'storage') {
      const limit = usage.storage.limit;
      if (limit && usage.storage.used + amount > limit) {
        allowed = false;
        reason = `Storage limit exceeded (${usage.storage.used + amount}MB/${limit}MB)`;
      }
    }

    if (action === 'ai_action') {
      const monthlyLimit = usage.ai_actions.limit.monthly;
      const dailyLimit = usage.ai_actions.limit.daily;

      if (monthlyLimit && usage.ai_actions.used + amount > monthlyLimit) {
        allowed = false;
        reason = `AI action monthly limit exceeded (${usage.ai_actions.used + amount}/${monthlyLimit})`;
      }

      if (dailyLimit && usage.ai_actions.used + amount > dailyLimit) {
        allowed = false;
        reason = `AI action daily limit exceeded (${usage.ai_actions.used + amount}/${dailyLimit})`;
      }
    }

    if (action === 'meeting') {
      const limit = usage.meeting_minutes.limit;
      if (limit && amount > limit) {
        allowed = false;
        reason = `Meeting duration exceeds your tier limit (${amount}/${limit} minutes)`;
      }
    }

    res.setHeader('Cache-Control', 'private, max-age=60');
    return res.status(200).json({ allowed, reason, usage });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check limits', details: String(error) });
  }
}
