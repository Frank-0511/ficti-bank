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
    include: ['axios', 'msw', 'dayjs', 'zod', 'zustand'],
  },
  server: {
    port: 3000,
  },
  build: {
    // ⚡ Minificación super rápida y eficiente
    minify: 'esbuild',
    // ⚡ Más rápido parsing para navegadores modernos
    target: 'esnext',
    // 📦 Elimina mapas de fuente en producción
    sourcemap: false,
    // 📁 Salida optimizada
    outDir: 'dist',
    // ✂️ Activa el CSS extractor moderno
    cssMinify: 'lightningcss',
    // 📦 Code splitting manual p/ Mantine + MRT + React Query
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mantine: [
            '@mantine/core',
            '@mantine/hooks',
            '@mantine/dates',
            '@mantine/notifications',
            '@mantine/modals',
          ],
          mrt: ['mantine-react-table'],
          query: ['@tanstack/react-query'],
        },
      },
    },
    // ⚙️ Cache-friendliness
    assetsInlineLimit: 0, // nada embed como base64
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      cssModules: true,
    },
  },
});
