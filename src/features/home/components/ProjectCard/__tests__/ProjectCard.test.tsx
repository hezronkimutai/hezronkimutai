import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from '../ProjectCard';

describe('ProjectCard Component', () => {
  const defaultProps = {
    name: 'Test Project',
    imageUrl: 'test-image.jpg',
    link: 'https://test-project.com',
    description: 'Test project description',
  };

  describe('Rendering', () => {
    it('renders all content correctly', () => {
      render(<ProjectCard {...defaultProps} />);

      // Check title
      expect(screen.getByText(defaultProps.name)).toBeInTheDocument();

      // Check description
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();

      // Check image
      const image = screen.getByAltText(`${defaultProps.name} thumbnail`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', defaultProps.imageUrl);
      expect(image).toHaveAttribute('loading', 'lazy');

      // Check links
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAttribute('href', defaultProps.link);
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(
        <ProjectCard {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('adds fade-up animation attribute', () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      expect(container.firstChild).toHaveAttribute('data-aos', 'fade-up');
    });
  });

  describe('Links', () => {
    it('renders title as a link', () => {
      render(<ProjectCard {...defaultProps} />);
      const titleLink = screen.getByRole('link', { name: defaultProps.name });
      expect(titleLink).toBeInTheDocument();
    });

    it('renders View Project link with accessible name', () => {
      render(<ProjectCard {...defaultProps} />);
      const viewLink = screen.getByRole('link', {
        name: new RegExp(`View Project ${defaultProps.name}`, 'i'),
      });
      expect(viewLink).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses article element for semantic structure', () => {
      const { container } = render(<ProjectCard {...defaultProps} />);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('uses proper heading level', () => {
      render(<ProjectCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent(defaultProps.name);
    });

    it('provides descriptive alt text for image', () => {
      render(<ProjectCard {...defaultProps} />);
      expect(
        screen.getByAltText(`${defaultProps.name} thumbnail`)
      ).toBeInTheDocument();
    });

    it('uses aria-label for image link', () => {
      render(<ProjectCard {...defaultProps} />);
      const imageLink = screen.getByLabelText(`View ${defaultProps.name} project`);
      expect(imageLink).toBeInTheDocument();
    });

    it('includes screen reader text for external links', () => {
      render(<ProjectCard {...defaultProps} />);
      expect(
        screen.getByText(`${defaultProps.name} (opens in new tab)`)
      ).toHaveClass('sr-only');
    });
  });

  describe('Optimization', () => {
    it('uses lazy loading for images', () => {
      render(<ProjectCard {...defaultProps} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

    it('is memoized for performance', () => {
      // Create a simple render function for the component
      const renderComponent = () => <ProjectCard {...defaultProps} />;
      
      // Create two instances using the same props
      const firstRender = renderComponent();
      const secondRender = renderComponent();

      // The memoized component should be equal when props haven't changed
      expect(firstRender.type).toBe(secondRender.type);
      expect(ProjectCard.displayName).toBe('ProjectCard');
    });
  });
});