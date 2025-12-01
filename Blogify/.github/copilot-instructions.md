# Blogify Codebase Guide for AI Agents

## Project Overview
Blogify is a Next.js 16 blog application with mock data, built with React 19, TypeScript 5.9, and Tailwind CSS v4. It demonstrates App Router patterns with API routes and client-side fetching.

**Key Tech Stack:** Next.js 16.0.1 (App Router) | React 19.2.0 | TypeScript 5.9.3 | Tailwind CSS v4.1.17 | Yarn

## Architecture & Data Flow

### Component Hierarchy
```
RootLayout (app/layout.tsx)
├── Home page (app/page.tsx) [uses client]
│   ├── StyledHeader
│   └── StyledBlogCard[] (fetched from /api/posts)
├── Create page (app/create/page.tsx)
└── Post detail (app/posts/[id]/page.tsx)
```

### Data Layer
- **Source:** Mock data in `lib/posts.ts` (`BlogPost` type with id, title, content, author, createdAt)
- **API:** Route handlers in `app/api/posts/` (GET all, POST create, GET by id)
- **Client Fetching:** Home page uses `useEffect` to call `/api/posts` on mount

### Key Pattern: Dynamic Route Parameters
As of Next.js 16, **dynamic route params are now `Promise<T>`** and must be awaited:
```typescript
// In app/api/posts/[id]/route.ts:
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // ← Wrapped in Promise
): Promise<NextResponse> {
  const { id } = await params;  // ← Must await
  // ...
}
```

## Critical Developer Commands

```bash
yarn dev       # Start dev server on :3000
yarn build     # Production build (catches type errors)
yarn start     # Run production server
yarn lint      # Run ESLint
```

**Common Issues:**
- Build failures: Check for TypeScript errors with `yarn build` before deploying
- Dynamic routes: Always wrap params in `Promise<T>` and await them

## Code Patterns & Conventions

### 1. Type Safety with TypeScript
- **Strict mode enabled** (`"strict": true` in tsconfig.json)
- Blog data uses `BlogPost` type from `lib/posts.ts` - import and reuse this type in components
- Example: `import { BlogPost } from '@/lib/posts'`

### 2. Client Components
- Page components using hooks (useState, useEffect) must have `"use client"` directive
- Example: `app/page.tsx` and `app/create/page.tsx` are client components
- Server components (default) should be preferred for better performance

### 3. API Route Validation
- POST endpoints validate required fields AND their types
- Return proper HTTP status codes (400 for validation errors, 404 for not found)
- See `app/api/posts/route.ts` for validation pattern

### 4. Component Composition
- Styled components live in `components/` (e.g., `StyledBlogCard.tsx`, `StyledHeader.tsx`)
- Props are typed with `interface ComponentProps`
- Use `React.FC<Props>` for functional components

### 5. Tailwind CSS v4 Integration
- Configured in `tailwind.config.ts`
- PostCSS pipeline includes autoprefixer
- Use class-based styling (no inline styles except rare cases like `app/layout.tsx`)

### 6. Date Formatting
- Use `date-fns` for all date operations (e.g., `format(new Date(createdAt), 'MMM dd, yyyy')`)
- Timestamps stored as ISO strings (e.g., "2024-11-18T10:00:00Z")

## Path Aliases & Imports
- **`@/*` alias** maps to root directory (configured in `tsconfig.json`)
- Use relative imports sparingly; prefer `@/components/`, `@/lib/`, etc.

## File Organization
```
app/              → Pages and layouts (App Router)
app/api/          → Route handlers (API endpoints)
app/posts/[id]/   → Dynamic post detail page
components/       → Reusable React components
lib/              → Utilities and type definitions
```

## Common Tasks

### Adding a New Blog Post via API
- POST to `/api/posts` with `{ title, content, author }`
- Validation ensures all fields are strings and present
- Response includes generated ID and timestamp

### Creating a New Page
1. Add file in `app/` or nested route directory
2. Use `"use client"` if component needs interactivity
3. For dynamic segments, remember params are `Promise<T>`
4. Export default functional component

### Fetching Posts on Client
```typescript
useEffect(() => {
  fetch("/api/posts")
    .then(res => res.json())
    .then(data => setPosts(data));
}, []);
```

## Known Constraints & Best Practices

- **Mock Data Only:** No database integration - posts reset on server restart
- **No Authentication:** All endpoints are public
- **Linting:** Run `yarn lint` before commits to catch issues
- **Type Checking:** Always run `yarn build` to validate TypeScript before deployment
