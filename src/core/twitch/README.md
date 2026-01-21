# CloudHop × Twitch API Integration

Real-time Twitch data layer for CloudHop using public endpoints. No OAuth required for basic presence, recommended streams, and live status checks.

## Overview

The `TwitchAPI` class provides HTTP-based access to Twitch's public GraphQL endpoints, enabling CloudHop to:
- Fetch followed live streams
- Fetch recommended streams
- Check stream info for any channel
- Retrieve recent chat messages

This is the **actual data layer** behind CloudHop's Twitch intelligence system.

## Features

✅ **No OAuth Required** - Uses public Twitch endpoints  
✅ **Real-time Data** - Live stream status and viewer counts  
✅ **GraphQL-based** - Modern, efficient queries  
✅ **Type-safe** - Full TypeScript support  
✅ **Extensible** - Easy to add authenticated features later

## Usage

### Basic Setup

```typescript
import { TwitchAPI } from "cloudhop-os-v2"

// Create instance (no configuration needed for public endpoints)
const twitchAPI = new TwitchAPI()
```

### Get Followed Streams

Retrieve live streams from followed channels:

```typescript
const followedStreams = await twitchAPI.getFollowedStreams()

followedStreams.forEach(stream => {
  console.log(`${stream.user_name} is live!`)
  console.log(`Title: ${stream.title}`)
  console.log(`Category: ${stream.category}`)
  console.log(`Viewers: ${stream.viewers}`)
})
```

**Returns:** `TwitchStream[]`

```typescript
interface TwitchStream {
  id: string;
  user_name: string;
  login: string;
  is_live: boolean;
  title: string;
  viewers: number;
  category: string;
}
```

### Get Recommended Streams

Fetch Twitch's recommended streams:

```typescript
const recommended = await twitchAPI.getRecommendedStreams()

// Display top 5 recommended streams
recommended.slice(0, 5).forEach(stream => {
  if (stream.is_live) {
    console.log(`🔴 ${stream.user_name} - ${stream.category}`)
  }
})
```

**Returns:** `TwitchStream[]`

### Get Stream Info

Check if a specific channel is live and get stream details:

```typescript
const streamInfo = await twitchAPI.getStreamInfo("shroud")

if (streamInfo?.is_live) {
  console.log(`${streamInfo.user_name} is live!`)
  console.log(`${streamInfo.viewers} viewers watching ${streamInfo.category}`)
} else {
  console.log("Stream is offline")
}
```

**Returns:** `TwitchStreamInfo | null`

```typescript
interface TwitchStreamInfo {
  id: string;
  user_name: string;
  is_live: boolean;
  title: string;
  viewers: number;
  category: string;
}
```

### Get Recent Chat Messages

Retrieve recent chat messages for a channel:

```typescript
const messages = await twitchAPI.getChatMessages("ninja")

messages.forEach(msg => {
  console.log(msg)
})
```

**Returns:** `string[]`

> **Note:** Uses the `recent-messages.robotty.de` API (undocumented endpoint). For real-time chat, consider using Twitch IRC or WebSocket.

## Integration Examples

### StrikeCore Presence Module

```typescript
import { TwitchAPI } from "cloudhop-os-v2"

class TwitchPresenceModule {
  private api: TwitchAPI

  constructor() {
    this.api = new TwitchAPI()
  }

  async updatePresence() {
    const followedStreams = await this.api.getFollowedStreams()
    const liveStreams = followedStreams.filter(s => s.is_live)
    
    // Update UI with live streams
    this.displayLiveStreams(liveStreams)
  }

  private displayLiveStreams(streams: TwitchStream[]) {
    // Update CloudHop UI
  }
}
```

### Dashboard Feed

```typescript
import { TwitchAPI } from "cloudhop-os-v2"

async function loadDashboardStreams() {
  const api = new TwitchAPI()
  
  const [followed, recommended] = await Promise.all([
    api.getFollowedStreams(),
    api.getRecommendedStreams()
  ])

  return {
    live: followed.filter(s => s.is_live),
    recommended: recommended.slice(0, 10)
  }
}
```

### GameHub Overlay

```typescript
import { TwitchAPI } from "cloudhop-os-v2"

class GameHubOverlay {
  private api: TwitchAPI

  constructor() {
    this.api = new TwitchAPI()
  }

  async checkGameStreams(gameName: string) {
    const recommended = await this.api.getRecommendedStreams()
    
    return recommended.filter(stream => 
      stream.is_live && stream.category.includes(gameName)
    )
  }
}
```

### HopHub Spaces

```typescript
import { TwitchAPI } from "cloudhop-os-v2"

class HopHubSpaces {
  private api: TwitchAPI

  constructor() {
    this.api = new TwitchAPI()
  }

  async getFeaturedStream(channel: string) {
    const info = await this.api.getStreamInfo(channel)
    
    if (info?.is_live) {
      return {
        embed: true,
        channel,
        title: info.title,
        viewers: info.viewers
      }
    }
    
    return { embed: false }
  }
}
```

## Electron Integration

For Electron main process integration:

```typescript
// main/services/twitchService.ts
import { TwitchAPI } from "cloudhop-os-v2"
import { ipcMain } from "electron"

class TwitchService {
  private api: TwitchAPI

  constructor() {
    this.api = new TwitchAPI()
    this.setupIPC()
  }

  private setupIPC() {
    ipcMain.handle("twitch:getFollowedStreams", async () => {
      return await this.api.getFollowedStreams()
    })

    ipcMain.handle("twitch:getStreamInfo", async (_, channel: string) => {
      return await this.api.getStreamInfo(channel)
    })

    ipcMain.handle("twitch:getRecommendedStreams", async () => {
      return await this.api.getRecommendedStreams()
    })
  }
}

export const twitchService = new TwitchService()
```

## Technical Details

### API Endpoints

- **GraphQL Endpoint**: `https://gql.twitch.tv/gql`
- **Chat Messages**: `https://recent-messages.robotty.de/api/v2/recent-messages/{channel}`

### Client ID

Uses Twitch's public web client ID: `kimne78kx3ncx6brgo4mv6wki5h1ko`

This ID is safe to use for public, unauthenticated requests.

### Rate Limiting

Public endpoints have rate limits. For production use:
- Cache responses appropriately
- Implement exponential backoff on errors
- Consider using authenticated endpoints for higher limits

## Future Enhancements

The API can be extended with authenticated features:

- **OAuth Flow**: Add user authentication
- **Follow/Unfollow**: Manage channel subscriptions
- **Clips API**: Fetch and create clips
- **VOD Access**: Access past broadcasts
- **Channel Points**: Integrate loyalty rewards
- **Predictions**: Bet on stream outcomes
- **Real-time Events**: WebSocket-based notifications

To add authentication:

```typescript
constructor(clientId?: string, clientSecret?: string) {
  this.clientId = clientId || "kimne78kx3ncx6brgo4mv6wki5h1ko"
  this.clientSecret = clientSecret || ""
}

async authenticate(code: string) {
  // OAuth flow implementation
}
```

## What This Powers

This TwitchAPI class is the data layer for:

- ✅ **StrikeCore Twitch Presence** - Real-time followed stream status
- ✅ **Dashboard Feed** - Live stream cards and recommendations
- ✅ **GameHub Overlays** - Game-specific stream discovery
- ✅ **HopHub Spaces** - Community watch parties
- ✅ **Social Spaces** - Integrated stream viewing
- ✅ **AI Tools** - Stream analytics and insights

## Error Handling

```typescript
try {
  const streamInfo = await twitchAPI.getStreamInfo("channel")
  if (!streamInfo) {
    console.log("Channel not found")
  }
} catch (error) {
  console.error("Failed to fetch stream info:", error)
}
```

## Performance Tips

1. **Cache Results**: Stream data changes infrequently (30-60 seconds)
2. **Batch Requests**: Use `Promise.all()` for parallel queries
3. **Lazy Loading**: Only fetch data when UI components mount
4. **Debounce**: Avoid rapid successive requests

```typescript
// Example: Cached recommendations
let cachedRecommendations: TwitchStream[] | null = null
let cacheTime = 0
const CACHE_TTL = 60000 // 60 seconds

async function getRecommendedStreamsCached() {
  const now = Date.now()
  
  if (cachedRecommendations && now - cacheTime < CACHE_TTL) {
    return cachedRecommendations
  }
  
  const api = new TwitchAPI()
  cachedRecommendations = await api.getRecommendedStreams()
  cacheTime = now
  
  return cachedRecommendations
}
```

## Architecture

```
┌─────────────────────────────────────┐
│   CloudHop UI Components            │
│   (Dashboard, GameHub, HopHub)      │
└─────────────┬───────────────────────┘
              │
              │ uses
              ▼
┌─────────────────────────────────────┐
│   TwitchAPI Class                   │ ◄── This Layer
│   - Public GraphQL queries          │
│   - No OAuth required               │
└─────────────┬───────────────────────┘
              │
              │ calls
              ▼
┌─────────────────────────────────────┐
│   Twitch Public Endpoints            │
│   (gql.twitch.tv)                   │
└─────────────────────────────────────┘
```

This is CloudHop's **intelligence layer** for Twitch integration.
