import type { Plugin } from 'vite';

export default function velox(): Plugin {
  return {
    name: 'vite-plugin-velox',
    config() {
      return {
        esbuild: {
          jsx: 'automatic',
          jsxImportSource: '@remyyy/velox'
        }
      };
    }
  };
}
