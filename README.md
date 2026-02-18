# CloudHop - Unity WebGL Integration

A Unity WebGL integration for audio-reactive 3D visualization experiences, designed to work with a React frontend.

## Architecture

The system follows a bidirectional communication pattern:
```
React App → Audio Analysis → SpectrumStateManager → Unity Bridge → Unity WebGL → SpectrumController → Visual Effects
Unity → window.postMessage → React
```

## Components

### SpectrumController.cs
Core Unity MonoBehaviour that handles:
- Receiving spectrum data (frequencies, emotional state, visual params) from React via JSON
- Controlling particle systems, lighting, and materials
- Mapping 7 frequency bands (sub-bass to ultra-high) to visual effects
- Implementing emotional state mapping (energy, valence, arousal, tension) to colors
- Supporting mood-based environment transitions (calm, intense, dreamy, chaotic)

### UnityBridge.cs
Communication bridge between React and Unity:
- Exposes methods for React to send data to Unity
- Handles JSON parsing and routing to SpectrumController
- Sends readiness signals back to React via `window.postMessage`

## Data Structures

### SpectrumData
```csharp
{
    "frequencies": [subBass, bass, lowMid, mid, highMid, high, ultraHigh],
    "emotionalState": {
        "energy": 0.0-1.0,
        "valence": 0.0-1.0,
        "arousal": 0.0-1.0,
        "tension": 0.0-1.0
    },
    "visualParams": {
        "intensity": 0.0-2.0,
        "speed": 0.0-2.0,
        "mood": "calm|intense|dreamy|chaotic"
    }
}
```

## Frequency Bands

1. **Sub-Bass** (20-60 Hz) - Deep rumble, affects particle size
2. **Bass** (60-250 Hz) - Main beat, affects light intensity
3. **Low-Mid** (250-500 Hz) - Warmth and body
4. **Mid** (500-2kHz) - Presence and clarity
5. **High-Mid** (2-4kHz) - Attack and definition
6. **High** (4-6kHz) - Detail and sparkle
7. **Ultra-High** (6-20kHz) - Air and space

## Mood Presets

- **calm** - Blue/cool tones, slow particles, gentle movement
- **intense** - Red/warm tones, fast particles, dramatic lighting
- **dreamy** - Purple/soft tones, floating particles, ethereal feel
- **chaotic** - Orange/bright tones, erratic movement, high energy

## React Integration

```javascript
// Send spectrum data to Unity
window.UnityBridge.SendSpectrumData(JSON.stringify({
    frequencies: [0.8, 0.9, 0.5, 0.6, 0.4, 0.3, 0.2],
    emotionalState: {
        energy: 0.8,
        valence: 0.6,
        arousal: 0.7,
        tension: 0.4
    },
    visualParams: {
        intensity: 1.2,
        speed: 1.0,
        mood: "intense"
    }
}));

// Listen for Unity messages
window.addEventListener('message', (event) => {
    if (event.data.type === 'unity') {
        console.log('Unity message:', event.data.message);
    }
});
```

## Unity Setup

1. Create a new Unity project or open existing
2. Import these scripts into `Assets/Scripts/`
3. Add the following components to a GameObject:
   - SpectrumController
   - UnityBridge
   - ParticleSystem (assigned to mainParticleSystem)
   - Light (assigned to mainLight)
4. Configure references in the inspector
5. Build for WebGL platform
6. Deploy and integrate with React application

## Requirements

- Unity 2020.3 or later
- WebGL build target
- Newtonsoft.Json package (available via Package Manager)

## License

MIT
