import React from 'react';
import ReactDOM from 'react-dom/client';
// import AOS from 'aos';
import App from './App';
import './styles.css';

// Create the root element
const rootElement = document.getElementById('app');

// Use createRoot to render the App
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

// AOS.init({ delay: 5, duration: 200 });
