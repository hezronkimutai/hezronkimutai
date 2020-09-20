import React, { useRef } from 'react';
import propTypes from 'prop-types';
import Pagination from 'custom_react_pages';
// import { NavLink } from 'react-router-dom';

const projects = [
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600258923/Screenshot_from_2020-09-16_13-36-47_zcowyb.png',
    link: 'https://www.evenhelp.io/',
  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600258927/Screenshot_from_2020-09-16_13-36-09_zp0ppl.png',
    link: 'https://havascore.netlify.app/',
  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1577619008/Screen_Shot_2019-12-29_at_13.26.26_reywu7.png',
    link: 'https://barefoot-nomad-fn.herokuapp.com/',
  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260449/Screenshot_from_2020-09-16_14-47-01_d2o4qz.png',
    link: 'https://spectaclecleanandfumigationservices.co.ke/',
  },
  {
    imageUrl: 'https://res.cloudinary.com/hezzie/image/upload/v1600260595/Screenshot_from_2020-09-16_14-49-19_jbnhre.png',
    link: 'http://speechdictionary.herokuapp.com/',
  },
];

const Abilities = ({ abl }) => {
  const abilitiesRef = useRef();
  abl(abilitiesRef);
  return (
    <div className="projects mx-auto w-11/12" id="abilities" ref={abilitiesRef}>
      <div

        className="abilitiesContainer"
      >
        <h1
          data-aos="fade-down"
          data-aos-delay="100"
          data-aos-duration="700"
          className="w-1/2  mx-auto text-4xl text-center font-bold"
        >
          Featured Works and case studies
        </h1>
        {/* <div className="flex flex-row">
          <img
            data-aos="zoom-in"
            data-aos-delay="100"
            data-aos-duration="700"
            style={{ width: '30%', height: '50%', margin: 'auto' }}
            src="https://res.cloudinary.com/hezzie/image/upload/v1600446790/imageedit_3_8141677005_oyxp66.png"
            alt="welcomePage"
          /> */}
        <Pagination
          itemsPerPage={5}
          activePageStyle={{ backgroundColor: '#00b9f2', color: 'white' }}
          next="next"
          prev="prev"
          data={projects}
          pageButtons={10}
          onePage={
          (item, index) => (
            <div
              data-aos="zoom-in"
              data-aos-delay="100"
              data-aos-duration="700"
              key={index}
              className="oneItem"
            >
              <a href={item.link} rel="noreferrer" target="_blank">
                <img style={{ width: 300, height: 200 }} src={item.imageUrl} alt={item.link} />
              </a>
            </div>
          )
}
        />
        {/* </div> */}
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
