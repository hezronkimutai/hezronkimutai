import React from 'react';
import { ServicesProps, DEFAULT_SERVICES } from '../../types/services';
import { ServiceCard } from '../ServiceCard/ServiceCard';
import styles from './Services.module.scss';

export const Services: React.FC<ServicesProps> = ({
  className = '',
  services = DEFAULT_SERVICES,
}) => {
  if (!services.length) {
    return (
      <div className={`${styles.noServices} ${className}`.trim()}>
        <p>No services available at the moment.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`.trim()}>
      <div className={styles.content}>
        <h1 className={styles.title}>Services I Offer</h1>
        
        <div className={styles.grid}>
          {services.map((service, index) => (
            <ServiceCard
              key={`${service.name}-${index}`}
              service={service}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Services.displayName = 'Services';

export default Services;