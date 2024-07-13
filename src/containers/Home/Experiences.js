/* eslint-disable react/no-array-index-key */
import React from 'react';
import images from '../../components/images';

const {
  andela, eap, pmu, fiverr, noLogo,
} = images;

const services = [
  {
    name: 'PickMeUp Technologies',
    description: 'Worked with TypeScript to build microservices communicating via AMQP (RabbitMQ) and HTTP.',
    img: pmu,
  },
  {
    name: 'Andela',
    img: andela,
    description: `- Worked on the company's product as a full-stack developer:
      - Language: TypeScript
      - Frameworks: ReactJS and NestJS
      - Collaborated with the team to deliver high-quality work.`,
  },
  {
    name: 'Valet Seller',
    img: andela,
    description: `- Worked on the company's product as a full-stack developer:
      - Language: TypeScript
      - Frameworks: ReactJS and NestJS
      - Collaborated with the team to deliver high-quality work.`,
  },
  {
    img: noLogo,
    name: 'Data Systems Limited',
    description: 'Part of a team sent by Andela to work for Data Systems Limited, focusing on building appealing user interfaces.',
  },
  {
    name: 'Fiverr',
    img: fiverr,
    description: 'Worked on remote projects using ReactJS and NodeJS, delivering high-quality work rated highly by managers and owners.',
  },
  {
    name: 'East African Portland Cement',
    img: eap,
    description: `- Maintained various electrical equipment.
      - Installed electrical machines.`,
  },
];

const Experiences = () => (
  <div className="bg-gray-100 py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Experience</h1>
      <div className="flex flex-wrap justify-between">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-right"
            className="m-4 p-4 w-full md:w-6/12 lg:w-5/12 shadow-lg rounded"
          >
            <div className="flex items-center mb-4">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={service.img}
                alt={service.name}
              />
              <h2 className="text-xl font-bold">{service.name}</h2>
            </div>
            <p className="text-xl leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Experiences;
