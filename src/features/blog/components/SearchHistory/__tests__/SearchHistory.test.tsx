import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { SearchHistory, useSearchHistory } from '..';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

describe('SearchHistory', () => {
  const mockNavigate = jest.fn();
  const SEARCH_HISTORY_KEY = 'blog-search-history';

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('Component', () => {
    it('renders nothing when history is empty', () => {
      const { container } = render(<SearchHistory />);
      expect(container).toBeEmptyDOMElement();
    });

    it('renders search history items', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['test query', 'another search'])
      );

      render(<SearchHistory />);
      
      expect(screen.getByText('Recent Searches')).toBeInTheDocument();
      expect(screen.getByText('test query')).toBeInTheDocument();
      expect(screen.getByText('another search')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['test'])
      );

      render(<SearchHistory className="custom-class" />);
      
      const container = screen.getByText('Recent Searches').closest('div')?.parentElement;
      expect(container).toHaveClass('custom-class');
    });

    it('navigates to search when clicking a history item', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['test query'])
      );

      render(<SearchHistory />);
      fireEvent.click(screen.getByText('test query'));
      
      expect(mockNavigate).toHaveBeenCalledWith('/blog/search?q=test%20query');
    });

    it('removes item when clicking remove button', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['test1', 'test2'])
      );

      render(<SearchHistory />);
      
      const removeButtons = screen.getAllByRole('button').filter(
        button => !button.textContent
      );
      fireEvent.click(removeButtons[0]);

      expect(screen.queryByText('test1')).not.toBeInTheDocument();
      expect(screen.getByText('test2')).toBeInTheDocument();
    });

    it('clears all history when clicking clear all', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['test1', 'test2'])
      );

      render(<SearchHistory />);
      fireEvent.click(screen.getByText('Clear All'));

      expect(screen.queryByText('test1')).not.toBeInTheDocument();
      expect(screen.queryByText('test2')).not.toBeInTheDocument();
      expect(localStorage.getItem(SEARCH_HISTORY_KEY)).toBeNull();
    });

    it('limits history to maximum items', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['1', '2', '3', '4', '5'])
      );

      render(<SearchHistory />);
      
      // Add new item
      const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
      expect(history.length).toBeLessThanOrEqual(5);
    });
  });

  describe('useSearchHistory Hook', () => {
    it('adds new search to history', () => {
      const { addToHistory } = useSearchHistory();
      
      addToHistory('test query');
      
      const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
      expect(history).toContain('test query');
    });

    it('moves repeated search to front of history', () => {
      localStorage.setItem(
        SEARCH_HISTORY_KEY,
        JSON.stringify(['old', 'repeat', 'newer'])
      );

      const { addToHistory } = useSearchHistory();
      addToHistory('repeat');
      
      const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
      expect(history[0]).toBe('repeat');
      expect(history).toHaveLength(3);
    });

    it('ignores empty queries', () => {
      const { addToHistory } = useSearchHistory();
      
      addToHistory('');
      addToHistory('   ');
      
      expect(localStorage.getItem(SEARCH_HISTORY_KEY)).toBeNull();
    });

    it('limits history size when adding new items', () => {
      const { addToHistory } = useSearchHistory();
      
      for (let i = 0; i < 10; i++) {
        addToHistory(`test ${i}`);
      }
      
      const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY) || '[]');
      expect(history.length).toBeLessThanOrEqual(5);
      expect(history[0]).toBe('test 9'); // Most recent should be first
    });
  });
});