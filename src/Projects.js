import React from 'react';

const images = [
  'https://res.cloudinary.com/hezzie/image/upload/v1577645239/Screen_Shot_2019-12-29_at_20.46.06_vklvux.png',
  'https://res.cloudinary.com/hezzie/image/upload/v1576423282/scott-webb-1ddol8rgUH8-unsplash_y6zztw.jpg',
];

const Projects = () => (
  <div className="projects">
    <div className="projectsContainer">
      <div className="projectsHeader">Hell</div>
      {images.map((image, index) => (
        <div key={index} className="">
          <img alt={index} src={image} />
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
