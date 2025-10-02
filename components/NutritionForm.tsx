import React, { useState } from 'react';
import type { NutritionPreferences } from '../types';
import GoalIcon from './icons/GoalIcon';
import DietIcon from './icons/DietIcon';
import CuisineIcon from './icons/CuisineIcon';
import MealIcon from './icons/MealIcon';
import AllergyIcon from './icons/AllergyIcon';


interface NutritionFormProps {
  onSubmit: (data: NutritionPreferences) => void;
  isLoading: boolean;
}

const NutritionForm: React.FC<NutritionFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<NutritionPreferences>({
    dietaryPreference: 'vegetarian',
    primaryGoal: 'maintenance',
    cuisine: 'mixed',
    mealsPerDay: 4,
    allergies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'mealsPerDay' ? parseInt(value) : value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-lg p-6 md:p-10 border border-slate-700">
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Your Personalized Nutrition Guide</h2>
            <p className="mt-2 text-slate-400 text-lg">Fuel your body right. Tell us your preferences to get a custom meal plan.</p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="dietaryPreference" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <DietIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Dietary Preference
            </label>
            <select id="dietaryPreference" name="dietaryPreference" value={formData.dietaryPreference} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="eggetarian">Eggetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="primaryGoal" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <GoalIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Primary Goal
            </label>
            <select id="primaryGoal" name="primaryGoal" value={formData.primaryGoal} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="maintenance">Weight Maintenance</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="cuisine" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <CuisineIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Cuisine Preference
            </label>
            <select id="cuisine" name="cuisine" value={formData.cuisine} onChange={handleChange} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
              <option value="mixed">Mixed Indian</option>
              <option value="north_indian">North Indian</option>
              <option value="south_indian">South Indian</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mealsPerDay" className="flex items-center text-sm font-medium text-slate-300 mb-2">
              <MealIcon className="w-5 h-5 mr-2 text-indigo-400" />
              Meals per Day: <span className="font-bold text-indigo-400 ml-1">{formData.mealsPerDay}</span>
            </label>
            <input type="range" id="mealsPerDay" name="mealsPerDay" min="3" max="6" value={formData.mealsPerDay} onChange={handleChange} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" aria-valuetext={`${formData.mealsPerDay} meals`} />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="allergies" className="flex items-center text-sm font-medium text-slate-300 mb-2">
            <AllergyIcon className="w-5 h-5 mr-2 text-indigo-400" />
            Food Allergies or Dislikes (Optional)
          </label>
          <textarea id="allergies" name="allergies" value={formData.allergies} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" placeholder="e.g., peanuts, gluten, spicy food..."></textarea>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 font-bold rounded-lg text-lg px-5 py-3.5 text-center disabled:bg-indigo-900 disabled:cursor-not-allowed transition-all duration-300">
            {isLoading ? 'Generating Meal Plan...' : 'Generate My Meal Plan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NutritionForm;