import React from 'react';
import images from '../../components/images';

const {
  html, react, python, nodeJs, css3,
} = images;

interface ServiceLink {
  url: string;
  img: string;
}

interface Service {
  name: string;
  description: string;
  links: ServiceLink[];
}

const services: Service[] = [
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

const Services: React.FC = () => (
  <section className="py-16 bg-primary/50">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gold">
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
            <div className="p-8 rounded-lg bg-primary/80
              shadow-xl hover:shadow-2xl hover:shadow-gold/20
              border border-gold/20 hover:border-gold/40
              transform hover:-translate-y-2
              transition-all duration-500 ease-out">
              <h2 className="text-2xl font-semibold mb-4 text-gold">
                {service.name}
              </h2>
              <p className="text-gold/80 leading-relaxed mb-6">
                {service.description}
              </p>
              <div className="flex justify-center items-center gap-4">
                {service.links.map((link, key) => (
                  <div key={key} className="group relative transform hover:scale-110 
                    transition-transform duration-300">
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent 
                      rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    <img
                      className="h-12 w-12 p-2 rounded-full
                        border-2 border-gold/20 group-hover:border-gold/60
                        transition-all duration-300 ease-out
                        filter saturate-75 group-hover:saturate-100"
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

export default Services;
