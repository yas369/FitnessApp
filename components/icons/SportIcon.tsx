import React from 'react';

const SportIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="m21.44 12-9.08-9.08a2 2 0 0 0-2.82 0L2.12 10.44a2 2 0 0 0 0 2.82L11.56 24" />
    <path d="m16 8 3 3" />
    <path d="M9.08 16.53 2.12 10.44" />
    <path d="M14.82 11.18 22 4" />
  </svg>
);

export default SportIcon;