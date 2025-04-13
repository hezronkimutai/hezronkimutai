import React, { useState } from 'react';
import { ProjectCard } from '../ProjectCard';
import { Pagination } from '../Pagination';
import { defaultProjects, ITEMS_PER_PAGE } from '../../types/projects';
import styles from './Projects.module.scss';

export interface ProjectsProps {
  /**
   * Optional className for container styles
   */
  className?: string;

  /**
   * Optional title override
   */
  title?: string;

  /**
   * Optional projects data override
   */
  projects?: typeof defaultProjects;

  /**
   * Optional items per page override
   */
  itemsPerPage?: number;
}

export const Projects: React.FC<ProjectsProps> = ({
  className = '',
  title = 'Featured Works and Case Studies',
  projects = defaultProjects,
  itemsPerPage = ITEMS_PER_PAGE,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <section 
      className={`${styles.container} ${className}`.trim()} 
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className={styles.content}>
        <h2
          id="projects-title"
          className={styles.title}
          data-aos="flip-right"
        >
          {title}
        </h2>

        <div className={styles.grid}>
          {currentProjects.map((project, index) => (
            <ProjectCard
              key={`${project.name}-${index}`}
              {...project}
              className={styles.card}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          className={styles.pagination}
        />
      </div>
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;