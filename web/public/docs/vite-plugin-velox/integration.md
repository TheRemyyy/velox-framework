# Vite Integration

`@remyyy/vite-plugin-velox` is a lightweight plugin that bridges the gap between the Velox runtime and the Vite build tool.

## Installation

The plugin is a development dependency and should be installed as such:

```bash
npm install -D @remyyy/vite-plugin-velox
```

## Configuration

The plugin is designed for zero configuration. Simply add it to your `vite.config.ts` or `vite.config.js`:

```typescript
import { defineConfig } from 'vite';
import velox from '@remyyy/vite-plugin-velox';

export default defineConfig({
  plugins: [velox()]
});
```

## Plugin behavior

The plugin hooks into the `config` hook of Vite to inject the following ESBuild settings:

- **jsx**: Set to `automatic` to enable the modern JSX transformation.
- **jsxImportSource**: Set to `@remyyy/velox`, directing ESBuild to find the JSX runtime within the core framework package.

## Requirements

- **Vite**: Compatible with Vite version 6.0.0 and above.
- **Velox**: Requires `@remyyy/velox` to be available in the project's dependencies to resolve the JSX runtime.
