import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/car-market-analytics/', // Specify the base URL for your application
  
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
