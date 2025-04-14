import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../index';

// Mock useLocation
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  Link: ({ children, to, className }: any) => (
    <a href={to} className={className} data-testid="mock-link">
      {children}
    </a>
  ),
}));

describe('NotFound', () => {
  const useLocation = require('react-router-dom').useLocation;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders basic 404 content', () => {
    useLocation.mockReturnValue({ pathname: '/invalid-path' });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByText(/Sorry, we couldn't find \/invalid-path/)).toBeInTheDocument();
  });

  it('displays the current pathname', () => {
    const testPath = '/test/path/123';
    useLocation.mockReturnValue({ pathname: testPath });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText(`Sorry, we couldn't find ${testPath}`)).toBeInTheDocument();
  });

  it('always renders Return Home link', () => {
    useLocation.mockReturnValue({ pathname: '/any-path' });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Return Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest('[data-testid="mock-link"]')).toHaveAttribute('href', '/');
  });

  it('shows Go to Blog link for blog routes', () => {
    useLocation.mockReturnValue({ pathname: '/blog/invalid-post' });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const blogLink = screen.getByText('Go to Blog');
    expect(blogLink).toBeInTheDocument();
    expect(blogLink.closest('[data-testid="mock-link"]')).toHaveAttribute('href', '/blog');
  });

  it('does not show Go to Blog link for non-blog routes', () => {
    useLocation.mockReturnValue({ pathname: '/other/invalid-path' });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.queryByText('Go to Blog')).not.toBeInTheDocument();
  });

  it('applies correct styling to links', () => {
    useLocation.mockReturnValue({ pathname: '/blog/invalid-post' });
    
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByText('Return Home').closest('[data-testid="mock-link"]');
    const blogLink = screen.getByText('Go to Blog').closest('[data-testid="mock-link"]');

    expect(homeLink).toHaveClass('bg-blue-600');
    expect(blogLink).toHaveClass('bg-white');
  });

  it('renders with correct layout classes', () => {
    useLocation.mockReturnValue({ pathname: '/any-path' });
    
    const { container } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });
});