import React from 'react';
import PropTypes from 'prop-types';
import hezPas from '../../assets/images/hezPas.png';

export const CallToactionBtn = ({ onClick, displayText, className }) => (
  <button className={className} onClick={onClick} type="button">
    {displayText}
  </button>
);

const LandingDiv = () => (
  <div className="relative mx-auto w-full md:w-10/12 lg:w-9/12 xl:w-8/12 min-h-[80vh]">
    <div className="w-full md:w-10/12 mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:w-1/2 text-center">
        <div className="backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <i className="block italic text-lg mb-4 opacity-80">
            &quot;The best way to predict the future is by comparing today and yesterday&quot;
          </i>
          <h1 className="text-4xl font-bold mb-4">
            Hezron Kimutai
          </h1>
          <p className="text-xl font-semibold mb-6 opacity-80">
            Hi,
            {' '}
            <span role="img" aria-label="hi" className="animate-bounce inline-block">👋</span>
            {' '}
            I am a FullStack Web developer, an open source enthusiast, and a blogger.
          </p>
          <a
            className="inline-flex items-center px-8 py-3 text-lg font-semibold text-white
              bg-red hover:bg-orange rounded-full
              transform transition-all duration-300 hover:scale-105
              shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
            href="https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing"
            rel="noreferrer"
            target="_blank"
            download
          >
            Download Resume
          </a>
        </div>
      </div>
      <div className="md:w-1/2">
        <div className="relative group">
          <img
            className="w-full rounded-full shadow-xl
              transform transition-transform duration-700
              group-hover:scale-[1.02]"
            src={hezPas}
            alt="Hezron Kimutai Profile"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity duration-700
            border border-black/10 dark:border-white/10" 
          />
        </div>
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
