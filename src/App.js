import React, { useState } from 'react';
import './assets/css/App.scss';
import LandingDiv from './LandingDiv';
import Profile from './Profile';
import Experiences from './Experiences';
import Abilities from './Abilities';
import Projects from './Projects';
import Footer from './Footer';

const App = () => {
  const [profileActiveColor, setProfileActiveColor] = useState('white');
  const [experienceActiveColor, setexperienceActiveColor] = useState('white');
  const [abilitiesActiveColor, setabilitiesActiveColor] = useState('white');
  const [projectActiveColor, setprojectActiveColor] = useState('white');
  return (
    <>
      <div className="container">
        <div className="sidebar">
          <div className="sidebar" style={{ color: profileActiveColor }}>
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor('red');
                setexperienceActiveColor('white');
                setabilitiesActiveColor('white');
                setprojectActiveColor('white');
              }}
            >
              <a href="#profile">Profile</a>
            </button>
          </div>
          <div className="sidebar" style={{ color: experienceActiveColor }}>
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor('white');
                setexperienceActiveColor('red');
                setabilitiesActiveColor('white');
                setprojectActiveColor('white');
              }}
            >
              <a href="#experiences">Experience</a>
            </button>
          </div>
          <div className="sidebar" style={{ color: abilitiesActiveColor }}>
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor('white');
                setexperienceActiveColor('white');
                setabilitiesActiveColor('red');
                setprojectActiveColor('white');
              }}
            >
              <a href="#abilities">Abilities</a>
            </button>
          </div>
          <div className="sidebar" style={{ color: projectActiveColor }}>
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor('white');
                setexperienceActiveColor('white');
                setabilitiesActiveColor('white');
                setprojectActiveColor('red');
              }}
            >
              <a href="#projects">Projects</a>
            </button>
          </div>
          <div className="sidebar" style={{ color: profileActiveColor }}>
            <a href="#blog">blog</a>
          </div>
        </div>
        <LandingDiv />
        <Profile />
        <Experiences />
        <Abilities />
        <Projects />
        <Footer />
      </div>
    </>
  );
};

export default App;
