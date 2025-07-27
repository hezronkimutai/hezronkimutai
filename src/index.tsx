import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './main.css';
import './styles/text-contrast.css';

// Add floating animation styles
const floatingStyles = `
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = floatingStyles;
document.head.appendChild(styleSheet);

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