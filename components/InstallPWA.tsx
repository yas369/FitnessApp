import React, { useState, useEffect } from 'react';
import InstallIcon from './icons/InstallIcon';
import CloseIcon from './icons/CloseIcon';
import ShareIcon from './icons/ShareIcon';
import { triggerHapticFeedback } from '../services/hapticService';

const InstallPWA: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
      if (!localStorage.getItem('pwaInstallDismissed')) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;

    if (isIOSDevice && !isAppInstalled) {
      if (!localStorage.getItem('pwaInstallDismissed')) {
        setIsIos(true);
        // Delay showing the prompt slightly
        setTimeout(() => setIsVisible(true), 3000);
      }
    }
    
    if (installPrompt && !isAppInstalled) {
      setTimeout(() => setIsVisible(true), 3000);
    }


    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) return;
    triggerHapticFeedback();
    installPrompt.prompt();
    installPrompt.userChoice.then(() => {
      setInstallPrompt(null);
      setIsVisible(false);
    });
  };

  const handleDismiss = () => {
    triggerHapticFeedback(30);
    setIsVisible(false);
    // Remember dismissal for a week
    localStorage.setItem('pwaInstallDismissed', 'true');
    setTimeout(() => {
        localStorage.removeItem('pwaInstallDismissed');
    }, 7 * 24 * 60 * 60 * 1000); // 7 days
  };

  if (!isVisible) {
    return null;
  }

  if (isIos) {
    return (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 animate-slide-up">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-4 flex items-start space-x-4">
                <div className="bg-indigo-500/20 p-2 rounded-lg mt-1">
                    <ShareIcon className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-white">Install App on iOS</h3>
                    <p className="text-sm text-slate-300">
                        Tap the Share button, then scroll down and select 'Add to Home Screen'.
                    </p>
                </div>
                <button onClick={handleDismiss} className="p-1.5 text-slate-400 hover:text-white" aria-label="Dismiss install prompt">
                    <CloseIcon className="w-5 h-5" />
                </button>
            </div>
            <style>{`
              @keyframes slide-up {
                from { transform: translate(-50%, 100px); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
              }
              .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
            `}</style>
        </div>
    )
  }

  if (installPrompt) {
    return (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md z-50 animate-slide-up">
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-4 flex items-center space-x-4">
                <div className="bg-indigo-500/20 p-3 rounded-lg">
                    <InstallIcon className="w-7 h-7 text-indigo-400" />
                </div>
                <div className="flex-grow">
                    <h3 className="font-bold text-white">Get the Full Experience</h3>
                    <p className="text-sm text-slate-300">Install the app for offline access and faster performance.</p>
                </div>
                <button onClick={handleInstallClick} className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors whitespace-nowrap">
                    Install
                </button>
                <button onClick={handleDismiss} className="p-1.5 text-slate-400 hover:text-white" aria-label="Dismiss install prompt">
                    <CloseIcon className="w-5 h-5" />
                </button>
            </div>
             <style>{`
              @keyframes slide-up {
                from { transform: translate(-50%, 100px); opacity: 0; }
                to { transform: translate(-50%, 0); opacity: 1; }
              }
              .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
  }

  return null;
};

export default InstallPWA;