# Vercel Postgres + Prisma Setup Instructions

## 1. Local Development Setup

### Option A: Use Vercel Postgres (Recommended)

1. Create a Vercel account and project at https://vercel.com
2. Add Vercel Postgres storage to your project
3. Copy the connection string and update `.env.local`:
```bash
DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[database]?schema=public"
```

### Option B: Local PostgreSQL

1. Install PostgreSQL locally or use Docker:
```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
```

2. Update `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/blogify?schema=public"
```

## 2. Run Migrations

```bash
# Create tables in your database
npx prisma migrate dev --name init

# Or push schema without migration file
npx prisma db push
```

## 3. Seed Database with Sample Data

```bash
# Run the seed script to populate initial blog posts
yarn seed
```

The seed script creates 5 sample blog posts. To customize the seed data, edit `prisma/seed.ts`.

## 4. Generate Prisma Client

```bash
npx prisma generate
```

## 5. Verify Setup

```bash
# Open Prisma Studio to view data
npx prisma studio
```

## 5. Update Environment Variables for Production

On Vercel dashboard, add your `DATABASE_URL` as an environment variable.

## Key Files

- `prisma/schema.prisma` - Database schema definition
- `prisma/seed.ts` - Seed script with sample data
- `lib/db.ts` - Prisma client singleton
- `app/api/posts/route.ts` - GET/POST all posts
- `app/api/posts/[id]/route.ts` - GET single post by ID

## Common Commands

```bash
npx prisma studio              # Open web UI to manage data
npx prisma generate            # Regenerate Prisma client
npx prisma migrate dev         # Create and apply migration
npx prisma migrate reset       # Reset database (⚠️ destructive)
npx prisma format              # Format schema.prisma
yarn seed                       # Run seed script to populate data
yarn seed -- --resetDb         # Reset database and re-seed (if using Prisma CLI)
```
