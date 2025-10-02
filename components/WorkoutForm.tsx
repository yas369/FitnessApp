
import React, { useState } from 'react';
import type { UserPreferences } from '../types';
import LevelIcon from './icons/LevelIcon';
import GoalIcon from './icons/GoalIcon';
import SportIcon from './icons/SportIcon';
import CalendarIcon from './icons/CalendarIcon';
import ClockIcon from './icons/ClockIcon';
import HealthIcon from './icons/HealthIcon';
import EquipmentIcon from './icons/EquipmentIcon';
import OfflineIcon from './icons/OfflineIcon';

interface WorkoutFormProps {
  onSubmit: (data: UserPreferences) => void;
  isLoading: boolean;
  isOffline: boolean;
}

const equipmentOptions = [
    { id: 'none', label: 'No Equipment', description: 'Bodyweight only' },
    { id: 'basic', label: 'Basic', description: 'Dumbbells, bands' },
    { id: 'full_gym', label: 'Full Gym', description: 'All machines available' },
];

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, isLoading, isOffline }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    fitnessLevel: 'beginner',
    primaryGoal: 'general_fitness',
    sport: 'none',
    daysPerWeek: 3,
    sessionDuration: 45,
    equipment: 'none',
    healthConditions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'daysPerWeek' || name === 'sessionDuration' ? parseInt(value) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(isOffline) return;
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-10 border border-slate-700">
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Create Your Personalized Plan</h2>
            <p className="mt-2 text-slate-400 text-lg">Tell us about yourself, and we'll craft the perfect workout for you.</p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="fitnessLevel" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <LevelIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Fitness Level
            </label>
            <select id="fitnessLevel" name="fitnessLevel" value={formData.fitnessLevel} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="primaryGoal" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <GoalIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Primary Goal
            </label>
            <select id="primaryGoal" name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="general_fitness">General Fitness</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="sports_performance">Sports Performance</option>
            </select>
          </div>
        </div>

        {formData.primaryGoal === 'sports_performance' && (
          <div className="form-group bg-slate-700/50 p-4 rounded-md transition-all duration-300">
            <label htmlFor="sport" className="flex items-center text-sm font-medium text-indigo-300 mb-2">
              <SportIcon className="w-5 h-5 mr-2" />
              Which Sport?
            </label>
            <select id="sport" name="sport" value={formData.sport} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="none">None</option>
              <option value="cricket">Cricket</option>
              <option value="badminton">Badminton</option>
              <option value="football">Football</option>
              <option value="kabaddi">Kabaddi</option>
            </select>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
            <div className="form-group">
                <label htmlFor="daysPerWeek" className="flex items-center text-sm font-medium text-slate-300 mb-2">
                  <CalendarIcon className="w-5 h-5 mr-2 text-indigo-400" />
                  Workout Days per Week: <span className="font-bold text-indigo-400 ml-1">{formData.daysPerWeek}</span>
                </label>
                <input type="range" id="daysPerWeek" name="daysPerWeek" min="1" max="7" value={formData.daysPerWeek} onChange={handleChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" aria-valuetext={`${formData.daysPerWeek} days`} />
            </div>
            <div className="form-group">
                <label htmlFor="sessionDuration" className="flex items-center text-sm font-medium text-slate-300 mb-2">
                  <ClockIcon className="w-5 h-5 mr-2 text-indigo-400" />
                  Session Duration (minutes): <span className="font-bold text-indigo-400 ml-1">{formData.sessionDuration}</span>
                </label>
                <input type="range" id="sessionDuration" name="sessionDuration" min="15" max="120" step="15" value={formData.sessionDuration} onChange={handleChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" aria-valuetext={`${formData.sessionDuration} minutes`} />
            </div>
        </div>

        <div className="form-group">
            <label className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <EquipmentIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Available Equipment
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {equipmentOptions.map(eq => (
                    <label key={eq.id} className={`relative flex flex-col text-center p-4 rounded-lg cursor-pointer border-2 transition-all ${formData.equipment === eq.id ? 'bg-indigo-600/30 border-indigo-500' : 'bg-slate-700/50 border-slate-600 hover:border-slate-500'}`}>
                        <input type="radio" name="equipment" value={eq.id} checked={formData.equipment === eq.id} onChange={handleChange} className="absolute top-2 right-2 w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" />
                        <span className="text-sm font-bold text-white">{eq.label}</span>
                        <span className="text-xs text-slate-400">{eq.description}</span>
                    </label>
                ))}
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="healthConditions" className="flex items-center text-sm font-medium text-slate-300 mb-2">
            <HealthIcon className="w-5 h-5 mr-2 text-indigo-400" />
            Health Conditions or Injuries (Optional)
          </label>
          <textarea id="healthConditions" name="healthConditions" value={formData.healthConditions} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g., knee pain, lower back issues..."></textarea>
        </div>

        <div className="pt-4">
            <button type="submit" disabled={isLoading || isOffline} className="w-full flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 font-bold rounded-lg text-lg px-5 py-3.5 text-center disabled:bg-indigo-800 disabled:cursor-not-allowed transition-all duration-300">
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Plan...
              </>
            ) : isOffline ? (
                <>
                  <OfflineIcon className="w-5 h-5 mr-2" />
                  Offline - Cannot Generate Plan
                </>
            ) : 'Generate My Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkoutForm;
