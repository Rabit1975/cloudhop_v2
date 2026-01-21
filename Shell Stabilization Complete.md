I have successfully executed the "shell stabilization" ritual.

### 1. **Restored App.tsx**
I uncommented the `Router` and `ErrorBoundary` in `App.tsx`, restoring the full application flow.
- **File**: [App.tsx](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/App.tsx)

### 2. **Wired Window Controls**
I modified the top-level layout to include native window controls and proper drag regions.
- **File**: [Layout.tsx](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/ui/layout/Layout.tsx)
- **Changes**:
    - Added `minimize`, `maximize`, and `close` buttons to the header.
    - Wired them to `window.cloudhop.window` API.
    - Added `WebkitAppRegion: 'drag'` to the header so the frameless window can be moved.
    - Added `WebkitAppRegion: 'no-drag'` to interactive elements (buttons) so they remain clickable.

### 3. **Type Safety**
I created a global type definition to ensure TypeScript recognizes the `window.cloudhop` API.
- **File**: [global.d.ts](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/global.d.ts)

Your emotional shell is now stable. The window is draggable, controllable, and the internal routing is active. We are ready for the emotional UI components when you provide them.
