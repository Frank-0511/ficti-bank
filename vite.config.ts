import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { warmup } from 'vite-plugin-warmup';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    warmup({
      clientFiles: ['./src/main.tsx', './src/App.tsx'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@dashboard': path.resolve(__dirname, './src/features/dashboard'),
      '@clients': path.resolve(__dirname, './src/features/dashboard/features/clients'),
    },
  },
  optimizeDeps: {
    include: [
      'axios',
      'msw',
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/form',
      '@mantine/dates',
      '@mantine/notifications',
      '@mantine/modals',
      '@tabler/icons-react',
      '@tanstack/react-query',
      'mantine-react-table',
      'dayjs',
      'zod',
      'zustand',
    ],
  },
  server: {
    port: 3000,
  },
});
