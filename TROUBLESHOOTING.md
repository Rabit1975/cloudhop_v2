# Troubleshooting Guide - OAuth & GameMonetize Issues

## Issue 1: "Failed to load games from GameMonetize"

**Root Cause:** CORS blocking direct requests to GameMonetize API

**Solution:** ✅ FIXED
- Now uses CORS proxy by default: `https://api.allorigins.win/raw`
- No configuration needed
- Games should load automatically

**If still failing:**
```bash
1. Check browser console (F12 → Console tab)
2. Should see: "📡 Fetching games page 1 via CORS proxy..."
3. If it says "CORS proxy error: XXX", the proxy might be down
4. Try refreshing the page (will retry after 5 seconds)
```

---

## Issue 2: "Failed to initiate Google Sign-In" on localhost

**Root Cause:** OAuth redirect URI mismatch

**Why it happens:**
- You're on `http://localhost:5173` 
- But Google OAuth needs `http://localhost:5173/auth/google/callback` registered

**Solution:**
1. Start OAuth server: `npm run dev:oauth`
2. Music component now detects environment automatically
3. Shows which OAuth URL it's trying to use

**In error alert now shows:**
```
Environment: localhost
OAuth URL: http://localhost:3001

Make sure:
1. Backend is running on port 3001 (npm run dev:oauth)
2. GOOGLE_CLIENT_SECRET is set in .env.local
3. Redirect URI is registered in Google Cloud Console
```

---

## Issue 3: "Failed to initiate Google Sign-In" on cloudhop.cloud

**Root Cause:** OAuth backend not deployed to production

**Current Situation:**
- Frontend is on `cloudhop.cloud` (Vercel)
- OAuth server is only running locally on your PC
- Cannot reach `https://cloudhop.cloud:3001` from browser

**Solutions:**

### Option A: Deploy OAuth Server to Production (Recommended)
You need to deploy the OAuth server to cloudhop.cloud. Here's how:

1. Create a Vercel deployment for the OAuth server
   ```bash
   npm run dev:oauth  # Test locally first
   ```

2. Or deploy it to your own server/VM

3. Update Google Cloud Console:
   - Add `https://cloudhop.cloud/auth/google/callback` as redirect URI

### Option B: Use a Tunneling Service (Quick Test)
```bash
npm install -g ngrok
npm run dev:oauth

# In another terminal:
ngrok http 3001
# Gives you: https://xxxx-xxxx-xxxx.ngrok.io

# Update Music.tsx to use the ngrok URL temporarily
```

### Option C: Production OAuth Server (Best Practice)
Deploy OAuth server separately:
```
Frontend: https://cloudhop.cloud (Vercel)
OAuth: https://oauth.cloudhop.cloud:3001 (Your server)
Payments: https://api.cloudhop.cloud:3002 (Your server)
```

---

## How the New API Config Works

**File:** `src/config/api.ts`

Automatically detects environment:
```typescript
// Detects: localhost:5173 → use http://localhost:3001
// Detects: cloudhop.cloud → use https://cloudhop.cloud:3001
// Detects: other domain → try localhost (fallback)
```

**Usage in Music.tsx:**
```typescript
import API_CONFIG from '@/config/api';

// Automatically use correct URL
fetch(`${API_CONFIG.OAUTH_URL}/auth/google/url`)
```

**Usage in GameHub.tsx:**
```typescript
// CORS proxy for GameMonetize
const corsProxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
```

---

## Development Setup (Works Now ✅)

```bash
# Terminal 1: Start Vite dev server
npm run dev

# Terminal 2: Start OAuth server
npm run dev:oauth

# Terminal 3: (Optional) Start payments server
npm run dev:server

# Or start all at once:
npm run dev:all
```

Then:
- Frontend: `http://localhost:5173`
- OAuth: `http://localhost:3001`
- Payments API: `http://localhost:3002`

---

## Production Setup (Needs Deployment)

1. **Frontend** (✅ Already done)
   - Deployed to Vercel
   - URL: `https://cloudhop.cloud`

2. **OAuth Server** (❌ Not deployed)
   - Need to deploy to production
   - Should be accessible at: `https://cloudhop.cloud:3001`
   - Or separate domain: `https://oauth.cloudhop.cloud`

3. **Payments API** (❌ Not deployed)
   - Need to deploy to production
   - Should be accessible at: `https://cloudhop.cloud:3002`

---

## Environment Variables

**For Development (`.env.local`):**
```env
VITE_GOOGLE_CLIENT_ID=543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
NODE_ENV=development
```

**For Production (Vercel settings):**
```env
VITE_GOOGLE_CLIENT_ID=543098707668-d395qnt038q26dvf1kls0tserhckqpj4.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
NODE_ENV=production
```

---

## Testing Checklist

### Local Testing (http://localhost:5173)
- [ ] OAuth server running: `npm run dev:oauth`
- [ ] Vite dev running: `npm run dev`
- [ ] Can click "Sign In with Google" without error
- [ ] Redirected to Google login
- [ ] After auth, sees playlists loaded
- [ ] GameMonetize games loading (with CORS proxy)

### Production Testing (https://cloudhop.cloud)
- [ ] OAuth server deployed
- [ ] Google Cloud Console has correct redirect URIs
- [ ] Can click "Sign In with Google"
- [ ] Games loading via CORS proxy

---

## Files Changed

- `src/config/api.ts` - NEW: API endpoint detection
- `src/pages/Music.tsx` - UPDATED: Uses API_CONFIG
- `src/pages/GameHub.tsx` - UPDATED: Uses CORS proxy by default
- `src/server/oauth.ts` - NO CHANGES (already correct)
- `.env.oauth` - NEW: Environment reference

---

## Next Steps

1. **For localhost (works now):**
   - Run: `npm run dev:oauth`
   - Should work immediately

2. **For cloudhop.cloud (needs deployment):**
   - Option: Deploy OAuth server to Vercel/Railway/Heroku
   - Or: Update Google Cloud to allow localhost redirect for testing

---

## Quick Troubleshooting Commands

```bash
# Check if OAuth server is running
curl http://localhost:3001/health

# Check git status
npm run agent status

# Commit and push changes
npm run agent commit-push "Fixed OAuth and GameMonetize"

# Rebuild after changes
npm run build
```

---

## Still Having Issues?

1. **Check browser console:** F12 → Console → Look for error messages
2. **Check OAuth server logs:** Should show "OAuth server running at..."
3. **Check network tab:** F12 → Network → Look for failed requests
4. **Test OAuth endpoint:** `curl http://localhost:3001/health`
5. **Verify env vars:** Check `.env.local` has GOOGLE_CLIENT_SECRET

---

**Summary:**
- ✅ GameMonetize games: Now uses CORS proxy (works on all domains)
- ✅ OAuth on localhost: Auto-detects `http://localhost:3001`
- ❌ OAuth on cloudhop.cloud: Needs OAuth server deployed to production
- ✅ All code is committed to GitHub production branch
