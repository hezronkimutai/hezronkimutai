import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('custom-class');
  });

  it('applies custom size', () => {
    render(<LoadingSpinner size={60} />);
    
    const spinnerElement = screen.getByRole('status').children[0] as HTMLElement;
    expect(spinnerElement).toHaveStyle({
      width: '60px',
      height: '60px'
    });
  });

  it('applies custom color', () => {
    render(<LoadingSpinner color="#ff0000" />);
    
    const spinnerElement = screen.getByRole('status').children[0] as HTMLElement;
    expect(spinnerElement).toHaveStyle({
      borderTopColor: '#ff0000'
    });
  });

  it('displays custom loading text', () => {
    const customText = 'Please wait...';
    render(<LoadingSpinner text={customText} />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', customText);
    expect(screen.getByText(customText)).toBeInTheDocument();
  });

  it('maintains accessibility features', () => {
    render(<LoadingSpinner />);
    
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
    
    // Screen reader only text should be present
    const srOnlyText = screen.getByText('Loading...');
    expect(srOnlyText).toHaveClass('sr-only');
  });

  it('handles empty className gracefully', () => {
    render(<LoadingSpinner className="" />);
    
    const spinner = screen.getByRole('status');
    // Should not have extra spaces in className
    expect(spinner.className.trim()).not.toContain('  ');
  });

  it('has correct display name', () => {
    expect(LoadingSpinner.displayName).toBe('LoadingSpinner');
  });
});