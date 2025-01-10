import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


test('Renders Landing Page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hezron Kimutai/i);
  expect(linkElement).toBeInTheDocument();
});
