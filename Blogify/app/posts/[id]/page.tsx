// app/posts/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import StyledHeader from "@/components/StyledHeader";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const response = await fetch(`/api/posts/${params.id}`);
    const data: Post = await response.json();
    console.log(params.id, data);
    setPost(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <StyledHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">
            {post?.title}
          </h1>
          <div className="flex justify-between items-center text-sm text-gray-500 mb-8">
            <span>{post?.author}</span>
            <span>
              {post?.createdAt &&
                format(new Date(post.createdAt), "MMMM dd, yyyy")}
            </span>
          </div>
          <div className="prose max-w-none text-gray-700">{post?.content}</div>
        </article>
      </main>
    </div>
  );
};

export default PostDetail;
