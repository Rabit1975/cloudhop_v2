// Shell Game Mode Indicator - Shows game mode status in Shell UI

import React, { useState, useEffect } from 'react';
import { GameHubInputManager } from '../../modules/gamehub/GameHubInputManager';

export const ShellGameModeIndicator: React.FC = () => {
  const [isGameModeActive, setIsGameModeActive] = useState(false);

  useEffect(() => {
    const manager = GameHubInputManager.instance;
    
    // Check initial state
    setIsGameModeActive(manager.isGameModeActive());

    // Listen for game mode changes
    const unsubscribe = manager.onGameModeChange(setIsGameModeActive);

    return () => unsubscribe();
  }, []);

  if (!isGameModeActive) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      left: '16px',
      padding: '8px 12px',
      background: 'rgba(34, 197, 94, 0.15)',
      border: '1px solid rgba(34, 197, 94, 0.4)',
      borderRadius: '6px',
      color: '#22c55e',
      fontSize: '11px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      fontWeight: 600,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      backdropFilter: 'blur(8px)',
    }}>
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#22c55e',
      }} />
      GAME MODE
    </div>
  );
};
