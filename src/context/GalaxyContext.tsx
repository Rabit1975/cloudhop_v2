import { createContext, useContext, useState, useEffect } from 'react';
import type { GalaxyState } from '../galaxy/engine/galaxyState';
import { initialGalaxyState } from '../galaxy/engine/galaxyState';
import { stepNebula } from '../galaxy/engine/nebulaEngine';
import { stepConstellation } from '../galaxy/engine/constellationEngine';
import { useStrikeForce } from './StrikeForceContext';

type GalaxyContextValue = {
  state: GalaxyState;
  setMood: (mood: GalaxyState['mood']) => void;
  nebulaBloom: number;
};

const GalaxyContext = createContext<GalaxyContextValue | null>(null);

export function GalaxyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GalaxyState>(initialGalaxyState);
  const { nebulaBloom } = useStrikeForce();

  useEffect(() => {
    // Animation loop removed to improve performance. 
    // Visuals are now handled by local Canvas components (e.g., GalaxyBackground).
  }, []);

  const setMood = (mood: GalaxyState['mood']) => setState(prev => ({ ...prev, mood }));

  return (
    <GalaxyContext.Provider value={{ state, setMood, nebulaBloom }}>
      {children}
    </GalaxyContext.Provider>
  );
}

export function useGalaxy() {
  const ctx = useContext(GalaxyContext);
  if (!ctx) throw new Error('useGalaxy must be used within GalaxyProvider');
  return ctx;
}
