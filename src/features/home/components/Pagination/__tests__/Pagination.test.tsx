import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from '../Pagination';

describe('Pagination Component', () => {
  const defaultProps = {
    currentPage: 2,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders pagination information correctly', () => {
    render(<Pagination {...defaultProps} />);
    const pageInfo = screen.getByText((content) => content.includes('Page') && content.includes(`${defaultProps.currentPage}`));
    expect(pageInfo.parentElement).toHaveTextContent(`Page ${defaultProps.currentPage} of ${defaultProps.totalPages}`);
  });

  it('calls onPageChange with next page when next button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with previous page when previous button is clicked', () => {
    render(<Pagination {...defaultProps} />);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('disables previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Pagination {...defaultProps} className="custom-pagination" />
    );
    expect(container.firstChild).toHaveClass('custom-pagination');
  });

  it('maintains button accessibility when disabled', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByLabelText('Previous page');
    
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveAttribute('aria-label', 'Previous page');
  });

  describe('Edge Cases', () => {
    it('handles single page case', () => {
      render(
        <Pagination
          currentPage={1}
          totalPages={1}
          onPageChange={defaultProps.onPageChange}
        />
      );
      
      expect(screen.getByLabelText('Previous page')).toBeDisabled();
      expect(screen.getByLabelText('Next page')).toBeDisabled();
      const pageInfo = screen.getByText((content) => content.includes('Page') && content.includes('1'));
      expect(pageInfo.parentElement).toHaveTextContent('Page 1 of 1');
    });

    it('renders correctly with zero pages', () => {
      render(
        <Pagination
          currentPage={0}
          totalPages={0}
          onPageChange={defaultProps.onPageChange}
        />
      );
      const pageInfo = screen.getByText((content) => content.includes('Page') && content.includes('0'));
      expect(pageInfo.parentElement).toHaveTextContent('Page 0 of 0');
    });
  });
});