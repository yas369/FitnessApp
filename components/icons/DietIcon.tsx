import React from 'react';

const DietIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 22c-2.2 0-4-1.8-4-4 0-1.2.5-2.2 1.3-2.9" />
    <path d="M12 22c2.2 0 4-1.8 4-4 0-1.2-.5-2.2-1.3-2.9" />
    <path d="M15 15.3c1-1.3 1.7-3.1 1.5-5.1C16 4 12 2 12 2S8 4 7.5 10.2c-.2 2  .5 3.8 1.5 5.1" />
  </svg>
);

export default DietIcon;
