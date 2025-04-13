import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProjectCard } from '../ProjectCard';
import { Project } from '../../../types/projects';

describe('ProjectCard Component', () => {
  const mockProject: Project = {
    name: 'Test Project',
    imageUrl: 'https://test.com/image.jpg',
    link: 'https://test.com/project',
    description: 'This is a test project description',
  };

  it('renders project information correctly', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText(mockProject.name)).toBeInTheDocument();
    expect(screen.getByText(mockProject.description)).toBeInTheDocument();
    expect(screen.getByAltText(mockProject.name)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'custom-class';
    const { container } = render(
      <ProjectCard project={mockProject} className={customClass} />
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders links with correct href and attributes', () => {
    render(<ProjectCard project={mockProject} />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('href', mockProject.link);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders image with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);

    const image = screen.getByAltText(mockProject.name);
    expect(image).toHaveAttribute('src', mockProject.imageUrl);
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('maintains proper structure', () => {
    const { container } = render(<ProjectCard project={mockProject} />);

    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.content')).toBeInTheDocument();
    expect(container.querySelector('.description')).toBeInTheDocument();
  });
});