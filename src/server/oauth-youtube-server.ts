import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { URLSearchParams } from 'url';

const app = express();
const PORT = 3001;

// Configuration
const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:5173/app?tab=music';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Helper to generate auth URL
const generateAuthUrl = (state: string) => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

// Get auth URL
app.get('/auth/google/url', (_req, res) => {
  if (!GOOGLE_CLIENT_ID) {
    return res.status(500).json({
      error: 'Google OAuth not configured',
      message: 'VITE_GOOGLE_CLIENT_ID is not set in environment variables',
    });
  }

  const state = Math.random().toString(36).substring(7);
  const url = generateAuthUrl(state);

  // Store state in session (you may want to use a proper session store)
  res.json({ url, state });
});

// Handle OAuth callback
app.post('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' });
    }

    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    const { email, name, picture } = userResponse.data;

    res.json({
      access_token,
      refresh_token,
      expires_in,
      user: { email, name, picture },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Failed to exchange authorization code' });
  }
});

// Get YouTube playlists
app.get('/youtube/playlists', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/playlists',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 50,
        },
      }
    );

    res.json(response.data.items || []);
  } catch (error) {
    console.error('Error fetching playlists:', error);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Get playlist items
app.get('/youtube/playlist/:playlistId/items', async (req, res) => {
  try {
    const { playlistId } = req.params;
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/playlistItems',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          part: 'snippet,contentDetails',
          playlistId,
          maxResults: 200,
        },
      }
    );

    res.json(response.data.items || []);
  } catch (error) {
    console.error('Error fetching playlist items:', error);
    res.status(500).json({ error: 'Failed to fetch playlist items' });
  }
});

// Get liked videos
app.get('/youtube/liked', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ error: 'No access token provided' });
    }

    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/videos',
      {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          part: 'snippet',
          myRating: 'like',
          maxResults: 50,
        },
      }
    );

    res.json(response.data.items || []);
  } catch (error) {
    console.error('Error fetching liked videos:', error);
    res.status(500).json({ error: 'Failed to fetch liked videos' });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Google OAuth YouTube API Server',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🎵 YouTube OAuth Server running on http://localhost:${PORT}`);
  console.log(`   Google Client ID: ${GOOGLE_CLIENT_ID ? '✓ Set' : '✗ Missing'}`);
  console.log(`   Google Client Secret: ${GOOGLE_CLIENT_SECRET ? '✓ Set' : '✗ Missing'}`);
});
