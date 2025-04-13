import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WhyMe } from '../WhyMe';
import { DEFAULT_WHY_ME_CONTENT } from '../../../types/whyMe';

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

describe('WhyMe Component', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  describe('Rendering', () => {
    it('renders with default content', () => {
      render(<WhyMe />);
      
      // Use a more flexible text matching approach
      const description = screen.getByText((content) => 
        content.includes('Over the years, I have acquired relevant skills')
      );
      expect(description).toBeInTheDocument();
      expect(screen.getByAltText('Hezron Kimutai - Full Stack Developer')).toBeInTheDocument();
      expect(screen.getByText('HIRE ME')).toBeInTheDocument();
    });

    it('renders with custom content', () => {
      const customDescription = 'Custom description';
      const customImageUrl = 'custom-image.jpg';
      
      render(
        <WhyMe 
          description={customDescription}
          profileImageUrl={customImageUrl}
        />
      );
      
      expect(screen.getByText(customDescription)).toBeInTheDocument();
      expect(screen.getByRole('img')).toHaveAttribute('src', customImageUrl);
    });

    it('applies custom className', () => {
      const customClass = 'custom-why-me';
      const { container } = render(<WhyMe className={customClass} />);
      
      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Image', () => {
    it('renders with correct attributes', () => {
      render(<WhyMe />);
      const image = screen.getByRole('img');
      
      expect(image).toHaveAttribute('src', DEFAULT_WHY_ME_CONTENT.imageUrl);
      expect(image).toHaveAttribute('alt', 'Hezron Kimutai - Full Stack Developer');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  describe('Hire Button', () => {
    it('opens resume in new tab by default', () => {
      render(<WhyMe />);
      const hireButton = screen.getByText('HIRE ME');
      
      fireEvent.click(hireButton);
      
      expect(mockOpen).toHaveBeenCalledWith(
        DEFAULT_WHY_ME_CONTENT.resumeUrl,
        '_blank',
        'noopener,noreferrer'
      );
    });

    it('calls custom onClick handler when provided', () => {
      const mockOnClick = jest.fn();
      render(<WhyMe onHireClick={mockOnClick} />);
      
      const hireButton = screen.getByText('HIRE ME');
      fireEvent.click(hireButton);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOpen).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      const { container } = render(<WhyMe />);
      expect(container.querySelector('.description')).toBeInTheDocument();
    });

    it('ensures image has proper alt text', () => {
      render(<WhyMe />);
      expect(screen.getByAltText('Hezron Kimutai - Full Stack Developer')).toBeInTheDocument();
    });

    it('ensures hire button is keyboard accessible', () => {
      render(<WhyMe />);
      const button = screen.getByText('HIRE ME');
      
      button.focus();
      expect(button).toHaveFocus();
      
      // Simulate both click and keypress
      fireEvent.keyPress(button, { key: 'Enter', code: 'Enter', charCode: 13 });
      fireEvent.click(button);
      
      expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it('ensures button has proper ARIA roles', () => {
      render(<WhyMe />);
      const button = screen.getByRole('button', { name: 'HIRE ME' });
      expect(button).toBeInTheDocument();
    });
  });
});