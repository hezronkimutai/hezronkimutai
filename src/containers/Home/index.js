/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import '../../assets/css/App.scss';
import BackgroundAnimation from '../../components/BackgroundAnimation'; // Import BackgroundAnimation
import LandingDiv from './LandingDiv';
import Profile from './Services';
import Experiences from './Experiences';
import Abilities from './WhyMe';
import Projects from './Projects';
import Footer from './Footer';
import images from '../../components/images';

const { github } = images;

const socialLinks = [{
  link: 'https://github.com/hezronkimutai/portfolio',
  imgUrl: github,
},
];

const App = () => {
  const [mode, setMode] = useState('dark');
  return (
    <div className="relative min-h-screen"> {/* Add relative positioning and min height */}
      {/* Background Animation Container */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <BackgroundAnimation />
      </div>

      {/* Main Content Container */}
      <div
        className={`_container w-full m-auto relative z-10 ${mode === 'light' ? 'text-gray-900' : 'text-gray-300'}`} // Remove background colors, add relative z-10
        onScrollCapture={(e) => {
          e.preventDefault();
        }}
      >
        {/* Top Bar */}
        <div style={{ width: '98%' }} className="z-20 fixed py-3 justify-between flex flex-row"> {/* Ensure top bar is above content */}
          <div className="flex flex-row">
            {socialLinks.map((lnk) => <a rel="noreferrer" href={lnk.link} key={lnk.link} target="_blank"><img alt={lnk.link} className="w-8 h-8 mx-3" src={lnk.imgUrl} /></a>)}
          </div>
          <div><button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className={`w-10 rounded-full h-6 ${mode === 'light' ? 'bg-gray-900' : 'bg-gray-100 '}`} type="button"><div className={`w-6 h-6 bg-blue-900  rounded-full ${mode === 'light' ? 'float-left' : 'float-right'}`} /></button></div>
        </div>

        {/* Page Sections */}
        <LandingDiv mode={mode} />
        <Abilities />
        <Profile />
        <Projects />
        <Experiences />
        <Footer />
      </div>
    </div>
  );
};
export default App;
