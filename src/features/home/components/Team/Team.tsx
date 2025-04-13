import React from 'react';
import { TeamProps, DEFAULT_TEAM_MEMBERS } from '../../types/team';
import { TeamCard } from '../TeamCard/TeamCard';
import styles from './Team.module.scss';

export const Team: React.FC<TeamProps> = ({
  className = '',
  members = DEFAULT_TEAM_MEMBERS,
}) => {
  if (!members.length) {
    return (
      <div className={`${styles.noMembers} ${className}`.trim()}>
        <p>No team members available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <div className={styles.content}>
        <h1 
          className={styles.title}
          data-aos="flip-right"
        >
          Our Team
        </h1>
        
        <div className={styles.grid}>
          {members.map((member) => (
            <TeamCard
              key={`${member.name}-${member.webUrl}`}
              member={member}
              className={styles.card}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Team.displayName = 'Team';

export default Team;