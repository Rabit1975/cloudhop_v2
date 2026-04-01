import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json());

const GOOGLE_CLIENT_ID = '543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'your_client_secret';
const REDIRECT_URI = 'http://localhost:3001/auth/google/callback';

// Step 1: Generate OAuth URL
app.get('/auth/google/url', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/youtube.readonly',
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
    return res.redirect(`http://localhost:5173/music?error=${error}`);
  }

  if (!code) {
    return res.redirect('http://localhost:5173/music?error=no_code');
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

    // Redirect to frontend with tokens (in production, use secure cookies)
    const redirectUrl = `http://localhost:5173/music?` +
      `token=${access_token}` +
      `&user=${encodeURIComponent(JSON.stringify(user))}`;

    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.redirect(`http://localhost:5173/music?error=auth_failed`);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`✅ OAuth server running at http://localhost:${PORT}`);
  console.log(`📝 Client ID: ${GOOGLE_CLIENT_ID}`);
});
