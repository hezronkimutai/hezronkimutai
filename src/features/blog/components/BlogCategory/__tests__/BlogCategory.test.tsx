import React from 'react';
import { render, screen } from '@testing-library/react';
import { BlogCategory } from '../index';
import { useParams } from 'react-router-dom';

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('BlogCategory', () => {
  beforeEach(() => {
    // Reset mock before each test
    (useParams as jest.Mock).mockReset();
  });

  it('renders correctly with category ID', () => {
    // Mock useParams to return a test category ID
    (useParams as jest.Mock).mockReturnValue({ categoryId: 'test-category' });

    render(<BlogCategory />);
    
    // Check if the category ID is displayed
    expect(screen.getByText(/Blog Category: test-category/)).toBeInTheDocument();
  });

  it('handles different category IDs', () => {
    // Test with a different category ID
    (useParams as jest.Mock).mockReturnValue({ categoryId: 'another-category' });

    render(<BlogCategory />);
    
    // Check if the new category ID is displayed
    expect(screen.getByText(/Blog Category: another-category/)).toBeInTheDocument();
  });
});