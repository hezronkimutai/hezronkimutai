import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BlogList } from '../BlogList';
import { BlogPost } from '../../../types';

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'First Post',
    slug: 'first-post',
    excerpt: 'This is the first post',
    content: 'First post content',
    author: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2025-04-01T00:00:00Z',
    updatedAt: '2025-04-01T00:00:00Z',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Second Post',
    slug: 'second-post',
    excerpt: 'This is the second post',
    content: 'Second post content',
    author: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2025-04-02T00:00:00Z',
    updatedAt: '2025-04-02T00:00:00Z',
    readTime: 3,
  },
];

// Create more mock posts for pagination testing
const extendedMockPosts: BlogPost[] = [
  ...mockPosts,
  {
    id: '3',
    title: 'Third Post',
    slug: 'third-post',
    excerpt: 'This is the third post',
    content: 'Third post content',
    author: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2025-04-03T00:00:00Z',
    updatedAt: '2025-04-03T00:00:00Z',
    readTime: 4,
  },
  {
    id: '4',
    title: 'Fourth Post',
    slug: 'fourth-post',
    excerpt: 'This is the fourth post',
    content: 'Fourth post content',
    author: {
      id: '1',
      name: 'John Doe',
    },
    createdAt: '2025-04-04T00:00:00Z',
    updatedAt: '2025-04-04T00:00:00Z',
    readTime: 6,
  },
];

describe('BlogList Component', () => {
  const defaultProps = {
    posts: extendedMockPosts,
    currentPage: 1,
    totalPages: Math.ceil(extendedMockPosts.length / 2), // Should be 2
    onPageChange: jest.fn(),
  };

  describe('Rendering', () => {
    it('renders posts correctly', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByText('Latest Posts')).toBeInTheDocument();
      extendedMockPosts.forEach(post => {
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
      
      // Find the pagination navigation element
      const paginationNav = screen.getByRole('navigation', { name: /pagination/i });
      expect(paginationNav).toBeInTheDocument();

      // Verify pagination content within the container
      within(paginationNav).getByRole('button', { name: /previous/i });
      within(paginationNav).getByRole('button', { name: /next/i });
      const pageText = within(paginationNav).getByText(/page/i).parentElement;
      expect(pageText).toHaveTextContent(`Page ${defaultProps.currentPage} of ${defaultProps.totalPages}`);
    });

    it('hides pagination for single page', () => {
      const singlePageProps = {
        ...defaultProps,
        posts: mockPosts.slice(0, 1),
        totalPages: 1,
      };

      render(<BlogList {...singlePageProps} />);
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('calls onPageChange when navigating', () => {
      const onPageChange = jest.fn();
      // Initial render on page 1
      render(<BlogList {...defaultProps} currentPage={1} onPageChange={onPageChange} />);
      
      // Find the pagination navigation element
      const paginationNav = screen.getByRole('navigation', { name: /pagination/i });
      expect(paginationNav).toBeInTheDocument();
      
      // Click next within the pagination nav
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      expect(onPageChange).toHaveBeenCalledWith(2);

      // We don't need to test the 'previous' button logic here if the Pagination component itself is tested.
      // This test focuses on BlogList passing the handler correctly.
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner', () => {
      render(<BlogList {...defaultProps} isLoading />);
      expect(screen.getByRole('status')).toHaveTextContent(/loading blog posts/i);
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
        ...defaultProps,
        posts: [],
        totalPages: 0,
      };

      render(<BlogList {...emptyProps} />);
      
      // Find the status container first
      const statusContainer = screen.getByRole('status');
      expect(statusContainer).toBeInTheDocument();
      expect(statusContainer).toHaveAttribute('aria-label', 'No blog posts found');
      
      // Then find the text content within
      const messageText = within(statusContainer).getByText(/no blog posts found/i);
      expect(messageText).toBeInTheDocument();
    });

    it('hides pagination when empty', () => {
      const emptyProps = {
        ...defaultProps,
        posts: [],
        totalPages: 0,
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
        ...defaultProps,
        posts: [],
        totalPages: 0,
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
});