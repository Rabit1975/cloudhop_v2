import { tokens } from './tokens'

// Dark theme overrides
export const darkTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    text: {
      primary: '#f8f9fa',
      secondary: '#adb5bd',
      muted: '#6c757d'
    },
    background: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      tertiary: '#3a3a3a'
    }
  }
}
