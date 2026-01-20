// GameHub focus tracking controller

export type FocusEventHandler = (isFocused: boolean) => void;

export class GameHubFocusController {
  private static _instance: GameHubFocusController;
  private iframe: HTMLIFrameElement | null = null;
  private isFocused = false;
  private focusHandlers: FocusEventHandler[] = [];
  private autoEnableGameMode = true;

  static get instance() {
    if (!this._instance) {
      this._instance = new GameHubFocusController();
    }
    return this._instance;
  }

  private constructor() {
    // Listen for click events to detect focus changes
    document.addEventListener('click', this.handleDocumentClick);
    window.addEventListener('blur', this.handleWindowBlur);
  }

  setIframe(iframe: HTMLIFrameElement | null) {
    this.iframe = iframe;
    
    if (iframe) {
      iframe.addEventListener('load', this.handleIframeLoad);
    }
  }

  private handleIframeLoad = () => {
    if (this.iframe?.contentWindow) {
      // Monitor iframe focus
      this.iframe.contentWindow.addEventListener('focus', this.handleIframeFocus);
      this.iframe.contentWindow.addEventListener('blur', this.handleIframeBlur);
    }
  };

  private handleDocumentClick = (event: MouseEvent) => {
    if (!this.iframe) return;

    const target = event.target as HTMLElement;
    const isInsideIframe = this.iframe.contains(target) || target === this.iframe;
    
    this.setFocused(isInsideIframe);
  };

  private handleIframeFocus = () => {
    this.setFocused(true);
  };

  private handleIframeBlur = () => {
    this.setFocused(false);
  };

  private handleWindowBlur = () => {
    this.setFocused(false);
  };

  private setFocused(focused: boolean) {
    if (this.isFocused === focused) return;
    
    this.isFocused = focused;
    this.notifyHandlers(focused);
  }

  onFocusChange(handler: FocusEventHandler) {
    this.focusHandlers.push(handler);
    return () => {
      this.focusHandlers = this.focusHandlers.filter(h => h !== handler);
    };
  }

  private notifyHandlers(isFocused: boolean) {
    this.focusHandlers.forEach(handler => handler(isFocused));
  }

  isFocusLocked(): boolean {
    return this.isFocused;
  }

  setAutoEnableGameMode(enabled: boolean) {
    this.autoEnableGameMode = enabled;
  }

  shouldAutoEnableGameMode(): boolean {
    return this.autoEnableGameMode;
  }

  destroy() {
    document.removeEventListener('click', this.handleDocumentClick);
    window.removeEventListener('blur', this.handleWindowBlur);
    
    if (this.iframe?.contentWindow) {
      this.iframe.contentWindow.removeEventListener('focus', this.handleIframeFocus);
      this.iframe.contentWindow.removeEventListener('blur', this.handleIframeBlur);
    }
    
    this.focusHandlers = [];
    this.iframe = null;
  }
}
