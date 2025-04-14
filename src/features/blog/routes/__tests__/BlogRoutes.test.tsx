import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import { BlogRoutes } from '../BlogRoutes';
import { mockPosts } from '../../types/blog';

// Mock child components
jest.mock('../../components/BlogList', () => ({
  BlogList: ({ data, className }: { data: any; className?: string }) => (
    <div data-testid="blog-list" className={className}>
      Posts: {data.posts.length}
      Page: {data.page}
    </div>
  ),
}));

jest.mock('../../components/BlogPost', () => ({
  BlogPost: ({ title, className }: { title: string; className?: string }) => (
    <article data-testid="blog-post" className={className}>
      {title}
    </article>
  ),
}));

describe('BlogRoutes Component', () => {
  const renderWithRouter = (initialPath: string, className?: string) => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/blog/*" element={<BlogRoutes className={className} />} />
          <Route path="/404" element={<div>404 Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  describe('Route Rendering', () => {
    it('renders blog list on home route', () => {
      renderWithRouter('/blog');
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    });

    it('renders blog post for valid slug', () => {
      const post = mockPosts[0];
      renderWithRouter(`/blog/${post.slug}`);

      expect(screen.getByTestId('blog-post')).toBeInTheDocument();
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });

    it('redirects to 404 for invalid blog post slug', () => {
      renderWithRouter('/blog/invalid-post');
      expect(screen.getByText('404 Page')).toBeInTheDocument();
    });
  });

  describe('List Pages', () => {
    it('handles category pages', () => {
      renderWithRouter('/blog/category/typescript');
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    });

    it('handles search pages', () => {
      renderWithRouter('/blog/search');
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    });

    it('handles archive pages', () => {
      renderWithRouter('/blog/archive');
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    });

    it('handles author pages', () => {
      renderWithRouter('/blog/author/john-doe');
      expect(screen.getByTestId('blog-list')).toBeInTheDocument();
    });
  });

  describe('Loading States', () => {
    it('shows loading spinner initially', () => {
      renderWithRouter('/blog');
      // Using CSS class instead of data-testid since we're using inline component
      expect(screen.getByText('Loading blog content...')).toBeInTheDocument();
      expect(screen.getByText('Loading blog content...').parentElement?.querySelector('.animate-spin')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('redirects to 404 for invalid routes', () => {
      renderWithRouter('/blog/invalid/path');
      expect(screen.getByText('404 Page')).toBeInTheDocument();
    });

    it('redirects to 404 for malformed slugs', () => {
      renderWithRouter('/blog/post@with@invalid@chars');
      expect(screen.getByText('404 Page')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    const className = 'custom-class';

    it('passes className to blog list', () => {
      renderWithRouter('/blog', className);

      const blogList = screen.getByTestId('blog-list');
      expect(blogList).toHaveClass(className);
    });

    it('passes className to blog post', () => {
      const post = mockPosts[0];
      renderWithRouter(`/blog/${post.slug}`, className);

      const blogPost = screen.getByTestId('blog-post');
      expect(blogPost).toHaveClass(className);
    });

    it('passes className to loading spinner container', () => {
      renderWithRouter('/blog', className);

      const spinnerContainer = screen.getByText('Loading blog content...').parentElement?.parentElement;
      expect(spinnerContainer).toHaveClass(className);
    });
  });
});