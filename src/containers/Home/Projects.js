import React from 'react';
import Pagination from 'custom_react_pages';
import Next from '../../components/icons/next';

const projects = [
  {
    name: 'Merigo Round',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://nyongiot-frontend.vercel.app',
    description: 'Merigo round is aimed at automating group funding',
  },
  {
    name: 'POS',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://pos-fn-reactjs.vercel.app/',
    description: 'POS or simply Paid Open Source is aimed at increasing the frequency of open source projects by attaching a participatory price tag',
  },
  {
    name: 'TIC TAC TOE',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://tic-tac-toe-2-zeta.vercel.app/',
    description: 'Tic Tac Toe',
  },
  {
    name: 'Havascore',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905050/goal_lgqofp.png',
    link: 'https://havascore.netlify.app/',
    description: 'Havascore is a sport site where livescores, analysis, statistics and lineups are shown',
  },

  {
    name: 'Speech Dictionary',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'http://speechdictionary.herokuapp.com/',
    description: 'Street dictionary',
  },
];

const onePage = (item, index) => (
  <a
    data-aos="zoom-in"
    key={index}
    className="oneItem whyMe w-full sm:w-5/12 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden"
    style={{ minWidth: '300px' }}
    href={item.link}
    rel="noreferrer"
    target="_blank"
  >
    <div className="flex p-4 flex-row items-center bg-gray-100">
      <img className="w-16 h-16 rounded-full mr-4" src={item.imageUrl} alt={item.link} />
      <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
    </div>
    <div className="p-2 bg-white my-2">
      <p className="text-gray-700">{item.description}</p>
    </div>
  </a>
);

const Projects = () => (
  <div className="projects mx-auto w-full  py-10" id="abilities">
    <div className="abilitiesContainer" style={{ overflow: 'visible' }}>
      <h1
        data-aos="flip-right"
        className="text-4xl text-center font-bold mb-8 text-gray-900"
      >
        Featured Works and Case Studies
      </h1>
      <Pagination
        itemsPerPage={2}
        activePageStyle={{ backgroundColor: '#1d83d4', color: 'white' }}
        next={<Next left={false} />}
        prev={<Next left />}
        data={projects}
        pageButtons={10}
        onePage={onePage}
      />
    </div>
  </div>
);

export default Projects;
