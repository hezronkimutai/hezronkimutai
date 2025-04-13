import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WhyMe } from '../WhyMe';

// Mock the CallToActionBtn component
jest.mock('../../CallToActionBtn', () => ({
  CallToActionBtn: ({ onClick, displayText }: { onClick: () => void; displayText: string }) => (
    <button onClick={onClick}>{displayText}</button>
  ),
}));

describe('WhyMe Component', () => {
  const defaultProps = {
    onHireClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with default content', () => {
      render(<WhyMe {...defaultProps} />);
      
      // Check for heading
      expect(screen.getByText('Why Choose Me')).toBeInTheDocument();
      
      // Check for default description
      expect(screen.getByText(/Over the years/)).toBeInTheDocument();
      
      // Check for hire button
      expect(screen.getByText('HIRE ME')).toBeInTheDocument();
    });

    it('renders with custom description', () => {
      const customDescription = 'Custom description text';
      render(<WhyMe {...defaultProps} description={customDescription} />);
      
      expect(screen.getByText(customDescription)).toBeInTheDocument();
    });

    it('renders profile image when URL is provided', () => {
      const profileImageUrl = 'test-image.jpg';
      render(<WhyMe {...defaultProps} profileImageUrl={profileImageUrl} />);
      
      const image = screen.getByAltText('Hezron Kimutai');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', profileImageUrl);
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('does not render profile image when URL is not provided', () => {
      render(<WhyMe {...defaultProps} />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(<WhyMe {...defaultProps} className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Interaction', () => {
    it('calls onHireClick when hire button is clicked', () => {
      render(<WhyMe {...defaultProps} />);
      
      fireEvent.click(screen.getByText('HIRE ME'));
      expect(defaultProps.onHireClick).toHaveBeenCalledTimes(1);
    });

    it('does not throw when onHireClick is not provided', () => {
      render(<WhyMe />);
      
      expect(() => {
        fireEvent.click(screen.getByText('HIRE ME'));
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('has accessible heading with proper structure', () => {
      render(<WhyMe {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: 'Why Choose Me' });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveClass('sr-only');
    });

    it('associates heading with content section', () => {
      render(<WhyMe {...defaultProps} />);
      
      const section = screen.getByRole('region', { name: 'Why Choose Me' });
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby', 'why-me-heading');
    });

    it('provides alt text for profile image when present', () => {
      render(<WhyMe {...defaultProps} profileImageUrl="test-image.jpg" />);
      
      const image = screen.getByAltText('Hezron Kimutai');
      expect(image).toBeInTheDocument();
    });
  });
});