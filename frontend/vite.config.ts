import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Preserved so Plai styling remains intact!
    nodePolyfills({
      include: ['buffer', 'process'],
      globals: {
        Buffer: true,
        global: false,
        process: true,
      },
    }),
  ],
  define: {
    global: 'globalThis',
  },
})
