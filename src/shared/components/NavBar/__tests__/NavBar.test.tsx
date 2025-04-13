import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { NavBar } from '..';
import { NavBarProps } from '../../../../types';

const renderWithRouter = (ui: React.ReactElement): RenderResult => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('NavBar Component', () => {
  it('renders default navigation links', () => {
    renderWithRouter(<NavBar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders custom navigation links', () => {
    const customLinks: NavBarProps['links'] = [
      { to: '/about', label: 'About' },
      { to: '/contact', label: 'Contact' }
    ];

    renderWithRouter(<NavBar links={customLinks} />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithRouter(
      <NavBar className="custom-nav" />
    );

    const nav = container.firstChild as HTMLElement;
    expect(nav.className).toContain('custom-nav');
    expect(nav.className).toContain('navbar_container');
  });

  it('renders links with correct href attributes', () => {
    renderWithRouter(<NavBar />);
    
    const homeLink = screen.getByText('Home') as HTMLAnchorElement;
    const blogLink = screen.getByText('Blog') as HTMLAnchorElement;
    
    expect(homeLink.getAttribute('href')).toBe('/');
    expect(blogLink.getAttribute('href')).toBe('/blog');
  });
});