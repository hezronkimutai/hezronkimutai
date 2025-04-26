import React from 'react';
import hezPas from '../../../../assets/images/hezPas.png';

export interface LandingDivProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const LandingDiv: React.FC<LandingDivProps> = ({
  className = '',
}) => (
  <div className={`relative mx-auto w-full md:w-10/12 lg:w-9/12 xl:w-8/12 ${className}`.trim()}>
    <div className="w-full mx-auto flex flex-col items-center justify-center gap-8 md:w-10/12 md:flex-row">
      <div className="md:w-1/2 text-center">
        <i className="block italic text-lg mb-4 text-gold">
          &quot;The best way to predict the future is by comparing today and yesterday&quot;
        </i>
        <h1 className="text-4xl font-bold mb-4 text-primary">Hezron Kimutai</h1>
        <p className="text-xl font-semibold mb-6 text-orange">
          Hi,
          {' '}
          <span role="img" aria-label="hi">👋</span>
          {' '}
          I am a FullStack Web developer, an open source enthusiast, and a blogger.
        </p>
        <a
          className="text-lg font-semibold py-3 px-6 rounded-full inline-block bg-primary text-white hover:bg-red transition-colors duration-300"
          href="https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing"
          rel="noreferrer"
          target="_blank"
          download
        >
          Download Resume
        </a>
      </div>
      <div className="md:w-1/2">
        <img
          className="w-full rounded-[50%] transition-transform duration-300 hover:scale-102 shadow-lg"
          src={hezPas}
          alt="Hezron Kimutai - Profile"
          loading="lazy"
        />
      </div>
    </div>
  </div>
);

LandingDiv.displayName = 'LandingDiv';

export default LandingDiv;