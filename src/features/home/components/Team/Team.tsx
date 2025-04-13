import React from 'react';
import { TeamCard } from '../TeamCard';
import { defaultTeamMembers, defaultTitle } from '../../types/team';
import images from '../../../../components/images';
import styles from './Team.module.scss';

export interface TeamProps {
  /**
   * Optional className for container styles
   */
  className?: string;

  /**
   * Optional title override
   */
  title?: string;

  /**
   * Optional team members data override
   */
  members?: typeof defaultTeamMembers;
}

export const Team: React.FC<TeamProps> = ({
  className = '',
  title = defaultTitle,
  members = defaultTeamMembers,
}) => (
  <section 
    className={`${styles.container} ${className}`.trim()} 
    id="team"
    aria-labelledby="team-title"
  >
    <div className={styles.content}>
      <h2
        id="team-title"
        className={styles.title}
        data-aos="flip-right"
      >
        {title}
      </h2>

      <div className={styles.grid}>
        {members.map((member) => (
          <TeamCard
            key={member.webUrl}
            {...member}
            imageUrl={
              // Map image string to actual image from images object
              typeof member.imageUrl === 'string' && images[member.imageUrl as keyof typeof images]
                ? images[member.imageUrl as keyof typeof images]
                : member.imageUrl
            }
            className={styles.card}
          />
        ))}
      </div>
    </div>
  </section>
);

Team.displayName = 'Team';

export default Team;