import { getAuthUserFromToken } from '../src/server/utils/supabase';

export async function readRawBody(req: any): Promise<Buffer> {
  if (Buffer.isBuffer(req.body)) {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return Buffer.from(req.body);
  }

  if (req.body && typeof req.body === 'object') {
    return Buffer.from(JSON.stringify(req.body));
  }

  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

export async function readJsonBody<T = Record<string, unknown>>(req: any): Promise<T> {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body as T;
  }

  const rawBody = await readRawBody(req);
  if (!rawBody.length) {
    return {} as T;
  }

  return JSON.parse(rawBody.toString('utf8')) as T;
}

export function sendMethodNotAllowed(res: any, allowed: string[]) {
  res.setHeader('Allow', allowed.join(', '));
  return res.status(405).json({ error: 'Method not allowed' });
}

export async function requireUser(req: any, res: any) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;

  if (!token) {
    res.status(401).json({ error: 'Missing Bearer token' });
    return null;
  }

  try {
    const user = await getAuthUserFromToken(token);
    if (!user) {
      res.status(401).json({ error: 'Invalid token' });
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
    };
  } catch (error) {
    res.status(401).json({
      error: 'Authentication failed',
      details: error instanceof Error ? error.message : 'Unknown auth error',
    });
    return null;
  }
}
