import React from 'react';
import propTypes from 'prop-types';

export const CallToactionBtn = ({ onClick, displayText, className }) => <button className={className} onClick={onClick} type="button">{displayText}</button>;

const LandingDiv = () => (
  <div className="landingDiv relative mx-auto w-10/12">
    <div className="welcome w-10/12 m-auto">
      <div
        className="left"
      >
        <span>
          <i>The best way to predict the future is by comparing today and yesterday</i>
          <h1
            className="text-4xl   font-bold"
          >
            Hezron Kimutai
          </h1>
          <h1
            className="text-2xl  font-semibold"
          >
            Hi,
            <span role="img" aria-label="hi">👋</span>
            I am a FullStack Web developer, an open source enthusiast and a blogger
          </h1>
          <a
            className="text-2xl font-semibold m-2 inline-block py-3 px-5 bg-blue-700 rounded-full text-gray-300 delay-150 duration-300 ease-in-out"
            href="https://res.cloudinary.com/hezzie/image/upload/v1601236612/Hezron_Kimutai_Chelimo-Resume_vkewua.pdf"
            rel="noreferrer"
            target="_blank"
            download
          >
            Resume
          </a>
        </span>
      </div>
      <img
        className="right"
        style={{ width: '50%', margin: 'auto' }}
        src="https://res.cloudinary.com/hezzie/image/upload/v1601295981/imageedit_69_7065262263_gecypg.png"
        alt="welcomePage"
      />

    </div>

  </div>
);
LandingDiv.propTypes = {
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
