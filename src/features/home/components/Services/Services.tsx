import React from 'react';
import { ServiceCard } from '../ServiceCard';
import { defaultServices } from '../../types/services';
import styles from './Services.module.scss';

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
    className={`${styles.container} ${className}`.trim()}
    aria-labelledby="services-title"
  >
    <div className={styles.content}>
      <h2 
        id="services-title" 
        className={styles.title}
      >
        {title}
      </h2>
      
      <div className={styles.grid}>
        {services.map((service, index) => (
          <ServiceCard
            key={`service-${index}`}
            {...service}
            className={styles.card}
          />
        ))}
      </div>
    </div>
  </section>
);

Services.displayName = 'Services';

export default Services;