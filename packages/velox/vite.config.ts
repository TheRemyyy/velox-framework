import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: {
        velox: resolve(__dirname, 'src/index.ts'),
        'jsx-runtime': resolve(__dirname, 'src/jsx-runtime.ts')
      },
      name: 'Velox',
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [],
    },
  },
  plugins: [
    dts({ rollupTypes: true })
  ],
});
