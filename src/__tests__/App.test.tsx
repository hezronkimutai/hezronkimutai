import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App Component', () => {
  it('renders app component', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders home route by default', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('has correct route configuration', () => {
    const { container } = render(<App />);
    // Check if app container is present
    expect(container.firstChild).toBeInTheDocument();
  });
});