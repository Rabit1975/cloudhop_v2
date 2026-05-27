import {
  buildGoogleAuthUrl,
  exchangeCodeForToken,
  fetchGoogleUser,
  fetchYouTube,
  getBearerToken,
  getFrontendUrl,
} from '../../src/server/music-api.js';

function getRoute(req: any) {
  const route = req.query.route;

  if (Array.isArray(route)) {
    return route.join('/');
  }

  if (typeof route === 'string') {
    return route;
  }

  return '';
}

export default async function handler(req: any, res: any) {
  if (req.method && req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const route = getRoute(req);

  if (route === 'auth/google/url') {
    return res.status(200).json({ url: buildGoogleAuthUrl(req) });
  }

  if (route === 'auth/google/callback') {
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

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    if (route === 'youtube/playlists') {
      const response = await fetchYouTube<{ items?: unknown[] }>(
        'https://www.googleapis.com/youtube/v3/playlists',
        token,
        {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 50,
        }
      );

      return res.status(200).json(response.items || []);
    }

    if (route === 'youtube/playlist-items') {
      const playlistId = req.query.playlistId;

      if (!playlistId || typeof playlistId !== 'string') {
        return res.status(400).json({ error: 'playlistId is required' });
      }

      const response = await fetchYouTube<{ items?: unknown[] }>(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        token,
        {
          part: 'snippet,contentDetails',
          playlistId,
          maxResults: 50,
        }
      );

      return res.status(200).json(response.items || []);
    }

    if (route === 'youtube/liked') {
      const response = await fetchYouTube<{ items?: unknown[] }>(
        'https://www.googleapis.com/youtube/v3/videos',
        token,
        {
          part: 'snippet,contentDetails,statistics',
          myRating: 'like',
          maxResults: 50,
        }
      );

      return res.status(200).json(response.items || []);
    }
  } catch (caughtError: any) {
    console.error(`Music API route failed for ${route}:`, caughtError?.message || caughtError);
    return res.status(500).json({ error: 'Music API request failed' });
  }

  return res.status(404).json({ error: 'Not found' });
}
