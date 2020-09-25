import React from 'react';
import Pagination from 'custom_react_pages';
import Next from '../components/icons/next';

const projects = [
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600904576/Screenshot_from_2020-09-24_01-42-03_svfftx.png',
    link: 'https://www.evenhelp.io/',
    description: `EvenHelp is a platform that help people get their Resumes, and portfolios quickly at an affordable price, EvenHelp provides a variety of Resume and portfolio templates that you can choose from. It also provides a sub dormain for every portfolios which you can upgrade and use your own domain Name.
    The future plan is to enable other developers create Resume and portfolio templates and sell it in EvenHelp platform`,
  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905050/goal_lgqofp.png',
    link: 'https://havascore.netlify.app/',
    description: `EvenHelp is a platform that help people get their Resumes, and portfolios quickly at an affordable price, EvenHelp provides a variety of Resume and portfolio templates that you can choose from. It also provides a sub dormain for every portfolios which you can upgrade and use your own domain Name.
    The future plan is to enable other developers create Resume and portfolio templates and sell it in EvenHelp platform`,

  },

  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600905285/logo_zfkswk.png',
    link: 'https://spectaclecleanandfumigationservices.co.ke/',
    description: `EvenHelp is a platform that help people get their Resumes, and portfolios quickly at an affordable price, EvenHelp provides a variety of Resume and portfolio templates that you can choose from. It also provides a sub dormain for every portfolios which you can upgrade and use your own domain Name.
    The future plan is to enable other developers create Resume and portfolio templates and sell it in EvenHelp platform`,

  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'http://speechdictionary.herokuapp.com/',
    description: `EvenHelp is a platform that help people get their Resumes, and portfolios quickly at an affordable price, EvenHelp provides a variety of Resume and portfolio templates that you can choose from. It also provides a sub dormain for every portfolios which you can upgrade and use your own domain Name.
    The future plan is to enable other developers create Resume and portfolio templates and sell it in EvenHelp platform`,

  },
];
const onePage = (item, index) => (
  <a
    data-aos="zoom-in"
    key={index}
    className="oneItem shadow flex flex-row"
    style={{}}
    href={item.link}
    rel="noreferrer"
    target="_blank"
  >
    <img className="w-24 mx-3 my-auto h-24" src={item.imageUrl} alt={item.link} />
    <p className="p-2">{item.description}</p>
  </a>
);

const Projects = () => (
  <div className="projects mx-auto w-11/12 py-5" id="abilities">
    <div
      className="abilitiesContainer"
      style={{ overflow: 'visible' }}
    >
      <h1
        data-aos="flip-right"
        className="mx-auto text-4xl text-center text-gray-700  font-bold"
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
