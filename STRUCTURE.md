# CloudHop OS 2.0 - Structure Documentation

## Overview
CloudHop 2.0 is structured as a modular operating system with clear separation between layers. The architecture follows an OS pattern where the kernel handles boot and core providers, core engines provide system-level services, modules are independent micro-apps, and the UI system provides a unified design language.

## Architecture Layers

### Kernel Layer (`/src/kernel`)
The OS boot layer containing foundational infrastructure:
- **Providers**: Context providers that form the OS kernel stack
- **Auth**: Authentication and session management
- **Routing**: Application routing and navigation
- **Errors**: Error boundaries and handling

### Core Layer (`/src/core`)
System engines providing core services:
- **Supabase**: Database client and schema
- **Realtime**: Real-time channel subscriptions
- **Signaling**: WebRTC signaling for calls
- **Presence**: User presence tracking
- **User**: User state management
- **Settings**: Settings persistence
- **AI**: AI client and tools

### Modules Layer (`/src/modules`)
Independent micro-applications:
- **Chat**: Messaging and conversations
- **Meetings**: Video/audio calls
- **Spaces**: HopSpaces galaxy and interiors
- **Profile**: User profile management
- **Settings**: Settings UI
- **AI Tools**: AI assistant interface

### UI Layer (`/src/ui`)
Design system and reusable components:
- **Components**: Button, Input, Modal, Toast, Card
- **Layout**: AppLayout, Sidebar
- **Primitives**: Flex, Stack
- **Theme**: Design tokens, light/dark themes
- **Animations**: Transition utilities
- **Logo**: Logo components

## Boot Sequence

### 1. main.tsx (Entry Point)
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
)
```

### 2. AppProviders (Kernel Stack)
Provider nesting order (outside → inside):
1. AuthProvider - Authentication state
2. SessionProvider - Session management
3. SettingsProvider - App settings
4. RealtimeProvider - Supabase realtime
5. AIProvider - AI capabilities
6. ThemeProvider - Theme state

### 3. App.tsx (OS Shell)
```typescript
export default function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  )
}
```

### 4. Router (Navigation)
Uses react-router-dom with routes:
- `/` - Spaces (default)
- `/chat` - Chat module
- `/meetings` - Meetings module
- `/profile` - Profile module
- `/settings` - Settings module
- `/ai-tools` - AI Tools module

## Directory Structure

### Root Level
- **package.json** - Project dependencies and scripts
- **tsconfig.json** - TypeScript configuration with path aliases
- **vite.config.ts** - Vite build configuration
- **.gitignore** - Git ignore rules
- **.env.example** - Environment variables template

### /electron
Electron desktop application configuration
- **main.ts** - Electron main process with VITE_DEV_SERVER_URL support
- **preload.ts** - Secure IPC bridge (cloudhop namespace)
- **electron-builder.json** - Build config with msix target for Microsoft Store

### /build
Build assets for desktop applications
- **/icons** - Application icons for different platforms (.ico, .icns, .png)

### /public
Static public assets served by the web server
- **index.html** - Main HTML template
- **manifest.json** - PWA manifest
- **logo192.png, logo512.png** - PWA icons
- **browserconfig.xml** - Browser configuration

### /src
Main application source code

#### /src/kernel
OS-level kernel layer - Core application infrastructure

**Providers** (`/kernel/providers/`)
- AppProviders.tsx - Root provider wrapper (proper nesting order)
- AuthProvider.tsx - Authentication context
- SessionProvider.tsx - Session management
- SettingsProvider.tsx - App settings
- RealtimeProvider.tsx - Real-time connections (exposes supabase client)
- AIProvider.tsx - AI capabilities
- ThemeProvider.tsx - Theme management

**Auth** (`/kernel/auth/`)
- AuthGate.tsx - Authentication gate component
- useAuth.ts - Auth hook

**Routing** (`/kernel/routing/`)
- Router.tsx - react-router-dom with BrowserRouter
- routes.ts - Route definitions

**Errors** (`/kernel/errors/`)
- ErrorBoundary.tsx - Error boundary component

#### /src/core
Core engines and services

**Supabase** (`/core/supabase/`)
- client.ts - Supabase client using createClient from @supabase/supabase-js
- types.ts - Database type definitions

**Realtime** (`/core/realtime/`)
- useRealtime.ts - Real-time hook (deprecated, use RealtimeProvider)
- channels.ts - Channel definitions

**Signaling** (`/core/signaling/`)
- useSignaling.ts - WebRTC signaling hook
- signalingClient.ts - Signaling client

**Presence** (`/core/presence/`)
- usePresence.ts - Presence tracking hook
- presenceChannel.ts - Presence channel

**User** (`/core/user/`)
- useUser.ts - User management hook
- userStore.ts - User state store

**Settings** (`/core/settings/`)
- useSettings.ts - Settings hook
- settingsStore.ts - Settings state store

**AI** (`/core/ai/`)
- AIClient.ts - Vercel AI SDK client (createOpenAI with gateway.ai.vercel.dev)
- tools.ts - AI helper functions (summarize, rewrite, translate, extractActions, thinking, transcribe)
- contextBuilder.ts - Context builder for AI

#### /src/modules
Feature modules - Main application features

**Chat** (`/modules/chat/`)
- ChatModule.tsx - Main chat module
- ChatSidebar.tsx - Chat sidebar
- ChatWindow.tsx - Chat window
- useChatActions.ts - Chat actions with ChatUpdate type (title, description, is_archived)

**Meetings** (`/modules/meetings/`)
- MeetingsModule.tsx - Meetings module
- useWebRTC.ts - WebRTC functionality
- useMeetingRoom.ts - Meeting room logic
- CallOverlay.tsx - Call controls overlay

**Spaces** (`/modules/spaces/`)
- SpacesModule.tsx - Spaces module
- useHopSpaces.ts - Supabase integration with hop_spaces table + realtime subscriptions + deterministic galaxy coordinates
- GalaxyView.tsx - Galaxy view component
- SpaceInterior.tsx - Space interior view

**Profile** (`/modules/profile/`)
- ProfileModule.tsx - Profile module
- ProfileCard.tsx - Profile card component

**Settings** (`/modules/settings/`)
- SettingsModule.tsx - Settings module
- SettingsPanel.tsx - Settings panel

**AI Tools** (`/modules/ai-tools/`)
- AIToolsModule.tsx - AI tools module
- AIPanel.tsx - AI panel component

#### /src/ui
UI system and design components

**Components** (`/ui/components/`)
- Button.tsx - Button component
- Input.tsx - Input component
- Modal.tsx - Modal component
- Toast.tsx - Toast notification
- Card.tsx - Card component

**Layout** (`/ui/layout/`)
- AppLayout.tsx - Main app layout
- Sidebar.tsx - Navigation sidebar

**Primitives** (`/ui/primitives/`)
- Flex.tsx - Flex layout primitive
- Stack.tsx - Stack layout primitive

**Icons** (`/ui/icons/`)
- index.ts - Icon exports

**Logo** (`/ui/logo/`)
- Logo.tsx - Logo component
- LogoLoader.tsx - Loading screen with logo

**Theme** (`/ui/theme/`)
- tokens.ts - Design tokens
- dark.ts - Dark theme
- light.ts - Light theme

**Animations** (`/ui/animations/`)
- transitions.ts - Animation utilities

#### /src/lib
Shared utility libraries
- **storage.ts** - Local storage utilities
- **fetcher.ts** - HTTP fetcher utilities
- **utils.ts** - General utilities

#### /src/types
TypeScript type definitions
- **user.ts** - User types
- **space.ts** - Space types
- **message.ts** - Message types
- **presence.ts** - Presence types
- **call.ts** - Call types
- **ai.ts** - AI types
- **settings.ts** - Settings types

#### /src/assets
Static assets
- **/logos** - Logo assets
- **/icons** - Icon assets
- **/gradients** - Gradient assets
- **/mural** - Mural/background assets

## Path Aliases
The following path aliases are configured in tsconfig.json:

```typescript
@/* -> ./src/*
@kernel/* -> ./src/kernel/*
@core/* -> ./src/core/*
@modules/* -> ./src/modules/*
@ui/* -> ./src/ui/*
@lib/* -> ./src/lib/*
@types/* -> ./src/types/*
```

## Key Dependencies

### Production
- **react** & **react-dom** (^18.2.0) - UI framework
- **react-router-dom** (^6.20.0) - Client-side routing
- **@supabase/supabase-js** (^2.38.0) - Backend and realtime database
- **ai** (^3.0.0) - Vercel AI SDK for AI integration

### Development
- **typescript** (^5.0.0) - Type safety
- **vite** (^4.3.0) - Build tool and dev server
- **electron** (^30.0.0) - Desktop app framework
- **electron-builder** (^24.0.0) - Desktop app packaging
- **cross-env** (^7.0.3) - Cross-platform environment variables

## Environment Variables

Required environment variables (see .env.example):

```bash
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_AI_GATEWAY_API_KEY=your_ai_gateway_key_here
VITE_SIGNALING_SERVER_URL=your_signaling_server_url_here  # Optional
```

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev              # Start Vite dev server
npm run electron:dev     # Start Electron in dev mode (VITE_DEV_SERVER_URL=http://localhost:5173)
```

### Building
```bash
npm run build            # Build for web
npm run electron:build   # Build Electron app (includes msix for Microsoft Store)
```

## Architecture Principles

1. **Layered Architecture**: Clear separation between kernel, core, modules, and UI
2. **Provider Pattern**: Context providers for cross-cutting concerns with proper nesting
3. **Modular Design**: Self-contained feature modules that can be developed independently
4. **Type Safety**: Full TypeScript coverage with strict mode
5. **Component Library**: Reusable UI components with consistent design
6. **OS Boot Pattern**: main.tsx → AppProviders → App → Router → Modules

## Next Steps

1. Install dependencies: `npm install`
2. Configure environment variables (Supabase, etc.)
3. Replace placeholder icon/logo files with actual assets
4. Implement authentication flow
5. Set up database schema
6. Configure WebRTC signaling server
7. Implement AI service integration
8. Add routing logic
9. Build out feature modules
10. Add tests

## Notes

- All placeholder icon/logo files should be replaced with actual assets
- Environment variables need to be configured for Supabase and other services
- The structure is ready for immediate development
- Each module is independent and can be developed in parallel
