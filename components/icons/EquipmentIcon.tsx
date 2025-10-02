import React from 'react';

const EquipmentIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M6 10h2" />
    <path d="M16 10h2" />
    <path d="M10 8.5V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4.5" />
    <path d="M18 18.5a2.5 2.5 0 0 1-5 0V12a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6.5Z" />
    <path d="M4 12v6.5a2.5 2.5 0 0 0 5 0V12a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z" />
  </svg>
);

export default EquipmentIcon;