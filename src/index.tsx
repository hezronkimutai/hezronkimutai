import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './main.css';

// Get the root element
const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error(
    'Failed to find root element. Make sure there is a div with id "app" in your HTML.'
  );
}

// Create root with type safety
const root = ReactDOM.createRoot(rootElement);

// Render the App with strict mode for better development experience
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);