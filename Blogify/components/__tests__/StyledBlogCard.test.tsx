import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StyledBlogCard from '@/components/StyledBlogCard';
import { BlogPost } from '@/lib/posts';

describe('StyledBlogCard', () => {
    const mockPost: BlogPost = {
        id: '1',
        title: 'Test Post',
        content: 'This is a test post with some content that should be truncated.',
        author: 'Test Author',
        createdAt: '2024-11-18T10:00:00Z',
    };

    it('renders blog post title', () => {
        render(<StyledBlogCard post={mockPost} />);
        expect(screen.getByText('Test Post')).toBeInTheDocument();
    });

    it('renders blog post author', () => {
        render(<StyledBlogCard post={mockPost} />);
        expect(screen.getByText('Test Author')).toBeInTheDocument();
    });

    it('truncates content to 150 characters', () => {
        render(<StyledBlogCard post={mockPost} />);
        const content = screen.getByText(/This is a test post/);
        expect(content.textContent).toContain('...');
    });

    it('renders read more link with correct href', () => {
        render(<StyledBlogCard post={mockPost} />);
        const link = screen.getByRole('link', { name: /Read more/ });
        expect(link).toHaveAttribute('href', '/posts/1');
    });

    it('displays formatted date', () => {
        render(<StyledBlogCard post={mockPost} />);
        expect(screen.getByText('Nov 18, 2024')).toBeInTheDocument();
    });
});
