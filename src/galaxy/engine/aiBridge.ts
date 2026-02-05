import type { GalaxyState, NebulaShape, Constellation } from './galaxyState';

export type GalaxyAIHint = {
  mood?: GalaxyState['mood'];
  nebulaOverride?: Partial<NebulaShape>;
  constellationOverride?: Partial<Constellation>;
};

export function applyAIHint(state: GalaxyState, hint: GalaxyAIHint): GalaxyState {
  return {
    ...state,
    mood: hint.mood ?? state.mood,
    nebula: { ...state.nebula, ...hint.nebulaOverride },
    constellation: { ...state.constellation, ...hint.constellationOverride },
  };
}
