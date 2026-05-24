# Google OAuth Setup - Complete Step-by-Step Guide

## What We're Setting Up
- YouTube Music authentication for CloudHop
- OAuth backend server running locally on port 3001
- Frontend communicating with OAuth server

## Part 1: Google Cloud Project Setup (5 minutes)

### Step 1: Create a Google Cloud Project
1. Go to https://console.cloud.google.com/
2. Click the project dropdown (top left)
3. Click "NEW PROJECT"
4. Name it: `cloudhop-youtube-oauth`
5. Click "CREATE"
6. Wait for it to finish

### Step 2: Enable YouTube API
1. In Google Cloud Console, search for "YouTube Data API v3"
2. Click on it
3. Click "ENABLE"
4. Wait for it to enable

### Step 3: Create OAuth Credentials
1. Go to "Credentials" (left sidebar)
2. Click "CREATE CREDENTIALS" → "OAuth 2.0 Client ID"
3. If prompted: "Configure the OAuth consent screen first"
   - Choose "External" 
   - Click "CREATE"
   - Fill in:
     - App name: `CloudHop`
     - User support email: your email
     - Developer contact: your email
   - Click "SAVE AND CONTINUE"
   - Skip scopes (click "SAVE AND CONTINUE")
   - Skip test users (click "SAVE AND CONTINUE")
   - Review and click "BACK TO DASHBOARD"

### Step 4: Create OAuth Client
1. Go back to "Credentials"
2. Click "CREATE CREDENTIALS" → "OAuth 2.0 Client ID" again
3. Application type: **Web application**
4. Name: `CloudHop OAuth Client`
5. Under "Authorized redirect URIs", click "ADD URI"
6. Add BOTH:
   ```
   http://localhost:5173/auth/google/callback
   https://cloudhop.cloud/auth/google/callback
   ```
7. Click "CREATE"
8. A dialog pops up with your credentials:
   - **Copy your Client ID** (save it!)
   - **Copy your Client Secret** (save it somewhere safe!)
9. Click "OK"

---

## Part 2: Update CloudHop Configuration (2 minutes)

### Step 1: Update .env.local
Create or edit `C:\Users\rebel\Desktop\cloudhop_v2\.env.local`:

```env
VITE_GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
```

Replace `YOUR_CLIENT_ID_HERE` and `YOUR_CLIENT_SECRET_HERE` with your actual values from Google Cloud.

### Step 2: Save the file
Don't commit this to GitHub (it's in .gitignore, which is good for security)

---

## Part 3: Run Everything Locally (1 minute setup)

### Terminal 1: Start Frontend
```bash
cd C:\Users\rebel\Desktop\cloudhop_v2
npm run dev
```
This runs on http://localhost:5173

### Terminal 2: Start OAuth Server
```bash
cd C:\Users\rebel\Desktop\cloudhop_v2
npm run dev:oauth
```
This runs on http://localhost:3001

You should see:
```
✅ OAuth server running at http://localhost:3001
📝 Client ID: 543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com
🔗 Redirect URI: http://localhost:5173/auth/google/callback
```

---

## Part 4: Test It (1 minute)

1. Go to http://localhost:5173/app
2. Click "Music" tab
3. Click "Sign In with Google"
4. You should be redirected to Google login
5. After signing in, you'll see your YouTube playlists!

---

## If It Doesn't Work

### Error: "Failed to initiate Google Sign-In"
- Make sure Terminal 2 (OAuth server) is running
- Check console errors (F12)

### Error: "CSP blocks http://localhost:3001"
- This only happens on cloudhop.cloud (production)
- Solution: Deploy OAuth server to production (we'll do this later)

### Error: "Invalid Client ID"
- Double-check you copied the Client ID correctly
- Verify it's in `.env.local`

---

## Part 5: Deploy to Production (Later)

For cloudhop.cloud to work, you'll need to deploy the OAuth server. Options:
1. Railway.app (easiest)
2. Heroku (free tier ending)
3. Your own server

We can do this when you wake up if needed.

---

## Summary

**Local Setup:**
- 1. Create Google OAuth credentials (Google Cloud Console)
- 2. Add Client ID & Secret to `.env.local`
- 3. Run two terminals: `npm run dev` + `npm run dev:oauth`
- 4. Test at http://localhost:5173

**That's it!** YouTube Music will work locally.

---

## Quick Reference

| What | Where | Command |
|------|-------|---------|
| Frontend | localhost:5173 | `npm run dev` |
| OAuth Server | localhost:3001 | `npm run dev:oauth` |
| Google Console | https://console.cloud.google.com | Create credentials |
| Env File | `.env.local` | Your Client ID & Secret |

---

Sleep well! When you wake up, just follow this guide and you'll have it working in 10 minutes. 🚀
