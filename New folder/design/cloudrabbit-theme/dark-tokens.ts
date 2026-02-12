import { DeepPartial } from '@bitdesign/sparks.sparks-theme';
import { CloudrabbitThemeSchema } from "./cloudrabbit-tokens.js";

/**
 * override tokens for the dark theme.
 * overrides the default light theme tokens.
 */
export const darkThemeSchema: DeepPartial<CloudrabbitThemeSchema> = {
  colors: {
    primary: {
      default: '#818CF8', // Lighter purple for dark mode
      hover: '#A5B4FC',
      active: '#6366F1',
      contrast: '#FFFFFF',
    },
    secondary: {
      default: '#22D3EE', // Bright cyan for dark mode
      hover: '#67E8F9',
      active: '#06B6D4',
      contrast: '#000000',
    },
    surface: {
      background: '#0F172A', // Deep space blue/black
      primary: '#1E293B',
      secondary: '#334155',
      tertiary: '#475569',
      nebula: '#1E1B4B', // Deep indigo for nebula feel
    },
    text: {
      primary: '#F9FAFB',
      default: '#F3F4F6',
      secondary: '#9CA3AF',
      inverse: '#111827',
      link: '#818CF8',
    },
    status: {
      positive: { default: '#34D399', subtle: '#064E3B' },
      negative: { default: '#F87171', subtle: '#7F1D1D' },
      warning: { default: '#FBBF24', subtle: '#78350F' },
      info: { default: '#60A5FA', subtle: '#1E3A8A' },
    },
    border: {
      default: '#374155',
      subtle: '#1E293B',
      strong: '#475569',
    },
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  effects: {
    gradients: {
      // Nebula effect: Deep cosmic gradient
      nebula: 'radial-gradient(circle at 15% 50%, rgba(76, 29, 149, 0.25), transparent 25%), radial-gradient(circle at 85% 30%, rgba(14, 165, 233, 0.15), transparent 25%)',
      surface: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
    }
  }
};