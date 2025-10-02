import React, { useState, useCallback } from 'react';
import type { UserPreferences, WorkoutPlan } from './types';
import { generateWorkoutPlan } from './services/geminiService';
import Header from './components/Header';
import WorkoutForm from './components/WorkoutForm';
import WorkoutPlanDisplay from './components/WorkoutPlanDisplay';
import Loader from './components/Loader';
import Footer from './components/Footer';
import TechniqueAnalyzer from './components/TechniqueAnalyzer';
import NutritionGuide from './components/NutritionGuide';
import BottomNavBar from './components/BottomNavBar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'planner' | 'analyzer' | 'nutrition' | 'dashboard'>('planner');
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (data: UserPreferences) => {
    setIsLoading(true);
    setError(null);
    setWorkoutPlan(null);
    try {
      const plan = await generateWorkoutPlan(data);
      setPreferences(data);
      setWorkoutPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Failed to generate workout plan. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setWorkoutPlan(null);
    setPreferences(null);
    setError(null);
  }, []);

  const renderPlannerContent = () => {
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
    if (workoutPlan && preferences) {
      return <WorkoutPlanDisplay plan={workoutPlan} preferences={preferences} onReset={handleReset} />;
    }
    return <WorkoutForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 pb-32">
        <div key={activeView} className="animate-view-change">
          {activeView === 'planner' && renderPlannerContent()}
          {activeView === 'analyzer' && <TechniqueAnalyzer />}
          {activeView === 'nutrition' && <NutritionGuide />}
          {activeView === 'dashboard' && <Dashboard />}
        </div>
      </main>
      <Footer />
      <BottomNavBar activeView={activeView} onNavigate={setActiveView} />
      <style>{`
          @keyframes view-change-fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-view-change {
              animation: view-change-fade-in 0.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default App;