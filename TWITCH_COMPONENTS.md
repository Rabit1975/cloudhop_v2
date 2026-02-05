# CloudHop Twitch Advanced Components

Additional Twitch integration components for enhanced functionality across CloudHop modules.

## Components Overview

This document covers four advanced Twitch components that extend the base integration:

1. **TwitchOverlay** - Floating, draggable stream viewer for GameHub
2. **TwitchPresenceBadge** - Live status indicator component
3. **TwitchDeepLinkParser** - URL parser for twitch:// protocol
4. **StrikeCoreTwitchEventLog** - Real-time activity feed

All components are renderer-side, React/TypeScript-friendly, and work with the existing IPC bridge.

---

## 1. TwitchOverlay

### Overview

A floating, draggable overlay that displays a Twitch stream on top of other content. Perfect for GameHub picture-in-picture viewing.

### Features

- ✅ **Draggable** - Click and drag the header to reposition
- ✅ **Collapsible** - Minimize to just the header bar
- ✅ **Closable** - Dispatch custom event when closed
- ✅ **Fixed positioning** - Always on top with z-index 9999
- ✅ **Smooth styling** - Glass morphism aesthetic with shadows

### Usage

```tsx
import { TwitchOverlay } from "cloudhop-os-v2";

function GameHub() {
  return (
    <div>
      {/* Your game content */}
      
      {/* Floating Twitch overlay */}
      <TwitchOverlay 
        channel="shroud" 
        initialX={40}
        initialY={40}
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channel` | `string` | *required* | Twitch channel to display |
| `initialX` | `number` | `40` | Initial X position in pixels |
| `initialY` | `number` | `40` | Initial Y position in pixels |

### Close Event

The overlay dispatches a custom `closeOverlay` event when the close button is clicked:

```tsx
useEffect(() => {
  const handleClose = (e: CustomEvent) => {
    console.log('Overlay closed for channel:', e.detail.channel);
    // Remove overlay from state
  };
  
  window.addEventListener('closeOverlay', handleClose as any);
  return () => window.removeEventListener('closeOverlay', handleClose as any);
}, []);
```

### Styling

The overlay uses:
- **Background**: `rgba(0,0,0,0.95)` - Near-black with transparency
- **Border**: `rgba(255,255,255,0.1)` - Subtle white border
- **Shadow**: `0 8px 32px rgba(0,0,0,0.4)` - Deep shadow for depth
- **Border radius**: `12px` - Rounded corners
- **Size**: 400x225px (16:9 aspect ratio)

---

## 2. TwitchPresenceBadge

### Overview

A compact badge component that shows live status, viewer count, and category for a Twitch channel.

### Features

- ✅ **Live indicator** - Red dot when live, gray when offline
- ✅ **Auto-refresh** - Updates every 30 seconds
- ✅ **Viewer count** - Optional live viewer display
- ✅ **Category** - Optional game/category display
- ✅ **Three sizes** - Small, medium, large
- ✅ **Clickable** - Optional onClick handler

### Usage

#### Basic Badge

```tsx
import { TwitchPresenceBadge } from "cloudhop-os-v2";

function Sidebar() {
  return (
    <div>
      <h3>Followed Streamers</h3>
      <TwitchPresenceBadge channel="ninja" />
      <TwitchPresenceBadge channel="shroud" />
      <TwitchPresenceBadge channel="pokimane" />
    </div>
  );
}
```

#### With Viewer Count and Category

```tsx
<TwitchPresenceBadge 
  channel="xqc" 
  showViewers={true}
  showCategory={true}
  size="large"
  onClick={() => openStream("xqc")}
/>
```

#### In a List

```tsx
{channels.map(channel => (
  <TwitchPresenceBadge 
    key={channel}
    channel={channel}
    size="small"
    onClick={() => handleChannelClick(channel)}
  />
))}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channel` | `string` | *required* | Twitch channel name |
| `showViewers` | `boolean` | `true` | Show viewer count when live |
| `showCategory` | `boolean` | `false` | Show game/category |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Badge size |
| `onClick` | `() => void` | `undefined` | Click handler |

### States

#### Loading
```
● channel
```

#### Offline
```
● channel Offline
```

#### Live
```
🔴 DisplayName LIVE 1,234 viewers
```

---

## 3. TwitchDeepLinkParser

### Overview

Utility class for parsing and handling Twitch deep links and URLs. Supports both `twitch://` protocol and `https://twitch.tv` URLs.

### Features

- ✅ **Protocol support** - twitch:// deep links
- ✅ **Web URL support** - https://twitch.tv URLs
- ✅ **Multiple types** - Channel, video, clip, category
- ✅ **Parameter extraction** - Query string parsing
- ✅ **URL generation** - Convert deep links to web URLs
- ✅ **Validation** - Check if URL is a valid Twitch link

### Usage

#### Parse Deep Links

```typescript
import { TwitchDeepLinkParser } from "cloudhop-os-v2";

// Parse twitch:// protocol
const link1 = TwitchDeepLinkParser.parse("twitch://stream/ninja");
// Result: { type: "channel", identifier: "ninja", raw: "..." }

// Parse web URL
const link2 = TwitchDeepLinkParser.parse("https://twitch.tv/shroud");
// Result: { type: "channel", identifier: "shroud", raw: "...", params: {} }

// Parse video URL
const link3 = TwitchDeepLinkParser.parse("https://twitch.tv/videos/12345");
// Result: { type: "video", identifier: "12345", raw: "...", params: {} }

// Parse clip URL
const link4 = TwitchDeepLinkParser.parse("https://clips.twitch.tv/FunnyClipName");
// Result: { type: "clip", identifier: "FunnyClipName", raw: "...", params: {} }
```

#### Convert to Web URL

```typescript
const link = TwitchDeepLinkParser.parse("twitch://stream/pokimane");
const webUrl = TwitchDeepLinkParser.toWebUrl(link);
// Result: "https://twitch.tv/pokimane"
```

#### Validate URLs

```typescript
const isValid1 = TwitchDeepLinkParser.isValidTwitchUrl("twitch://stream/ninja");
// Result: true

const isValid2 = TwitchDeepLinkParser.isValidTwitchUrl("https://youtube.com/watch");
// Result: false
```

### Supported URL Formats

#### Channels
- `twitch://stream/channelname`
- `twitch://channel/channelname`
- `https://twitch.tv/channelname`

#### Videos
- `twitch://video/12345`
- `https://twitch.tv/videos/12345`

#### Clips
- `twitch://clip/ClipSlug`
- `https://twitch.tv/clip/ClipSlug`
- `https://clips.twitch.tv/ClipSlug`

#### Categories
- `twitch://category/GameName`
- `twitch://game/GameName`
- `https://twitch.tv/directory/category/GameName`

### API Reference

```typescript
interface TwitchDeepLink {
  type: "channel" | "video" | "clip" | "category" | "unknown";
  identifier: string;
  params?: Record<string, string>;
  raw: string;
}

class TwitchDeepLinkParser {
  static parse(url: string): TwitchDeepLink | null;
  static toWebUrl(link: TwitchDeepLink): string;
  static isValidTwitchUrl(url: string): boolean;
}
```

### Integration Example

```typescript
// Handle deep links in Electron
app.on('open-url', (event, url) => {
  event.preventDefault();
  
  const link = TwitchDeepLinkParser.parse(url);
  
  if (link) {
    switch (link.type) {
      case 'channel':
        openChannel(link.identifier);
        break;
      case 'video':
        openVideo(link.identifier);
        break;
      case 'clip':
        openClip(link.identifier);
        break;
      case 'category':
        openCategory(link.identifier);
        break;
    }
  }
});
```

---

## 4. StrikeCoreTwitchEventLog

### Overview

Real-time activity feed that tracks and displays Twitch events like streams going live, title changes, and category switches.

### Features

- ✅ **Live tracking** - Monitors followed streams
- ✅ **Event types** - Live, offline, title change, category change
- ✅ **Auto-refresh** - Checks every 10 seconds
- ✅ **Event history** - Keeps last 50 events
- ✅ **Time stamps** - Relative time display (e.g., "5m ago")
- ✅ **Icons** - Visual indicators for each event type
- ✅ **StrikeCore aesthetic** - Matches tactical UI design

### Usage

```tsx
import { StrikeCoreTwitchEventLog } from "cloudhop-os-v2";

function Dashboard() {
  return (
    <div className="dashboard-grid">
      {/* Other panels */}
      
      <div className="panel">
        <StrikeCoreTwitchEventLog />
      </div>
    </div>
  );
}
```

### Event Types

#### 🔴 Stream Live
```
🔴 Ninja went live playing Fortnite
```

#### ⚫ Stream Offline
```
⚫ Shroud went offline
```

#### 📝 Title Change
```
📝 Pokimane changed title to "Variety Gaming | !socials"
```

#### 🎮 Category Change
```
🎮 xQc switched to Just Chatting
```

### Event Detection

The component compares current stream state with previous state every 10 seconds:

```typescript
{
  id: string;
  type: "stream_live" | "stream_offline" | "stream_title_change" | "stream_category_change";
  timestamp: number;
  channel: string;
  data: {
    title?: string;
    category?: string;
    viewers?: number;
    previousTitle?: string;
    previousCategory?: string;
  };
}
```

### Customization

The event log is self-contained but can be styled with parent containers:

```tsx
<div style={{ maxWidth: "400px", height: "500px" }}>
  <StrikeCoreTwitchEventLog />
</div>
```

### Integration with Notifications

```tsx
import { StrikeCoreTwitchEventLog } from "cloudhop-os-v2";
import { useEffect } from "react";

function DashboardWithNotifications() {
  useEffect(() => {
    // Listen for custom events
    const handleStreamLive = (e: CustomEvent) => {
      const { channel, category } = e.detail;
      showNotification(`${channel} is now live playing ${category}!`);
    };
    
    window.addEventListener('twitchStreamLive', handleStreamLive as any);
    return () => window.removeEventListener('twitchStreamLive', handleStreamLive as any);
  }, []);
  
  return <StrikeCoreTwitchEventLog />;
}
```

---

## Complete Integration Example

Here's how all four components work together in a CloudHop module:

```tsx
import {
  TwitchOverlay,
  TwitchPresenceBadge,
  TwitchDeepLinkParser,
  StrikeCoreTwitchEventLog,
} from "cloudhop-os-v2";

function GameHubWithTwitch() {
  const [overlays, setOverlays] = useState<string[]>([]);
  const followedChannels = ["ninja", "shroud", "pokimane"];

  const handleBadgeClick = (channel: string) => {
    // Add overlay
    setOverlays([...overlays, channel]);
  };

  const handleDeepLink = (url: string) => {
    const link = TwitchDeepLinkParser.parse(url);
    if (link?.type === "channel") {
      setOverlays([...overlays, link.identifier]);
    }
  };

  useEffect(() => {
    // Handle close events
    const handleClose = (e: CustomEvent) => {
      setOverlays(overlays.filter(c => c !== e.detail.channel));
    };
    
    window.addEventListener('closeOverlay', handleClose as any);
    return () => window.removeEventListener('closeOverlay', handleClose as any);
  }, [overlays]);

  return (
    <div className="gamehub">
      {/* Sidebar with presence badges */}
      <aside className="sidebar">
        <h3>Live Streams</h3>
        {followedChannels.map(channel => (
          <TwitchPresenceBadge
            key={channel}
            channel={channel}
            onClick={() => handleBadgeClick(channel)}
            showViewers={true}
          />
        ))}
      </aside>

      {/* Main content */}
      <main className="content">
        {/* Your game content */}
      </main>

      {/* Right panel with event log */}
      <aside className="activity">
        <StrikeCoreTwitchEventLog />
      </aside>

      {/* Floating overlays */}
      {overlays.map((channel, index) => (
        <TwitchOverlay
          key={channel}
          channel={channel}
          initialX={40 + index * 20}
          initialY={40 + index * 20}
        />
      ))}
    </div>
  );
}
```

---

## Architecture

All components follow the same pattern:

```
Component (React)
    ↓
window.twitch.* API
    ↓
Preload Bridge (IPC)
    ↓
Main Process (TwitchAPI)
    ↓
Twitch GraphQL API
```

## Performance Considerations

### Polling Intervals
- **TwitchPresenceBadge**: 30 seconds
- **StrikeCoreTwitchEventLog**: 10 seconds
- **StrikeCoreTwitchPanel**: 5 seconds

### Optimization Tips

1. **Limit overlays**: Only show 2-3 at once
2. **Cache badge data**: Share data between badges
3. **Debounce parsing**: Cache deep link results
4. **Event deduplication**: Filter duplicate events

### Example: Shared Data Provider

```tsx
const TwitchDataContext = React.createContext(null);

function TwitchDataProvider({ children }) {
  const [streamData, setStreamData] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      const streams = await window.twitch.getFollowedStreams();
      const dataMap = {};
      streams.forEach(s => dataMap[s.login] = s);
      setStreamData(dataMap);
    };
    
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <TwitchDataContext.Provider value={streamData}>
      {children}
    </TwitchDataContext.Provider>
  );
}
```

---

## What This Unlocks

With these four components, CloudHop now has:

✅ **GameHub PiP** - Picture-in-picture stream viewing  
✅ **Live Presence** - Visual indicators for online streams  
✅ **Deep Linking** - Handle twitch:// protocol URLs  
✅ **Activity Feed** - Real-time event tracking  
✅ **Notification Ready** - Event-based notifications  
✅ **Multi-overlay** - Watch multiple streams simultaneously  

This completes the Twitch intelligence layer for CloudHop OS.
