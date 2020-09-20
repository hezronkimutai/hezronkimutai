import React, { useRef } from 'react';
import propTypes from 'prop-types';
import images from './assets/images';

const {
  html, react, python, nodeJs, css3,
} = images;

// const imgs = [css,html,]
const services = [
  {
    name: 'Frontend Development',
    description: `I hold good proficiency
    in the latest frontend technologies. I am an expert
     in building any specific technology that
    you have in mind.`,
    links: [{ url: '', img: python }, { url: '', img: nodeJs }],
  }, {
    name: 'Backend Development',
    description: `I have the experience you need 
    to bring the most desirable results. I am up-to-date
     with the new technologies and the most recent trends
      in backend web development. I make sure that my method 
      generates a finished product that is built to last.`,
    links: [{ url: '', img: react }, { url: '', img: html }, { url: '', img: css3 }],

  },
];
const Profile = ({ prof }) => {
  const profileRef = useRef();
  prof(profileRef);
  return (
    <div
      className="profile mx-auto w-11/12"
      id="profile"
      ref={profileRef}
    >
      <div

        style={{ overflow: 'visible' }}
      >
        <h1
          data-aos="fade-down"
          data-aos-delay="100"
          data-aos-duration="700"
          className="w-1/2  mx-auto text-4xl text-center font-bold"
        >
          Services I offer
        </h1>
        <div className="flex flex-row">
          <img
            // data-aos="zoom-in"
            // data-aos-delay="100"
            // data-aos-duration="700"
            style={{ width: '30%', margin: 'auto' }}
            src="https://res.cloudinary.com/hezzie/image/upload/v1600443473/3937434_dygngh.jpg"
            alt="welcomePage"
          />
          <div
            data-aos="fade-left"
            data-aos-delay="100"
            data-aos-duration="700"
            // className="profileContainer"
            className="flex flex-col justify-start"
          >
            {services.map((service) => (
              <div
                data-aos="fade-left"
                data-aos-delay="100"
                data-aos-duration="700"
                style={{ height: 'min-content' }}
                className="m-2 p-2  w-full rounded bg-white "
              >
                <h1 className="w-1/2 font-bold" style={{ }}>{service.name}</h1>
                <p className=" ">{service.description}</p>
                <div className="flex flex-row ">
                  {
                service.links.map((link) => <img className="h-10 mx-2 my-3 p-1 w-10" src={link.img} key={link.url} alt={link.url} />)
                }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
Profile.propTypes = {
  prof: propTypes.func,
};
Profile.defaultProps = {
  prof: null,
};
export default Profile;
