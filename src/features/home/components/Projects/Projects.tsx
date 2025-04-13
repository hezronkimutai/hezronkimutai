import React, { useState } from 'react';
import { ProjectsProps, ITEMS_PER_PAGE, Project } from '../../types/projects';
import { ProjectCard } from '../ProjectCard/ProjectCard';
import { Pagination } from '../Pagination/Pagination';
import styles from './Projects.module.scss';

export const Projects: React.FC<ProjectsProps> = ({
  className = '',
  itemsPerPage: rawItemsPerPage,
  projects = [],
}) => {
  // Ensure itemsPerPage is valid and positive
  const itemsPerPage = rawItemsPerPage && rawItemsPerPage > 0 
    ? rawItemsPerPage 
    : ITEMS_PER_PAGE;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (!projects.length) {
    return (
      <div className={`${styles.noProjects} ${className}`.trim()}>
        <p>No projects available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`.trim()} id="projects">
      <div className={styles.content}>
        <h1 className={styles.title} data-aos="flip-right">
          Featured Works and Case Studies
        </h1>
        
        <div className={styles.grid}>
          {currentProjects.map((project: Project) => (
            <ProjectCard
              key={`${project.name}-${project.link}`}
              project={project}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
            className={styles.pagination}
          />
        )}
      </div>
    </div>
  );
};

export default Projects;