/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import '../assets/css/App.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LandingDiv from './LandingDiv';
import Profile from './Services';
import Experiences from './Experiences';
import Abilities from './WhyMe';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import Team from './Team';
import images from '../components/images';

const { github } = images;

const socialLinks = [{
  link: 'https://github.com/hezronkimutai/portfolio',
  imgUrl: github,
},
];

const App = () => {
  const [mode, setMode] = useState('light');
  return (
    <>
      <div
        className={`_container w-full m-auto ${mode === 'light' ? 'text-gray-700 bg-gray-100' : 'text-gray-300 bg-gray-700 '}`}
        onScrollCapture={(e) => {
          e.preventDefault();
          AOS.refresh();
        }}
      >
        <div style={{ width: '98%' }} className="z-10 fixed py-3 justify-between flex flex-row">
          <div className="flex flex-row">
            {socialLinks.map((lnk) => <a rel="noreferrer" href={lnk.link} key={lnk.link} target="_blank"><img alt={lnk.link} className="w-8 h-8 mx-3" src={lnk.imgUrl} /></a>)}
          </div>
          <div><button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} className={`w-10 mx-3 rounded-full h-6 ${mode === 'light' ? 'bg-gray-700' : 'bg-gray-100 '}`} type="button"><div className={`w-6 h-6 bg-blue-700  rounded-full ${mode === 'light' ? 'float-left' : 'float-right'}`} /></button></div>
        </div>
        <LandingDiv />
        <Profile />
        <Projects />
        <Experiences />
        <Abilities />
        <Blogs />
        <Team />
        <Footer />
      </div>
    </>
  );
};
export default App;
AOS.init({ delay: 200, duration: 600 });
