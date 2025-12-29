import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import viteCompression from 'vite-plugin-compression'
import { webfontDl } from 'vite-plugin-webfont-dl'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cssInjectedByJsPlugin(),
    viteCompression(),
    webfontDl(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: undefined, // Let Vite handle it with dynamic imports
      },
    },
  },
})
