import React, { createContext, useContext, useState } from 'react';
import { Game } from '../types/games';

interface StrikeForceContextValue {
  hoveredNode: string | null;
  setHoveredNode: (nodeId: string | null) => void;
  nebulaBloom: number;
  setNebulaBloom: (intensity: number) => void;
  openGameDetails: (game: Game) => void;
  selectedGame: Game | null;
}

const StrikeForceContext = createContext<StrikeForceContextValue | null>(null);

export function StrikeForceProvider({ children }: { children: React.ReactNode }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nebulaBloom, setNebulaBloom] = useState<number>(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const openGameDetails = (game: Game) => {
    setSelectedGame(game);
    // This will trigger a re-render in any component that uses this context
  };

  return (
    <StrikeForceContext.Provider
      value={{
        hoveredNode,
        setHoveredNode,
        nebulaBloom,
        setNebulaBloom,
        openGameDetails,
        selectedGame,
      }}
    >
      {children}
    </StrikeForceContext.Provider>
  );
}

export function useStrikeForce() {
  const ctx = useContext(StrikeForceContext);
  if (!ctx) throw new Error('useStrikeForce must be used within StrikeForceProvider');
  return ctx;
}
