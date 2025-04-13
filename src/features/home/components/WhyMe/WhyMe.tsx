import React from 'react';
import { WhyMeProps, DEFAULT_WHY_ME_CONTENT } from '../../types/whyMe';
import { CallToActionBtn } from '../CallToActionBtn';
import styles from './WhyMe.module.scss';

export const WhyMe: React.FC<WhyMeProps> = ({
  className = '',
  description = DEFAULT_WHY_ME_CONTENT.description,
  imageUrl = DEFAULT_WHY_ME_CONTENT.imageUrl,
  onHireClick = () => window.open(DEFAULT_WHY_ME_CONTENT.resumeUrl, '_blank', 'noopener,noreferrer'),
}) => (
  <div className={`${styles.container} ${className}`.trim()}>
    <div className={styles.content}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={imageUrl}
            alt="Hezron Kimutai - Full Stack Developer"
            loading="lazy"
          />
        </div>
        
        <div className={styles.textContent}>
          <p className={styles.description}>{description}</p>
          
          <CallToActionBtn
            className={styles.hireButton}
            onClick={onHireClick}
            displayText="HIRE ME"
          />
        </div>
      </div>
    </div>
  </div>
);

WhyMe.displayName = 'WhyMe';

export default WhyMe;