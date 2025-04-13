import React from 'react';
import type { Service } from '../../types/services';
import styles from './ServiceCard.module.scss';
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
    className={`${styles.container} ${className}`.trim()}
    data-aos="fade-left"
  >
    <h3 className={styles.title}>{name}</h3>
    <p className={styles.description}>{description}</p>
    <div className={styles.technologies}>
      {links.map((link, index) => (
        <div key={`${name}-tech-${index}`} className={styles.techItem}>
          <img
            className={styles.techIcon}
            src={images[link.img as keyof typeof images]}
            alt={link.alt || `${name} technology ${index + 1}`}
            loading="lazy"
          />
          {link.url && (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.techLink}
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