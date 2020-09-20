import React, { useRef } from 'react';
import propTypes from 'prop-types';

const services = [
  {
    name: 'PickMeUp Technologies Inc',
    description: `Worked with, 
    Typescript to build microservices
     communicating via AMQP(RabitMq) and Http.`,
  }, {
    name: 'Andela',
    description: `- I worked on the company's product as a full-stack developer,
    Language: Typescript
    Framework: ReactJs and NestJs
    - Collaborate with the team to make the Product ready.
    - Delivering high-quality work from Team that is by reviewing teammates work and also making sure I delivered tasks as expected.`,
  }, {
    name: 'Data Systems Limited',
    description: `I was part of the team of six to be sent by Andela to work for Datasystems Ltd.
    I built appealing user interfaces for one of Datasystems Ltd products.`,
  }, {
    name: 'Fiver',
    description: `worked on remote projects using ReactJs and NodeJs.
    - I was able to accomplish several projects with High quality rated by the managers and owners`,
  }, {
    name: 'East African Portlands Cement',
    description: `- Worked as a maintainer of various electrical equipment.
    - Installed electrical machines.`,
  },
];
const Experiences = ({ exp }) => {
  const experienceRef = useRef();
  exp(experienceRef);
  return (
    <div className="profile mx-auto w-11/12" id="experiences" ref={experienceRef}>
      <div
        style={{ overflow: 'visible' }}
      >
        <h1
          data-aos="fade-down"
          data-aos-delay="100"
          data-aos-duration="700"
          className="w-1/2  mx-auto text-4xl text-center font-bold"
        >
          Experience
        </h1>
        <div className="flex flex-row">
          <div
            // data-aos="fade-right"
            // data-aos-delay="100"
            // data-aos-duration="700"
            // className="profileContainer"
            className="flex flex-wrap justify-evenly"
          >
            {services.map((service) => (
              <div
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="700"
                className="m-2 p-2  w-full rounded bg-white"
              >
                <h1 className="w-1/2 font-bold" style={{ }}>{service.name}</h1>
                <p className=" ">{service.description}</p>
              </div>
            ))}
          </div>
          <img
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-duration="700"
            style={{ width: '30%', margin: 'auto' }}
            src="https://res.cloudinary.com/hezzie/image/upload/v1600443475/343320-PALLZR-795_xkzgus.jpg"
            alt="welcomePage"
          />
        </div>
      </div>
    </div>
  );
};
Experiences.propTypes = {
  exp: propTypes.func,
};
Experiences.defaultProps = {
  exp: null,
};
export default Experiences;
