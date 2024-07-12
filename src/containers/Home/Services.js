/* eslint-disable react/no-array-index-key */
import React from 'react';
import images from '../../components/images';

const {
  html, react, python, nodeJs, css3,
} = images;

const services = [
  {
    name: 'Frontend Development',
    description: `Proficient in the latest frontend technologies with strong design skills. Expertise in building tailored solutions.`,
    links: [{ url: '', img: react }, { url: '', img: html }, { url: '', img: css3 }],
  },
  {
    name: 'Backend Development',
    description: `Experienced in backend web development, staying updated with new technologies and trends to deliver robust solutions.`,
    links: [{ url: '', img: python }, { url: '', img: nodeJs }],
  },
];

const Profile = () => (
  <div className="bg-gray-100 py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Services I Offer</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-left"
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">{service.name}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{service.description}</p>
            <div className="flex justify-center">
              {service.links.map((link, key) => (
                <img
                  key={key}
                  className="h-10 mx-2 my-3 p-1"
                  src={link.img}
                  alt={link.url}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Profile;
