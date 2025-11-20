# Contributing to NEXUS

[![English](https://img.shields.io/badge/lang-English-blue?style=flat-square)](./CONTRIBUTING.md) [![Tiếng Việt](https://img.shields.io/badge/lang-Tiếng_Việt-red?style=flat-square)](./docs/archive/CONTRIBUTING.vn.md)

Thank you for your interest in contributing to NEXUS! We welcome contributions from everyone.

## 🐛 How to Report Bugs

1. **Check existing issues** - Search [GitHub Issues](https://github.com/hey-im-edward/NEXUS/issues) to see if the bug has already been reported
2. **Create a new issue** - If not found, [open a new issue](https://github.com/hey-im-edward/NEXUS/issues/new)
3. **Provide details:**
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment (browser, OS, device)

## 💡 How to Suggest Features

1. **Check existing discussions** - Browse [GitHub Discussions](https://github.com/hey-im-edward/NEXUS/discussions)
2. **Start a new discussion** - Explain your idea and use case
3. **Wait for feedback** - The maintainers will review and discuss

## 💻 How to Contribute Code

### Prerequisites

- Node.js 18+
- Git
- Supabase account (for backend features)

### Development Setup

1. **Fork the repository** - Click "Fork" on GitHub

2. **Clone your fork:**

   ```bash
   git clone https://github.com/YOUR_USERNAME/NEXUS.git
   cd NEXUS
   ```

3. **Create a branch:**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

5. **Set up environment variables:**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

### Making Changes

1. **Make your changes** - Edit the code
2. **Test your changes** - Ensure everything works
3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

**Examples:**

```bash
git commit -m "feat: add drag-and-drop for dashboard grid"
git commit -m "fix: resolve task deletion bug"
git commit -m "docs: update README installation steps"
```

### Submitting a Pull Request

1. **Push to your fork:**

   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request:**

   - Go to the original NEXUS repository
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

3. **Wait for review:**
   - Maintainers will review your PR
   - Address any feedback
   - Once approved, it will be merged!

## 📖 How to Improve Documentation

- Fix typos or unclear explanations
- Add examples or use cases
- Translate documentation to other languages
- Update outdated information

Documentation PRs are welcome and appreciated!

## ✨ Code Style Guidelines

- **TypeScript:** Use strict mode, avoid `any` types
- **Formatting:** Prettier will auto-format on save
- **Naming:**
  - Components: PascalCase (`DashboardGrid.tsx`)
  - Functions: camelCase (`fetchTasks`)
  - Constants: UPPER_SNAKE_CASE (`MAX_TASKS`)
- **File structure:**
  ```
  components/
    feature-name/
      ComponentName.tsx
      index.ts
  ```

## 🤝 Code of Conduct

Be respectful, inclusive, and collaborative. We're all here to build something great together.

## ❓ Questions?

If you have questions:

- Join [GitHub Discussions](https://github.com/hey-im-edward/NEXUS/discussions)
- Check the [Roadmap](./docs/02-EXECUTION/ROADMAP.md)
- Read the [Tech Stack docs](./docs/03-REFERENCE/TECH_STACK.md)

---

**Thank you for contributing to NEXUS!** 🚀
