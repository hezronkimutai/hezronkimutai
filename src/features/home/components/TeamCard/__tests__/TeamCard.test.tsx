import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamCard } from '../TeamCard';

describe('TeamCard Component', () => {
  const defaultProps = {
    imageUrl: 'test-image.jpg',
    name: 'John Doe',
    webUrl: 'https://example.com',
    role: 'Software Engineer',
    socials: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
      portfolio: 'https://johndoe.dev',
    },
  };

  describe('Rendering', () => {
    it('renders basic content correctly', () => {
      render(<TeamCard {...defaultProps} />);

      // Check profile image
      const image = screen.getByAltText(`${defaultProps.name}'s profile`);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', defaultProps.imageUrl);
      expect(image).toHaveAttribute('loading', 'lazy');

      // Check name and role
      expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.role)).toBeInTheDocument();
    });

    it('handles missing optional props', () => {
      const minimalProps = {
        imageUrl: defaultProps.imageUrl,
        name: defaultProps.name,
        webUrl: defaultProps.webUrl,
      };

      render(<TeamCard {...minimalProps} />);

      // Basic content should be present
      expect(screen.getByAltText(`${minimalProps.name}'s profile`)).toBeInTheDocument();
      expect(screen.getByText(minimalProps.name)).toBeInTheDocument();

      // Optional content should not be present
      expect(screen.queryByText('Software Engineer')).not.toBeInTheDocument();
      expect(screen.queryByLabelText(`${minimalProps.name}'s GitHub profile`)).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(
        <TeamCard {...defaultProps} className={customClass} />
      );
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('adds zoom-in animation attribute', () => {
      const { container } = render(<TeamCard {...defaultProps} />);
      expect(container.firstChild).toHaveAttribute('data-aos', 'zoom-in');
    });
  });

  describe('Social Links', () => {
    it('renders all social links when provided', () => {
      render(<TeamCard {...defaultProps} />);

      // Check each social link
      expect(screen.getByLabelText(`${defaultProps.name}'s GitHub profile`))
        .toHaveAttribute('href', defaultProps.socials.github);
      expect(screen.getByLabelText(`${defaultProps.name}'s LinkedIn profile`))
        .toHaveAttribute('href', defaultProps.socials.linkedin);
      expect(screen.getByLabelText(`${defaultProps.name}'s Twitter profile`))
        .toHaveAttribute('href', defaultProps.socials.twitter);
      expect(screen.getByLabelText(`${defaultProps.name}'s portfolio website`))
        .toHaveAttribute('href', defaultProps.socials.portfolio);
    });

    it('excludes portfolio link when webUrl is GitHub profile', () => {
      const githubProps = {
        ...defaultProps,
        webUrl: 'https://github.com/johndoe',
      };

      render(<TeamCard {...githubProps} />);
      expect(screen.queryByLabelText(`${defaultProps.name}'s portfolio website`))
        .not.toBeInTheDocument();
    });

    it('handles partial social links', () => {
      const partialSocials = {
        ...defaultProps,
        socials: {
          github: defaultProps.socials.github,
        },
      };

      render(<TeamCard {...partialSocials} />);

      // GitHub link should be present
      expect(screen.getByLabelText(`${defaultProps.name}'s GitHub profile`))
        .toBeInTheDocument();

      // Other social links should not be present
      expect(screen.queryByLabelText(`${defaultProps.name}'s LinkedIn profile`))
        .not.toBeInTheDocument();
      expect(screen.queryByLabelText(`${defaultProps.name}'s Twitter profile`))
        .not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic article element', () => {
      const { container } = render(<TeamCard {...defaultProps} />);
      expect(container.firstChild?.nodeName).toBe('ARTICLE');
    });

    it('provides proper heading structure', () => {
      render(<TeamCard {...defaultProps} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent(defaultProps.name);
    });

    it('has accessible link text', () => {
      render(<TeamCard {...defaultProps} />);
      const mainLink = screen.getByRole('link', { name: `${defaultProps.name} (opens in new tab)` });
      expect(mainLink).toHaveAttribute('href', defaultProps.webUrl);
    });

    it('uses proper attributes for external links', () => {
      render(<TeamCard {...defaultProps} />);
      const links = screen.getAllByRole('link');

      links.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('provides descriptive alt text for image', () => {
      render(<TeamCard {...defaultProps} />);
      expect(screen.getByAltText(`${defaultProps.name}'s profile`))
        .toBeInTheDocument();
    });
  });
});