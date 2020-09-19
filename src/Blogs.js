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
const Abilities = ({ abl }) => {
  const abilitiesRef = useRef();
  abl(abilitiesRef);
  return (
    <div className="abilities" id="abilities" ref={abilitiesRef}>
      <div
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="1000"
        className="profileContainer"
        style={{ overflow: 'visible' }}
      >
        <h1 className="w-1/2  mx-auto text-4xl text-center font-bold">Blogs</h1>
        <div className="flex flex-wrap justify-evenly">
          {services.map((service) => (
            <div className="m-2 p-2  w-1/3 rounded bg-white shadow">
              <h1 className="w-1/2 font-bold" style={{ }}>{service.name}</h1>
              <p className=" ">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
Abilities.propTypes = {
  abl: propTypes.func,
};
Abilities.defaultProps = {
  abl: null,
};
export default Abilities;
