
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <div className="relative flex items-center justify-center w-20 h-20">
            <div className="absolute w-full h-full border-2 rounded-full border-indigo-500/50"></div>
            <div className="absolute w-full h-full border-2 rounded-full border-indigo-500/80 animate-ping"></div>
            <svg className="w-8 h-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.553L16.25 22.5l-.648-1.947a4.5 4.5 0 00-3.09-3.09L9.75 18l2.846-.813a4.5 4.5 0 003.09-3.09l.648-1.947.648 1.947a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-white tracking-wider mt-4">Crafting Your Plan...</h3>
        <p className="text-slate-400">Our AI is analyzing your goals to build the perfect workout.</p>
    </div>
  );
};

export default Loader;
