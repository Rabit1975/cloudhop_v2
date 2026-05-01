import { requireUser, sendMethodNotAllowed } from './_lib.js';
import { getUserUsage } from '../src/server/utils/supabase.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return sendMethodNotAllowed(res, ['GET']);
  }

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const usage = await getUserUsage(user.id);
    res.setHeader('Cache-Control', 'private, max-age=300');
    return res.status(200).json(usage);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch usage', details: String(error) });
  }
}
