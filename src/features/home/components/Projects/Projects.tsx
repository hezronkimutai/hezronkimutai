import React, { useState, useEffect } from 'react';
import { ProjectCard } from '../ProjectCard';
import { Pagination } from '../Pagination';
import { defaultProjects, ITEMS_PER_PAGE } from '../../types/projects';

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
      className={`py-16 ${className}`.trim()}
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            id="projects-title"
            className="text-4xl font-bold text-center mb-12"
            data-aos="flip-right"
          >
            {title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProjects.map((project, index) => (
              <div
                key={`${project.name}-${index}`}
                className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProjectCard
                  {...project}
                  className="h-full transform transition-all duration-500 hover:-translate-y-2"
                />
              </div>
            ))}
          </div>

          {showPagination && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                className="animate-[fadeIn_0.5s_ease-out_0.8s_both]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;