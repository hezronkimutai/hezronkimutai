import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogPost, FullBlogPost } from './blog-post';
import { BlogPost as BlogPostType } from '../../types/blog';
import { mockCategories } from '../../types/blog';

describe('Blog Post Components', () => {
  describe('BlogPost Preview', () => {
    const defaultProps = {
      title: 'Test Blog Post',
      slug: 'test-blog-post'
    };

    it('renders with required props', () => {
      render(<BlogPost {...defaultProps} />);
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      expect(screen.getByText('Read more →')).toBeInTheDocument();
    });

    it('renders preview without Read more link when no slug provided', () => {
      render(<BlogPost title={defaultProps.title} />);
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
      expect(screen.queryByText('Read more →')).not.toBeInTheDocument();
    });

    it('creates correct blog post link', () => {
      render(<BlogPost {...defaultProps} />);
      const link = screen.getByText('Read more →');
      expect(link).toHaveAttribute('href', `/blog/${defaultProps.slug}`);
      expect(link).toHaveClass('text-blue-600', 'hover:text-blue-800', 'transition-colors');
    });

    it('applies correct classes to article element', () => {
      render(<BlogPost {...defaultProps} />);
      const article = screen.getByTestId('blog-post');
      expect(article).toHaveClass('bg-white', 'p-6', 'rounded-lg', 'shadow');
    });

    it('renders title with correct styling', () => {
      render(<BlogPost {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-2xl', 'font-semibold', 'mb-4');
      expect(heading).toHaveTextContent('Test Blog Post');
    });
  });

  describe('FullBlogPost', () => {
    const mockPost: BlogPostType = {
      id: '1',
      title: 'Test Full Blog Post',
      slug: 'test-full-blog-post',
      excerpt: 'Test excerpt',
      content: 'Test content',
      publishedAt: '2025-04-14T12:00:00Z',
      readingTime: 5,
      author: {
        id: '1',
        name: 'Test Author',
        avatar: 'https://example.com/avatar.jpg',
        bio: 'Test author bio'
      },
      categories: [mockCategories[0]],
      featuredImage: 'https://example.com/cover.jpg'
    };

    it('renders full blog post correctly', () => {
      render(<FullBlogPost post={mockPost} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mockPost.title);
      expect(screen.getByText(mockPost.content)).toBeInTheDocument();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
      expect(screen.getByText(mockPost.author.name)).toBeInTheDocument();
    });

    it('formats date correctly from publishedAt', () => {
      render(<FullBlogPost post={mockPost} />);
      const formattedDate = new Date(mockPost.publishedAt!).toLocaleDateString();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('uses createdAt when publishedAt is not available', () => {
      const postWithCreatedAt = {
        ...mockPost,
        publishedAt: undefined,
        createdAt: '2025-04-13T12:00:00Z'
      };
      render(<FullBlogPost post={postWithCreatedAt} />);
      const formattedDate = new Date(postWithCreatedAt.createdAt!).toLocaleDateString();
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    it('shows "No date" when no dates are available', () => {
      const postWithoutDates = {
        ...mockPost,
        publishedAt: undefined,
        createdAt: undefined
      };
      render(<FullBlogPost post={postWithoutDates} />);
      expect(screen.getByText('No date')).toBeInTheDocument();
    });

    it('renders featured image when provided', () => {
      render(<FullBlogPost post={mockPost} />);
      const img = screen.getByAltText(mockPost.title);
      expect(img).toHaveAttribute('src', mockPost.featuredImage);
      expect(img).toHaveClass('w-full', 'h-64', 'object-cover', 'rounded-lg', 'mb-8');
    });

    it('skips featured image when not provided', () => {
      const postWithoutImage = { ...mockPost, featuredImage: undefined };
      render(<FullBlogPost post={postWithoutImage} />);
      expect(screen.queryByRole('img', { name: mockPost.title })).not.toBeInTheDocument();
    });

    it('renders author avatar when provided', () => {
      render(<FullBlogPost post={mockPost} />);
      const avatar = screen.getByAltText(mockPost.author.name);
      expect(avatar).toHaveAttribute('src', mockPost.author.avatar);
      expect(avatar).toHaveClass('h-10', 'w-10', 'rounded-full');
    });

    it('skips author avatar when not provided', () => {
      const postWithoutAvatar = {
        ...mockPost,
        author: { ...mockPost.author, avatar: undefined }
      };
      render(<FullBlogPost post={postWithoutAvatar} />);
      expect(screen.queryByRole('img', { name: mockPost.author.name })).not.toBeInTheDocument();
    });

    it('renders author bio when provided', () => {
      render(<FullBlogPost post={mockPost} />);
      expect(screen.getByText(mockPost.author.bio!)).toBeInTheDocument();
    });

    it('skips author bio when not provided', () => {
      const postWithoutBio = {
        ...mockPost,
        author: { ...mockPost.author, bio: undefined }
      };
      render(<FullBlogPost post={postWithoutBio} />);
      expect(screen.queryByText('Test author bio')).not.toBeInTheDocument();
    });

    it('applies correct container classes', () => {
      render(<FullBlogPost post={mockPost} />);
      const article = screen.getByRole('article');
      expect(article).toHaveClass('container', 'mx-auto', 'bg-white', 'p-6', 'rounded-lg', 'shadow');
    });

    it('renders content with proper typography', () => {
      render(<FullBlogPost post={mockPost} />);
      const content = screen.getByText(mockPost.content).parentElement;
      expect(content).toHaveClass('prose', 'max-w-none');
    });

    it('renders author section with correct layout', () => {
      render(<FullBlogPost post={mockPost} />);
      const footer = screen.getByText(mockPost.author.name).closest('footer');
      expect(footer).toHaveClass('mt-8', 'pt-8', 'border-t');
    });
  });
});