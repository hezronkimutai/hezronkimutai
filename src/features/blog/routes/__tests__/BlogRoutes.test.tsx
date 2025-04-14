import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { BlogRoutes } from '../BlogRoutes';
import { mockPosts } from '../../types/blog';

// Mock child components
jest.mock('../../components/BlogList', () => ({
  BlogList: ({ className, posts = [], currentPage = 1 }: any) => (
    <div data-testid="blog-list" className={className}>
      {posts.map((post: any) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <div>Page {currentPage}</div>
    </div>
  ),
}));

jest.mock('../../components/BlogPost', () => ({
  BlogPost: ({ className, post }: any) => (
    <article data-testid="blog-post" className={className}>
      {post?.title}
    </article>
  ),
}));

jest.mock('../../components/BlogCategory', () => {
  const mockComponent = ({ className }: { className?: string }) => (
    <div data-testid="blog-category" className={className}>
      Blog Category
    </div>
  );
  mockComponent.displayName = 'BlogCategory';
  return {
    __esModule: true,
    default: mockComponent,
    BlogCategory: mockComponent
  };
});

// Mock NotFound component using module mapper
jest.mock('@/shared/components/NotFound', () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="not-found">
        <h1>404</h1>
      </div>
    )
  };
});

// Mock blog API calls
jest.mock('../../hooks/useBlogQuery', () => ({
  useBlogQuery: () => ({
    data: {
      posts: mockPosts,
      currentPage: 1,
      totalPages: 1
    },
    isLoading: false,
    error: null
  })
}));

describe('BlogRoutes Component', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const renderWithRouter = (initialPath: string, className?: string) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/blog/*" element={<BlogRoutes className={className} />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient.clear();
  });

  describe('Route Rendering', () => {
    it('renders blog list on home route', async () => {
      renderWithRouter('/blog');
      await waitFor(() => {
        expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      });
    });

    it('renders blog post for valid slug', async () => {
      const post = mockPosts[0];
      renderWithRouter(`/blog/${post.slug}`);
      
      await waitFor(() => {
        const postElement = screen.getByTestId('blog-post');
        expect(postElement).toBeInTheDocument();
        expect(postElement).toHaveTextContent(post.title);
      });
    });

    it('redirects to 404 for invalid blog post slug', async () => {
      // Mock error state
      jest.spyOn(require('../../hooks/useBlogQuery'), 'useBlogQuery').mockImplementationOnce(() => ({
        data: null,
        isLoading: false,
        error: new Error('Not found')
      }));

      renderWithRouter('/blog/invalid-post');
      await waitFor(() => {
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
      });
    });
  });

  describe('List Pages', () => {
    it('handles category pages', async () => {
      renderWithRouter('/blog/category/typescript');
      await waitFor(() => {
        expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      });
    });

    it('handles search pages', async () => {
      renderWithRouter('/blog/search');
      await waitFor(() => {
        expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      });
    });

    it('handles archive pages', async () => {
      renderWithRouter('/blog/archive');
      await waitFor(() => {
        expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      });
    });

    it('handles author pages', async () => {
      renderWithRouter('/blog/author/john-doe');
      await waitFor(() => {
        expect(screen.getByTestId('blog-list')).toBeInTheDocument();
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading spinner initially', async () => {
      // Mock loading state
      jest.spyOn(require('../../hooks/useBlogQuery'), 'useBlogQuery').mockImplementationOnce(() => ({
        data: null,
        isLoading: true,
        error: null
      }));

      renderWithRouter('/blog');
      await waitFor(() => {
        expect(screen.getByText('Loading blog content...')).toBeInTheDocument();
        expect(screen.getByText('Loading blog content...').parentElement?.querySelector('.animate-spin')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      // Mock error state for all tests in this block
      jest.spyOn(require('../../hooks/useBlogQuery'), 'useBlogQuery').mockImplementation(() => ({
        data: null,
        isLoading: false,
        error: new Error('Not found')
      }));
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('redirects to 404 for invalid routes', async () => {
      renderWithRouter('/blog/invalid/path');
      await waitFor(() => {
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
      });
    });

    it('redirects to 404 for malformed slugs', async () => {
      renderWithRouter('/blog/post@with@invalid@chars');
      await waitFor(() => {
        expect(screen.getByTestId('not-found')).toBeInTheDocument();
        expect(screen.getByText('404')).toBeInTheDocument();
      });
    });
  });

  describe('Styling', () => {
    const className = 'custom-class';

    it('passes className to blog list', async () => {
      renderWithRouter('/blog', className);
      await waitFor(() => {
        const blogList = screen.getByTestId('blog-list');
        expect(blogList).toHaveClass(className);
      });
    });

    it('passes className to blog post', async () => {
      const post = mockPosts[0];
      renderWithRouter(`/blog/${post.slug}`, className);
      await waitFor(() => {
        const blogPost = screen.getByTestId('blog-post');
        expect(blogPost).toHaveClass(className);
      });
    });

    it('passes className to loading spinner container', async () => {
      // Mock loading state
      jest.spyOn(require('../../hooks/useBlogQuery'), 'useBlogQuery').mockImplementationOnce(() => ({
        data: null,
        isLoading: true,
        error: null
      }));

      renderWithRouter('/blog', className);
      await waitFor(() => {
        const spinnerContainer = screen.getByText('Loading blog content...').parentElement?.parentElement;
        expect(spinnerContainer).toHaveClass(className);
      });
    });
  });
});