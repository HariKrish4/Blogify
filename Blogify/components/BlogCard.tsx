import React from 'react';
import { BlogPost } from '../lib/posts';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', marginBottom: '1rem', background: '#fafafa' }}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
    <div style={{ fontSize: '0.9rem', color: '#555' }}>
      <span>By {post.author}</span> | <span>{post.createdAt}</span>
    </div>
  </div>
);

export default BlogCard;
