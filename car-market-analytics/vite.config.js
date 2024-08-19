import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/carmarket_analytics/',  // Ensure this matches your deployment base
  plugins: [react()],
  
d: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['chart.js', 'react-chartjs-2'],
          // Add more manual chunks as necessary based on your project needs
        },
      },
    },
  },
});
