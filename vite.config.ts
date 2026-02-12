import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const isDev = mode === 'development';
  
  return {
    server: {
      port: 3000,
      host: true, // Allow all interfaces
      historyApiFallback: true,
      hmr: {
        overlay: false, // Reduce CPU usage
      },
      watch: {
        usePolling: false, // Better for external drives
        interval: 1000, // Reduce file watching frequency
        ignored: ['**/node_modules/**', '**/.git/**'], // Ignore heavy folders
      },
      headers: isDev ? {
        // Development: Relaxed headers for easy development
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'X-Frame-Options': 'ALLOWALL',
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://*.supabase.co https://img.youtube.com https://i.ytimg.com https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.builder.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.supabase.co https://img.youtube.com https://i.ytimg.com https://cdn.builder.io; connect-src 'self' https://*.supabase.co https://youtube.googleapis.com https://accounts.google.com ws://127.0.0.1:*"
      } : {
        // Production: Strict security headers with proper CSP
        'Access-Control-Allow-Origin': 'https://cloudhop.cloud https://*.cloudhop.cloud https://vercel.app https://*.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        'Content-Security-Policy': "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https://*.supabase.co https://img.youtube.com https://i.ytimg.com https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.builder.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://*.supabase.co https://img.youtube.com https://i.ytimg.com https://cdn.builder.io; connect-src 'self' https://*.supabase.co https://youtube.googleapis.com https://accounts.google.com ws://127.0.0.1:*"
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
