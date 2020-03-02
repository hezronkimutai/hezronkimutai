import React from 'react';
import './assets/css/App.scss';
import LandingDiv from './LandingDiv';
import Profile from './Profile';
import Experiences from './Experiences';
import Abilities from './Abilities';
import Projects from './Projects';
import Footer from './Footer';

const App = () => (
  <div className="container">
    <LandingDiv />
    <Profile />
    <Experiences />
    <Abilities />
    <Projects />
    <Footer />
  </div>
);

export default App;
