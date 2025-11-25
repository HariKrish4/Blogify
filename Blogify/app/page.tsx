// app/page.tsx
"use client";
import StyledBlogCard from "@/components/StyledBlogCard";
import StyledHeader from "@/components/StyledHeader";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await fetch("/api/posts");
    const data: Post[] = await response.json();
    setPosts(data);
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <StyledHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
          <Link
            href="/create"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition"
          >
            Create New Post
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <StyledBlogCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
