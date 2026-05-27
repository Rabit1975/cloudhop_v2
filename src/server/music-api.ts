const GOOGLE_CLIENT_ID = '543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com';

type JsonInit = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
};

function getOrigin(req: any) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol = Array.isArray(forwardedProto)
    ? forwardedProto[0]
    : forwardedProto || 'https';
  const host = req.headers.host;

  return `${protocol}://${host}`;
}

export function getFrontendUrl(req: any) {
  return `${getOrigin(req)}/app?tab=music`;
}

export function getRedirectUri(req: any) {
  return `${getOrigin(req)}/api/music/auth/google/callback`;
}

export function ensureGoogleSecret() {
  const secret = process.env.GOOGLE_CLIENT_SECRET;

  if (!secret) {
    throw new Error('GOOGLE_CLIENT_SECRET is not configured');
  }

  return secret;
}

export function getBearerToken(req: any) {
  const authorization = req.headers.authorization;
  if (!authorization || typeof authorization !== 'string') {
    return null;
  }

  const [, token] = authorization.split(' ');
  return token || null;
}

export function buildGoogleAuthUrl(req: any) {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/calendar',
  ];

  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: getRedirectUri(req),
    response_type: 'code',
    scope: scopes.join(' '),
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function fetchJson<T>(url: string, init?: JsonInit): Promise<T> {
  const response = await fetch(url, init);
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(typeof payload === 'string' ? payload : JSON.stringify(payload));
  }

  return payload as T;
}

export async function fetchYouTube<T>(
  url: string,
  token: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const target = new URL(url);

  for (const [key, value] of Object.entries(params || {})) {
    target.searchParams.set(key, String(value));
  }

  return fetchJson<T>(target.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function exchangeCodeForToken(req: any, code: string) {
  const clientSecret = ensureGoogleSecret();

  return fetchJson<{
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
  }>('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: getRedirectUri(req),
    }),
  });
}

export async function fetchGoogleUser(accessToken: string) {
  return fetchJson<{
    email: string;
    name: string;
    picture: string;
  }>('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
