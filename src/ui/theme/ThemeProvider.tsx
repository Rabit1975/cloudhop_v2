import React, { createContext, useContext, useState, useEffect } from 'react'
import { themeEngine, ThemeMode, AccentColor, Theme } from './ThemeEngine'

interface ThemeContextValue {
  theme: Theme
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: AccentColor) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(themeEngine.getTheme())

  const setMode = (mode: ThemeMode) => {
    themeEngine.setMode(mode)
    setTheme(themeEngine.getTheme())
  }

  const setAccent = (accent: AccentColor) => {
    themeEngine.setAccent(accent)
    setTheme(themeEngine.getTheme())
  }

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme.mode === 'auto') {
        setTheme(themeEngine.getTheme())
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme.mode])

  return (
    <ThemeContext.Provider value={{ theme, setMode, setAccent }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
