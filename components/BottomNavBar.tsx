
import React from 'react';
import DumbbellIcon from './icons/DumbbellIcon';
import CameraIcon from './icons/CameraIcon';
import NutritionIcon from './icons/NutritionIcon';
import DashboardIcon from './icons/DashboardIcon';

type ActiveView = 'planner' | 'analyzer' | 'nutrition' | 'dashboard';

interface BottomNavBarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navItems = [
  { view: 'planner' as ActiveView, label: 'Planner', icon: DumbbellIcon },
  { view: 'analyzer' as ActiveView, label: 'Analyzer', icon: CameraIcon },
  { view: 'nutrition' as ActiveView, label: 'Nutrition', icon: NutritionIcon },
  { view: 'dashboard' as ActiveView, label: 'Dashboard', icon: DashboardIcon },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-sm z-50">
      <div className="bg-slate-800/70 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-2 flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`relative flex flex-col items-center justify-center w-full py-2 text-sm font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 ring-offset-2 ring-offset-slate-800 ${
                isActive ? 'text-indigo-300' : 'text-slate-400 hover:text-white'
              }`}
              aria-current={isActive}
            >
              {isActive && (
                <span className="absolute inset-0 bg-indigo-500/20 rounded-lg -z-10 animate-nav-blob"></span>
              )}
              <Icon className="w-6 h-6 mb-1" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes nav-blob {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-nav-blob {
          animation: nav-blob 0.3s ease-out forwards;
        }
      `}</style>
    </nav>
  );
};

export default BottomNavBar;
