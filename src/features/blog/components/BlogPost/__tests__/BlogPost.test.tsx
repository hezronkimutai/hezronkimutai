import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogPost } from '../BlogPost';
import { mockPosts } from '../../../types/blog';

describe('BlogPost Component', () => {
  const defaultPost = mockPosts[0];

  describe('Full Post Mode', () => {
    it('renders full post content', () => {
      render(<BlogPost {...defaultPost} />);

      // Check title
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(defaultPost.title);

      // Check meta information
      expect(screen.getByText(defaultPost.author.name)).toBeInTheDocument();
      expect(screen.getByText(/min read/)).toHaveTextContent(`${defaultPost.readingTime} min read`);

      // Check content
      expect(screen.getByRole('article')).toHaveTextContent(defaultPost.content);

      // Check categories
      defaultPost.categories.forEach(category => {
        expect(screen.getByText(category.name)).toBeInTheDocument();
      });
    });

    it('renders author bio section when provided', () => {
      render(<BlogPost {...defaultPost} />);
      
      expect(screen.getByText('About the Author')).toBeInTheDocument();
      expect(screen.getByText(defaultPost.author.bio!)).toBeInTheDocument();
    });

    it('handles missing optional fields', () => {
      const minimalPost = {
        ...defaultPost,
        featuredImage: undefined,
        updatedAt: undefined,
        author: {
          ...defaultPost.author,
          avatarUrl: undefined,
          bio: undefined,
          socials: undefined,
        },
      };

      render(<BlogPost {...minimalPost} />);

      // Core content should still be present
      expect(screen.getByText(minimalPost.title)).toBeInTheDocument();
      expect(screen.getByText(minimalPost.content)).toBeInTheDocument();

      // Optional content should not be present
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      expect(screen.queryByText('About the Author')).not.toBeInTheDocument();
    });

    it('formats dates correctly', () => {
      const post = {
        ...defaultPost,
        publishedAt: '2025-04-13T12:00:00Z',
        updatedAt: '2025-04-14T12:00:00Z',
      };

      render(<BlogPost {...post} />);

      expect(screen.getByText(/April 13, 2025/)).toBeInTheDocument();
      expect(screen.getByText(/Updated:/)).toBeInTheDocument();
      expect(screen.getByText(/April 14, 2025/)).toBeInTheDocument();
    });
  });

  describe('Preview Mode', () => {
    it('renders preview version', () => {
      render(<BlogPost {...defaultPost} isPreview />);

      // Should show excerpt instead of full content
      expect(screen.getByText(defaultPost.excerpt)).toBeInTheDocument();
      expect(screen.queryByText(defaultPost.content)).not.toBeInTheDocument();

      // Should have read more link
      const readMoreLink = screen.getByText('Read more');
      expect(readMoreLink).toBeInTheDocument();
      expect(readMoreLink).toHaveAttribute(
        'href',
        `/blog/${defaultPost.title.toLowerCase().replace(/\s+/g, '-')}`
      );
    });

    it('makes title clickable in preview mode', () => {
      render(<BlogPost {...defaultPost} isPreview />);
      
      const titleLink = screen.getByRole('heading', { level: 1 }).querySelector('a');
      expect(titleLink).toBeInTheDocument();
      expect(titleLink).toHaveAttribute(
        'href',
        `/blog/${defaultPost.title.toLowerCase().replace(/\s+/g, '-')}`
      );
    });
  });

  describe('Social Links', () => {
    it('renders author social links when provided', () => {
      render(<BlogPost {...defaultPost} />);

      if (defaultPost.author.socials) {
        Object.entries(defaultPost.author.socials).forEach(([platform, url]) => {
          if (url) {
            const link = screen.getByLabelText(new RegExp(platform, 'i'));
            expect(link).toHaveAttribute('href', url);
          }
        });
      }
    });

    it('applies proper attributes to social links', () => {
      render(<BlogPost {...defaultPost} />);

      const socialLinks = screen.getAllByRole('link', { name: /follow|connect/i });
      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Accessibility', () => {
    it('uses proper semantic structure', () => {
      render(<BlogPost {...defaultPost} />);
      
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      if (defaultPost.author.bio) {
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      }
    });

    it('provides descriptive alt text for images', () => {
      render(<BlogPost {...defaultPost} />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    it('uses proper ARIA labels for social links', () => {
      render(<BlogPost {...defaultPost} />);

      const socialLinks = screen.getAllByRole('link', { name: /follow|connect/i });
      socialLinks.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
    });

    it('includes schema.org markup', () => {
      render(<BlogPost {...defaultPost} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('itemScope', '');
      expect(article).toHaveAttribute('itemType', 'http://schema.org/BlogPosting');
    });

    it('uses proper attributes for all links', () => {
      render(<BlogPost {...defaultPost} />);

      const externalLinks = screen.getAllByRole('link').filter(
        link => link.getAttribute('target') === '_blank'
      );

      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('Performance', () => {
    it('uses lazy loading for images', () => {
      render(<BlogPost {...defaultPost} />);

      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });

    it('is optimized with proper display name', () => {
      expect(BlogPost.displayName).toBe('BlogPost');
    });
  });
});