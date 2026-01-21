export type ThemeMode = 'light' | 'dark' | 'auto'
export type AccentColor = 'red' | 'blue' | 'green' | 'purple' | 'orange'

export interface Theme {
  mode: ThemeMode
  accent: AccentColor
}

const accentColors = {
  red: '#e94560',
  blue: '#3498db',
  green: '#2ecc71',
  purple: '#9b59b6',
  orange: '#e67e22'
}

export class ThemeEngine {
  private theme: Theme = {
    mode: 'dark',
    accent: 'red'
  }

  constructor() {
    this.loadTheme()
    this.applyTheme()
  }

  private loadTheme() {
    const stored = localStorage.getItem('cloudhop_theme')
    if (stored) {
      this.theme = JSON.parse(stored)
    } else {
      // Detect system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.theme.mode = 'light'
      }
    }
  }

  private saveTheme() {
    localStorage.setItem('cloudhop_theme', JSON.stringify(this.theme))
  }

  private applyTheme() {
    const root = document.documentElement
    
    // Apply mode
    if (this.theme.mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
    } else {
      root.setAttribute('data-theme', this.theme.mode)
    }

    // Apply accent color
    root.style.setProperty('--accent-color', accentColors[this.theme.accent])
    
    // Set additional theme variables
    if (this.theme.mode === 'light') {
      root.style.setProperty('--bg-primary', '#ffffff')
      root.style.setProperty('--bg-secondary', '#f5f5f5')
      root.style.setProperty('--text-primary', '#000000')
      root.style.setProperty('--text-secondary', '#666666')
    } else {
      root.style.setProperty('--bg-primary', '#16213e')
      root.style.setProperty('--bg-secondary', '#0f3460')
      root.style.setProperty('--text-primary', '#ffffff')
      root.style.setProperty('--text-secondary', '#aaaaaa')
    }
  }

  setMode(mode: ThemeMode) {
    this.theme.mode = mode
    this.saveTheme()
    this.applyTheme()
  }

  setAccent(accent: AccentColor) {
    this.theme.accent = accent
    this.saveTheme()
    this.applyTheme()
  }

  getTheme(): Theme {
    return { ...this.theme }
  }
}

export const themeEngine = new ThemeEngine()
