# CloudHop × GameHub - StrikeCore Ops Console

The GameHub is CloudHop's unified gaming operations console that combines GeForce NOW runtime management, Twitch stream integration, and real-time activity monitoring into a single focused interface.

## Overview

GameHub serves as the **StrikeCore Ops Console for the currently played game**, providing:

- **Left Panel**: Current game session and GFN runtime controls
- **Right Panel**: Live Twitch stream embed
- **Top Bar**: StrikeCore status indicators and Twitch presence
- **Bottom Bar**: Merged GFN and Twitch event logs
- **Overlay**: Optional floating Twitch stream

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│  Top Bar: StrikeCore Status + Twitch Presence             │
├──────────────────────────┬─────────────────────────────────┤
│                          │                                 │
│  Left: GFN Session       │  Right: Twitch Stream          │
│  - Current game info     │  - Live embed                  │
│  - Session controls      │  - Channel input               │
│  - Runtime status        │  - Overlay toggle              │
│                          │                                 │
├──────────────────────────┴─────────────────────────────────┤
│  Bottom Bar: Activity Events (GFN + Twitch Merged)        │
└────────────────────────────────────────────────────────────┘
```

## Usage

### Basic Setup

```tsx
import { GameHub } from "cloudhop-os-v2";
import { CloudHopRuntime } from "./runtime";

function App() {
  const runtime = new CloudHopRuntime();
  
  return (
    <GameHub 
      runtime={runtime}
      defaultChannel="shroud"
    />
  );
}
```

### With Runtime Events

The GameHub listens to runtime events to track game sessions:

```tsx
// Runtime should emit these events
runtime.emit("session:start", {
  gameName: "Cyberpunk 2077",
  appId: "gfn-123456",
});

runtime.emit("session:pause");
runtime.emit("session:resume");
runtime.emit("session:end");
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `runtime` | `any` | *required* | CloudHopRuntime or StrikeCoreRuntime instance |
| `defaultChannel` | `string` | `"shroud"` | Default Twitch channel to display |

## Runtime Interface

The runtime object should implement:

```typescript
interface CloudHopRuntime {
  // Event emitter methods
  on(event: string, callback: (data: any) => void): void;
  off(event: string, callback: (data: any) => void): void;
  emit(event: string, data?: any): void;
  
  // Optional GFN control methods
  pauseSession?(): Promise<void>;
  resumeSession?(): Promise<void>;
  endSession?(): Promise<void>;
}
```

## Features

### 1. Session Management

**Display Current Game**
- Game name and App ID
- Session duration timer
- Session status (active, paused, launching)

**Session Controls**
- **Pause**: Pause the current GFN session
- **Resume**: Resume a paused session
- **End**: Terminate the session

**Status Indicator**
- 🟢 Green: Active session
- 🟡 Yellow: Paused
- 🔵 Blue: Launching
- ⚫ Gray: Idle

### 2. Twitch Integration

**Live Stream Embed**
- Channel input for quick switching
- 500px width, 280px height embed
- Fully integrated with TwitchEmbed component

**Presence Badge**
- Shows live/offline status in top bar
- Updates every 30 seconds
- Displays viewer count

**Floating Overlay**
- Toggle on/off with button
- Draggable picture-in-picture view
- Independent of main embed

### 3. Activity Monitoring

**Event Log**
- Combines Twitch events (streams going live, title changes)
- Can be extended to include GFN events
- Real-time updates every 10 seconds
- Last 50 events displayed

## State Management

The GameHub manages several pieces of state:

```typescript
// Current game session
const [currentGame, setCurrentGame] = useState<string | null>(null);

// Twitch channel being viewed
const [twitchChannel, setTwitchChannel] = useState(defaultChannel);

// Full session details
const [session, setSession] = useState<GameSession | null>(null);

// Overlay visibility
const [showOverlay, setShowOverlay] = useState(false);

// GFN runtime status
const [gfnStatus, setGfnStatus] = useState<string>("idle");
```

## Events

### Runtime Events (Listened)

```typescript
"session:start" -> { gameName, appId, ... }
"session:end"   -> void
"session:pause" -> void
"session:resume" -> void
```

### Window Events (Listened)

```typescript
"closeOverlay" -> { channel: string }
```

## Styling

The GameHub uses a dark StrikeCore aesthetic:

```css
Background: #0a0a0a
Text: #ffffff
Panels: rgba(255,255,255,0.03)
Borders: rgba(255,255,255,0.1)
Active elements: rgba(147,51,234,0.2) purple accent
```

## Integration Example

### Complete Runtime Implementation

```typescript
// runtime.ts
import { EventEmitter } from "events";

export class CloudHopRuntime extends EventEmitter {
  private gfnClient: GfnClient;
  
  constructor(gfnClient: GfnClient) {
    super();
    this.gfnClient = gfnClient;
  }
  
  async launchGame(appId: string) {
    const result = await this.gfnClient.launchApp(appId);
    
    if (result.success) {
      const session = await this.gfnClient.startSession(appId);
      
      this.emit("session:start", {
        gameName: "Game Name", // Retrieved from game database
        appId: appId,
      });
    }
  }
  
  async pauseSession() {
    await this.gfnClient.pauseSession();
    this.emit("session:pause");
  }
  
  async resumeSession() {
    await this.gfnClient.resumeSession();
    this.emit("session:resume");
  }
  
  async endSession() {
    await this.gfnClient.endSession();
    this.emit("session:end");
  }
}
```

### Usage in Main App

```typescript
// App.tsx
import { GameHub } from "cloudhop-os-v2";
import { CloudHopRuntime } from "./runtime";
import { ElectronGfnBridge } from "./bridges/gfn";

function App() {
  const [runtime] = useState(() => {
    const gfnBridge = new ElectronGfnBridge();
    return new CloudHopRuntime(gfnBridge);
  });
  
  return (
    <div className="app">
      <GameHub 
        runtime={runtime}
        defaultChannel="shroud"
      />
    </div>
  );
}
```

## Advanced Customization

### Custom Channel Switcher

```tsx
function CustomGameHub() {
  const runtime = useRuntime();
  const [channels] = useState(["ninja", "shroud", "pokimane"]);
  const [activeChannel, setActiveChannel] = useState("ninja");
  
  return (
    <div>
      <div className="channel-tabs">
        {channels.map(channel => (
          <button 
            key={channel}
            onClick={() => setActiveChannel(channel)}
          >
            {channel}
          </button>
        ))}
      </div>
      
      <GameHub 
        runtime={runtime}
        defaultChannel={activeChannel}
      />
    </div>
  );
}
```

### Session Duration Tracking

The GameHub automatically tracks and displays session duration:

```typescript
// Updates every second
const getSessionDuration = () => {
  if (!session) return "00:00";
  const duration = Math.floor((Date.now() - session.startTime) / 1000);
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
```

### Extended Event Logging

To add GFN-specific events to the log:

```typescript
useEffect(() => {
  const onGfnEvent = (event: any) => {
    // Dispatch custom event that event log can listen to
    window.dispatchEvent(new CustomEvent("gfnEvent", { 
      detail: {
        type: event.type,
        data: event.data,
        timestamp: Date.now(),
      }
    }));
  };
  
  runtime.on("gfn:*", onGfnEvent);
  return () => runtime.off("gfn:*", onGfnEvent);
}, [runtime]);
```

## Component Dependencies

GameHub uses these CloudHop components:

- **TwitchEmbed** - Main stream display
- **TwitchPresenceBadge** - Live status indicator
- **StrikeCoreTwitchEventLog** - Activity feed
- **TwitchOverlay** - Floating PiP view

All dependencies are imported from the same package:

```typescript
import {
  GameHub,
  TwitchEmbed,
  TwitchPresenceBadge,
  StrikeCoreTwitchEventLog,
  TwitchOverlay,
} from "cloudhop-os-v2";
```

## Performance Considerations

### Polling Intervals

- **Twitch Presence Badge**: Updates every 30 seconds
- **Event Log**: Checks every 10 seconds
- **Session Duration**: Updates every second (local calculation)

### Optimization Tips

1. **Lazy load streams**: Don't embed until user interaction
2. **Pause updates when hidden**: Stop polling when GameHub is not active
3. **Debounce channel changes**: Wait for user to finish typing
4. **Cache session data**: Avoid unnecessary re-renders

## Keyboard Shortcuts

Consider adding keyboard shortcuts for common actions:

```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'o') {
      setShowOverlay(!showOverlay);
    }
    if (e.ctrlKey && e.key === 'p' && session?.status === 'active') {
      runtime.pauseSession();
    }
  };
  
  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [showOverlay, session, runtime]);
```

## Mobile Responsiveness

For mobile/tablet views, consider a stacked layout:

```typescript
const isMobile = window.innerWidth < 768;

return (
  <div style={{ 
    flexDirection: isMobile ? "column" : "row",
    // ... other styles
  }}>
    {/* Content */}
  </div>
);
```

## What This Enables

With GameHub, CloudHop provides:

✅ **Unified Gaming Console** - Single interface for GFN + Twitch  
✅ **Session Management** - Full control over game sessions  
✅ **Live Streaming** - Integrated Twitch viewing  
✅ **Activity Monitoring** - Real-time event tracking  
✅ **Picture-in-Picture** - Floating overlay support  
✅ **Status Indicators** - Visual feedback on all systems  
✅ **StrikeCore Aesthetic** - Tactical, professional UI  

This completes the gaming operations layer for CloudHop OS, providing a production-ready console for gamers using GeForce NOW with Twitch integration.
