import React, { memo } from 'react';
import { ProjectCardProps } from '../../types/projects';
import styles from './ProjectCard.module.scss';

export const ProjectCard: React.FC<ProjectCardProps> = memo(({ 
  project,
  className = ''
}) => (
  <div className={`${styles.card} ${className}`.trim()}>
    <div className={styles.header}>
      <a 
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.imageLink}
      >
        <img
          src={project.imageUrl}
          alt={project.name}
          className={styles.image}
          loading="lazy"
        />
      </a>
      <h2 className={styles.title}>
        <a 
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.titleLink}
        >
          {project.name}
        </a>
      </h2>
    </div>
    <div className={styles.content}>
      <p className={styles.description}>{project.description}</p>
    </div>
  </div>
));

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;