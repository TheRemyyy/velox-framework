import type { Plugin } from 'vite';

export default function velox(): Plugin {
  return {
    name: 'vite-plugin-velox',
    config() {
      return {
        esbuild: {
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
          jsxInject: `import { h, Fragment } from 'velox'`
        }
      };
    }
  };
}
