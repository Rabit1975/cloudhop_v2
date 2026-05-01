import { sendMethodNotAllowed } from './_lib.js';
import { getPlans } from '../src/server/utils/supabase.js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return sendMethodNotAllowed(res, ['GET']);
  }

  try {
    const plans = await getPlans();
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).json(plans);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch plans', details: String(error) });
  }
}
