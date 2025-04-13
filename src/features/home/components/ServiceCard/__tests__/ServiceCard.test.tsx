import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ServiceCard } from '../ServiceCard';
import { Service } from '../../../types/services';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  react: 'react-icon.svg',
  html: 'html-icon.svg',
  css3: 'css3-icon.svg',
}));

describe('ServiceCard Component', () => {
  const mockService: Service = {
    name: 'Frontend Development',
    description: 'Building modern web applications',
    links: [
      { url: '', img: 'react', altText: 'React' },
      { url: '', img: 'html', altText: 'HTML' },
    ],
  };

  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} />);
    
    expect(screen.getByText(mockService.name)).toBeInTheDocument();
    expect(screen.getByText(mockService.description)).toBeInTheDocument();
  });

  it('renders all technology icons', () => {
    render(<ServiceCard service={mockService} />);
    
    mockService.links.forEach(link => {
      const icon = screen.getByAltText(link.altText || link.img);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src', expect.stringContaining(link.img));
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-card';
    const { container } = render(
      <ServiceCard service={mockService} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('includes data-aos attribute for animations', () => {
    const { container } = render(<ServiceCard service={mockService} />);
    expect(container.firstChild).toHaveAttribute('data-aos', 'fade-left');
  });

  it('renders icons with lazy loading', () => {
    render(<ServiceCard service={mockService} />);
    
    const icons = screen.getAllByRole('img');
    icons.forEach(icon => {
      expect(icon).toHaveAttribute('loading', 'lazy');
    });
  });

  it('maintains proper structure', () => {
    const { container } = render(<ServiceCard service={mockService} />);
    
    expect(container.querySelector('h2')).toHaveClass('title');
    expect(container.querySelector('p')).toHaveClass('description');
    expect(container.querySelector('div[class*="links"]')).toBeInTheDocument();
  });

  it('handles service without links', () => {
    const serviceWithoutLinks: Service = {
      name: 'Test Service',
      description: 'Test Description',
      links: [],
    };

    render(<ServiceCard service={serviceWithoutLinks} />);
    
    expect(screen.getByText(serviceWithoutLinks.name)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('uses fallback alt text when altText is not provided', () => {
    const serviceWithoutAltText: Service = {
      name: 'Test Service',
      description: 'Test Description',
      links: [{ url: '', img: 'react' }],
    };

    render(<ServiceCard service={serviceWithoutAltText} />);
    
    const icon = screen.getByAltText('react');
    expect(icon).toBeInTheDocument();
  });
});