import { requireUser, sendMethodNotAllowed } from './_lib.js';
import { getUserSubscription } from '../src/server/utils/supabase.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return sendMethodNotAllowed(res, ['GET']);
  }

  const user = await requireUser(req, res);
  if (!user) return;

  try {
    const subscription = await getUserSubscription(user.id);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch subscription', details: String(error) });
  }
}
