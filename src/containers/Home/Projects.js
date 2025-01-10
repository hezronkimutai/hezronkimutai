import React from 'react';

const projects = [
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

const onePage = (item, index) => (
  <a
    data-aos="zoom-in"
    key={index}
    className="oneItem whyMe w-auto shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden"
    style={{ maxWidth: '300px' }}
    href={item.link}
    rel="noreferrer"
    target="_blank"
  >
    <div className="flex p-4 flex-row items-center bg-gray-100">
      <img className="w-18 h-16  mr-4" src={item.imageUrl} alt={item.link} />
      <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
    </div>
    <div className="p-2  my-2">
      <p className="text-gray-700">{item.description}</p>
    </div>
  </a>
);

const Projects = () => (
  <div className="projects mx-auto w-full  py-10" id="abilities">
    <div className="abilitiesContainer px-4 " style={{ overflow: 'visible' }}>
      <h1
        data-aos="flip-right"
        className="text-xl text-center font-bold mb-8 text-gray-900"
      >
        Featured Works and Case Studies
      </h1>
      {projects.map(project=><div>{project.name}</div>)}
    </div>
  </div>
);

export default Projects;
