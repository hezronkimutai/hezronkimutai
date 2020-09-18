import React, { useRef } from 'react';
import propTypes from 'prop-types';

const CallToactionBtn = ({ onClick, displayText }) => <button onClick={onClick} type="button">{displayText}</button>;

const LandingDiv = ({ land }) => {
  const landingDivRef = useRef();
  land(landingDivRef);
  return (
    <div style={{ position: 'relative' }} className="landingDiv" ref={landingDivRef}>
      <div className="scroll-indicator">
        <div className="dots" />
      </div>
      <div className="welcome">
        <div data-aos="fade-down-right" className="left">
          <div>
            <h1>Hezron Kimutai</h1>
            <h3>
              Hi,
              <span role="img" aria-label="hi">👋</span>
              I am a FullStack Web developer, an open source enthusiast and a blogger
            </h3>
            <CallToactionBtn onClick={() => 0} displayText="Download Resume" />
            <CallToactionBtn onClick={() => 0} displayText="Hire Me" />
          </div>
        </div>
        <img data-aos="fade-down-left" style={{ width: '40%', height: '70%', margin: 'auto' }} src="https://res.cloudinary.com/hezzie/image/upload/v1600409821/2479_xblseh.jpg" alt="welcomePage" />
      </div>

    </div>
  );
};
LandingDiv.propTypes = {
  land: propTypes.func,
};
CallToactionBtn.propTypes = {
  onClick: propTypes.func.isRequired,
  displayText: propTypes.string.isRequired,
};
LandingDiv.defaultProps = {
  land: null,
};
export default LandingDiv;
