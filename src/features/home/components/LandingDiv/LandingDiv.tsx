import React from 'react';
import hezPas from '../../../../assets/images/hezPas.png';
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
        <i className={styles.quote}>
          &quot;The best way to predict the future is by comparing today and yesterday&quot;
        </i>
        <h1 className={styles.title}>Hezron Kimutai</h1>
        <p className={styles.description}>
          Hi,
          {' '}
          <span role="img" aria-label="hi">👋</span>
          {' '}
          I am a FullStack Web developer, an open source enthusiast, and a blogger.
        </p>
        <a
          className={styles.resumeButton}
          href="https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing"
          rel="noreferrer"
          target="_blank"
          download
        >
          Download Resume
        </a>
      </div>
      <div className={styles.imageContainer}>
        <img
          className={styles.profileImage}
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