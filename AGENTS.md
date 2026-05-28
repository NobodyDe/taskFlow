# Taskflow — AGENTS.md

## Tech Stack

- **Framework:** React 19 + TypeScript 6 (strict mode)
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite` plugin) + `tailwind-variants`
- **State:** Zustand v5 (client state), TanStack React Query v5 (server state)
- **Routing:** React Router v7 (`createBrowserRouter`)
- **HTTP:** Axios (interceptors for auth token / refresh)
- **Icons:** Lucide React
- **Formatting:** Prettier, **no semicolons**, single quotes
- **Linting:** ESLint flat config with `typescript-eslint`

## Build / Lint / Format Commands

```bash
npm run dev        # Start Vite dev server
npm run build      # Type-check + production build (tsc && vite build)
npm run lint       # ESLint check (entire project)
npm run format     # Prettier format (entire project)
npm run preview    # Preview production build
```

There are **no tests** in this project (no test runner configured).

## Project Structure

```
src/
  api/               # Axios instance + service classes
    axios.ts         # Instance with request/response interceptors
    services/        # AuthService, projectService, userService
  components/
    auth/            # AuthProvider, LoadingScreen
    common/          # ButtonContinue, InputElement, PasswordInput
    kanban/          # Board, ProjectsBoard, Sidebar, UserAvatar
    login/           # LoginPage, RegisterPage, Brand
    modal/           # CardDetailModal, CreateCardModal, CreateColumnModal, DeleteConfirmModal
    skeleton/        # AvatarSkeleton
    ui/              # Card, Column, Header, Comments, Activity, etc.
  hooks/
    mutation/        # useAuthMutation (useCheckEmail, useLogin)
    queries/         # useProjects, useUser
  stores/            # useAuthStore, useBoardStore, useSidebarStore (Zustand)
  types/             # CardProps, Project, priority, User, initialColumnProps
  App.tsx            # Root layout component
  main.tsx           # Entry point (router, providers)
  style.css          # Tailwind imports + custom theme tokens
```

## Code Style Guidelines

### Imports

- **No semicolons** at end of lines.
- Single quotes for all import paths.
- Use `type` keyword for type-only imports: `import type { Foo } from './bar'`.
- Group imports: React → third-party → local (no blank line separation).
- Destructure icons from `lucide-react` as named imports.
- Prefer default export for the **primary** component in a file; named exports for secondary ones.

### Formatting (Prettier enforced)

- `semi: false` — no semicolons
- `singleQuote: true`
- `tabWidth: 2`
- `trailingComma: 'es5'`
- `printWidth: 100`

### TypeScript

- `verbatimModuleSyntax: true` — must use `import type` for type-only imports.
- `noUnusedLocals` / `noUnusedParameters` — no unused vars allowed.
- Explicit `interface` over `type` for object shapes.
- Prefer inline type annotations for function parameters rather than standalone type aliases when the type is simple.
- Use `ReactNode` from React for children typings: `import { type ReactNode } from 'react'`.
- ESLint rules: `no-unused-vars` off, `no-explicit-any` off (permissive config).

### Component Patterns

- Prefer `export default function ComponentName({ ... }: Props)` — function declarations, no arrow functions.
- Props interface named `ComponentNameProps` (or inline destructured).
- One component per file (exceptions: small helpers colocated like `EmailPage` + `PasswordPage` in `LoginPage.tsx`).
- Local state with `useState`, server state with React Query, global state with Zustand.
- **No comments** in code unless absolutely necessary for complex logic (project convention).
- Use `className` with Tailwind exclusively — no CSS modules or styled-components.

### Styling

- Tailwind CSS v4 with `@theme` directive in `style.css` for custom tokens.
- Custom colors: `background` (oklch(0.145 0 0)), `secondary` (#0d0d0d), `foreground` (#fff), `border` (#1e1e1e), `hover` (#1a1a1a).
- Use `tailwind-variants` (`tv()`) for reusable variant-based classes (see `typograph.ts`).
- Prefer inline `style={{}}` for dynamic colors/props that can't be expressed with Tailwind classes.
- Hex colors in strings with lowercase (e.g. `#ff3b30`).

### API Layer

- **Axios instance** in `src/api/axios.ts` with `withCredentials: true`.
- **Request interceptor** attaches `Authorization: Bearer <token>` from Zustand store.
- **Response interceptor** handles 401 auto-refresh (excludes `/auth/login`, `/auth/check-email`, `/auth/refresh`).
- **Service classes** use `static` methods (e.g. `AuthService.refreshToken()`).
- **Object services** for non-auth APIs (e.g. `projectService.getProjects()`).

### React Query

- Queries in `src/hooks/queries/` — custom hooks wrapping `useQuery`.
- Mutations in `src/hooks/mutation/` — custom hooks wrapping `useMutation`.
- Use `staleTime: 1000 * 60 * 10` (10 min) for data that rarely changes.
- Prefer `onSuccess` / `onError` callbacks in mutation hooks for side effects.

### State Management (Zustand)

- Stores in `src/stores/` using `create<Interface>()((set) => ({ ... }))`.
- **Board store** uses a Redux-style `dispatch(action)` pattern for complex state transitions.
- Access store inside interceptors via `useAuthStore.getState()` (not the hook).

### Error Handling

- API calls wrapped in try/catch in services.
- Mutation errors handled via `onError` callback in the consuming component.
- No global error boundaries currently implemented.
- `console.log` allowed but triggers ESLint `no-console` warning.

### Naming Conventions

- **Files:** `PascalCase.tsx` for components, `camelCase.ts` for hooks/services/stores.
- **Functions:** `camelCase` for utilities, `PascalCase` for components.
- **Interfaces:** `PascalCase` (e.g. `CardProps`, `AuthState`).
- **Types:** `PascalCase` (e.g. `Priority`, `BoardAction`).
- **CSS classes:** Tailwind utility classes only (no custom class names in project files).

### Routing

- React Router v7 with `createBrowserRouter`.
- `ProtectedRoute` wrapper checks `isAuthenticated` from auth store.
- Path `'/Login'` (capital L) for login page; `'/'` for main app.

## Common Gotchas

- `AuthProvider` wraps `RouterProvider` — the router is inside the auth context, so any navigation must happen inside providers.
- The axios refresh interceptor explicitly excludes `/auth/refresh` from retry logic to prevent infinite loops.
- When adding Tailwind classes, make sure they exist in the v4 default theme or are defined in `@theme` in `style.css`.
