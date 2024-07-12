import React from 'react';
import { render } from 'react-dom';
import AOS from 'aos';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('app');
render(<App />, rootElement);

AOS.init({ delay: 5, duration: 200 });
