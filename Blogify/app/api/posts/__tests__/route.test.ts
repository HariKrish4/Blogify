import { describe, it, expect } from 'vitest';
import { GET, POST } from '@/app/api/posts/route';

describe('GET /api/posts', () => {
    it('returns all blog posts', async () => {
        const response = await GET();
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThan(0);
    });

    it('returns BlogPost objects with required fields', async () => {
        const response = await GET();
        const data = await response.json();

        expect(data[0]).toHaveProperty('id');
        expect(data[0]).toHaveProperty('title');
        expect(data[0]).toHaveProperty('content');
        expect(data[0]).toHaveProperty('author');
        expect(data[0]).toHaveProperty('createdAt');
    });
});

describe('POST /api/posts', () => {
    it('validates required fields', async () => {
        const request = new Request('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title: 'Test' }), // Missing content and author
        });

        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('Missing required fields');
    });

    it('validates field types', async () => {
        const request = new Request('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'Test',
                content: 'Content',
                author: 123, // Should be string
            }),
        });

        const response = await POST(request);

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data.error).toContain('Invalid field types');
    });

    it('creates a new blog post', async () => {
        const request = new Request('http://localhost:3000/api/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: 'New Post',
                content: 'Post content',
                author: 'Test Author',
            }),
        });

        const response = await POST(request);

        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data).toHaveProperty('id');
        expect(data.title).toBe('New Post');
        expect(data.author).toBe('Test Author');
        expect(data).toHaveProperty('createdAt');
    });
});
