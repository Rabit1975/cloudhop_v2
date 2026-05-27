import {
  exchangeCodeForToken,
  fetchGoogleUser,
  getFrontendUrl,
} from '../../../_shared.js';

export default async function handler(req: any, res: any) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(`${getFrontendUrl(req)}&oauth_error=${encodeURIComponent(String(error))}`);
  }

  if (!code || typeof code !== 'string') {
    return res.redirect(`${getFrontendUrl(req)}&oauth_error=no_code`);
  }

  try {
    const tokenResponse = await exchangeCodeForToken(req, code);
    const user = await fetchGoogleUser(tokenResponse.access_token);

    const redirectUrl =
      `${getFrontendUrl(req)}` +
      `&oauth_token=${encodeURIComponent(tokenResponse.access_token)}` +
      `&oauth_refresh=${encodeURIComponent(tokenResponse.refresh_token || '')}` +
      `&oauth_user=${encodeURIComponent(JSON.stringify(user))}` +
      `&oauth_expires=${tokenResponse.expires_in || 3600}`;

    return res.redirect(redirectUrl);
  } catch (caughtError: any) {
    console.error('Music OAuth callback failed:', caughtError?.message || caughtError);
    return res.redirect(`${getFrontendUrl(req)}&oauth_error=auth_failed`);
  }
}
