import React from 'react';
import { TeamCardProps } from '../../types/team';
import styles from './TeamCard.module.scss';
import images from '../../../../components/images';

export const TeamCard: React.FC<TeamCardProps> = ({
  member,
  className = '',
}) => (
  <div
    className={`${styles.card} ${className}`.trim()}
    data-aos="zoom-in"
  >
    <div className={styles.imageWrapper}>
      <img
        className={styles.image}
        src={images[member.imageUrl as keyof typeof images]}
        alt={`${member.name}'s profile`}
        loading="lazy"
      />
    </div>
    
    <div className={styles.content}>
      <a
        className={styles.name}
        href={member.webUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {member.name}
      </a>
      
      {member.role && (
        <p className={styles.role}>{member.role}</p>
      )}
      
      {member.description && (
        <p className={styles.description}>{member.description}</p>
      )}
    </div>
  </div>
);

TeamCard.displayName = 'TeamCard';

export default TeamCard;