import React, { useState, useCallback } from 'react';
import type { NutritionPreferences, NutritionPlan } from '../types';
import { generateNutritionPlan } from '../services/geminiService';
import Loader from './Loader';
import NutritionForm from './NutritionForm';
import NutritionPlanDisplay from './NutritionPlanDisplay';

const NutritionGuide: React.FC = () => {
  const [preferences, setPreferences] = useState<NutritionPreferences | null>(null);
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (data: NutritionPreferences) => {
    setIsLoading(true);
    setError(null);
    setNutritionPlan(null);
    try {
      const plan = await generateNutritionPlan(data);
      setPreferences(data);
      setNutritionPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate nutrition plan. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setNutritionPlan(null);
    setPreferences(null);
    setError(null);
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div role="alert" className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-300 text-lg">{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    if (nutritionPlan && preferences) {
      return <NutritionPlanDisplay plan={nutritionPlan} preferences={preferences} onReset={handleReset} />;
    }
    return <NutritionForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
  }

  return <>{renderContent()}</>;
};

export default NutritionGuide;
