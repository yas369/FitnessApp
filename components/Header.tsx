
import React from 'react';
import DumbbellIcon from './icons/DumbbellIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <DumbbellIcon className="w-8 h-8 text-indigo-400" />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Fitness Coach <span className="text-indigo-400">India</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
