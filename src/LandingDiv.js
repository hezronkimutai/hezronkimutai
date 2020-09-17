import React, { useRef } from 'react';
import propTypes from 'prop-types';

const LandingDiv = ({ land }) => {
  const landingDivRef = useRef();
  land(landingDivRef);
  return (
    <div style={{ position: 'relative' }} className="landingDiv" ref={landingDivRef}>
      <div className="scroll-indicator">
        <div className="dots" />
      </div>
      <div className="welcome">
        <div>
          <h1>I am Hezron Kimutai</h1>
          <h1>I am a web developer</h1>
          <p>
            Hi,
            I am Hezzie, a professional web developer with four years of experience. Need any help?
          </p>
          <button type="button">Download Resume</button>
          <button type="button">Hire Me</button>
        </div>
        <img src="https://res.cloudinary.com/hezzie/image/upload/v1600326551/pp-removebg_1_nosery.png" alt="welcomePage" />
      </div>

    </div>
  );
};
LandingDiv.propTypes = {
  land: propTypes.func,
};
LandingDiv.defaultProps = {
  land: null,
};
export default LandingDiv;
