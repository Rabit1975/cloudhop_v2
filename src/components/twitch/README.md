# CloudHop × Twitch Integration

A clean, reusable Twitch player component for CloudHop that enables embedding Twitch streams directly in the application.

## Overview

The `TwitchEmbed` component provides a drop-in solution for displaying Twitch streams inside CloudHop without requiring OAuth or presence events. It's Electron-safe and designed for seamless integration.

## Component: TwitchEmbed

### Features

- **Embedded Player**: Clean Twitch player integration
- **Optional Chat**: Toggle chat panel on/off
- **Theming**: Support for dark and light themes
- **Responsive**: Customizable width and height
- **Electron-Safe**: Works in Electron environments with proper parent domain configuration

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `channel` | `string` | *required* | Twitch channel name to display |
| `chat` | `boolean` | `false` | Show chat panel alongside player |
| `height` | `string` | `"400px"` | Height of the embed container |
| `width` | `string` | `"100%"` | Width of the embed container |
| `theme` | `"dark" \| "light"` | `"dark"` | Visual theme for player and chat |

## Usage Examples

### Basic Player (No Chat)

```tsx
import { TwitchEmbed } from "cloudhop-os-v2"

function Dashboard() {
  return (
    <div>
      <h2>Live Stream</h2>
      <TwitchEmbed channel="shroud" />
    </div>
  )
}
```

### Player with Chat

```tsx
import { TwitchEmbed } from "cloudhop-os-v2"

function StreamPage() {
  return (
    <TwitchEmbed 
      channel="ninja" 
      chat={true}
      height="600px"
    />
  )
}
```

### StrikeCore Branded Panel

```tsx
import { TwitchEmbed } from "cloudhop-os-v2"

function StrikePanel() {
  return (
    <div className="strike-panel">
      <div className="panel-header">
        <h3>Featured Stream</h3>
      </div>
      <TwitchEmbed 
        channel="cloudhopio" 
        chat={true}
        theme="dark"
      />
    </div>
  )
}
```

### GameHub Integration

```tsx
import { TwitchEmbed } from "cloudhop-os-v2"

function GameHub() {
  return (
    <div className="game-hub">
      <div className="stream-section">
        <TwitchEmbed 
          channel="esports" 
          width="100%"
          height="500px"
        />
      </div>
    </div>
  )
}
```

### Custom Styling

```tsx
import { TwitchEmbed } from "cloudhop-os-v2"

function CustomStream() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <TwitchEmbed 
        channel="gaming"
        chat={true}
        width="100%"
        height="720px"
        theme="light"
      />
    </div>
  )
}
```

## Technical Details

### Iframe Configuration

The component uses Twitch's official embed URLs with proper parent domain configuration for Electron compatibility:

- **Player URL**: `https://player.twitch.tv/?channel={channel}&parent=localhost&autoplay=true&muted=false&theme={theme}`
- **Chat URL**: `https://www.twitch.tv/embed/{channel}/chat?parent=localhost&darkpopout={isDark}`

### Layout

When chat is enabled, the component uses a flexbox layout:
- Player takes 3/4 of the width
- Chat takes 1/4 of the width
- 8px gap between player and chat

When chat is disabled:
- Player takes 100% of the width

## Browser & Electron Support

This component is designed to work in:
- ✅ Modern browsers (Chrome, Firefox, Edge, Safari)
- ✅ Electron applications
- ✅ CloudHop desktop application

## Future Enhancements

Potential future additions:
- OAuth integration for authenticated features
- Presence events and notifications
- Multi-stream support
- Stream metadata display
- Follower/subscriber controls

## Integration with CloudHop Modules

The TwitchEmbed component can be integrated with various CloudHop modules:

- **Gaming Module**: Display esports streams
- **Social Spaces**: Watch parties and community streams
- **Dashboard**: Featured content panels
- **StrikeCore**: Branded gaming content
- **Community Hubs**: Server-specific stream showcases
