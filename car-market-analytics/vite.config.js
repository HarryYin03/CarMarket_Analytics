import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
<<<<<<< HEAD
  base: '/car-market-analytics/', // Specify the base URL for your application
  
=======
  base: '/car-market-analytics/',
>>>>>>> 8b2bd9e191947e492b9ddb90b2b5f29a38bbc565
  plugins: [react()],
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom', 'react-router-dom'],
          'chart-js': ['chart.js']
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase the chunk size warning limit
  }
});
