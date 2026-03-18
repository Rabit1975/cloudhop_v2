import { Router } from 'express';
import type { Response } from 'express';
import { authMiddleware, type AuthRequest } from '../middleware/auth';
import {
  addStorageUsed,
  getPlans,
  getUsageHistory,
  getUserSubscription,
  getUserUsage,
  incrementAIActionsUsed,
  logUsage,
} from '../utils/supabase';

const router = Router();

router.get('/subscription', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const data = await getUserSubscription(req.user!.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch subscription', details: String(error) });
  }
});

router.get('/usage', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const data = await getUserUsage(req.user!.id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch usage', details: String(error) });
  }
});

router.post('/check-limit', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const action = String(req.body.action || '');
    const amount = Number(req.body.amount ?? 1);
    const usage = await getUserUsage(req.user!.id);

    let allowed = true;
    let reason = '';

    if (action === 'storage') {
      const storageLimit = usage.storage.limit;
      if (storageLimit && usage.storage.used + amount > storageLimit) {
        allowed = false;
        reason = `Storage limit exceeded (${usage.storage.used + amount}MB/${storageLimit}MB)`;
      }
    }

    if (action === 'ai_action') {
      const monthlyLimit = usage.ai_actions.limit.monthly;
      if (monthlyLimit && usage.ai_actions.used + amount > monthlyLimit) {
        allowed = false;
        reason = `AI action monthly limit exceeded (${usage.ai_actions.used + amount}/${monthlyLimit})`;
      }

      const dailyLimit = usage.ai_actions.limit.daily;
      if (dailyLimit && usage.ai_actions.used + amount > dailyLimit) {
        allowed = false;
        reason = `AI action daily limit exceeded (${usage.ai_actions.used + amount}/${dailyLimit})`;
      }
    }

    if (action === 'meeting') {
      const meetingLimit = usage.meeting_minutes.limit;
      if (meetingLimit && amount > meetingLimit) {
        allowed = false;
        reason = `Meeting duration exceeds your tier limit (${amount}/${meetingLimit} minutes)`;
      }
    }

    return res.json({ allowed, reason, usage });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to check limits', details: String(error) });
  }
});

router.post('/log-usage', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const action = String(req.body.action || '');
    const amount = Number(req.body.amount ?? 1);
    const metadata = req.body.metadata;

    if (!action || Number.isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid action or amount' });
    }

    await logUsage(req.user!.id, action, amount, metadata);

    if (action === 'storage_used') {
      await addStorageUsed(req.user!.id, amount);
    }

    if (action === 'ai_action') {
      await incrementAIActionsUsed(req.user!.id, amount);
    }

    return res.json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to log usage', details: String(error) });
  }
});

router.get('/usage-history', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const limit = Number(req.query.limit ?? 50);
    const data = await getUsageHistory(req.user!.id, Number.isNaN(limit) ? 50 : limit);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch usage history', details: String(error) });
  }
});

router.get('/plans', async (_req, res: Response) => {
  try {
    const data = await getPlans();
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch plans', details: String(error) });
  }
});

export default router;
