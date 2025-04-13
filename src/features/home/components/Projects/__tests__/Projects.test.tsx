import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Projects } from '../Projects';
import { defaultProjects, ITEMS_PER_PAGE } from '../../../types/projects';

// Mock child components
jest.mock('../../ProjectCard', () => ({
  ProjectCard: ({ name, description }: { name: string; description: string }) => (
    <div data-testid="project-card">
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock('../../Pagination', () => ({
  Pagination: ({
    currentPage,
    totalPages,
    onNext,
    onPrev,
  }: {
    currentPage: number;
    totalPages: number;
    onNext: () => void;
    onPrev: () => void;
  }) => (
    <div data-testid="pagination">
      <button onClick={onPrev} disabled={currentPage === 1}>Previous</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={onNext} disabled={currentPage === totalPages}>Next</button>
    </div>
  ),
}));

describe('Projects Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Projects />);
      
      // Check title
      expect(screen.getByText('Featured Works and Case Studies')).toBeInTheDocument();
      
      // Check initial projects
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(ITEMS_PER_PAGE);
      
      // Check pagination
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });

    it('renders with custom title', () => {
      const customTitle = 'Custom Projects';
      render(<Projects title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(<Projects className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('renders with custom projects data', () => {
      const customProjects = [
        {
          name: 'Custom Project 1',
          description: 'Description 1',
          imageUrl: 'image1.jpg',
          link: 'https://example.com/1',
        },
        {
          name: 'Custom Project 2',
          description: 'Description 2',
          imageUrl: 'image2.jpg',
          link: 'https://example.com/2',
        },
      ];

      render(<Projects projects={customProjects} />);
      
      expect(screen.getByText('Custom Project 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Project 2')).toBeInTheDocument();
    });
  });

  describe('Pagination', () => {
    it('shows correct number of items per page', () => {
      const customItemsPerPage = 2;
      render(<Projects itemsPerPage={customItemsPerPage} />);
      
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(customItemsPerPage);
    });

    it('navigates to next page', () => {
      render(<Projects itemsPerPage={2} />);
      
      // Get first page projects
      const initialProjects = defaultProjects.slice(0, 2);
      initialProjects.forEach(project => {
        expect(screen.getByText(project.name)).toBeInTheDocument();
      });

      // Go to next page
      fireEvent.click(screen.getByText('Next'));

      // Check second page projects
      const nextPageProjects = defaultProjects.slice(2, 4);
      nextPageProjects.forEach(project => {
        expect(screen.getByText(project.name)).toBeInTheDocument();
      });
    });

    it('navigates to previous page', () => {
      render(<Projects itemsPerPage={2} />);
      
      // Get initial project names
      const initialProjects = defaultProjects.slice(0, 2);
      const initialNames = initialProjects.map(p => p.name);
      
      // Go to next page
      fireEvent.click(screen.getByText('Next'));
      
      // Go back to first page
      fireEvent.click(screen.getByText('Previous'));
      
      // Check first page projects again
      initialNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('handles last page with fewer items', () => {
      const itemsPerPage = 5;
      render(<Projects itemsPerPage={itemsPerPage} />);

      // Navigate to last page
      const totalPages = Math.ceil(defaultProjects.length / itemsPerPage);
      for (let i = 1; i < totalPages; i++) {
        fireEvent.click(screen.getByText('Next'));
      }

      // Check number of items on last page
      const remainingItems = defaultProjects.length % itemsPerPage || itemsPerPage;
      const projectCards = screen.getAllByTestId('project-card');
      expect(projectCards).toHaveLength(remainingItems);
    });

    it('prevents navigation beyond bounds', () => {
      render(<Projects itemsPerPage={3} />);

      // Try to go back from first page
      const prevButton = screen.getByText('Previous');
      expect(prevButton).toBeDisabled();

      // Navigate to last page
      const totalPages = Math.ceil(defaultProjects.length / 3);
      for (let i = 1; i < totalPages; i++) {
        fireEvent.click(screen.getByText('Next'));
      }

      // Try to go forward from last page
      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('resets to first page when projects change', () => {
      const { rerender } = render(<Projects itemsPerPage={2} />);
      
      // Navigate to second page
      fireEvent.click(screen.getByText('Next'));
      expect(screen.getByTestId('pagination')).toHaveTextContent('Page 2 of');
      
      // Update projects to a smaller list that fits on one page
      const smallerProjects = defaultProjects.slice(0, 2);
      rerender(<Projects projects={smallerProjects} itemsPerPage={2} />);
      
      // Pagination should be hidden for single page
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('handles pagination visibility correctly', () => {
      // Should show pagination for multiple pages
      const { rerender } = render(<Projects itemsPerPage={2} />);
      expect(screen.getByTestId('pagination')).toBeInTheDocument();

      // Should hide pagination for empty projects
      rerender(<Projects projects={[]} />);
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();

      // Should hide pagination for single page
      rerender(<Projects projects={[defaultProjects[0]]} />);
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty projects array', () => {
      render(<Projects projects={[]} />);
      expect(screen.queryByTestId('project-card')).not.toBeInTheDocument();
      expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    });

    it('normalizes invalid itemsPerPage values', () => {
      // Test with zero
      const { rerender } = render(<Projects itemsPerPage={0} />);
      expect(screen.getAllByTestId('project-card')).toHaveLength(1);

      // Test with negative number
      rerender(<Projects itemsPerPage={-1} />);
      expect(screen.getAllByTestId('project-card')).toHaveLength(1);

      // Test with decimal number
      rerender(<Projects itemsPerPage={2.7} />);
      expect(screen.getAllByTestId('project-card')).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section with proper ARIA labeling', () => {
      render(<Projects />);
      const section = screen.getByRole('region', { name: 'Featured Works and Case Studies' });
      expect(section).toBeInTheDocument();
    });

    it('associates heading with section via id', () => {
      render(<Projects />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('id', 'projects-title');
      
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-labelledby', 'projects-title');
    });

    it('applies animation attributes correctly', () => {
      render(<Projects />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('data-aos', 'flip-right');
    });
  });
});