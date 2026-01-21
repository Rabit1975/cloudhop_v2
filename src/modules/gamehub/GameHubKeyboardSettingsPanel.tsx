// GameHub Keyboard Settings Panel

import React, { useState, useEffect } from 'react';
import { GameHubInputManager } from './GameHubInputManager';
import { GameHubKeyboardSettings } from '../../state/gamehubState';

export const GameHubKeyboardSettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<GameHubKeyboardSettings>(
    GameHubInputManager.instance.getState().keyboardSettings
  );

  useEffect(() => {
    const handleSettingsChange = (event: Event) => {
      const customEvent = event as CustomEvent<GameHubKeyboardSettings>;
      setSettings(customEvent.detail);
    };

    window.addEventListener('gamehub:settingsChanged', handleSettingsChange);
    return () => window.removeEventListener('gamehub:settingsChanged', handleSettingsChange);
  }, []);

  const handleSettingChange = (key: keyof GameHubKeyboardSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    GameHubInputManager.instance.updateSettings({ [key]: value });
  };

  return (
    <div style={{
      padding: '20px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '12px',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>
        ⌨️ Keyboard Settings
      </h3>

      {/* Game Mode */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', opacity: 0.8 }}>
          Game Mode Activation
        </label>
        <select
          value={settings.gameMode}
          onChange={(e) => handleSettingChange('gameMode', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
          }}
        >
          <option value="auto">Auto (enable when clicking in game)</option>
          <option value="manual">Manual (toggle with button)</option>
          <option value="off">Off (disabled)</option>
        </select>
      </div>

      {/* ESC Behavior */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', opacity: 0.8 }}>
          ESC Key Behavior
        </label>
        <select
          value={settings.escBehavior}
          onChange={(e) => handleSettingChange('escBehavior', e.target.value)}
          style={{
            width: '100%',
            padding: '8px 12px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            color: 'white',
            fontSize: '14px',
          }}
        >
          <option value="exit">Exit Game Mode</option>
          <option value="overlay">Toggle Overlay</option>
          <option value="none">Pass to Game</option>
        </select>
      </div>

      {/* Show Hotkey Overlay */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
          <input
            type="checkbox"
            checked={settings.showHotkeyOverlay}
            onChange={(e) => handleSettingChange('showHotkeyOverlay', e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Show Hotkey Overlay
        </label>
      </div>

      {/* Suppress Shell Shortcuts */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
          <input
            type="checkbox"
            checked={settings.suppressShellShortcuts}
            onChange={(e) => handleSettingChange('suppressShellShortcuts', e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Suppress Shell Shortcuts (Ctrl+W, Ctrl+R, etc.)
        </label>
      </div>

      {/* Info Box */}
      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.3)',
        borderRadius: '8px',
        fontSize: '12px',
        opacity: 0.8,
      }}>
        <strong>💡 Tip:</strong> Game Mode prevents CloudHop shortcuts from interfering with your game.
        Press ESC to exit Game Mode at any time.
      </div>
    </div>
  );
};
