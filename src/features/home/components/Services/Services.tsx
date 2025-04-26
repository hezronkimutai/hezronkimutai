import React from 'react';
import { ServiceCard } from '../ServiceCard';
import { defaultServices } from '../../types/services';

export interface ServicesProps {
  /**
   * Optional className for container styles
   */
  className?: string;

  /**
   * Optional title override
   */
  title?: string;

  /**
   * Optional services data override
   */
  services?: typeof defaultServices;
}

export const Services: React.FC<ServicesProps> = ({
  className = '',
  title = 'Services I Offer',
  services = defaultServices,
}) => (
  <section 
    className={`py-16 ${className}`.trim()}
    aria-labelledby="services-title"
  >
    <div className="container mx-auto px-4 animate-[fadeIn_0.5s_ease-out]">
      <h2 
        id="services-title" 
        className="text-4xl font-bold text-center mb-12 text-primary dark:text-gold
          relative animate-[slideIn_0.5s_ease-out]"
      >
        {title}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 
          bg-gold/80 dark:bg-orange/80 rounded mt-4
          scale-x-0 animate-[expandWidth_0.5s_ease-out_0.5s_forwards]"
        />
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {services.map((service, index) => (
          <div
            key={`service-${index}`}
            className="opacity-0 animate-[fadeInUp_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ServiceCard
              {...service}
              className="h-full transform transition-all duration-500 hover:-translate-y-2"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

Services.displayName = 'Services';

export default Services;