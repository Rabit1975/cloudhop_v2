# CloudHop × Twitch Intelligence Integration

Complete integration guide for the Electron Main → Preload → Renderer → StrikeCore Runtime → Dashboard loop.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│   StrikeCore Dashboard Panel (React)                    │
│   - Displays followed streams                            │
│   - Shows recommended streams                            │
│   - 5-second auto-refresh                                │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ calls window.twitch.*
                 ▼
┌─────────────────────────────────────────────────────────┐
│   Preload Bridge (preload.ts)                           │
│   - Exposes window.twitch API                            │
│   - IPC bridge to main process                           │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ IPC: twitch:*
                 ▼
┌─────────────────────────────────────────────────────────┐
│   Electron Main Process                                  │
│   - TwitchAPI instance                                   │
│   - IPC handlers                                         │
│   - HTTP requests to Twitch                              │
└─────────────────────────────────────────────────────────┘
```

## Components

### 1. Preload Bridge (`src/electron/preload.ts`)

The **safe, sandbox-approved bridge** that exposes Twitch API to the renderer process.

```typescript
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("twitch", {
  getFollowedStreams: () => ipcRenderer.invoke("twitch:getFollowedStreams"),
  getRecommendedStreams: () => ipcRenderer.invoke("twitch:getRecommendedStreams"),
  getStreamInfo: (channel: string) =>
    ipcRenderer.invoke("twitch:getStreamInfo", channel),
  getChatMessages: (channel: string) =>
    ipcRenderer.invoke("twitch:getChatMessages", channel),
});
```

**Usage in Renderer:**

```typescript
// TypeScript will have full type information via window.twitch
const streams = await window.twitch.getFollowedStreams();
const info = await window.twitch.getStreamInfo("ninja");
```

### 2. StrikeCore Twitch Panel (`src/modules/strikecore/StrikeCoreTwitchPanel.tsx`)

The **dashboard panel** that displays live Twitch intelligence with StrikeCore's tactical aesthetic.

**Features:**
- 🔴 Live followed streams with real-time status
- 🎯 Recommended streams discovery
- 📊 Viewer counts and categories
- ⚡ Auto-refresh every 5 seconds
- 🎨 StrikeCore tactical UI design

### 3. Type Definitions (`src/types/twitch.d.ts`)

Global type definitions for the `window.twitch` API, providing full TypeScript support.

## Setup Guide

### Step 1: Configure Electron Main Process

Create a Twitch service in your Electron main process:

```typescript
// main/services/twitchService.ts
import { TwitchAPI } from "cloudhop-os-v2";
import { ipcMain } from "electron";

class TwitchService {
  private api: TwitchAPI;

  constructor() {
    this.api = new TwitchAPI();
    this.setupIPC();
  }

  private setupIPC() {
    ipcMain.handle("twitch:getFollowedStreams", async () => {
      return await this.api.getFollowedStreams();
    });

    ipcMain.handle("twitch:getRecommendedStreams", async () => {
      return await this.api.getRecommendedStreams();
    });

    ipcMain.handle("twitch:getStreamInfo", async (_, channel: string) => {
      return await this.api.getStreamInfo(channel);
    });

    ipcMain.handle("twitch:getChatMessages", async (_, channel: string) => {
      return await this.api.getChatMessages(channel);
    });
  }
}

export const twitchService = new TwitchService();
```

**In your main.ts:**

```typescript
import { twitchService } from "./services/twitchService";

// Service is initialized when imported
```

### Step 2: Configure BrowserWindow with Preload

```typescript
// main.ts
import { BrowserWindow } from "electron";
import * as path from "path";

const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    contextIsolation: true,
    nodeIntegration: false,
  },
});
```

### Step 3: Add StrikeCore Panel to Dashboard

```tsx
// Dashboard.tsx
import { StrikeCoreTwitchPanel } from "cloudhop-os-v2";

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {/* Other dashboard panels */}
        
        <div className="panel">
          <div className="panel-header">
            <h3>Twitch Intelligence</h3>
          </div>
          <div className="panel-content">
            <StrikeCoreTwitchPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
```

## API Reference

### window.twitch

The global Twitch API exposed to the renderer process.

#### `getFollowedStreams()`

Fetches currently live streams from followed channels.

```typescript
const streams = await window.twitch.getFollowedStreams();
// Returns: TwitchStream[]
```

#### `getRecommendedStreams()`

Fetches Twitch's recommended streams.

```typescript
const recommended = await window.twitch.getRecommendedStreams();
// Returns: TwitchStream[]
```

#### `getStreamInfo(channel)`

Gets detailed info for a specific channel.

```typescript
const info = await window.twitch.getStreamInfo("shroud");
// Returns: TwitchStreamInfo | null
```

#### `getChatMessages(channel)`

Retrieves recent chat messages for a channel.

```typescript
const messages = await window.twitch.getChatMessages("ninja");
// Returns: string[]
```

## StrikeCore Panel Features

### Followed Live Section

Displays all followed channels that are currently live:

- Stream title
- Category/game
- Viewer count
- Auto-refreshes every 5 seconds

### Recommended Section

Shows Twitch's recommended streams based on viewing patterns:

- Curated stream suggestions
- Live status indicators
- Stream metadata

### Styling

The panel uses StrikeCore's tactical aesthetic:

```css
/* Card background */
background: rgba(255,255,255,0.04)

/* Text hierarchy */
heading: 16px, fontWeight: 600
subtitle: 12px, opacity: 0.6
metadata: 12px, opacity: 0.7

/* Layout */
gap: 16px (sections)
gap: 6px (cards)
padding: 8px 10px (cards)
borderRadius: 8px
```

## Integration Points

This Twitch intelligence system powers:

### ✅ StrikeCore Dashboard
- Live presence indicator
- Discovery feed
- Stream recommendations

### ✅ GameHub
- Game-specific stream overlays
- Category-filtered streams
- Esports integration

### ✅ HopHub Spaces
- Community watch parties
- Featured streams
- Live event tracking

### ✅ Social Spaces
- Integrated stream viewing
- Multi-stream layouts
- Chat integration

## Advanced Usage

### Custom Polling Intervals

```tsx
// Customize refresh rate
useEffect(() => {
  const load = async () => {
    // ... fetch data
  };
  
  load();
  const interval = setInterval(load, 10000); // 10 seconds
  return () => clearInterval(interval);
}, []);
```

### Error Handling

```tsx
const [error, setError] = useState<string | null>(null);

const load = async () => {
  try {
    const streams = await window.twitch.getFollowedStreams();
    setFollowed(streams);
    setError(null);
  } catch (err) {
    setError("Failed to fetch streams");
    console.error(err);
  }
};
```

### Loading States

```tsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  const load = async () => {
    setLoading(true);
    try {
      const streams = await window.twitch.getFollowedStreams();
      setFollowed(streams);
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);

if (loading) return <div>Loading Twitch data...</div>;
```

### Click to Open Stream

```tsx
const openStream = (channel: string) => {
  // Open in TwitchEmbed component or external browser
  window.open(`https://twitch.tv/${channel}`, "_blank");
};

<div 
  onClick={() => openStream(stream.login)}
  style={{ cursor: "pointer" }}
>
  {stream.user_name}
</div>
```

## What You've Unlocked

With this integration complete, CloudHop now has:

✅ **Live Twitch Presence** - Real-time followed stream status  
✅ **Discovery Feed** - Recommended streams  
✅ **Stream Metadata** - Titles, categories, viewer counts  
✅ **StrikeCore UI** - Tactical aesthetic integration  
✅ **Auto-refresh** - 5-second polling for live updates  
✅ **Type-safe** - Full TypeScript support  
✅ **Electron-safe** - Proper IPC bridge with context isolation  

This is the **runtime brain of Twitch inside CloudHop**.

## Build Configuration

Ensure your TypeScript config includes the preload script:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "DOM"],
    "jsx": "react"
  },
  "include": [
    "src/**/*"
  ]
}
```

For Electron builds, ensure preload.ts is compiled to the correct output directory:

```json
{
  "scripts": {
    "build:preload": "tsc src/electron/preload.ts --outDir dist/electron"
  }
}
```

## Security Notes

1. **Context Isolation**: Always enabled - no direct Node.js access in renderer
2. **IPC Validation**: Main process validates all incoming requests
3. **Type Safety**: TypeScript enforces correct API usage
4. **Sandboxed**: Renderer can only call exposed APIs via bridge

## Troubleshooting

### window.twitch is undefined

- Ensure preload script is loaded in BrowserWindow config
- Check that preload.js is built and in the correct location
- Verify contextIsolation is enabled

### Streams not updating

- Check console for errors in the load() function
- Verify IPC handlers are registered in main process
- Test individual API calls in DevTools console

### TypeScript errors on window.twitch

- Ensure `src/types/twitch.d.ts` is included in tsconfig
- Restart TypeScript language server
- Check import paths in type definitions

## Next Steps

Consider adding:

- **Notifications** - Alert when followed streamers go live
- **Filters** - Category, language, viewer count filtering
- **Favorites** - Pin specific streams to the top
- **Clips** - Display recent clips from followed channels
- **VODs** - Access to past broadcasts
- **OAuth** - Full authentication for advanced features
