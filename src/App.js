/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import './assets/css/App.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import propTypes from 'prop-types';
import LandingDiv from './LandingDiv';
import Profile from './Services';
import Experiences from './Experiences';
import Abilities from './WhyMe';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import navDisplayData from './helpers/navActivestyle';
import CancelIcon from './assets/icons/cancel';
// import ShowIcon from './assets/icons/show';
import ListIcon from './assets/icons/list';
import images from './components/images';

const { github } = images;

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
  console.log(currentFormat);
  const navData = [
    {
      navItemStyle: {},
      displayText: 'Home',
      format: [1, 0, 0, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Services',
      format: [0, 1, 0, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Experience',
      format: [0, 0, 1, 0, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Why Me',
      format: [0, 0, 0, 1, 0, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Projects',
      format: [0, 0, 0, 0, 1, 0],
    },
    {
      navItemStyle: {},
      displayText: 'Blogs',
      format: [0, 0, 0, 0, 0, 1],
    },
  ];
  const containerRef = useRef();
  const sideBarData = navDisplayData(currentFormat, navData);
  return (

    <div
      className="_container text-gray-800 w-full m-auto"
      // onScroll={() => {
      //   AOS.refresh();
      // }}
      ref={containerRef}
      onScrollCapture={(e) => {
        e.preventDefault();
        AOS.refresh();
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
      <div style={{ position: 'sticky', top: '0px' }} className="z-10 w-full py-3 justify-between flex flex-row">
        <Sidebar
          sideBarData={sideBarData}
          landingDivRef={landingDivRef}
          profileRef={profileRef}
          experienceRef={experienceRef}
          abilitiesRef={abilitiesRef}
          projectsRef={projectsRef}
          blogRef={blogRef}
          setCurrentFormat={setCurrentFormat}
          containerRef={containerRef}
        />
        <div className="flex flex-row">
          <a rel="noreferrer" href="https://github.com/hezronkimutai/portfolio" target="_blank"><img className="w-8 h-8 mx-3" src={github} alt="github" /></a>
        </div>
      </div>
      <LandingDiv land={(e) => setLandingDivRef(e)} />
      <Profile prof={(e) => setProfileRef(e)} />
      <Projects abl={(e) => setProjectsRef(e)} />
      <Experiences exp={(e) => setExperienceRef(e)} />
      <Abilities abl={(e) => setAbilitiesRef(e)} />
      <Blogs abl={(e) => setBlogRef(e)} />
      <Footer />
    </div>
  );
};

export default App;

const Sidebar = (props) => {
  const {
    sideBarData,
    landingDivRef, profileRef,
    experienceRef, abilitiesRef,
    projectsRef, blogRef,
    setCurrentFormat, containerRef,
  } = props;
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="flex w-11/12  justify-between m-auto flex-col">
      { !showSideBar && (
      <button className="bg-transparent border-transparent" style={{ background: 'transparent', width: 'fit-content' }} onClick={() => setShowSideBar(!showSideBar)} type="button">
        {/* <CancelIcon /> */}
        {/* <ShowIcon /> */}
        <ListIcon />
      </button>
      )}
      { showSideBar && (
      <div className="flex absolute shadow px-4 py-2 bg-blue-700 text-white rounded justify-between m-auto flex-col">
        <button
          className="bg-transparent"
          style={{
            background: 'transparent', float: 'right', right: '0px', width: 'min-content',
          }}
          onClick={() => setShowSideBar(!showSideBar)}
          type="button"
        >
          <CancelIcon />
          {/* <ShowIcon />
          <ListIcon /> */}
        </button>
        {sideBarData.map((item, index) => (
          <div className="_sidebar absol w-full">
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
      )}
    </div>
  );
};
Sidebar.propTypes = {
  sideBarData: propTypes.array.isRequired,
  landingDivRef: propTypes.object.isRequired,
  profileRef: propTypes.object.isRequired,
  experienceRef: propTypes.object.isRequired,
  abilitiesRef: propTypes.object.isRequired,
  projectsRef: propTypes.object.isRequired,
  blogRef: propTypes.object.isRequired,
  setCurrentFormat: propTypes.object.isRequired,
  containerRef: propTypes.object.isRequired,
};
AOS.init({ delay: 200, duration: 600 });
