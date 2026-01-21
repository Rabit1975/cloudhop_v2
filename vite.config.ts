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
        '@kernel': path.resolve(__dirname, './src/kernel'),
        '@core': path.resolve(__dirname, './src/core'),
        '@modules': path.resolve(__dirname, './src/modules'),
        '@ui': path.resolve(__dirname, './src/ui'),
        '@lib': path.resolve(__dirname, './src/lib'),
        '@types': path.resolve(__dirname, './src/types')
      }
    },
    define: {
      'process.env': env
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
