
import React, { useState } from 'react';
import type { WorkoutPlan, UserPreferences, Exercise } from '../types';
import DumbbellIcon from './icons/DumbbellIcon';
import TargetIcon from './icons/TargetIcon';
import VideoIcon from './icons/VideoIcon';
import VideoModal from './VideoModal';
import LevelIcon from './icons/LevelIcon';
import GoalIcon from './icons/GoalIcon';
import SportIcon from './icons/SportIcon';
import EquipmentIcon from './icons/EquipmentIcon';
import RestDayIcon from './icons/RestDayIcon';

interface WorkoutPlanDisplayProps {
  plan: WorkoutPlan;
  preferences: UserPreferences;
  onReset: () => void;
}

const StatCard: React.FC<{ label: string, value: string, icon: React.ReactNode }> = ({ label, value, icon }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 flex flex-col items-center justify-center text-center h-full">
        <div className="text-indigo-400 mb-2">{icon}</div>
        <p className="text-sm text-slate-400 font-medium leading-tight">{label}</p>
        <p className="text-md font-bold text-white mt-1">{value}</p>
    </div>
);

const WorkoutPlanDisplay: React.FC<WorkoutPlanDisplayProps> = ({ plan, preferences, onReset }) => {
  const { fitnessLevel, primaryGoal, sport, equipment } = preferences;
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const handleExerciseClick = (exercise: Exercise) => {
    if (exercise.videoQuery && exercise.videoQuery.toLowerCase() !== 'n/a' && exercise.videoQuery.trim() !== '') {
      setSelectedExercise(exercise);
    }
  };

  const handleCloseModal = () => {
    setSelectedExercise(null);
  };

  const activeDay = plan.weeklySchedule?.[activeDayIndex];

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
        <div className="bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-8 border border-slate-700 mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">{plan.planTitle}</h2>
            <p className="mt-4 text-center text-slate-300 max-w-3xl mx-auto">{plan.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <StatCard label="Fitness Level" value={fitnessLevel.charAt(0).toUpperCase() + fitnessLevel.slice(1)} icon={<LevelIcon className="w-8 h-8" />} />
                <StatCard label="Primary Goal" value={primaryGoal.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} icon={<GoalIcon className="w-8 h-8" />} />
                <StatCard label="Sport Focus" value={sport === 'none' ? 'N/A' : sport.charAt(0).toUpperCase() + sport.slice(1)} icon={<SportIcon className="w-8 h-8" />} />
                <StatCard label="Equipment" value={equipment.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} icon={<EquipmentIcon className="w-8 h-8" />} />
            </div>
        </div>

        {plan.weeklySchedule && Array.isArray(plan.weeklySchedule) ? (
          <div>
            <div className="border-b border-slate-700 custom-scrollbar">
                <nav className="-mb-px flex space-x-2 md:space-x-4 overflow-x-auto" aria-label="Tabs">
                    {plan.weeklySchedule.map((day, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveDayIndex(index)}
                            className={`whitespace-nowrap shrink-0 px-3 md:px-4 py-3 font-medium text-sm md:text-base rounded-t-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ring-offset-2 ring-offset-slate-900 ${
                                index === activeDayIndex
                                    ? 'border-b-2 border-indigo-400 text-white bg-slate-800/60'
                                    : 'border-b-2 border-transparent text-slate-400 hover:text-white hover:bg-slate-800/30'
                            }`}
                            aria-current={index === activeDayIndex ? 'page' : undefined}
                        >
                            {day.day}
                        </button>
                    ))}
                </nav>
            </div>

            {activeDay && (
              <div key={activeDayIndex} className="mt-6 animate-fade-in">
                <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/80 overflow-hidden flex flex-col min-h-[400px]">
                  <div className="p-5 bg-slate-900/50 border-b border-slate-700">
                      <h3 className="text-xl font-bold text-white">{activeDay.day}</h3>
                      <p className="text-indigo-400 font-semibold">{activeDay.focus}</p>
                  </div>
                  <div className="p-5 space-y-4 flex-grow">
                  {activeDay.exercises.length > 0 ? (
                      activeDay.exercises.map((exercise, exIndex) => (
                      <button 
                          key={exIndex} 
                          onClick={() => handleExerciseClick(exercise)}
                          className="w-full text-left bg-slate-700/40 p-4 rounded-lg ring-2 ring-transparent hover:ring-indigo-500 hover:bg-slate-700/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:ring-transparent"
                          disabled={!exercise.videoQuery || exercise.videoQuery.toLowerCase() === 'n/a' || exercise.videoQuery.trim() === ''}
                          aria-label={`View video demonstration for ${exercise.name}`}
                          >
                          <div className="flex items-start justify-between">
                              <p className="font-semibold text-white flex-grow pr-2">{exercise.name}</p>
                              {exercise.videoQuery && exercise.videoQuery.toLowerCase() !== 'n/a' && exercise.videoQuery.trim() !== '' && (
                                <div className="bg-indigo-500/20 p-1.5 rounded-full">
                                  <VideoIcon className="w-5 h-5 text-indigo-300 flex-shrink-0" />
                                </div>
                              )}
                          </div>
                          <div className="flex items-center space-x-6 text-sm mt-2 text-slate-300">
                              <span><DumbbellIcon className="inline w-4 h-4 mr-1.5 text-slate-400"/> {exercise.sets} sets x {exercise.reps} reps</span>
                              <span><TargetIcon className="inline w-4 h-4 mr-1.5 text-slate-400" /> {exercise.rest} rest</span>
                          </div>
                          {exercise.note && <p className="text-xs mt-2 text-slate-400 italic">Note: {exercise.note}</p>}
                          </button>
                      ))
                  ) : (
                      <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 py-10 px-4">
                        <RestDayIcon className="w-32 h-32 md:w-48 md:h-48 text-indigo-400/30" />
                        <h4 className="text-2xl font-bold text-white mt-4">Rest & Recovery</h4>
                        <p className="mt-2 max-w-xs mx-auto">Your muscles grow when you rest. Enjoy your day off and come back stronger!</p>
                      </div>
                  )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-3 bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/80 p-8 text-center">
              <h3 className="text-xl font-bold text-white">Workout Schedule Not Available</h3>
              <p className="text-slate-400 mt-2">The AI model did not return a valid weekly schedule. Please try generating a new plan.</p>
          </div>
        )}
      
      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-500/20"
        >
          Generate a New Plan
        </button>
      </div>

      {selectedExercise && (
        <VideoModal exercise={selectedExercise} onClose={handleCloseModal} />
      )}

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

export default WorkoutPlanDisplay;
