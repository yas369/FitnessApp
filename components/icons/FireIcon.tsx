import React from 'react';

const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M12 12c0-2.8.5-5 2-5s2 2.2 2 5c0 2.8-.5 5-2 5s-2-2.2-2-5Z" />
        <path d="M12 12c0 2.8-.5 5-2 5s-2-2.2-2-5c0-2.8.5-5 2-5s2 2.2 2 5Z" />
        <path d="M12 22c2 0 4-2 4-4s-2-4-4-4-4 2-4 4 2 4 4 4Z" />
        <path d="M12 2a2 2 0 0 0-2 2c0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2Z" />
    </svg>
);

export default FireIcon;