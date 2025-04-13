import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ServiceCard } from '../ServiceCard';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  react: 'react-icon.svg',
  html: 'html-icon.svg',
  css3: 'css3-icon.svg',
}));

describe('ServiceCard Component', () => {
  const defaultProps = {
    name: 'Test Service',
    description: 'Test description',
    links: [
      { url: 'https://test.com', img: 'react', alt: 'React' },
      { url: '', img: 'html', alt: 'HTML' },
    ],
  };

  describe('Rendering', () => {
    it('renders all content correctly', () => {
      render(<ServiceCard {...defaultProps} />);
      
      // Check heading
      expect(screen.getByRole('heading')).toHaveTextContent(defaultProps.name);
      
      // Check description
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
      
      // Check tech icons
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(defaultProps.links.length);
      expect(images[0]).toHaveAttribute('src', 'react-icon.svg');
      expect(images[1]).toHaveAttribute('src', 'html-icon.svg');
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(
        <ServiceCard {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('adds fade-left animation attribute', () => {
      const { container } = render(<ServiceCard {...defaultProps} />);
      expect(container.firstChild).toHaveAttribute('data-aos', 'fade-left');
    });
  });

  describe('Links', () => {
    it('renders tech links when URL is provided', () => {
      render(<ServiceCard {...defaultProps} />);
      const link = screen.getByLabelText('Learn more about React');
      expect(link).toHaveAttribute('href', 'https://test.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not render tech links when URL is empty', () => {
      render(<ServiceCard {...defaultProps} />);
      // HTML link should not be rendered as it has no URL
      expect(screen.queryByLabelText('Learn more about HTML')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('provides alt text for tech icons', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByAltText('React')).toBeInTheDocument();
      expect(screen.getByAltText('HTML')).toBeInTheDocument();
    });

    it('generates default alt text when alt is not provided', () => {
      const propsWithoutAlt = {
        ...defaultProps,
        links: [{ url: '', img: 'react' }],
      };
      render(<ServiceCard {...propsWithoutAlt} />);
      expect(screen.getByAltText(`${defaultProps.name} technology 1`)).toBeInTheDocument();
    });

    it('uses proper heading level', () => {
      render(<ServiceCard {...defaultProps} />);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('has proper link text for technology links', () => {
      render(<ServiceCard {...defaultProps} />);
      const link = screen.getByLabelText('Learn more about React');
      expect(link).toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('uses lazy loading for images', () => {
      render(<ServiceCard {...defaultProps} />);
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy');
      });
    });
  });
});