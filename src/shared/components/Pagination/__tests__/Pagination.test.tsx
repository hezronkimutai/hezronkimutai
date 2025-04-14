import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../index';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders zero pages state correctly', () => {
    render(<Pagination {...defaultProps} totalPages={0} />);
    
    const nav = screen.getByLabelText('Pagination');
    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    
    expect(nav).toBeInTheDocument();
    expect(screen.getByText('Page 0')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(prevButton).toHaveClass('cursor-not-allowed');
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('renders pagination with correct page numbers', () => {
    render(<Pagination {...defaultProps} currentPage={2} totalPages={5} />);
    
    expect(screen.getByText('Page 2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('disables Previous button on first page', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass('cursor-not-allowed');
  });

  it('disables Next button on last page', () => {
    render(<Pagination {...defaultProps} currentPage={5} totalPages={5} />);
    
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass('cursor-not-allowed');
  });

  it('enables both buttons when on middle page', () => {
    render(<Pagination {...defaultProps} currentPage={3} totalPages={5} />);
    
    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');
    expect(prevButton).not.toBeDisabled();
    expect(nextButton).not.toBeDisabled();
    expect(prevButton).not.toHaveClass('cursor-not-allowed');
    expect(nextButton).not.toHaveClass('cursor-not-allowed');
  });

  it('calls onPageChange with correct value when Previous is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    const prevButton = screen.getByLabelText('Previous page');
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
  });

  it('calls onPageChange with correct value when Next is clicked', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    
    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  it('does not call onPageChange when clicking disabled buttons', () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    
    const prevButton = screen.getByLabelText('Previous page');
    fireEvent.click(prevButton);
    expect(defaultProps.onPageChange).not.toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    const customClass = 'custom-pagination';
    render(<Pagination {...defaultProps} className={customClass} />);
    
    const nav = screen.getByLabelText('Pagination');
    expect(nav).toHaveClass(customClass);
  });

  it('maintains proper button states during navigation', () => {
    const { rerender } = render(<Pagination {...defaultProps} currentPage={1} />);
    
    // Initial state (first page)
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();

    // Middle page
    rerender(<Pagination {...defaultProps} currentPage={3} />);
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();

    // Last page
    rerender(<Pagination {...defaultProps} currentPage={5} />);
    expect(screen.getByLabelText('Previous page')).not.toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('uses correct ARIA labels', () => {
    render(<Pagination {...defaultProps} />);
    
    expect(screen.getByLabelText('Pagination')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });
});