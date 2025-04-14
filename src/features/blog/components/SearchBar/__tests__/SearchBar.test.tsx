import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchBar } from '..';
import { useSearchHistory } from '../../SearchHistory';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn()
}));

jest.mock('../../SearchHistory', () => ({
  useSearchHistory: jest.fn()
}));

// Mock lodash debounce to execute immediately in tests
jest.mock('lodash/debounce', () => (fn: Function) => fn);

describe('SearchBar', () => {
  const mockNavigate = jest.fn();
  const mockAddToHistory = jest.fn();
  const mockSetSearchParams = jest.fn();
  
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchHistory as jest.Mock).mockReturnValue({ addToHistory: mockAddToHistory });
    (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<SearchBar />);
      
      expect(screen.getByPlaceholderText('Search blog posts...')).toBeInTheDocument();
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<SearchBar className="custom-class" />);
      const container = screen.getByRole('searchbox').closest('div');
      expect(container?.parentElement?.className).toContain('custom-class');
    });

    it('uses custom placeholder text', () => {
      const placeholder = 'Custom placeholder';
      render(<SearchBar placeholder={placeholder} />);
      
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });

    it('shows clear button only when there is text', () => {
      render(<SearchBar />);
      expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument();

      // Add text to show clear button
      const input = screen.getByRole('searchbox');
      fireEvent.change(input, { target: { value: 'test' } });

      const clearButton = screen.getByTestId('clear-button');
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    it('updates search text and navigates on input change', async () => {
      render(<SearchBar />);
      const input = screen.getByRole('searchbox');
      
      fireEvent.change(input, { target: { value: 'test search' } });
      
      expect(input).toHaveValue('test search');
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: '?q=test%20search'
      });
      expect(mockAddToHistory).toHaveBeenCalledWith('test search');
    });

    it('navigates to blog home when search is cleared', () => {
      (useSearchParams as jest.Mock).mockReturnValue([
        new URLSearchParams('?q=test'),
        mockSetSearchParams
      ]);
      
      render(<SearchBar />);
      const clearButton = screen.getByTestId('clear-button');
      
      fireEvent.click(clearButton);
      
      expect(screen.getByRole('searchbox')).toHaveValue('');
      expect(mockNavigate).toHaveBeenCalledWith({ pathname: '/blog' });
    });

    it('handles empty search input', async () => {
      render(<SearchBar />);
      const input = screen.getByRole('searchbox');
      
      // Clear mocks before testing empty input
      mockNavigate.mockClear();
      mockAddToHistory.mockClear();

      // Add some text first to ensure the debounce function is properly initialized
      fireEvent.change(input, { target: { value: 'test' } });
      
      // Clear mocks again before testing empty input
      mockNavigate.mockClear();
      mockAddToHistory.mockClear();

      // Now test empty input
      fireEvent.change(input, { target: { value: '' } });

      // Wait for debounced function to execute
      await new Promise(resolve => setTimeout(resolve, 0));
      
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog'
      });
      expect(mockAddToHistory).not.toHaveBeenCalled();
    });

    it('encodes search query properly', () => {
      render(<SearchBar />);
      const input = screen.getByRole('searchbox');
      
      fireEvent.change(input, { target: { value: 'test & search' } });
      
      expect(mockNavigate).toHaveBeenCalledWith({
        pathname: '/blog/search',
        search: '?q=test%20%26%20search'
      });
    });
  });

  describe('URL Parameter Handling', () => {
    it('initializes with search query from URL', () => {
      (useSearchParams as jest.Mock).mockReturnValue([
        new URLSearchParams('?q=initial+search'),
        mockSetSearchParams
      ]);
      
      render(<SearchBar />);
      
      expect(screen.getByRole('searchbox')).toHaveValue('initial search');
    });
  });

  describe('Search History Integration', () => {
    it('adds search to history when query is entered', () => {
      render(<SearchBar />);
      
      fireEvent.change(screen.getByRole('searchbox'), {
        target: { value: 'test query' }
      });
      
      expect(mockAddToHistory).toHaveBeenCalledWith('test query');
    });

    it('does not add to history when search is cleared', () => {
      (useSearchParams as jest.Mock).mockReturnValue([
        new URLSearchParams('?q=test'),
        mockSetSearchParams
      ]);
      
      render(<SearchBar />);
      fireEvent.click(screen.getByTestId('clear-button'));
      
      expect(mockAddToHistory).not.toHaveBeenCalled();
    });
  });
});
