import React from 'react';

const images = [
  'https://res.cloudinary.com/hezzie/image/upload/v1577645239/Screen_Shot_2019-12-29_at_20.46.06_vklvux.png',
  'https://res.cloudinary.com/hezzie/image/upload/v1576423282/scott-webb-1ddol8rgUH8-unsplash_y6zztw.jpg',
];

const Projects = () => (
  <div className="projects" id="projects">
    <div className="projectsContainer">
      <div className="projectsHeader"><h1>Projects</h1></div>
      {images.map((image) => (
        <div key={image}>
          <img alt={image} src={image} />
        </div>
      ))}
    </div>
  </div>
);

export default Projects;
