# @remyyy/vite-plugin-velox

**Vite integration for the Velox Framework**

Enables JSX compilation and HMR for Velox applications.

## Installation

```bash
npm install -D @remyyy/vite-plugin-velox
```

## Usage

Add it to your `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import velox from '@remyyy/vite-plugin-velox';

export default defineConfig({
  plugins: [velox()]
});
```

## Documentation

For full documentation, visit the [main repository](https://github.com/TheRemyyy/velox-framework).
