
import React from 'react';
import type { NutritionPreferences, NutritionPlan } from '../types';
import Loader from './Loader';
import NutritionForm from './NutritionForm';
import NutritionPlanDisplay from './NutritionPlanDisplay';

interface NutritionGuideProps {
  preferences: NutritionPreferences | null;
  plan: NutritionPlan | null;
  isLoading: boolean;
  error: string | null;
  isOffline: boolean;
  onSubmit: (data: NutritionPreferences) => void;
  onReset: () => void;
}

const NutritionGuide: React.FC<NutritionGuideProps> = ({
  preferences,
  plan,
  isLoading,
  error,
  isOffline,
  onSubmit,
  onReset,
}) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return (
        <div role="alert" className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
          <p className="text-red-300 text-lg">{error}</p>
          <button
            onClick={onReset}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }
    if (plan && preferences) {
      return <NutritionPlanDisplay plan={plan} preferences={preferences} onReset={onReset} />;
    }
    return <NutritionForm onSubmit={onSubmit} isLoading={isLoading} isOffline={isOffline} />;
  };

  return <>{renderContent()}</>;
};

export default NutritionGuide;
