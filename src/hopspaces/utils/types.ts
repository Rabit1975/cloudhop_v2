export type HopSpaceType = 'music' | 'fluid_art' | 'ideas' | 'world' | 'anima';

export type HopSpaceMood = 'calm' | 'dreamy' | 'intense' | 'chaotic' | 'ethereal';

export interface HopSpace {
  id: string;
  name: string;
  type: HopSpaceType;
  mood: HopSpaceMood;
  created_at: string;
  cover_image_url: string;
  background_url: string;
  orbit_links: string[]; // related space IDs
  galaxy_position: { x: number; y: number; layer: number };
  glow_intensity: number;
  metadata: Record<string, unknown>; // type-specific data keys
  description?: string;
  tags?: string[];
}

export interface PlanetState {
  active: boolean;
  glowIntensity: number;
  // Add other dynamic state properties here
}
