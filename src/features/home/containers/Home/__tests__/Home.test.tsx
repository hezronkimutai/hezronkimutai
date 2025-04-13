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
      render(<Home />);
      const container = screen.getByTestId('home-container');
      expect(container).toHaveClass('dark');
    });
  });

  describe('Theme Switching', () => {
    it('toggles between light and dark themes', () => {
      render(<Home />);
      const container = screen.getByTestId('home-container');
      const themeButton = screen.getByText(/Toggle Theme/);

      // Initially dark
      expect(container).toHaveClass('dark');
      
      // Switch to light
      fireEvent.click(themeButton);
      expect(container).toHaveClass('light');
      
      // Switch back to dark
      fireEvent.click(themeButton);
      expect(container).toHaveClass('dark');
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
      render(<Home />);
      const container = screen.getByTestId('home-container');
      expect(container).toHaveClass('container');
    });

    it('applies theme-specific classes', () => {
      render(<Home />);
      const container = screen.getByTestId('home-container');
      const themeButton = screen.getByText(/Toggle Theme/);
      
      expect(container).toHaveClass('container', 'dark');
      
      fireEvent.click(themeButton);
      expect(container).toHaveClass('container', 'light');
    });

    it('maintains main content area structure', () => {
      render(<Home />);
      const container = screen.getByTestId('home-container');
      expect(container.querySelector('main')).toHaveClass('main');
    });
  });

  describe('Event Handlers', () => {
    it('prevents scroll events', () => {
      render(<Home />);
      const container = screen.getByTestId('home-container');

      // Test normal scroll
      const scrollEvent = new Event('scroll', {
        bubbles: true,
        cancelable: true,
      });
      const scrollPreventDefault = jest.fn();
      Object.defineProperty(scrollEvent, 'preventDefault', {
        value: scrollPreventDefault,
      });

      // Test scroll capture
      const scrollCaptureEvent = new Event('scroll', {
        bubbles: true,
        cancelable: true,
      });
      const capturePrevDefault = jest.fn();
      Object.defineProperty(scrollCaptureEvent, 'preventDefault', {
        value: capturePrevDefault,
      });

      // Dispatch both events
      container.dispatchEvent(scrollEvent);
      container.dispatchEvent(scrollCaptureEvent);

      // Both events should have been prevented
      expect(scrollPreventDefault).toHaveBeenCalled();
      expect(capturePrevDefault).toHaveBeenCalled();
    });
  });
});