

# CloudHop — Build Plan

## Phase 1: Foundation Setup
Get the app running with all your existing code properly integrated.

### 1.1 Theme & Styling
- Add `magenta` color palette (400, 500, 600 shades) to Tailwind config
- Create `glass-panel` utility class (semi-transparent background + backdrop blur + border)
- Set up the dark cosmic base theme matching your nebula aesthetic

### 1.2 Assets Integration
- Place all 3 CloudHop logos into the project (3D rabbit, splash screen logo, neon logo)
- Place both nebula background images for use on Home and HopHub pages
- Update the app favicon and page title to "CloudHop"

### 1.3 CloudHopLayout Component
- Build the main app shell with left sidebar navigation
- Tabs: Home, HopHub, Music, GameHub, Spaces, Twitch, HopMeetings
- CloudHop splash logo at the top of sidebar
- "Hop In, Cloud On" branding tagline
- User avatar with online status indicator in sidebar footer
- Responsive sidebar that collapses on smaller screens
- Nebula background imagery behind the layout

### 1.4 Wire Up All Pages
- Import all your existing page components (Home, Chat/HopHub, GameHub, Music, Spaces, SpacesWithChat, Twitch, HopMeetings)
- Set up routing through Chat.tsx as the main entry point (since it handles tab switching)
- Copy your games manifest to the public folder for GameHub

## Phase 2: Complete HopMeetings
Enhance your existing meeting page with full Zoom-like features.

### 2.1 Meeting Setup & Scheduling
- **Schedule meetings** — Date/time picker to schedule future meetings
- **Invite link sharing** — Copy meeting ID/link button with toast notification
- **Join by ID** — Input field to join an existing meeting by entering a meeting code

### 2.2 Waiting Room
- Host sees a list of people waiting to join with Admit/Deny buttons
- Participants see a branded waiting screen with the CloudHop logo while waiting for host approval
- Toggle to enable/disable waiting room in meeting settings

### 2.3 Reactions & Hand Raise
- Floating emoji reactions bar (👏 🎉 ❤️ 😂 👍 🔥) that animate upward when clicked
- Hand raise button that shows a ✋ indicator on participant tiles
- Reactions visible to all participants as floating overlays

### 2.4 Breakout Rooms
- Host can create multiple sub-rooms and assign participants
- Timer for breakout sessions with auto-return option
- Broadcast message from host to all breakout rooms

### 2.5 Virtual Backgrounds
- Selection panel with preset gradient/themed backgrounds (cosmic, aurora, CloudHop branded)
- Blur background option
- Preview before applying

### 2.6 Whiteboard
- Collaborative drawing canvas overlay that opens as a shared view
- Basic drawing tools: pen, shapes, text, eraser, colors
- All participants can see and draw simultaneously

### 2.7 Polls & Q&A
- Host creates quick polls with multiple choice options
- Participants vote in real-time with live results bar chart
- Q&A panel where participants can submit and upvote questions

### 2.8 Meeting Settings Panel
- Audio/video device selection dropdowns
- Noise suppression toggle
- Meeting security options (lock meeting, enable waiting room)
- Recording indicator and controls

### 2.9 Post-Meeting Summary
- Summary screen showing duration, participant count, and highlights
- Option to export/save the meeting chat transcript
- "Rejoin" or "Start New Meeting" actions

## Phase 3: Polish & Consistency
- Ensure nebula backgrounds and glass-panel styling are consistent across all pages
- Smooth animated transitions between tabs
- Loading states and empty states for all sections
- Mobile-responsive adjustments for sidebar and meeting controls

