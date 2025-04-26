import React from 'react';
import images from '../../components/images';

const {
  html, react, python, nodeJs, css3,
} = images;

const services = [
  {
    name: 'Frontend Development',
    description: 'Proficient in the latest frontend technologies with strong design skills. Expertise in building tailored solutions.',
    links: [{ url: '', img: react }, { url: '', img: html }, { url: '', img: css3 }],
  },
  {
    name: 'Backend Development',
    description: 'Experienced in backend web development, staying updated with new technologies and trends to deliver robust solutions.',
    links: [{ url: '', img: python }, { url: '', img: nodeJs }],
  },
];

const Profile = () => (
  <section className="py-16">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-primary dark:text-gold">
        Services I Offer
      </h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={service.name}
            data-aos="fade-left"
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p-8 rounded-lg shadow-lg 
              border border-gold/10 hover:border-gold/30
              transform hover:-translate-y-2
              transition-all duration-500 ease-out">
              <h2 className="text-2xl font-semibold mb-4 text-primary dark:text-gold">
                {service.name}
              </h2>
              <p className="text-primary/80 dark:text-gold/80 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex justify-center items-center gap-4">
                {service.links.map((link, key) => (
                  <div key={key} className="group relative transform hover:scale-110 
                    transition-transform duration-300">
                    <img
                      className="h-12 w-12 p-2 rounded-full
                        border-2 border-primary/10 dark:border-gold/10
                        group-hover:border-gold
                        transition-all duration-300 ease-out"
                      src={link.img}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Profile;
