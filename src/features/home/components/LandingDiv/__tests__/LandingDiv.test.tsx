import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LandingDiv } from '../LandingDiv';

// Mock window.open
const mockOpen = jest.fn();
window.open = mockOpen;

// Mock the image import
jest.mock('../../../../../assets/images/hezPas.png', () => 'test-file-stub');

describe('LandingDiv Component', () => {
  beforeEach(() => {
    mockOpen.mockClear();
  });

  it('renders main content sections', () => {
    render(<LandingDiv />);
    
    // Check for main heading
    expect(screen.getByText('Hezron Kimutai')).toBeInTheDocument();
    
    // Check for quote
    expect(screen.getByText(/The best way to predict the future/)).toBeInTheDocument();
    
    // Check for description
    expect(screen.getByText(/I am a FullStack Web developer/)).toBeInTheDocument();
  });

  it('renders profile image with correct alt text', () => {
    render(<LandingDiv />);
    const image = screen.getByAltText('Hezron Kimutai - FullStack Developer');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-file-stub');
  });

  it('opens resume in new tab when clicking download button', () => {
    render(<LandingDiv />);
    const downloadButton = screen.getByText('Download Resume');
    
    fireEvent.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      'https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing',
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('accepts custom resume URL', () => {
    const customUrl = 'https://example.com/resume';
    render(<LandingDiv resumeUrl={customUrl} />);
    
    const downloadButton = screen.getByText('Download Resume');
    fireEvent.click(downloadButton);
    
    expect(mockOpen).toHaveBeenCalledWith(
      customUrl,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('applies custom className', () => {
    const customClass = 'custom-landing';
    const { container } = render(<LandingDiv className={customClass} />);
    
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('renders emoji with correct accessibility attributes', () => {
    render(<LandingDiv />);
    const emoji = screen.getByRole('img', { name: 'hi' });
    
    expect(emoji).toBeInTheDocument();
    expect(emoji).toHaveAttribute('role', 'img');
    expect(emoji).toHaveAttribute('aria-label', 'hi');
  });
});