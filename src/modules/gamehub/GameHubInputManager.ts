// GameHub input manager - Core keyboard routing and game mode control

import { ShellHotkeySuppressor } from '../../shell/ShellHotkeySuppressor';
import { GameHubIframeBridge } from './GameHubIframeBridge';
import { GameHubFocusController } from './GameHubFocusController';
import { GameHubState, GameHubKeyboardSettings, defaultGameHubKeyboardSettings } from '../../state/gamehubState';

type KeyHandler = (event: KeyboardEvent) => void;
type GameModeChangeHandler = (isActive: boolean) => void;

export class GameHubInputManager {
  private static _instance: GameHubInputManager;
  
  static get instance() {
    if (!this._instance) {
      this._instance = new GameHubInputManager();
    }
    return this._instance;
  }

  private state: GameHubState;
  private iframeBridge: GameHubIframeBridge;
  private focusController: GameHubFocusController;
  private hotkeySuppressor: ShellHotkeySuppressor;
  private gameModeChangeHandlers: GameModeChangeHandler[] = [];
  private keydownHandler: KeyHandler | null = null;

  private constructor() {
    this.state = {
      isGameModeActive: false,
      isIframeFocused: false,
      keyboardSettings: { ...defaultGameHubKeyboardSettings },
    };

    this.iframeBridge = new GameHubIframeBridge();
    this.focusController = GameHubFocusController.instance;
    this.hotkeySuppressor = ShellHotkeySuppressor.instance;

    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Listen for focus changes
    this.focusController.onFocusChange((isFocused) => {
      this.state.isIframeFocused = isFocused;
      
      // Auto-enable game mode when iframe is focused
      if (isFocused && this.state.keyboardSettings.gameMode === 'auto') {
        this.enableGameMode();
      }
    });

    // Setup global keydown handler
    this.keydownHandler = this.handleKeyDown.bind(this);
    window.addEventListener('keydown', this.keydownHandler, true);
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Handle ESC key based on settings
    if (event.key === 'Escape') {
      this.handleEscKey(event);
      return;
    }

    // If game mode is active
    if (this.state.isGameModeActive) {
      // Suppress shell shortcuts if enabled
      if (this.state.keyboardSettings.suppressShellShortcuts) {
        if (this.hotkeySuppressor.shouldSuppressEvent(event)) {
          event.preventDefault();
          event.stopPropagation();
        }
      }

      // Forward keys to iframe if it's focused
      if (this.state.isIframeFocused) {
        this.iframeBridge.forwardKey(event);
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  private handleEscKey(event: KeyboardEvent) {
    const behavior = this.state.keyboardSettings.escBehavior;
    
    switch (behavior) {
      case 'exit':
        if (this.state.isGameModeActive) {
          this.disableGameMode();
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case 'overlay':
        // Dispatch event for overlay toggle
        window.dispatchEvent(new CustomEvent('gamehub:toggleOverlay'));
        event.preventDefault();
        event.stopPropagation();
        break;
      case 'none':
        // Pass through
        break;
    }
  }

  enableGameMode() {
    if (this.state.isGameModeActive) return;
    
    this.state.isGameModeActive = true;
    
    if (this.state.keyboardSettings.suppressShellShortcuts) {
      this.hotkeySuppressor.suppress();
    }
    
    this.notifyGameModeChange(true);
    window.dispatchEvent(new CustomEvent('gamehub:gameModeEnabled'));
  }

  disableGameMode() {
    if (!this.state.isGameModeActive) return;
    
    this.state.isGameModeActive = false;
    this.hotkeySuppressor.restore();
    
    this.notifyGameModeChange(false);
    window.dispatchEvent(new CustomEvent('gamehub:gameModeDisabled'));
  }

  toggleGameMode() {
    if (this.state.isGameModeActive) {
      this.disableGameMode();
    } else {
      this.enableGameMode();
    }
  }

  isGameModeActive(): boolean {
    return this.state.isGameModeActive;
  }

  getState(): GameHubState {
    return { ...this.state };
  }

  updateSettings(settings: Partial<GameHubKeyboardSettings>) {
    this.state.keyboardSettings = {
      ...this.state.keyboardSettings,
      ...settings,
    };
    
    // Update auto-enable behavior
    this.focusController.setAutoEnableGameMode(
      settings.gameMode === 'auto'
    );
    
    // Update hotkey suppression
    if (this.state.isGameModeActive) {
      if (settings.suppressShellShortcuts) {
        this.hotkeySuppressor.suppress();
      } else {
        this.hotkeySuppressor.restore();
      }
    }
    
    window.dispatchEvent(new CustomEvent('gamehub:settingsChanged', {
      detail: this.state.keyboardSettings,
    }));
  }

  setIframe(iframe: HTMLIFrameElement | null) {
    this.iframeBridge.setIframe(iframe);
    this.focusController.setIframe(iframe);
  }

  onGameModeChange(handler: GameModeChangeHandler) {
    this.gameModeChangeHandlers.push(handler);
    return () => {
      this.gameModeChangeHandlers = this.gameModeChangeHandlers.filter(h => h !== handler);
    };
  }

  private notifyGameModeChange(isActive: boolean) {
    this.gameModeChangeHandlers.forEach(handler => handler(isActive));
  }

  destroy() {
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler, true);
    }
    
    this.iframeBridge.destroy();
    this.focusController.destroy();
    this.gameModeChangeHandlers = [];
  }
}
