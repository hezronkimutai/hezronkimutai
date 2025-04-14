import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CategoryFilter } from '..';
import { useBlogQueries } from '../../../hooks/useBlogQueries';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}));

// Mock useBlogQueries hook
jest.mock('../../../hooks/useBlogQueries');

describe('CategoryFilter', () => {
  const mockNavigate = jest.fn();
  const mockCategories = [
    { id: '1', name: 'Technology', slug: 'technology' },
    { id: '2', name: 'Design', slug: 'design', description: 'Design topics' }
  ];

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), jest.fn()]);
    (useBlogQueries as jest.Mock).mockReturnValue({
      useCategoriesQuery: () => ({
        data: mockCategories,
        isLoading: false
      })
    });
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders categories list', () => {
      render(<CategoryFilter />);

      expect(screen.getByText('Categories')).toBeInTheDocument();
      expect(screen.getByText('Technology')).toBeInTheDocument();
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Design topics')).toBeInTheDocument();
    });

    it('renders loading state', () => {
      (useBlogQueries as jest.Mock).mockReturnValue({
        useCategoriesQuery: () => ({
          isLoading: true
        })
      });

      render(<CategoryFilter />);

      // Should find 4 skeleton loading items
      const skeletons = screen.getAllByRole('generic').filter(
        el => el.className.includes('bg-gray-200')
      );
      expect(skeletons).toHaveLength(5); // 4 items + 1 title
    });

    it('renders nothing when no categories', () => {
      (useBlogQueries as jest.Mock).mockReturnValue({
        useCategoriesQuery: () => ({
          data: [],
          isLoading: false
        })
      });

      const { container } = render(<CategoryFilter />);
      expect(container).toBeEmptyDOMElement();
    });

    it('applies custom className', () => {
      render(<CategoryFilter className="custom-class" />);
      
      const container = screen.getByRole('heading', { name: 'Categories' }).closest('div');
      expect(container).toHaveClass('custom-class');
    });
  });

  describe('Category Selection', () => {
    it('handles category selection', () => {
      render(<CategoryFilter />);
      
      fireEvent.click(screen.getByText('Technology'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: 'category=technology'
      });
    });

    it('handles category deselection', () => {
      const searchParams = new URLSearchParams('category=technology&category=design');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, jest.fn()]);

      render(<CategoryFilter />);
      
      fireEvent.click(screen.getByText('Technology'));

      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: 'category=design'
      });
    });

    it('preserves other search params when selecting category', () => {
      const searchParams = new URLSearchParams('q=test&sort=date');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, jest.fn()]);

      render(<CategoryFilter />);
      
      fireEvent.click(screen.getByText('Technology'));

      const newSearch = new URLSearchParams(
        mockNavigate.mock.calls[0][0].search
      );
      expect(newSearch.get('q')).toBe('test');
      expect(newSearch.get('sort')).toBe('date');
      expect(newSearch.get('category')).toBe('technology');
    });
  });

  describe('Visual States', () => {
    it('highlights selected categories', () => {
      const searchParams = new URLSearchParams('category=technology');
      (useSearchParams as jest.Mock).mockReturnValue([searchParams, jest.fn()]);

      render(<CategoryFilter />);
      
      const selectedButton = screen.getByText('Technology').closest('button');
      const unselectedButton = screen.getByText('Design').closest('button');

      expect(selectedButton).toHaveClass('bg-blue-50', 'text-blue-700');
      expect(unselectedButton).not.toHaveClass('bg-blue-50', 'text-blue-700');
    });

    it('shows category description when available', () => {
      render(<CategoryFilter />);
      
      expect(screen.getByText('Design topics')).toHaveClass('text-gray-500');
    });
  });
});