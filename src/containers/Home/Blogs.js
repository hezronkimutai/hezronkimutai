/* eslint-disable react/no-array-index-key */
import React from 'react';

const services = [
  {
    name: 'Hosting your app on Heroku',
    description: 'Step-by-step procedure for hosting your app on Heroku.',
    link: 'https://serverlogics.blogspot.com/2020/04/hosting-your-app-on-heroku-one-of.html',
  },
  {
    name: 'Git and Git Workflow',
    description: 'An explanation of Git and Git workflow.',
    link: 'https://serverlogics.blogspot.com/2020/04/git-and-git-workflow-in-software-world.html',
  },
  {
    name: 'Custom React Pages',
    description: 'Documentation of the Custom React npm package.',
    link: 'https://serverlogics.blogspot.com/2020/04/react-pagination-hezron-kimutai-feb-23.html',
  },
  {
    name: 'Express App',
    description: 'Simple Node.js app with Express.js.',
    link: 'https://serverlogics.blogspot.com/2020/04/create-simple-node.html',
  },
  {
    name: 'Flask App connected to Database using psycopg2',
    description: 'Building a Flask app connected to PostgreSQL using psycopg2.',
    link: 'https://serverlogics.blogspot.com/2020/04/flask-app-connected-to-postgresql.html',
  },
];

const Abilities = () => (
  <div className="bg-gray-100 py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>
      <div className="flex flex-wrap justify-center">
        {services.map((service, index) => (
          <a
            key={index}
            className="m-4 p-4 w-full md:w-5/12 lg:w-4/12 shadow-lg rounded block"
            data-aos="fade-left"
            href={service.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="font-bold mb-2">{service.name}</h2>
            <p className="text-xl leading-relaxed">{service.description}</p>
          </a>
        ))}
      </div>
    </div>
  </div>
);

export default Abilities;
