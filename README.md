# Kystack

My personal go-to stack for frontend web development 🫡

## Key Components

- [Rsbuild](https://rsbuild.dev/) - Rust-powered build tool for enhanced performance
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Biome](https://biomejs.dev/) - Fast, modern linter and formatter
- [TanStack Router](https://tanstack.com/router/latest) - Type-safe, file-based routing
- [Zustand](https://zustand-demo.pmnd.rs/) - Lightweight state management
- [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) - UI styling

### Supporting Tools

* [react-helmet-async](https://github.com/staylor/react-helmet-async) - Document head manager for React
* [lefthook](https://github.com/evilmartians/lefthook) - Git hooks manager

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm

If you don't have pnpm installed, you can install it using npm:

```bash
npm install -g pnpm
```

### Setting up the project

1. Clone the repository:

   ```bash
   git clone https://github.com/Kyziq/kystack
   cd kystack
   ```
2. Install dependencies:

   ```bash
   pnpm install
   ```
3. Initialize Lefthook:

   ```bash
   pnpm lefthook install
   ```

### Available Scripts

- `pnpm dev`: Starts the development server with hot-reloading
- `pnpm build`: Builds the project for production
- `pnpm preview`: Serves the production build locally
- `pnpm format`: Formats the code using Biome
- `pnpm lint`: Lints the code using Biome
- `pnpm check`: Checks the code using Biome

## Package Manager

Currently using [pnpm](https://pnpm.io/). Will switch to [Bun](https://bun.sh/) when officially supported.

> **Note:** Tracking Bun support for Rsbuild via [GitHub Issue #11628](https://github.com/oven-sh/bun/issues/11628)

## Installing shadcn/ui

shadcn/ui CLI doesn't support Rspack yet. Therefore, need to manually install shadcn/ui and the components.

> **Note:** Tracking for Rsbuild support via [GitHub Issue #4756](https://github.com/shadcn-ui/ui/issues/4756)
