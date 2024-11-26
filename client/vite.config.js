import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Backend server URL
        changeOrigin: true,               // Ensures the host header is changed to match the target
        secure: false,                    // If using https on localhost, set this to false
      },
    },
  },
})
