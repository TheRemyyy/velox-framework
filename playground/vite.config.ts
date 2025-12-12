import { defineConfig } from 'vite';
import velox from 'vite-plugin-velox';
import { resolve } from 'path';

export default defineConfig({
  plugins: [velox()],
  resolve: {
    alias: {
      'velox/jsx-runtime': resolve(__dirname, '../packages/velox/src/jsx-runtime.ts'),
      'velox': resolve(__dirname, '../packages/velox/src/index.ts'),
    }
  }
});
