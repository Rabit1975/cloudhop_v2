import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  query: { [key: string]: string | string[] };
  body: any;
}

interface VercelResponse extends ServerResponse {
  json: (body: any) => VercelResponse;
  status: (statusCode: number) => VercelResponse;
  redirect: (statusOrUrl: string | number, url?: string) => VercelResponse;
  send: (body: any) => VercelResponse;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;

  if (!code || Array.isArray(code)) {
    return res.status(400).json({ error: 'Missing or invalid code' });
  }

  const params = new URLSearchParams({
    client_id: process.env.TWITCH_CLIENT_ID!,
    client_secret: process.env.TWITCH_CLIENT_SECRET!,
    code: code as string,
    grant_type: 'authorization_code',
    redirect_uri: process.env.TWITCH_REDIRECT_URI!,
  });

  try {
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: params,
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      return res.status(500).json({ error: tokenData });
    }

    // TODO: store tokens in Supabase if needed
    // const { access_token, refresh_token, expires_in, scope, token_type } = tokenData;
    // await supabase.from('twitch_tokens').insert({ ... })

    // Redirect user back into CloudHop UI
    // In Vercel Node function, we use res.redirect
    return res.redirect('https://cloudhopv2.vercel.app');
  } catch (error) {
    console.error('Twitch Auth Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
