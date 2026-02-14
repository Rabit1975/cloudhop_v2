/**
 * Cloudrabbit tokens theme.
 * Include all tokens in this object.
 */
export function cloudrabbitTokens() {
  const tokens = {
    /**
     * Color Palette
     */
    colors: {
      primary: {
        default: '#6C63FF', // Vibrant Purple/Blue for "Hop" energy
        hover: '#5A52D5',
        active: '#483FB1',
        contrast: '#FFFFFF',
      },
      secondary: {
        default: '#00D4FF', // Cyan accent
        hover: '#00B8DE',
        active: '#009CBD',
        contrast: '#000000',
      },
      surface: {
        background: '#F9FAFB', // Light airy background
        primary: '#FFFFFF',
        secondary: '#F3F4F6',
        tertiary: '#E5E7EB',
        nebula: '#F0F2F5', // Subtle nebula base for light mode
      },
      text: {
        primary: '#111827',
        default: '#374151',
        secondary: '#6B7280',
        inverse: '#FFFFFF',
        link: '#6C63FF',
      },
      status: {
        positive: { default: '#10B981', subtle: '#D1FAE5' },
        negative: { default: '#EF4444', subtle: '#FEE2E2' },
        warning: { default: '#F59E0B', subtle: '#FEF3C7' },
        info: { default: '#3B82F6', subtle: '#DBEAFE' },
      },
      border: {
        default: '#E5E7EB',
        subtle: '#F3F4F6',
        strong: '#D1D5DB',
      },
      overlay: 'rgba(17, 24, 39, 0.4)',
    },

    borders: {
      default: {
        color: '#E5E7EB',
        width: '1px',
        style: 'solid',
      },
      focus: {
        color: '#6C63FF',
        width: '2px',
        style: 'solid',
        offset: '2px', 
      },
      radius: {
        small: '4px',
        medium: '8px',
        large: '12px',
        xl: '16px',
        full: '9999px',
      },
    },

    /**
     * Typography System
     */
    typography: {
      fontFamily: "'Inter', 'Space Grotesk', sans-serif, Arial",
      sizes: {
        display: { large: '64px', medium: '56px', small: '48px' },
        heading: {
          h1: '36px',
          h2: '30px',
          h3: '24px',
          h4: '20px',
          h5: '18px',
          h6: '16px',
        },
        body: { large: '18px', medium: '16px', default: '16px', small: '14px' },
        caption: { default: '12px', medium: '11px' },
      },
      lineHeight: {
        base: '1.5',
        heading: '1.25',
        tight: '1.1',
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
      },
    },

    /**
     * Spacing & Layout
     */
    spacing: {
      none: '0px',
      xs: '4px',
      small: '8px',
      medium: '16px',
      large: '24px',
      xl: '32px',
      xxl: '48px',
      xxxl: '64px',
    },

    layout: {
      maxPageWidth: '1440px',
      gutter: '24px',
      sidebarWidth: '280px',
      headerHeight: '64px',
    },

    /**
     * Visual Effects
     */
    effects: {
      shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        small: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        glow: '0 0 15px rgba(108, 99, 255, 0.5)',
      },
      opacity: { disabled: '0.4', hover: '0.9', active: '1' },
      gradients: {
        primary: 'linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)',
        nebula: 'none', // Light mode default usually none or subtle
        surface: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
      },
      blur: {
        small: 'blur(4px)',
        medium: 'blur(8px)',
        large: 'blur(16px)',
        backdrop: 'blur(12px)',
      },
    },    

    /**
     * Interaction & Motion
     */
    interactions: {
      cursor: { pointer: 'pointer', disabled: 'not-allowed', default: 'default' },
      zIndex: { base: '0', dropdown: '1000', sticky: '1100', fixed: '1200', modal: '1300', tooltip: '1400', popover: '1500' },
      transitions: {
        duration: { fast: '150ms', medium: '300ms', slow: '500ms' },
        easing: {
          default: 'cubic-bezier(0.4, 0, 0.2, 1)',
          linear: 'linear',
          in: 'cubic-bezier(0.4, 0, 1, 1)',
          out: 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
    },
  };

  return tokens;
}

export type CloudrabbitThemeSchema = ReturnType<typeof cloudrabbitTokens>;