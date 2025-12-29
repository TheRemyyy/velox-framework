# Integration and Setup

`@remyyy/vite-plugin-velox` provides first-class support for the Velox framework within the Vite ecosystem.

## Installation

```bash
npm install -D @remyyy/vite-plugin-velox
```

## Basic Configuration

The plugin is designed to work with zero configuration in most environments.

```typescript
import { defineConfig } from 'vite';
import velox from '@remyyy/vite-plugin-velox';

export default defineConfig({
  plugins: [velox()]
});
```

## What the Plugin Does

1. **JSX Runtime Setup**: It automatically configures the ESBuild `jsx` option to `automatic` and sets the `jsxImportSource` to `@remyyy/velox`. This means you don't need to import `h` in every file.
2. **Environment Consistency**: Ensures that the reactive runtime behaves identically across development and production builds.
3. **Optimization**: Coordinates with the Velox core to ensure that JSX is compiled to the most efficient DOM operations possible.

## Peer Dependencies

The plugin requires `vite` as a peer dependency:

- `vite`: ^6.0.0
