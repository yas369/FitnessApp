
import React from 'react';
import DumbbellIcon from './icons/DumbbellIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-xl sticky top-0 z-40 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500/20 p-2 rounded-lg">
            <DumbbellIcon className="w-7 h-7 text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            AI Fitness <span className="text-indigo-400">Coach</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
