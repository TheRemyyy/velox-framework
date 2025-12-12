// Just a simple wrapper to configure JSX
// Actually, since Velox uses standard JSX transform compatible with React (but with 'h' factory),
// we just need to tell Vite to use that.
// The user can do this in their vite.config.ts, but a plugin makes it "Professional".

export default function velox() {
  return {
    name: 'vite-plugin-velox',
    config() {
      return {
        esbuild: {
          jsxFactory: 'h',
          jsxFragment: 'Fragment',
          jsxInject: `import { h, Fragment } from 'velox'`
        }
      }
    }
  }
}
