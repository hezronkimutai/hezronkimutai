import React, { useRef } from 'react';
import propTypes from 'prop-types';

export const CallToactionBtn = ({ onClick, displayText, className }) => <button className={className} onClick={onClick} type="button">{displayText}</button>;

const LandingDiv = ({ land }) => {
  const landingDivRef = useRef();
  land(landingDivRef);
  return (
    <div style={{ position: 'relative', minHeight: '90%' }} className="landingDiv " ref={landingDivRef}>
      {/* <div className="scroll-indicator">
        <div className="dots" />
      </div> */}
      <div className="welcome">
        <div
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-duration="1000"
          className="left"
        >
          <span>
            <h1 className="text-4xl my-5 font-bold">Hezron Kimutai</h1>
            <h1 className="text-xl font-semibold">
              Hi,
              <span role="img" aria-label="hi">👋</span>
              I am a FullStack Web developer, an open source enthusiast and a blogger
            </h1>
            <CallToactionBtn className="transition  text-2xl font-semibold m-2 p-4 bg-blue-700 rounded text-gray-100 delay-150 duration-300 ease-in-out " onClick={() => 0} displayText="DOWNLOAD RESUME" />
          </span>
        </div>
        <img
          data-aos="zoom-in"
          data-aos-delay="100"
          data-aos-duration="1000"
          style={{ width: '50%', height: '80%', margin: 'auto' }}
          src="https://res.cloudinary.com/hezzie/image/upload/v1600446790/imageedit_3_8141677005_oyxp66.png"
          alt="welcomePage"
        />

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
  className: propTypes.string.isRequired,
};
LandingDiv.defaultProps = {
  land: null,
};
export default LandingDiv;
