import React from 'react';
import type { TeamMember } from '../../types/team';
import styles from './TeamCard.module.scss';

export interface TeamCardProps extends TeamMember {
  /**
   * Optional className for styling
   */
  className?: string;
}

export const TeamCard: React.FC<TeamCardProps> = ({
  imageUrl,
  name,
  webUrl,
  role,
  socials,
  className = '',
}) => (
  <article 
    className={`${styles.container} ${className}`.trim()}
    data-aos="zoom-in"
  >
    <div className={styles.imageWrapper}>
      <img
        className={styles.image}
        src={imageUrl}
        alt={`${name}'s profile`}
        loading="lazy"
      />
    </div>
    
    <div className={styles.content}>
      <h3 className={styles.name}>
        <a
          href={webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {name}
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      </h3>

      {role && (
        <p className={styles.role}>{role}</p>
      )}

      {socials && Object.keys(socials).length > 0 && (
        <div className={styles.socials}>
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`${name}'s GitHub profile`}
            >
              <span className={`${styles.socialIcon} ${styles.githubIcon}`} />
            </a>
          )}
          
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`${name}'s LinkedIn profile`}
            >
              <span className={`${styles.socialIcon} ${styles.linkedinIcon}`} />
            </a>
          )}
          
          {socials.twitter && (
            <a
              href={socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`${name}'s Twitter profile`}
            >
              <span className={`${styles.socialIcon} ${styles.twitterIcon}`} />
            </a>
          )}
          
          {socials.portfolio && !webUrl.includes('github.com') && (
            <a
              href={socials.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={`${name}'s portfolio website`}
            >
              <span className={`${styles.socialIcon} ${styles.portfolioIcon}`} />
            </a>
          )}
        </div>
      )}
    </div>
  </article>
);

TeamCard.displayName = 'TeamCard';

export default React.memo(TeamCard);