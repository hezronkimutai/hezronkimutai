import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Team } from '../Team';
import { defaultTeamMembers, defaultTitle } from '../../../types/team';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  ezrqn: '/images/ezrqn.jpg',
  bon: '/images/bon.jpg',
  willy: '/images/willy.jpg',
}));

// Mock TeamCard component
jest.mock('../../TeamCard', () => ({
  TeamCard: ({ name, role }: { name: string; role?: string }) => (
    <div data-testid="team-card">
      <h3>{name}</h3>
      {role && <p>{role}</p>}
    </div>
  ),
}));

describe('Team Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Team />);
      
      // Check title
      expect(screen.getByText(defaultTitle)).toBeInTheDocument();
      
      // Check team members
      const cards = screen.getAllByTestId('team-card');
      expect(cards).toHaveLength(defaultTeamMembers.length);
      
      // Check member names are rendered
      defaultTeamMembers.forEach(member => {
        expect(screen.getByText(member.name)).toBeInTheDocument();
      });
    });

    it('renders with custom title', () => {
      const customTitle = 'Our Amazing Team';
      render(<Team title={customTitle} />);
      expect(screen.getByText(customTitle)).toBeInTheDocument();
    });

    it('renders with custom members', () => {
      const customMembers = [
        {
          imageUrl: 'test1.jpg',
          name: 'Test Member 1',
          webUrl: 'https://example.com/1',
          role: 'Developer',
        },
        {
          imageUrl: 'test2.jpg',
          name: 'Test Member 2',
          webUrl: 'https://example.com/2',
          role: 'Designer',
        },
      ];

      render(<Team members={customMembers} />);
      
      const cards = screen.getAllByTestId('team-card');
      expect(cards).toHaveLength(customMembers.length);
      
      customMembers.forEach(member => {
        expect(screen.getByText(member.name)).toBeInTheDocument();
        expect(screen.getByText(member.role)).toBeInTheDocument();
      });
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(<Team className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('handles empty members array', () => {
      render(<Team members={[]} />);
      expect(screen.queryByTestId('team-card')).not.toBeInTheDocument();
    });
  });

  describe('Image Handling', () => {
    it('maps string image URLs to actual images', () => {
      const membersWithImageStrings = [
        {
          imageUrl: 'ezrqn',
          name: 'Test Member',
          webUrl: 'https://example.com',
        },
      ];

      render(<Team members={membersWithImageStrings} />);
      expect(screen.getByText('Test Member')).toBeInTheDocument();
    });

    it('handles direct image URLs', () => {
      const membersWithDirectUrls = [
        {
          imageUrl: 'https://example.com/image.jpg',
          name: 'Test Member',
          webUrl: 'https://example.com',
        },
      ];

      render(<Team members={membersWithDirectUrls} />);
      expect(screen.getByText('Test Member')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('uses semantic section with proper ARIA labeling', () => {
      render(<Team />);
      const section = screen.getByRole('region', { name: defaultTitle });
      expect(section).toBeInTheDocument();
    });

    it('associates heading with section via id', () => {
      render(<Team />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('id', 'team-title');
      
      const section = screen.getByRole('region');
      expect(section).toHaveAttribute('aria-labelledby', 'team-title');
    });

    it('applies animation attributes correctly', () => {
      render(<Team />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('data-aos', 'flip-right');
    });
  });

  describe('Edge Cases', () => {
    it('handles members with missing optional fields', () => {
      const minimalMembers = [
        {
          imageUrl: 'test.jpg',
          name: 'Minimal Member',
          webUrl: 'https://example.com',
        },
      ];

      render(<Team members={minimalMembers} />);
      expect(screen.getByText('Minimal Member')).toBeInTheDocument();
    });

    it('handles undefined members prop gracefully', () => {
      render(<Team members={undefined} />);
      const cards = screen.getAllByTestId('team-card');
      expect(cards).toHaveLength(defaultTeamMembers.length);
    });
  });
});