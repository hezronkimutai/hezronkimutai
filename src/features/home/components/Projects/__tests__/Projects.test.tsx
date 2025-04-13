import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from '../Projects';
import { Project } from '../../../types/projects';
import { ITEMS_PER_PAGE } from '../../../types/projects';

const mockProjects: Project[] = [
  {
    name: 'Project 1',
    imageUrl: 'https://test.com/image1.jpg',
    link: 'https://test.com/project1',
    description: 'Description 1',
  },
  {
    name: 'Project 2',
    imageUrl: 'https://test.com/image2.jpg',
    link: 'https://test.com/project2',
    description: 'Description 2',
  },
  {
    name: 'Project 3',
    imageUrl: 'https://test.com/image3.jpg',
    link: 'https://test.com/project3',
    description: 'Description 3',
  },
  {
    name: 'Project 4',
    imageUrl: 'https://test.com/image4.jpg',
    link: 'https://test.com/project4',
    description: 'Description 4',
  },
];

describe('Projects Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('renders projects correctly with default pagination', () => {
      render(<Projects projects={mockProjects} />);
      const displayedProjects = screen.getAllByRole('heading', { level: 2 });
      expect(displayedProjects).toHaveLength(ITEMS_PER_PAGE);
    });

    it('shows empty state when no projects', () => {
      render(<Projects projects={[]} />);
      expect(screen.getByText('No projects available at the moment.')).toBeInTheDocument();
    });

    it('shows empty state when projects is undefined', () => {
      render(<Projects />);
      expect(screen.getByText('No projects available at the moment.')).toBeInTheDocument();
    });
  });

  describe('Pagination Behavior', () => {
    it('handles page navigation correctly', () => {
      render(<Projects projects={mockProjects} itemsPerPage={2} />);

      // Initial state
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
      expect(screen.queryByText('Project 3')).not.toBeInTheDocument();

      // Navigate to next page
      fireEvent.click(screen.getByLabelText('Next page'));
      expect(screen.getByText('Project 3')).toBeInTheDocument();
      expect(screen.getByText('Project 4')).toBeInTheDocument();
      expect(screen.queryByText('Project 1')).not.toBeInTheDocument();

      // Navigate back
      fireEvent.click(screen.getByLabelText('Previous page'));
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });

    it('prevents navigation beyond boundaries', () => {
      render(<Projects projects={mockProjects} itemsPerPage={2} />);

      // Try to go back from first page
      const prevButton = screen.getByLabelText('Previous page');
      expect(prevButton).toBeDisabled();
      fireEvent.click(prevButton);
      expect(screen.getByText('Project 1')).toBeInTheDocument();

      // Navigate to last page
      fireEvent.click(screen.getByLabelText('Next page'));
      
      // Try to go forward from last page
      const nextButton = screen.getByLabelText('Next page');
      expect(nextButton).toBeDisabled();
      fireEvent.click(nextButton);
      expect(screen.getByText('Project 3')).toBeInTheDocument();
    });

    it('updates page count properly', () => {
      render(<Projects projects={mockProjects} itemsPerPage={2} />);
      
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Next page'));
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText('Previous page'));
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });
  });

  describe('Project Display', () => {
    it('renders project details correctly', () => {
      render(<Projects projects={[mockProjects[0]]} />);
      
      expect(screen.getByText(mockProjects[0].name)).toBeInTheDocument();
      expect(screen.getByText(mockProjects[0].description)).toBeInTheDocument();
      expect(screen.getByAltText(mockProjects[0].name)).toHaveAttribute('src', mockProjects[0].imageUrl);
    });

    it('renders correct number of projects per page', () => {
      render(<Projects projects={mockProjects} itemsPerPage={2} />);
      const displayedProjects = screen.getAllByRole('heading', { level: 2 });
      expect(displayedProjects).toHaveLength(2);
    });
  });

  describe('Edge Cases', () => {
    it('handles last page with fewer items correctly', () => {
      render(<Projects projects={mockProjects} itemsPerPage={3} />);
      
      fireEvent.click(screen.getByLabelText('Next page'));
      const displayedProjects = screen.getAllByRole('heading', { level: 2 });
      expect(displayedProjects).toHaveLength(1); // Last page should show only one project
    });

    it('maintains state after multiple navigation actions', () => {
      render(<Projects projects={mockProjects} itemsPerPage={2} />);
      
      fireEvent.click(screen.getByLabelText('Next page'));
      fireEvent.click(screen.getByLabelText('Previous page'));
      fireEvent.click(screen.getByLabelText('Next page'));
      
      expect(screen.getByText('Project 3')).toBeInTheDocument();
      expect(screen.getByText('Project 4')).toBeInTheDocument();
    });
  });
});