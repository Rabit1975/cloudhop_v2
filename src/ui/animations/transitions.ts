// Animation utility functions and constants

export const transitions = {
  // Duration presets
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms'
  },

  // Easing functions
  easing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },

  // Common transition combinations
  fadeIn: 'opacity 300ms ease-in-out',
  fadeOut: 'opacity 300ms ease-in-out',
  slideIn: 'transform 300ms ease-out',
  slideOut: 'transform 300ms ease-in',
  scale: 'transform 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Micro-animations
  ripple: 'transform 600ms ease-out, opacity 600ms ease-out',
  bounce: 'transform 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  pulse: 'transform 1s ease-in-out infinite alternate'
}

// Keyframe animations
export const keyframes = {
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  
  slideInRight: `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  slideInLeft: `
    @keyframes slideInLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  
  pulse: `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.8; }
    }
  `,
  
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `
}

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideIn: {
    from: { transform: 'translateY(-20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  scaleIn: {
    from: { transform: 'scale(0.9)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 }
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.5 }
  }
}

export const easings = {
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
}

// Helper functions
export function animate(
  element: HTMLElement,
  animation: string,
  duration: string = transitions.duration.normal
) {
  element.style.animation = `${animation} ${duration} ${transitions.easing.easeInOut}`
}

export function transition(
  element: HTMLElement,
  property: string,
  duration: string = transitions.duration.normal,
  easing: string = transitions.easing.easeInOut
) {
  element.style.transition = `${property} ${duration} ${easing}`
}

// Prefers reduced motion check
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Apply animation only if user hasn't requested reduced motion
export function safeAnimate(
  element: HTMLElement,
  animation: string,
  duration: string = transitions.duration.normal
) {
  if (!prefersReducedMotion()) {
    animate(element, animation, duration)
  }
}
