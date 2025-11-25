import { posts } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    // Extract id from URL instead of params
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop() || "";

    const post = posts.find((post) => post.id === id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}