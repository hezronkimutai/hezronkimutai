import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Team } from '../Team';
import { TeamMember } from '../../../types/team';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  testImage1: 'test-image-1.jpg',
  testImage2: 'test-image-2.jpg',
}));

describe('Team Component', () => {
  const mockMembers: TeamMember[] = [
    {
      imageUrl: 'testImage1',
      name: 'John Doe',
      webUrl: 'https://example.com/john',
      role: 'Frontend Developer',
    },
    {
      imageUrl: 'testImage2',
      name: 'Jane Smith',
      webUrl: 'https://example.com/jane',
      role: 'Backend Developer',
    },
  ];

  describe('Rendering', () => {
    it('renders team section with title', () => {
      render(<Team members={mockMembers} />);
      expect(screen.getByText('Our Team')).toBeInTheDocument();
    });

    it('renders all team members', () => {
      render(<Team members={mockMembers} />);
      
      mockMembers.forEach(member => {
        expect(screen.getByText(member.name)).toBeInTheDocument();
        expect(screen.getByText(member.role!)).toBeInTheDocument();
      });
    });

    it('shows empty state when no members provided', () => {
      render(<Team members={[]} />);
      expect(screen.getByText('No team members available at the moment.')).toBeInTheDocument();
    });

    it('uses default members when none provided', () => {
      render(<Team />);
      // Check for some default members
      expect(screen.getByText('Ezrqn Kemboi')).toBeInTheDocument();
      expect(screen.getByText('BonVic Bundi')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const customClass = 'custom-team';
      const { container } = render(
        <Team members={mockMembers} className={customClass} />
      );
      
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('maintains grid structure', () => {
      const { container } = render(<Team members={mockMembers} />);
      expect(container.querySelector('.grid')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('includes animation attribute on title', () => {
      render(<Team members={mockMembers} />);
      const title = screen.getByText('Our Team');
      expect(title).toHaveAttribute('data-aos', 'flip-right');
    });
  });

  describe('Member Cards', () => {
    it('renders correct number of team cards', () => {
      render(<Team members={mockMembers} />);
      const cards = screen.getAllByRole('img');
      expect(cards).toHaveLength(mockMembers.length);
    });

    it('renders member links correctly', () => {
      render(<Team members={mockMembers} />);
      
      mockMembers.forEach(member => {
        const link = screen.getByText(member.name);
        expect(link).toHaveAttribute('href', member.webUrl);
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles undefined members prop gracefully', () => {
      render(<Team members={undefined} />);
      // Should use DEFAULT_TEAM_MEMBERS
      expect(screen.getByText('Ezrqn Kemboi')).toBeInTheDocument();
    });

    it('handles member without role', () => {
      const membersWithoutRole: TeamMember[] = [
        {
          imageUrl: 'testImage1',
          name: 'Test Member',
          webUrl: 'https://example.com',
        },
      ];

      render(<Team members={membersWithoutRole} />);
      expect(screen.getByText('Test Member')).toBeInTheDocument();
    });
  });
});