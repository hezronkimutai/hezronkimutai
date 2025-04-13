import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  it('renders navigation bar', () => {
    render(<App />);
    const navElement = document.querySelector('.navbar_container');
    expect(navElement).toBeInTheDocument();
  });

  it('renders home route by default', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('contains correct routes', () => {
    render(<App />);
    const homeLink = screen.getByText('Home');
    const blogLink = screen.getByText('Blog');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(blogLink).toHaveAttribute('href', '/blog');
  });

  it('has correct route configuration', () => {
    const { container } = render(<App />);
    // Check if Routes component is present
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});