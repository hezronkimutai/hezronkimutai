import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Services } from '../Services';
import { Service } from '../../../types/services';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  react: 'react-icon.svg',
  html: 'html-icon.svg',
  css3: 'css3-icon.svg',
}));

describe('Services Component', () => {
  const mockServices: Service[] = [
    {
      name: 'Frontend Development',
      description: 'Building modern web applications',
      links: [{ url: '', img: 'react', altText: 'React' }],
    },
    {
      name: 'Backend Development',
      description: 'Server-side development',
      links: [{ url: '', img: 'html', altText: 'HTML' }],
    },
  ];

  describe('Rendering', () => {
    it('renders services section with title', () => {
      render(<Services services={mockServices} />);
      expect(screen.getByText('Services I Offer')).toBeInTheDocument();
    });

    it('renders all provided services', () => {
      render(<Services services={mockServices} />);
      
      mockServices.forEach(service => {
        expect(screen.getByText(service.name)).toBeInTheDocument();
        expect(screen.getByText(service.description)).toBeInTheDocument();
      });
    });

    it('shows empty state when no services provided', () => {
      render(<Services services={[]} />);
      expect(screen.getByText('No services available at the moment.')).toBeInTheDocument();
    });

    it('uses default services when none provided', () => {
      render(<Services />);
      // Should render DEFAULT_SERVICES from types
      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
      expect(screen.getByText('Backend Development')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const customClass = 'custom-services';
      const { container } = render(
        <Services services={mockServices} className={customClass} />
      );
      
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('maintains grid structure', () => {
      const { container } = render(<Services services={mockServices} />);
      expect(container.querySelector('.grid')).toBeInTheDocument();
    });
  });

  describe('Service Cards', () => {
    it('renders correct number of service cards', () => {
      render(<Services services={mockServices} />);
      const cards = screen.getAllByRole('heading', { level: 2 });
      expect(cards).toHaveLength(mockServices.length);
    });

    it('renders all technology icons', () => {
      render(<Services services={mockServices} />);
      
      mockServices.forEach(service => {
        service.links.forEach(link => {
          expect(screen.getByAltText(link.altText || link.img)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined services prop gracefully', () => {
      render(<Services services={undefined} />);
      // Should use DEFAULT_SERVICES
      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    });

    it('handles service without links', () => {
      const servicesWithoutLinks: Service[] = [
        {
          name: 'Test Service',
          description: 'Test Description',
          links: [],
        },
      ];

      render(<Services services={servicesWithoutLinks} />);
      expect(screen.getByText('Test Service')).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
});