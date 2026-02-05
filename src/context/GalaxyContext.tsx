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
    let frame: number;

    const loop = () => {
      setState(prev => {
        const nebula = stepNebula(prev.nebula, prev.mood);
        const constellation = stepConstellation(prev.constellation, prev.mood);
        return { ...prev, nebula, constellation };
      });
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
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
