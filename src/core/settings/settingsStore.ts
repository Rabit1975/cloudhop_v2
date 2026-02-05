// Settings store for managing app settings
type Settings = {
  theme: 'light' | 'dark'
  notifications: boolean
  language: string
  volume: number
}

class SettingsStore {
  private settings: Settings = {
    theme: 'dark',
    notifications: true,
    language: 'en',
    volume: 80
  }
  private listeners: ((settings: Settings) => void)[] = []

  getSettings() {
    return this.settings
  }

  updateSettings(updates: Partial<Settings>) {
    this.settings = { ...this.settings, ...updates }
    this.notifyListeners()
    this.saveToLocalStorage()
  }

  subscribe(listener: (settings: Settings) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.settings))
  }

  private saveToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(this.settings))
  }

  loadFromLocalStorage() {
    const stored = localStorage.getItem('settings')
    if (stored) {
      this.settings = JSON.parse(stored)
      this.notifyListeners()
    }
  }
}

export const settingsStore = new SettingsStore()
