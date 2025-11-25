// Mock blog post data
export type BlogPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
};

export const posts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content: `Next.js is a powerful framework for building React applications with ease. 
                  Whether you're building a static website, server-side rendered (SSR) app, or a dynamic web application, 
                  Next.js provides all the features you need, out of the box. This guide will help you understand the key concepts 
                  of Next.js such as pages, routing, and static site generation (SSG), giving you a solid foundation to build scalable apps.`,
    author: "John Doe",
    createdAt: "2024-11-18T10:00:00Z",
  },
  {
    id: "2",
    title: "Understanding TypeScript: A Beginner’s Guide",
    content: `TypeScript is a superset of JavaScript that introduces static typing to the language, making it easier to catch 
                  errors early in development. With its growing popularity in the JavaScript community, TypeScript is increasingly 
                  becoming the go-to choice for building large-scale applications. In this post, we’ll explore how TypeScript works, 
                  its benefits, and why you should consider using it in your next project.`,
    author: "Jane Smith",
    createdAt: "2024-11-17T09:30:00Z",
  },
  {
    id: "3",
    title: "Exploring React Hooks: Simplifying State and Effects",
    content: `React hooks allow you to use state and other React features without writing class-based components. 
                  Since the release of hooks, the way we write React components has fundamentally changed. Hooks like useState and 
                  useEffect allow developers to write simpler, more readable code while still achieving the same powerful functionality. 
                  In this article, we’ll dive deep into how hooks work, their advantages, and how they can simplify your React code.`,
    author: "Mike Johnson",
    createdAt: "2024-11-16T08:45:00Z",
  },
];