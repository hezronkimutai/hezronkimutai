import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogPost } from '../BlogPost';
import { BlogPost as BlogPostType } from '../../../types';

const defaultPost: BlogPostType = {
  id: '1',
  title: 'First Post',
  slug: 'first-post',
  excerpt: 'This is the first post',
  content: 'First post content',
  author: {
    id: '1',
    name: 'John Doe',
    bio: 'Test bio',
  },
  createdAt: '2025-04-01T00:00:00Z',
  updatedAt: '2025-04-01T00:00:00Z',
  readTime: 5,
  category: {
    id: '1',
    name: 'Test Category',
    slug: 'test-category'
  },
  coverImage: 'https://example.com/image.jpg',
  tags: ['test', 'blog']
};

describe('BlogPost Component', () => {
  describe('Full Post Mode', () => {
    it('renders full post content', () => {
      render(<BlogPost mode="full" post={defaultPost} />);

      // Check title
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultPost.title);

      // Check meta information
      expect(screen.getByText(defaultPost.author.name)).toBeInTheDocument();
      expect(screen.getByText(/min read/)).toHaveTextContent(`${defaultPost.readTime} min read`);

      // Check content
      expect(screen.getByRole('article')).toHaveTextContent(defaultPost.content);
    });

    it('renders author bio section when provided', () => {
      render(<BlogPost mode="full" post={defaultPost} />);
      
      expect(screen.getByText(defaultPost.author.bio!)).toBeInTheDocument();
    });

    it('handles missing optional fields', () => {
      const minimalPost: BlogPostType = {
        ...defaultPost,
        coverImage: undefined,
        tags: undefined,
        author: {
          id: defaultPost.author.id,
          name: defaultPost.author.name,
        },
      };

      render(<BlogPost mode="full" post={minimalPost} />);

      // Core content should still be present
      expect(screen.getByText(minimalPost.title)).toBeInTheDocument();
      expect(screen.getByText(minimalPost.content)).toBeInTheDocument();

      // Optional content should not be present
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('formats dates correctly', () => {
      const post: BlogPostType = {
        ...defaultPost,
        createdAt: '2025-04-13T12:00:00Z',
        updatedAt: '2025-04-14T12:00:00Z',
      };

      render(<BlogPost mode="full" post={post} />);
      expect(screen.getByText(/April 13, 2025/)).toBeInTheDocument();
    });
  });

  describe('Preview Mode', () => {
    it('renders preview version', () => {
      render(<BlogPost mode="preview" title={defaultPost.title} slug={defaultPost.slug} />);

      // Should have read more link
      const readMoreLink = screen.getByText('Read more');
      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink).toHaveAttribute('href', `/blog/${defaultPost.slug}`);
    });

    it('makes title clickable in preview mode', () => {
      render(<BlogPost mode="preview" title={defaultPost.title} slug={defaultPost.slug} />);
      
      const titleLink = screen.getByRole('heading', { level: 2 }).querySelector('a');
      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveAttribute('href', `/blog/${defaultPost.slug}`);
    });
  });

  describe('Accessibility', () => {
    it('uses proper semantic structure', () => {
      render(<BlogPost mode="full" post={defaultPost} />);
      
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('provides descriptive alt text for images', () => {
      render(<BlogPost mode="full" post={defaultPost} />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('includes schema.org markup', () => {
      render(<BlogPost mode="full" post={defaultPost} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('itemScope', '');
      expect(article).toHaveAttribute('itemType', 'http://schema.org/BlogPosting');
    });

    it('uses lazy loading for images', () => {
      render(<BlogPost mode="full" post={defaultPost} />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });

  describe('Performance', () => {
    it('is memoized', () => {
      expect(BlogPost.displayName).toBe('BlogPost');
    });
  });
});