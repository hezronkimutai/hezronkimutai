/* eslint-disable react/no-array-index-key */
import React from 'react';

const services = [
  {
    name: 'Hosting your app on Heroku',
    description: 'This is a step by step procidure to follow while hosting your app on heroku',
    link: 'https://serverlogics.blogspot.com/2020/04/hosting-your-app-on-heroku-one-of.html',
  }, {
    name: 'Git and git workflow',
    description: 'An explanation of git and git workflow',
    link: 'https://serverlogics.blogspot.com/2020/04/git-and-git-workflow-in-software-world.html',
  }, {
    name: 'Custom react Pages',
    description: 'A documentation of the Custom react npm package',
    link: 'https://serverlogics.blogspot.com/2020/04/react-pagination-hezron-kimutai-feb-23.html',
  }, {
    name: 'Express App',
    description: 'Simple NodeJs App with expressJs',
    link: 'https://serverlogics.blogspot.com/2020/04/create-simple-node.html',
  }, {
    name: 'Flask App connected to Database using psycoPg2',
    description: 'Psycopg2',
    link: 'https://serverlogics.blogspot.com/2020/04/flask-app-connected-to-postgresql.html',
  },
];
const Abilities = () => (
  <div className=" mx-auto w-10/12 py-5" id="blogs">
    <div
      style={{ overflow: 'visible' }}
    >
      <h1
        data-aos="flip-right"
        className="  mx-auto text-4xl text-center font-bold"
      >
        Blogs
      </h1>
      <div className="flex flex-row">

        <div
          className="flex flex-wrap justify-around"
        >
          {services.map((service, index) => (
            <a
              key={index}
              className=" my-2 shadow blogContainer p-2 block  rounded"
              data-aos="fade-left"
              href={service.link}
              target="_blank"
              rel="noreferrer"
            >
              <h1 className="font-bold" style={{ }}>{service.name}</h1>
              <p className=" ">{service.description}</p>
            </a>
          ))}
        </div>
        {/* <img
            // data-aos="zoom-in"
            style={{ width: '30%', margin: 'auto' }}
            src="https://res.cloudinary.com/hezzie/image/upload/v1600565550/3236267_n45wja.jpg"
            alt="welcomePage"
          /> */}
      </div>
    </div>
  </div>
);
Abilities.propTypes = {
};
Abilities.defaultProps = {
  abl: null,
};
export default Abilities;
