import { defineConfig } from 'vite'
import velox from '@remyyy/vite-plugin-velox'
import compression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        velox(),
        compression({ algorithm: 'gzip' })
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
                manualChunks: {
                    vendor: ['@remyyy/velox'],
                },
            },
        },
    },
})
