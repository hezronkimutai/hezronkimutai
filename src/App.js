import React, { useState, useRef } from 'react';
import './assets/css/App.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import LandingDiv, { CallToactionBtn } from './LandingDiv';
import Profile from './Profile';
import Experiences from './Experiences';
import Abilities from './Abilities';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import navDisplayData from './helpers/navActivestyle';

AOS.init({ delay: 10 });

const actualPositions = (arr) => arr.map((item) => {
  const res = item + Math.abs(Math.min(...arr));
  return res;
});

const App = () => {
  const [experienceRef, setExperienceRef] = useState({});
  const [profileRef, setProfileRef] = useState({});
  const [abilitiesRef, setAbilitiesRef] = useState({});
  const [currentFormat, setCurrentFormat] = useState([1, 0, 0, 0, 0]);
  const [projectsRef, setProjectsRef] = useState({});
  const [landingDivRef, setLandingDivRef] = useState({});
  const [blogRef, setBlogRef] = useState({});

  const navData = [
    {
      navItemStyle: {},
      displayText: 'Home',
      format: [1, 0, 0, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Profile',
      format: [0, 1, 0, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Experience',
      format: [0, 0, 1, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Abilities',
      format: [0, 0, 0, 1, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Projects',
      format: [0, 0, 0, 0, 1, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Blog',
      format: [0, 0, 0, 0, 0, 1],
    },
  ];
  const containerRef = useRef();
  const sideBarData = navDisplayData(currentFormat, navData);
  return (

    <div
      className="_container h-full w-full m-auto fixed"
      onScroll={() => {
        AOS.refresh();
      }}
      ref={containerRef}
      onScrollCapture={() => {
        if (
          experienceRef.current.getBoundingClientRect().y < 500
            && experienceRef.current.getBoundingClientRect().y > 0
        ) {
          setCurrentFormat([0, 0, 1, 0, 0, 0]);
        }
        if (
          profileRef.current.getBoundingClientRect().y < 150
            && profileRef.current.getBoundingClientRect().y > 0
        ) {
          setCurrentFormat([0, 1, 0, 0, 0, 0]);
        }
        if (
          abilitiesRef.current.getBoundingClientRect().y < 500
            && abilitiesRef.current.getBoundingClientRect().y > 0
        ) {
          setCurrentFormat([0, 0, 0, 1, 0, 0]);
        }
        if (
          projectsRef.current.getBoundingClientRect().y < 500
            && projectsRef.current.getBoundingClientRect().y > 0
        ) {
          setCurrentFormat([0, 0, 0, 0, 1, 0]);
        }
        if (
          blogRef.current.getBoundingClientRect().y < 500
            && blogRef.current.getBoundingClientRect().y > 0
        ) {
          setCurrentFormat([0, 0, 0, 0, 0, 1]);
        }
        if (landingDivRef.current.getBoundingClientRect().y > -50) {
          setCurrentFormat([1, 0, 0, 0, 0, 0]);
        }
      }}
    >
      <div className="sidebar justify-between flex flex-row">
        <div className="">
          <CallToactionBtn className="transition font-semibold m-2 px-2 py-1 delay-150  text-gray-100 bg-orange-700 rounded duration-300 ease-in-out " onClick={() => 0} displayText="DONATE" />
        </div>
        <div className="flex justify-between m-auto flex-row">
          {sideBarData.map((item, index) => (
            <div className="_sidebar">
              <button
                type="button"
                onClick={() => {
                  const relativePositions = [
                    landingDivRef.current.getBoundingClientRect().y,
                    profileRef.current.getBoundingClientRect().y,
                    experienceRef.current.getBoundingClientRect().y,
                    abilitiesRef.current.getBoundingClientRect().y,
                    projectsRef.current.getBoundingClientRect().y,
                    blogRef.current.getBoundingClientRect().y,
                  ];
                  setCurrentFormat(item.format);
                  containerRef.current.scrollTo(
                    0,
                    actualPositions(relativePositions)[index],
                  );
                }}
                style={item.navItemStyle}
              >
                {item.displayText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <LandingDiv land={(e) => setLandingDivRef(e)} />
      <Profile prof={(e) => setProfileRef(e)} />
      <Experiences exp={(e) => setExperienceRef(e)} />
      <Abilities abl={(e) => setAbilitiesRef(e)} />
      <Projects abl={(e) => setProjectsRef(e)} />
      <Blogs abl={(e) => setBlogRef(e)} />
      {/* <ScrollAnimation animateIn='flipInY'
  animateOut='flipOutY' >
       <h1> Haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaahahahh</h1>
      </ScrollAnimation> */}
      <Footer />

    </div>
  );
};

export default App;
