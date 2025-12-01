# Blogify - AI Coding Agent Instructions

## Project Overview
Next.js 16 blog application using App Router, TypeScript, React 19, and Tailwind CSS v4. Mock data-driven architecture with client-side rendering for blog posts.

## Architecture

### Data Layer
- **Mock Data**: `lib/posts.ts` exports `BlogPost` type and `posts` array
- Single source of truth for all blog data (id, title, content, author, createdAt)
- No database - all data is in-memory

### API Routes (App Router)
- `app/api/posts/route.ts`: GET all posts endpoint
- `app/api/posts/[id]/route.ts`: GET single post by ID
  - **Critical**: Next.js 14+ requires `await params` in API routes
  - Uses URL parsing workaround: `const id = url.pathname.split("/").pop()`

### Client Components
- All pages use `"use client"` directive (app/page.tsx, app/posts/[id]/page.tsx)
- Fetch data client-side via API routes, not direct imports
- Pattern: useState + useEffect for data fetching with loading states

### Component Structure
- `components/StyledBlogCard.tsx`: Card with truncated content, date formatting via `date-fns`
- `components/StyledHeader.tsx`: Reusable header component
- Import path alias: `@/` maps to project root (use `@/lib/posts`, `@/components/...`)

## Key Conventions

### Styling
- Tailwind CSS v4 with new PostCSS plugin: `@tailwindcss/postcss`
- PostCSS config uses ES modules (`.mjs`)
- Utility-first approach - no custom CSS classes beyond Tailwind

### Date Handling
- Store dates as ISO strings (e.g., `"2024-11-18T10:00:00Z"`)
- Format with `date-fns`: `format(new Date(post.createdAt), 'MMM dd, yyyy')`

### Type Safety
- Define interfaces inline in client components (duplicate `Post` interface pattern)
- Export types from `lib/posts.ts` for reuse in components

## Development Workflow

```bash
yarn dev          # Start dev server on localhost:3000
yarn build        # Production build
yarn start        # Start production server
```

## Common Patterns

### Adding a New Post
Edit `lib/posts.ts` array - changes reflect immediately in dev mode.

### Creating New API Route
1. Create `app/api/[route]/route.ts`
2. Export async `GET/POST/etc` functions
3. Use `NextResponse.json()` for responses
4. Remember: `params` is a Promise in Next.js 14+

### Adding New Page
1. Create `app/[path]/page.tsx` with `"use client"`
2. Use `useParams()` for dynamic routes
3. Fetch via `/api/...` endpoints, not direct imports
4. Include loading state before rendering

## Critical Details
- **Tailwind v4**: Must use `@tailwindcss/postcss` plugin, not `tailwindcss` directly
- **Client Components**: All data fetching happens client-side via API
- **Type Imports**: Use `import type` or inline interfaces to avoid bundling issues
- **Date Formatting**: Always use `date-fns` for consistency
