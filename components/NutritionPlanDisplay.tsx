import React, { useState } from 'react';
import type { NutritionPlan, NutritionPreferences, Meal } from '../types';
import GoalIcon from './icons/GoalIcon';
import DietIcon from './icons/DietIcon';
import CuisineIcon from './icons/CuisineIcon';
import MealIcon from './icons/MealIcon';

interface NutritionPlanDisplayProps {
  plan: NutritionPlan;
  preferences: NutritionPreferences;
  onReset: () => void;
}

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center text-center h-full">
        <div className="text-indigo-400 mb-2">{icon}</div>
        <p className="text-sm text-slate-400 font-medium leading-tight">{label}</p>
        <p className="text-md font-bold text-white mt-1">{value}</p>
    </div>
);

const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => (
    <div className="bg-slate-700/40 p-4 rounded-lg">
        <div className="flex justify-between items-start">
            <h4 className="font-bold text-white text-lg">{meal.name}</h4>
            <span className="text-sm font-semibold text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-full">{meal.calories}</span>
        </div>
        <ul className="mt-2 space-y-1 list-disc list-inside text-slate-300">
            {meal.items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
        {meal.note && <p className="text-xs mt-2 text-slate-400 italic">Note: {meal.note}</p>}
    </div>
);


const NutritionPlanDisplay: React.FC<NutritionPlanDisplayProps> = ({ plan, preferences, onReset }) => {
  const { dietaryPreference, primaryGoal, cuisine, mealsPerDay } = preferences;
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeDay = plan.weeklyMealPlan?.[activeDayIndex];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-700 mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">{plan.planTitle}</h2>
            <p className="mt-4 text-center text-slate-300 max-w-3xl mx-auto">{plan.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard label="Diet Type" value={dietaryPreference.charAt(0).toUpperCase() + dietaryPreference.slice(1)} icon={<DietIcon className="w-8 h-8" />} />
                <StatCard label="Primary Goal" value={primaryGoal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} icon={<GoalIcon className="w-8 h-8" />} />
                <StatCard label="Cuisine" value={cuisine.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} icon={<CuisineIcon className="w-8 h-8" />} />
                <StatCard label="Meals/Day" value={String(mealsPerDay)} icon={<MealIcon className="w-8 h-8" />} />
            </div>
        </div>

        {plan.weeklyMealPlan && Array.isArray(plan.weeklyMealPlan) ? (
          <div>
            <div className="border-b border-slate-700">
                <nav className="-mb-px flex space-x-4 md:space-x-6 overflow-x-auto" aria-label="Tabs">
                    {plan.weeklyMealPlan.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveDayIndex(index)}
                            className={`whitespace-nowrap shrink-0 px-3 md:px-4 py-3 font-medium text-sm md:text-base transition-colors focus:outline-none ${
                                index === activeDayIndex
                                    ? 'border-b-2 border-indigo-400 text-indigo-300'
                                    : 'border-b-2 border-transparent text-slate-400 hover:text-white hover:border-slate-500'
                            }`}
                        >
                            {day.day}
                        </button>
                    ))}
                </nav>
            </div>

            {activeDay && (
              <div key={activeDayIndex} className="mt-6 animate-fade-in">
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/80 overflow-hidden">
                  <div className="p-5 bg-slate-900/50 border-b border-slate-700 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">{activeDay.day}</h3>
                      <p className="text-indigo-400 font-semibold">{activeDay.dailyTotalCalories}</p>
                  </div>
                  <div className="p-5 grid gap-4 md:grid-cols-2">
                    {activeDay.meals.map((meal, index) => (
                        <MealCard key={index} meal={meal} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-800/60 rounded-xl border border-slate-700/80 p-8 text-center">
              <h3 className="text-xl font-bold text-white">Meal Plan Not Available</h3>
              <p className="text-slate-400 mt-2">The AI model did not return a valid meal plan. Please try generating a new one.</p>
          </div>
        )}
      
      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20"
        >
          Generate a New Meal Plan
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default NutritionPlanDisplay;
