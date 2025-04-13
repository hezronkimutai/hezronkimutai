import React from 'react';
import styles from './CallToActionBtn.module.scss';

export interface CallToActionBtnProps {
  /**
   * Function to be called when the button is clicked
   */
  onClick: () => void;
  
  /**
   * Text to display inside the button
   */
  displayText: string;
  
  /**
   * Additional CSS class names
   */
  className?: string;
}

export const CallToActionBtn: React.FC<CallToActionBtnProps> = ({
  onClick,
  displayText,
  className = '',
}) => (
  <button 
    className={`${styles.button} ${className}`.trim()}
    onClick={onClick}
    type="button"
  >
    {displayText}
  </button>
);

CallToActionBtn.displayName = 'CallToActionBtn';

export default CallToActionBtn;