# Google OAuth Demo Setup - WORKING VERSION

## Prerequisites
- npm installed
- Google Client ID: `543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com`
- Google Client Secret: Ask for this or use from Google Cloud Console

## Step 1: Install Dependencies

```bash
npm install axios
```

## Step 2: Get Your Google Client Secret

1. Go to https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Click it → Copy the **Client Secret**
4. Set it as environment variable:

**Windows (PowerShell):**
```powershell
$env:GOOGLE_CLIENT_SECRET = "your_client_secret_here"
```

**Mac/Linux:**
```bash
export GOOGLE_CLIENT_SECRET="your_client_secret_here"
```

## Step 3: Run Both Frontend & OAuth Backend

```bash
npm run dev:oauth-and-frontend
```

This runs:
- Frontend on http://localhost:5173
- OAuth server on http://localhost:3001

## Step 4: Test OAuth Flow

1. Open http://localhost:5173
2. Navigate to Music page
3. Click "Sign In with Google"
4. **You should now see:**
   - ✅ Google account selection screen
   - ✅ OAuth consent screen (showing scopes)
   - ✅ Client ID visible in URL
   - ✅ Redirect back to Music page with user logged in
   - ✅ User profile displayed

## Step 5: Record Demo Video

Once OAuth is working:

1. Open DevTools (F12) → press F11 for fullscreen (to show URL bar clearly)
2. Start recording screen (OBS or built-in)
3. Follow the recording checklist:
   - [ ] Show homepage with logo & policies
   - [ ] Navigate to Music
   - [ ] Click Sign In
   - [ ] Show URL bar (Client ID visible)
   - [ ] Show Google consent screen (pause to show scopes)
   - [ ] Click Allow
   - [ ] Show user logged in with playlists
   - [ ] Show music player working

## Troubleshooting

**"Cannot connect to OAuth server"**
- Make sure `npm run dev:oauth-and-frontend` is running
- Check that port 3001 is not in use
- Look at terminal output for errors

**"Connection refused on port 3001"**
- Kill any process on port 3001
- Restart: `npm run dev:oauth-and-frontend`

**"Google consent screen not appearing"**
- Check that Client Secret is correct
- Make sure `GOOGLE_CLIENT_SECRET` env var is set
- Check browser console for errors (F12)

**"Error: code not provided"**
- This means Google didn't send the auth code
- Check that redirect URI matches Google Cloud Console
- Clear browser cookies and try again

## Files Modified

- `src/server/oauth.ts` - OAuth backend
- `src/pages/Music.tsx` - OAuth flow in React
- `package.json` - New npm scripts

Done! Now you have a fully working OAuth demo ready to record.
