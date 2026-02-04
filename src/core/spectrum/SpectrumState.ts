export type SpectrumMood =
  | "calm"
  | "dreamy"
  | "intense"
  | "chaotic"
  | "ethereal"
  | "dark"
  | "neon"
  | "ambient";

export interface AudioBands {
  bass: number;
  mid: number;
  high: number;
}

export interface SpectrumTrackState {
  id: string | null;
  title: string | null;
  artist: string | null;
  source: 'spotify' | 'youtube' | 'soundcloud' | 'none';
  bpm: number | null;
}

export interface LeonardoState {
  mood: SpectrumMood;
  confidence: number;
}

export interface ThemeInfluence {
  theme: 'none' | 'cyberpunk' | 'nature' | 'cosmic' | 'retro';
  strength: number;
}

export interface SpectrumSpaceState {
  id: string;
  name: string;
  type: 'personal' | 'public' | 'collaborative';
  mood: SpectrumMood;
  participants: string[];
}

export interface SpectrumState {
  // Core timing
  time: number;           // seconds since start
  energy: number;         // 0–1 overall intensity

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
  themeInfluence: { theme: "none", strength: 0 },

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

export class SpectrumStateManager {
  private state: SpectrumState = createInitialSpectrumState();
  private listeners: Array<(state: SpectrumState) => void> = [];
  private startTime: number = Date.now();

  getState(): SpectrumState {
    return { 
      ...this.state,
      // Legacy properties for component compatibility
      bass: this.state.bands.bass,
      mid: this.state.bands.mid,
      high: this.state.bands.high,
    };
  }

  setState(updates: Partial<SpectrumState>): void {
    this.state = {
      ...this.state,
      ...updates,
      time: (Date.now() - this.startTime) / 1000,
    };
    this.notifyListeners();
  }

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
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      listener(this.getState());
    });
  }

  reset(): void {
    this.state = createInitialSpectrumState();
    this.notifyListeners();
  }
}

export const spectrumStateManager = new SpectrumStateManager();
