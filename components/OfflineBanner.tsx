
import React from 'react';
import OfflineIcon from './icons/OfflineIcon';

interface OfflineBannerProps {
  isOffline: boolean;
}

const OfflineBanner: React.FC<OfflineBannerProps> = ({ isOffline }) => {
  if (!isOffline) {
    return null;
  }

  return (
    <div 
      role="status"
      className="bg-yellow-800/50 border border-yellow-600 text-yellow-200 px-4 py-3 rounded-lg relative mb-6 flex items-center space-x-3 animate-fade-in"
    >
      <OfflineIcon className="w-5 h-5 flex-shrink-0" />
      <span className="block sm:inline">
        You are currently offline. Some features may be unavailable, but you can still view your last generated plan.
      </span>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OfflineBanner;
