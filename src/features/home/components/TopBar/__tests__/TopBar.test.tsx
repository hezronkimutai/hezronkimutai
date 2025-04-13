import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopBar } from '../TopBar';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  github: 'github-icon.svg',
}));

describe('TopBar Component', () => {
  const mockOnToggleMode = jest.fn();

  beforeEach(() => {
    mockOnToggleMode.mockClear();
  });

  describe('Rendering', () => {
    it('renders social links correctly', () => {
      render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      
      const githubLink = screen.getByTitle('View Source on GitHub');
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/hezronkimutai/portfolio');
      expect(githubLink.querySelector('img')).toHaveAttribute('src', 'github-icon.svg');
    });

    it('renders theme toggle button', () => {
      render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
    });

    it('applies correct classes based on mode', () => {
      const { rerender } = render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('light');
      
      rerender(<TopBar mode="dark" onToggleMode={mockOnToggleMode} />);
      expect(button).toHaveClass('dark');
    });

    it('applies custom className', () => {
      const { container } = render(
        <TopBar mode="light" onToggleMode={mockOnToggleMode} className="custom-topbar" />
      );
      expect(container.firstChild).toHaveClass('custom-topbar');
    });
  });

  describe('Interaction', () => {
    it('calls onToggleMode when theme button is clicked', () => {
      render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      fireEvent.click(screen.getByRole('button'));
      expect(mockOnToggleMode).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('theme toggle button has correct aria-label', () => {
      const { rerender } = render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
      
      rerender(<TopBar mode="dark" onToggleMode={mockOnToggleMode} />);
      expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
    });

    it('social links have correct titles', () => {
      render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      expect(screen.getByTitle('View Source on GitHub')).toBeInTheDocument();
    });

    it('social link images have alt text', () => {
      render(<TopBar mode="light" onToggleMode={mockOnToggleMode} />);
      expect(screen.getByAltText('View Source on GitHub')).toBeInTheDocument();
    });
  });
});