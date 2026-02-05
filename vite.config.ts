import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      historyApiFallback: true,
      hmr: {
        overlay: false, // Reduce CPU usage
      },
      watch: {
        usePolling: false, // Better for external drives
        interval: 1000, // Reduce file watching frequency
        ignored: ['**/node_modules/**', '**/.git/**'], // Ignore heavy folders
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy':
          "frame-ancestors 'self' https://cloudhop.cloud https://*.cloudhop.cloud https://vercel.app https://*.vercel.app",
      },
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@core': path.resolve(__dirname, './src/core'),
        '@modules': path.resolve(__dirname, './src/modules'),
        '@kernel': path.resolve(__dirname, './src/kernel'),
      },
    },
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['framer-motion'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'framer-motion'],
    },
    cacheDir: path.resolve('C:', 'Users', 'rebel', 'AppData', 'Local', 'vite-cache'), // Use local drive for cache
    preview: {
      port: 3000,
    },
  };
});
