import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),        // React Fast Refresh
    glsl(),         // Импорт `.glsl` / `.vert` / `.frag`
  ],
  worker: {
    format: 'es',    // Формат ES-модулей для воркеров
    plugins: [],
  },
  build: {
    target: 'esnext',       // Современные браузеры
    minify: 'esbuild',      // Быстрая сборка
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': '/src',          // Удобный alias
    },
  },
  define: {
    'process.env': {},      // Устранение ошибок при использовании env в библиотеках
  },
})
