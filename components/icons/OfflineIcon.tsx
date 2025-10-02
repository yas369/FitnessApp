
import React from 'react';

const OfflineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 12v.01" />
    <path d="M14.3 16.3a5 5 0 0 1-4.6-4.6" />
    <path d="M8.3 12.3a5 5 0 0 1 4.6-4.6" />
    <path d="M2.06 6.06 6.06 2.06" />
    <path d="M17.94 21.94 21.94 17.94" />
    <path d="M2.06 17.94 6.06 21.94" />
    <path d="M17.94 6.06 21.94 2.06" />
  </svg>
);

export default OfflineIcon;
