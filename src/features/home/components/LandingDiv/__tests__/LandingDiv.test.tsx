import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingDiv } from '../LandingDiv';

// Mock the image import
jest.mock('../../../../../assets/images/hezPas.png', () => 'mocked-image.png');

describe('LandingDiv Component', () => {
  describe('Rendering', () => {
    it('renders all main sections', () => {
      render(<LandingDiv />);
      
      // Quote
      expect(screen.getByText(/The best way to predict the future/)).toBeInTheDocument();
      
      // Title
      expect(screen.getByText('Hezron Kimutai')).toBeInTheDocument();
      
      // Description
      expect(screen.getByText(/I am a FullStack Web developer/)).toBeInTheDocument();
      
      // Resume button
      expect(screen.getByText('Download Resume')).toBeInTheDocument();
      
      // Profile image
      expect(screen.getByAltText('Hezron Kimutai - Profile')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const customClass = 'custom-class';
      const { container } = render(<LandingDiv className={customClass} />);
      expect(container.firstChild).toHaveClass(customClass);
    });

    it('merges custom className with default styles', () => {
      const customClass = 'custom-class';
      const { container } = render(<LandingDiv className={customClass} />);
      expect(container.firstChild).toHaveClass('container', customClass);
    });
  });

  describe('Resume Link', () => {
    it('has correct attributes', () => {
      render(<LandingDiv />);
      const resumeLink = screen.getByText('Download Resume');
      
      expect(resumeLink).toHaveAttribute('href', expect.stringContaining('docs.google.com'));
      expect(resumeLink).toHaveAttribute('target', '_blank');
      expect(resumeLink).toHaveAttribute('rel', 'noreferrer');
      expect(resumeLink).toHaveAttribute('download');
    });
  });

  describe('Profile Image', () => {
    it('has correct attributes', () => {
      render(<LandingDiv />);
      const image = screen.getByAltText('Hezron Kimutai - Profile');
      
      expect(image).toHaveAttribute('src', 'mocked-image.png');
      expect(image).toHaveAttribute('loading', 'lazy');
      expect(image).toHaveClass('profileImage');
    });
  });

  describe('Accessibility', () => {
    it('has emoji with proper aria-label', () => {
      render(<LandingDiv />);
      const emoji = screen.getByRole('img', { name: 'hi' });
      expect(emoji).toBeInTheDocument();
    });

    it('has main heading with proper hierarchy', () => {
      render(<LandingDiv />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Hezron Kimutai');
    });

    it('has descriptive image alt text', () => {
      render(<LandingDiv />);
      expect(screen.getByAltText('Hezron Kimutai - Profile')).toBeInTheDocument();
    });

    it('has proper link text for resume download', () => {
      render(<LandingDiv />);
      const link = screen.getByText('Download Resume');
      expect(link).toHaveAccessibleName('Download Resume');
    });
  });
});