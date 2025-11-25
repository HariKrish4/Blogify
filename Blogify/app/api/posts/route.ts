import { NextResponse } from 'next/server';
import { posts, BlogPost } from '../../../lib/posts';

export async function GET() {
  return NextResponse.json(posts);
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

    // Generate unique ID (simple approach using timestamp + random)
    const newId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Create new blog post
    const newPost: BlogPost = {
      id: newId,
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };
    
    // Add to posts array (in-memory)
    posts.push(newPost);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 500 }
    );
  }
}
