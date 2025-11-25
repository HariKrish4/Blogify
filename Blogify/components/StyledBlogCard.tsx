import React from 'react';
import { format } from "date-fns";
import Link from "next/link";
import { BlogPost } from '../lib/posts';

interface BlogCardProps {
  post: BlogPost;
}

const StyledBlogCard: React.FC<BlogCardProps> = ({ post }) => (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">
                {post.title}
            </h2>
            <p className="text-gray-700 mb-4">
                {post.content.substring(0, 150)}...
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{post.author}</span>
                <span>
                    {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                </span>
            </div>
            <Link 
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:text-blue-800"
            >
                Read more
            </Link>
        </div>
    );

export default StyledBlogCard;
