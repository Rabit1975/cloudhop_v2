// GameHub Hotkey Overlay - Shows keyboard hints when game mode is active

import React, { useState, useEffect } from 'react';
import { GameHubInputManager } from './GameHubInputManager';

export const GameHubHotkeyOverlay: React.FC = () => {
  const [isGameModeActive, setIsGameModeActive] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const manager = GameHubInputManager.instance;
    
    // Check initial state
    setIsGameModeActive(manager.isGameModeActive());
    setShowOverlay(manager.getState().keyboardSettings.showHotkeyOverlay);

    // Listen for game mode changes
    const unsubscribe = manager.onGameModeChange(setIsGameModeActive);

    // Listen for settings changes
    const handleSettingsChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      setShowOverlay(customEvent.detail.showHotkeyOverlay);
    };

    window.addEventListener('gamehub:settingsChanged', handleSettingsChange);

    return () => {
      unsubscribe();
      window.removeEventListener('gamehub:settingsChanged', handleSettingsChange);
    };
  }, []);

  if (!isGameModeActive || !showOverlay) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      padding: '12px 16px',
      background: 'rgba(0, 0, 0, 0.85)',
      border: '1px solid rgba(34, 197, 94, 0.5)',
      borderRadius: '8px',
      color: '#ffffff',
      fontSize: '12px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      zIndex: 10000,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#22c55e',
          animation: 'pulse 2s ease-in-out infinite',
        }} />
        <strong style={{ fontSize: '13px' }}>Game Mode Active</strong>
      </div>
      
      <div style={{ opacity: 0.8, lineHeight: '1.6' }}>
        <div>🎮 Keys forwarded to game</div>
        <div>⌨️ Shell shortcuts suppressed</div>
        <div>🚪 Press <kbd style={{
          padding: '2px 6px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '4px',
          fontSize: '11px',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>ESC</kbd> to exit</div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};
