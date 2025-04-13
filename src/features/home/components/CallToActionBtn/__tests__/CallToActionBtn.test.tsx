import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallToActionBtn } from '../CallToActionBtn';

describe('CallToActionBtn Component', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    onClick: mockOnClick,
    displayText: 'Click Me',
    className: 'test-button',
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders with correct text', () => {
    render(<CallToActionBtn {...defaultProps} />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<CallToActionBtn {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('test-button');
  });

  it('calls onClick handler when clicked', () => {
    render(<CallToActionBtn {...defaultProps} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a button element', () => {
    render(<CallToActionBtn {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('has type="button"', () => {
    render(<CallToActionBtn {...defaultProps} />);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });
});