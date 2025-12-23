<div align="center">

# Contributing to Velox

**Help us build the fastest framework in the universe**

</div>

---

## Introduction

Thank you for your interest in contributing to Velox! We welcome contributions from everyone, whether it's fixing a bug, improving documentation, or proposing new features.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork locally.
3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Create a branch** for your feature or fix.

## Development Workflow

Velox is a **monorepo** managed by npm workspaces.

- **`packages/velox`**: The core framework.
- **`packages/vite-plugin-velox`**: Vite integration plugin.
- **`packages/create-velox`**: CLI scaffolding tool.

### Building

To build all packages:

```bash
npm run build
```

### Testing

To run tests:

```bash
npm run test
```

## Pull Requests

1. Ensure all tests pass.
2. Update documentation if necessary.
3. Submit a Pull Request to the `main` branch.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

---

<div align="center">
<sub>Built with ❤️ and TypeScript</sub>
</div>
