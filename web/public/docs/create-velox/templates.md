# Template Anatomy

Velox templates are designed to be production-ready from the start, providing a professional slate for modern web applications.

## Official Variants

### Vanilla TypeScript

The recommended starting point for robust applications.

- **Strict Typing**: Full end-to-end type safety for props, signals, and routing.
- **IDE Support**: Autocompletion and real-time error checking for the entire Velox API.
- **Scalability**: Better suited for larger codebases and team environments.

### Vanilla JavaScript

A lightweight, zero-compilation-step alternative.

- **Simplicity**: Direct usage of JavaScript without the need for type definitions.
- **Portability**: Easier to integrate into existing JS-only build pipelines.

## Folder Structure

A standard Velox template consists of:

- `src/`: The core application code.
  - `main.ts` / `main.js`: The client-side entry point that invokes `mount` or `hydrate`.
  - `App.tsx` / `App.jsx`: The root component of your application hierarchy.
  - `style.css`: Global design tokens and layout styles (Midnight Slate theme).
  - `components/`: Modular UI components like Headers, Cards, and Navigation.
- `public/`: Static assets that are copied to the build output.
- `vite.config.ts`: Configuration for the Vite build system and `@remyyy/vite-plugin-velox`.

## Built-in Optimizations

Templates are pre-configured with several build-time optimizations:

1. **Code Minification**: Uses Terser for aggressive dead-code elimination and minification.
2. **Asset Compression**: Automatically generates Gzip versions of your assets for faster serving.
3. **Cache Management**: Builds are outputted to a clean directory to prevent stale artifact accumulation.
4. **SEO Essentials**: Root HTML files include standard meta tags and semantic structures.
