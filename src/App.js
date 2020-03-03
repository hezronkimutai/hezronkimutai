import React, { useState } from 'react';
import './assets/css/App.scss';
import LandingDiv from './LandingDiv';
import Profile from './Profile';
import Experiences from './Experiences';
import Abilities from './Abilities';
import Projects from './Projects';
import Footer from './Footer';

const App = () => {
  const [profileNav, setProfileActiveColor] = useState({
    color: '#f6f7e9',
    backgroundColor: 'transparent',
  });
  const [experienceNav, setexperienceActiveColor] = useState({
    color: '#f6f7e9',
    backgroundColor: 'transparent',
  });
  const [abilitiesNav, setabilitiesActiveColor] = useState({
    color: '#f6f7e9',
    backgroundColor: 'transparent',
  });
  const [projectNav, setprojectActiveColor] = useState({
    color: '#f6f7e9',
    backgroundColor: 'transparent',
  });
  return (
    <>
      <div className="container">

        <LandingDiv />
        <div className="sidebar">
          <div className="sidebar">
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor({
                  color: '#403454',
                  backgroundColor: '#f6f7e9',
                });
                setexperienceActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setabilitiesActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setprojectActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
              }}
              style={profileNav}
            >
              <a href="#profile">Profile</a>
            </button>
          </div>
          <div className="sidebar">
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setexperienceActiveColor({
                  color: '#403454',
                  backgroundColor: '#f6f7e9',
                });
                setabilitiesActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setprojectActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
              }}
              style={experienceNav}
            >
              <a href="#experiences">Experience</a>
            </button>
          </div>
          <div className="sidebar">
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setexperienceActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setabilitiesActiveColor({
                  color: '#403454',
                  backgroundColor: '#f6f7e9',
                });
                setprojectActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
              }}
              style={abilitiesNav}
            >
              <a href="#abilities">Abilities</a>
            </button>
          </div>
          <div className="sidebar">
            <button
              type="button"
              onClick={() => {
                setProfileActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setexperienceActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setabilitiesActiveColor({
                  color: '#f6f7e9',
                  backgroundColor: 'transparent',
                });
                setprojectActiveColor({
                  color: '#403454',
                  backgroundColor: '#f6f7e9',
                });
              }}
              style={projectNav}
            >
              <a href="#projects">Projects</a>
            </button>
          </div>
          <div className="sidebar" style={{ color: '#f6f7e9' }}>
            <button type="button">
              <a href="#blog">blog</a>
            </button>
          </div>
        </div>
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
