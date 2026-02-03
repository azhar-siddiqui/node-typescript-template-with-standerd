# Contributing Guidelines

## Commit Messages

This project uses [Conventional Commits](https://conventionalcommits.org/) for commit messages. This ensures a consistent and readable commit history.

### Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples

```
feat: add user authentication
fix: resolve login issue with empty passwords
docs: update README with setup instructions
```

### Using Commitizen

To ensure proper commit messages, use the interactive commit tool:

```bash
pnpm run commit
```

This will guide you through creating a conventional commit message.

## Branching Strategy

This project follows a simplified Git Flow branching strategy.

### Main Branches

- **main**: Production-ready code
- **develop**: Latest development changes

### Supporting Branches

- **feature/**: For new features
  - Branch from: `develop`
  - Merge back to: `develop`
  - Naming: `feature/description-of-feature`

- **bugfix/**: For bug fixes
  - Branch from: `develop`
  - Merge back to: `develop` and `main`
  - Naming: `bugfix/description-of-bug`

- **hotfix/**: For critical fixes in production
  - Branch from: `main`
  - Merge back to: `main` and `develop`
  - Naming: `hotfix/description-of-fix`

- **release/**: For preparing releases
  - Branch from: `develop`
  - Merge back to: `main` and `develop`
  - Naming: `release/v1.2.3`

### Workflow

1. Create a feature branch from `develop`
2. Make commits using conventional commit format
3. Push the branch and create a pull request to `develop`
4. After review and merge, the feature is ready for release
5. When ready for release, create a release branch from `develop`
6. Test and finalize the release
7. Merge release branch to `main` and tag the release
8. Merge release branch back to `develop`

### Pull Requests

- Use descriptive titles following conventional commit format
- Provide detailed description of changes
- Ensure all tests pass
- Get at least one approval before merging
