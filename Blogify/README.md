# Blogify

A modern blog application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Features

- 📝 Create, read blog posts
- 🎨 Modern UI with Tailwind CSS v4
- 🔍 Responsive design
- ⚡ Fast client-side rendering
- 🎯 Type-safe with TypeScript
- 📅 Date formatting with date-fns

## Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **UI Library**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.17
- **Date Handling**: date-fns 4.1.0
- **Package Manager**: Yarn

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HariKrish4/Blogify.git
cd Blogify
```

2. Install dependencies:
```bash
yarn install
```

3. Run the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
Blogify/
├── app/
│   ├── api/
│   │   └── posts/
│   │       ├── route.ts          # GET all posts, POST new post
│   │       └── [id]/
│   │           └── route.ts      # GET single post by ID
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx          # Blog post detail page
│   ├── create/
│   │   └── page.tsx              # Create new post page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (list all posts)
│   └── globals.css               # Global styles
├── components/
│   ├── StyledBlogCard.tsx        # Blog post card component
│   └── StyledHeader.tsx          # Header component
├── lib/
│   └── posts.ts                  # Mock blog post data & types
└── public/                       # Static assets
```

## Available Scripts

- `yarn dev` - Start development server on [http://localhost:3000](http://localhost:3000)
- `yarn build` - Create production build
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## API Endpoints

### GET `/api/posts`
Returns all blog posts.

**Response:**
```json
[
  {
    "id": "1",
    "title": "Post Title",
    "content": "Post content...",
    "author": "Author Name",
    "createdAt": "2024-11-18T10:00:00Z"
  }
]
```

### GET `/api/posts/[id]`
Returns a single blog post by ID.

**Response:**
```json
{
  "id": "1",
  "title": "Post Title",
  "content": "Post content...",
  "author": "Author Name",
  "createdAt": "2024-11-18T10:00:00Z"
}
```

### POST `/api/posts`
Create a new blog post.

**Request Body:**
```json
{
  "title": "New Post Title",
  "content": "Post content...",
  "author": "Author Name"
}
```

**Response:** (201 Created)
```json
{
  "id": "generated-id",
  "title": "New Post Title",
  "content": "Post content...",
  "author": "Author Name",
  "createdAt": "2024-11-25T10:00:00Z"
}
```

## Key Features Explained

### Client-Side Rendering
All pages use the `"use client"` directive and fetch data client-side via API routes for optimal interactivity.

### Type Safety
TypeScript interfaces ensure type safety throughout the application:
```typescript
interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}
```

### Tailwind CSS v4
Uses the new `@tailwindcss/postcss` plugin with PostCSS configuration for modern styling.

### Mock Data
Currently uses in-memory mock data in `lib/posts.ts`. New posts created via the API are stored temporarily (lost on server restart).

## Roadmap

- [ ] Database integration (Prisma + PostgreSQL)
- [ ] User authentication
- [ ] Edit/Delete post functionality
- [ ] Comment system
- [ ] Search and filtering
- [ ] Markdown support for posts
- [ ] Image upload
- [ ] Categories/Tags

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for learning or personal projects.

## Author

**Hari Krishnan**
- GitHub: [@HariKrish4](https://github.com/HariKrish4)

## Acknowledgments

- Built as a learning project for Next.js 16 and React 19
- Inspired by modern blog platforms and content management systems
