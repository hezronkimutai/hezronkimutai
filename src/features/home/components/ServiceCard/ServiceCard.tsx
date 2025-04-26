import React from 'react';
import type { Service } from '../../types/services';
import images from '../../../../components/images';

export interface ServiceCardProps extends Service {
  /**
   * Optional CSS class name
   */
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  links,
  className = '',
}) => (
  <div 
    className={`p-8 rounded-xl shadow-lg 
      backdrop-blur-sm
      border border-gold/10 hover:border-gold/30
      transform hover:-translate-y-2 hover:shadow-xl
      transition-all duration-500 ease-out
      ${className}`.trim()}
    data-aos="fade-left"
  >
    <h3 className="text-2xl font-bold mb-4 text-primary relative inline-block">
      {name}
      <span className="absolute bottom-0 left-0 w-full h-0.5 
        bg-gold/50
        transform scale-x-0 transition-transform duration-300 
        group-hover:scale-x-100" />
    </h3>
    <p className="leading-relaxed mb-6 text-primary/80
      max-w-[65ch] animate-[fadeIn_0.5s_ease-out_0.2s_both]">
      {description}
    </p>
    <div className="flex justify-center gap-4 animate-[fadeIn_0.5s_ease-out_0.4s_both]">
      {links.map((link, index) => (
        <div 
          key={`${name}-tech-${index}`} 
          className="group relative transform hover:scale-110 transition-transform duration-300"
        >
          <img
            className="h-12 w-12 p-2 rounded-full
              border-2 border-primary/10
              group-hover:border-gold
              transition-all duration-300 ease-out
              filter saturate-75 group-hover:saturate-100
              object-contain"
            src={images[link.img as keyof typeof images]}
            alt={link.alt || `${name} technology ${index + 1}`}
            loading="lazy"
          />
          {link.url && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 rounded-full
                outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
                transition-transform duration-300"
              aria-label={`Learn more about ${link.alt || name}`}
            >
              <span className="sr-only">Learn more about {link.alt || name}</span>
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;