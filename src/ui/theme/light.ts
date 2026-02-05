import { tokens } from './tokens'

// Light theme (default)
export const lightTheme = {
  ...tokens,
  colors: {
    ...tokens.colors,
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      muted: '#adb5bd'
    },
    background: {
      primary: '#ffffff',
      secondary: '#f5f5f5',
      tertiary: '#e9ecef'
    }
  }
}
