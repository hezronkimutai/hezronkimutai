import React from 'react';
import styles from './LoadingSpinner.module.scss';

export interface LoadingSpinnerProps {
  /**
   * Optional className for styling
   */
  className?: string;

  /**
   * Optional size in pixels
   */
  size?: number;

  /**
   * Optional color override
   */
  color?: string;

  /**
   * Optional loading text
   */
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
  size = 40,
  color = 'currentColor',
  text = 'Loading...',
}) => (
  <div 
    className={`${styles.container} ${className}`.trim()}
    role="status"
    aria-label={text}
  >
    <div 
      className={styles.spinner}
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
    <span className="sr-only">{text}</span>
  </div>
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;