import React from 'react';
import type { Project } from '../../types/projects';

export interface ProjectCardProps extends Project {
  /**
   * Optional CSS class name
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
    className={`rounded-lg overflow-hidden shadow-lg
      border border-black/10 dark:border-white/10
      transition-all duration-500 ${className}`.trim()}
    data-aos="fade-up"
  >
    <header className="p-4 border-b border-black/10 dark:border-white/10">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
        aria-label={`View ${name} project`}
      >
        <img
          src={imageUrl}
          alt={`${name} thumbnail`}
          className="w-10 h-10 object-cover rounded-full border-2 border-black/10 dark:border-white/10
            transition-transform duration-300 ease-in-out hover:scale-105"
          loading="lazy"
        />
      </a>
      <h3 className="text-lg font-bold">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline transition-all duration-200
            focus:outline-none focus:underline"
        >
          {name}
        </a>
      </h3>
    </header>
    
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-sm mb-4 opacity-80">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-semibold mt-auto 
          transition-all duration-200 ease-in-out hover:translate-x-1
          focus:outline-none focus:ring-2 focus:ring-offset-2 rounded
          group"
      >
        View Project
        <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
        <span className="sr-only"> {name} (opens in new tab)</span>
      </a>
    </div>
  </article>
);

ProjectCard.displayName = 'ProjectCard';

export default React.memo(ProjectCard);