import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BlogList } from '../index';
import { BlogPost, mockAuthor, mockCategories } from '../../../types/blog';

// Mock Pagination component
jest.mock('../../../../../shared/components/Pagination', () => ({
  Pagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="mock-pagination">
      <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  ),
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
  });

  it('renders loading state correctly', () => {
    render(<BlogList {...defaultProps} isLoading={true} />);
    expect(screen.getByText('Loading blog posts...')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'true');
  });

  it('renders empty state when no posts are available', () => {
    render(<BlogList {...defaultProps} posts={[]} />);
    expect(screen.getByText('No blog posts found')).toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('renders blog posts correctly', () => {
    render(<BlogList {...defaultProps} />);
    const posts = screen.getAllByTestId('blog-post');
    expect(posts).toHaveLength(3);
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test Post 3')).toBeInTheDocument();
  });

  it('renders pagination when totalPages > 1', () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByTestId('mock-pagination')).toBeInTheDocument();
  });

  it('does not render pagination when totalPages <= 1', () => {
    render(<BlogList {...defaultProps} totalPages={1} />);
    expect(screen.queryByTestId('mock-pagination')).not.toBeInTheDocument();
  });

  it('handles page change correctly', () => {
    render(<BlogList {...defaultProps} />);
    fireEvent.click(screen.getByText('Next'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
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
  });

  // Test memoization
  it('does not re-render when irrelevant props change', () => {
    const { rerender } = render(<BlogList {...defaultProps} />);
    const initialHTML = screen.getByRole('region').innerHTML;

    // Re-render with same posts but different className
    rerender(<BlogList {...defaultProps} className="different-class" />);
    expect(screen.getByRole('region').innerHTML).toBe(initialHTML);
  });

  it('uses correct aria labels', () => {
    render(<BlogList {...defaultProps} />);
    expect(screen.getByRole('region')).toHaveAttribute('aria-labelledby', 'blog-title');
    expect(screen.getByRole('region')).toHaveAttribute('aria-busy', 'false');
  });
});