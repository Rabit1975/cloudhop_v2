// src/core/spectrum/SpectrumState.ts

export type SpectrumMood =
  | "calm"
  | "dreamy"
  | "intense"
  | "chaotic"
  | "ethereal"
  | "dark"
  | "neon"
  | "ambient";

export type ThemeInfluence =
  | "none"
  | "music"
  | "space"
  | "system";

export interface SpectrumSpaceState {
  id: string;
  name: string;
  mood: SpectrumMood;
  energy: number;      // 0–1, how "alive" the space feels
  activity: number;    // 0–1, recent events / presence
  engagement: number;  // 0–1, depth of interaction
}

export interface SpectrumTrackState {
  id: string | null;
  title: string | null;
  artist: string | null;
  source: "none" | "local" | "youtube" | "spotify" | "other";
  bpm: number | null;
}

export interface LeonardoState {
  mood: SpectrumMood;
  confidence: number; // 0–1
}

export interface AudioBands {
  bass: number; // 0–1
  mid: number;  // 0–1
  high: number; // 0–1
}

export interface SpectrumState {
  // Core time + energy
  time: number;        // seconds since Spectrum started
  energy: number;      // 0–1 overall intensity

  // Audio
  bpm: number;         // beats per minute (fallback if track.bpm is null)
  bands: AudioBands;

  // Mood + theme
  fusedMood: SpectrumMood;
  themeInfluence: ThemeInfluence;

  // Spaces
  spaces: SpectrumSpaceState[];
  activeSpaceId: string | null;

  // Music
  track: SpectrumTrackState;

  // Leonardo
  leonardo: LeonardoState;
  
  // Visual parameters (computed/derived from core state)
  nebulaIntensity?: number;
  particleCount?: number;
  orbitSpeed?: number;
  glyphResonance?: number;
  
  // Colors (computed/derived from mood)
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  glowColor?: string;
  
  // Legacy properties (for backward compatibility)
  bass?: number;
  mid?: number;
  high?: number;
}

export const createInitialSpectrumState = (): SpectrumState => ({
  time: 0,
  energy: 0,

  bpm: 0,
  bands: {
    bass: 0,
    mid: 0,
    high: 0,
  },

  fusedMood: "calm",
  themeInfluence: "none",

  spaces: [],
  activeSpaceId: null,

  track: {
    id: null,
    title: null,
    artist: null,
    source: "none",
    bpm: null,
  },

  leonardo: {
    mood: "calm",
    confidence: 1,
  },
});

// State manager for backward compatibility
export class SpectrumStateManager {
  private state: SpectrumState = createInitialSpectrumState();
  private listeners: Array<(state: SpectrumState) => void> = [];
  private startTime: number = Date.now();

  getState(): SpectrumState {
    // Return state with backward-compatible properties
    return { 
      ...this.state,
      // Legacy properties for component compatibility
      bass: this.state.audio.bands.bass,
      mid: this.state.audio.bands.mid,
      high: this.state.audio.bands.high,
    };
  }
  high: number
  energy: number
  bpm: number

  // Emotional state
  valence: number
  arousal: number
  dominance: number

  // Visual state
  nebulaIntensity: number
  particleCount: number
  orbitSpeed: number
  glyphResonance: number
  
  // Colors from mood fusion
  primaryColor: string
  secondaryColor: string
  accentColor: string
  glowColor: string

  // Time
  timestamp: number
}

export const defaultSpectrumState: SpectrumState = {
  bass: 0,
  mid: 0,
  high: 0,
  energy: 0,
  bpm: 120,
  
  valence: 0.5,
  arousal: 0.5,
  dominance: 0.5,
  
  nebulaIntensity: 0.5,
  particleCount: 1000,
  orbitSpeed: 1,
  glyphResonance: 0,
  
  primaryColor: '#6366f1',
  secondaryColor: '#8b5cf6',
  accentColor: '#ec4899',
  glowColor: '#7dd3fc',
  
  timestamp: Date.now()
}

export class SpectrumStateManager {
  private state: SpectrumState = { ...defaultSpectrumState }
  private listeners: Array<(state: SpectrumState) => void> = []

  getState(): SpectrumState {
    return { ...this.state }
  }

  setState(updates: Partial<SpectrumState>): void {
    this.state = {
      ...this.state,
      ...updates,
      time: (Date.now() - this.startTime) / 1000,
    };
    this.notifyListeners();
  }

  // Legacy compatibility methods
  updateAudioFeatures(features: {
    bass: number;
    mid: number;
    high: number;
    energy: number;
    bpm: number;
  }): void {
    this.setState({
      bands: {
        bass: features.bass,
        mid: features.mid,
        high: features.high,
      },
      energy: features.energy,
      bpm: features.bpm,
    });
  }

  updateEmotionalState(emotional: {
    valence: number;
    arousal: number;
    dominance: number;
  }): void {
    // Map emotional state to mood
    const { valence, arousal } = emotional;
    let mood: SpectrumMood = "calm";
    
    if (arousal > 0.7) {
      mood = valence > 0.6 ? "intense" : "chaotic";
    } else if (arousal > 0.4) {
      mood = valence > 0.6 ? "ambient" : "neon";
    } else {
      mood = valence > 0.5 ? "dreamy" : "dark";
    }
    
    this.setState({ fusedMood: mood });
  }

  updateColors(colors: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    glowColor: string;
  }): void {
    // Store colors in state for component compatibility
    this.setState({
      primaryColor: colors.primaryColor,
      secondaryColor: colors.secondaryColor,
      accentColor: colors.accentColor,
      glowColor: colors.glowColor,
    });
  }

  subscribe(listener: (state: SpectrumState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
      timestamp: Date.now()
    }
    this.notifyListeners()
  }

  updateAudioFeatures(features: {
    bass: number
    mid: number
    high: number
    energy: number
    bpm: number
  }): void {
    this.setState(features)
  }

  updateEmotionalState(emotional: {
    valence: number
    arousal: number
    dominance: number
  }): void {
    this.setState(emotional)
  }

  updateColors(colors: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
    glowColor: string
  }): void {
    this.setState(colors)
  }

  subscribe(listener: (state: SpectrumState) => void): () => void {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener(this.getState());
    });
  }

  reset(): void {
    this.state = createInitialSpectrumState()
    this.state.timestamp = Date.now()
    this.notifyListeners()
  }
}

export const spectrumStateManager = new SpectrumStateManager();
      listener(this.getState())
    })
  }

  reset(): void {
    this.state = { ...defaultSpectrumState }
    this.notifyListeners()
  }
}

export const spectrumStateManager = new SpectrumStateManager()
