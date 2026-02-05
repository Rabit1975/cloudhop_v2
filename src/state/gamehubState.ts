// GameHub keyboard state and settings

export type EscBehavior = 'exit' | 'overlay' | 'none';

export interface GameHubKeyboardSettings {
  gameMode: 'auto' | 'manual' | 'off';
  escBehavior: EscBehavior;
  showHotkeyOverlay: boolean;
  suppressShellShortcuts: boolean;
}

export interface GameHubState {
  isGameModeActive: boolean;
  isIframeFocused: boolean;
  keyboardSettings: GameHubKeyboardSettings;
}

export const defaultGameHubKeyboardSettings: GameHubKeyboardSettings = {
  gameMode: 'auto',
  escBehavior: 'exit',
  showHotkeyOverlay: true,
  suppressShellShortcuts: true,
};
