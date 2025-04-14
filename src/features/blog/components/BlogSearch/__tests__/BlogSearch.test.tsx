import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import BlogSearch from '..';
import { useBlogQueries } from '../../../hooks/useBlogQueries';

// Mock child components
jest.mock('../../SearchBar', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-bar">SearchBar</div>
}));

jest.mock('../../SearchResults', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-results">SearchResults</div>
}));

jest.mock('../../SearchHistory', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-history">SearchHistory</div>
}));

jest.mock('../../CategoryFilter', () => ({
  CategoryFilter: () => <div data-testid="mock-category-filter">CategoryFilter</div>
}));

jest.mock('../../FilterTag', () => ({
  __esModule: true,
  default: ({ onRemove }: { onRemove: (slug: string) => void }) => (
    <div data-testid="mock-filter-tags" onClick={() => onRemove('technology')}>
      FilterTags
    </div>
  )
}));

jest.mock('../../SortSelect', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-sort-select">SortSelect</div>
}));

jest.mock('../../AdvancedFilters', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-advanced-filters">AdvancedFilters</div>
}));

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
  useNavigate: jest.fn()
}));

// Mock useBlogQueries hook
jest.mock('../../../hooks/useBlogQueries');

describe('BlogSearch', () => {
  const mockNavigate = jest.fn();
  const mockSearchParams = new URLSearchParams();
  const mockSetSearchParams = jest.fn();
  
  const mockCategories = [
    { id: '1', name: 'Technology', slug: 'technology' },
    { id: '2', name: 'Design', slug: 'design' }
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams, mockSetSearchParams]);
    (useBlogQueries as jest.Mock).mockReturnValue({
      useCategoriesQuery: () => ({
        data: mockCategories,
        isLoading: false,
        error: null
      })
    });
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all search components', () => {
      render(<BlogSearch />);

      expect(screen.getByText('Search Blog Posts')).toBeInTheDocument();
      expect(screen.getByTestId('mock-search-bar')).toBeInTheDocument();
      expect(screen.getByTestId('mock-search-results')).toBeInTheDocument();
      expect(screen.getByTestId('mock-search-history')).toBeInTheDocument();
      expect(screen.getByTestId('mock-category-filter')).toBeInTheDocument();
      expect(screen.getByTestId('mock-filter-tags')).toBeInTheDocument();
      expect(screen.getByTestId('mock-sort-select')).toBeInTheDocument();
      expect(screen.getByTestId('mock-advanced-filters')).toBeInTheDocument();
    });

    it('maintains correct layout structure', () => {
      render(<BlogSearch />);
      const container = screen.getByText('Search Blog Posts').closest('.container');
      expect(container).toBeInTheDocument();
      
      
      const mainSection = screen.getByTestId('mock-search-results').closest('.lg\\:col-span-3');
      expect(mainSection).toBeInTheDocument();
    });
  });

  describe('Category Handling', () => {
    it('creates category tags from search params', () => {
      const searchParams = new URLSearchParams('category=technology&category=design');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);

      render(<BlogSearch />);
      
      const filterTags = screen.getByTestId('mock-filter-tags');
      expect(filterTags).toBeInTheDocument();
    });

    it('removes category when handleRemoveCategory is called', () => {
      const searchParams = new URLSearchParams('category=technology&category=design');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);

      render(<BlogSearch />);
      // Click the filter tag which will trigger onRemove('technology')
      fireEvent.click(screen.getByTestId('mock-filter-tags'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: 'category=design'
      });

      // Verify it doesn't contain the removed category
      expect(mockNavigate).not.toHaveBeenCalledWith(
        {
          pathname: '/blog/search',
          search: expect.stringContaining('category=technology')
        }
      );
    });
  });

  describe('Error Handling', () => {
    it('handles missing category data gracefully', () => {
      (useBlogQueries as jest.Mock).mockReturnValue({
        useCategoriesQuery: () => ({
          data: null,
          isLoading: false,
          error: null
        })
      });

      const searchParams = new URLSearchParams('category=unknown');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, mockSetSearchParams]);

      render(<BlogSearch />);
      
      const filterTags = screen.getByTestId('mock-filter-tags');
      expect(filterTags).toBeInTheDocument();
    });
  });

  describe('Layout Responsiveness', () => {
    it('applies responsive grid classes', () => {
      render(<BlogSearch />);
      
      const mainGrid = screen.getByTestId('mock-search-results').closest('.grid');
      expect(mainGrid).toBeTruthy();
      expect(mainGrid?.classList.contains('grid')).toBe(true);
      expect(mainGrid?.classList.contains('grid-cols-1')).toBe(true);
      expect(mainGrid?.classList.contains('lg:grid-cols-4')).toBe(true);
      expect(mainGrid?.classList.contains('gap-8')).toBe(true);

      const sidebar = screen.getByTestId('mock-category-filter').closest('.lg\\:col-span-1');
      expect(sidebar).toBeTruthy();
      expect(sidebar?.classList.contains('lg:col-span-1')).toBe(true);
    });
  });
});