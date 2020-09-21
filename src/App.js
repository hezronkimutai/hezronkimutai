/* eslint-disable react/forbid-prop-types */
import React, { useState, useRef } from 'react';
import './assets/css/App.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import propTypes from 'prop-types';
import LandingDiv, { CallToactionBtn } from './LandingDiv';
import Profile from './Services';
import Experiences from './Experiences';
import Abilities from './Abilities';
import Projects from './Projects';
import Blogs from './Blogs';
import Footer from './Footer';
import navDisplayData from './helpers/navActivestyle';
import CancelIcon from './assets/icons/cancel';
// import ShowIcon from './assets/icons/show';
import ListIcon from './assets/icons/list';
import images from './assets/images';

const { github } = images;

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
  console.log(currentFormat);
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
      className="_container h-full text-gray-800 w-full m-auto fixed"
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
      <div className="z-10 fixed w-full py-3 justify-between flex flex-row">
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
          {/* <CallToactionBtn
          className=`transition
          font-semibold m-2 px-2 py-1 delay-150
          text-gray-100 bg-orange-700
          rounded duration-300 ease-in-out`
           onClick={() => 0} displayText="DONATE" /> */}
          <a href="https://github.com/hezronkimutai/portfolio"><img className="w-8 h-8 mx-3" src={github} alt="github" /></a>
          {/* <img className="w-8 h-8 mx-1" src={fork} alt="fork" /> */}

        </div>
      </div>
      <LandingDiv land={(e) => setLandingDivRef(e)} />
      <Profile prof={(e) => setProfileRef(e)} />
      <Projects abl={(e) => setProjectsRef(e)} />
      <Experiences exp={(e) => setExperienceRef(e)} />
      <section style={{ width: 'fit-content', backgroundColor: '#DEECF7' }} className="mx-auto py-8">
        <h1
          data-aos="fade-down"
          data-aos-delay="100"
          data-aos-duration="700"
          className="w-1/2 text-gray-700 mx-auto text-4xl text-center font-bold"
        >
          WHY ME?
        </h1>
        <section style={{ }} className="mx-auto w-11/12 flex flex-row">
          <img src="https://res.cloudinary.com/hezzie/image/upload/v1600694200/ezgif.com-gif-maker_bgs3rk.png" alt="hezronKimutai" className="h-48  my-auto" />
          <div>
            <h3 className="text-l">
              Over the years, I have acquired relevant skills and experience,
              which I shall bring to your organization.
              I have also worked tirelessly on my
              communication abilities and teamwork
              skills, which I will put to use in my future career,
              which would be in your organization if I am selected for the position.
              I have given my 100% effort in my past
              companies, and this has enabled me to
              recognize my capabilities and limitations.
              If I channelize them further, they will
              bring fruitful results to me and also to your esteemed organization.
            </h3>
            <CallToactionBtn className="transition   text-2xl font-semibold m-1 p-3 bg-blue-700 rounded text-gray-100 delay-150 duration-300 ease-in-out " onClick={() => 0} displayText="HIRE ME" />
          </div>
        </section>
      </section>
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
