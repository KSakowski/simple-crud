import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    exclude: ['node_modules', 'dist'],
  },
  server: {
    host: true,
    watch: {
      usePolling: !!process.env.VITE_USE_POLLING,
    },
    proxy: {
      '/api': process.env.VITE_API_PROXY || 'http://localhost:8080',
    },
  },
})
