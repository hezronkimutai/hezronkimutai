import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';
import { SearchResults } from '..';
import { useBlogQueries } from '../../../hooks/useBlogQueries';
import { BlogPost } from '../../../types';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn()
}));

jest.mock('../../../hooks/useBlogQueries');

describe('SearchResults', () => {
  const mockSetSearchParams = jest.fn();
  const mockUseSearchQuery = jest.fn();
  
  const mockAuthor = {
    id: '1',
    name: 'Test Author'
  };

  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Test Post 1',
      slug: 'test-post-1',
      excerpt: 'Test excerpt 1',
      content: 'Test content 1',
      publishedAt: '2024-04-14T15:00:00Z',
      readingTime: 5,
      featuredImage: 'https://example.com/image1.jpg',
      author: mockAuthor,
      categories: []
    },
    {
      id: '2',
      title: 'Test Post 2',
      slug: 'test-post-2',
      excerpt: 'Test excerpt 2',
      content: 'Test content 2',
      publishedAt: '2024-04-14T16:00:00Z',
      readingTime: 3,
      author: mockAuthor,
      categories: []
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams({ q: 'test' }),
      mockSetSearchParams
    ]);

    (useBlogQueries as jest.Mock).mockReturnValue({
      useSearchQuery: mockUseSearchQuery
    });
  });

  it('shows loading state', () => {
    mockUseSearchQuery.mockReturnValue({ isLoading: true });
    
    render(<SearchResults />);
    
    expect(screen.getByText('Loading results...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseSearchQuery.mockReturnValue({ error: new Error('Test error') });
    
    render(<SearchResults />);
    
    expect(screen.getByText('Error loading search results. Please try again.')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    mockUseSearchQuery.mockReturnValue({
      data: { posts: [], totalCount: 0, currentPage: 1, totalPages: 0 }
    });
    
    render(<SearchResults />);
    
    expect(screen.getByText('No results found for "test"')).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search terms/)).toBeInTheDocument();
  });

  it('renders search results', () => {
    mockUseSearchQuery.mockReturnValue({
      data: {
        posts: mockPosts,
        totalCount: 2,
        currentPage: 1,
        totalPages: 1
      }
    });
    
    render(<SearchResults />);
    
    expect(screen.getByText('Search Results for "test"')).toBeInTheDocument();
    expect(screen.getByText('Found 2 posts')).toBeInTheDocument();
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 1')).toBeInTheDocument();
    expect(screen.getByText('Test excerpt 2')).toBeInTheDocument();
  });

  it('shows pagination when needed', () => {
    mockUseSearchQuery.mockReturnValue({
      data: {
        posts: mockPosts,
        totalCount: 20,
        currentPage: 1,
        totalPages: 2
      }
    });
    
    render(<SearchResults />);
    
    // Find pagination component
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
    
    // Click next page
    const nextButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextButton);
    
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('handles search parameters correctly', () => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams({ 
        q: 'test',
        page: '2',
        sortBy: 'date'
      }),
      mockSetSearchParams
    ]);

    mockUseSearchQuery.mockReturnValue({
      data: {
        posts: mockPosts,
        totalCount: 20,
        currentPage: 2,
        totalPages: 2
      }
    });
    
    render(<SearchResults />);
    
    // Verify search query was made with correct parameters
    expect(mockUseSearchQuery).toHaveBeenCalledWith({
      search: 'test',
      page: 2,
      limit: 10,
      sortBy: 'date'
    });
  });

  it('displays featured image when available', () => {
    mockUseSearchQuery.mockReturnValue({
      data: {
        posts: mockPosts,
        totalCount: 2,
        currentPage: 1,
        totalPages: 1
      }
    });
    
    render(<SearchResults />);
    
    const coverImage = screen.getByRole('img', { name: 'Test Post 1' });
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('formats dates correctly', () => {
    mockUseSearchQuery.mockReturnValue({
      data: {
        posts: mockPosts,
        totalCount: 2,
        currentPage: 1,
        totalPages: 1
      }
    });
    
    render(<SearchResults />);
    
    // Get the first article specifically
    const firstArticle = screen.getAllByRole('article')[0];
    const formattedDate = new Date('2024-04-14T15:00:00Z').toLocaleDateString();
    expect(within(firstArticle).getByText(formattedDate)).toBeInTheDocument();
  });
});
