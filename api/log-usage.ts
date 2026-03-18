import { readJsonBody, requireUser, sendMethodNotAllowed } from './_lib';
import { addStorageUsed, incrementAIActionsUsed, logUsage } from '../src/server/utils/supabase';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return sendMethodNotAllowed(res, ['POST']);
  }

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const body = await readJsonBody<{ action?: string; amount?: number; metadata?: unknown }>(req);
    const action = String(body.action || '');
    const amount = Number(body.amount ?? 1);

    if (!action || Number.isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid action or amount' });
    }

    await logUsage(user.id, action, amount, body.metadata);

    if (action === 'storage_used') {
      await addStorageUsed(user.id, amount);
    }

    if (action === 'ai_action') {
      await incrementAIActionsUsed(user.id, amount);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to log usage', details: String(error) });
  }
}
