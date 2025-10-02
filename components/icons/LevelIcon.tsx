import React from 'react';

const LevelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M8 3v3" />
    <path d="M12 3v3" />
    <path d="M16 3v3" />
    <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2" />
    <path d="M17 21V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v16" />
  </svg>
);

export default LevelIcon;