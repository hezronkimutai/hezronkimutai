/* eslint-disable react/no-array-index-key */
import React from 'react';
import images from '../components/images';

const {
  andela, eap, pmu, fiverr, noLogo,
} = images;
const services = [
  {
    name: 'PickMeUp Technologies',
    description: `Worked with, 
    Typescript to build microservices
     communicating via AMQP(RabitMq) and Http.`,
    img: pmu,
  }, {
    name: 'Andela',
    img: andela,
    description: `- I worked on the company's product as a full-stack developer,
    Language: Typescript
    Framework: ReactJs and NestJs
    - Collaborate with the team to make the Product ready.
    - Delivering high-quality work from Team that is by reviewing teammates work and also making sure I delivered tasks as expected.`,
  }, {
    img: noLogo,
    name: 'Data Systems Limited',
    description: `I was part of the team of six to be sent by Andela to work for Datasystems Ltd.
    I built appealing user interfaces for one of Datasystems Ltd products.`,
  }, {
    name: 'Fiver',
    img: fiverr,
    description: `worked on remote projects using ReactJs and NodeJs.
    - I was able to accomplish several projects with High quality rated by the managers and owners`,
  }, {
    name: 'East African Portlands Cement',
    img: eap,
    description: `- Worked as a maintainer of various electrical equipment.
    - Installed electrical machines.`,
  },
];
const Experiences = () => (
  <div className="" id="">
    <div className="mx-auto py-8">
      <h1
        data-aos="flip-right"
        className="mx-auto text-4xl text-center font-bold"
      >
        Experience
      </h1>
      <div style={{ }} className="mx-auto w-11/12 flex flex-row">
        <div
          className="flex flex-wrap justify-evenly experienceLeft"
        >
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="fade-right"
              className="m-2 p-2 w-full rounded"
            >
              <div className="flex flex-row">
                <img className="w-10 h-10" src={service.img} alt={service.name} />
                <h1 className="font-bold mx-2 text-2xl my-auto" style={{ }}>{service.name}</h1>
              </div>
              <p className=" ">{service.description}</p>
            </div>
          ))}
        </div>
        <img
          className="experienceRight"
          style={{ width: '30%', margin: 'auto' }}
          src="https://res.cloudinary.com/hezzie/image/upload/v1601262141/imageedit_44_2080892859_lnyhdu.png"
          alt="welcomePage"
        />
      </div>
    </div>
  </div>

);
Experiences.propTypes = {
};
Experiences.defaultProps = {
  exp: null,
};
export default Experiences;
