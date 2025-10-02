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
  {
    view: 'planner' as ActiveView,
    label: 'Planner',
    icon: DumbbellIcon,
  },
  {
    view: 'analyzer' as ActiveView,
    label: 'Analyzer',
    icon: CameraIcon,
  },
  {
    view: 'nutrition' as ActiveView,
    label: 'Nutrition',
    icon: NutritionIcon,
  },
  {
    view: 'dashboard' as ActiveView,
    label: 'Dashboard',
    icon: DashboardIcon,
  }
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/80 backdrop-blur-sm border-t border-slate-700 z-50 pb-1">
      <div className="container mx-auto px-4 flex justify-around">
        {navItems.map((item) => {
          const isActive = activeView === item.view;
          const Icon = item.icon;
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center justify-center w-full py-3 text-sm font-medium transition-colors focus:outline-none focus:bg-slate-700/50 ${
                isActive ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
              }`}
              aria-current={isActive}
            >
              <Icon className="w-7 h-7 mb-1.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;