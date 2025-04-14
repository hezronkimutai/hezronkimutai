import React, { useState, useEffect } from 'react';
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
  itemsPerPage: rawItemsPerPage = ITEMS_PER_PAGE,
}) => {
  // Ensure itemsPerPage is valid
  const itemsPerPage = Math.max(1, Math.round(rawItemsPerPage));
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(projects.length / itemsPerPage));

  // Reset page when projects or itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [projects.length, itemsPerPage]);

  // Ensure current page is valid when totalPages changes
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, projects.length);
  const currentProjects = projects.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const showPagination = totalPages > 1 && projects.length > 0;

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

        {showPagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            className={styles.pagination}
          />
        )}
      </div>
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;