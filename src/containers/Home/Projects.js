import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

const projects = [
  {
    name: 'Tikiti',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://tikiti-theta.vercel.app/',
    description: 'Tikiti is a ticketing platform designed to streamline event management and ticket sales.',
  },
  {
    name: 'The Saniak Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thesaniakgroup.vercel.app/',
    description: 'The Saniak Group is an innovative business solutions provider for small and medium-sized enterprises.',
  },
  {
    name: 'The Nyongi Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thenyongigroup.vercel.app/',
    description: 'The Nyongi Group focuses on impactful community initiatives and business development.',
  },
  {
    name: 'LIF Community',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://lifcommunity.vercel.app/',
    description: 'LIF Community is a platform fostering connections and collaborations within local communities.',
  },
  {
    name: 'The HK Group',
    imageUrl: 'https://via.placeholder.com/300',
    link: 'https://thehkgroup.vercel.app/',
    description: 'The HK Group provides comprehensive services for business and organizational growth.',
  },
];

const ITEMS_PER_PAGE = 3;

const ProjectCard = memo(({ project }) => (
  <div style={{display:'flex', flexDirection:'column'}} 
    className="flex flex-col w-[30%] min-w-[320px] bg-primary/80
      shadow-lg rounded-lg overflow-hidden 
      border border-gold/20 hover:border-gold/40
      transform hover:scale-105 hover:shadow-2xl hover:shadow-gold/20
      transition-all duration-500">
    <div className="flex items-center p-4 border-b border-gold/20">
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-10 h-10 object-cover rounded-full mr-4
            border-2 border-gold/20 hover:border-gold/60
            transition-all duration-300"
        />
      </a>
      <h2 className="text-lg font-bold text-gold">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.name}
        </a>
      </h2>
    </div>
    <div className="p-4">
      <p className="text-sm text-gold/80">{project.description}</p>
    </div>
  </div>
));

ProjectCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => (
  <div className="flex justify-center items-center mt-8 space-x-4">
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded font-medium
        text-gold hover:text-orange disabled:opacity-50 
        disabled:cursor-not-allowed transition-all duration-300"
    >
      Previous
    </button>
    <span className="font-medium text-gold">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded font-medium
        text-gold hover:text-orange disabled:opacity-50 
        disabled:cursor-not-allowed transition-all duration-300"
    >
      Next
    </button>
  </div>
);

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const currentProjects = projects.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="mx-auto w-full py-12 bg-primary/50" id="projects">
      <div className="container mx-auto px-4">
        <h1
          data-aos="flip-right"
          className="text-4xl text-center font-bold mb-12 text-gold"
        >
          Featured Works and Case Studies
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default Projects;