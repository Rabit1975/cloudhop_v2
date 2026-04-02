import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://cloudhop.cloud'],
  credentials: true,
}));

app.use(express.json());

const GOOGLE_CLIENT_ID = '543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your_client_secret';
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://cloudhop.cloud/auth/google/callback'
  : 'http://localhost:3001/auth/google/callback';

// Step 1: Generate OAuth URL with all required Google scopes
app.get('/auth/google/url', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube.readonly',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/calendar',
  ];

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scopes.join(' '))}` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.json({ url: authUrl });
});

// Step 2: Handle OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(`http://localhost:5173/app?tab=music&error=${error}`);
  }

  if (!code) {
    return res.redirect('http://localhost:5173/app?tab=music&error=no_code');
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    });

    const { access_token, refresh_token, id_token } = tokenResponse.data;

    // Get user info
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = userResponse.data;

    // Redirect to frontend with tokens
    const redirectUrl = `http://localhost:5173/app?tab=music&` +
      `token=${access_token}` +
      `&refresh_token=${refresh_token || ''}` +
      `&user=${encodeURIComponent(JSON.stringify(user))}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.redirect(`http://localhost:5173/app?tab=music&error=auth_failed`);
  }
});

// Step 3: Test token validity
app.get('/youtube/test', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('✅ Token is valid for user:', response.data.email);
    res.json({ valid: true, user: response.data });
  } catch (error) {
    console.error('❌ Token validation failed:', error.response?.data || error.message);
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Step 4: Fetch user's YouTube playlists
app.get('/youtube/playlists', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlists', {
      params: {
        part: 'snippet,contentDetails',
        mine: true,
        maxResults: 50,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data.items || []);
  } catch (error) {
    console.error('YouTube playlists error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
});

// Step 5: Fetch items from a specific playlist
app.get('/youtube/playlist/:playlistId/items', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { playlistId } = req.params;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet,contentDetails',
        playlistId,
        maxResults: 50,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data.items || []);
  } catch (error) {
    console.error('YouTube playlist items error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch playlist items' });
  }
});

// Step 6: Get user's liked videos
app.get('/youtube/liked', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
        part: 'snippet,contentDetails,statistics',
        myRating: 'like',
        maxResults: 50,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data.items || []);
  } catch (error) {
    console.error('YouTube liked videos error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch liked videos' });
  }
});

// Step 7: Fetch user's Google Contacts
app.get('/contacts', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/contacts/v3/people/me/connections', {
      params: {
        personFields: 'names,emailAddresses,photos',
        pageSize: 50,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data.connections || []);
  } catch (error) {
    console.error('Contacts API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Step 8: Fetch user's Google Calendar events
app.get('/calendar/events', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      params: {
        maxResults: 10,
        timeMin: new Date().toISOString(),
        orderBy: 'startTime',
        singleEvents: true,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data.items || []);
  } catch (error) {
    console.error('Calendar API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch calendar events' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ OAuth server running at http://localhost:${PORT}`);
  console.log(`📝 Client ID: ${GOOGLE_CLIENT_ID}`);
  console.log(`📺 YouTube, Contacts, and Calendar scopes available`);
});
