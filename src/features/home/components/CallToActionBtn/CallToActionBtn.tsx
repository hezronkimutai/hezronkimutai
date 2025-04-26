import React, { ReactNode } from 'react';

export interface CallToActionBtnProps {
  /**
   * Function to be called when the button is clicked
   */
  onClick: () => void;
  
  /**
   * Content to display inside the button
   */
  displayText: ReactNode;
  
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
    className={`inline-flex items-center px-8 py-3 text-lg font-semibold
      bg-red hover:bg-orange text-white rounded-full
      transform transition-all duration-300 hover:scale-105
      shadow-lg hover:shadow-xl hover:shadow-orange/20
      focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2
      group ${className}`.trim()}
    onClick={onClick}
    type="button"
  >
    {displayText}
  </button>
);

CallToActionBtn.displayName = 'CallToActionBtn';

export default CallToActionBtn;