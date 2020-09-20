import React, { useRef } from 'react';
import propTypes from 'prop-types';

const services = [
  {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
  }, {
    name: 'Ui Design',
    description: 'I design user friendly user interfaces',
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
        <h1 className="w-1/2  mx-auto text-4xl text-center font-bold">Experience</h1>
        <div className="flex flex-row">
          <div
            data-aos="fade-right"
            data-aos-delay="100"
            data-aos-duration="1000"
            // className="profileContainer"
            className="flex flex-wrap justify-evenly"
          >
            {services.map((service) => (
              <div className="m-2 p-2  w-full rounded bg-white shadow">
                <h1 className="w-1/2 font-bold" style={{ }}>{service.name}</h1>
                <p className=" ">{service.description}</p>
              </div>
            ))}
          </div>
          <img
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-duration="1000"
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
