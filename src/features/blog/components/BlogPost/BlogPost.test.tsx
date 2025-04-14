import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogPost } from './BlogPost';
import { BlogPost as BlogPostType } from '../../types';
import { mockAuthor, mockPosts } from '../../types/blog';

describe('BlogPost', () => {
  describe('Preview Mode', () => {
    const defaultPreviewProps = {
      mode: 'preview' as const,
      title: 'Test Blog Post',
      slug: 'test-blog-post',
    };

    it('renders preview mode correctly', () => {
      render(<BlogPost {...defaultPreviewProps} />);
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Read more →')).toBeInTheDocument();
    });

    it('applies custom className in preview mode', () => {
      const customClass = 'custom-preview';
      render(<BlogPost {...defaultPreviewProps} className={customClass} />);
      expect(screen.getByTestId('blog-post')).toHaveClass(customClass);
    });

    it('renders without slug', () => {
      const propsWithoutSlug = {
        mode: 'preview' as const,
        title: 'Test Blog Post',
      };
      render(<BlogPost {...propsWithoutSlug} />);
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      expect(screen.queryByText('Read more →')).not.toBeInTheDocument();
    });
  });

  describe('Full Mode', () => {
    const mockPost: BlogPostType = {
      ...mockPosts[0],
      publishedAt: '2025-04-14T12:00:00Z',
      createdAt: '2025-04-13T12:00:00Z',
      readingTime: 5,
      author: {
        ...mockAuthor,
        avatarUrl: 'https://example.com/avatar.jpg',
        bio: 'Test author bio'
      },
      featuredImage: 'https://example.com/image.jpg'
    };

    const defaultFullProps = {
      mode: 'full' as const,
      post: mockPost,
    };

    it('renders full mode correctly', () => {
      render(<BlogPost {...defaultFullProps} />);
      expect(screen.getByText(mockPost.title)).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      expect(screen.getByText(mockPost.content)).toBeInTheDocument();
      expect(screen.getByText(mockPost.author.name)).toBeInTheDocument();
      expect(screen.getByText(mockPost.author.bio!)).toBeInTheDocument();
    });

    it('applies custom className in full mode', () => {
      const customClass = 'custom-full';
      render(<BlogPost {...defaultFullProps} className={customClass} />);
      expect(screen.getByRole('article')).toHaveClass(customClass);
    });

    it('renders with Schema.org markup', () => {
      render(<BlogPost {...defaultFullProps} />);
      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('itemScope', '');
      expect(article).toHaveAttribute('itemType', 'http://schema.org/BlogPosting');
      expect(screen.getByText(mockPost.author.name).closest('[itemType="http://schema.org/Person"]'))
        .toBeInTheDocument();
    });

    it('renders featured image when provided', () => {
      render(<BlogPost {...defaultFullProps} />);
      const img = screen.getByAltText(mockPost.title);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockPost.featuredImage);
      expect(img).toHaveAttribute('itemProp', 'image');
    });

    it('renders without featured image', () => {
      const postWithoutImage = {
        ...mockPost,
        featuredImage: undefined
      };
      render(<BlogPost mode="full" post={postWithoutImage} />);
      expect(screen.queryByRole('img', { name: postWithoutImage.title })).not.toBeInTheDocument();
    });

    it('renders without author avatar', () => {
      const postWithoutAvatar = {
        ...mockPost,
        author: {
          ...mockPost.author,
          avatarUrl: undefined
        }
      };
      render(<BlogPost mode="full" post={postWithoutAvatar} />);
      expect(screen.queryByAltText(postWithoutAvatar.author.name)).not.toBeInTheDocument();
    });

    it('renders without author bio', () => {
      const postWithoutBio = {
        ...mockPost,
        author: {
          ...mockPost.author,
          bio: undefined
        }
      };
      render(<BlogPost mode="full" post={postWithoutBio} />);
      expect(screen.queryByText(mockPost.author.bio!)).not.toBeInTheDocument();
    });

    it('formats dates correctly', () => {
      const { rerender } = render(<BlogPost {...defaultFullProps} />);
      
      // With publishedAt
      if (mockPost.publishedAt) {
        const publishDate = new Date(mockPost.publishedAt).toLocaleDateString();
        expect(screen.getByText(publishDate)).toBeInTheDocument();
      }

      // With only createdAt
      const postWithoutPublishedAt = {
        ...mockPost,
        publishedAt: undefined
      };
      rerender(<BlogPost mode="full" post={postWithoutPublishedAt} />);
      
      if (postWithoutPublishedAt.createdAt) {
        const createDate = new Date(postWithoutPublishedAt.createdAt).toLocaleDateString();
        expect(screen.getByText(createDate)).toBeInTheDocument();
      }

      // Without any dates
      const postWithoutDates = {
        ...mockPost,
        publishedAt: undefined,
        createdAt: undefined
      };
      rerender(<BlogPost mode="full" post={postWithoutDates} />);
      expect(screen.getByText('•')).toBeInTheDocument(); // Bullet point should still be there
    });
  });
});