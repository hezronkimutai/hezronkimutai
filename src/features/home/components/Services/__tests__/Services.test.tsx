import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Services } from '../Services';
import { defaultServices } from '../../../types/services';

// Mock ServiceCard component
jest.mock('../../ServiceCard', () => ({
  ServiceCard: ({ name, description }: { name: string; description: string }) => (
    <div data-testid="service-card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe('Services Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Services />);
      
      // Check title
      expect(screen.getByText('Services I Offer')).toBeInTheDocument();
      
      // Check number of service cards
      const cards = screen.getAllByTestId('service-card');
      expect(cards).toHaveLength(defaultServices.length);
    });

    it('renders with custom title', () => {
      const customTitle = 'Custom Services';
      render(<Services title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('renders with custom services', () => {
      const customServices = [
        {
          name: 'Custom Service 1',
          description: 'Description 1',
          links: [],
        },
        {
          name: 'Custom Service 2',
          description: 'Description 2',
          links: [],
        },
      ];

      render(<Services services={customServices} />);
      
      // Check custom service names are rendered
      expect(screen.getByText('Custom Service 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Service 2')).toBeInTheDocument();
      
      // Check custom descriptions are rendered
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(<Services className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });
  });

  describe('Layout', () => {
    it('renders services in a grid', () => {
      const { container } = render(<Services />);
      const grid = container.querySelector('div[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('maintains proper heading hierarchy', () => {
      render(<Services />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Services I Offer');
    });
  });

  describe('Accessibility', () => {
    it('has section with proper ARIA labeling', () => {
      render(<Services />);
      const section = screen.getByRole('region', { name: 'Services I Offer' });
      expect(section).toBeInTheDocument();
    });

    it('associates heading with section via aria-labelledby', () => {
      const { container } = render(<Services />);
      const section = container.firstChild as HTMLElement;
      const headingId = section.getAttribute('aria-labelledby');
      expect(screen.getByRole('heading')).toHaveAttribute('id', headingId);
    });
  });

  describe('Content Structure', () => {
    it('renders service cards in correct order', () => {
      render(<Services />);
      const cards = screen.getAllByTestId('service-card');
      
      cards.forEach((card, index) => {
        expect(card).toHaveTextContent(defaultServices[index].name);
        expect(card).toHaveTextContent(defaultServices[index].description);
      });
    });
  });
});