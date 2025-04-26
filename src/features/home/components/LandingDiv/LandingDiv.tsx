import React from 'react';
import ThreeAnimation from '../../../../components/ThreeAnimation';
import styles from './LandingDiv.module.scss';

export interface LandingDivProps {
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const LandingDiv: React.FC<LandingDivProps> = ({
  className = '',
}) => (
  <div className={`${styles.container} ${className}`.trim()}>
    <div className={styles.content}>
      <div className={styles.textContent}>
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
      <div className={styles.animationContainer}>
        <ThreeAnimation />
      </div>
    </div>
  </div>
);

LandingDiv.displayName = 'LandingDiv';

export default LandingDiv;