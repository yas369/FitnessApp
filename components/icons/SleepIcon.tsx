import React from 'react';

const SleepIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M12 21a9 9 0 1 1 0-18c-2.4 0-4.6.9-6.3 2.4a9 9 0 0 0 12.6 13.2A8.9 8.9 0 0 1 12 21Z" />
        <path d="M10 12h.01" />
        <path d="M7 15h.01" />
        <path d="M13 15h.01" />
    </svg>
);

export default SleepIcon;