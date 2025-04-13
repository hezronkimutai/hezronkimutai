import React from 'react';

interface CallToActionBtnProps {
  onClick: () => void;
  displayText: string;
  className: string;
}

export const CallToActionBtn: React.FC<CallToActionBtnProps> = ({
  onClick,
  displayText,
  className,
}) => (
  <button
    className={className}
    onClick={onClick}
    type="button"
  >
    {displayText}
  </button>
);

export default CallToActionBtn;