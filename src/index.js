import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './styles.css';
import AOS from 'aos';

const rootElement = document.getElementById('app');
render(<App />, rootElement);

AOS.init({ delay: 100, duration: 600 });

