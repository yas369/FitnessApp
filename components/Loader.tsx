import React from 'react';

const Loader: React.FC = () => {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
        <h3 className="text-2xl font-bold text-white tracking-wider">Crafting Your Plan...</h3>
        <p className="text-slate-400">Our AI is analyzing your goals to build the perfect workout.</p>
    </div>
  );
};

export default Loader;