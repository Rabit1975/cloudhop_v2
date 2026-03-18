import { stripeReady } from '../src/server/config';

export default async function handler(_req: any, res: any) {
  return res.status(200).json({
    status: 'ok',
    stripeReady,
    time: new Date().toISOString(),
  });
}
