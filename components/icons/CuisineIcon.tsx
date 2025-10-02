import React from 'react';

const CuisineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M14.4 11c-.3-2.6-2-4-3.4-4-1.4 0-3 .8-4.2 3.5C5.6 14 5 17 7 18.5c2.3 1.7 5.1 1.4 6.4.2" />
    <path d="M18.4 12.6c.2-1.7-1.7-3.1-3.4-3.1-1.8 0-3.3 1.4-3.6 3.1" />
    <path d="M10.2 18.1c.3 1.6 1.7 2.9 3.3 2.9 2.2 0 4-1.8 4-4 0-.5-.1-1-.2-1.4" />
  </svg>
);

export default CuisineIcon;
