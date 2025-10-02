import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12 3L9.25 8.75L3.5 9.5L8.38 14.38L7.25 20.5L12 17.25L16.75 20.5L15.62 14.38L20.5 9.5L14.75 8.75L12 3z"/>
    <path d="M18 6L17.15 8.35L15 9L17.15 9.65L18 12L18.85 9.65L21 9L18.85 8.35L18 6z"/>
    <path d="M6 18L6.85 15.65L9 15L6.85 14.35L6 12L5.15 14.35L3 15L5.15 15.65L6 18z"/>
  </svg>
);

export default SparklesIcon;