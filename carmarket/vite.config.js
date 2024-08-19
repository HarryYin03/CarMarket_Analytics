import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    base: "/carmarket-analytics/",
  };

  if (command === 'build') {
    // Apply chunking only in production
    config.build = {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-chart': ['chart.js', 'react-chartjs-2'],
          },
        },
      },
    };
  }

  return config;
});
