import React from 'react';
import Pagination from 'custom_react_pages';
import Next from '../components/icons/next';

const projects = [
  {
    name: 'InstaHelp',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'http://www.evenhelp.io/',
    description: `EvenHelp is a platform that help people get their Resumes, and portfolios quickly at an affordable price, EvenHelp provides a variety of Resume and portfolio templates that you can choose from. It also provides a sub dormain for every portfolios which you can upgrade and use your own domain Name.
    The future plan is to enable other developers create Resume and portfolio templates and sell it in EvenHelp platform`,
  },
  {
    name: 'Havascore',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905050/goal_lgqofp.png',
    link: 'https://havascore.netlify.app/',
    description: 'Havascore is a sport site where livescores, analysis, statistics and lineups are shown',

  },
  {
    name: 'Cleaning Services',
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905285/logo_zfkswk.png',
    link: 'https://spectaclecleanandfumigationservices.co.ke/',
    description: 'This is a cleaning service where individuals can make bookings for cleaners ',

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
    className="oneItem whyMe w-5/12 shadow"
    style={{ minWidth: '300px' }}
    href={item.link}
    rel="noreferrer"
    target="_blank"
  >
    <div style={{ width: 'min-content' }} className="flex  p-2  flex-row justify-start">
      <img className="w-16  mx-0 my-auto h-16" src={item.imageUrl} alt={item.link} />
      <h1 className='my-auto  mx-0 text-2xl text-center font-bold'>{item.name}</h1>
    </div>
    <p className="p-2">{item.description}</p>
  </a>
);

const Projects = () => (
  <div className="projects mx-auto w-10/12 py-5" id="abilities">
    <div
      className="abilitiesContainer"
      style={{ overflow: 'visible' }}
    >
      <h1
        data-aos="flip-right"
        className="mx-auto text-4xl text-center   font-bold"
      >
        Featured Works and case studies
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
