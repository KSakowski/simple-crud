import { defineConfig } from 'vite'
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
