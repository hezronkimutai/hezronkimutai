import React, { useRef } from 'react';
import propTypes from 'prop-types';

export const CallToactionBtn = ({ onClick, displayText, className }) => <button className={className} onClick={onClick} type="button">{displayText}</button>;

const LandingDiv = ({ land }) => {
  const landingDivRef = useRef();
  land(landingDivRef);
  return (
    <div className="landingDiv min-h-full relative mx-auto w-11/12" ref={landingDivRef}>
      <div className="welcome">
        <div

          className="left"
        >
          <span>
            <h1
              data-aos="fade-right"
              className="text-4xl text-gray-700 mb-5 font-bold"
            >
              Hezron Kimutai
            </h1>
            <h1
              data-aos="fade-right"
              className="text-2xl text-gray-800 font-semibold"
            >
              Hi,
              <span role="img" aria-label="hi">👋</span>
              I am a FullStack Web developer, an open source enthusiast and a blogger
            </h1>
            <a className="   text-2xl font-semibold m-2 p-3 px-4 bg-blue-700 rounded text-gray-100 delay-150 duration-300 ease-in-out " href="https://docs.google.com/document/u/0/?usp=docs_web" download>Resume</a>
            <CallToactionBtn className="   text-2xl font-semibold m-2 p-3 px-4 bg-blue-700 rounded text-gray-100 delay-150 duration-300 ease-in-out " onClick={() => 0} displayText="RESUME" />
          </span>
        </div>
        <img
          className="right"
          style={{ width: '50%', margin: 'auto' }}
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
