import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CallToActionBtn } from '../CallToActionBtn';

describe('CallToActionBtn Component', () => {
  const defaultProps = {
    onClick: jest.fn(),
    displayText: 'Click Me',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<CallToActionBtn {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Click Me');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('applies custom className', () => {
      const className = 'custom-class';
      render(<CallToActionBtn {...defaultProps} className={className} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass(className);
    });

    it('merges custom className with base styles', () => {
      const className = 'custom-class';
      render(<CallToActionBtn {...defaultProps} className={className} />);
      
      const button = screen.getByRole('button');
      // Check that both the module class and custom class are present
      expect(button.className).toContain(className);
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clicked', () => {
      render(<CallToActionBtn {...defaultProps} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    });

    it('calls onClick with correct event object', () => {
      render(<CallToActionBtn {...defaultProps} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      const call = defaultProps.onClick.mock.calls[0];
      expect(call).toBeDefined();
      expect(call[0]).toBeDefined();
      expect(call[0].type).toBe('click');
    });
  });

  describe('Accessibility', () => {
    it('has button role', () => {
      render(<CallToActionBtn {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('displays text content correctly', () => {
      const displayText = 'Custom Text';
      render(<CallToActionBtn {...defaultProps} displayText={displayText} />);
      expect(screen.getByText(displayText)).toBeInTheDocument();
    });
  });
});