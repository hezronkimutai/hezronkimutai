import React from 'react';
import { CallToActionBtn } from '../CallToActionBtn/CallToActionBtn';
import hezPas from '../../../../assets/images/hezPas.png';
import styles from './LandingDiv.module.scss';

interface LandingDivProps {
  resumeUrl?: string;
  className?: string;
}

export const LandingDiv: React.FC<LandingDivProps> = ({
  resumeUrl = 'https://docs.google.com/document/d/1r5V9Pm0FhYDSiu1G4dtHqJ0QlbUZCq-r52SAM1OHago/edit?usp=sharing',
  className = '',
}) => {
  const handleResumeDownload = () => {
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`${styles.landingDiv} ${className}`.trim()}>
      <div className={styles.welcome}>
        <div className={styles.content}>
          <i className={styles.quote}>
            "The best way to predict the future is by comparing today and yesterday"
          </i>
          <h1 className={styles.title}>Hezron Kimutai</h1>
          <p className={styles.description}>
            Hi,
            {' '}
            <span role="img" aria-label="hi">👋</span>
            {' '}
            I am a FullStack Web developer, an open source enthusiast, and a blogger.
          </p>
          <CallToActionBtn
            className={styles.downloadButton}
            onClick={handleResumeDownload}
            displayText="Download Resume"
          />
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.profileImage}
            src={hezPas}
            alt="Hezron Kimutai - FullStack Developer"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingDiv;