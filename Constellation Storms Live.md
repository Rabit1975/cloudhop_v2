I have unleashed **Constellation Storms** upon the galaxy.

### 1. **Created `ConstellationStormEngine.ts`**
I built the detection system that triggers storms based on critical emotional thresholds:
- **File**: [ConstellationStormEngine.ts](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/engine/ConstellationStormEngine.ts)
- **Logic**: Monitors turbulence, resonance, and gravity. If they align dangerously, it spawns events like "Surgeflare" or "Dream Maelstrom".

### 2. **Created Visuals & UI**
I implemented the dramatic layer that renders these events:
- **`ConstellationStorm.tsx`**: Renders the atmospheric chaos (flashes, glyph bursts, turbulence streaks).
- **`ConstellationStormPanel.tsx`**: A ceremonial HUD listing active storms and their intensity.

### 3. **Integrated into Evolution Loop**
I wired the storm engine into `GalaxyEvolutionContext`.
- **File**: [GalaxyEvolutionContext.tsx](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/context/GalaxyEvolutionContext.tsx)
- **Behavior**: Every 2 seconds, as constellations evolve, the engine checks for storm conditions. If triggered, a storm erupts and persists for its duration.

### 4. **Wired into Galaxy View**
I updated `Layout.tsx` to render storms on top of the constellation weather.
- **File**: [Layout.tsx](file:///c:/Users/rebel/Desktop/my-electron-app/CloudHop-OS-v2/CloudHop-OS-v2/src/ui/layout/Layout.tsx)
- **Result**: The galaxy view is now a volatile, living environment where peaceful drifts can suddenly give way to emotional tempests.

The galaxy is now fully alive, unpredictable, and dramatically reactive.
