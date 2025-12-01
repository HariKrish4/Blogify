import { prisma } from '../lib/db';

async function main() {
    console.log('🌱 Starting database seeding...');

    // Clear existing data (optional - remove if you want to keep existing posts)
    await prisma.blogPost.deleteMany({});
    console.log('✓ Cleared existing posts');

    // Seed sample blog posts
    const posts = [
        {
            title: 'Getting Started with Next.js',
            content: `Next.js is a powerful framework for building React applications with ease. Whether you're building a static website, server-side rendered (SSR) app, or a dynamic web application, Next.js provides all the features you need, out of the box. This guide will help you understand the key concepts of Next.js such as pages, routing, and static site generation (SSG), giving you a solid foundation to build scalable apps.`,
            author: 'John Doe',
        },
        {
            title: 'Understanding TypeScript: A Beginner\'s Guide',
            content: `TypeScript is a superset of JavaScript that introduces static typing to the language, making it easier to catch errors early in development. With its growing popularity in the JavaScript community, TypeScript is increasingly becoming the go-to choice for building large-scale applications. In this post, we'll explore how TypeScript works, its benefits, and why you should consider using it in your next project.`,
            author: 'Jane Smith',
        },
        {
            title: 'React Hooks Explained',
            content: `React Hooks have revolutionized the way we write functional components. Before Hooks, you had to use class components to access lifecycle methods and state. With Hooks like useState, useEffect, and useContext, functional components are now just as powerful. Learn how to use Hooks effectively and write cleaner, more reusable React code.`,
            author: 'Mike Johnson',
        },
        {
            title: 'CSS-in-JS: Tailwind vs Styled Components',
            content: `There are many ways to style React applications. In this post, we compare two popular approaches: Tailwind CSS and Styled Components. Tailwind CSS is a utility-first framework that makes styling quick and efficient, while Styled Components allow you to write CSS directly in your JavaScript files. Both have their pros and cons, and we'll explore when to use each.`,
            author: 'Sarah Williams',
        },
        {
            title: 'Building Scalable APIs with Node.js',
            content: `Node.js is an excellent choice for building scalable backend APIs. With its non-blocking I/O model and event-driven architecture, Node.js can handle thousands of concurrent connections efficiently. In this comprehensive guide, we'll cover best practices for building robust, scalable APIs using Express.js, error handling, authentication, and deployment strategies.`,
            author: 'David Brown',
        },
    ];

    for (const post of posts) {
        const created = await prisma.blogPost.create({
            data: post,
        });
        console.log(`✓ Created post: "${created.title}" by ${created.author}`);
    }

    console.log('✅ Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
