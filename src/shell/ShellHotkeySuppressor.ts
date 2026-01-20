// Shell hotkey suppression

export class ShellHotkeySuppressor {
  private static _instance: ShellHotkeySuppressor;
  private isActive = false;
  private suppressedKeys = new Set<string>();

  static get instance() {
    if (!this._instance) {
      this._instance = new ShellHotkeySuppressor();
    }
    return this._instance;
  }

  private constructor() {
    // Default shortcuts to suppress
    this.suppressedKeys.add('Ctrl+W');
    this.suppressedKeys.add('Ctrl+Shift+P');
    this.suppressedKeys.add('Ctrl+R');
    this.suppressedKeys.add('Meta+R'); // Cmd+R on Mac
    this.suppressedKeys.add('Ctrl+L');
    this.suppressedKeys.add('Ctrl+Tab');
    this.suppressedKeys.add(' '); // Spacebar
  }

  suppress() {
    this.isActive = true;
  }

  restore() {
    this.isActive = false;
  }

  isSuppressionActive(): boolean {
    return this.isActive;
  }

  shouldSuppressEvent(event: KeyboardEvent): boolean {
    if (!this.isActive) return false;

    const keyCombo = this.getKeyCombo(event);
    return this.suppressedKeys.has(keyCombo);
  }

  private getKeyCombo(event: KeyboardEvent): string {
    const parts: string[] = [];
    
    if (event.ctrlKey) parts.push('Ctrl');
    if (event.shiftKey) parts.push('Shift');
    if (event.altKey) parts.push('Alt');
    if (event.metaKey) parts.push('Meta');
    
    parts.push(event.key);
    
    return parts.join('+');
  }

  addSuppressedKey(keyCombo: string) {
    this.suppressedKeys.add(keyCombo);
  }

  removeSuppressedKey(keyCombo: string) {
    this.suppressedKeys.delete(keyCombo);
  }
}
