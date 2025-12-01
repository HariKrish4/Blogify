import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { title, content, author } = body;

    if (!title || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, and author are required' },
        { status: 400 }
      );
    }

    // Validate field types
    if (typeof title !== 'string' || typeof content !== 'string' || typeof author !== 'string') {
      return NextResponse.json(
        { error: 'Invalid field types: title, content, and author must be strings' },
        { status: 400 }
      );
    }

    // Create new blog post in database
    const newPost = await prisma.blogPost.create({
      data: {
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 500 }
    );
  }
}
