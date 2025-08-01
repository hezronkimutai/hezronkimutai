import React from 'react';
import * as styles from './LoadingSpinner.module.scss';

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
   * Optional loading text
   */
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  className = '',
  size = 40,
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
      }}
    />
    <span className="sr-only">{text}</span>
  </div>
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;