import React from 'react';
import { ServiceCardProps } from '../../types/services';
import styles from './ServiceCard.module.scss';
import images from '../../../../components/images';

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  className = '',
}) => (
  <div
    className={`${styles.card} ${className}`.trim()}
    data-aos="fade-left"
  >
    <h2 className={styles.title}>{service.name}</h2>
    <p className={styles.description}>{service.description}</p>
    <div className={styles.links}>
      {service.links.map((link, index) => (
        <img
          key={`${service.name}-${index}`}
          className={styles.icon}
          src={images[link.img as keyof typeof images]}
          alt={link.altText || link.img}
          loading="lazy"
        />
      ))}
    </div>
  </div>
);

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;