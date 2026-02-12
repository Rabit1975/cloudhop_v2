import React, { ReactNode, useCallback, useState, CSSProperties } from 'react';
import classNames from 'classnames';
import { mergeTokenSchema } from '@bitdesign/sparks.sparks-theme';
import { CloudrabbitThemeProvider } from './cloudrabbit-theme-provider.js';
import { CloudrabbitThemeSchema } from './cloudrabbit-tokens.js';
import { ThemeContext, ThemeContextValue, ThemeMode } from './theme-controller.js';
import { themeOptions } from './theme-options.js';
import styles from './cloudrabbit-theme.module.scss';

export type CloudrabbitThemeProps = {
  /**
   * a root ReactNode for the component tree 
   * applied with the theme.
   */
  children?: ReactNode;

  /**
   * inject a class name to override to the theme.
   * this allows people to affect your theme. remove to avoid.
   */
  className?: string;

  /**
   * override tokens in the schema
   */
  overrides?: Partial<CloudrabbitThemeSchema>;

  /**
   * preset of the theme.
   */
  initialTheme?: ThemeMode;

  /**
   * style tags to include.
   */
  style?: CSSProperties;
};

/**
 * A theme for the CloudHop platform.
 * It provides tokens, fonts and general styling for all components including nebula effects.
 */
export function CloudrabbitTheme({ children, initialTheme = 'light', overrides, className, style, ...rest }: CloudrabbitThemeProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialTheme);
  const themePreset = themeOptions[themeMode];

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => prevMode === 'light' ? 'dark' : 'light');
  }, []);

  const themeContextValue: ThemeContextValue = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };

  const themeOverrides = mergeTokenSchema(themePreset, overrides);
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CloudrabbitThemeProvider.ThemeProvider
        className={classNames(styles.cloudrabbitTheme, className)}
        overrides={themeOverrides}
        style={style}
        {...rest}
      >
        {children}
      </CloudrabbitThemeProvider.ThemeProvider>
    </ThemeContext.Provider>
  );
}