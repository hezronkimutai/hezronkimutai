import React from 'react';
import type { Project } from '../../types/projects';
import styles from './ProjectCard.module.scss';

export interface ProjectCardProps extends Project {
  /**
   * Optional className for container styles
   */
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  name,
  imageUrl,
  link,
  description,
  className = '',
}) => (
  <article
    className={`${styles.container} ${className}`.trim()}
    data-aos="fade-up"
  >
    <header className={styles.header}>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.imageLink}
        aria-label={`View ${name} project`}
      >
        <img
          src={imageUrl}
          alt={`${name} thumbnail`}
          className={styles.thumbnail}
          loading="lazy"
        />
      </a>
      <h3 className={styles.title}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.titleLink}
        >
          {name}
        </a>
      </h3>
    </header>
    
    <div className={styles.content}>
      <p className={styles.description}>{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.viewLink}
      >
        View Project
        <span className="sr-only"> {name} (opens in new tab)</span>
      </a>
    </div>
  </article>
);

ProjectCard.displayName = 'ProjectCard';

export default React.memo(ProjectCard);