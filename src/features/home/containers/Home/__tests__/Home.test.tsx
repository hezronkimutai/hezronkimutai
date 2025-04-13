import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Home } from '../Home';

// Mock all child components
jest.mock('../../../components', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
  TopBar: ({ mode, onToggleMode }: { mode: string; onToggleMode: () => void }) => (
    <div data-testid="top-bar">
      <button onClick={onToggleMode}>
        Toggle Theme ({mode})
      </button>
    </div>
  ),
}));

describe('Home Container', () => {
  describe('Rendering', () => {
    it('renders core components in correct order', () => {
      render(<Home />);
      
      const elements = screen.getAllByTestId(/top-bar|footer/);
      const componentOrder = elements.map(el => el.getAttribute('data-testid'));
      
      expect(componentOrder).toEqual([
        'top-bar',
        'footer',
      ]);
    });

    it('starts with dark theme by default', () => {
      const { container } = render(<Home />);
      expect(container.firstChild).toHaveClass('dark');
    });
  });

  describe('Theme Switching', () => {
    it('toggles between light and dark themes', () => {
      const { container } = render(<Home />);
      const themeButton = screen.getByText(/Toggle Theme/);

      // Initially dark
      expect(container.firstChild).toHaveClass('dark');
      
      // Switch to light
      fireEvent.click(themeButton);
      expect(container.firstChild).toHaveClass('light');
      
      // Switch back to dark
      fireEvent.click(themeButton);
      expect(container.firstChild).toHaveClass('dark');
    });

    it('passes current theme to TopBar', () => {
      render(<Home />);
      expect(screen.getByText('Toggle Theme (dark)')).toBeInTheDocument();
      
      fireEvent.click(screen.getByText(/Toggle Theme/));
      expect(screen.getByText('Toggle Theme (light)')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('applies container class', () => {
      const { container } = render(<Home />);
      expect(container.firstChild).toHaveClass('container');
    });

    it('applies theme-specific classes', () => {
      const { container } = render(<Home />);
      const themeButton = screen.getByText(/Toggle Theme/);
      
      expect(container.firstChild).toHaveClass('container', 'dark');
      
      fireEvent.click(themeButton);
      expect(container.firstChild).toHaveClass('container', 'light');
    });

    it('maintains main content area structure', () => {
      const { container } = render(<Home />);
      expect(container.querySelector('main')).toHaveClass('main');
    });
  });

  describe('Event Handlers', () => {
    it('has scroll capture handler configured', () => {
      const { container } = render(<Home />);
      const mainContainer = container.firstChild as HTMLElement;
      
      // Check if the onScrollCapture attribute exists
      expect(mainContainer).toHaveAttribute('onscrollcapture');
      
      // Verify the handler prevents default behavior
      const mockEvent = { preventDefault: jest.fn() };
      fireEvent.scroll(mainContainer, mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });
});