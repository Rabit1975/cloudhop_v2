import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@core': path.resolve(__dirname, './src/core'),
        '@modules': path.resolve(__dirname, './src/modules'),
        '@kernel': path.resolve(__dirname, './src/kernel')
      }
    },
    define: {
      // Only expose VITE_ prefixed env vars for security
      'import.meta.env': Object.keys(env)
        .filter(key => key.startsWith('VITE_'))
        .reduce((acc, key) => {
          acc[key] = env[key];
          return acc;
        }, {} as Record<string, string>)
    },
    server: {
      port: 5173,
      strictPort: true
    },
    build: {
      outDir: 'dist'
    }
  }
})
