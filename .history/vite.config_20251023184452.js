import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/VIAKADATA/',        // 👈 nom EXACT du repo
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: { usePolling: true },
  },
})
