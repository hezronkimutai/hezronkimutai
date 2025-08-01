import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css'

// Create the root element
const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Use createRoot to render the App
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

