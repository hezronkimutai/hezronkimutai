import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogList } from '../BlogList';
import { mockPosts } from '../../../types/blog';

// Create more mock posts for pagination testing
const extendedMockPosts = [
  ...mockPosts,
  {
    ...mockPosts[0],
    id: '3',
    title: 'Third Post',
  },
  {
    ...mockPosts[0],
    id: '4',
    title: 'Fourth Post',
  },
];

// Mock child components
jest.mock('../../BlogPost', () => ({
  BlogPost: ({ title }: { title: string }) => (
    <article data-testid="blog-post">{title}</article>
  ),
}));

jest.mock('../../../../home/components/Pagination', () => ({
  Pagination: ({
    currentPage,
    totalPages,
    onNext,
    onPrev,
  }: {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
  }) => (
    <nav data-testid="pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </nav>
  ),
}));

describe('BlogList Component', () => {
  const defaultProps = {
    data: {
      posts: extendedMockPosts,
      total: extendedMockPosts.length,
      page: 1,
      perPage: 2, // Show 2 posts per page to test pagination
      totalPages: Math.ceil(extendedMockPosts.length / 2),
    },
  };

  describe('Rendering', () => {
    it('renders posts correctly', () => {
      render(<BlogList {...defaultProps} />);

      // Check title
      expect(screen.getByText('Latest Posts')).toBeInTheDocument();

      // Check posts (only first page)
      const posts = screen.getAllByTestId('blog-post');
      expect(posts).toHaveLength(defaultProps.data.perPage);

      // Verify first page post titles
      defaultProps.data.posts.slice(0, defaultProps.data.perPage).forEach(post => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });

    it('renders with custom title', () => {
      const customTitle = 'My Blog Posts';
      render(<BlogList {...defaultProps} title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(
        <BlogList {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Pagination', () => {
    it('renders pagination when there are multiple pages', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    it('hides pagination for single page', () => {
      const singlePageProps = {
        data: {
          ...defaultProps.data,
          posts: mockPosts.slice(0, 1),
          total: 1,
          totalPages: 1,
        },
      };

      render(<BlogList {...singlePageProps} />);
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('calls onPageChange when navigating', () => {
      const onPageChange = jest.fn();
      render(<BlogList {...defaultProps} onPageChange={onPageChange} />);

      // Try to navigate to next page
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      expect(onPageChange).toHaveBeenCalledWith(2);

      // Try to navigate back
      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner', () => {
      render(<BlogList {...defaultProps} isLoading />);

      expect(screen.getByRole('status')).toHaveTextContent(/loading blog posts/i);
      expect(screen.getByText(/loading blog posts/i)).toBeInTheDocument();
    });

    it('hides content while loading', () => {
      render(<BlogList {...defaultProps} isLoading />);

      expect(screen.queryByTestId('blog-post')).not.toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('sets proper aria-busy attribute', () => {
      const { rerender } = render(<BlogList {...defaultProps} isLoading />);
      expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'true');

      rerender(<BlogList {...defaultProps} isLoading={false} />);
      expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'false');
    });
  });

  describe('Empty State', () => {
    it('shows empty message when no posts', () => {
      const emptyProps = {
        data: {
          ...defaultProps.data,
          posts: [],
          total: 0,
          totalPages: 0,
        },
      };

      render(<BlogList {...emptyProps} />);
      const emptyMessage = screen.getByText(/no blog posts found/i);
      expect(emptyMessage).toBeInTheDocument();
      expect(emptyMessage).toHaveAccessibleName(/no blog posts found/i);
    });

    it('hides pagination when empty', () => {
      const emptyProps = {
        data: {
          ...defaultProps.data,
          posts: [],
          total: 0,
          totalPages: 0,
        },
      };

      render(<BlogList {...emptyProps} />);
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section with proper ARIA labeling', () => {
      render(<BlogList {...defaultProps} />);
      const section = screen.getByRole('region', { name: 'Latest Posts' });
      expect(section).toBeInTheDocument();
    });

    it('provides status messages for loading state', () => {
      render(<BlogList {...defaultProps} isLoading />);
      const status = screen.getByRole('status');
      expect(status).toHaveAccessibleName(/loading blog posts/i);
    });

    it('provides status message for empty state', () => {
      const emptyProps = {
        data: {
          ...defaultProps.data,
          posts: [],
          total: 0,
          totalPages: 0,
        },
      };

      render(<BlogList {...emptyProps} />);
      const status = screen.getByRole('status');
      expect(status).toHaveAccessibleName(/no blog posts found/i);
    });

    it('uses proper heading hierarchy', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Latest Posts');
    });
  });

  describe('Performance', () => {
    it('is memoized', () => {
      expect(BlogList.displayName).toBe('BlogList');
    });
  });
});