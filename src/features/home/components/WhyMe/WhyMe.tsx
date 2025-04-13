import React from 'react';
import { CallToActionBtn } from '../CallToActionBtn';
import styles from './WhyMe.module.scss';

export interface WhyMeProps {
  /**
   * Optional className for the container
   */
  className?: string;

  /**
   * Optional image URL for profile picture
   */
  profileImageUrl?: string;

  /**
   * Custom description text
   */
  description?: string;

  /**
   * Handler for hire me button click
   */
  onHireClick?: () => void;
}

const defaultDescription = `
  Over the years, I have acquired relevant skills and experience,
  which I shall bring to your organization. I have also worked
  tirelessly on my communication abilities and teamwork skills, which
  I will put to use in my future career, which would be in your
  organization if I am selected for the position. I have given my
  100% effort in my past companies, and this has enabled me to
  recognize my capabilities and limitations. If I channelize them
  further, they will bring fruitful results to me and also to your
  esteemed organization.
`.trim();

export const WhyMe: React.FC<WhyMeProps> = ({
  className = '',
  profileImageUrl,
  description = defaultDescription,
  onHireClick = () => {},
}) => (
  <section 
    className={`${styles.container} ${className}`.trim()}
    aria-labelledby="why-me-heading"
  >
    <div className={styles.content}>
      <div className={styles.inner}>
        {profileImageUrl && (
          <img
            className={styles.profileImage}
            src={profileImageUrl}
            alt="Hezron Kimutai"
            loading="lazy"
          />
        )}
        <div className={styles.textContent}>
          <h2 id="why-me-heading" className="sr-only">Why Choose Me</h2>
          <p className={styles.description}>
            {description}
          </p>
          <CallToActionBtn
            className={styles.hireButton}
            onClick={onHireClick}
            displayText="HIRE ME"
          />
        </div>
      </div>
    </div>
  </section>
);

WhyMe.displayName = 'WhyMe';

export default WhyMe;