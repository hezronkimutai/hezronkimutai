import React, { useState, memo } from 'react';

const projects = [
  {
    name: 'Tikiti',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://tikiti-theta.vercel.app/',
    description: 'Tikiti is a ticketing platform designed to streamline event management and ticket sales.',
  },
  {
    name: 'The Saniak Group',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://thesaniakgroup.vercel.app/',
    description: 'The Saniak Group is an innovative business solutions provider for small and medium-sized enterprises.',
  },
  {
    name: 'The Nyongi Group',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://thenyongigroup.vercel.app/',
    description: 'The Nyongi Group focuses on impactful community initiatives and business development.',
  },
  {
    name: 'LIF Community',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://lifcommunity.vercel.app/',
    description: 'LIF Community is a platform fostering connections and collaborations within local communities.',
  },
  {
    name: 'The HK Group',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://thehkgroup.vercel.app/',
    description: 'The HK Group provides comprehensive services for business and organizational growth.',
  },
  {
    name: 'Merigo Round Angular',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://merigoroundangular.vercel.app/home',
    description: 'Merigo Round Angular is the Angular version of the Merigo Round project, aimed at automating group funding.',
  },
  {
    name: 'POS FN ReactJS',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://pos-fn-reactjs.vercel.app/',
    description: 'POS FN ReactJS is a refined POS project built using ReactJS, promoting open-source collaboration.',
  },
  {
    name: 'Havalive',
    imageUrl: 'https://via.placeholder.com/300', // Update with the actual image URL
    link: 'https://havalive.netlify.app/',
    description: 'Havalive provides live updates on sports events, including scores, analysis, and lineups.',
  },
  // Existing projects remain as they are
  {
    name: 'Merigo Round',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://nyongiot-frontend.vercel.app',
    description: 'Merigo Round is aimed at automating group funding. It facilitates the organization and management of rotating savings and credit associations (ROSCAs), ensuring transparency and efficiency.',
  },
  {
    name: 'POS',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1720883600/POSSS-removebg-preview_iunknt.png',
    link: 'https://pos-fn-reactjs.vercel.app/',
    description: 'POS, or Paid Open Source, is designed to increase the frequency of open source projects by attaching a participatory price tag. It encourages collaboration and investment in open source development.',
  },
  {
    name: 'TIC TAC TOE',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1720883292/tic-tac-toe_zdpv5z.png',
    link: 'https://tic-tac-toe-2-zeta.vercel.app/',
    description: 'Tic Tac Toe is a classic game where the player competes against the computer. The game features an intuitive interface and challenging AI.',
  },
  {
    name: 'Havascore',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905050/goal_lgqofp.png',
    link: 'https://havascore.netlify.app/',
    description: 'Havascore is a sports site where live scores, analysis, statistics, and lineups are shown. It provides real-time updates and comprehensive coverage of various sports events.',
  },
  {
    name: 'Speech Dictionary',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'https://dictaspeak-bj5qb18ee-hezronkimutais-projects.vercel.app/',
    description: 'Speech Dictionary is an interactive platform that helps users learn and understand new words through speech recognition and pronunciation guides.',
  },
  {
    name: 'InstaHelp',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'https://inistahelp.netlify.app/',
    description: 'Instahelp',
  },
  {
    name: 'Ai Image generator',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1721660120/Featured-image-AI-image-generators-by-Midjourney_ifbtsy.webp',
    link: 'https://cordata-test.vercel.app/',
    description: 'AI image generator',
  },
  {
    name: 'Cloud Fanatics',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'https://cloudfanatics.vercel.app/',
    description: 'Cloud Fanatics',
  },
];


const ITEMS_PER_PAGE = 3;

const ProjectCard = memo(({ project }) => (
  <div style={{display:'flex', flexDirection:'column'}} className="bg-white flex flex-col w-[30%] min-w-[320px] shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl">
    <div className="flex items-center p-4">
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <img
          src={project.imageUrl}
          alt={project.name}
          className="w-10 h-10 object-cover rounded-full mr-4"
        />
      </a>
      <h2 className="text-lg font-bold text-gray-800">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          {project.name}
        </a>
      </h2>
    </div>
    <div className="p-4">
      <p className="text-sm text-gray-600">{project.description}</p>
    </div>
  </div>
));


const Pagination = ({ currentPage, totalPages, onNext, onPrev }) => (
  <div className="flex justify-center items-center mt-6 space-x-4">
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <span className="text-gray-700 font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
);

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
    <div className="projects mx-auto w-full py-10" id="abilities">
      <div className="abilitiesContainer px-4">
        <h1
          data-aos="flip-right"
          className="text-3xl text-center font-bold mb-8 text-gray-900"
        >
          Featured Works and Case Studies
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {currentProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
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