import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TeamCard } from '../TeamCard';
import { TeamMember } from '../../../types/team';

// Mock images object
jest.mock('../../../../../components/images', () => ({
  testImage: 'test-image.jpg',
}));

describe('TeamCard Component', () => {
  const mockMember: TeamMember = {
    imageUrl: 'testImage',
    name: 'John Doe',
    webUrl: 'https://example.com',
    role: 'Software Engineer',
    description: 'Experienced developer',
  };

  it('renders member information correctly', () => {
    render(<TeamCard member={mockMember} />);
    
    expect(screen.getByText(mockMember.name)).toBeInTheDocument();
    expect(screen.getByText(mockMember.role!)).toBeInTheDocument();
    expect(screen.getByText(mockMember.description!)).toBeInTheDocument();
  });

  it('renders image with correct attributes', () => {
    render(<TeamCard member={mockMember} />);
    
    const image = screen.getByAltText(`${mockMember.name}'s profile`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('includes correct link attributes', () => {
    render(<TeamCard member={mockMember} />);
    
    const link = screen.getByText(mockMember.name);
    expect(link).toHaveAttribute('href', mockMember.webUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies custom className', () => {
    const customClass = 'custom-card';
    const { container } = render(
      <TeamCard member={mockMember} className={customClass} />
    );
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('includes animation attributes', () => {
    const { container } = render(<TeamCard member={mockMember} />);
    expect(container.firstChild).toHaveAttribute('data-aos', 'zoom-in');
  });

  describe('Optional Fields', () => {
    it('handles member without role', () => {
      const memberWithoutRole: TeamMember = {
        ...mockMember,
        role: undefined,
      };
      
      render(<TeamCard member={memberWithoutRole} />);
      expect(screen.queryByText(/Software Engineer/)).not.toBeInTheDocument();
    });

    it('handles member without description', () => {
      const memberWithoutDescription: TeamMember = {
        ...mockMember,
        description: undefined,
      };
      
      render(<TeamCard member={memberWithoutDescription} />);
      expect(screen.queryByText(/Experienced developer/)).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has accessible image alt text', () => {
      render(<TeamCard member={mockMember} />);
      expect(screen.getByAltText(`${mockMember.name}'s profile`)).toBeInTheDocument();
    });

    it('has accessible link', () => {
      render(<TeamCard member={mockMember} />);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', mockMember.webUrl);
    });
  });
});