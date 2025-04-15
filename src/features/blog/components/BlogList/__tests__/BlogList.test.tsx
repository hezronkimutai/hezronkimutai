import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogList } from '../index';
import { BlogPost, mockAuthor, mockCategories } from '../../../types/blog';

// Mock Pagination component
jest.mock('../../../../../shared/components/Pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: any) => {
    return (
      <div data-testid="mock-pagination">
        <button
          data-testid="prev-button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <button
          data-testid="next-button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
        <span data-testid="page-info">Page {currentPage} of {totalPages}</span>
      </div>
    );
  },
}));

describe('BlogList', () => {
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'Test excerpt 1',
      content: 'Test content 1',
      author: mockAuthor,
      categories: [mockCategories[0]],
      publishedAt: '2025-04-14T12:00:00Z',
      readingTime: 5
    },
    {
      id: '2',
      title: 'Test Post 2',
      slug: 'test-post-2',
      excerpt: 'Test excerpt 2',
      content: 'Test content 2',
      author: mockAuthor,
      categories: [mockCategories[1]],
      publishedAt: '2025-04-14T13:00:00Z',
      readingTime: 3
    },
    {
      id: '3',
      title: 'Test Post 3',
      slug: 'test-post-3',
      excerpt: 'Test excerpt 3',
      content: 'Test content 3',
      author: mockAuthor,
      categories: [mockCategories[2]],
      publishedAt: '2025-04-14T14:00:00Z',
      readingTime: 4
    }
  ];

  const defaultProps = {
    posts: mockPosts,
    currentPage: 1,
    totalPages: 2,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clean up DOM after each test
    document.body.innerHTML = '';
  });

  describe('Loading State', () => {
    it('renders loading state correctly', () => {
      render(<BlogList {...defaultProps} isLoading={true} />);
      expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();
      expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading blog posts');
    });

    it('hides posts and pagination while loading', () => {
      render(<BlogList {...defaultProps} isLoading={true} />);
      expect(screen.queryByTestId('blog-post')).not.toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('renders empty state when no posts are available', () => {
      render(<BlogList {...defaultProps} posts={[]} />);
      expect(screen.getByText('No blog posts found')).toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('maintains correct accessibility attributes in empty state', () => {
      const { container } = render(<BlogList {...defaultProps} posts={[]} />);
      
      // Test container region role
      const region = container.querySelector('[role="region"]');
      expect(region).toHaveAttribute('aria-busy', 'false');
      
      // Test empty state status role and ARIA attributes
      const status = container.querySelector('[role="status"]');
      expect(status).toHaveAttribute('aria-live', 'polite');
      expect(status).toHaveAttribute('aria-label', 'No blog posts found');
      
      // Update test to use proper role
      // Test heading for proper structure
      const heading = region?.querySelector('h2');
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Latest Posts');
    });
  });

  describe('Content Rendering', () => {
    it('renders blog posts correctly', () => {
      render(<BlogList {...defaultProps} />);
      const posts = screen.getAllByTestId('blog-post');
      expect(posts).toHaveLength(3);
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
      expect(screen.getByText('Test Post 3')).toBeInTheDocument();
    });

    it('uses default title when not provided', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByText('Latest Posts')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      const customTitle = 'Custom Blog Title';
      render(<BlogList {...defaultProps} title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-blog-list';
      render(<BlogList {...defaultProps} className={customClass} />);
      expect(screen.getByRole('region')).toHaveClass(customClass);
      expect(screen.getByRole('region')).toHaveClass('container', 'mx-auto', 'px-4', 'py-8');
    });

    it('trims className properly', () => {
      render(<BlogList {...defaultProps} className="" />);
      const element = screen.getByRole('region');
      expect(element.className.trim()).toBe('container mx-auto px-4 py-8');
      expect(element.className).not.toContain('  '); // No double spaces
    });
  });

  describe('Pagination', () => {
    it('renders pagination when totalPages > 1', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
    });

    it('does not render pagination when totalPages <= 1', () => {
      render(<BlogList {...defaultProps} totalPages={1} />);
      expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
    });

    it('handles page change correctly', () => {
      const { rerender } = render(<BlogList {...defaultProps} />);
      
      // Test next page
      fireEvent.click(screen.getByTestId('next-button'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);

      // Test previous page from page 2
      defaultProps.onPageChange.mockClear();
      rerender(<BlogList {...defaultProps} currentPage={2} />);
      
      fireEvent.click(screen.getByTestId('prev-button'));
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
    });
  });

  describe('Memoization', () => {
    it('does not re-render when irrelevant props change', () => {
      const { rerender } = render(<BlogList {...defaultProps} />);
      const initialHTML = screen.getByRole('region').innerHTML;

      // Re-render with same posts but different className
      rerender(<BlogList {...defaultProps} className="different-class" />);
      expect(screen.getByRole('region').innerHTML).toBe(initialHTML);
    });

    it('re-renders when posts change', () => {
      const { rerender } = render(<BlogList {...defaultProps} />);
      const initialHTML = screen.getByRole('region').innerHTML;

      // Re-render with different posts
      const newPosts = [...mockPosts, {
        ...mockPosts[0],
        id: '4',
        title: 'Test Post 4'
      }];
      rerender(<BlogList {...defaultProps} posts={newPosts} />);
      
      expect(screen.getByRole('region').innerHTML).not.toBe(initialHTML);
      expect(screen.getByText('Test Post 4')).toBeInTheDocument();
    });

    it('re-renders when currentPage changes', () => {
      const { rerender } = render(<BlogList {...defaultProps} />);
      const initialPage = screen.getByText('Page 1 of 2');

      rerender(<BlogList {...defaultProps} currentPage={2} />);
      
      // Check that old page text is not present and new page text is
      const oldPageText = 'Page 1 of 2';
      const newPageText = 'Page 2 of 2';
      expect(screen.queryByText(oldPageText)).not.toBeInTheDocument();
      expect(screen.getByText(newPageText)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses correct aria labels in default state', () => {
      render(<BlogList {...defaultProps} />);
      expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'blog-title');
      expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'false');
    });

    it('maintains heading hierarchy', () => {
      render(<BlogList {...defaultProps} />);
      const mainHeading = screen.getByRole('heading', { level: 2 });
      expect(mainHeading).toHaveAttribute('id', 'blog-title');
      
      const postHeadings = screen.getAllByRole('heading', { level: 3 });
      expect(postHeadings).toHaveLength(mockPosts.length);
    });
  });
});
