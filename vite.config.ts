import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: [
      'https://devserver-main--my-perfect-fit.netlify.app'
    ]
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom') || id.includes('react-dom')) {
              return 'vendor_router';
            }
            if (id.includes('react')) {
              return 'vendor_react';
            }
            if (
              id.includes('@hookform') ||
              id.includes('zod') ||
              id.includes('@emailjs') ||
              id.includes('react-phone-number-input') ||
              id.includes('lucide-react') ||
              id.includes('tailwind-merge')
            ) {
              return 'vendor_forms';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})


