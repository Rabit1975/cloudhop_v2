# Spotify Integration Setup

## Overview
CloudHop now supports Spotify Web Playback SDK for personal music integration alongside YouTube Music for ambient content.

## Features
- **Ambient Music**: YouTube Music (no login required)
- **My Music**: Spotify Web Playback SDK (Spotify Premium required)

## Spotify Setup Requirements

### 1. Spotify Developer Account
1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Note your **Client ID**

### 2. App Configuration
In your Spotify Developer Dashboard app settings:
- **Redirect URI**: `http://localhost:3000/spotify-callback`
- **API Scopes**: 
  - streaming
  - user-read-email
  - user-read-private
  - user-read-playback-state
  - user-modify-playback-state
  - user-read-currently-playing
  - user-read-playback-position
  - playlist-read-private
  - playlist-read-collaborative
  - user-read-recently-played
  - user-top-read

### 3. Environment Variables
Create a `.env.local` file in your project root:
```env
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
```

### 4. Spotify Premium Required
The Spotify Web Playback SDK requires a Spotify Premium account for users to play their personal music.

## Usage

### For Users:
1. Navigate to **HopHub → Spaces → Music Studio**
2. Click **"My Music (Spotify)"** tab
3. Click **"Connect Spotify"**
4. Login with your Spotify account
5. Access your playlists, liked songs, and personal library

### For Developers:
The integration includes:
- `SpotifyPlayer.tsx` - Main Spotify component
- `SpotifyCallback.tsx` - OAuth callback handler
- Tab-based interface switching between YouTube and Spotify

## Architecture
```
Music Studio
├── Ambient Tab (YouTube Music)
│   ├── No login required
│   ├── Curated content
│   └── Genre buttons
└── My Music Tab (Spotify)
    ├── Spotify login required
    ├── Personal playlists
    ├── Liked songs
    └── Premium account required
```

## Troubleshooting

### Common Issues:
1. **"Spotify Premium required"** - User needs Spotify Premium account
2. **"Failed to initialize player"** - Check Client ID and redirect URI
3. **"Authentication failed"** - Check scopes and app permissions

### Debug Mode:
Check browser console for Spotify SDK errors and network requests.

## Security Notes
- Tokens are stored in localStorage for session persistence
- OAuth flow uses popup windows for security
- No sensitive credentials are stored in the codebase
