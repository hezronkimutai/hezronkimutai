import React from 'react';
import PropTypes from 'prop-types';

export const CallToactionBtn = ({ onClick, displayText, className }) => (
  <button className={className} onClick={onClick} type="button">
    {displayText}
  </button>
);

const LandingDiv = () => (
  <div className="landingDiv relative mx-auto w-full md:w-10/12 lg:w-9/12 xl:w-8/12">
    <div className="welcome w-full md:w-10/12 mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2 text-center">
        <i className="italic text-gray-600 text-lg mb-4">
          &quot;The best way to predict the future is by comparing today and yesterday&quot;
        </i>
        <h1 className="text-4xl font-bold mb-4">Hezron Kimutai</h1>
        <p className="text-xl font-semibold mb-6">
          Hi,
          {' '}
          <span role="img" aria-label="hi">👋</span>
          {' '}
          I am a FullStack Web developer, an open source enthusiast, and a blogger.
        </p>
        <a
          className="text-lg font-semibold py-3 px-6 bg-blue-700 rounded-full text-gray-100 transition duration-300 ease-in-out hover:bg-blue-900"
          href="https://res.cloudinary.com/hezzie/image/upload/v1601236612/Hezron_Kimutai_Chelimo-Resume_vkewua.pdf"
          rel="noreferrer"
          target="_blank"
          download
        >
          Download Resume
        </a>
      </div>
      <div className="md:w-1/2">
        <img
          className="w-full rounded-lg"
          src="https://res.cloudinary.com/hezzie/image/upload/v1601295981/imageedit_69_7065262263_gecypg.png"
          alt="Welcome Page"
        />
      </div>
    </div>
  </div>
);

CallToactionBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
  displayText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

LandingDiv.propTypes = {};

LandingDiv.defaultProps = {
  land: null,
};

export default LandingDiv;
