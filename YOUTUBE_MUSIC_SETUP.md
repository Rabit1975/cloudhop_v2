# YouTube Music Integration - Setup Guide

## Overview
The Music tab requires a backend OAuth server to handle Google authentication for YouTube API access.

## Prerequisites
1. Google Cloud Console Project with YouTube Data API v3 enabled
2. OAuth 2.0 Credentials (Client ID and Client Secret)

## Setup Steps

### 1. Get Google OAuth Credentials
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" → Create OAuth 2.0 Client ID (Web Application)
5. Add authorized redirect URIs:
   - `http://localhost:5173/app?tab=music` (development)
   - Your production domain (for deployment)

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:

```env
# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:5173/app?tab=music
```

### 3. Start the OAuth Backend Server
The YouTube OAuth backend runs on port 3001 and handles:
- Google OAuth authentication
- YouTube API requests (playlists, songs, liked videos)

**Option 1: With Frontend (Recommended)**
```bash
npm run dev:music
```
This starts both the frontend (port 5173) and OAuth server (port 3001)

**Option 2: Backend Only**
```bash
npm run dev:youtube-oauth
```

**Option 3: All Services**
```bash
npm run dev:all
```
Starts frontend, payments server, and YouTube OAuth server

### 4. Access the Music Tab
1. Navigate to http://localhost:5173/app
2. Click the "Music" tab
3. Click "Sign In with Google"
4. Authorize YouTube access
5. Your playlists and liked videos will load

## How It Works

### Architecture
```
Frontend (React)
    ↓
YouTube OAuth Server (port 3001)
    ↓ (forwarding)
Google OAuth API
Google YouTube API
```

### Flow
1. User clicks "Sign In with Google"
2. Frontend calls `GET /auth/google/url`
3. OAuth server generates Google auth URL
4. User redirects to Google consent screen
5. Google redirects back with auth code
6. OAuth server exchanges code for access token
7. Frontend receives token and user info
8. Frontend uses token for YouTube API requests

## Available Endpoints

### OAuth
- `GET /auth/google/url` - Get Google OAuth URL
- `POST /auth/google/callback` - Handle OAuth callback

### YouTube API
- `GET /youtube/playlists` - Get user's playlists
- `GET /youtube/playlist/:playlistId/items` - Get playlist songs
- `GET /youtube/liked` - Get liked videos

### Server
- `GET /health` - Server health check

## Troubleshooting

### "Failed to initiate Google Sign-In. Make sure backend is running on port 3001"
**Solution**: Run `npm run dev:music` to start the backend server

### Playlists not loading
**Possible causes:**
1. Access token expired - sign out and sign back in
2. YouTube API not enabled - check Google Cloud Console
3. CORS issue - verify `allowedOrigins` in oauth-youtube-server.ts

### Wrong redirect URI
**Solution**: Update `GOOGLE_REDIRECT_URI` to match your deployment URL

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Yes |
| `GOOGLE_REDIRECT_URI` | OAuth redirect URL | Yes |

## API Quota
- YouTube Data API v3 quota: 10,000 units/day (free tier)
- Each request costs units - monitor in Google Cloud Console

## Features
✅ Sign in with Google  
✅ Load all user playlists  
✅ View playlist items (songs)  
✅ Display liked/favorite videos  
✅ Play YouTube videos in iframe  
✅ Search songs within playlists  
✅ Playback controls (play, pause, skip, repeat, shuffle)  

## Support
For issues, check:
1. Browser console for errors
2. Server terminal output
3. Google Cloud Console quota usage
4. Environment variables are set correctly

## Security Notes
- Client Secret is server-side only (never expose in frontend)
- Access tokens are stored in component state (frontend)
- Refresh tokens are handled server-side
- CORS is configured for localhost (update for production)
