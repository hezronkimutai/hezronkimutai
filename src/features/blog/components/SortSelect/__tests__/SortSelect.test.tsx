import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SortSelect } from '..';

// Mock react-router-dom hooks
jest.mock('react-router-dom', () => ({
  useSearchParams: jest.fn(),
  useNavigate: jest.fn()
}));

describe('SortSelect', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('renders with default sort option', () => {
    const mockSearchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    expect(screen.getByLabelText('Sort by:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('date');
    expect(screen.getByText('Most Recent')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const mockSearchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect className="custom-class" />);
    
    const container = screen.getByLabelText('Sort by:').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('shows current sort from URL params', () => {
    const mockSearchParams = new URLSearchParams('sortBy=popularity');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    expect(screen.getByRole('combobox')).toHaveValue('popularity');
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('handles sort change', () => {
    const mockSearchParams = new URLSearchParams('sortBy=date');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'relevance' } });
    
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/blog/search',
      search: 'sortBy=relevance'
    });
  });

  it('preserves other search parameters when changing sort', () => {
    const mockSearchParams = new URLSearchParams('q=test&page=2&sortBy=date');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'popularity' } });
    
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/blog/search',
      search: 'q=test&page=2&sortBy=popularity'
    });
  });

  it('renders all sort options', () => {
    const mockSearchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    
    expect(screen.getByText('Most Recent')).toBeInTheDocument();
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
    expect(screen.getByText('Most Relevant')).toBeInTheDocument();
  });

  it('has accessible label and select', () => {
    const mockSearchParams = new URLSearchParams('');
    (useSearchParams as jest.Mock).mockReturnValue([mockSearchParams]);

    render(<SortSelect />);
    
    const label = screen.getByText('Sort by:');
    const select = screen.getByRole('combobox');
    
    expect(label).toHaveAttribute('for', 'sort');
    expect(select).toHaveAttribute('id', 'sort');
  });
});