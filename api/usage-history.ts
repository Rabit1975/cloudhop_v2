import { requireUser, sendMethodNotAllowed } from './_lib.js';
import { getUsageHistory } from '../src/server/utils/supabase.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return sendMethodNotAllowed(res, ['GET']);
  }

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const limitRaw = Array.isArray(req.query?.limit) ? req.query.limit[0] : req.query?.limit;
    const limit = Number(limitRaw ?? 50);
    const history = await getUsageHistory(user.id, Number.isNaN(limit) ? 50 : limit);
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch usage history', details: String(error) });
  }
}
