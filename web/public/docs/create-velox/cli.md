# CLI Reference

The `@remyyy/create-velox` package provides a command-line interface for rapidly scaffolding new projects.

## Commands

### Initialization

The primary use case is through the `init` command, typically invoked via `npm create`.

```bash
npm create @remyyy/velox@latest [project-name]
```

## Arguments and Flags

- `[project-name]`: An optional positional argument to specify the target directory. If not provided, the CLI will default to `@remyyy/velox-project` or prompt for a name.
- `--overwrite`: A flag to bypass the prompt and automatically delete existing files in the target directory.

## Interactive Prompts

When run without the `--overwrite` flag or when the target directory already exists, the CLI will guide you through:

1. **Project Name**: The name of your new project.
2. **Overwrite Confirmation**: Triggered if the target directory is not empty.
3. **Variant Selection**: A choice between the official Vanilla TypeScript or Vanilla JavaScript templates.

## Lifecycle Details

The initialization process follows these steps:

1. **Context Resolution**: Determines the target directory based on input and current working directory.
2. **Directory Preparation**: Ensures the target directory exists and is prepared for template injection.
3. **Recursive Copying**: Copies all files from the selected template, including nested directories.
4. **Configuration Renaming**: Standard files like `_gitignore` are renamed to `.gitignore` during injection to avoid issues with standard Git workflows.
5. **Manifest Transformation**: The `package.json` in the template is read and updated with the provided project name before being written to the destination.
