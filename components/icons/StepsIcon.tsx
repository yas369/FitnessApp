import React from 'react';

const StepsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M4 12v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M8 12v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2" />
        <path d="M12 8V6" />
        <path d="M12 18v-2" />
        <path d="M4 10H2" />
        <path d="M22 14h-2" />
    </svg>
);

export default StepsIcon;