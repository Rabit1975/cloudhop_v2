import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { CloudrabbitThemeSchema, cloudrabbitTokens } from './cloudrabbit-tokens.js';

/**
 * creating and declaring the Cloudrabbit theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const CloudrabbitThemeProvider = createTheme<CloudrabbitThemeSchema>({
  tokens: cloudrabbitTokens,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = CloudrabbitThemeProvider;