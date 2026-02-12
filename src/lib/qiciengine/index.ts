// QICI Engine Integration for CloudHop
// HTML5 Game Engine Library based on Phaser

// Version Info
export const QICI_VERSION = '1.1.6';

// Game Engine Configuration
export const QICI_CONFIG = {
  // Game canvas settings
  canvas: {
    width: 800,
    height: 600,
    scaleMode: 'SHOW_ALL',
    backgroundColor: '#0a0a0a'
  },
  
  // Physics settings
  physics: {
    enabled: true,
    gravity: { x: 0, y: 980 }
  },
  
  // Audio settings
  audio: {
    enabled: true,
    volume: 0.8
  }
};

// Initialize QICI Engine
export function initializeQICI(containerId: string, config?: Partial<typeof QICI_CONFIG>) {
  const gameConfig = { ...QICI_CONFIG, ...config };
  
  // Return configuration for manual initialization
  return {
    container: containerId,
    ...gameConfig,
    scripts: [
      '/src/lib/qiciengine/lib/qc-core.js',
      '/src/lib/qiciengine/lib/phaser.js',
      '/src/lib/qiciengine/lib/qc-widget.js',
      '/src/lib/qiciengine/lib/qc-loading.js'
    ]
  };
}

// Dynamic import helper for QICI Engine
export async function loadQICIEngine() {
  // Load QICI Engine scripts dynamically
  const scripts = [
    'src/lib/qiciengine/lib/qc-core.js',
    'src/lib/qiciengine/lib/phaser.js',
    'src/lib/qiciengine/lib/qc-widget.js',
    'src/lib/qiciengine/lib/qc-loading.js'
  ];

  for (const script of scripts) {
    await loadScript(script);
  }
}

// Helper function to load scripts
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
