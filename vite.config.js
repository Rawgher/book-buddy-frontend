import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'/',
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", 
    setupFiles: "./src/setupTests.js", 
  },
  server: {
    open: true,
    hmr: true,
  }
})
