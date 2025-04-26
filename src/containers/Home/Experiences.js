import React from 'react';
import images from '../../components/images';

const {
  andela, eap, pmu, fiverr, noLogo,
} = images;

const services = [
  {
    name: 'PickMeUp Technologies',
    description: 'Worked with TypeScript to build microservices communicating via AMQP (RabbitMQ) and HTTP.',
    img: pmu,
  },
  {
    name: 'Andela',
    img: andela,
    description: `- Worked on the company's product as a full-stack developer:
      - Language: TypeScript
      - Frameworks: ReactJS and NestJS
      - Collaborated with the team to deliver high-quality work.`,
  },
  {
    name: 'Valet Seller',
    img: andela,
    description: `- Worked on the company's product as a full-stack developer:
      - Language: TypeScript
      - Frameworks: ReactJS and NestJS
      - Collaborated with the team to deliver high-quality work.`,
  },
  {
    img: noLogo,
    name: 'Data Systems Limited',
    description: 'Part of a team sent by Andela to work for Data Systems Limited, focusing on building appealing user interfaces.',
  },
  {
    name: 'Fiverr',
    img: fiverr,
    description: 'Worked on remote projects using ReactJS and NodeJS, delivering high-quality work rated highly by managers and owners.',
  },
  {
    name: 'East African Portland Cement',
    img: eap,
    description: `- Maintained various electrical equipment.
      - Installed electrical machines.`,
  },
];

const Experiences = () => (
  <section className="py-16 bg-primary/50">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-gold">
        Experience
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {services.map((service, index) => (
          <div
            key={service.name}
            className="w-full md:w-6/12 lg:w-5/12"
          >
            <div className="p-6 rounded-[2rem] shadow-lg
              bg-primary/80
              border border-gold/20 hover:border-gold/40
              transform hover:-translate-y-2
              hover:shadow-xl hover:shadow-gold/20
              transition-all duration-500 ease-out">
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 rounded-full mr-4 
                    border-2 border-gold/20 hover:border-gold/60
                    transition-all duration-300"
                  src={service.img}
                  alt={service.name}
                />
                <h3 className="text-xl font-bold text-gold">
                  {service.name}
                </h3>
              </div>
              <p className="text-base leading-relaxed whitespace-pre-line 
                text-gold/80">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Experiences;
